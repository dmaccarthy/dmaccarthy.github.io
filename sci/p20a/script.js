function iconImg(node) {
    let src = node.icon;
    if (!src) {
        src = "link";
        let imgs = ["video", "mail", "url", "gdrv"];
        for (let i=0;i<imgs.length;i++)
            if (node[imgs[i]] != null) src = imgs[i];
    }
    let u = iconImg.urls[src];
    if (u) src = u;
    else if (src.search("://") == -1)
        src = `../media/${src}.png`;
    let img = $("<img>").attr({alt:"Icon", src:src});
    return img;
}

iconImg.urls = {
    "favicon": "https://sci.davidmaccarthy.repl.co/media/favicon.ico",
    "bs": "https://s.brightspace.com/lib/favicon/2.0.0/favicon.ico",
    "cal": `https://calendar.google.com/googlecalendar/images/favicon_v2014_${new Date().getDate()}.ico`,
};

function iconButton(info) {
    let b = $("<button>").html(iconImg(info));
    b[0].info = info;
    b.append("<br>").append(info.title);
    return b.addClass("Icon").click(iconButton.click);
}

iconButton.click = function(ev) {
    let info = this.info;
    if (info.url) window.open(info.url);
    if (info.js) eval(info.js);
    if (info.video) playVideo(info.video);
    if (info.href) location.href = info.href;
}

function aspect() {
    let hd = $(".HD");
    for (let i=0;i<hd.length;i++) {
        let item = $(hd[i]);
        item.attr({height: 9*item.width()/16});
    }
}

function makeCover() {
    $("#Cover").remove();
    let e = $("<div>").attr({id:"Cover"}).appendTo($("body"));
    let s = $("<span>").html("✖").click(function() {
        $("#Cover").remove();
    }).attr({title:"Close Popup"});
    e.html($("<p>").addClass("CloseCover").html(s));
    return e;
}

function playVideo(vid) { 
    if (vid.charAt(0) == "#")
        vid = `videoseries?list=${vid.slice(1)}`;
    let src = `https://www.youtube.com/embed/${vid}`;
    vid = $("<iframe>").attr({
        width:720, frameborder:0, allowfullscreen: 1,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    }).attr({src:src}).addClass("HD");
    makeCover().append($("<p>").addClass("Center").html(vid));
    aspect();
}

function pageIcons() {
    let id;
    for (id in links) {
        let pg = $("#" + id);
        let e = $("<nav>").addClass("Icons");
        if (pg.length) {
            if (pg[0].tagName.toLowerCase() == "article")
                e.addClass("Expanded").prependTo(pg);
            else {
                let s = $("<span>").html("🔗 &nbsp;").addClass("Expand").attr({title:"Click to show/hide lesson links"});
                s.click(function() {
                    $(this).parent().siblings("nav.Icons").toggleClass("Expanded");
                });
                e.insertAfter(pg.find("h3").prepend(s)[0]);
            }
        }
        let icons = links[id];
        for (let i=0;i<icons.length;i++) e.append(iconButton(icons[i]));
    }
}

function clickAction(ev, sel) {
    let e = $(ev.target);
    if (!sel) sel = ["input", "textarea", "iframe", "a", "[onclick]", ".NoClick"];
    for (let i=0;i<sel.length;i++) {
        if (e.is(sel[i]) || e.closest(sel[i]).length) return false;
    }
    return true;
}

// function inRect(x, y, r) {
//     let dx = x - r[0];
//     let dy = y - r[1];
//     return dx >= 0 && dy >= 0 && dx < r[2] && dy < r[3];
// }

// function imgclick(ev) {
//     let r = [0,0,240,240]
//     console.log(inRect(ev.offsetX, ev.offsetY, r));
// }

function showArticle(n) {
    let sel = $("#Main")[0];
    if (n === true) n = sel.selectedIndex + 1;
    else if (n === false) n = sel.selectedIndex -1;
    let opt = sel.options.length;
    if (n < 0) n += opt;
    else if (n >= opt) n -= opt;
    sel.selectedIndex = n;
    $("body > article").hide();
    $("#" + sel.options[n].value).fadeIn();
}

function qsArgs(key) {
    let qs = location.search.slice(1).split("&");
    args = {}
    for (let i=0;i<qs.length;i++) {
        let a = qs[i].split("=");
        args[a[0]] = decodeURIComponent(a[1]);
    }
    return key ? args[key] : args;
}

// window.onresize = function() {
//     let w = Math.floor($(window).width() / 384);
//     $(".Column").css("column-count", w > 1 ? 2 : 1);
// }

$(function() {
    pageIcons();
    let c = qsArgs("chapter"), n = 0;
    let opt = $("#Main")[0].options;
    for (let i=1;i<opt.length;i++)
        if (opt[i].value == c) n = i;
    showArticle(n);
    // window.onresize();
})

touch.swipe = function(a, b) {
    if (a.swipe == "left") showArticle(true);
    else if (a.swipe == "right") showArticle(false);
}
