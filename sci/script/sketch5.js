/***
 * 
 * sketch5.js is a library of classes for making drawings
 * and animations in a canvas element. This library depends
 * on math.js (located in the same folder as this file) and
 * also on jQuery <https://code.jquery.com/jquery-3.6.0.min.js>!
 * 
 * (c) 2021-2022 by D.G. MacCarthy <sc8pr.py@gmail.com>
 * 
***/


class Sketch {  // Animated canvas

    constructor(cv) {
        // Canvas data
        this.canvas = $(cv ? cv : "canvas")[0];
        this.canvas.sketch = this;
        this._cx = this.canvas.getContext("2d");
        this._cx.save();

        // Animation data
        this.frameCount = 0;
        this.frameRate = 30;
        this._boost = 1;
        this.items = [];
        this.clock = new Timer();
        this.clock._frame = 0;
        this.paused = true;
        this.autoKinematics = true;

        // Coordinate system
        this.units = [1, 1];
        this.unit = this.unitSign =  1;
        this.px = this.cs = function(x, y) {return [x, y]};

        // Mouse
        this.mousePos = {x:0, y:0};
        this.mouseMovement = [0, 0];
        this.mouseDownStatus = 0;
        this.mouseDownItem = this.mouseDropItem = this.mouseHoverItem = this;
        this.bindListeners(true);
    }


    // Image preloading...

    static init(setup, imgs, opt) {
        imgs = Sketch._images(imgs);
        opt = join(opt, {success:setup});
        Sketch._wait(0, opt, imgs);
        return imgs;
    }

    static _images(urls) {  // Pre-load multiple images
        let imgs = {};
        for (let k in urls) {
            let img = new Image();
            img.status = 0;
            img.onload = function() {this.status = 1}
            img.onerror = img.onstalled = function() {this.status = -1}
            let src = urls[k];
            img.src = src;
            imgs[k] = img;
        }
        return imgs;
    }

    static _wait(n, opt, imgs) {  // Wait for preloading to finish
        n += 1
        let status = 1;
        for (let k in imgs) {
            let s = imgs[k].status;
            if (s == -1) {
                if (opt.error) opt.error(imgs);
                else console.log("Unable to load image", imgs[k]);
                return;
            }
            if (s == 0) {
                status = 0;
                break;
            }
        }
        if (status == 1) {
            if (opt.success) opt.success(imgs);
        }
        else if (opt.timeout && 5 * n > opt.timeout) {
            if (opt.error) opt.error(imgs);
        }
        else setTimeout(function() {
            Sketch._wait(n, opt, imgs);
        }, 100);
    }

    // Canvas element interaction...

    size() {  // Return the sketch size in the coordinate system units
        let r = this.get_rect();
        return [r[2], r[3]];
    }

    canvasSize() {  // Return the canvas size in pixels
        let cv = this.canvas;
        return [cv.width, cv.height];
    }

    get_rect() {
        // Return the sketch rectangle in the attached coordinate system
        let tl = this.cs(0, 0);
        let sz = this.canvasSize();
        let br = this.cs(sz[0]-1, sz[1]-1);
        let w = Math.abs(br[0] - tl[0]);
        let h = Math.abs(br[1] - tl[1]);
        let x = Math.min(tl[0], br[0]);
        let y = Math.min(tl[1], br[1]);
        return [x, y, w, h];
    }

    css() {  // Call jQuery 'css' method on canvas element
        $(this.canvas).css(...arguments);
        return this;
    }

    cx() {  // Return the 2D canvas redering context
        let cx = this._cx;
        cx.restore();
        return cx;
    }

    clip(r) {  // Set clipping region to a rectangle
        if (!r) r = 1;
        if (typeof(r) == "number") {
            let n = r;
            r = [...this._clip];
            r[0] -= n;
            r[1] -= n;
            r[2] += 2 * n;
            r[3] += 2 * n;
        }
        let cx = this._cx;
        cx.beginPath();
        cx.rect(...r);
        cx.clip();
    }

    _cxTransform(cx, xy, a, restore) {
        // Manipulate canvas context to rotate items
        if (a) a *= this.unitSign * DEG;
        if (restore) {
            if (a) cx.rotate(-a);
            cx.translate(-xy[0], -xy[1]);
            cx.restore();
        }
        else {
            cx.save();
            cx.translate(...xy);
            if (a) cx.rotate(a);
            return a;
        }
    }

    // Coordinate system methods...

    attachCS(l, r, b, t, margin) {
        // Attach a coordinate system to the existing-size canvas
        if (margin == null) margin = 0;
        if (typeof(margin) == "number")
            margin = [margin, margin, margin, margin];
        let sz = this.canvasSize();
        let dx = margin[0];
        let dy = sz[1] - 1 - margin[2];
        let w = sz[0] - 1 - dx - margin[1];
        let h = dy - margin[3];
        this._clip = [dx, margin[3], w, h];
        let sx = w / (r - l);
        if (!t) {
            t = (r - l) * h / w;
            if (b == null) {
                t = t / 2;
                b = -t;
            }
            else t += b;
        }
        let sy = h / (b - t);
        this.units = [sx, sy];
        this.unitSign = sx * sy < 0 ? -1 : 1;
        this.unit = Math.sqrt(Math.abs(sx * sy));
        this.px = function(x, y) {return [sx * (x - l) + dx, sy * (y - b) + dy]}
        this.cs = function(x, y) {return [(x - dx) / sx + l, (y - dy) / sy + b]}
        if (Sketch.debug && (sx != -sy || sx != Math.round(sx))) {
            sx = Math.round(sx);
            console.log(this.canvas);
            console.log(sx * (r - l) + 1 + dx + margin[1], sx * (t - b) + 1 + margin[2] + margin[3]);
        }
        return this;
    }

    createCS(s, l, r, b, t, m) {
        // Resize canvas to fit the requested coordinate system
        if (!m) m = 1;
        if (typeof(m) == "number") m = [m, m, m, m];
        if (typeof(s) == "number") s = [s, -s];
        let w = (r - l) * Math.abs(s[0]);
        let h = (t - b) * Math.abs(s[1]);
        this.canvas.width = w + m[0] + m[1] + 1;
        this.canvas.height = h + m[2] + m[3] + 1;
        let l1 = l - m[0] / s[0];
        let r1 = r + m[1] / s[0];
        let b1 = b + m[2] / s[1];
        let t1 = t - m[3] / s[1];
        this.attachCS(l1, r1, b1, t1);
        this._clip = [m[0], m[3], w, h];
        return this;
    }

    // extendCS(l, r, b, t, m) {
    //     this.attachCS(l, r, b, t);
    //     return this.createCS(this.units, l, r, b, t, m);
    // }

    px_round(x, y) {
        x = this.px(x, y);
        return [Math.round(x[0]), Math.round(x[1])];
    }

    px_delta(dx, dy) {
        let u = this.units;
        return [u[0] * dx, u[1] * dy];
    }

    cs_delta(dx, dy) {
        let u = this.units;
        return [dx / u[0], dy / u[1]];
    }

    // Mouse event handling...

    bindListeners(bind, which) {  // Add/remove event listeners for mouse events
        if (!which) which = 3;
        let ev1 = "mousemove mousedown mouseup touchmove touchstart touchend mouseout";
        let ev2 = ev1 + " click dblclick wheel";
        if (bind) {
            if (which & 1) $(this.canvas).on(ev1, Sketch._mouse_monitor);
            if (which & 2) $(this.canvas).on(ev2, Sketch._mouse_handle);
        }
        else {
            if (which & 1) $(this.canvas).off(ev1, Sketch._mouse_monitor);            
            if (which & 2) $(this.canvas).off(ev2, Sketch._mouse_handle);
        }
    }

    static _mouse_monitor(e) {
    /* Monitor mouse motion/clicks and store the following data...
        mouseEvent: event object
        mousePos {x, y, px, py}
        mouseMovement [x, y]
        mouseDownStatus: 1=down, 0=up
        mouseHoverItem: item mouse is pointing to
        mouseDownItem: last mousedown item
        mouseDropItem: released item
    */
        let sk = this.sketch;
        sk.mouseEvent = e;
        if (e.type != "touchend") {
            let r = this.getBoundingClientRect();
            let cv = $(this);
            let x = parseFloat(cv.css("padding-left")) + parseFloat(cv.css("border-left-width"));
            let y = parseFloat(cv.css("padding-top")) + parseFloat(cv.css("border-top-width"));
            let orig = e.originalEvent;
            let sz = sk.canvasSize();
            let cx = orig.clientX;
            let cy = orig.clientY;
            if (cx == null) {
                cx = orig.touches[0].clientX;
                cy = orig.touches[0].clientY;
            }
            x = (cx - r.x - x) * sz[0] / cv.width();
            y = (cy - r.y - y) * sz[1] / cv.height();
            let c = sk.cs(x, y), c0 = sk.mousePos;
            sk.mouseMovement = [c[0] - c0.x, c[1] - c0.y];
            sk.mousePos = c = {x:c[0], y:c[1], xp:x, yp:y};
            sk.mouseHoverItem = sk.itemAt(c);
        }
        if (e.type == "mousedown" || e.type == "touchstart") {
            sk.mouseDownItem = sk.mouseHoverItem;
            sk.mouseDownStatus = 1;
        }
        else if (["mouseup", "touchend", "mouseout"].indexOf(e.type) > -1) {
            sk.mouseDropItem = sk.mouseDownItem;
            sk.mouseDownStatus = 0;
        }
    }

    static _mouse_handle(e) {  // Handle mouse events
        let sk = this.sketch;
        if (sk.onevent) sk.onevent(e);
        let item = sk.mouseDownStatus ? sk.mouseDownItem : sk.mouseHoverItem;
        let handler = "on" + e.type;
        if (item && item != sk && item[handler]) item[handler](e);
        if (sk[handler]) sk[handler](e);
    }

    itemsAt(x, y) {  // Return an array of items containing the position (x, y)
        if (y == null) {y = x.y; x = x.x;}
        let hover = [this];
        let items = this.items;
        let n = items.length;
        for (let i=0;i<n;i++) {
            let item = items[i];
            if (!item.hidden && item.contains(x, y))
                hover.push(item);
        }
        return hover;
    }

    itemAt(x, y) {  // Return the "top" item at (x, y)
        if (y == null) {y = x.y; x = x.x;}
        let items = this.items;
        let n = items.length;
        while (n--) {
            let item = items[n];
            if (!item.hidden && item.contains(x, y))
                return item;
        }
        return this;
    }

    // Drawing...

    draw () {  // Draw the current frame
        let cx = this.cx();
        cx.clearRect(0, 0, ...this.canvasSize());
        let items = [...this.items];
        let n = items.length, i;
        try {
            for (i=0; i<n; i++) {
                let item = items[i];
                if (!item.hidden) item.draw(this, cx);
            }
            for (i=0; i<n; i++) {
                let item = items[i];
                if (!item.hidden && item.ondraw) item.ondraw();
            }
            if (this.ondraw) this.ondraw();
        } catch(i) {console.log(i)};
        this.frameCount++;
        return this;
    }

    // Animation...

    static animate(sk) {
        clearTimeout(this._nextdraw);
        delete this._nextdraw;
        if (!$(sk.canvas).closest("body").length) {sk.paused = true}
        else if (!sk.paused) {
            let t = Date.now();
            sk.draw();
            t = 1000 / (sk.frameRate * sk._boost) - (Date.now() - t);
            this._nextdraw = setTimeout(Sketch.animate, Math.max(1, t), sk);
        }
    }

    play() {  // Play the animation
        this.paused = false;
        Sketch.animate(this);
        return this;
    }

    pause() {  // Pause the animation
        clearTimeout(this._nextdraw);
        this.paused = true;
        delete this._nextdraw;
        return this;
    }

    toggle() {  // Toggle play/pause
        return this.paused ? this.play() : this.pause();
    }

    boost(fps, maxAdjust, maxTotal) {
        // Adjust 'boost' to maintain desired frame rate
        if (fps > 0) {
            if (!maxAdjust) maxAdjust = 1.02;
            if (!maxTotal) maxTotal = 1.5;
            let b = Math.max(1/maxAdjust, Math.min(maxAdjust, this.frameRate / fps));
            this._boost = Math.max(1/maxTotal, Math.min(maxTotal, b * this._boost));
        }
        return this;
    }

    get_fps() {  // Estimate overall and recent frame rate
        let c = this.clock;
        let t = c.time() / 1000;
        let dt = c.lap() / 1000;
        let f0 = this.frameCount;
        let f1 = c._frame;
        c._frame = f0;
        return [f0/t, (f0-f1)/dt];
    }

    // Graphics content...

    add(key, item, attr) {  // Add an item to the sketch
        if (key) item.key = key;
        else key = item.key;
        if (attr) Object.assign(item, attr);
        // if (key == null) throw("A key is required to add the item");
        // else 
        if (this.item(key)) throw(`Key '${key}' is already in use`);
        else {
            item.sketch = this;
            this.items.push(item);
        }
        return this;
    }

    remove(key) {  // Remove an item from the sketch
        let item = typeof(key) == "string" ? this.item(key) : key;
        if (item) {
            let items = this.items;
            items.splice(items.indexOf(item), 1);
        }
        return item;
    }

    index(key) {  // Get the index of an item
        if (typeof(key) == "string") key = this.item(key);
        return this.items.indexOf(key);
    }

    setIndex(key, i) {  // Change an item's position in the sequence of items
        if (typeof(key) == "string") key = this.item(key);
        let items = this.items;
        let n = items.length;
        let j = items.indexOf(key);
        if (j >= 0) items.splice(j, 1);
        if (i >= items.length || i == -1) items.push(key);
        else {
            if (i < 0) i += n;
            if (i >= 0) items.splice(i, 0, key);
        }
        return this;
    }

    item(key) {  // Locate an item by its key
        let items = this.items;
        let n = items.length;
        if (typeof(key) == "number")
            return items[key < 0 ? key + n : key];
        for (let i=0;i<n;i++)
            if (items[i].key == key) return items[i];
    }

    log() {
        for (let i in this.items) {
            let item = this.items[i];
            console.log(item.key, item);
        }
    }

    config(attr, ...objs) {
        for (let i in objs) {
            let obj = objs[i];
            if (typeof(obj) == "string") obj = this.item(obj);
            Object.assign(obj, attr);
        }
        return this;
    }

    sprite(key, src, ...attr) {
        // Add a Sprite (Image) to the sketch
        attr = join(...attr);
        let s = new Sprite(src, attr);
        this.add(key, s);
        return s;
    }

    circ(key, r, ...attr) {  // Add a Circle to the sketch
        attr = join(...attr);
        let c = new Circle(r, attr);
        this.add(key, c);
        return c;
    }

    text(key, text, ...attr) {  // Add Text to the sketch
        attr = join(...attr);
        let t = new Text(text, attr);
        this.add(key, t);
        return t;
    }

   line(key, x1, y1, x2, y2, ...attr) {
       // Add a line segment to the sketch
        attr = join(...attr);
        let t = new Line(x1, y1, x2, y2, attr);
        this.add(key, t);
        return t;
    }

    gridLines(x, y, attr) {  // Draw a coordinate grid and/or axes
        let n = 0, tmp;
        attr = join({stroke:"lightgrey"}, attr);
        if (y instanceof Array) {
            tmp = x instanceof Array ? x : [x, x+1, 2];
            for (let z=tmp[0]; z<=tmp[1]; z+=tmp[2])
                this.line(`GridV_${n++}`, z, y[0], z, y[1], attr);
        }
        n = 0;
        if (x instanceof Array) {
            tmp = y instanceof Array ? y : [y, y+1, 2];
            for (let z=tmp[0]; z<=tmp[1]; z+=tmp[2])
                this.line(`GridH_${n++}`, x[0], z, x[1], z, attr);
        }
        return this;
    }

    series(key, items, x, y, shift, ...attr) {
        let xa = x instanceof Array;
        let ya = y instanceof Array;
        let n = xa ? x.length : (ya ? y.length : 1);
        let pts, grList = [];
        if (y == null) pts = x;
        else {
            pts = [];
            for (let i=0;i<n;i++)
                pts.push([xa ? x[i] : x, ya ? y[i] : y]);
        }
        for (let i=0;i<n;i++) {
            let item = items instanceof Array ? items[i] : items;
            let x = pts[i][0], y = pts[i][1];
            if (shift) {
                x += shift[0];
                y += shift[1];
            }
            let pos = {x:x, y:y};
            if (typeof(item) == "string") {
                item = item.format(pos);
                item = this.text(`${key}_${i}`, item, pos, ...attr);
            }
            else if (item instanceof Image)
                item = this.sprite(`${key}_${i}`, item, pos, ...attr);
            else if (typeof(item) == "number")
                item = this.circ(`${key}_${i}`, item, pos, ...attr);
            if (item) grList.push(item);
        }
        return this;
    }

    polygon(key, pts, ...attr) {  // Add a Polygon to the sketch
        attr = join(...attr);
        let p = new Polygon(pts, attr);
        this.add(key, p);
        return p;
    }

    rect(key, x, y, w, h, anchor, ...attr) {  // Add a rectangular Polygon to the sketch
        let r = rect_info(x, y, w, h, anchor);
        let pts = [r.bottomleft, r.topleft, r.topright, r.bottomright]
        return this.polygon(key, pts, ...attr);
    }

    arrow(key, tail, tip, opt, ...attr) {  // Add an Arrow to the sketch
        attr = join(...attr);
        let p = new Arrow(tail, tip, opt, attr);
        this.add(key, p);
        return p;
    }

}


class Graphic {
    // Generic methods for graphics items; subclasses require
    // a 'draw' method for instances to be added to the sketch

    constructor(attr) {this.init(attr)}

    setIndex(i) {
        this.sketch.setIndex(this, i);
        return this;
    }

    init(attr) {
        Object.assign(this, {x:0, y:0, stroke:"black", fill:"red", lineWidth:1});
        Object.assign(this, attr);
    }

    xy() {return this.sketch.px(this.x, this.y)}
    contains(x, y) {return rect_contains(get_rect(this), x, y)}

    shift(x, y) {
        this.x += x;
        this.y += y;
    }

    dragging() {
        let sk = this.sketch;
        return sk.mouseDownStatus && this == sk.mouseDownItem;
    }

    drag() {
        let sk = this.sketch;
        if (sk.mouseDownStatus && this == sk.mouseDownItem)
            this.shift(...sk.mouseMovement);
    }

    fillStroke(cx) {  // Set the fillStyle, strokeStyle and lineWidth
        if (this.fill) {
            cx.fillStyle = this.fill;
            cx.fill();
        }
        if (this.lineWidth) {
            cx.lineWidth = this.lineWidth;
            cx.strokeStyle = this.stroke;
            cx.stroke();
        }
    }

    kinematics() {  // Update sprite position / motion
        let v = this.vel, a = this.acc;
        if (v || a) {
            if (v == null) v = [0, 0];
            if (a == null) a = [0, 0];
            this.x += v[0] + a[0] / 2;
            this.y += v[1] + a[1] / 2;
            this.vel = [v[0] + a[0], v[1] + a[1]];
        }
        if (this.spin) {
            if (!this.angle) this.angle = 0;
            this.angle += this.spin;
        }
    }

    update() {
        if (this.sketch.autoKinematics) this.kinematics();
    }

}


class _Sprite extends Graphic {

    get_rect() {return this.metrics().box}

    metrics() {
        // Find the coordinates of the corners and midpoints, and the bounding box
        let sz = this.size();
        let w = sz[0], h = sz[1];
        let w2 = w/2, h2 = h/2;
        let a = this.align.toLowerCase();
        let i = 3 * ["left", "center", "right"].indexOf(a);
        a = this.valign.toLowerCase();
        if (a == "hanging") i += 2;
        else i += 1 + ["middle", "top"].indexOf(a);
        let v = [
            [0, 0], [0, h2], [0, h],
            [w2, 0], [w2, h2], [w2, h],
            [w, 0], [w, h2], [w, h]
        ];
        v = transform({shift:[-v[i][0], -v[i][1]]}, ...v);
        v = transform({angle:this.angle * DEG, shift:[this.x, this.y]}, ...v);
        let poly = new Polygon([v[0], v[2], v[8], v[6]]);
        return {
            bottomleft:v[0], left:v[1], topleft:v[2], bottom:v[3], center:v[4],
            top:v[5], bottomright:v[6], right:v[7], topright:v[8],
            poly:poly, box:poly.get_rect()
        }
    }

    contains(x, y) {
        let v = this.metrics().poly.vertices;
        let shift = [-v[0][0], -v[0][1]];
        let a = -this.angle * DEG;
        let xy = transform({shift:shift}, [x, y]);
        xy = transform({angle:a}, ...xy)[0];
        v = transform({shift:shift}, ...v);
        v = transform({angle:a}, ...v);
        return rect_contains([0, 0, v[2][0], v[2][1]], ...xy);
    }

}

class Sprite extends _Sprite {  // Animated images

    constructor(src, attr) {
        super(attr);
        let img = src;
        if (typeof(src) == "string") {
            img = new Image();
            img.src = src;
        }
        this.img = img;
    }

    init(attr) {
        Object.assign(this, {x:0, y:0, align:"center", valign:"middle"});
        Object.assign(this, attr);
    }

    size(w, h) {
        if (!this._size && this.sketch) {
            let u = this.sketch.units;
            let img = this.img;
            this._size = [img.width / Math.abs(u[0]), img.height / Math.abs(u[1])];
        }
        if (w || h) {
            if (!this._size) this._size = [0, 0];
            if (w) this._size[0] = w;
            if (h) this._size[1] = h;
        }
        if (this._size) return this._size;
    }

    scale(f) {
        let sz = this.size();
        if (!(f instanceof Array)) f = [f, f];
        this.size(f[0] * sz[0], f[1] * sz[1]);
    }

    draw(sk, cx) {
        let xy = this.xy();
        let img = this.img;
        sk._cxTransform(cx, xy, this.angle);
        let x = 0, y = 0;
        let a = this.align.toLowerCase();
        let sz = this.size();
        let u = sk.units;
        let w = Math.abs(sz[0] * u[0]);
        let h = Math.abs(sz[1] * u[1]);
        if (a == "center") x = -w / 2;
        else if (a == "right") x = -w;
        a = this.valign.toLowerCase();
        if (a == "middle") y = -h / 2;
        else if (a == "bottom") y = -h;
        cx.drawImage(img, x, y, w, h);
        sk._cxTransform(cx, xy, this.angle, true);
        if (this.update) this.update();
    }

}


class Text extends _Sprite {

    constructor(text, attr) {
        super(attr);
        this.text = text;
    }

    init(attr) {
        Object.assign(this, {font:Text.font, x:0, y:0, fill:"black", align:"center", valign:"middle"});
        Object.assign(this, attr);
    }

    size() { // Estimate the size of the text bounding box
        if (!this.text) return [0, 0];
        let sk = this.sketch;
        let cx = sk.cx();
        cx.font = this.font;
        cx.textAlign = this.align;
        cx.textBaseline = this.valign;
        let w = cx.measureText(this.text).width;
        let h = cx.measureText("Mq");
        h = h.actualBoundingBoxDescent + h.actualBoundingBoxAscent;
        let u = sk.units;
        if (isNaN(h)) h = w / this.text.length;
        return [Math.abs(w / u[0]), Math.abs(h / u[1])];
    }

    draw(sk, cx) {
        let xy = this.xy();
        sk._cxTransform(cx, xy, this.angle);
        cx.font = this.font;
        cx.textAlign = this.align;
        cx.textBaseline = this.valign;
        if (this.fill) {
            cx.fillStyle = this.fill;
            cx.fillText(this.text, 0, 0); 
        }
        if (this.stroke) {
            cx.strokeStyle = this.stroke;
            cx.strokeText(this.text, 0, 0); 
        }
        sk._cxTransform(cx, xy, this.angle, true);
        if (this.update) this.update();
    }

}

Text.font = "22px Oxygen, sans-serif";


class Circle extends Graphic {

    constructor(r, attr) {
        super(attr);
        this.radius = r;
    }

    draw(sk, cx) {
        let r = this.radius * sk.unit;
        let xy = this.xy();
        cx.beginPath();
        cx.arc(...xy, r, 0, 2 * pi, false);
        this.fillStroke(cx);
        if (this.update) this.update();
    }

    get_rect() {  // Return the circle's bounding rectangle
        let r = this.radius;
        let x = this.x - r;
        let y = this.y - r;
        r *= 2;
        return [x, y, r, r];
    }

    contains(x, y) {  // Check if the coordinates are inside the circle
        let dx = x - this.x, dy = y - this.y;
        return Math.hypot(dx, dy) <= this.radius;
    }

}


class Line extends Graphic {

    constructor(x1, y1, x2, y2, attr) {
        super(attr);
        Object.assign(this, {x1:x1, y1:y1, x2:x2, y2:y2});
    }

    init(attr) {
        Object.assign(this, {stroke:"black", lineWidth:1, containsDistance:-1});
        Object.assign(this, attr);
    }

    draw(sk, cx) {
        let xy = this.xy();
        cx.beginPath();
        cx.moveTo(...sk.px_round(this.x1, this.y1));
        cx.lineTo(...sk.px_round(this.x2, this.y2));
        this.fillStroke(cx);
    }

    length() {
        return Math.hypot(this.x2 - this.x1, this.y2 - this.y1);
    }

    unitVector() {
        let dx = this.x2 - this.x1;
        let dy = this.y2 - this.y1;
        let r = Math.hypot(dx, dy);
        return [dx/r, dy/r];
    }

    parameters(x, y) {
        let u = this.unitVector();
        let ux = u[0], uy = u[1];
        let dx = x - this.x1;
        let dy = y - this.y1;
        return {parallel: dx * ux + dy * uy, unit:u,
            perpend: dy * ux - dx * uy, normal:[-uy, ux]}
    }

    point(s) {
        if (s == null || s == "tail") return [this.x1, this.y1];
        if (s == "tip") return [this.x2, this.y2];
        let dx = this.x2 - this.x1;
        let dy = this.y2 - this.y1;
        if (s == "middle") s = 0.5;
        else s /= Math.hypot(dx, dy);
        return [this.x1 + dx * s, this.y1 + dy * s]
    }

    closest(x, y) {
        return this.point(this.parameters(x, y).parallel);
    }

    _intersect(line) {
        let u = this.unitVector();
        let v = line.unitVector();
        let s = v[1] * u[0] - v[0] * u[1];
        if (s) {
            let dx = line.x1 - this.x1;
            let dy = line.y1 - this.y1;
            let t = (u[1] * dx - u[0] * dy) / s;
            s = (v[1] * dx - v[0] * dy) / s;
            return [s, t];
        }
        else return this.parameters(line.x1, line.y1).perpend
    }

    intersect(line) {
        let s = this._intersect(line);
        return s instanceof Array ? this.point(s[0]) : s;
    }

    intersect_segment(line) {
        let pt = this.intersect(line);
        let l = this.length();
        if (pt == 0) {
            let s1 = this.parameters(line.x1, line.y1).parallel;
            let s2 = this.parameters(line.x2, line.y2).parallel;
            s1 = _overlap(0, l, Math.min(s1, s2), Math.max(s1, s2));
            if (s1) return this.point((s1[0] + s1[1]) / 2);
        }
        else if (pt instanceof Array) {
            let s = this.parameters(...pt).parallel;
            if (s >= 0 && s <= l) {
                s = line.parameters(...pt).parallel;
                return s >= 0 && s <= line.length();
            }
        }
        return false;
    }

    info() {
        let tail = [this.x1, this.y1];
        let tip = [this.x2, this.y2];
        return {tail:tail, tip:tip, middle:midpoint(tail, tip)}
    }

    transform(shift, rotate, center, deg) {
        let p = this.info();
        if (center == null) center = p.middle;
        let opt = {shift:shift, center:center}
        if (rotate) opt.angle = rotate * (deg ? DEG : 1);
        p = transform(opt, p.tail, p.tip);
        this.x1 = p[0][0];
        this.y1 = p[0][1];
        this.x2 = p[1][0];
        this.y2 = p[1][1];
        return this;
    }

    shift(x, y) {
        return this.transform([x ? x : 0, y ? y : 0]);
    }

    rotate(angle, center) {
        let t = typeof(center);
        if (t == "string" || t == "number")
            center = this.point(center);
        return this.transform(null, angle, center);
    }

    get_rect() {
        let x1 = Math.min(this.x1, this.x2);
        let y1 = Math.min(this.y1, this.y2);
        let w = Math.max(this.x1, this.x2) - x1;
        let h = Math.max(this.y1, this.y2) - y1;
        return [x1, y1, w, h];
    }

    contains(x, y) {
        let param = this.parameters(x, y);
        let t = Math.abs(param.perpend);
        if (t <= this.containsDistance) {
            let s = param.parallel;
            let l = this.length();
            if (s >= 0 && s <= l) return true;
            if (s > l) s -= l;
            return Math.hypot(t, s) <= this.containsDistance;
        }
    }

}


class Polygon extends Graphic {

    constructor(pts, attr) {
        super(attr);
        this.vertices = pts;
    }

    init(attr) {
        Object.assign(this, {stroke:"black", lineWidth:1, closed:true});
        Object.assign(this, attr);
    }

    get_rect = function() {  // Bounding rectangle
        let v = this.vertices;
        if (v.length == 0) return [0, 0, 0, 0];
        let x0 = v[0][0], x1 = x0, y0 = v[0][1], y1 = y0;
        for (let i=1;i<v.length;i++) {
            let u = v[i];
            if (u[0] < x0) x0 = u[0];
            if (u[0] > x1) x1 = u[0];
            if (u[1] < y0) y0 = u[1];
            if (u[1] > y1) y1 = u[1];
        }
        return [x0, y0, x1-x0, y1-y0];
    }

    transform = function(shift, rotate, center, deg) {
        let v = this.vertices, n = v.length, err;
        if (this.info) {
            let c = ["tail", "middle"].indexOf(center);
            if (c >= 0) center = this.info()[center];
        }
        let opt = {angle:rotate, deg:(deg == null ? true : deg)};
        opt.center = center ? center : v[0];
        opt.shift = shift ? shift : [0, 0];
        this.vertices = v = transform(opt, ...v);
        return this;
    }

    shift = function(x, y) {
        return this.transform([x ? x : 0, y ? y : 0]);
    }

    rotate = function(angle, center) {
        return this.transform(null, angle, center);
    }

    kinematics = function() {
        let v = this.vel, a = this.acc, dx = [0, 0];
        if (v || a) {
            if (v == null) v = [0, 0];
            if (a == null) a = [0, 0];
            dx = [v[0] + a[0] / 2, v[1] + a[1] / 2];
            if (this.anchor) {
                this.anchor[0] += dx[0];
                this.anchor[1] += dx[1];
            }
            this.vel = [v[0] + a[0], v[1] + a[1]];
        }
        if (v || a || this.spin)
            this.transform(dx, this.spin, this.anchor);
    }

    draw = function(sk, cx) {
        let pts = this.vertices, p0;
        let n = pts.length;
        cx.beginPath();
        for (let i=0;i<n;i++) {
            let xy = sk.px_round(...pts[i]);
            if (i) cx.lineTo(...xy);
            else {
                cx.moveTo(...xy);
                p0 = xy;
            }
        }
        if (this.closed) cx.lineTo(...p0);
        this.fillStroke(cx);
        if (this.update) this.update();
    }

    contains(x, y) {  // Check if Polygon contains (x, y)
        let b = this.get_rect();
        let line = new Line(x, y, b[0] - b[2], b[1] - b[3]);
        let n = 0, v = this.vertices;
        for (let i=0;i<v.length;i++) {
            let u = (i == v.length - 1 ? v[0] : v[i+1]);
            let tmp = new Line(u[0], u[1], v[i][0], v[i][1]);
            if (line.intersect_segment(tmp)) n++;
        }
        return n % 2 == 1;
    }

}


class Arrow extends Polygon {

    constructor(tail, tip, opt, attr) {
        attr = join({fill: "red"}, attr);
        super(Arrow._pts(tail, tip, opt), attr);
    }

    static _pts(tail, tip, opt) {  // Calculate vertices of an arrow
        let x0 = tail[0], x1 = tip[0];
        let y0 = tail[1], y1 = tip[1];
        let L = Math.hypot(x1-x0, y1-y0);
        if (opt == null) opt = {};
        let pts = Arrow._geom(L, opt.thickness, opt.head, opt.angle, opt.shape);
        let a = Math.atan2(y1-y0, x1-x0);
        return transform({angle:a, shift:tip}, ...pts);
    }

    static _geom(L, T, H, A, shape) {  // www.desmos.com/calculator/kr61ws62tm
        if (!A) A = 35;
        if (!T) T = L / 14;
        if (!H) H = 4 * T;
        A *= DEG;
        let c = Math.cos(A), s = Math.sin(A);
        let T2 = T / 2;
        let x1 = -H * c, x2 = x1 - T * s;
        let y1 = H * s, y2 = y1 - T * c;
        let x3 = x2 - (T2 - y2) * c / s;
        if (x3 < x2 || shape == 2) x3 = x2;
        if (y2 < T2) y2 = T2;
        let pts = [[0,0], [x1, y1], [x2, y2], [x3, T2], [-L, T2],
            [-L, -T2], [x3, -T2], [x2, -y2], [x1, -y1]];
        if (shape || y1 < T2) {
            pts.splice(8, 1);
            pts.splice(1, 1);
        }
        return pts;
    }

    tip() {return this.vertices[0]}

    tail() {
        let v = this.vertices;
        let n = v.length == 9 ? 4 : 3;
        return midpoint(v[n], v[n+1]);
    }

    middle() {return midpoint(this.vertices[0], this.tail())}

}

Arrow.SHARP = 1;
Arrow.SIMPLE = 2;


class BarGraph extends Sketch {

    constructor(cv, n, yMax, dy, barWidth, margin) {
        super(cv);
        this.frameRate = 60;
        this.barWidth = barWidth;
        let l = this.yAxis = barWidth / 2 - 1;
        let r = n - barWidth / 2;
        if (margin == null) margin = 2;
        this.attachCS(l, r, 0, yMax, margin);
        this.gridLines([l, r, r-l], [0, yMax, dy], {stroke:"grey", lineWidth:0.5});
        Object.assign(this.item("GridH_0"), {stroke:"black", lineWidth:2});
    }

    labels(labels, shift, scale, ...attr) {
        let x = [];
        for (let i=0;i<labels.length;i++) x.push(i);
        this.series("Label", labels, x, 0, shift, {valign:"top"}, ...attr);
        if (scale) {
            for (let i=0;i<labels.length;i++) {
                try {
                    let item = this.item(`${"Label"}_${i}`);
                    item.scale(scale);
                } catch(x) {}
            }
        }
        return this;
    }

    values(lbl, y, shift, ...attr) {
        let y0 = y[0], y1 = y[1], dy = y[2], val = [];
        y = [];
        while (y0 <= y1) {
            y.push(y0);
            val.push(lbl.format({y:y0}));
            y0 += dy;
        }
        let opt = {align:"right", fill:"blue"};
        this.series("Value", val, this.yAxis, y, shift, opt, ...attr);
        return this;
    }

    data(key, data, ...attr) {
        for (let i=0;i<data.length;i++) {
            let k = `${key}_${i}`;
            let item = this.item(k);
            if (item) {
                let v = item.vertices;
                v[1][1] = v[2][1] = data[i];
            }
            else this.rect(k, i, 0, this.barWidth, data[i], BOTTOM, {fill: "#aaf"}, ...attr);
        }
        return this;
    }

    animation(key, y0, y1, dt) {
        this.duration = dt * this.frameRate;
        this.y0 = y0;
        this.y1 = y1;

        this.calcData = function(x) {
            let y = [];
            for (let i=0;i<this.y0.length;i++)
                y[i] = (1-x) * this.y0[i] + x * this.y1[i];
            return y;
        }

        this.ondraw = function() {
            let f = this.frameCount / this.duration;
            if (f > 1) this.pause();
            this.data(key, this.calcData(f));
        }

        this.onclick = function() {
            if (this.frameCount > this.duration) {
                this.frameCount = 0;
                this.data(key, this.calcData(0));
                this.draw();
            }
            else this.toggle();
        }

        this.data(key, this.calcData(0));
        return this;
    }

}


class VectorDiagram extends Sketch {

    constructor(cv, l, r, b, t, grid, opt) {
        let attr = {xfmt:"${x}", yfmt:"${y}", xoff:0, yoff:0,
            axis:{stroke:"black", lineWidth:2}, margin:0};
        Object.assign(attr, opt);

        super(cv);
        this.attachCS(l, r, b, t, attr.margin);
        let g;
        if (typeof(grid) == "number") {g = grid}
        else {g = grid[1]; grid = grid[0]}
        let al = {align:"left"}, vt = {valign:"top"};
        this.gridLines([l, r, grid], [b, t, grid]);
        if (attr.xfmt)
            this.series("LabelX", attr.xfmt, range(l, r+g/2, g), 0, [0, attr.xoff], vt);
        if (attr.yfmt)
            this.series("LabelY", attr.yfmt, 0, range(b, t+g/2, g), [attr.yoff, 0], al);
        let n = [l, b];
        for (let i=0; i<2; i++) {
            let item = `Grid${i?"H":"V"}_${Math.round(-n[i]/grid)}`;
            item = this.item(item);
            if (item) Object.assign(item, attr.axis);
        }
    }

    vectors(label, opt, attr, res, tail, ...v) {
        let tail1 = tail = tail ? [...tail] : [0, 0];
        let tip;
        for (let i in v) {
            tip = vsum(tail1, v[i]);
            this.arrow(`${label}${i}`, tail1, tip, opt, attr);
            tail1 = tip;
        }
        if (res) this.arrow("Σ"+label, tail, tip, opt, res);
        return this;
    }

}


class Timer {  // Timer and stopwatch

    constructor() {this.reset()}

    reset() {this.start = this.interval = Date.now()}
    time() {return Date.now() - this.start}

    lap() {
        let t = Date.now(), t0 = this.interval;
        this.interval = t;
        return  t - t0;
    }

}


/*** Miscellaneous functions ***/

function get_rect(r) {
    let err;
    try {if (!(r instanceof Array)) r = r.get_rect()}
    catch(err) {r = null}
    return r;
}

function _overlap(a0, a1, b0, b1) {
    // Calculate the overlap between two 1D ranges
    let x0 = Math.max(a0, b0);
    let x1 = Math.min(a1, b1);
    return x1 < x0 ? null : [x0, x1];
}

function rect_intersect(r1, r2) {
    // Find the intersection of two rectangular regions
    r1 = get_rect(r1);
    r2 = get_rect(r2);
    let x = _overlap(r1[0], r1[0]+r1[2], r2[0], r2[0]+r2[2]);
    let y = _overlap(r1[1], r1[1]+r1[3], r2[1], r2[1]+r2[3]);
    return x && y ? [x[0], y[0], x[1]-x[0], y[1]-y[0]] : null;
}

function rect_contains(r, x, y) {
    // Check is point (x,y) is contained within the rectangle
    if (r) {
        x -= r[0]; y -= r[1];
        return (x >= 0 && y >= 0 && x <= r[2] && y <= r[3]);
    }
}

function rect_info(x, y, w, h, anchor) {
    let ax = ay = 0;
    if (anchor) {
        ax = anchor & 3;
        ay = (anchor & 12) / 4;
    }
    let cx = ax ? x - (ax - 1.5) * w : x;
    let cy = ay ? y - (ay - 1.5) * h : y;
    let l = cx - w / 2, r = l + w;
    let b = cy - h / 2, t = b + h;
    return {center:[cx, cy],
        left:[l, cy], right:[r, cy],
        top:[cx, t], bottom:[cx, b],
        topleft:[l, t], bottomleft:[l, b],
        topright:[r, t], bottomright:[r, b]
    };
}

let LEFT = 1, RIGHT = 2, BOTTOM = 4, TOP = 8, CENTER = 0;

function join() {
    // Create a new object by assigning attributes from many(?) objects
    let obj = {}, a;
    for (a in arguments) Object.assign(obj, arguments[a]);
    return obj;
}

function range(x0, x1, dx) {
    // Python-like range function
    let r = [];
    if (dx == null) dx = 1;
    if (x1 == null) {x1 = x0; x0 = 0}
    while ((x0 < x1 && dx > 0) || (x0 > x1 && dx < 0)) {
        r.push(x0);
        x0 += dx;
    }
    return r;
}


String.prototype.format = function(vals) {
    let s = this + "";
    let r = /\$\{[^}]+\}/;
    let m = r.exec(s);
    while (m) {
        let key = m[0].slice(2, -1).split(":");
        let x = vals[key[0]];
        if (key.length > 1) {
            let f = key[1];
            let n = parseInt(f.slice(0, -1));
            f = f.charAt(f.length-1);
            if (f == "f") x = x.toFixed(n);
            else if (f == "p") x = x.toPrecision(n);
        }
        s = s.replace(m[0], x);
        m = r.exec(s);
    }
    return s;
}
