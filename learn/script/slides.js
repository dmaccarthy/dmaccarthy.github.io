function license() {window.open("http://creativecommons.org/licenses/by-nc-sa/4.0/")}

license.html = `<p>&copy; 2019 by <a target="_blank" href="mailto:david.maccarthy@eips.ca">D.G. MacCarthy</a></p>
<p><img onclick="license()" alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/>
<p>This work is licensed under a <span onclick="license()">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</span></p>`;


function zoom(z) {
// Get [set] the zoom factor
    let b = $("body");
    if (z) b.css("font-size", z+"em");
    return parseFloat(b.css("font-size")) / 16;
}

function printAll() {
// Set document to print view
    zoom(1);
    for (let i=0;i<slide.count;i++) slide(i, true);
    $("body").addClass("Print");
    let s = $("section.Slide").show();
    s.find("[data-t]").show();
    $(".NoPrint").hide();
    $("nav").hide();        
}

function video_iframes(e) {
// Embed Youtube links
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
    marker(mark ? (mark == true ? markers() - 1 : mark) : 0);
}

function marker(n) {
// Go to specified marker in the current slide
    if (n < 0 || n >= markers()) return;
    clearTimeout(zoom.timeout);
    $("#EndSlides").fadeOut();
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
    if (slide.actions) {
        let a = slide.$.attr("data-action");
        if (a) slide.actions[a](n);
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
    if (b.hasClass("Print")) { // Exit Print View
        location.reload();
        return;
    }
    if (slide.count < 2 && markers() < 2) { // Next topic or chapter
        let node = nextSib(current, n);
        while (node && !node.href) node = nextSib(node, n);
        if (node == null) {
            node = current.parent;
            if (node == null && n > 0) node = nextNode(current, "href");
        }
        if (node) goNode(node);
        return;
    }
    n += marker.current;
    if (n >= markers()) { // Next slide
        if (slide.index < slide.count - 1) slide(slide.index + 1);
        else $("#EndSlides").fadeIn();
    }
    else if (n < 0) {
        if (slide.index) slide(slide.index - 1, true);
    }
    else marker(n);
    // if (b.hasClass("Narrow")) $("#Toolbar").fadeOut();
    $("#Menu").fadeOut();
}

function winclick(targ) {
// Check whether to advance on window mouseclick
    let t = $(targ);
    // console.log(t);
    if (!winclick.allow || t.closest("[onclick]").length || t.closest(".NoWinClick").length)
        return false;
    let ignore = ["input", "textarea", "a", "audio", "select", "option"];
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

function linkURL(url) {
    if (url.charAt(0) == '#') {
        url = linkURL.home + url.slice(1);
    }
    return url;
}

linkURL.repl = location.host == "learn.davidmaccarthy.repl.co";
linkURL.home = "https://" + (linkURL.repl ? location.host : "dmaccarthy.github.io/learn");

function goNode(n) {
    if (n == null) location.href = linkURL("#/");
    else {
        if (typeof(n) == "string") n = findNode(home, n);
        if (n != current) {
            if (n.href) location.href = linkURL(n.href);
            if (n.drive) window.open("https://drive.google.com/open?id=" + n.drive);
            if (n.open) window.open(linkURL(n.open));
            if (n.goto) goNode(n.goto);
            if (n.js) eval(n.js);
            // console.log(n);
        }
    }
}

function toolbarClick(e) {
    e = e.currentTarget.innerHTML;
    if (e == "zoom_in") setZoom();
    else if (e == "print") printAll();
    else if (e == "volume_off") {
        $(this).hide();
        narrator.init();
    }
    else if (e == "pages") {
        let m = $("#Menu");
        if (m.is(":visible")) m.fadeOut();
        else {
            m.remove();
            m = $("<nav>").attr({id:"Menu"}).addClass("NoWinClick");
            let items = $("section.Slide h1");
            for (let i=0;i<items.length;i++) {
                let item = items[i];
                m.append($("<p>").html(item.innerHTML).attr("data-i", i));
            }
            $("body").prepend(m);
            m.fadeIn();
            m.find("p").click(function() {
                slide(parseInt($(this).attr("data-i")));
                $("#Menu").fadeOut();
            });
        }
    }
}

function toolbar() {
    let nav = $("<nav>").addClass("NoWinClick").attr({id:"Toolbar"});
    btn = toolbar.btn;
    if (slide.count < 2) btn = btn.slice(1);
    for (let i=0;i<btn.length;i++) {
        let b = btn[i];
        nav.append($("<em>").addClass("material-icons").html(b[0]).attr({title:b[1]}));
    };
    return nav;
}

toolbar.btn = [
        // ["settings_remote", "Remote"],
    ["pages", "Contents"],
    ["zoom_in", "Zoom"],
    ["print", "Print View"]
];

function crumbs() {
    let c = $("#Crumbs");
    let p = path(current).slice(0, -1);
    for (let i=0;i<p.length;i++) {
        if (i) c.append(" / ");
        let s = $("<span>").html(p[i].title).attr({onclick:"goNode(path(current)[" + i + "])"});
        c.append(s);
    }
}

function contentsHeading() {
    let p = $(this);
    let e = p.hasClass("Collapse");
    $("#Contents > .Expand").removeClass("Expand").addClass("Collapse");
    $("#Contents > p.Collapse > em").html("expand_more");
    if (e) {
        let c = "Expand Collapse";
        p.toggleClass(c).next("div").toggleClass(c);
        p.find("em").html("expand_less");
    }
}

function contents() {
    let c = $("#Contents"), div = c;
    let p = current.menu;
    if (p) for (let i=0;i<p.length;i++) {
        let pi = p[i];
        let s = $("<span>").html(pi.title);
        if (pi.heading) {
            let ce = pi.heading == 1 ? "Expand" : "Collapse";
            let em = $("<em>").addClass("material-icons");
            em.html("expand_" + (pi.heading == 1 ? "less" : "more"));
            c.append($("<p>").html(em).append(s).addClass(ce).click(contentsHeading));
            div = $("<div>").addClass(ce);
            c.append(div);
        }
        else div.append($("<p>").html(s).attr("data-i", i).click(function() {
            goNode(current.menu[$(this).attr("data-i")]);
        }));
    }
}

let current;

function init(id, menu) {
// Initialize the page

    // Customize calendar icon to today's date
    let s = "https://calendar.google.com/googlecalendar/images/favicon_v2014_#.ico";
    $("img[alt='Today']").attr({src:s.replace("#", new Date().getDate())});

    // Complete page menu and link nodes
    current = findNode(home, id);
    if (menu) {
        let c = current.menu;
        current.menu = c ? c.concat(menu) : menu;
    }
    linkParents(home);

    // Add navigation breadcrumbs, table of contents, and license info
    crumbs();
    contents();
    $("#License").html(license.html);

    // Add start graphic
    $("#StartLesson").addClass("NoPrint").html($("<img>").attr({src:linkURL("#/media/lesson.png")}));

    let div = $("<div>").addClass("NoWinClick NoPrint").attr({id:"EndSlides"});
    div.html($("<p>").html("End of Slideshow!"));
    div.append($("<p>").html($("<span>").html("Restart").attr({onclick:"slide(0)"})));
    $("body").append(div.click(function() {
        $("#EndSlides").hide();
    }).hide());

    // Go to first slide
    slide(0);

    // Add toolbar
    if (narrator.src) toolbar.btn.push(["volume_off", "Soundtrack is OFF"]);
    $("body").prepend(toolbar());
    $("#Toolbar em.material-icons").click(toolbarClick);

    // Window/console actions
    if (slide.count > 1) logActions();
    let w = $(window).click(function(ev) {
        if (slide.count > 1 && winclick(ev.target)) advance(1);
    });
    window.onresize();
};

narrator.init = function(e) {
// Initialize soundtrack <audio> tag
    let aud = $("<audio>").attr({id:"Narration", controls:true, src:narrator.src});
    $("body").addClass("Audio").append(aud.on("timeupdate", narrator));
}

window.onkeydown = function(ev) {
    let tag = ev.target ? ev.target.tagName.toLowerCase() : null;
    if (tag) if (tag == "input" || tag == "textarea" || ev.target.contenteditable) return;
    if (ev.code == "ArrowRight") advance(1);
    else if (ev.code == "ArrowLeft") advance(-1);
    else if (ev.code == "Escape") {
        if (webData.ok)
            remote[confirm("Continue listening for remote?") ? "wake" : "pause"]();
        else connect_remote();
    }
    else if (ev.code == "KeyZ") setZoom();
    else if (ev.key == "-") zoom(zoom() / 1.05);
    else if (ev.key == "+") zoom(zoom() * 1.05);
    // else if (ev.code == "KeyC") winclick.allow = !winclick.allow;
    // else console.log(ev.key, ev.code);
}

// window.onwheel = function(ev) {zoom(zoom() * Math.pow(1.02, -ev.deltaY / 3))}

window.onresize = function() {
    let n = $(window).width() < 720 ? 1 : 0;
    let c = ["Normal", "Narrow"];
    $("body").addClass(c[n]).removeClass(c[1-n]);
}

touch.swipe = function(data) {
    if (data.swipe == "right") advance(-1);
    else if (data.swipe == "left") advance(1);
    else if (data.axis == 1) {
        if (slide.index) slide(0);
        else if (current.parent) goNode(current.parent);
    }    
}

function visibleLinks() {
    let e = $(".SlideShow *:visible");
    let v = [];
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        if (ei.is("a") || ei.is("[onclick]")) v.push(ei[0]);
    }
    return v;
}

if (window.webData) webData.wake()

function connect_remote() {
// Connect to web app for remote control
    let l = atob(localStorage.getItem("remote_login")).split("#");
    webData.user = l[0];
    webData.pw = l[1];
    remote.active = new Date();
    remote({success:function() {
        webData.ok = true;
        console.log("Listening for remote");
    }, error:function() {
        clearTimeout(remote.timeout);
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

remote.pause = function() {clearTimeout(remote.timeout)}

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
    if ($("body").hasClass("Narrow")) $("#Menu").fadeOut();
}

function logActions() {
    console.log("Keyboard Commands:\n    → = Next\n    ← = Previous\n  Esc = Remote\n" +
        "    Z = Zoom\n    - = Zoom Out\n    + = Zoom In");
    console.log("Swipe Commands:\n Left = Next\nRight = Previous\n   Up = Toolbar");
}
