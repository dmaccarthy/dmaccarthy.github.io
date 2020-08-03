function vt(sel, t, vi, vf, opt) {
    let v0 = Math.min(0, vi, vf);
    let v1 = Math.max(0, vi, vf);
    let dx = (v1 - v0) / 40;
    let p = new Plot(sel, [0, t, v0 - dx, v1 + dx],
        opt.margin ? opt.margin : [64, 24, 24, 12]);
    if (opt == null) opt = {};
    let gx = opt.gx ? opt.gx : 1;
    let gy = opt.gy ? opt.gy : 1;
    let px = opt.px ? opt.px : 0;
    let py = opt.py ? opt.py : 0;
    dx = opt.dx ? opt.dx : -gx/8;
    let dy = opt.dy ? opt.dy : gy/8;
    let f = opt.font ? opt.font : "24px Arial";
    p.data = [[0,vi], [t,vf], [t,0], [0,0]];
    p.items = [
        new Segments(p.data, {fill:"#c0c0ff80", stroke:null}),
        new Grid({x:gx, y:gy, gridStyle:["grey", 0.5]}),
        new Grid({x:gx, y:gy,
            axisStyle:["black", 2],
            yLabel:["black", f, [RIGHT, -5], py],
            xLabel:["black", f, [TOP, 0], px],
        }),
        new Text("Time / s", [p.right(), dy], {align:BOTTOMRIGHT, font:f}),
        new Text("Velocity / (m/s)", [dx, p.top()], {align:BOTTOMRIGHT, font:f, angle:90}),
        new Segments(p.data.slice(0, 2), {stroke:"blue", lineWidth:2}),
    ];
    return p;
}
