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
        Object.assign(this, {font:"24px monospace", x:0, y:0, fill:"black", align:"center", valign:"middle"});
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
