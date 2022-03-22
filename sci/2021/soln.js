function zoom(z) {
    if (!z) z = 2.25;
    $("body").css("font-size", `${100*z}%`);
}

function soln(ev) {
    if (ev.ctrlKey) {
        zoom();
        $($("ol.Q > li")[0]).trigger("click");
    }
    else $("body").toggleClass("Soln");
}

function clickQ(ev) {
    if (!ev.ctrlKey) return;
    let t = $(ev.target);
    let a = t.hasClass("DisableToggle");
    if (!a) {
        let p = t.parentsUntil("ol.Q > li");
        for (let i=0;i<p.length;i++) if ($(p[i]).hasClass("DisableToggle")) {
            a = true;
            break;
        }
    }
    if (!a) {
        let b = $("body");
        let e = $(this);
        a = e.hasClass("Active");
        if (a) {
            b.removeClass("Active");
            e.removeClass("Active");
        }
        else {
            $("ol.Q > li").removeClass("Active");
            b.addClass("Active");
            e.addClass("Active");
            clickQ.current = $(e).val();
        }
    }
}

$(function() {
    let li = $("ol.Q > li").click(clickQ);
    for (let i=0; i<li.length; i++) $(li[i]).attr({value:i+1});
});

window.onkeydown = function(e) {
    let n = 0;
    if (e.ctrlKey) {
        if (e.key == "ArrowRight") n = 1;
        else if (e.key == "ArrowLeft") n = -1;
    }
    if (n) {
        $(".Active").removeClass("Active");
        let c = clickQ.current;
        c = (c ? c - 1 : -1) + n;
        e = $("ol.Q > li");
        if (c >= 0 && c < e.length) {
            e = e[c];
            clickQ.call(e, {target:e, ctrlKey:true});
        }
    }
}
