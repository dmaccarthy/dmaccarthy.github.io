function zoom(z) {$("body").css({fontSize:`${z}%`})}

function extractFileId(fn) {
    if (fn == null) fn = location.href;
    fn = fn.split("?")[0].split("/");
    return fn[fn.length - 1].split(".")[0];
}

function imageCycle(ev, e, i) {
    e = $(e);
    let src = e.attr("src");
    let n = parseInt(extractFileId(src).split("-")[1]);
    let j = (n + (ev.shiftKey ? -1 : 1)) % i;
    if (j < 0) j = i-1;
    e.attr("src", src.replace(`-${n}.`, `-${j}.`));
}

function video(e, id) {
    e = $(e ? e : $("[data-video]")[0]);
    if (id == null) id = e.attr("data-video");
    if (id.charAt(0) == "#") id = "videoseries?list=" + id.slice(1);
    let w = e.attr("data-width");
    let a = e.attr("data-aspect");
    let h = Math.round(w / eval(a));
    let iframe = $("<iframe>").attr({width:w, height:h, frameborder:0, allowfullscreen:1,
        allow:video.allow, src:"https://www.youtube.com/embed/" + id});
    return e.html(iframe.attr("data-aspect", a));
}

video.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";

function aspect() {
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let a = eval(ei.attr("data-aspect"));
        let h = Math.round(ei.width() / a);
        e.css({height:h});
    }
}

function bodyMargin(w) {
    let b = $("body");
    if (b.hasClass("Present")) return b;
    if (w == null) {
        w = $(window).width();
        w = w > 848 ? (w - 816) / 2 : 16;
    }
    return b.css({"margin-left":w, "margin-right":w});
}

window.onresize = window.onafterprint = function() {
    bodyMargin().removeClass("Print");
    aspect();
}

window.onbeforeprint = function() {
    bodyMargin(16).addClass("Print");
    aspect();
}

function showSection(id, ctrlKey, n) {
    $("body > article > section").removeClass("Selected").fadeOut(200);
    let p = $("body > nav > p[data-section]").removeClass("Selected");
    $(`body > nav > p[data-section=${id}]`).addClass("Selected");
    if (id) {
		if (ctrlKey) {
			let i = (p.index($(`[data-section=${id}]`)[0]));
			while (i++ < p.length) $(p[i]).fadeOut(200);
		}
		p = $("#" + id).addClass("Selected");
		goMarker(n ? n : 0);
		setTimeout(function() {
			p.fadeIn();
		}, 205);
	}
}

function showNext() {
    let p = $("body > nav > p[data-section]:hidden");
	if (p.length) {
		p = $(p[0]).fadeIn();
		showSection(p.attr("data-section"));
		p = $("body > nav");
		p.animate({scrollTop: p[0].scrollHeight}, 500);		
	}
}

function hideLast() {
    let p = $("body > nav > p[data-section]:visible");
    let n = p.length - 1;
    if (n) {
        $(p[n]).fadeOut();
        showSection($(p[n - 1]).attr("data-section"), false, -1);
    }
}

function goMarker(i) {
	let s = $("body > article > section.Selected");
	let n = parseInt(s.attr("data-last"));
	if (n) {
		if (typeof(i) == "boolean") {
			let m = i ? 1 : -1;
			i = parseInt(s.attr("data-mark"));
			if (!isNaN(i)) i += m;
			if (i > n) return showNext();
			else if (i < 0) return hideLast();
		}
		if (!i) i = 0;
		else while (i < 0) i += n + 1;
		s.attr("data-mark", i);
		let e = s.find("[data-mark]");
		for (let j=0;j<e.length;j++) {
			let ej = $(e[j]);
			let m = ej.attr("data-mark").split(",");
            for (let k=0;k<m.length;k++) {
                m[k] = m[k] == "" ? m[0] : parseInt(m[k]);
            }
            if (m.length == 1) m.push(i+1);
			if (m[0] != null && (m[0] > i || m[1] < i)) ej.hide();
			else ej.show();
		}
        s = $("html");
        let y = s[0].scrollHeight - $(window).height();
        s.animate({scrollTop: y < 0 ? 0 : y}, 500);
	}
	else if (i === true) showNext();
	else if (i === false) hideLast();
}

function goCourse(href) {location.href = href ? href : "../"}

function goNext(n) {
    for (let i=0;i<lesson_sequence.length;i++) {
        let url = lesson_sequence[i];
        if (extractFileId(url) == extractFileId()) {
            url = lesson_sequence[i+n];
            if (url) location.href = "../" + url;
        }
    }
}

function arrows(ev) {
    if (ev.altKey || !$("body").hasClass("Present")) return;
    if (ev.key == "ArrowRight") {
        if (ev.ctrlKey) {
            $("body > nav > p[data-section]").fadeIn();
            let id = $("body > article > section:last-child").attr("id");
            showSection(id, true, -1);
        }
        else goMarker(true);
    }
    else if (ev.key == "ArrowLeft") {
        if (ev.ctrlKey) $("body").toggleClass("NoPanel");
        else goMarker(false);
    }
}

function setMarks() {
	let s = $("body > article > section[data-last]");
	let m;
	for (let i=0;i<s.length;i++) {
		let si = $(s[i]);
		let e = si.find("[data-mark]");
		m = 0;
		for (let j=0;j<e.length;j++) {
			let ej = $(e[j]);
			let c = ej.attr("data-mark");
			if (c == "=") ej.attr("data-mark", m);
			else if (c == "+") ej.attr("data-mark", ++m);
            else {
                c = parseInt(c);
                if (c > m) m = c;
            }
		}
		if (si.attr("data-last") == "?") si.attr("data-last", m ? m : 0);
	}
}

function makeNav() {
    let sec = $("body > article > section");
    let nav = $("<nav>");
    for (let i=0;i<sec.length;i++) {
        let s = $(sec[i]);
        let t = s.find("h3:first-child").html();
        let p = $("<p>").attr("data-section", s.attr("id"));
        nav.append(p.html(t));
    }
    nav.find("[data-section=Title]").addClass("Title");
    nav.prependTo($("body"));
    return nav;
}

$(function() {
    $("div.Icons > button").click(function() {
        let a = $(this).attr("data-action");
        if (a.charAt(0) == "@") eval(a.slice(1));
        else if (a) window.open(a);
    });

    let id = extractFileId();
    let t = localStorage.getItem("teacher") && ["", "index"].indexOf(id) == -1;
    if (t) makeNav();
    $(window).on("keydown", function(ev) {
        if (ev.altKey) {
            let key = ["ArrowLeft", "ArrowRight"].indexOf(ev.key);
            if (key >= 0) {
                if (key == 0) goNext(-1);
                else goNext(1);
                return false;
            }
        }
        else if (ev.ctrlKey && ev.shiftKey && ev.key == "Enter") {
            if (localStorage.getItem("teacher")) localStorage.removeItem("teacher");
            else localStorage.setItem("teacher", 1);
            history.go(0);
        }
    });

    $("p.Title").html(document.title);
    let v = $("[data-video]");
    for (let i=0;i<v.length;i++) video(v[i]);
    if (t) aspect();
    else {
        window.onresize();
        return;
    }

	$("body, html").addClass("Present");
    $("body > article > section").hide();
	setMarks();
    let p = $("body > nav > p[data-section]").click(function(ev) {
        showSection($(this).attr("data-section"), ev.ctrlKey, ev.ctrlKey ? 0 : -1);
    }).hide();
    showNext();
    $(window).on("keydown", arrows);
    if (mousePointer) mousePointer();

    console.log("Ctrl + Left  = Toggle Panel\nCtrl + Right = Go to End\nCtrl + Shift + Enter = Presentation Mode");
});

if (!window.touch) touch = {};

touch.swipe = function(data, ev) {
    let mj = $(ev.target).closest("div.MathJax_Display").length;
    if (data.r > 100 && mj == 0) {
        if (data.swipe == "left") goNext(1);
        else if (data.swipe == "right") goNext(-1);
    }
}