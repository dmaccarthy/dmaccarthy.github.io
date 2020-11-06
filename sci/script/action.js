$(function() {
    let current = qsArgs("page");
    if (!current) current = home.title;
	let ul = $("ul.Tree").append(treeLI(home));
	initTreeUL(ul, action);
    showArticle();
	current = findNode(home, current);
	expandOnly($(current.li).addClass("Current"));
    narrowScreen();
    $("#IconToC").click(toggleToC);
    if (current) action(current);
});

function toggleToC(ev) {
    if (ev.ctrlKey) {
        if (ev.shiftKey) {
            $("body").addClass("Slideshow HideToC");
            zoomImages();
            slideshow(0);
            mousePointer();
            return false;
        }
        else {
            let node = $("li.Current")[0].node;
            let url = location.href.split("?")[0];
            if (node != home) {
                let id = node.id;
                url += "?page=" + encodeURIComponent(id ? id : node.title);
            }
            window.open(url);
        }
    }
    else {
        let u = $("ul.Tree");
        if ($("body").toggleClass("HideToC").hasClass("HideToC"))
            u.slideUp();
        else u.slideDown();
    }
}

function showArticle(a) {
    let h = $("article:visible").hide();
    a = $(a).show();
    let id = a.length ? a[0].id : null;
    for (let i=0;i<h.length;i++) {
        let idh = h[i].id;
        if (idh != id) articleScript(idh, "hide");
    }
    if (id) articleScript(id, "show");
    return a;
}

function ajaxArticle(data) {
    data = data.split("#");
    let id = "#" + data[1];
    if ($(id).length) showArticle(id);
    else {
        ajaxArticle.pending = id;
        showArticle("#Loading");
        $.ajax({url:data[0],
            success:function(ev) {ajaxComplete(ev, id, true)},
            error:function(ev) {ajaxComplete(ev, id)},
        });
    }
}

function ajaxComplete(ev, id, success) {
    if (id == ajaxArticle.pending) {
        delete ajaxArticle.pending;
        if (!success) showArticle("#Error");
        else {
            $("body").append(ev);
            showArticle(id);
        }
    }
}

function articleScript(id, key) {
    if (id.charAt(0) == "#") id = id.slice(1);
    let fn = articleScript.map[id];
    // console.log(id, key, fn);
    if (fn && fn[key]) fn[key]();
}

articleScript.map = {}

function action(node) {
    if (!node) return;
    let tree = node.parent || node == home;
    let nav = $("#Toolbar");
    if (tree) {
        $("#Title").html(node.title ? node.title : document.title);
        setCurrent(node.li);
        if( action.autoCollapse) expandOnly(node.li);
        nav.html("");
    }
    if (node.links) {
        for (let i=0;i<node.links.length;i++) {
            let item = node.links[i];
            let e = $("<button>").appendTo(nav).click(function(e) {
                action(e.currentTarget.node);
            }).addClass("Icon").html(iconImg(item))
                .append("<br>").append(item.title);
            e[0].node = item;
        }
    }
    if (tree || node.article)
        showArticle(node.article ? "#" + node.article : "");
    if (node.video) showVideo(node.video);
    if (node.ajax) ajaxArticle(node.ajax);
    if (node.gdrv) window.open("https://drive.google.com/file/d/" + node.gdrv);
    else if (node.gdrv == "") alert("Requested document is currently unavailable!");
    if (node.url) window.open(node.url);
    if (node.mail) window.open(node.mail);
    if (node.js) eval(node.js);
    narrowScreen();
}

action.autoCollapse = true;

function fullHref(sel, url, attr) {
    if (attr == null) attr = "href";
    if (url == null) url = fullHref.slides;
    let a = $(sel);
    for (let i=0;i<a.length;i++) {
        let ai = $(a[i]);
        ai.attr(attr, url.slice(0).replace("##", ai.attr(attr)));
    }
}

fullHref.slides = "https://slides.davidmaccarthy.repl.co/##.html";

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
    "bs": "https://s.brightspace.com/lib/favicon/2.0.0/favicon.ico",
    "cal": `https://calendar.google.com/googlecalendar/images/favicon_v2014_${new Date().getDate()}.ico`,
};

function showVideo(vid) { 
    if (vid.charAt(0) == "#")
        vid = `videoseries?list=${vid.slice(1)}`;
    let src = `https://www.youtube.com/embed/${vid}`;
    vid = $("<iframe>").attr({
        width:720, frameborder:0, allowfullscreen: 1,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    }).attr({src:src}).addClass("HD");
    showArticle("#VideoContainer").html($("<p>").addClass("Center").html(vid));
}

function narrowScreen() {
    let w = $(window).width(), b = $("body");
    if (w < narrowScreen.size) b.addClass("Narrow");
    else b.removeClass("Narrow");
    let hd = $(".HD");
    for (let i=0;i<hd.length;i++) {
        let item = $(hd[i]);
        item.attr({height: 9*item.width()/16});
    }
}

narrowScreen.size = 680;

function qsArgs(key) {
    let qs = location.search.slice(1).split("&");
    args = {}
    for (let i=0;i<qs.length;i++) {
        let a = qs[i].split("=");
        args[a[0]] = decodeURIComponent(a[1]);
    }
    return key ? args[key] : args;
}

window.addEventListener("resize", narrowScreen);

window.addEventListener("keydown", function(ev) {
    if (ev.ctrlKey) {
        if (ev.key == "ArrowRight") action(nextNode());
        else if (ev.key == "ArrowLeft") action(nextNode(-1));
        else if (ev.key == "x") {
            zoomImages(1 / zoomImages.default);
            $("body").removeClass("Slideshow HideToC BigMouse");
            narrowScreen();
            $("#MouseImage").remove();
        }
    }
    // console.log(ev);
});

touch.swipe = function(data) {
    if (data.r > 100) {
        if (data.swipe == "left") action(nextNode());
        else if (data.swipe == "right") action(nextNode(-1));
    }
}

function scrollBottom() {
    let e = $("html");
    e.scrollTop(e[0].scrollHeight);
}

function slideshow(n) {
    if (!$("body").hasClass("Slideshow")) return;
    if (n == null) n = slideshow.n + 1;
    slideshow.n = n = Math.max(0, n);
    let e = $("[data-slide]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let s1, s0 = eval(ei.attr("data-slide"));
        if (typeof(s0) != "number") {
            s1 = s0[1];
            s0 = s0[0];
        }
        if (s0 <= n && (s1 == null || n <= s1)) ei.show();
        else ei.hide();
    }
    scrollBottom();
}

function advance(n) {slideshow(slideshow.n + n)}

window.addEventListener("click", function(ev) {
    let e = ev.target;
    // Use $.is?
    let tags = ["input", "textarea", "iframe", "a"];
    if (tags.indexOf(e.tagName.toLowerCase()) == -1 && ! $(e).hasClass("NoClick"))
        advance(ev.shiftKey ? -1 : 1);
});

function mousePointer(src) {
	if (!src) src = "../media/mouse.png";
	let img = $("<img>").attr({src:src, alt:"Mouse", id:"MouseImage"}).appendTo($("body").addClass("BigMouse"));
	img.attr({style:"position:fixed;top:0;left:0;z-index:999;"});
	window.addEventListener("mousemove", function(ev) {
		$("#MouseImage").css({left:(ev.clientX + 2) + "px", top:ev.clientY + "px"});		
	});
}

mousePointer.button = function(ev) {
    let src = ["mouseAlt", "mouse"];
    if ($("#MouseImage").length) {
        let i = ["mousedown", "mouseup"].indexOf(ev.type);
        let m = $("#MouseImage").attr({src:`../media/${src[i]}.png`});
    }
}

window.addEventListener("mousedown", mousePointer.button);
window.addEventListener("mouseup", mousePointer.button);

function zoomImages(z) {
    let imgs = $(".Zoom");
    for (let i=0;i<imgs.length;i++) {
        let img = $(imgs[i]);
        img.width((z ? z : zoomImages.default) * img.width());
    }
}

zoomImages.default = 1.5;