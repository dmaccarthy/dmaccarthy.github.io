function zoom(z) {
    let b = $("body");
    if (z) b.css("font-size", z+"em");
    return parseFloat(b.css("font-size")) / 16;
}

function imageSize(img, z) {
    if (!z) z = 1;
    let w = parseFloat(img.attr("width"));
    if (!w) w = img[0].naturalWidth;
    w *= z;
    img.width(w);
    img.css({height:"auto"});
}

function printAll() {
    zoom(1);
    $("body").addClass("Print");
    let s = $("section.Slide").show();
    s.find("[data-t]").show();
    $(".NoPrint").hide();
}

function video_iframes(e) {
    let vid = e.attr("data-video");
    if (vid) {
        let w = Math.min(720, $(window).width() - 24);
        let h = e.attr("data-aspect");
        h = Math.ceil(w / (h ? eval(h) : 16/9));
        let f = $("<iframe>").attr({width:w, height:h,
            src:"https://www.youtube.com/embed/" + vid,
            allowfullscreen:true, frameborder:0
        });
        e.removeAttr("data-video").append(f);
    }
    e = e.find("[data-video]");
    for (let i=0;i<e.length;i++) video_iframes($(e[i]));
}

function slide(n, mark) {
// Go to specified slide and marker
    clearTimeout(zoom.timeout);
    $("body").removeClass("Print");
    let s = $("section.Slide").hide();
    if (n >= s.length) n = s.length - 1;
    if (n < 0) n = 0;
    slide.$ = $(s[n]);
    slide.index = n;
    slide.count = s.length;
    slide.$.find("[data-t]").hide();
    video_iframes(slide.$);
    slide.$.fadeIn();
    marker(mark ? mark : 0);
}

function marker(n) {
// Go to specified marker in the current slide
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
    let ignore = ["input", "textarea", "a", "audio"];
    return ignore.indexOf(targ.tagName.toLowerCase()) < 0;
}

winclick.allow = true;

function setZoom() {
    let z = parseFloat(prompt("Enter zoom factor:", zoom().toFixed(1)));
    if (!isNaN(z)) zoom(z);
}

function setSlide() {
    let s = parseInt(prompt(`Jump to section? [1-${slide.count}]`, slide.index+1));
    if (!isNaN(s)) slide(s-1);
}

$(function() {
    let p = $("#login").addClass("NoPrint Center");
    if (localStorage.getItem("remote_login")) {
        p.append($("<input>").attr({type:"text", id:"webData_u", placeholder:"Username"})).
            append($("<input>").attr({type:"password", id:"webData_p", placeholder:"Password"})).
            append($("<input>").attr({type:"button", value:"Remote Control"}).click(connect_remote)).
            append($("<input>").attr({type:"button", value:"Hide"}).click(function() {
                $("#login").remove();
            }));
    }
    else p.hide();
    let w = $(window).click(function(ev) {
        if (winclick(ev.target)) advance(1);
    });
    slide(0);
    w = w.width();
    zoom(w < 800 ? 1 : 2.4);
    if (narrator.src) {
        let aud = $("<audio>").attr({id:"Narration", controls:true, src:narrator.src});
        if (w < 400) aud.addClass("Narrow");
        $("body").prepend(aud.on("timeupdate", narrator));
    }
});

window.onkeydown = function(ev) {
    if (ev.target && ev.target.tagName.toLowerCase() == "input") return;
    if (ev.code == "ArrowRight") advance(1);
    else if (ev.code == "ArrowLeft") advance(-1);
    else if (ev.code == "Escape") {
        if (webData.ok) remote.wake();
        setSlide();
    }
    else if (ev.code == "KeyC") winclick.allow = !winclick.allow;
    else if (ev.code == "KeyZ") setZoom();
    else if (ev.code == "KeyP") printAll();
    else if (ev.key == "-") zoom(zoom() / 1.05);
    else if (ev.key == "+") zoom(zoom() * 1.05);
    // else console.log(ev.key, ev.code);
}

touch.swipe = function(data) {
    if (data.swipe == "right") advance(-1);
    else if (data.swipe == "left") setSlide();
    else if (data.axis == 1) setZoom();
}

function visibleLinks() {
    let e = $("body *:visible");
    let v = [];
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        if (ei.is("a") || ei.is("[onclick]")) v.push(ei[0]);
    }
    return v;
}

if (webData) webData.wake();

function connect_remote() {
// Connect to web app for remote control
    webData.user = $("#webData_u").val();
    webData.pw = $("#webData_p").val();
    remote.active = new Date();
    remote({success:function() {
        $("#login").hide();
        webData.ok = true;
    }, error:function() {
        clearTimeout(remote.timeout);
        if (!confirm("Login failed. Try again?"))
            $("#login").hide();
    }});
}

function remote(cb) {
// Look for remote comands
    webData.flush({}, cb ? cb : remote.complete);
    clearTimeout(remote.timeout);
    if (new Date() - remote.active < 10 * 60000)
        remote.timeout = setTimeout(remote, 250);
    else console.log("Remote is sleeping; type ESCAPE to wake.");
}

remote.wake = function() {
    remote.active = new Date();
    remote({});
}

remote.complete = {
// Perform remote command (AJAX callback)
    success:function(r) {
        if (r && Object.keys(r).length) {
            remote.active = new Date();
            if (r.code || r.key) window.onkeydown(r); 
            else if (r.zoom) zoom(r.zoom);
            else if (r.slide) slide(r.slide - 1);
            else if (r.link == 0) $("body")[0].click();
            else if (r.link) {
                let v = visibleLinks(), err;
                try {v[r.link - 1].click()}
                catch(err) {}
            }
        }
    },
    error:function() {console.log(arguments)}
}

function narrator(ev) {
    let s = 1, t = ev.currentTarget.currentTime;
    while (s < slide.count && t > narrator.sync[s][0]) s += 1;
    s -= 1;
    let m = 1, sync = narrator.sync[s];
    while (t > sync[m]) m++;
    m -= 1;
    if (s != slide.index) slide(s, m);
    else if (m != marker.current) marker(m);
}

console.log("Keyboard Commands:\n    → = Next\n    ← = Previous\n  Esc = Choose slide\n" +
    "    Z = Zoom\n    - = Zoom Out\n    + = Zoom In\n    P = Print View\n    C = Disable/Enable Click");
console.log("Swipe Commands:\nRight = Previous\n Left = Choose Slide\n   Up = Zoom");
