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
