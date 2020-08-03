function goMarker(section, n) {
    if (typeof(section) == "number") section = slideSeq[section];
    if (n == null) n = 0;
    let s = $("#" + section);
    if (s.length == 0) return;
    $("section").hide();
    let nMax = parseInt(s.attr("data-markers"));
    let marker = n;
    goMarker.current = [section, nMax, n];
    let e = s.find("[data-t]").hide();
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let t = parseInt(ei.attr("data-t"));
        n = ei.attr("data-n");
        n = n == null ? nMax : parseInt(n);
        if (marker >= t && (n == null || marker <= t + n - 1)) ei.show()
    }
    s.show();
    console.log(goMarker.current);
}

function goNext(dn) {
    if (dn == null) dn = 1;
    let s = slideSeq.indexOf(goMarker.current[0]);
    let nMax = goMarker.current[1];
    let n = goMarker.current[2] + dn;
    if (n < nMax && n >= 0) goMarker(s, n);
    else if (n < 0 && s) {
        s -= 1;
        n = parseInt($("#" + slideSeq[s]).attr("data-markers"));
        if (n) goMarker(s, n-1);
    }
    else if (dn > 0) goMarker(s+1);
}

function currentSection() {return $("#" + goMarker.current[0])}

function clickable(e) {
    let t = e.tagName.toUpperCase();
    e = $(e);
    return ["INPUT", "TEXTAREA", "A"].indexOf(t) > -1 ||
        e.attr("onclick") ||
        e.hasClass("Clickable") ||
        e.closest("[onclick]").length ||
        e.closest(".Clickable").length;
}

window.addEventListener("keydown", function(ev) {
    if (!clickable(ev.target)) {
        if (ev.key == "ArrowRight") goNext();
        else if (ev.key == "ArrowLeft") goNext(-1);
        else if (ev.key == "F1" && ev.shiftKey) goMarker(0);
        // console.log(ev);
    }
})

function makeDragable(e) {
    if (e == null) e = $(".Dragable");
    else e = $(e).addClass("Dragable");
    e.on("mousedown", function(ev) {
        dragging = ev.currentTarget;
    })
}

var dragging = false;

window.addEventListener("click", function(ev) {
    if (dragging) dragging = false;
    else if (!clickable(ev.target)) goNext();
});

window.addEventListener("mousemove", function(ev) {
    if (dragging) {
        let e = $(dragging);
        let x = parseInt(e.css("left")) + ev.movementX;
        let y = parseInt(e.css("top")) + ev.movementY;
        e.css({left: x + "px", top: y + "px"});
    }
});

function eq(latex, cls) {
    latex = $("<p>").html("$$" + latex + "$$").appendTo(currentSection());
    MathJax.Hub.Typeset();
    makeDragable(latex);
    if (cls) latex.addClass(cls);
    latex.on("click", function(ev) {
        if (ev.altKey) $(ev.currentTarget).remove();
    }).on("wheel", function(ev) {
        let y = ev.originalEvent.deltaY;
        let e = $(ev.currentTarget);
        let z = (y > 0 ? 1/1.05 : 1.05) * parseFloat(e.css("fontSize"));
        e.css({fontSize:z + "px"});
    // }).click(function(ev) {
    //     console.log(ev);
    });
}

function eqn(key, cls) {eq(eqn[key], cls)}

Object.assign(eqn, {
    N2: "\\vec{\\mathbf F}_{net} = m\\vec{\\mathbf a}",
    N3: "\\vec{\\mathbf F}_{ab} = -\\vec{\\mathbf F}_{ba}",
    slope: "k = {y_2 - y_1 \\over x_2 - x_1}",
    line: "y = kx + b",
    heat: "Q = mc\\delta T",
    latent: "Q = nH",
    mole: "n = {m \\over M}",
});
