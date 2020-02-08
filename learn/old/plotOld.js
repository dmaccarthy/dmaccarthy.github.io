Plot.prototype.plot = function(pts, args) {
// Plot a sequence of points with lines and/or markers...
	var fill = args.fill, stroke = args.stroke, marker = args.marker;
	var a = args.alpha;
	if (fill || stroke) this.connect(pts, fill, stroke, args.lineWidth, args.closed, a);
	if (marker)
		for (var i=0;i<pts.length;i++)
			this.blit(marker, pts[i], {anchor:CENTER, size:args.markerSize, rotate:args.markerRotate, alpha:a, clip:args.clip});
}

Plot.image = function (draw, size, coordSys, margin) {
// Draw a graphic as an Image instance...
	var cv = document.createElement("canvas");
	cv.width = size[0];
	cv.height = size[1];
	draw(new Plot(cv, coordSys, margin));
	img = new Image(cv.width, cv.height);
	img.src = cv.toDataURL("image/png");
	return img;
}

Plot.renderText = function (text, font, fill, alpha) {
// Render text as an Image...
	var cv = document.createElement("canvas");
	var cx = cv.getContext("2d");
	cx.font = font;
	var m = cx.measureText(text);
	text += "  jM";
	var h = _textHeight(text, font);
	return Plot.image(function(p) {
		p.native().text(text, [0,0], font, fill, 0, alpha);
	}, [parseInt(m.width) + 1, h]);
}

function _textHeight(text, font) {
// Determine height of text...
	var d = document.createElement("span");
	d.setAttribute("style", "font:"+font);
	d.textContent = text;
	document.body.appendChild(d);
	var h = d.offsetHeight;
	document.body.removeChild(d);
	return h;
}

function ImagePreload(imgs, success, error) {
// Class for preloading multiple images...
	if (typeof(imgs) == "string") imgs = [imgs];
	var n = imgs.length;
	this.img = new Array(n);
	if (success) this.success = success;
	this.complete = false;
	for (var i=0;i<n;i++) {
		var a = imgs[i], img;
		if (a instanceof Array) {
			img = new Image(a[1], a[2]);
			a = a[0];
		}
		else img = new Image();
		this.img[i] = img;
		img["data-array"] = this;
		if (success) img.onload = function() {
			var imgs = this["data-array"];
			if (!imgs.complete && imgs.done()) {
				imgs.complete = true;
				imgs.success();
			}
		}
		if (error) img.onerror = error;
		img.src = a;
	}
}

ImagePreload.prototype.loaded = function() {
// Count complete images...
	var n = 0;
	for (var i=0;i<this.img.length;i++)
		try {if (this.img[i].complete) n++}
		catch(e) {}
	return n;
}

ImagePreload.prototype.done = function() {
// Check if all images are complete...
	return this.loaded() == this.img.length;
}

var Marker = {}

Marker.cross = function(size, thick, fill, stroke, lineWidth, alpha) {
// Render a cross as an Image instance...
	return Plot.image(function(p) {
		var pts = [[thick,1],[thick,thick],[1,thick], [1,-thick], [thick,-thick], [thick,-1],
			[-thick,-1], [-thick,-thick], [-1,-thick], [-1,thick], [-thick,thick], [-thick,1]];
		p.connect(pts, fill, stroke, lineWidth, true, alpha);
	}, size, [-1,1,-1,1], Math.round(lineWidth/2));
}

Marker.rect = function(size, fill, stroke, lineWidth, alpha) {
// Render a rectangle as an Image instance...
	return Plot.image(function(p) {
		p.connect([[0,0],[0,1],[1,1], [1,0]], fill, stroke, lineWidth, true, alpha);
	}, size, [0,1,0,1], Math.round(lineWidth/2));
}

Marker.circ = function(r, fill, stroke, lineWidth, alpha) {
// Render a circle as an Image instance...
	var d = 2 * r;
	return Plot.image(function(p) {
		p.circle([0,0], 1, {fill:fill, stroke:stroke, lineWidth:lineWidth, alpha:alpha});
	}, [d,d], [-1,1,-1,1], Math.round(lineWidth/2));
}

Marker.tri = function(size, fill, stroke, lineWidth, alpha) {
// Render a triangle as an Image instance...
	if (typeof(size) == "number")
		size = [size, Math.round(size * Math.sqrt(3) / 2)];
	return Plot.image(function(p) {
		p.connect([[0,0],[1,0],[0.5,1]], fill, stroke, lineWidth, true, alpha);
	}, size, [0,1,0,1], Math.round(lineWidth/2));
}

// Plot.prototype.itemKinematics = function(t) {
//     let items = this.items;
//     for (let i=0;i<items.length;i++) {
//         let item = items[i];
//         let v = item.opt.vel;
//         if (v && item.pos)
//             item.pos = [item.pos[0] + t * v[0], item.pos[1] + t * v[1]];
//     }
//     return this;
// }
