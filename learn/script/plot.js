const PI = Math.PI, DEG = PI/180, RAD = 180/PI, TWO_PI = 2*PI;

function Plot(cv, coordSys, margin) {
// Create a Plot instance associated with a canvas element...
	if (typeof(cv) == "string") cv = $(cv)[0];

// Margin around plot area...
	if (margin == null) margin = 0;
	if (typeof(margin) == "number") margin = [margin, margin];
	if (margin.length == 2) {
		margin.push(margin[0]);
		margin.push(margin[1]);
	}

// Calculate x-scale...
	var w = parseInt(cv.getAttribute("width"));
	var h = parseInt(cv.getAttribute("height"));
	var xmin = -1, xmax = 1;
	if (coordSys) {
		xmin = coordSys[0];
		xmax = coordSys[1];
	}
	else coordSys = [];
	var xscale = (w - 1 - (margin[0] + margin[1])) / (xmax - xmin);

// Calculate y-scale...
	var yscale, ymin, ymax;
	if (coordSys.length > 2) {
		ymin = coordSys[2];
		if (coordSys.length > 3) ymax = coordSys[3];
	}
	if (ymax == null) {
		yscale = -xscale;
		var dy = (h - 1 - (margin[2] + margin[3])) / xscale;
		if (ymin == null) {ymax = dy / 2; ymin = -ymax}
		else ymax = ymin + dy;
	}
	else yscale = (h - 1 - (margin[2] + margin[3])) / (ymin - ymax);

// Set Plot instance properties...
	this.cv = cv;
	this.size = [w, h];
	this.coeff = [xscale, margin[0] - xscale * xmin, yscale, margin[3] - yscale * ymax];
    this.ratio = this.coeff[0] / this.coeff[2];
	this.ccw = this.coeff[0] * this.coeff[2] < 0;
	this.limit = [xmin, xmax, ymin, ymax];
	var clip = false;
	for (var i=0;i<4;i++) if (margin[i]) clip = true;
	this.clip = clip ? [margin[0], margin[3], w - (margin[0] + margin[1]), h - (margin[2] + margin[3])] : false;
	this.resetTime();
}

// Coordinates of canvas edges...
Plot.prototype.left = function() {return this.limit[0]}
Plot.prototype.right = function() {return this.limit[1]}
Plot.prototype.bottom = function() {return this.limit[2]}
Plot.prototype.top = function() {return this.limit[3]}

Plot.prototype.center = function() {
	return [(this.limit[0] + this.limit[1]) / 2,
		(this.limit[2] + this.limit[3]) / 2]
}

Plot.prototype.corner = function(n) {
	var x = n == 1 || n == 4 ? 0 : 1;
	var y = n < 2 ? 3 : 2;
	return [this.limit[x], this.limit[y]]
}

// Timer methods...
Plot.prototype.resetTime = function() {this._time = (new Date()).getTime()}
Plot.prototype.time = function() {return (new Date() - this._time) / 1000}

Plot.prototype.native = function() {
// Return a Plot instance using native (pixel) coordinates...
	var cv = this.cv;
	var w = parseInt(cv.getAttribute("width"));
	var h = parseInt(cv.getAttribute("height"));
	return new Plot(cv, [0, w - 1, h - 1, 0]);
}

Plot.prototype.pixels = function(r, invert) {
// Convert between Plot and canvas dimensions...
	var x = Math.abs(this.coeff[0]);
	var y = Math.abs(this.coeff[2]);
	if (invert) {x = 1/x; y = 1/y}
	return r instanceof Array ? [r[0] * x, r[1] * y] : r * Math.sqrt(x * y);
}

Plot.prototype.coords = function(xy, invert) {
// Convert between Plot and canvas coordinates...
	var a = this.coeff;
	var b = a[1], c = a[2], d = a[3];
	a = a[0];
	return invert ? [(xy[0] - b) / a, (xy[1] - d) / c] : [a * xy[0] + b, c * xy[1] + d];
}

Plot.prototype.manyCoords = function(xy, invert) {
// Convert between Plot and canvas coordinates for several points...
	var a = this.coeff;
	var b = a[1], c = a[2], d = a[3];
	a = a[0];
    let pts = [];
    for (let i=0;i<xy.length;i++) {
        let pt = xy[i];
        pts.push(invert ? [(pt[0] - b) / a, (pt[1] - d) / c] : [a * pt[0] + b, c * pt[1] + d]);
    }
	return pts;
}

Plot.prototype.cxBegin = function(alpha, clip) {
// Create a canvas 2D context with globalAlpha and clipping region...
	var cx = this.cv.getContext("2d");
	cx.save();
	if (alpha) cx.globalAlpha = alpha;
	if (clip) {
		cx.beginPath();
		clip = this.clip;
		cx.rect(clip[0], clip[1], clip[2], clip[3]);
		cx.clip();
	}
	cx.beginPath();
	return cx;
}

Plot.prototype.arc = function(center, r, angle1, angle2, style) {
// Draw an arc or sector...
	var cx = this.cxBegin(style.alpha, style.clip);
	var pt = this.coords(center);
	if (this.ccw) {
		var tmp = -angle1;
		angle1 = -angle2;
		angle2 = tmp;
	}
	cx.arc(pt[0], pt[1], this.pixels(r), angle1, angle2);
	if (style.sector) {
		cx.lineTo(pt[0], pt[1]);
		cx.closePath();
	}
	_fillStroke(cx, style.fill, style.stroke, style.lineWidth);
	cx.restore();
}

Plot.prototype.circle = function(center, r, style) {
// Draw a circle...
	this.arc(center, r, 0, TWO_PI, style, false);
}

Plot.prototype.connect = function(pts, fill, stroke, lineWidth, closed, alpha, clip) {
// Join and/or fill a sequence of points...
	var cx = this.cxBegin(alpha, clip);
	var p = closestPixel(this.coords(pts[0]));
	cx.moveTo(p[0], p[1]);
	for (var i=1;i<pts.length;i++) {
		p = closestPixel(this.coords(pts[i]));
		cx.lineTo(p[0], p[1]);
	}
	if (closed) cx.closePath();
	_fillStroke(cx, fill, stroke, lineWidth);
	cx.restore();
}

let labelOrigin = true;

function _ticks(x0, x1, dx) {
// Return a list of evenly spaced tick/grid line values...
	if (!dx || dx == true && typeof(dx) == "boolean") return [];
	else {
		var n0 = Math.floor(x0/ dx);
		var n1 = Math.ceil(x1/ dx);
		var x = [];
		while (n0 <= n1) {
            if (labelOrigin || n0) x.push(dx * n0);
            n0++;
        }
		return x;
	}
}

Plot.prototype._gridSegments = function(xs, ymin, ymax, reverse, color, width) {
// Draw a set of evenly spaced grid lines or tick marks
	for (var i=0;i<xs.length;i++) {
		var x = xs[i];
		var pts = reverse ? [[ymin, x], [ymax, x]] : [[x, ymin], [x, ymax]];
		this.connect(pts, null, color, width);
	}
}

Plot.prototype.grid = function(args) {
// Draw a coordinate grid...
	var cx;
	if (args.alpha) {
		cx = this.cv.getContext("2d");
		cx.save();
		cx.globalAlpha = args.alpha;
	}
	var lim = this.limit, color, width;
	var xmin = lim[0], xmax = lim[1], ymin = lim[2], ymax = lim[3];
	var xs = _ticks(xmin, xmax, args.x);
	var ys = _ticks(ymin, ymax, args.y);
	if (args.gridStyle) {
		color = args.gridStyle[0];
		width = args.gridStyle[1];
		this._gridSegments(xs, ymin, ymax, false, color, width);
		this._gridSegments(ys, xmin, xmax, true, color, width);

	}
	if (args.axisStyle) {
		color = args.axisStyle[0];
		width = args.axisStyle[1];
		if (args.x) this.connect([[xmin, 0], [xmax, 0]], null, color, width);	
		if (args.y) this.connect([[0, ymin], [0, ymax]], null, color, width);	
	}
	var px = this.pixels([1, 1], true);
	if (args.tickStyle) {
		var s = args.tickStyle;
		color = s[0];
		width = s[1];
		var length = s[2];
		var offset = s.length > 3 ? s[3] : -length / 2;
		var above = length + offset;
		this._gridSegments(xs, offset * px[0], above * px[0], false, color, width);
		this._gridSegments(ys, offset * px[1], above * px[1], true, color, width);
	}
	var i, s, f;
	if (args.xLabel) {
		s = args.xLabel;
		f = s.length < 5 ? Plot.fixed : s[4];
		for (i=0;i<xs.length;i++) this.text(f(xs[i], s[3]), [xs[i], s[2][1] * px[1]], s[1], s[0], s[2][0]);
	}
	if (args.yLabel) {
		s = args.yLabel;
		f = s.length < 5 ? Plot.fixed : s[4];
		for (i=0;i<ys.length;i++) this.text(f(ys[i], s[3]), [s[2][1] * px[0], ys[i]], s[1], s[0], s[2][0]);
	}
	if (args.alpha) cx.restore();
}

function _gridRound(x) {
	var n = Math.floor(Math.log(x) / Math.log(10));
	var p = Math.pow(10, n);
	x /= p;
//	if (x > 2.25 && x < 2.75) x = 2.5;
//	else {
		x = Math.round(x);
		if (x > 5 && x % 2) x += 1;
		if (x == 10) {
			x = 1;
			n++;
			p *= 10;
		}
//	}
	return [x * p, n, x];
}

Plot.prototype.optimalGrid = function(n) {
	if (n == null) n = 12;
	var dx = _gridRound((this.right() - this.left()) / n);
	var dy = _gridRound((this.top() - this.bottom()) / n);
	return {dx:dx, dy:dy}
}

Plot.fixed = function(x, n) {return x.toFixed(n);}

Plot.optimalLabel = function(x, n) {
	return x ? (Math.abs(n) > 1 ? (x / Math.pow(10, n)).toFixed(0) : x.toFixed(n == -1 ? 1 : 0)) : "";
}

Plot.prototype.plot = function(pts, args) {
// Plot a sequence of points with lines and/or markers...
    let stroke = args.stroke ? args.stroke : "black";
    if (args.lineWidth) this.connect(pts, null, stroke, args.lineWidth, false);
    if (args.fill) {
        let style = {stroke:stroke, fill:args.fill, lineWidth:1};
        let r = args.size;
        if (!r) r = this.pixels(args.pixels ? args.pixels : 6, true);
        for (let i=0;i<pts.length;i++) this.circle(pts[i], r, style);
    }
}

Plot.prototype.blit = function(img, posn, args) {
// Draw an image...
	if (args == null) args = {}
	var size = args.size ? this.pixels(args.size) : [img.width, img.height];
	if (typeof(size) == "number") {
		var f = size / Math.sqrt(Math.abs(img.width * img.height));
		size = [f * img.width, f * img.height];
	}
	posn = this.coords(posn);
	var rsize = size;
	if (args.rotate) { // Calculate rotated image size
		var s = Math.sin(args.rotate);
		var c = Math.cos(args.rotate);
		var mx = [[c, -s], [s, c]];
		var x1 = transform(size, mx);
		var y1 = Math.abs(x1[1]);
		x1 = Math.abs(x1[0]);
		var x2 = transform([size[0], -size[1]], mx);
		var y2 = Math.abs(x2[1]);
		x2 = Math.abs(x2[0]);
		rsize = [Math.max(x1, x2), Math.max(y1, y2)];
	}
	if (args.anchor) posn = _anchor(posn, rsize, args.anchor);
	var cx = this.cxBegin(args.alpha, args.clip);
	cx.translate(posn[0] + rsize[0] / 2, posn[1] + rsize[1] / 2);
	if (args.rotate) cx.rotate(this.ccw ? -args.rotate : args.rotate);
	cx.drawImage(img, -size[0] / 2, -size[1] / 2, size[0], size[1]);
	cx.restore();
}

Plot.prototype.arrow = function(tail, tip, style, args) {
// Draw an arrow...
	if (args == null) args = {}
	var pts = arrow(this.coords(tail), this.coords(tip), args.tailWidth, args.headLength, args.flatness);
	this.native().connect(pts, style.fill, style.stroke,
        style.lineWidth, true, style.alpha, style.clip);
}

Plot.prototype.fill = function(color, pt, size) {
// Fill a rectangle with uniform color...
	var cv = this.cv;
	var cx = cv.getContext("2d");
	pt = pt ? this.coords(pt) : [0, 0];
	size = size ? this.pixels(size) : [cv.width, cv.height];
    if (color) {
        cx.fillStyle = color;
        cx.fillRect(pt[0], pt[1], size[0], size[1]);
    }
    else cx.clearRect(pt[0], pt[1], size[0], size[1]);
    return this;
}

Plot.prototype.clear = function(pt, size) {return this.fill(null, pt, size)}

Plot.prototype.text = function(text, posn, font, fill, align, alpha, clip, angle) {
// Draw some text...
	var cx = this.cxBegin(alpha, clip);
	cx.font = font;
	cx.fillStyle = fill;
	if (align != null) {
		cx.textAlign = ["left", "center", "right"][align & 3];
		cx.textBaseline = ["top", "middle", "alphanumeric"][(align & 12) / 4];
	}
    angle = DEG * (angle ? angle : 0);
	posn = this.coords(posn);
    cx.translate(posn[0], posn[1]);
    cx.rotate(-angle);
	cx.fillText(text, 0, 0);
    cx.rotate(angle);
    cx.translate(-posn[0], -posn[1]);
	cx.restore();
}

Plot.prototype.eventCoords = function(ev, pixels) {
// Get event coordinates; requires jQuery...
	var e = $(this.cv);
	var x = parseFloat(e.css("padding-left")) + parseFloat(e.css("border-left-width"));
	var y = parseFloat(e.css("padding-top")) + parseFloat(e.css("border-top-width"));
	var rect = this.cv.getBoundingClientRect();
	x = (ev.clientX - rect.left - x) * this.cv.width / e.width();
	y = (ev.clientY - rect.top - y) * this.cv.height / e.height();
	return pixels ? [x, y] : this.coords([x, y], true);
}

var TOPLEFT = 0, TOP = 1, TOPRIGHT = 2, LEFT = 4, CENTER = 5,
	RIGHT = 6, BOTTOMLEFT = 8, BOTTOM = 9, BOTTOMRIGHT = 10;

function _anchor(pt, size, anchor) {
// Calculate absolute (TOPLEFT) coordinates from anchored coordinates...
	var dx = anchor & 3, dy = anchor & 12;
	pt = [pt[0] - dx * size[0] / 2, pt[1] - dy * size[1] / 8];
	return pt;
}

//function closestPixel(pt) {return pt}
function closestPixel(pt) {return [Math.round(pt[0] + 0.5) - 0.5, Math.round(pt[1] + 0.5) - 0.5]}

function arrow(tail, tip, tailWidth, headLength, flatness) {
// Calculate a set of points outlining an arrow shape...
	var dx = tip[0] - tail[0];
	var dy = tip[1] - tail[1];
	var length = Math.sqrt(dx * dx + dy * dy);
	var v = _arrow(length, tailWidth, headLength, flatness);
	var c = dx / length, s = dy / length;
	var mx = [[c, -s], [s, c]];
	return transformAll(v, mx, tail);
}

function _arrow(length, tailWidth, headLength, flatness) {
// Calculate a set of points outlining an arrow shape from (0,0) to (length, 0)...
	if (tailWidth == null) tailWidth = length / 10;
	if (headLength == null) headLength = 2.0 * tailWidth;
	if (flatness == null) flatness = 1;
	var x = length - headLength;
	var y0 = tailWidth / 2;
	var y1 = headLength * flatness / Math.sqrt(3);
	if (y1 < y0) y1 = y0;
	if (x < length / 4) x = length / 4;
	return [[0,y0], [x,y0], [x,y1], [length,0], [x,-y1], [x,-y0], [0,-y0]];
}

function transform(v, matrix, shift) {
// Apply a transformation to a single vector...
	var t = new Array(matrix.length);
	for (var i=0;i<t.length;i++) {
		var x = 0;
		for (var j=0;j<v.length;j++) x += v[j] * matrix[i][j];
		t[i] = shift ? x + shift[i] : x;
	}
	return t;
}

function transformAll(v, matrix, shift) {
// Apply the same transformation to several vectors...
	var t = new Array(v.length);
	for (var i=0;i<v.length;i++) t[i] = transform(v[i], matrix, shift);
	return t;
}

function _fillStroke(cx, f, s, w) {
// Complete the fill and stroke for a shape...
	if (f) {
		cx.fillStyle = f;
		cx.fill();
	}
	if (s) {
		cx.strokeStyle = s;
		cx.lineWidth = w == null ? 1 : w;
		cx.stroke();
	}
}
