var app = {time:"", g:9.81}, PULLEY_R = 0.05, PULLEY_Y = 1.5;

function initSim() {
	app.plot = new Plot("#Drawing", [-2.28, 0.12, 0]);
    start(true);
}

function slider(id) {
    id = `#set_${id}`;
    return parseFloat($(id).val());
}

function start(wait) {
	clearTimeout(app.timeout);
	var m1 = slider("m1");
	var m2 = slider("m2");
    var mu = slider("mu");
    $("#m1").html(m1.toPrecision(3))
    $("#m2").html(m2.toPrecision(3))
    $("#mu").html(mu.toFixed(2))
	app.a = app.g * (m1 - mu * m2) / (m1 + m2);
	app.t0 = new Date().getTime();
	draw(app.a > 0 ? wait : true);
}

function draw(wait) {
	var p = app.plot, blk = "black", tbl = "#c3a358";
	p.clear();

	var t = (new Date().getTime() - app.t0) / 1000;
	var dx = app.a / 2 * t * t;
	if (dx > 1) dx = 1;
	else app.time = t.toFixed(2) + " s";

// Mass 1
	var f = Math.sqrt(slider("m1"));
	var y1 = 1.0 - dx;
	var y2 = y1 + f / 12;
	var x2 = f / 30;
	var x1 = -x2;
	p.connect([[0,PULLEY_Y], [0,y2]], null, blk);
	p.connect([[x1,y1], [x2,y1], [x2,y2], [x1,y2]], "red", blk, 1, true);

// Pulley & Timer
	var c = [-PULLEY_R, PULLEY_Y];
	var a = 0.5 - dx / PULLEY_R;
	var px = PULLEY_R * Math.cos(a);
	var py = PULLEY_R * Math.sin(a);
	p.circle(c, PULLEY_R, {fill:"#d0d0d0", stroke:blk});
	p.connect([[-PULLEY_R - px, PULLEY_Y - py], [-PULLEY_R + px, PULLEY_Y + py]], null, blk);

	p.text(app.time, [-1.125, 0.10], "20px Source Code Pro, Lucida Console, Consolas, monospace", blk, BOTTOM);

// Table
	var y0 = PULLEY_Y + PULLEY_R;
	y1 = PULLEY_Y;
	x1 = -5 * PULLEY_R;
	x2 = x1 - 0.1;
	p.connect([[x1,y1], [x2,y1], [x2,0], [x1,0]], tbl, blk, 1, true);
	x1 = -2.25 - x1;
	x2 = x1 + 0.1;
	p.connect([[x1,y1], [x2,y1], [x2,0], [x1,0]], tbl, blk, 1, true);
	y2 = y1 - 0.1;
	x1 = -PULLEY_R;
	x2 = -2.2;
	p.connect([[x1,y1], [x2,y1], [x2,y2], [x1,y2]], tbl, blk, 1, true);
	p.circle(c, PULLEY_R/8, {fill:blk, stroke:blk});

// Mass 2
	f = Math.sqrt(slider("m2"));
	y2 = y1 + f / 18;
	x2 = -1.5 + dx;
	x1 = x2 - f / 6;
	p.connect([[-PULLEY_R,y0], [x2,y0]], null, blk);
	p.connect([[x1,y1], [x2,y1], [x2,y2], [x1,y2]], "#8080ff", blk, 1, true);

	if (dx < 1 && !wait) app.timeout = setTimeout(draw, 1);
}

function gChange() {
	var g = parseFloat(prompt("Gravitational Field in m/s^2?", app.g.toFixed(2)));
	if (!isNaN(g)) {
		app.g = g;
		$("#g").html(g.toFixed(2));
	}
}

$(initSim);
