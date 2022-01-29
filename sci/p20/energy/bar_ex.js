window.latex_folder = "../media/latex/";

$(function() {
    Sketch.init(setup, {
        Ek: latex_folder + "blue/Ek.png",
        Eg: latex_folder + "blue/Eg.png",
        Er: latex_folder + "blue/Erotn.png",
        W: latex_folder + "red/Wloss.png"
    });
})

function setup(imgs) {
    let labels = [imgs.Eg, imgs.Ek, imgs.Er, imgs.W];
    let sk = new BarGraph("", labels.length, 12, 2, 0.6, [60, 2, 40, 18])
        .labels(labels, [0, -0.2], 0.75)
        .values("${y:0f}", [0, 12, 2], [-0.05, 0])
        .series("TitleY", "Energy / J", -0.95, 6, null, {valign:"bottom", angle:90, fill:"blue"})
        .animation("Bar", [10, 0, 0, 0], [0, 45/7, 18/7, 1], 3);
    sk.config({fill:"#faa"}, "Bar_3").draw();
}
