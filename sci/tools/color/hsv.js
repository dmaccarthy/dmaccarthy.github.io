function Colour(r, g, b) {
	this.setRGB(r, g, b);
}

Colour.prototype.text = function() {
	return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
}

Colour.prototype.setRGB = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.hsv();
}

Colour.prototype.setHSV = function(h, s, v) {
	this.h = h;
	this.s = s;
	this.v = v;
	this.rgb();
}

Colour.prototype.hsv = function() {
	var v = Math.max(this.r, this.g, this.b);
	var dv = v - Math.min(this.r, this.g, this.b);
	if (v == 0) {
		this.h = -1; this.s = 0; this.v = 0;
		return;
	}
	var h, s = dv / v;
	if (s == 0) {
		this.h = -1; this.s = 0; this.v = v / 255;
		return;
	}
	if (this.r == v) h = (this.g - this.b) / dv;
	else if (this.g == v) h = 2 + (this.b - this.r) / dv;
	else h = 4 + (this.r - this.g) / dv;
	h *= 60;
	if (h < 0) h += 360
	this.h = h; this.s = s; this.v = v / 255;
}

Colour.prototype.rgb = function() {
	var c;
	if (this.s) {
		var h = this.h;
		if (h < 0) h = 0;
		h /= 60;
		var i = parseInt(h);
		var f = h - i;
		var p = this.v * (1 - this.s);
		var q = this.v * (1 - this.s * f);
		var t = this.v * (1 - this.s * ( 1 - f ));
		if (i == 0) c = [this.v, t, p];
		else if (i == 1) c = [q, this.v, p];
		else if (i == 2) c = [p, this.v, t];
		else if (i == 3) c = [p, q, this.v];
		else if (i == 4) c = [t, p, this.v];
		else c = [this.v, p, q];
	}
	else c = [this.v, this.v, this.v];
	this.r = parseInt(Math.round(255 * c[0]));
	this.g = parseInt(Math.round(255 * c[1]));
	this.b = parseInt(Math.round(255 * c[2]));
}

var c = new Colour(255, 0, 192);
