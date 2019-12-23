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
    if ($(this.cv).is(":visible") && more) {
        let p = this;
        let t = new Date();
        this.animationClock = setTimeout(function() {p._frame()}, Math.max(1, p.dt - (t - p._time)));
        this._time = t;
    }
    else this.playing = false;
    this.frameCount++;
    this.draw();
    if (this.ondraw) this.ondraw();
}

Plot.prototype.pause = function(pause) {
    if (pause == null) pause = this.playing;
    if (pause = this.playing) {
        if (pause) {
            this.playing = false;
            clearTimeout(this.animationClock);
        }
        else this.animate();
    }
    return this;
}

Plot.itemVisible = function(item, f) {
    let frames = item.opt.frames;
    return (frames == null) ||
        (frames instanceof Array && f >= frames[0] && f <= frames[1]) ||
        (f >= frames);
}

function Grid(opt) {this.opt = opt}

Grid.prototype.draw = function(p) {p.grid(this.opt)}

function Graphic(img, pos, opt) {
    this.img = img;
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
    this.opt = opt;
}

Arrow.prototype.draw = function(p) {
    let info = this.info;
    if (info.tip) p.arrow(this.pos, info.tip, this.style, this.opt);
    else {
        let r = this.info.length / 2;
        let a = this.info.angle * Math.PI / 180;
        let dx = r * Math.cos(a);
        let dy = r * Math.sin(a);
        let y = this.pos;
        let x = y[0];
        y = y[1];
        p.arrow([x-dx,y-dy], [x+dx,y+dy], this.style, this.opt);
    }
}

function Text(text, posn, opt) {
    this.text = text;
    this.posn = posn;
    this.opt = {font:"bold 36px monospace", align:CENTER};
    if (opt) Object.assign(this.opt, opt);
}

Text.prototype.draw = function(p) {
    let opt = this.opt;
    p.text(this.text, this.posn, opt.font, opt.fill, opt.align, opt.alpha, opt.clip);
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
    let grid = Object.assign({y:tick}, energyBarGraph.grid);
    let label = Object.assign({dp:dp, offset:tick/10, unit:unit}, energyBarGraph.label);
    let p = new Plot(cv, [0, 2 * data.length - 1, 0, 10 * tick], energyBarGraph.margin);
    p.items = [new BarGraph(data, grid, {label:label})];
    return p;
}

energyBarGraph.noLabelY = function() {
    energyBarGraph.margin = [16, 16, 56, 36];
    delete energyBarGraph.grid.yLabel;
}

energyBarGraph.grid = {x:1, gridStyle:["grey", 0.5], axisStyle:["black", 2], yLabel:["black", "16px Arial", [RIGHT, -5], 0]};
energyBarGraph.label = {align:BOTTOM, font:"bold 28px monospace"};
energyBarGraph.margin = [48, 48, 56, 36];
