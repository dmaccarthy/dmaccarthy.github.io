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

function join() {
    // Create a new object by assigning attributes from many(?) objects
    let obj = {}, a;
    for (a in arguments) Object.assign(obj, arguments[a]);
    return obj;
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
