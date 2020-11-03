/*** Page Initialization ***/

var home = "../../", slideSeq = [];
var author = $("<p>").html("D.G. MacCarthy");

function goLink(key) {
    let path = {"#learn#": "https://learn.davidmaccarthy.repl.co/home/"};
    let url = goLink.urls[key];
    for (let k in path) url = url.replace(k, path[k]);
    location.href = url;
}

goLink.urls = {s10: "#learn#/s10.html", s10q2:"https://sci.davidmaccarthy.repl.co/s10"};

function help() {
	console.log(`Alt+F1 = Restart
Alt+J = Math Typeset
Alt+D = Duplicate Tab
Alt+L = Link Location
Alt+M = Toggle Mouse

goMarker(n)
zoom(n)
calc()
eq('C=2\\\\pi r', 'red')
eqn('N2')
`);
	for (let k in eqn) console.log(k);
    console.log(slideSeq);
}

function initPage() {
    aspect();
    shows();
    titleSlide();
    let s = $("section[data-markers]");
    for (let i=0;i<s.length;i++) slideSeq.push(s[i].id);
	help();
    makeDragable();
    sequence();
	$("body").prepend($("<div>").attr({id:"BaseDiv"}));
    s = location.search.slice(1);
    if (s.length) s = JSON.parse(decodeURIComponent(s));
    else s = {slide:0}
    goMarker(s.slide);
    if (s.zoom && s.zoom != 1) zoom(s.zoom);
    if ($(window).width() >= 512) mousePointer();
    else $("#Swipe").show();
}

function aspect() {
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        ei.height(ei.width() / parseFloat(ei.attr("data-aspect")));
    }
}

function em_mi(html, attr) {
    return $("<em>").addClass("material-icons").html(html).attr(attr);
}

let beep = new Audio(home + "media/beep.wav");

function titleSlide() {
    let html = `<div class="NoPrint"><p id="Swipe" class="Left">
    Swipe left or right to move forward or backward in the slideshow. Swipe up to restart.
</p></div>`;
    $("#Title").append(html).prepend($("<h1>").html(document.title));

    let e = $("#MaterialIcons");
    let v = e.attr("yt");
    if (v) e.prepend(em_mi("ondemand_video", {title:"Open Video"}).click(function() {
        window.open("https://www.davidmaccarthy.repl.co/tools/video.html?" + v);
    }));
    e.prepend(em_mi("print", {title:"Print View"}).click(printView));
    e.prepend(em_mi("slideshow", {title:"Start Slideshow"}).click(function() {
        // goNext();
        beep.play();
        zoom();
        $("html").removeClass("Mouse");
        let err;
        try {
            document.documentElement.requestFullscreen();
        } catch(err) {
            console.log("Browser does not support action:", err);
        }
    }));
    e.find("em.material-icons").before(" &nbsp; &nbsp; ");
    e.before(author);
}

function makeDragable(e) {
    if (e == null) e = $(".Dragable");
    else e = $(e).addClass("Dragable");
    e.on("mousedown", function(ev) {
        dragging = ev.currentTarget;
    })
}

function sequence() {
    let e = $("[data-seq]");
    for (let i=0;i<e.length;i++) sequence.set($(e[i]));
    e.click(function(ev) {
        sequence.set($(ev.currentTarget), ev.shiftKey ? -1 : 1);
    });
}

sequence.set = function(e, dn) {
    let nMax = parseInt(e.attr("data-seq"));
    let n = parseInt(e.attr("data-n")) + (dn ? dn : 0);
    if (n < 0) n = nMax - 1;
    else if (n >= nMax) n = 0;
    e.attr("data-n", n);
    let src = e.attr("data-src").replace("##", n);
    // alert(src);
    e.attr({src:src});
}

function shows() {
    let i = location.pathname.split("/");
    i = i[i.length - 1].split(".")[0];
    i = slideshows.indexOf(i);
    $("#LessonNumber").html(i+1);
    if (i) {
        let em = $("<em>").addClass("material-icons").html("skip_previous").attr({title:"Previous Slideshow"});
        let p = slideshows[i-1];
        $("#MaterialIcons").append(em.click(function() {
            location.href = `${p}.html`;
        }));
    }
    if (i < slideshows.length - 1) {
        let em = $("<em>").addClass("material-icons").html("skip_next").attr({title:"Next Slideshow"});
        let n = slideshows[i+1];
        $("#MaterialIcons").append(em.click(function() {
            location.href = `${n}.html`;
        }));
    }
}

function calc() {
	window.open("https://www.cemetech.net/projects/jstified/", "TI-83+", "width=390,height=700");
	console.log("$.getScript('https://slides.davidmaccarthy.repl.co/script/bigMouse.js')");
}


/*** Page Actions ***/

function goMarker(section, n) {
    $("body").removeClass("Print");
    if (typeof(section) == "number") section = slideSeq[section];
    if (!section) section = slideSeq[0];
    let s = $("#" + section);
    if (s.length == 0) return;
    let nMax = parseInt(s.attr("data-markers"));
    if (n == null) n = 0;
    else if (n === true) n = nMax - 1;
    $("section[data-markers]").hide();
    let marker = n;
    goMarker.current = [section, nMax, n];
    let imgSync = s.find("img[data-sync]");
    for (let i=0;i<imgSync.length;i++) {
        let ei = $(imgSync[i]);
        ei.attr({src:ei.attr("data-src").replace("##", eval(ei.attr("data-sync"))[marker])});
    }
    let e = s.find("[data-t]").hide();
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let t = parseInt(ei.attr("data-t"));
        n = ei.attr("data-n");
        n = n == null ? nMax : parseInt(n);
        if (marker >= t && (n == null || marker <= t + n - 1)) ei.show()
    }
    s.show();
    console.log([slideSeq.indexOf(section)].concat(goMarker.current));
}

function printView() {
    zoom(1);
    let s = $("section[data-markers]").show();
    s.find("[data-t]").show();
    $("body").addClass("Print");
}

function video(id) {}

function makeLocation(dupl) {
    let arg = {slide: goMarker.current[0], zoom: parseFloat($("body").css("fontSize")) / 16};
    arg = encodeURIComponent(JSON.stringify(arg));
    arg = location.origin + location.pathname + "?" + arg;
    if (dupl) window.open(arg);
    else location.href = arg;
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
    else if (s == 0) goMarker(slideSeq.length - 1, true);
}

function currentSection() {return $("#" + goMarker.current[0])}

function _sel(elem, sel) {
    elem = $(elem);
    for (let i=0;i<sel.length;i++) {
        let s = sel[i], e = elem;
        while (e.length) {
            if (e.is(s)) return true;
            e = e.parent();
        }
    }
    return false;
}

function clickable(e) {
    let t = e.tagName.toUpperCase();
    return ["INPUT", "TEXTAREA", "A"].indexOf(t) > -1 ||
        _sel(e, ["[onclick]", ".Clickable", "[data-seq]", "body.Print"]);
}

function zoom(n) {
    if (!n) n = localStorage.getItem("slide-zoom");
    if (!n) n = 2.75;
    $("body").css({fontSize:n + "em"});
    let img = $("img[width]");
    for (let i=0;i<img.length;i++) {
        let e = $(img[i]);
        e.css({width:Math.round(n*parseInt(e.attr("width")))});
    }
    if (n != 1) localStorage.setItem("slide-zoom", n);
}


/*** Event Handling ***/

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

window.addEventListener("keydown", function(ev) {
    if (!clickable(ev.target)) {
        if (ev.key == "ArrowRight") goNext();
        else if (ev.key == "ArrowLeft") goNext(-1);
        else if (ev.altKey) {
            let k = ev.keyCode;
			if (k == 77) $("html").toggleClass("Mouse");
			else if (k == 74) MathJax.Hub.Typeset();
			else if (k == 76 || k == 68) makeLocation(k == 68);
			else if (ev.key == "F1") goMarker(0);
		}
        // console.log(ev);
    }
})

touch.swipe = function(data) {
    if (data.r > 100) {
        let swipe = ["left", "right"].indexOf(data.swipe);
        if (swipe > -1) goNext(swipe ? -1 : 1);
        else if (data.swipe == "up") goMarker(0);
    }
}


/*** MathJax Equations ***/

function eq(latex, color) {
    latex = $("<p>").html("$$" + latex + "$$").appendTo(currentSection());
    MathJax.Hub.Typeset();
    makeDragable(latex);
    if (color) latex[0].style.color = color;
    return latex.on("click", function(ev) {
        if (ev.altKey) $(ev.currentTarget).remove();
    }).on("wheel", function(ev) {
        let y = ev.originalEvent.deltaY;
        let e = $(ev.currentTarget);
        let z = (y > 0 ? 1/1.05 : 1.05) * parseFloat(e.css("fontSize"));
        e.css({fontSize:z + "px"});
    });
}

function eqn(key, color) {return eq(eqn[key], color)}

Object.assign(eqn, {
    N2: "\\vec{\\mathbf F}_{net} = m\\vec{\\mathbf a}",
    N3: "\\vec{\\mathbf F}_{ab} = -\\vec{\\mathbf F}_{ba}",
    slope: "k = {y_2 - y_1 \\over x_2 - x_1}",
    line: "y = kx + b",
    heat: "Q = mc\\delta T",
    latent: "Q = nH",
    mole: "n = {m \\over M}",
});
