/*

Object / JSON format (if no images are needed, can be just the array)
{"images": {
    "key1": "url1",
    "key2": "url2"
}, "draw": [
    {"cmd":"command1", ...},
    {"cmd":"command2", ...},
    ...
]}

Commands...
coords {lrbt, margin, resize}: create Plot instance and resize canvas
grid {dx, dy, lrbt}
axis {axis=(1,2,1+2)}
circle {center, r}
rect {points}
points {points, closed, size, format[align,angle], domain[steps]}; closed=polygon, +size=markers(px), -size=bars, format=text, domain=locus
img {img, pos, args}
arrow {tail, tip, middle, length, angle, args}

General arguments...
ondraw(frame): a function called after drawing
frame: a boolean, number, 2-array, or function that specifies on which frames to draw the item
fill
stroke
line

*/

function JPlot(cv, lrbt, margin, attr) {
	this.plot = new Plot($(cv ? cv : "canvas")[0], lrbt, margin);
    this.script = [];
    Object.assign(this, {stroke:"black", fill:"red", lineWidth:1, font:Plot.font});
    Object.assign(this, attr);
}

JPlot.prototype.ajax = function(url, frame) {
// Load a JSON file via AJAX and run on success
    let j = this;
    j.complete = false;
    if (typeof(frame) == "function") success = function(json) {
        frame(json);
        j.complete = true;
    };
    else success = function(json) {
        j.json(json, frame);
        j.complete = true;
    };
    $.ajax(url, {
        success: success,
        error: function(json) {console.log(json)}
    });
}

JPlot.prototype.json = function(json, frame) {
// Run a JSON file
    if (json instanceof Array) {
        this.script = json;
        this.draw(frame);
    }
    else {
        Plot.loadImages(json.images);
        this.script = json.draw;
        let j = this;
        Plot.waitForImages(function() {j.draw(frame)});
    }
}

JPlot.prototype.dataURL = function() {
// Convert the current script to a data url
    let imgs = {}, s = this.script;
    for (let i=0;i<s.length;i++) {
        if (s[i].cmd == "img"){
            let key = s[i].img;
            imgs[key] = Plot.images[key].src;
        }
    }
    j = {draw:s, images:imgs};
    return "data:application/json," + encodeURIComponent(JSON.stringify(j));
}

JPlot.prototype.active = function(cmd, frame) {
// Determine whether the command is active for the specified frame
    let f = cmd.frame;
    let t = typeof(f);
    if (t == "boolean") return f;
    else if (frame == null || f == null) return true;
    else if (t == "number") return frame >= f;
    else if (t == "function") return f.call(cmd, frame);
    return frame >= f[0] && frame <= f[1];
}

JPlot.prototype.advance = function(n, frames) {
    if (n == null) n = 1;
    n += this.frame;
    if (frames) n = (frames + n) % frames;
    this.draw(n);
}

JPlot.prototype.draw = function(frame) {
// Draw a sequence of commands
    this.plot.clear();
    this.frame = frame;
    let err, cmds = this.script;
    for (let i=0;i<cmds.length;i++) {
        let c = cmds[i];
        try {
            let a = this.active(c, frame)
            if (a) this.cmd(c);
            if (c.ondraw) c.ondraw(frame, a);
        } catch(err) {
            console.log(c);
            console.log(err);
        }
    }
    if (this.ondraw) this.ondraw(frame);
}

JPlot.prototype.pause = function() {
    clearTimeout(this._animation);
    delete this._animation;
}

JPlot.prototype.play = function(fps, frame) {
    clearTimeout(this._animation);
    let t = new Date().getTime();
    // console.log(t);
    let s = 1000 / fps;
    if (frame == null) frame = this.frame;
    this.draw(frame);
    // let dt = Math.max(0, t - (this._drawTime ? this._drawTime : 0) - s);
    // this._drawTime = t;
    let j = this;
    if (frame != null) frame++;
    this._animation = setTimeout(function() {j.play(fps, frame)}, s);
    if (this.onframe) this.onframe(frame);
}

JPlot.prototype.playing = function() {
    return this._animation ? true : false;
}

JPlot.prototype.toggle = function(fps) {
    if (this._animation) this.pause();
    else this.play(fps);
}

JPlot.prototype.cmd = function(cmd) {
// Draw a single command
    let c = cmd.cmd, p = cmd.points, plot = this.plot;
    if (p) this._data = p;
    else p = this._data;

// Style data
    if (cmd.stroke != null) this.stroke = cmd.stroke;
    if (cmd.fill) this.fill = cmd.fill;
    if (cmd.lineWidth != null) this.lineWidth = cmd.lineWidth;
    if (cmd.font) this.font = cmd.font;
    let s = this.stroke, f = this.fill, w = this.lineWidth;
    let style = {stroke:s, fill:f, lineWidth:w};

// Resize canvas and/or change coordinate system
    if (c == "coords") {
        if (cmd.resize) {
            let cv = plot.cv, sz = cmd.resize, w, h;
            if (typeof(sz) == "string") {
                sz = eval(sz);
                h = Math.round(Math.sqrt(cv.width * cv.height / sz));
                w = Math.round(sz * h);
            }
            else {w = sz[0], h = sz[1]}
            if (w != cv.width || h != cv.height)
                $(plot.cv).attr({width:w, height:h})
        }
        this.plot = new Plot(plot.cv, cmd.lrbt, cmd.margin);
    }

// Draw coordinate grid or axes
    else if (c == "grid" || c == "axis") {
        let lrbt = cmd.lrbt;
        if (!lrbt) lrbt = plot.limit;
        if (c == "grid") {
            if (cmd.dx) this.grid(0, cmd.dx, lrbt);
            if (cmd.dy) this.grid(1, cmd.dy, lrbt);
        }
        else {
            if (cmd.axis & 1) this.grid(1, 0, lrbt);
            if (cmd.axis & 2) this.grid(0, 0, lrbt);
        }
    }

// Draw an image or geometric shape
    else if (c == "img" && cmd.img) plot.blit(cmd.img, cmd.pos, cmd.args);
    else if (c == "circle") plot.circle(cmd.center, cmd.r, style);
    else if (c == "rect") {
        let xy = p[0];
        let r = p[1];
        plot.connect([xy, [xy[0],r[1]], r, [r[0], xy[1]]], f, s, w, true);
    }
    else if (c == "arrow") {
        let t = _tip_tail(cmd);
        plot.arrow(t[0], t[1], style, cmd.args);
    }

// Plot a sequence of points as a locus, polygon, data series, or bars
    else if (c == "points") {
        if (cmd.domain)
            this._data = p = this._eqnPoints(cmd);
        if (cmd.closed) plot.connect(p, f, s, w, true);
        else if (cmd.size) {
            if (cmd.size > 0) plot.plot(p, {size:cmd.size/plot.pixels(1), fill:f, stroke:s});
            else {
                let dx = -cmd.size / 2;
                for (let i=0;i<p.length;i++) {
                    let y = p[i];
                    let x = y[0];
                    y = y[1];
                    plot.connect([[x-dx, 0], [x-dx, y], [x+dx, y], [x+dx, 0]], f, s, w, true);
                }
            }
        }
        else if (cmd.format) {
            for (let i=0;i<p.length;i++) {
                let y = p[i];
                let x = y[0];
                y = y[1];
                let txt = cmd.format;
                if (txt.x != null) txt = x.toFixed(txt.x);
                else if (txt.y != null) txt = y.toFixed(txt.y);
                else if (typeof(txt) == "function") txt = txt.call(this, x, y, i, cmd);
                plot.text(txt, p[i], this.font, f, cmd.align, null, null, cmd.angle);
            }
        }
        else plot.connect(p, null, s, w);
    }
}

JPlot.prototype._eqnPoint = function(eqn, x, cmd) {
    let y, t = x;
    if (typeof(eqn) == "string") y = eval(eqn);
    else y = eqn.call(this, x, cmd);
    return typeof(y) == "number" ? [x, y] : y;
}

JPlot.prototype._eqnPoints = function(cmd) {
    let pts = [];
    let eqn = cmd.points;
    let n = cmd.steps;
    if (!n) n = 360;
    let d = cmd.domain;
    if (d == null || d == true) d = this.plot.limit;
    let x = d[0];
    let dx = (d[1] - x) / n;
    while (n--) {
        pts.push(this._eqnPoint(eqn, x, cmd));
        x += dx;
    }
    pts.push(this._eqnPoint(eqn, x, cmd));
    return pts;
}

JPlot.prototype.grid = function(dim, dx, lrbt) {
// Draw a coordinate grid or axes
	let a = dim ? 0 : 2;
	let y0 = lrbt[a], y1 = lrbt[a+1];
	let n0 = n1 = 0;
	if (dx) {
		let t = lrbt[2-a] / dx;
		n0 = Math.round(t);
		if (t - n0 > 1e-6) n0++;
		t = lrbt[3-a] / dx;
		n1 = Math.round(t);
		if (n1 - t > 1e-6) n1--;
	}
	while (n0 <= n1) {
		let x = n0 * dx;
		let pts = dim ? [[y0, x], [y1, x]] : [[x, y0], [x, y1]];
		this.plot.connect(pts, null, this.stroke, this.lineWidth);
		n0++;
	}
}

function _tip_tail(cmd) {
// Compute arrow tip and tail coordinates
    let t0 = cmd.tail, t1 = cmd.tip, r = cmd.length;
    if (r) {
        let a = cmd.angle;
        if (a) a *= DEG
        else a = 0;
        let dx = r * Math.cos(a), dy = r * Math.sin(a);
        if (t0) t1 = [t0[0] + dx, t0[1] + dy];
        else if (t1) t0 = [t1[0] - dx, t1[1] - dy];
        else {
            let y = cmd.middle;
            x = y[0]; y = y[1];
            t0 = [x - dx/2, y - dy/2];
            t1 = [x + dx/2, y + dy/2];
        }
    }
    return [t0, t1];
}

JPlot.open = function(file, cv) {
// Read JSON data from a file input and render it in a canvas as a new JPlot
    cv = $(cv ? cv : "canvas")[0];
    cv.jplot = new JPlot;
	file = $(file)[0].files[0];
    let r = new FileReader();
    r.onload = function() {cv.jplot.json(JSON.parse(r.result), 0)}
    r.readAsText(file);
}

JPlot.load = function(cv, url) {
// Load JSON data via AJAX and render as a new JPlot
    cv = $(cv)[0];
    cv.jplot = new JPlot(cv);
    cv.jplot.ajax(url, 0);
}

JPlot.loadAll = function(cvs) {
// Load all canvases using data-jplot attribute
    cvs = $(cvs ? cvs : "canvas[data-jplot]");
    for (let i=0;i<cvs.length;i++) {
        let cv = cvs[i];
        cv.jplot = new JPlot(cv);
        cv.jplot.ajax($(cv).attr("data-jplot"), 0);
    }
}

JPlot.waitForAJAX = function(cb, cv) {
    cv = $(cv ? cv : "canvas[data-jplot]");
    let done = true;
    for (let i=0;i<cv.length;i++) if (!cv[i].jplot.complete) {
        done = false;
        i = cv.length;
    }
    if (done) cb();
    else setTimeout(function() {
        JPlot.waitForAJAX(cb, cv);
    }, 100);
}
