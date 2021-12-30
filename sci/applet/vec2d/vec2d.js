Vector.args = {tailWidth:8, flatness:1.25}

var _cfg = {grid:1.0, gridStyle:["grey", 0.25], axisStyle:["black", 3]};
var _data = {label:"v"};
var _vec, _comp, _drag, _hist = [];

function getCanvas() {return $("#Diagram")[0]}
function getPlot() {return getCanvas().plot}
function vectors() {return _comp ? resultant() : _vec[0]}

function resultant() {
// Resultant vector from latest drawing
	var tail = _vec[1];
	var v = _vec[0];
	return v[v.length-1].tip().add(tail.neg()).moveTo(tail);	
}

function setData(k, val) {
	if (val == null || typeof(val) != "string") delete _data[k];
	else _data[k] = val;
	if (_data.draw) {
		var data = Object.assign({}, _data);
		if (data.label == "v") delete data.label;
		history.replaceState(_data, document.title,
			location.href.split("?")[0] + "?" + encodeURIComponent(JSON.stringify(data)));
	}
}


/*** Vector Diagram ***/

function _draw(p, data, tail) {
	_comp = false;
	vecDiagram(p ? p : getPlot(), data, tail);
	$("#Scale").html(_cfg.grid.toPrecision(3));
	return resultant();
}

function draw(data, tail) {
	_draw("#Diagram", data, tail);
	if (typeof(data) != "string") {
		var vecs = _vec[0];
		data = ""
		for (var i=0;i<vecs.length;i++) {
			var v = vecs[i];
			data += (i ? ";" : "") + v.x.toPrecision(4) + "," + v.y.toPrecision(4);
		}
	}
	setData("draw", data);
	setData("tail", tail);
}

function redraw() {
	if (_comp) _draw(null, [resultant()]);
	else _draw(null, _vec[0], _vec[1]);
}

function vecDiagram(cv, vecs, tail, style) {
	if (typeof(vecs) == "string") vecs = parse(vecs);
	if (vecs instanceof Array && typeof(vecs[0]) == "number")
		vecs = [vec(vecs)]
	if (vecs.length < 2) {
		if (tail) vecs[0].moveTo(tail);
		return compDiagram(cv, vecs[0]);
	}
	tail = vec(tail);
	vecs[0].moveTo(tail);
	var lims = join(vecs);
	_vec = [vecs, tail];
	if (cv instanceof Plot) drawGrid(cv);
	else cv = makePlot(cv, lims);
	for (var i=0; i<vecs.length;i++) vecs[i].draw(cv);
	r = table();
	r.style = style ? style : {stroke:"black", fill:"#0000ffc0"};
	return r.draw(cv);
}

function drawGrid(p) {
	p.clear();
	var g = _cfg.grid;
	var e = $("#Scale").closest("p");
	if (g) {
		e.show();
		g = {x:g, y:g, gridStyle:_cfg.gridStyle};
	}
	else {
		e.hide();
		g = {x:true, y:true};
	}
	g.axisStyle = _cfg.axisStyle;
	p.grid(g);
}

function compDiagram(cv, v) {
// Draw a component diagram
	var vx = vec(v.x, 0.0);
	var vy = vec(0.0, v.y);
	_comp = true;
	vecDiagram(cv, [vx, vy], v.tail());
}

function makePlot(cv, lims) {
	setData("view");
	var cx = (lims[0] + lims[2]) / 2;
	var cy = (lims[1] + lims[3]) / 2;
	var w = 0.65 * Math.max(lims[2] - lims[0], lims[3] - lims[1]);
	var p = new Plot(cv, [cx-w, cx+w, cy-w]);
	p.cv.plot = p;
	w /= 4;
	var n = Math.floor(Math.log10(w));
	var pow = Math.pow(10, n);
	w /= pow;
	w = w >= 5 ? 5.0 : (w >= 2 ? 2.0 : 1.0);
	_cfg.grid = w * pow;
	drawGrid(p);
	return p;
}


/*** Vector Addition Table ***/

function _td(x) {
	return $("<td>").html(x.toPrecision(4));
}

function _tr(v, cls) {
	var tr = $("<tr>").addClass(cls ? cls : "Addend");
	tr.append(_td(v.x));
	tr.append(_td(v.y));
	tr.append(_td(v.mag()));
	return tr.append(_td(v.dir()));
}

function table() {
	$("#Table").remove();
	var tbod = $("<tbody>");
	vecs = _vec[0];
	if (!_comp) {
		for (var i=0;i<vecs.length;i++) tbod.append(_tr(vecs[i]));
	}
	r = resultant()
	tbod.append(_tr(r, "Resultant"));
	var tr = $("<tr>");
	var v = _data.label;
	var head = ["<b>" + v + "</b><sub>x</sub>",
		"<b>" + v + "</b><sub>y</sub>", "|<b>" + v + "</b>|", "θ / °"];
	for (var i=0;i<4;i++) tr.append($("<th>").html(head[i]));
	var th = $("<thead>").append(tr);
	var tbl = $("<table>").append(th).attr({id:"Table"});
	$(th).click(function() {
		var s = prompt("Symbol? ", _data.label);
		if (s) label(s);
	});
	$("body").append(tbl.append(tbod));
	return r;
}


/*** Console actions ***/

function label(s) {
	setData("label", s)
	table();
}

function grid(g) {
// Set the grid spacing
	_cfg.grid = parseFloat(g);
	redraw();
}

function tail(v, y) {
// Set the tail position of the first vector
	setData("tail", y == null ? null : v + "," + y);
	v = y == null ? v : [v, y];
	if (_comp) {
		v = resultant().moveTo(v);
		return _draw(null, [v]);
	}
	return _draw(null, _vec[0], v);
}

function viewStr(s) {
	s = s.split(",");
	for (var i=0;i<s.length;i++) s[i] = parseFloat(s[i]);
	view(s[0], s[1], s[2], s[3]);
}

function view(l, r, b, g) {
// Set the viewport and optionally the grid spacing
	var v = l + "," + r;
	if (b) v += "," + b;
	var p = getPlot();
	p.cv.plot = new Plot(p.cv, b ? [l, r, b] : [l, r]);
	if (g) {
		grid(g);
		v += "," + g;
	}
	else redraw();
	setData("view", v);
}

function shift(x, y) {
// Shift the viewport by the specified amount
	var p = getPlot();
	p.cv.plot = new Plot(p.cv, [p.left() - x, p.right() - x, p.bottom() - y]);
	redraw();
}

function zoom(z) {
// Adjust the plot scale by the specified factor
	var p = getPlot();
	var c = p.center();
	z = 0.5 / z;
	var w = z * (p.right() - p.left());
	var h = z * (p.top() - p.bottom());
	p.cv.plot = new Plot(p.cv, [c[0] - w, c[0] + w, c[1] - h]);
	redraw();
}

function center(x, y) {
// Center the plot at the specified coordinates
	var s = vec(getPlot().center()).add(vec(-x, -y));
	shift(s.x, s.y);
}

function clear() {
	var p = getPlot();
	p.clear();
	drawGrid(p);
}

/*
function drawArrow(tail, tip, c) {
	if (c) clear();
	tail = vec(tail);
	var v = vec(tip).add(tail.neg()).moveTo(tail);
	v.draw(getPlot());
}
*/

function solo() {
	clear();
	var p = getPlot();
	for (var i=0;i<arguments.length;i++) {
		var v = arguments[i];
		if (!(v instanceof Vector)) v = vec(v);
		v.draw(p);
	}
}

/*** Event Handlers ***/

window.onmousewheel = function(ev) {
	if (ev.shiftKey) zoom(ev.wheelDelta > 0 ? 1.05 : 1/1.05);
}

window.onresize = function() {
	var w = {width: $(window).width() < 620 ? "96%" : "600px"};
	$(getCanvas()).css(w);
	$("#Cmd").css(w);
}

function cvTitle(ev) {
	var p = getPlot();
	if (p) {
		var c = p.eventCoords(ev);
		if (!_drag) p.cv.title = "(" +c[0].toPrecision(2) + ", " + c[1].toPrecision(2) + ")";
	}
}

function cvClick(ev) {
	console.log(ev);
	var p = getPlot();
	var xy = p.eventCoords(ev);
	if (ev.shiftKey) center(xy[0], xy[1]);
	else if (!cvClick.drag) {
		var t = prompt("Text?");
		if (t) {
			t = t.replace("\\D", "Δ").replace("\\S", "Σ");
			var c = prompt("Color?", "red");
			if (!c) c = "red";
			p.text(t, xy, "24px sans-serif", c, CENTER);
		}
	}
	delete cvClick.drag;
}

function cvMouseDown(ev) {
	var p = getPlot();
	if (p) _drag = vec(p.eventCoords(ev));
}

function cvMouseUp(ev) {
	var p = getPlot();
	if (p && _drag) {
		var s = vec(p.eventCoords(ev)).add(_drag.neg());
		if (s.x || s.y) {
			shift(s.x, s.y);
			cvClick.drag = true;
		}
		_drag = null;
	}
}

function cmd() {
	var e = $('#Cmd');
	var data = e.val().trim();
	if (data) {
		_hist.push(data);
		if (data.charAt(0) == "!") viewStr(data.slice(1));
		else {
			data = data.split("/");
			draw(data[0], data[1]);
		}
		e.val("").attr("data-value", 0);
	}
}

function keydown(k) {
	if (k == 13) cmd();
	else if (k == 38 || k == 40) {
		e = $("#Cmd");
		var n = _hist.length;
		var i = parseInt(e.attr("data-value"));
		i += k == 38 ? 1 : -1;
		if (i < 0) i = n;
		else if (i > n) i = 0;
		e.val(i ? _hist[n - i] : "").attr("data-value", i);
	}
}

$(function() {
	onresize();
	console.log('Drawing Commands:\n\nr = draw("2,3; 4@160")\nr = tail(2, 1)\n' +
		'view(-5, 5, -5, 1)\ngrid(1)\nlabel("F")\n\n' +
		'Vector Operations:\n\nv = vec(1, 2)\nv.mag()\nv.dir()\n' +
		'u = polar(3, 135)\nu.x\nu.y\nu.xy()\nw = u.add(v.neg())\n' +
		'vList = parse("2,3; 4@160")\n\n');
	var err, data = decodeURIComponent(location.search.slice(1));
	try {
		data = JSON.parse(data);
		if (data.label) setData("label", data.label);
		draw(data.draw, data.tail);
		if (data.view) viewStr(data.view);
	}
	catch(err) {draw("3@45")}
})
