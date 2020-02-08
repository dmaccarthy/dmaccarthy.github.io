winclick.allow = false;
energyBarGraph.noLabelY();

function shm() {
    // Create SHM energy bar graph Plot instance
    let p = shm.plot = energyBarGraph("#shm", [
        ["E_k", 0],
        ["E_p", shm.E],
        ["-W", 0, "blue"],
    ], 10, 1, "%");

    // Add simple pendulum animation to plot
    let c = [5, shm.yPos(p, 1)];
    p.items.push(new Segments([c, [2.5, p.top() / 10 - 7.5 * p.ratio]], {lineWidth:2}));
    p.items.push(new Circle(c, 0.5, {fill:"#20ff20", stroke:"black", lineWidth:2}));

    // Event handlers
    $(p.cv).click(function() {shm.plot.pause()});
    p.ondraw = shm.update;
}

shm.yPos = function(p, x) {
// Calculate pendulum vertical position
    let y = 3 - Math.sqrt(9 - x * x);
    return p.top() / 10 - 2.5 * y * p.ratio;
}

shm.update = function() {
    let p = shm.plot;
    let f = p.frameCount;

    // Calculate phase
    let x = Math.cos(TWO_PI * f * shm.speed / 600);

    // Calculate energies
    let E = shm.E * Math.exp(-f * shm.damp / 30000 * shm.speed);
    let Ep = E * x * x;
    p.items[0].setData([E - Ep, Ep, shm.E - E]);

    // Calculate position
    x = Math.sqrt(Ep / shm.E) * (x < 0 ? -1 : 1);
    p.items[2].pos = p.items[1].pts[0] = [2.5 * (1 + x), shm.yPos(p, x)];
}

shm.E = 100;
shm.fps = 30;
shm.speed = 1;
shm.damp = 1;

latexPreload.onload = function() {
    shm();
    ep();
    winclick.allow = true;
}

function rewind(t) {
    let p = shm.plot;
    let f = Math.round(p.frameCount - t / (p.dt / 1000));
    p.frameCount = f < 0 ? 0 : f;
    if (p.paused) {
        p.ondraw();
        p.draw();
    }
}

function config() {
    let x = parseFloat(prompt("Pendulum Speed? [0.1-10]", shm.speed.toFixed(1)));
    if (!isNaN(x)) shm.speed = Math.min(10, Math.max(0.1, x));
    x = parseFloat(prompt("Damping [0-500]?", shm.damp.toFixed(1)));
    if (!isNaN(x)) shm.damp = Math.min(500, Math.max(0, x));
    slide(slide.index);
}
