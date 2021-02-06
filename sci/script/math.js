function randint(n) {return Math.floor(n * Math.random())}

function shuffle(a) {
    for (let i=a.length-1; i>0;i--) {
        let j = randint(i + 1); //Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

let pow = Math.pow, sqrt = Math.sqrt;
function sq(x) {return x*x}
function sin(x) {return Math.sin(x*DEG)}
function cos(x) {return Math.cos(x*DEG)}
function tan(x) {return Math.tan(x*DEG)}
function asin(x) {return Math.asin(x)/DEG}
function acos(x) {return Math.acos(x)/DEG}
function atan(x) {return Math.atan(x)/DEG}
function atan2(y, x) {return Math.atan2(y, x)/DEG}
function quad_form(a, b, c) {return [(-b + sqrt(b*b-4*a*c))/(2*a), (-b - sqrt(b*b-4*a*c))/(2*a)]}