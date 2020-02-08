energyBarGraph.noLabelY();

function ramp(sel) {
    // Create ramp energy bar graph Plot instance
    let p = ramp.plot = energyBarGraph(sel, [
        ["Eg", 100],
        ["Ek", 0],
        ["Er", 0],
        ["W-", 0, "blue"],
    ], 10, 1, "%");

    p.items.push(new Segments([[0, 50], [7, 0]], {stroke:"grey", lineWidth:2}),
        new Circle([0, 52.3], 0.5, {fill:"yellow", stroke:"black"}),
        new Segments([[0, 52.3], [0.128, 52.3]], {stroke:"black", lineWidth:2}),
    );
    if (ramp.timer) p.items.push(
        new Text("0.00", [7, 100], {fill:"black", align:TOPRIGHT})
    );

    // Event handlers
    $(p.cv).click(function() {ramp.plot.pause()});
    p.ondraw = ramp.update;
}

ramp.timer = true;

ramp.rLine = function(x) {
    let p = ramp.plot;
    let xy = p.items[2].pos;
    let r = p.pixels(0.5) / p.coeff[0];
    let a = ramp.rotn ? Math.sqrt(49 + Math.pow(50/ramp.plot.ratio, 2)) / r * x : 0;
    let dx = r * Math.cos(a);
    let dy = r * ramp.plot.ratio * Math.sin(a);
    let pts = p.items[3].pts;
    pts[0] = [xy[0]+dx, xy[1]+dy];
    pts[1] = [xy[0]-dx, xy[1]-dy];
}

ramp.update = function() {
    let p = ramp.plot;
    let t = Math.pow(p.frameCount / (p.animationFrames - 1), 1);
    let x = t * t;
    let Eg = 100 * (1 - x);
    let W = 100 * (1 - ramp.eff) * x;
    let Ek = (100 - Eg - W) / (1 + ramp.rotn);
    p.items[0].setData([Eg, Ek, ramp.rotn * Ek, W]);
    p.items[2].pos = [7 * (100 - Eg) / 100, Eg / 2 + 2.3];
    ramp.rLine(x);
    if (ramp.timer) p.items[4].text = ((new Date() - ramp.t0) / 1000).toFixed(2);
}

ramp.fps = 30;
ramp.eff = 0.85;

ramp.start = function() {
    let p = ramp.plot;
    p.frameCount = 0;
    let s = $("#Shape")[0];
    ramp.rotn = eval(s.options[s.selectedIndex].value);
    let t = Math.sqrt((1 + ramp.rotn) / ramp.eff);
    p.animationFrames = Math.round(8 * t * ramp.fps);
    ramp.t0 = new Date();
    p.animate(ramp.fps);
    // p.draw();
}

ramp.config = function() {
    let x = parseFloat(prompt("Efficiency [0.01-1]?", ramp.eff));
    if (!isNaN(x)) ramp.eff = Math.max(0.01, Math.min(1, x));
}
