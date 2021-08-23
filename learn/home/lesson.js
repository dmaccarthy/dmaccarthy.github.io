let buttonLabel = {
    "slideshow": "Lesson Slideshow",
    "book": "Detailed Notes",
    "html": "Lesson Notes",
    "assign": "Assignment",
    "laptop": "Notes & Assignment",
    "check": "Assignment Solutions",
    "next": "Next Topic",
    "youtube": "Video Lesson",
    "cal": "Class Calendar",
    "gcr": "Google Classroom",
    "bs": "Brightspace Page",
    "repl": "repl.it IDE",
}

let icons = {
    "#youtube": "https://s.ytimg.com/yts/img/favicon_144-vfliLAfaB.png",
    "#gcr": "https://ssl.gstatic.com/classroom/favicon.png",
    "#cal": `https://calendar.google.com/googlecalendar/images/favicon_v2014_${new Date().getDate()}.ico`,
    "#bs": "https://s.brightspace.com/lib/favicon/2.0.0/favicon.ico",
    "#repl":"https://replit.com/public/icons/favicon-196.png",
    "#py":"https://www.python.org/static/favicon.ico",
}

function uc() {alert("This link is currently unavailable!")}

function makeUrl(url) {
    if (icons[url]) return icons[url];
    let c = url.charAt(0);
    if (c == "#") url = makeUrl.home + "media/" + url.slice(1) + ".png";
    return url;
}

makeUrl.home = "../../../";

let current, slides = "https://slides.davidmaccarthy.repl.co/";

function qsArgs(key) {
    let qs = location.search.slice(1).split("&");
    args = {}
    for (let i=0;i<qs.length;i++) {
        let a = qs[i].split("=");
        args[a[0]] = decodeURIComponent(a[1]);
    }
    return key ? args[key] : args;
}

function block(b) {
    let c = path(current)[1].id;
    if (b != null) localStorage.setItem(`block_${c}`, b);
    else {
        b = localStorage.getItem(`block_${c}`);
        if (b == null) b = prompt("During which period do you take this class?");
        if (b != null) b = parseInt(b);
        if (b != null && !isNaN(b)) return block(b);
    }
    return b;
}

function breadcrumbs() {
    // console.log("https://classroom.google.com/" + google);
    let p = path(current), n = p.length, span;
    let i0 = $("article").width() < 600 && n > 1 ? n - 2 : 0;
    if (i0 == 0 && n > 2) i0 = 1;
    let b = $("<p>").attr({id: "BreadCrumbs"});
    for (let i=0; i0 + i < n-1; i++) {
        if (i) b.append(" / ");
        span = $("<span>").html(p[i0 + i].title);
        span[0].url = nodeUrl(p[i0 + i]);
        b.append(span);
    }
    if (nextUrl() && n > 2 && !touchscreen()) {
        span = $("<span>").addClass("Next").html("Next Topic");
        span[0].url = nextUrl();
        b.prepend(span);
    }
    b.find("span").click(function() {
        location.href = this.url;
    });
    return b;
}

function topicsAsUL() {
    let ul = $("ul[data-topics]");
    let items = current.menu;
    let i = 0;
    for (let u=0;u<ul.length;u++) {
        let uli = $(ul[u]);
        let n = $(ul[u]).attr("data-topics");
        n = n == "all" ? items.length - i : parseInt(n);
        for (let j=0;j<n;j++) {
            let a, item = items[i++];
            if (item.id) {
                let url = nodeUrl(item);
                a = $("<a>").attr({href: url});                
            }
            else if (item.href) {
                let url = makeHref(item.href);
                a = $("<a>").attr({href: url});                
            }
            else if (item.slide) {
                let url = item.slide;
                a = $("<a>").attr({href: `${slides}${url}.html`});                
            }
            else {
                a = $("<span>").addClass("Link").click(function() {
                    nodeAction(this.node);
                    $(this).css({color: "#551a8b"});
                });
                a[0].node = item;
            }
            let li = $("<li>").html(a.html(item.title)).appendTo(uli);
            if (item.separator) li.addClass("Separator");
            // i++;
        }
    }
}

function renderPage(id) {
    current = findNode(linkParents(home), id);
    let b = qsArgs("block");
    if (b) block(b);
    let a = $("article");

    // Page title
    let title = pageContent.title;
    $("<h1>").html(title ? title : document.title).attr({id:"Title"}).prependTo(a);
    breadcrumbs().prependTo(a);

    // Embed YouTube video
    if (pageContent.youtube) youtubeFrame(a, pageContent.youtube);

    // Action buttons
    if (pageContent.buttons) {
        let c = $("<div>").attr({id:"Controls"});
        let p = $("#ControlsContainer");
        if (p.length) c.prependTo(p);
        else c.appendTo(a);
        for (let i=0;i<pageContent.buttons.length;i++) {
            let btni = pageContent.buttons[i];
            let text = btni.text;
            if (!text) text = buttonLabel[btni.icon.slice(1)];
            let btn = $("<button>").html(text).appendTo(c);
            if (btni.icon)
                btn.css("background-image", 'url("' + makeUrl(btni.icon) + '")');
            if (btni.href)
                btn.wrap($("<a>").attr({href:makeHref(btni.href)}));
            btn[0].info = btni;
        }
        c.find("button").click(clickButton);
    }
    setGridColumns();

    // Miscellaneous actions
    $("[data-collapse]").click(toggleCollapse).attr({title:"Expand or Collapse Section"});
    if (location.search) collapse(location.search.slice(1));
    topicsAsUL();
    keepAspect();
    $("pre.Code").click(function(ev) {
        console.log(ev);
        if (ev.shiftKey || ev.altKey) clipCopy(ev.currentTarget, ev.altKey);
    }).attr({title: "Shift+Click to Copy Text. Alt+Click for Data URL."});
}

function clipCopy(e, asURL) {
    e = $(e);
    let text = e.text();
    if (asURL) text = dataURL(text, e.attr("data-mime"));
    e = $("<textarea>").html(text).appendTo($("body"));
    e.select();
    document.execCommand("copy");
    e.remove();
}

function dataURL(text, mime) {
    if (!mime) mime = "text/plain";
    if (mime.split("/")[0] == "text" && mime.search(";") == -1)
        mime += ";charset=utf-8";
    text = encodeURIComponent(text);
    let url = `data:${mime},${text}`;
    return url;
}

function youtubeFrame(a, info) {
    let y = Object.assign({width:1280, aspect:16/9}, info);
    let h = Math.round(y.width / y.aspect);
    let v = y.id;
    if (!v) v = "videoseries?list=" + y.list;
    let src = "https://www.youtube.com/embed/" + v;
    let attr = {src:src, width:y.width, height:h, frameborder:0,
        "data-aspect":y.aspect, allowfullscreen:true};
    $("<iframe>").attr(attr).appendTo(a);
}

function youtube(info) {
    $("#Cover").remove();
    let cover = $("<div>").attr({id:"Cover", title:"Click to close video"});
    cover.appendTo($("body")).click(function() {
        $(this).remove();
    });
    youtubeFrame(cover, info);
    keepAspect();
}

function clickButton() {nodeAction(this.info, true)}

function nodeAction(node, preventHref) {
    if (Object.keys(node).length == 1 && node.icon) {
        if (node.icon == "#gcr") {
            let url = path(current)[1].grc;
            if (typeof(url) != "string") url = url[block()];
            window.open(`https://classroom.google.com/${url}/t/all`);
        }
        else if (node.icon == "#cal") {
            let url = path(current)[1].cal;
            if (typeof(url) != "string") url = url[block()];
            url = `https://calendar.google.com/calendar/embed?src=eips.ca_classroom${url}%40group.calendar.google.com&ctz=America%2FEdmonton`;
            window.open(url);
            // window.open("https://calendar.google.com/calendar?cid=" + path(current)[1].cal);
        }
    }
    if (node.open) window.open(node.open);
    if (node.href && !preventHref) {
        // let href = node.href;
        // if (href.charAt(0) == "@") href = nodeUrl(findNode(home, href.slice(1)));
        location.href = makeHref(node.href); //href;
    }
    if (node.js) eval(node.js);
    if (node.youtube) youtube(node.youtube);
    // console.log(node);
}

function makeHref(url) {
    if (url.charAt(0) == "@") url = nodeUrl(findNode(home, url.slice(1)));
    return url;
}

function keepAspect() {
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let p = ei.parent();
        if (p[0].id == "Cover") {
            let hMax = p.height() - 12;
            let wMax = p.width() - 12;
            let w = ei[0].width;
            let h = ei[0].height;
            let f = Math.min(hMax / h, wMax / w, 1);
            h *= f; w *= f;
            ei.height(h).width(w);
            let y = (p.height() - h) / 2;
            let x = (p.width() - w) / 2;
            ei.css({left:x + "px", top:y + "px"});
        }
        else {
            let ar = parseFloat(ei.attr("data-aspect"));
            let h = ei.width() / ar;
            ei.height(h);
        }
    }
}

var BUTTON_W = 160, BUTTON_MAX = Math.round(1.2 * BUTTON_W);

function setGridColumns() {
    let a = $("article");
    let c = $("#Controls");
    let w = a.width();
    let n = Math.floor(w / BUTTON_W);
    if (!n) n = 1;
    else {
        let nmax = c.find("button").length;
        if (n > nmax) n = nmax;
    }
    w = Math.min(BUTTON_MAX, Math.floor((w - 8 * (n - 1)) / n));
    let cw = n * (w + 8) - 8;
    let css = "";
    while (n--) css += w + "px ";
    c.css({"grid-template-columns": css, width:cw + "px"});
}

function nodeUrl(node) {
    if (!node.id) return;
    let p = path(node);
    let u = makeUrl.home;
    let slash = "";
    for (let i=0;i<p.length;i++) {
        let id = p[i].id;
        u += slash + id;
        if (id.length) slash = "/";
    }
    return u + ".html";
}

function nextUrl(prev) {
    let node = prev ? prevNode(current, "id") : nextNode(current, "id");
    return node ? nodeUrl(node) : null;
}

function toggleCollapse(e) {
    e = $(e.currentTarget);
    let div = $("#" + e.attr("data-collapse"));
    let icon = div.is(":visible") ? "more" : "less";
    div.fadeToggle();
    e.find("em.material-icons").html("expand_" + icon);
}

function collapse(id) {
    let e = $("[data-collapse]");
    for (let i=0;i<e.length;i++) {
        let s = $(e[i]).attr("data-collapse");
        let ei = $("#" + s);
        if (s == id) ei.show();
        else ei.hide();
    }
}

touch.swipe = function(data) {
    if (data.r > 100) {
        let u, swipe = ["left", "right"].indexOf(data.swipe);
        if (swipe > -1) u = nextUrl(swipe == 1);
        console.log(u);
        if (u) location.href = u;
    }
}

window.addEventListener("resize", keepAspect);
window.addEventListener("resize", setGridColumns);
