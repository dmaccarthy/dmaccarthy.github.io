Plot.prototype.draw = function(frame) {
    if (frame == null) frame = this.frameCount;
    if (frame == null) frame = 0;
    let items = this.clear().items;
    for (let i=0;i<items.length;i++) {
        let item = items[i];
        if (Plot.itemVisible(item, frame)) item.draw(this, frame);
    }
    return this;
}

Plot.prototype.animate = function(fps) {
    if (fps) {
        this.frameCount = 0;
        this.dt = 1000 / fps;
    }
    this.playing = true;
    this._time = new Date();
    this._frame();
}

Plot.prototype.playing = false;

Plot.prototype._frame = function() {
    clearTimeout(this.animationClock);
    let more = (this.animationFrames == null || this.frameCount < this.animationFrames);
    if (more) { // && $(this.cv).is(":visible")
        let p = this;
        let t = new Date();
        this.animationClock = setTimeout(function() {p._frame()}, Math.max(1, p.dt - (t - p._time)));
        this._time = t;
        this.frameCount++;
        this.draw();
        if (this.ondraw) this.ondraw();
    }
    // else {
    //     this.playing = false;
    //     if (more && this.onpause) this.onpause();
    // }
    // this.frameCount++;
    // this.draw();
    // if (this.ondraw) this.ondraw();
}

Plot.prototype.pause = function(pause) {
    if (pause == null) pause = this.playing;
    if (pause == this.playing) {
        if (pause) {
            this.playing = false;
            clearTimeout(this.animationClock);
        }
        else this.animate();
    }
    return this;
}

Plot.prototype.labels = function(labels) {
    let k;
    for (k in labels) {
        let pos = labels[k];
        let opt = pos.length > 2 ? pos[2] : {};
        let img = preload.get(k);
        if (img == null) img = new Text(k, pos, opt);
        else img = new Graphic(img, pos, opt);
        this.items.push(img);
    }
}

Plot.itemVisible = function(item, f) {
    let frames = item.opt.frames;
    return (frames == null) ||
        (frames instanceof Array && f >= frames[0] && f <= frames[1]) ||
        (f >= frames);
}

function Grid(opt) {this.opt = opt}
Grid.prototype.draw = function(p) {p.grid(this.opt)}

function PlotData(pts, opt) {this.pts = pts; this.opt = opt}
PlotData.prototype.draw = function(p) {p.plot(this.pts, this.opt)}

function Graphic(img, pos, opt) {
    this.img = typeof(img) == "string" ? preload.get(img) : img;
    this.pos = pos;
    if (opt == null) opt = {};
    this.opt = opt;
    if (opt.anchor == null)
        Object.assign(this.opt, {anchor:CENTER});
}

Graphic.prototype.draw = function(p) {p.blit(this.img, this.pos, this.opt)}

function Arrow(pos, info, style, opt) {
    this.pos = pos;
    this.info = info;
    this.style = style;
    this.opt = opt ? opt : {};
}

Arrow.prototype.draw = function(p) {
    let info = this.info;
    let opt = this.opt;
    if (info.tip) p.arrow(this.pos, info.tip, this.style, opt);
    else {
        let r = this.info.length / 2;
        let a = this.info.angle * Math.PI / 180;
        let dx = r * Math.cos(a);
        let dy = r * Math.sin(a);
        let y = this.pos;
        let x = y[0];
        y = y[1];
        p.arrow([x-dx,y-dy], [x+dx,y+dy], this.style, opt);
    }
}

function Text(text, posn, opt) {
    this.text = text;
    this.posn = posn;
    this.opt = {font:Text.font, align:CENTER};
    if (opt) Object.assign(this.opt, opt);
}

Text.font = "bold 36px monospace";

Text.prototype.draw = function(p) {
    let opt = this.opt;
    p.text(this.text, this.posn, opt.font, opt.fill, opt.align, opt.alpha, opt.clip, opt.angle);
}

function Circle(pos, r, opt) {
    this.pos = pos;
    this.r = r;
    this.opt = opt ? opt : {};
}

Circle.prototype.draw = function(p) {p.arc(this.pos, this.r, 0, TWO_PI, this.opt, false)}

function Segments(pts, opt) {
    this.pts = pts;
    this.opt = {lineWidth:1, stroke:"black", closed:false};
    if (opt) Object.assign(this.opt, opt);
}

Segments.prototype.draw = function(p) {
    let opt = this.opt;
    p.connect(this.pts, opt.fill, opt.stroke, opt.lineWidth, opt.closed, opt.alpha, opt.clip);
}

function Locus(fn, info, opt) {
    this.fn = fn;
    this.info = info;
    this.opt = {stroke:"black", closed:false};
    if (opt) Object.assign(this.opt, opt);
}

Locus.prototype.draw = function(p, frame) {
    let info = this.info, fn = this.fn, pts = [];
    let t = info.t1, t2 = info.t2, n = info.steps;
    if (t == null) info.t1 = t = p.left();
    if (t2 == null) info.t2 = t2 = p.right();
    let dt = (t2 - t) / n;
    info.frame = frame;
    for (let i=0;i<=n;i++) {
        let y = fn(t, this);
        pts.push(y instanceof Array ? y : [t, y]);
        t += dt;
    }
    p.plot(pts, this.opt);
}

function Spring(pos, info, opt) {
    // new Spring(pos, {angle:30, length:2, width:0.25, coils:12}, {stroke:"blue", lineWidth:3, frames:0});
    this.pos = pos;
    this.info = info;
    this.opt = opt ? opt : {stroke:"black", lineWidth:1};
}

Spring.prototype.draw = function(p) {
    // Get info from object
    let n = this.info.coils + 1;
    let w = this.info.width;
    let a = this.info.angle;
    let dx = this.info.length / n;

    // Generate points
    let pts = [[0, 0], [0.5 * dx, 0]];
    for (let i=1;i<n;i++)
        pts.push([i * dx, (i % 2 ? -w : w)]);
    pts.push([(n - 0.5) * dx, 0], [n * dx, 0]);

    // Convert to pixel coordinates; rotate and translate
    pts = p.manyCoords(pts);
    a = a ? -a * DEG : 0;
    let c = Math.cos(a), s = Math.sin(a);
    pts = transformAll(pts, [[1,0], [0,1]], [-pts[0][0], -pts[0][1]]);
    pts = transformAll(pts, [[c, -s], [s, c]], p.coords(this.pos));
    this.freeEnd = p.coords(pts[pts.length-1], true);

    // Draw!
    let opt = this.opt;
    p.native().connect(pts, null, opt.stroke, opt.lineWidth, false, opt.alpha, opt.clip);
}

function BarGraph(data, grid, opt) {
    this.data = data;
    this.grid = grid;
    this.opt = opt ? opt : {};
}

BarGraph.prototype.draw = function(p) {
    if (this.grid) p.grid(this.grid);
    let label = this.opt.label;
    for (let i=0;i<this.data.length;i++) {
        let data = this.data[i];
        let y = data[0];
        let x = 2 * i;
        if (y > 0) p.fill(data[1], [x, y], [1, y]);
        x += 0.5;
        let img = data[2];
        if (img) p.blit(img, [x, 0], {anchor:TOP});
        if (label != null) {
            let dp = label.dp;
            let txt = dp < 0 ? y.toPrecision(-dp) : y.toFixed(dp);
            if (label.unit) txt += label.unit;
            if (label.offset) y += label.offset;
            let fill = label.fill;
            p.text(txt, [x, y], label.font, (fill ? fill : data[1]), label.align, label.alpha, label.clip);
        }
    }
}

BarGraph.prototype.setData = function(data, t) {
    let bars = this.data;
    if (!(data instanceof Array)) data = data(p, t);
    for (let i=0;i<data.length;i++) bars[i][0] = data[i];
    return this;
}

function energyBarGraph(cv, data, tick, dp, unit) {
    for (let i=0;i<data.length;i++) {
        let d = data[i];
        let c = d.length > 2 ? d[2] : "red";
        data[i] = [d[1], c, preload.get(d[0])];
    }
    let right = 2 * data.length - 1;
    let grid = Object.assign({y:tick}, energyBarGraph.grid);
    if (grid.x == null) grid.x = right;
    let label = Object.assign({dp:dp, offset:tick/10, unit:unit}, energyBarGraph.label);
    let p = new Plot(cv, [0, right, 0, 10 * tick], energyBarGraph.margin);
    p.items = [new BarGraph(data, grid, {label:label})];
    return p;
}

energyBarGraph.noLabelY = function() {
    energyBarGraph.margin = [16, 16, 56, 36];
    delete energyBarGraph.grid.yLabel;
}

energyBarGraph.restoreDefault = function() {
    energyBarGraph.margin = [48, 48, 56, 36];
    energyBarGraph.grid.yLabel = ["black", "16px Arial", [RIGHT, -5], 0];
}

energyBarGraph.grid = {gridStyle:["grey", 0.5], axisStyle:["black", 2]};
energyBarGraph.label = {align:BOTTOM, font:Text.font};
energyBarGraph.restoreDefault();

function vectorDiagram(sel, lrbt, margin, opt) {
    if (margin == null) margin = 12;
    let dp = opt.dp;
    let grid = opt.grid == null ? 1 : opt.grid;
    let p = new Plot(sel, lrbt, margin);
    opt = {x:grid, y:grid, gridStyle:["grey", 0.5], axisStyle:["black", 2]};
    if (dp != null) opt = Object.assign(opt, {
        yLabel:["black", "20px Arial", [LEFT, 5], dp],
        xLabel:["black", "20px Arial", [BOTTOM, 5], dp]
    });
    p.items = [new Grid(opt)];
    return p;
}

Plot.prototype.tipToTail = function(vecs, style, frames) {
    let v0;
    for (let i=0;i<vecs.length;i++) {
        let v = vecs[i];
        v.drawMode = 0;
        if (style) v.style = style;
        if (frames) v.opt.frames = frames[i];
        this.items.push(v);
        if (i) v.tail = v0.tip();
        v0 = v;
    }
}
