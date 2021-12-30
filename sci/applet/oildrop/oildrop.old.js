
/*** Timer ***/

var start, lapTime = 0;

function updateTimer() {
	var t = (new Date().getTime() - start) / 1000;
	$("#Time").html(Math.floor(t).toFixed(0));
}

function lap() {
	var t = new Date().getTime() - start;
	var dt = (t - lapTime) / 1000;
	lapTime = t;
	$("#Lap").html((t/1000).toFixed(2));
	$("#Interval").html(dt.toFixed(2));
}


/*** Update the drawing canvas and timer ***/

function draw() {
// Clean-up...
	updateTimer();
	app.cv.clear();
	ruler();

// Draw droplets...
	var tmp = new Date().getTime();
	var t = (tmp - app.when) / 1000;
	app.when = tmp;
	var n = app.drops.length;
	if (n < 8 && randint(0, 10*n) == 0)
		app.drops.push(new OilDrop());
	for (var i=0;i<app.drops.length;i++) {
		n = app.drops.length - 1 - i;
		var d = app.drops[n];
		if (d.done()) app.drops.splice(n, 1);
		else d.draw(t);
	};

// Draw electrodes...
	app.cv.rect([-3,6.2], [6,0.2], {fill:"#a0a0a0"});
	app.cv.rect([-3,0], [6,0.2]);

// Schedule redraw...
	setTimeout(draw, 60);
}


/*** Draw the ruler ***/

function ruler() {
	app.cv.rect([-0.6,6],[1.2,6], {fill:"#f4f4ff"});
	for (var y=0;y<6;y++) {
		app.cv.join([[-0.2,y], [0.6,y]]);
		for (var i=1;i<5;i++) {
			var z = y + i / 5;
			app.cv.join([[0.2,z], [0.6,z]]);
		};
	}
}


/*** Zero voltage and start lap timer ***/

function timeDrop() {
	var s = app.voltage;
	lap();
	s.value(0, true);
	s.change();
}


/*** "Class" for individual oil drop instances ***/

function OilDrop() {
	this.term = rand(0.1, 0.5);
	this.mass = app.coeff * Math.pow(this.term/1000, 1.5);
	this.r = 0.2 * Math.pow(this.mass / app.maxMass, 0.33);
	this.y = 6;
	this.x = rand(-1, 1);
	this.charge = Math.round(12 * Math.exp(rand(-4,0)));
}

OilDrop.prototype.draw = function(t) {
	this.y += this.speed() * t;
	if (!this.done()) app.cv.ellipse([this.x, this.y], this.r, {fill:"black"});
}

OilDrop.prototype.speed = function() {
	var fg = this.mass * 9.81;
	var v = (this.charge * 1.602e-16 * app.voltage.value() / 0.006 - fg) / fg;
	return this.term * (v<0 ? -Math.pow(-v, 0.5) : Math.pow(v, 0.5));
}

OilDrop.prototype.done = function() {
	var r = this.r * 0;
	return this.y - r <= -0.1 || this.y + r >= 6.1;
}


/*** Main Program ***/

var app = {};

function main() {
/*/ Document...
	$("[data-link=png]").attr({title:"This feature does not work in Internet Explorer."});
	$("th").css("width", "6em");
	menuMargin = false;
	*/

// Parameters...
	app.coeff = 3.2e-9 * (0.9 + 0.2 * Math.random());
	app.maxMass = app.coeff * Math.pow(5e-4, 1.5);
	console.log(app.coeff);

// Voltage slider...
	var s = new Slider("#Voltage", 0, 3, 0, 0.01);
	s.fixed = 2;
	s.change = function() {$("#kV").html(s.value().toFixed(2) + " kV")}
	app.voltage = s;

/*
// Canvas...
	app.cv = new Canvas("#Drawing", {left:-3, right:3, bottom:-0.25, top:6.25});
//	$(app.cv.cv).click(timeDrop);

// Run...
	app.drops = [new OilDrop(app)];
	app.when = start = new Date().getTime();
	lap();
	draw();
	*/
}
