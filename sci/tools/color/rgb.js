// Offset to upper left corner due to border and padding...

function bpOffset(e) {
	var x = parseFloat(e.css("padding-left")) + parseFloat(e.css("border-left-width"));
	var y = parseFloat(e.css("padding-top")) + parseFloat(e.css("border-top-width"));
	return [x,y]
}

// Position of mouse event...

function clickPosn(ev, elem) {
	var rect = elem.getBoundingClientRect();
	var bp = bpOffset($(elem ? elem : ev.target));
	return [ev.clientX - rect.left - bp[0], ev.clientY - rect.top - bp[1]];
}



var locked = true;
var lock = new Colour(255,0,255);
var preview = new Colour(255,0,255);
var sliderPad = 4;

window.onload = function() {
	setMode($("#rgbMode")[0].checked);
	var s = $("td.Slider");
	s.mousemove(mousemove);
	s.mouseout(mouseout);
	s.click(function() {lock = new Colour(preview.r, preview.g, preview.b)});
	$("input[type=text]").change(setColour);
	draw();
	var c = $("#Controls input");
	names = ["RGB", "HS", "V"];
	for (var i=0;i<c.length;i++) showControls(names[i], c[i].checked);
}

function mousemove(ev) {
	locked = false;
	var e = ev.target;
	var x = Math.round(clickPosn(ev, e)[0]) - sliderPad;
	if (x < 0) x = 0;
	else if (x > 255) x = 255;
	var id = e.id.charAt(0).toLowerCase();
	if (id=="v") preview.setHSV(preview.h, preview.s, x/255);
	else {
		preview[id] = x;
		preview.setRGB(preview.r, preview.g, preview.b);
	}
	draw();
}

function mouseout() {
	locked = true;
	preview = new Colour(lock.r, lock.g, lock.b);
	draw();
}

function wheel(ev) {
	var xy = clickPosn(ev, ev.target);
	var x = xy[0] - 128;
	var y = xy[1] - 128;
	var r = mag(x, y) / 128;
	if (r <= 1) {
		var a = x ? Math.atan(y/x) * 180 / Math.PI : (y > 0 ? 90 : 270);
		if (x < 0) a += 180;
		if (a < 0) a += 360;
		if (ev.type == "click") {
			lock.setHSV(a, r, 1);
			preview.setRGB(lock.r, lock.g, lock.b);
		}
		else {
			locked = false;
			preview.setHSV(a, r, 1);
		}
		draw();
	}
}

function setMode(rgb) {
	var w = $("#Wheel");
	var c = $("#Canvas");
	(rgb ? w : c).hide();
	(rgb ? c : w).show();
}

function draw() {
	var c = locked ? lock : preview;
	$("#Red").css({background:new Colour(c.r, 0, 0).text()});
	$("#Green").css({background:new Colour(0, c.g, 0).text()});
	$("#Blue").css({background:new Colour(0, 0, c.b).text()});
	$("#Value").css({background:c.text()});
	$("#R").val(c.r);
	$("#G").val(c.g);
	$("#B").val(c.b);
	$("#H").val(c.h.toFixed(1));
	$("#S").val((100 * c.s).toFixed(1));
	$("#V").val((100 * c.v).toFixed(1));
	rgbLights(c);
}

function mag(x, y) {
	return Math.sqrt(x*x + y*y);
}

function rgbLights(c) {
	var cv  = $("canvas")[0];
	var cx = cv.getContext("2d");
	var w = cv.width, h = cv.height, R = 104;
	var img = cx.createImageData(w, h);
	var data = img.data;
	var i = 0;
	for (var y=0; y<h; y++) {
		for (var x=0; x<w; x++) {
			var r = mag(x-(w-1-R), y-h/2) < R;
			var g = mag(x-R, y-(h-1-R)) < R;
			var b = mag(x-R, y-R) < R;
			data[i++] = r ? c.r : 0;
			data[i++] = g ? c.g : 0;
			data[i++] = b ? c.b : 0;
			data[i++] = r||g||b ? 255 : 0;
		}
	}
	cx.putImageData(img, 0, 0);
}

function setColour(ev) {
	var limit = {H:360-1e-7, S:100, V:100, R:255, G:255, B:255}
	var e = ev.target;
	var id = e.id;
	var rgb = "RGB".search(id) >= 0;
	var v = (rgb ? parseInt: parseFloat)(e.value);
	if (!isNaN(v)) {
		if (v < 0) v = 0;
		else {
			var vMax = limit[id];
			if (v > vMax) v = vMax;
		}
		lock[id.toLowerCase()] = "SV".search(id) >= 0 ? v / 100 : v;
		if (rgb) lock.setRGB(lock.r, lock.g, lock.b);
		else lock.setHSV(lock.h, lock.s, lock.v);
		preview.setRGB(lock.r, lock.g, lock.b);
	}
	draw();
}

function showControls(name, s) {
	
	var tr = $("tr." + name);
	// if (n == 0) tr = $("tr.RGB")
	// else if (n == 1) tr = $();		
	// else if (n == 2) tr = tr.slice(8, 10);		
	if (s) tr.show();
	else tr.hide();
}
