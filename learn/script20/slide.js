if (window.webData) webData.wake()

function init(id, menu) {
    $("body").prepend($("<nav>").attr({id:"Menu"}));
    $("p.Swipe").addClass("NoPrint").attr("data-t", 0).html("Click or swipe to begin slideshow.");
    let s = $(".Slide").length > 0;
    let node = findNode(linkParents(home), id);
    delete node.href;
    init.node = node;
    if (menu || s) {
        if (menu) node.menu = (node.menu ? node.menu : []).concat(menu);
        if (s) slideshow_menu(node)
        linkParents(node);
    }
    drawNode(id);
    if (s) {
        slide(0, 0);
        drawNode.showMenu(false);
    }
    window.onresize();
}

function slide(s, t) {
// Go to specified slide and time marker
    let active = $($(".Slide").hide()[s]).show();
    let items = active.find("[data-t]").show();
    for (let i=0;i<items.length;i++) {
        let item = $(items[i]);
        let data_t = item.attr("data-t");
        let vis = false;
        if (t != null) {
            let n = data_t.length - 1;
            if (data_t.charAt(n) == "+")
                vis = t >= eval(data_t.slice(0, n));
            else if (data_t.indexOf(",") > -1) {
                data_t = eval("[" + data_t + "]");
                vis = t >= data_t[0] && t <= data_t[1];
            }
            else vis = t == eval(data_t);
            if (!vis) $(item).hide();
        }
    }
    slide.current = {s:s, t:t};
    let b = $("body");
    if (b.hasClass("Narrow") && !b.hasClass("MenuMin"))
        drawNode.showMenu(false);
    active = active.attr("data-action");
    if (active) slide.actions[active](t);
}

function allSlides() {
// Show all slides
    $(".Slide").show().find("[data-t]").show();
    delete slide.current;
}

function countMarkers(s) {
    let n = $($(".Slide")[s]).attr("data-markers");
    return n ? parseInt(n) : 1;
}

function advance(dt) {
// Go to next or previous marker
    let s = slide.current;
    if (!s) return;
    let t = s.t;
    s = s.s;
    if (s == null) {s = t = 0}
    else if (t == null) t = 0;
    else {
        t += dt == null ? 1 : dt;
        if (t >= countMarkers(s)) {s += 1; t = 0}
        else if (t < 0) {s -= 1; t = countMarkers(s) - 1}
        if (s < 0) {s = t = 0}
        if (s >= $(".Slide").length) {
            if (confirm("End of slideshow! Proceed to next topic?")) {
                let node = nextNode(init.node, "href");
                if (!node) node = init.node.parent;
                console.log(node);
                if (node) goNode(node);
            }
        }
        else slide(s, t);
    }
}

function zoom(z) {
    let b = $("body");
    if (z == null) z = parseFloat(prompt("Zoom?",
        parseFloat(b.css("font-size")).toFixed(1) / 16));
	if (!isNaN(z))
        b.css("font-size", z + "em");
}

function printSlides() {
// Set document to print view
    zoom(1);
    for (let i=0;i<slide.count;i++) slide(i);
    $("body").removeClass("Normal Narrow").addClass("Print");
    let s = $(".Slide").show();
    s.find("[data-t]").show();
    $(".NoPrint").hide();
    $("nav").hide();
}

function slideshow_menu(node) {
    let s = $(".Slide"), menu = [], err;
    for (let i=0;i<s.length;i++) {
        try {
            let t = $(s[i]).find("h2")[0].innerHTML;
            menu.push({title:t, icon:"$", js:`slide(${i}, 0)`});
        } catch(err) {}
    }
    menu.push({title:"Zoom", icon:"$zoom_in", sep:true, js:"zoom()"});
    menu.push({title:"Print View", icon:"$print", js:"printSlides()"});
    if (localStorage.getItem("remote_login"))
        menu.push({title:"Remote", icon:"$settings_remote", js:"remote.toggle()"});
    node.menu = (node.menu ? node.menu : []).concat(menu);
}

function isWinAction(e) {
// Check if mouse click fires window click event
	let tags = ["a", "textarea", "input"];
    return e.closest(".NoWinClick").length == 0 &&
        e.closest("[onclick]").length == 0 &&
        e.closest("[contenteditable]").length == 0 &&
        tags.indexOf(e[0].tagName.toLowerCase()) == -1;
}

window.addEventListener("click", function(ev) {
// Advance slide on click
    if ($("body").hasClass("Print")) location.reload();
	else if (isWinAction($(ev.target))) advance(ev.ctrlKey ? -1 : 1);
}, true);

window.addEventListener("keydown", function(ev) {
// Advance slide on keypress
    if (isWinAction($(ev.target))) {
        let k = ev.key;
        if (k == "Escape") {
            if ($("#Menu").toggle().is(":visible"))
                $("body").removeClass("MenuHidden");
            else $("body").addClass("MenuHidden");
        }
        else if (k == "ArrowRight") advance();
        else if (k == "ArrowLeft") advance(-1);
    }
});

touch.swipe = function(data) {
	if (data.swipe == "left") advance();
    else if (data.swipe == "right") advance(-1);
}

window.onresize = function() {
    let b = $("body");
    if (!b.hasClass("Print")) {
        let cls = ["Normal", "Narrow"];
        let i = $(window).width() < 600 ? 1 : 0;
        b.removeClass(cls[1-i]).addClass(cls[i]);
    }
}

function linkURL(url) {
    if (url.charAt(0) == '#') {
        url = linkURL.home + url.slice(1);
    }
    return url;
}

linkURL.home = "../../";
