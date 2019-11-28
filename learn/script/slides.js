function zoom(z) {
// Reduce the zoom to fit content
    clearTimeout(zoom.timeout);
    if (z) zoom.z = z;
    let b = $(".SlideShow");
    b.css({zoom:zoom.z});
    let r = $(window).height() / Math.ceil(1 + $("html").height());
    if (r < 1) b.css({zoom:zoom.z*r});
    zoom.timeout = setTimeout(zoom, 250);
}

function printAll() {
    clearTimeout(zoom.timeout);
    $("body").addClass("Print").css({zoom:1});
    let s = $("section.Slide").show();
    s.find("[data-t]").show();
    $(".NoPrint").hide();
}

function slide(n) {
// Go to beginning of specified slide
    clearTimeout(zoom.timeout);
    $("body").removeClass("Print");
    let s = $("section.Slide").hide();
    if (n >= s.length) n = s.length - 1;
    if (n < 0) n = 0;
    slide.$ = $(s[n]);
    slide.index = n;
    slide.count = s.length;
    slide.$.find("[data-t]").hide();
    slide.$.fadeIn();
    marker(0);
}

function marker(n) {
// Go to specified marker
    if (n < 0 || n >= markers()) return;
    clearTimeout(zoom.timeout);
    marker.current = n;
    let e = slide.$.find("[data-t]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let t = $(ei).attr("data-t");
        if (t.includes(",")) t = `[${t}]`;
        else if (t.includes("+"))
            t = `[${t.replace('+','')},${markers()}]`;
        t = eval(t);
        if (typeof(t) == "number" && t == n || n >= t[0] && n <= t[1])
            ei.fadeIn();
        else ei.hide();
    }
    zoom();
    // console.log(slide.index, marker.current);
}

function markers() {
// Get the number of markers for the current slide
    n = slide.$.attr("data-markers");
    return n == null ? 1 : parseInt(n);
}

function advance(n) {
// Advance by n mouseclicks
    let b = $("body");
    if (b.hasClass("Print")) {
        b.removeClass("Print");
        slide(0);
        return;
    }
    n += marker.current;
    if (n >= markers()) {
        if (slide.index < slide.count - 1) slide(slide.index + 1);
    }
    else if (n < 0) {
        if (slide.index) {
            slide(slide.index - 1);
            marker(markers() - 1);
        }
    }
    else marker(n);
}

function winclick(targ) {
// Check whether to advance on window mouseclick
    if (!winclick.allow || $(targ).closest("[onclick]").length)
        return false;
    let ignore = ["input", "textarea", "a"];
    return ignore.indexOf(targ.tagName.toLowerCase()) < 0;
}

winclick.allow = true;

function setZoom() {
    let z = parseFloat(prompt("Enter zoom factor:", zoom.z));
    if (!isNaN(z)) zoom(z);
}

$(function() {
    let w = $(window).click(function(ev) {
        if (winclick(ev.target)) advance(1);
    });
    slide(0, true);
    if (w.width() >= 800) zoom(2.5);
    else zoom.z = 1;
});

window.onkeydown = function(ev) {
    if (ev.code == "ArrowRight") advance(1);
    else if (ev.code == "ArrowLeft") advance(-1);
    else if (ev.code == "Escape") {
        let s = parseInt(prompt(`Enter slide number [1-${slide.count}]:`, slide.index+1));
        if (!isNaN(s)) slide(s-1);
    }
    else if (ev.code == "KeyC") winclick.allow = !winclick.allow;
    else if (ev.code == "KeyZ") setZoom();
    else if (ev.code == "KeyP") printAll();
    // else console.log(ev.key, ev.code);
}

touch.swipe = function(data) {
    if (data.swipe == "right") advance(-1);
    else if (data.swipe == "left") advance(1);
    else if (data.axis == 1) setZoom();
}

console.log("Keyboard Commands:\n  → = Next\n  ← = Previous\nEsc = Choose slide\n  Z = Zoom\n  P = Print View\n  C = Disable/Enable Click");
console.log("Swipe Commands:\n Left = Next\nRight = Previous\n   Up = Zoom");