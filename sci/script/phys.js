// let pi = Math.PI, pow = Math.pow, exp = Math.exp;
// let DEG = pi/180, RAD = 180/pi;

function sq(x) {return x*x}
function root(x, n) {return Math.pow(x, 1 / (n ? n : 2))}
function sin(d) {return Math.sin(d*DEG)}
function cos(d) {return Math.cos(d*DEG)}
function tan(d) {return Math.tan(d*DEG)}
function asin(d) {return Math.asin(d)*RAD}
function acos(d) {return Math.acos(d)*RAD}
function atan(d) {return Math.atan(d)*RAD}
function atan2(y,x) {return Math.atan2(y,x)*RAD}

function log(x, b) {
    x = Math.log(x);
    return b ? x / Math.log(b) : x;
}

function orbit(data) {
// Solve circular orbital problems given 2 of 5 variables: r, v, T, a, M
    let w = 0;
    if (data.r) {
        let r = data.r;
        if (data.T) {
            w = 2 * pi / data.T;
            data.v = w * r;
            data.a = w * w * r;
        }
        else {
            if (data.M) {
                data.a = G * data.M / sq(r);
                w = root(data.a / r);
                data.v = w * r;
            }
            else if (data.a) {
                w = root(data.a / r);
                data.v = w * r;
            }
            else if (data.v) {
                w = data.v / r;
                data.a = w * data.v;
            }
        }
    }
    else if (data.T) {
        w = 2 * pi / data.T;
        if (data.v) {
            data.a = w * data.v;
            data.r = data.v / w;
        }
        else if (data.a) {
            data.v = data.a / w;
            data.r = data.v / w;
        }
        else if (data.M) {
            data.r = root(G * data.M / sq(w), 3)
            data.v = w * data.r;
            data.a = w * data.v;
        }
    }
    else if (data.v) {
        if (data.a) {
            w = data.a / data.v;
            data.r = data.v / w;
        }
        else if (data.M) {
            data.r = G * data.M / sq(data.v);
            w = data.v / data.r;
            data.a = w * data.v;
        }
    }
    else if (data.a && data.M) {
        data.r = root(G * data.M / data.a);
        w = root(data.a / data.r);
        data.v = w * data.r;
    }
    if (!data.M) data.M = data.a * sq(data.r) / G;
    if (!data.T) data.T = 2 * pi / w;
    return data;
}

let G = 6.67e-11, Ms = 1.99e30, Me = 5.97e24, Re = 6.37e6, g = 9.81;
let c = 3.00e8, k = 8.99e9, qe = 1.6e-19, me = 9.11e-31, mp = 1.67e-27;
let h = 6.63e-34, E1 = -13.6;

function uam(data) {
// Solve uniform accelerated motion given 3 of 5 variables: a, vi, vf, d, t
    let t = data.t;
    if (t != null) {
        if (data.a != null) {
            if (data.vf != null) data.vi = data.vf - data.a * t;
            else if (data.d != null) data.vi = (data.d / t - data.a * t / 2);
        }
        else if (data.vi != null) {
            if (data.d != null) data.vf = 2 * data.d / t - data.vi;
        }
        else data.vi = 2 * data.d / t - data.vf;
    }
    else if (data.a == null)
        data.a = (sq(data.vf) - sq(data.vi)) / (2 * data.d);
    else if (data.d == null)
        data.d = (sq(data.vf) - sq(data.vi)) / (2 * data.a);
    else if (data.vf == null) {
        data.vf = root(sq(data.vi) + 2 * data.a * data.d);
        if ((data.vf - data.vi) * data.a < 0) data.vf = -data.vf;
    }
    else if (data.vi == null) {
        data.vi = root(sq(data.vf) - 2 * data.a * data.d);
        if ((data.vf - data.vi) * data.a < 0) data.vi = -data.vi;
    }

    if (data.a == null) data.a = (data.vf - data.vi) / t;
    if (data.vf == null) data.vf = data.vi + data.a * t;
    if (data.d == null) data.d = (data.vi + data.vf) * t / 2;
    if (data.t == null) data.t = (data.vf - data.vi) / data.a;
    return data;
}
