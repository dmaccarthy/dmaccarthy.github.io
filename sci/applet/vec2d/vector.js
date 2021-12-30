function Vector(x, y, polar) {
	if (polar) {
		var r = x, a = y * Math.PI / 180;
		x = r * Math.cos(a);
		y = r * Math.sin(a);
	}
	this.x = x;
	this.y = y;
	this.moveTo(0.0, 0.0);
}

Vector.style = {stroke:"black", fill:"#ff0000a0"};
Vector.args = {};

Vector.prototype.xy = function() {return [this.x, this.y]}
Vector.prototype.neg = function() {return new Vector(-this.x, -this.y)}
Vector.prototype.tail = function() {return new Vector(this.x0, this.y0)}

Vector.prototype.tip = function() {
	return new Vector(this.x + this.x0, this.y + this.y0);
}

Vector.prototype.mag = function() {
	var x = this.x, y = this.y;
	return Math.sqrt(x*x + y*y);
}

Vector.prototype.dir = function(rad, neg) {
	a = Math.atan2(this.y, this.x);
	if (a < 0 && !neg) a += 2 * Math.PI;
	if (!rad) a *= 180 / Math.PI;
	return a;
}

Vector.prototype.moveTo = function(x, y) {
	if (y == null) {
		x = vec(x);
		y = x.y; x = x.x;
	}
	this.x0 = x;
	this.y0 = y;
	return this;
}

Vector.prototype.draw = function(p) {
// Draw the vector to a Plot instance
	var s = this.style, a = this.args;
	p.arrow([this.x0, this.y0], this.tip().xy(),
		s ? s : Vector.style, a ? a : Vector.args);
	return this;
}

Vector.prototype.add = function() {
// Add the arguments to 'this' vector
	var i, x = this.x, y = this.y;
	for (i in arguments) {
		var a = vec(arguments[i]);
		x += a.x; y += a.y;
	}
	return new Vector(x, y);
}

Vector.prototype.sub = function(v) {
// Subtract a vector
	return this.add(v.neg());
}

Vector.prototype.times = function(s) {
// Multiply by a scalar
	return new Vector(s * this.x, s * this.y);
}

Vector.prototype.dot = function(v) {
// Scalar ("dot") product of two vectors
	return v.x * this.x + v.y * this.y;
}

Vector.prototype.cross = function(v) {
// Vector ("cross") product of two vectors
	return this.x * v.y - this.y * v.x;
}

Vector.prototype.rotate = function(a) {
// Rotate by any angle in degrees
	a *= Math.PI / 180;
	var c = Math.cos(a);
	var s = Math.sin(a);
	x = c * this.x - s * this.y;
	y = s * this.x + c * this.y;
	return new Vector(x, y);
}

Vector.prototype.normal = function() {
// Rotate by 90 degrees
	return new Vector(-this.y, this.x);
}

Vector.prototype.proj = function(v) {
// Projection onto v
	return this.dot(v) / v.mag();
}

function _str2vec(s) {
	var p = false, s0 = s;
	s = s.split("@");
	if (s.length > 1) p = true;
	else s = s[0].split(",");
	var x = parseFloat(s[0]);
	var y = parseFloat(s[1]);
	if (isNaN(x) || isNaN(y))
		throw("Error parsing string as vector: " + s0.trim());
	return new Vector(x, y, p);
}

function vec(x, y) {
// Create a vector from a string, array, vector, or (x,y)
	if (y == null) {
		if (typeof(x) == "string") return _str2vec(x);
		if (x == null) x = [0.0, 0.0];
		else if (x instanceof Vector) x = x.xy();
		y = x[1];
		x = x[0];
	}
	return new Vector(x, y);
}

function polar(r, a) {return new Vector(r, a, true)}

function sum() {
	v = new Vector(0.0, 0.0);
	return Vector.prototype.add.apply(v, arguments);
}

function parse(s) {
// Parse a string as an array of Vector instances
	s = s.split(";");
	for (var i=0;i<s.length;i++) s[i] = vec(s[i]);
	return s;
}

function join(vecs) {
// Join an array of vectors tip-to-tail
// Return the coordinate range [x0, y0, x1, y1]
	var v = vecs[0], tmp;
	var x0 = v.x0, x1 = x0 + v.x;
	var y0 = v.y0, y1 = y0 + v.y;
	if (x0 > x1) {tmp = x0; x0 = x1; x1 = tmp;}
	if (y0 > y1) {tmp = y0; y0 = y1; y1 = tmp;}
	for (var i=1;i<vecs.length;i++) {
		var u = vecs[i];
		u.moveTo(v.tip());
		tmp = u.tip();
		if (tmp.x < x0) x0 = tmp.x;
		else if (tmp.x > x1) x1 = tmp.x;
		if (tmp.y < y0) y0 = tmp.y;
		else if (tmp.y > y1) y1 = tmp.y;
		v = u;
	}
	return [x0, y0, x1, y1];
}
