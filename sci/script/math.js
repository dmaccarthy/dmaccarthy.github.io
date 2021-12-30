function randint(n) {return Math.floor(n * Math.random())}

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
