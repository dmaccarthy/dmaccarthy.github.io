function randint(n) {return Math.floor(n * Math.random())}
function uniform(a, b) {return a + (b - a) * Math.random()}

function shuffle(a) {
    for (let i=a.length-1; i>0;i--) {
        let j = randint(i + 1); //Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

let pi = Math.PI, pow = Math.pow, exp = Math.exp;
let DEG = pi/180, RAD = 180/pi;

function midpoint(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

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

/*** Deprecated but used in...

sketch5.js
p30\mom\collide2d.html
p30\mom\vec.html

***/

function vec(r, a) {return [r * cos(a), r * sin(a)]}

function vsum(...v) {
    let n = v[0].length;
    let s = [...v[0]];
    for (let i=1;i<v.length;i++) {
        for (let j=0;j<n;j++) s[j] += v[i][j];
    }
    return s;
}

/*** Deprecated and unused...

function polar(x, y) {
    if (y == null) {y = x[1]; x = x[0]}
    let a = atan2(y, x);
    return [root(x*x + y*y), a < 0 ? a + 360 : a];
}

function neg(x) {
    let n = [];
    for (let i in x) n.push(-x[i]);
    return n;
}

function dot(a, b) {
    let d = 0;
    for (let i=0; i<a.length; i++)
        d += a[i] * b[i];
    return d;
}

function cross(a, b) { // 2D cross product
    return a[0] * b[1] - a[1] * b[0];
}

***/


function _SSS(a, b, c) {
    // Calculate angle C from sides a, b, c
    return acos((c*c - a*a - b*b) / (-2*a*b));
}

function SSS(a, b, c) {
    // Calculate angles A, B, C from sides a, b, c
    return [_SSS(b, c, a), _SSS(a, c, b), _SSS(a, b, c)];
}

function SAS(a, C, b) {
    // Calculate angle A, side c, angle B from others
    let c = root(a*a + b*b - 2*a*b*cos(C));
    let A = _SSS(b, c, a);
    return [A, c, 180-(A+C)];
}

function ASA(A, b, C) {
    // Calculate side a, angle B, side c from others
    let B = 180 - (A + C);
    b /= sin(B);
    let a = b * sin(A);
    let c = b * sin(C);
    return [a, B, c];
}

function SSA(a, b, A, ambig) {
    // Calculate side c, angle C, angle B
    let B = asin(b * sin(A) / a);
    if (ambig) B = 180 - B;
    let C = 180 - (A + B);
    if (C >= 0)
        return [root(a*a + b*b - 2*a*b*cos(C)), C, B];
}

function quad_form(a, b, c) {return [(-b + sqrt(b*b-4*a*c))/(2*a), (-b - sqrt(b*b-4*a*c))/(2*a)]}

function transform(opt, ...pts) {
/* 
    opt.angle = rotation angle
    opt.deg = degrees(true) / radians(false)
    opt.center = center of rotation
    opt.shift = shift after rotation
    pts = array of points
*/
    let a = opt.angle ? opt.angle : 0;
    if (opt.deg) a *= DEG;
    let c = Math.cos(a);
    let s = Math.sin(a);
    let xc = yc = 0;
    if (opt.center) {
        xc = opt.center[0];
        yc = opt.center[1];
    }
    let dx = xc;
    let dy = yc;
    if (opt.shift) {
        dx += opt.shift[0];
        dy += opt.shift[1];
    }
    let t = [];
    for (let i=0;i<pts.length;i++) {
        let x = pts[i][0] - xc;
        let y = pts[i][1] - yc;
        t.push([x * c - y * s + dx, x * s + y * c + dy]);
    }
    return t;
}
