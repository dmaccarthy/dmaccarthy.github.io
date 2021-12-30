var app = {};

function slider(id) {return parseFloat($("#" + id).val())}

function showVoltage(ask) {
    if (ask) {
        let v = parseFloat(prompt("Enter Voltage:"));
        if (!isNaN(v)) $("#Voltage").val(v);
    }
    $("#V").html(slider("Voltage").toFixed(0));
}

function initSim() {
// Initialize simulation
	var c = app.coeff = 3.2e-9 * (0.9 + 0.2 * Math.random());
	app.maxMass = c * Math.pow(5e-4, 1.5);
	c = c.toPrecision(3).toLowerCase().split("e");
	$("#Coeff").html(c[0] + (c.length > 1 ? " × 10<sup>" + c[1] + "</sup>" : ""));
	app.drops = [];
	app.plot = new Plot("#Drawing", [-0.1, 2.1, 0, 6]);
	app.lap = app.t = new Date().getTime();
	var h = Math.round(0.65 * $(window).height());
	$("#Drawing").css("max-height", h + "px");
	draw();
}

function draw() {
// Redraw the canvas
	app.plot.clear();

// Draw ruler and electric field vector
	ruler();
	var v = slider("Voltage");
    v /= 2000;
	if (v) {
		app.plot.arrow([1.9,3+v], [1.9,3-v], {stroke:"blue", fill:"#a0a0ff"}, {tailWidth:8, headLength:16});
		app.plot.text("E", [1.8,3], "bold 20px monospace", "blue", RIGHT);
	}

// Create new oil drops randomly
	var drops = app.drops;
	if (drops.length < 8 && Math.random() < 0.1)
		app.drops.push(new OilDrop());

// Update time	
	var t = new Date().getTime();
	var dt = (t - app.t) / 1000;
	app.t = t;

// Draw or remove oil drops; schedule redrawing
	for (var i=0;i<drops.length;i++)
		if (drops[i].draw(dt)) drops.splice(i--, 1);
	setTimeout(draw, 2);
}

function ruler() {
// Draw the ruler
	var p = app.plot;
	p.connect([[0,0], [1,0], [1,6], [0,6]], "#f4f4ff", "black", 1, true);
	for (var y=0;y<6;y++) {
		if (y) {
			p.connect([[0.3,y], [1,y]], null, "black", 1);
			p.text(y, [0.15,y], "20px monospace", "black", CENTER);
		}
		for (var i=1;i<5;i++) {
			var z = y + i / 5;
			p.connect([[0.6,z], [1,z]], null, "black", 1);
		};
	}
	p.text("mm", [0.15,0.05], "20px monospace", "black", BOTTOM);
}

function timer() {
// Update the "lap timer"
    $("#Voltage")[0].value = 0
	var t = new Date().getTime();
	var dt = (t - app.lap) / 1000;
	$("#Lap").html(dt.toFixed(2));
	app.lap = t;
}

/*** OilDrop class ***/

function OilDrop() {
	this.term = 0.1 + 0.4 * Math.random();
	this.mass = app.coeff * Math.pow(this.term/1000, 1.5);
	this.r = 0.05 * Math.pow(this.mass / app.maxMass, 0.33);
	this.y = 6.2;
	this.x = 1.4 * Math.random(); //2
	this.charge = Math.round(12 * Math.exp(-4 * Math.random()));
}

OilDrop.prototype.draw = function(t) {
	this.y += this.speed() * t;
	var d = this.done();
	if (!d) //	console.log([this.x, this.y]);
		app.plot.circle([this.x, this.y], this.r, {fill:"black"});
	return d;
}

OilDrop.prototype.speed = function() {
	var fg = this.mass * 9.81;
	var v = (this.charge * 1.602e-19 * slider("Voltage") / 0.006 - fg) / fg;
	return this.term * (v<0 ? -Math.pow(-v, 0.5) : Math.pow(v, 0.5));
}

OilDrop.prototype.done = function() {
	return this.y <= -0.1 || this.y >= 6.25;
}


// Run...

$(function() {
	initSim();
})
