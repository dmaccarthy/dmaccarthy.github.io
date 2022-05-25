class Vec2d {

    static parse(s) {
        let v = new Vec2d();
        s = s.trim().replace(/[\)\()]/g, "").split("@");
        if (s.length > 1) {
            v.set_ra(parseFloat(s[0]), parseFloat(s[1]));
        }
        else {
            s = s[0].split(",");
            v.set_xy(parseFloat(s[0]), parseFloat(s[1]));
        }
        return v
    }

    static sum(...args) {
        let x = 0.0, y = 0.0, tail, vs = [], i; 
        for (i=0;i<args.length;i++) {
            let a = args[i].copy();
            if (i == 0) tail = a.tail;
            x += a.x; y += a.y;
            vs.push(a);
        }
        let v = new Vec2d([x, y], tail);
        if (i) {
            v.addends = vs;
            v._calculate_addend_tails();            
        }
        return v;
    }

    constructor(x, y, z) {
    /*** Usage...
            new Vec2d([2, 2], [1, -1]) ... Vector (2, 2) with tail at (1, -1)
            new Vec2d(10, 45, [1, -1]) ... Vector 10 @ 45 with tail at (1, -1)
            new Vec2d("2,2 + 10@45")   ... Parse string and sum vectors
    ***/
        if (x == null) x = [0, 0];
        let i, vs = [];
        if (x instanceof Array) this.set_xy(x[0], x[1], y);
        else if (typeof(x) == "string") {
            x = x.split("+");
            for (i=0;i<x.length;i++)
                vs.push(Vec2d.parse(x[i]));
            if (i && y) vs[0].tail = y;
            if (i == 0) this.set_xy(0.0, 0.0, y);
            else if (i == 1) {
                vs = vs[0];
                this.set_xy(vs.x, vs.y, y);
            }
            else {
                x = Vec2d.sum(...vs);            
                this.set_xy(x.x, x.y, y);
                this.addends = x.addends;
            }
        }
        else this.set_ra(x, y, z);
    }

    set_xy(x, y, tail) {
        this.x = x;
        this.y = y;
        this.tail = tail ? tail : [0.0, 0.0];
        delete this.addends;
        return this;
    }

    set_ra(r, a, tail) {
        if (Vec2d.degrees) a *= DEG;
        let x = r * Math.cos(a);
        let y = r * Math.sin(a);
        this.set_xy(x, y, tail);
        delete this.addends;
        return this;
    }

    tip() {
        let t = this.tail;
        return [this.x + t[0], this.y + t[1]];
    }

    polar() {
        let r = root(this.x * this.x + this.y * this.y);
        let a = Math.atan2(this.y, this.x);
        while (a < 0) a += 2 * Math.PI;
        if (Vec2d.degrees) a /= DEG;
        return {"mag":r, "dir":a}
    }

    shift(dx, dy) {
        let t = this.tail;
        this.tail = [t[0] + dx, t[1] + dy];
        this._calculate_addend_tails();
        return this;
    }

    mag() {return this.polar().mag}
    dir() {return this.polar().dir}
    copy() {return new Vec2d([this.x, this.y], this.tail)}
    neg() {return new Vec2d([-this.x, -this.y], this.tail)}

    _calculate_addend_tails() {
        let a = this.addends;
        if (a) {
            for (let i=0;i<a.length;i++) 
                a[i].tail = i ? a[i-1].tip() : this.tail;
        }
    }

    // draw(sk, flags, style, push) {
    //     let v = [this, flags, style];
    //     if (push) sk.vectorList.push(v);
    //     else {
    //         sk.vectorList = [v];
    //         sk.autoScale(this);
    //     }
    //     sk.redraw();
    // }

    _limits(lims) {
        let a = this.tail, b = this.tip();
        lims[0] = Math.min(lims[0], a[0], b[0]);
        lims[1] = Math.max(lims[1], a[0], b[0]);
        lims[2] = Math.min(lims[2], a[1], b[1]);
        lims[3] = Math.max(lims[3], a[1], b[1]);
    }

    limits() {
        let lims = [0, 0, 0, 0];
        this._limits(lims);
        let v = this.addends;
        if (v) for (let i=0;i<v.length;i++) v[i]._limits(lims);
        return lims;
    }

}

Vec2d.degrees = true;

// Override deprecated functions from math.js...
window.vec = function(x,y,z) {return new Vec2d(x,y,z)};
window.vsum = function() {return Vec2d.sum(...arguments)};
