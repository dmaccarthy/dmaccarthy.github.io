// const DEG = Math.PI / 180;

function Vector(xy, tail) {
    this.xy = xy;
    this.tail = tail ? tail : [0, 0];
    this.opt = {tailWidth:12};
}

Vector.prototype.setTail = function(tail) {
    this.tail = tail;
    return this;
}

Vector.prototype.tip = function() {
    let xy = this.xy;
    let t = this.tail;
    return [xy[0] + t[0], xy[1] + t[1]];
}

Vector.prototype.polar = function() {
    let y = this.xy;
    let x = y[0];
    y = y[1];
    let r = Math.sqrt(x*x + y*y);
    let a = Math.atan2(y, x);
    return {mag:r, rad:a, deg:a/DEG};
}

Vector.prototype.mag = function() {return this.polar().mag}
Vector.prototype.dir = function() {return this.polar().deg}

Vector.style = {fill:"#0000ffa0", stroke:"black"};
Vector.style0 = {fill:"#ff0000a0", stroke:"black"};

Vector.prototype.draw = function(p) {
    let style = this.style ? this.style : Vector.style;
    let mode = this.drawMode;
    let tip = this.tip();
    let tail = this.tail;
    if (mode == null) mode = this.addends ? 2 : 1;
    if (mode == 1) {
        let xy = [tip[0], tail[1]];
        p.arrow(tail, xy, Vector.style0, this.opt);
        p.arrow(xy, tip, Vector.style0, this.opt);
    }
    else if (mode == 2 && this.addends.length > 1) {
        let x0 = tail[0], y0 = tail[1];
        for (let i=0;i<this.addends.length;i++) {
            let v = this.addends[i];
            let x = x0 + v.xy[0];
            let y = y0 + v.xy[1];
            p.arrow([x0, y0], [x, y], Vector.style0, this.opt);
            x0 = x; y0 = y;
        }
    }
    p.arrow(tail, tip, style, this.opt);
}

Vector.polar = function(r, a, tail) {
    let x = r * Math.cos(a);
    let y = r * Math.sin(a);
    return new Vector([x, y], tail);
}

Vector.sum = function(v) {
    let x = y = 0, i;
    for (i=0;i<v.length;i++) {
        let xy = v[i].xy;
        x += xy[0];
        y += xy[1];
    }
    let res = new Vector([x, y]);
    if (i > 1) res.addends = v;
    return res;
}

function _vec(s) {
    if (s instanceof Vector)
        return new Vector(s.xy, s.tail);
    if (s instanceof Array)
        return new Vector(s);
    if (typeof(s) == "string") {
        s = s.split("@");
        if (s.length > 1)
            return Vector.polar(parseFloat(s[0]), parseFloat(s[1]) * DEG);
        s = s[0].split(",");
        return new Vector([parseFloat(s[0]), parseFloat(s[1])]);
    }
}

function vec() {
    if (typeof(arguments[0]) == "number")
        return new Vector([arguments[0], arguments[1]]);
    let args = [], i;
    for (i=0;i<arguments.length;i++) {
        let arg = arguments[i];
        if (typeof(arg) == "string") {
            arg = arg.split(";");
            args = args.concat(arg);
        }
        else args.push(arg);
    }
    for (i=0;i<args.length;i++) args[i] = _vec(args[i]);
    return Vector.sum(args);
}
