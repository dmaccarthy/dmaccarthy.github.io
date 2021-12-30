/***
 * 
 * sketch5.js is a library of classes for making drawings
 * and animations in a canvas element. This library depends
 * on math.js (located in the same folder as this file) and
 * also on jQuery <https://code.jquery.com/jquery-3.6.0.min.js>!
 * 
 * (c) 2021 by D.G. MacCarthy <sc8pr.py@gmail.com>
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

    attachCS(l, r, b, t) {
        // Attach a coordinate system to the existing-size canvas
        let sz = this.canvasSize();
        let w = sz[0] - 1;
        let h = sz[1] - 1;
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
        this.px = function(x, y) {return [sx * (x - l), h + sy * (y - b)]}
        this.cs = function(x, y) {return [x / sx + l, (y - h) / sy + b]}
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
        return [m[0] - 1, m[1] - 1, w + 2, h + 2];
    }

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
        let ev1 = "mousemove mousedown mouseup touchmove touchstart touchend";
        let ev2 = ev1 + " click dblclick wheel";
        if (bind) {
            if (which & 2) $(this.canvas).on(ev2, Sketch._mouse_monitor);
            if (which & 1) $(this.canvas).on(ev1, Sketch._mouse_handle);
        }
        else {
            if (which & 2) $(this.canvas).off(ev2, Sketch._mouse_monitor);            
            if (which & 1) $(this.canvas).off(ev1, Sketch._mouse_handle);
        }
    }

    static _mouse_monitor(e) {
    /* Monitor mouse motion/clicks and store the following data...
        mousePos {x, y, px, py}
        mouseMovement [x, y]
        mouseDownStatus: 1=down, 0=up
        mouseHoverItem: item mouse is pointing to
        mouseDownItem: last mousedown item
        mouseDropItem: released item
    */
        let sk = this.sketch;
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
        else if (e.type == "mouseup" || e.type == "touchend") {
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
            if (item.contains(x, y)) hover.push(item);
        }
        return hover;
    }

    itemAt(x, y) {  // Return the "top" item at (x, y)
        if (y == null) {y = x.y; x = x.x;}
        let items = this.items;
        let n = items.length;
        while (n--) if (items[n].contains(x, y))
            return items[n];
        return this;
    }


// Drawing...

    draw () {  // Draw the current frame
        let cx = this.cx();
        cx.clearRect(0, 0, ...this.canvasSize());
        let items = [...this.items];
        let n = items.length, i;
        try {
            for (i=0; i<n; i++) items[i].draw(this, cx);
            for (i=0; i<n; i++) if (items[i].ondraw) items[i].ondraw();
            if (this.ondraw) this.ondraw();
        } catch(i) {};
        this.frameCount++;
        return this;
    }


// Animation...

    static animate(sk) {
        clearTimeout(this._nextdraw);
        delete this._nextdraw;
        if (!sk.paused) {
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

    config(attr, ...objs) {
        for (let i in objs) {
            let obj = objs[i];
            if (typeof(obj) == "string") obj = this.item(obj);
            Object.assign(obj, attr);
        }
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
        // let n = Sketch.prototype.gridLines.count, tmp;
        // if (!n) n = 0;
        let n = 0, tmp;
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
        // Sketch.prototype.gridLines.count = n;
    }

    series(key, items, x, y, shift, ...attr) {
        let xa = x instanceof Array;
        let ya = y instanceof Array;
        let n = xa ? x.length : y.length;
        let pts, grList = [];
        if (y == null) pts = x;
        else {
            pts = [];
            for (let i=0;i<n;i++)
                pts.push([xa ? x[i] : x, ya ? y[i] : y]);
        }
        for (let i=0;i<n;i++) {
            let item = items instanceof Array ? items[i] : item;
            let x = pts[i][0], y = pts[i][1];
            if (shift) {
                x += shift[0];
                y += shift[1];
            }
            if (typeof(item) == "string")
                item = this.text(key + i, item, {x:x, y:y}, ...attr);
            else if (item instanceof Image)
                item = this.sprite(key + i, item, {x:x, y:y}, ...attr);
            else if (typeof(item) == "number")
                item = this.circ(key + i, item, {x:x, y:y}, ...attr);
            if (item) grList.push(item);
        }
        return grList;
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
