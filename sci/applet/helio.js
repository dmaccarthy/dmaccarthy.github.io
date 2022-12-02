/***
 * 
 * Animation of Heliocentric Solar System model showing retrograde motion of Mars
 * (c) 2020-2022 by D.G. MacCarthy
 * 
***/

let zodiac = ["Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo",
    "Virgo", "Libra", "Scorpius", "Sagittarius", "Capricornus", "Aquarius"];

function Helio(cv, margin, font) {
    let x = 1.57; // Mars = 1.54 au
    let j = this.jplot = new JPlot(cv, [-x, x], margin, {
        font: font ? font : "bold 36px monospace",
        lineWidth: 2,
        time: 0,
        ondraw: Helio.update,
        planet: Helio.planet,
        script: [
            {id:"Line", cmd:"points", points:new Array(2), stroke:"white","frame":false},
            {id:"Sun", cmd:"circle", r:0.06, center:[0,0], fill:"yellow", stroke:false},
            {id:"Earth", cmd:"circle", r:0.04, au:1, fill:"#8080ff"},
            {id:"Mars", cmd:"circle", r:0.025, au:1.5373, fill:"#ff8080"},
            {id:"Mercury", cmd:"circle", r:0.015, au:0.3871, fill:"grey"},
            {id:"Venus", cmd:"circle", r:0.035, au:0.7233, fill:"#ffffe0"},
            {id:"Time", cmd:"points", points:[[x, x]], fill:"white", align:TOPRIGHT, format:function() {
                return this.time.toFixed(2);
            }} 
        ]
    });
    j.line = j.script[0];
    j.config = function() {Object.assign(this, {speed:0.01, south:false})};
    j.ondraw();
}

Helio.update = function() {
// Update timer and planet positions (this = JPlot instance)
    this.config();
    this.time += this.speed / TWO_PI;
    for (let i=0;i<this.script.length;i++) {
        let p = this.script[i];
        if (p.au) {
            if (p.T == null) {
                p.T = Math.pow(p.au, 1.5);
                p.theta = TWO_PI * Math.random();
            }
            this.planet(p);
        }
    }
}

Helio.planet = function(p) {
// Update planet position (this = JPlot instance)
    p.theta += this.speed / p.T;
    if (p.theta > TWO_PI) p.theta -= TWO_PI;
    let a = this.south ? -p.theta : p.theta;
    let r = p.au;
    p.center = [r * Math.cos(a), r * Math.sin(a)];
// Update Earth-Mars line
    let i = ["Earth", "Mars"].indexOf(p.id);
    if (i >= 0) this.line.points[i] = p.center;
}
