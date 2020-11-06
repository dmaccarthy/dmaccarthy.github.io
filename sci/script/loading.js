// Animation to display while resources are loading

Loading = {time:400, angle:0, status:0, colors:["red", "forestgreen", "gold", "blue", "purple"]}

Loading.draw = function(s) {
    if (s != null) Loading.status = s;
    let plot = Loading.plot;
    let n = Loading.colors.length;
    let a = Loading.angle;
    plot.clear().text("Loading...", [0, 0], "18px sans-serif", "grey", CENTER);
    plot.circle([Math.sin(a), Math.cos(a)], 0.25, {fill:Loading.colors[randint(n)]});
    if (Loading.status == 1)
        setTimeout(Loading.draw, Loading.time);
    Loading.angle += (0.25 + 0.75 * Math.random()) * Math.PI * (Math.random() < 0.5 ? 1 : -1);
}

Loading.show = function() {
    if (!Loading.plot)
        Loading.plot = new Plot($("#Loading canvas")[0], [-1.3, 1.3, -1.3]);
    shuffle(Loading.colors);
    if (Loading.status == -1) Loading.draw(1);
}

Loading.hide = function() {Loading.status = -1}

articleScript.map.Loading = Loading;
