// Animation to display while resources are loading

Loading = {time:150, status:0, colors:["red", "forestgreen", "yellow", "blue", "purple", "red", "forestgreen", "yellow", "blue", "purple"]}

Loading.draw = function(s) {
    if (s != null) Loading.status = s;
    let plot = Loading.plot;
    let n = Loading.colors.length;
    Loading.index++;
    if (Loading.index == n) Loading.index = 0;
    if (Loading.index == 0) shuffle(Loading.colors);
    let a = 2 * Math.PI / n * Loading.index;
    let c = Loading.colors[Loading.index];
    plot.clear().text("Loading...", [0, 0], "12px sans-serif", "grey", CENTER);
    plot.circle([Math.sin(a), Math.cos(a)], 0.3, {fill:c});
    if (Loading.status == 1)
        setTimeout(Loading.draw, Loading.time * (Loading.index == 0 ? 8 : 1));
}

Loading.show = function() {
    Loading.index = 0;
    if (!Loading.plot)
        Loading.plot = new Plot($("#Loading canvas")[0], [-1.3, 1.3, -1.3]);
    if (Loading.status == -1) Loading.draw(1);
}

Loading.hide = function() {Loading.status = -1}

articleScript.map.Loading = Loading;
