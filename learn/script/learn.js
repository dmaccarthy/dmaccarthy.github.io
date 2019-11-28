// Is anyone still using Internet Explorer?
if (!Object.assign) {
    alert("Your browser is not supported. Try the latest version of Firefox.");
    location.href = "https://www.mozilla.org/en-CA/firefox/";
}


// Icon images...

function icons(icon, css) {
	if (icon == "#cal") icon = icons.cal.replace("#", new Date().getDate());
	else {
		var c = icon.charAt(0);
		if (c == "@") icon = linkURL.home + "/media/" + icon.slice(1) + ".png";
		else if (c == "#") icon = icons[icon.slice(1)];
	}
	if (css) icon = "url('" + icon + "')"
	return icon;
}

Object.assign(icons, {
    cal:"https://calendar.google.com/googlecalendar/images/favicon_v2014_#.ico",
	zip:"https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_2_archive_x16.png",
	abed:"https://www.alberta.ca/build/20190829/favicons/favicon.ico",
	drive:"https://www.gstatic.com/images/icons/material/product/1x/drive_64dp.png",
	doc:"https://www.gstatic.com/images/branding/product/1x/docs_64dp.png",
	slide:"https://www.gstatic.com/images/branding/product/1x/slides_64dp.png",
	sheet:"https://www.gstatic.com/images/icons/material/product/1x/sheets_64dp.png",
	form:"https://www.gstatic.com/images/branding/product/1x/forms_48dp.png",
    classroom:"https://ssl.gstatic.com/classroom/favicon.png",
	socrative:"https://socrative.com/1.0.16/img/big-app-icon.png",
	repl:"https://repl.it/public/images/favicon.ico",
	python:"https://www.python.org/static/favicon.ico",
	desmos:"https://www.desmos.com/favicon.ico",
    ggb:"https://www.geogebra.org/favicon.ico",
	udemy: "https://www.udemy.com/staticx/udemy/images/v6/favicon-96x96.png",
    phet:"https://phet.colorado.edu/favicon.ico",
    ps:"https://powerschool.eips.ca/favicon.ico",
});


// Menu drawing...

function drawItems(nav, items, sep) {
    let p, k;
    for (let i=0;i<items.length;i++) {
        if (sep && sep.indexOf(i) > -1) nav.append("<hr>");
        let item = items[i];
        p = $("<p>").html(nodeText(item));
        if (item.icon == null) {
            for (k in drawItems.defIcons) if (item[k])
                item.icon = drawItems.defIcons[k];
        }
        if (item.icon)
            p.css("background-image", icons(item.icon, true));
        p[0].node = item;
        item.$ = p;
        nav.append(p.click(menuClick));
    }
    return p;
}

drawItems.defIcons = {drive:"#drive", open:"@extlink", slides:"@slideshow", yt:"@video"}

function drawMenu(node) {
    let expand = $("#Menu").hasClass("Path");
    if (typeof(node) == "string") node = findNode(home, node);
    let p = path(node);
    let nav = $("#Menu").html("");
    if (expand) nav.addClass("Path");
    drawItems(nav, p).addClass("Current");
    nav.children("p:not(.Current)").addClass("Path");
    if (hasChildren(node, true)) {
        nav.append("<hr/>");
        drawItems(nav, node.menu, node.sep);
    }
    drawMenu.current = node;
}

drawMenu.wide = 700;


// Modify document...

function mainContent(c) {
    let m = $("#Main");
    $("#Data").append(m.find("section._Data_").removeClass("_Data_"));
    return m.html(c);
}

function iframe(attr, cls, ar, container) {
    let f = $("<iframe>").addClass(cls).attr(attr);
    let p = container ? $("<p>").addClass("Center").html(f) : f;
    mainContent(p);
    if (ar) f.attr("data-aspect", ar).height(f.width() / ar);
}

iframe.yt = "https://www.youtube.com/embed/";

function showSummary(node) {
    let m = mainContent("");
    if (node.id) {
        let summary = $("#Data #§" + node.id);
        if (summary) {
            mainContent(summary);
            summary.addClass("_Data_");
        }
    }
    return m;
}


function linkURL(url) {
    if (url.charAt(0) == '#') {
        url = linkURL.home + url.slice(1);
    }
    return url;
}

linkURL.home = "https://learn.davidmaccarthy.repl.co";

function goNode(node) {
    if (typeof(node) == "string") node = findNode(home, node);
    showSummary(node);
    if (node.href) {
        let url = linkURL(node.href);
        if (url != init.href) {
            localStorage.setItem("#Menu.Path", $("#Menu").hasClass("Path"));
            location.href = url;
        }
    }
    if (hasChildren(node)) drawMenu(node);
    if (node.drive) window.open("https://drive.google.com/open?id=" + node.drive);
    if (node.open) window.open(linkURL(node.open));
    if (node.slides) window.open(linkURL(node.slides));
    // if (node.slides) iframe({src:node.slides}, "Full");
    if (node.yt) iframe({width:720, frameborder:0, allowfullscreen:true,
        src:iframe.yt + node.yt}, "Wide", node.aspect ? node.aspect : 16 / 9, true);
    if (node.js) eval(node.js);
}

function goNextMenu() {
    let node = nextNode(drawMenu.current, "menu");
    if (node) goNode(node);
}

function goPrevMenu() {
    let node = prevNode(drawMenu.current, "menu");
    if (node) goNode(node);
}

function goParent() {
    let node = drawMenu.current.parent;
    if (node) goNode(node);
}


// Event handling...

window.onresize = function() {
    let c = ["Narrow", "Normal"];
    let w = $(window).width() < drawMenu.wide ? 0 : 1;
    $("body").removeClass(c[1-w]).addClass(c[w]);
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        w = $(e[i]);
        w.height(w.width() / eval(w.attr("data-aspect")));
    }
}

$(window).keydown(function(ev) {
    if (ev.target = $("body")[0]) {
        if (ev.key == "ArrowLeft") goPrevMenu();
        else if (ev.key == "ArrowRight") goNextMenu();
        else if (ev.key == "ArrowUp") goParent();
    }
})

touch.swipe = function(data) {
    if (data.swipe == "right") goPrevMenu();
    else if (data.swipe == "left") goNextMenu();
    // else if (data.axis == 1) goParent();
}

function menuClick(ev) {
    let node = ev.currentTarget.node;
    $(window).focus();
    if (node.$.hasClass("Current")) {
        $("#Menu").toggleClass("Path");
        if ($("body").hasClass("Normal")) showSummary(drawMenu.current);
    }
    else goNode(node);
}


// Initialize document...

function init(opt) {
    linkParents(home);
    let b = $("body").prepend($("<nav>").attr({id:"Menu"})).append($("<article>").attr({id:"Main"}));
    let id = b.attr("data-node");
    let node = id ? findNode(home, id) : home;
    if (node) {
        if (opt) Object.assign(node, opt);
        if (opt && opt.menu) linkParents(home);
    }
    // else node = home;
    init.href = location.href; //pathname;
    id = param("id");
    if (id) node = findNode(home, id);
    goNode(node ? node : home);
    if (localStorage.getItem("#Menu.Path") == "true") $("#Menu").addClass("Path");
    window.onresize();
}


// Miscellaneous...

function params(str) {
    if (str == null) str = location.search;
    let p = {}, a = true;
    while (a) {
        if (a != true) {
            p[decodeURIComponent(a[1])] = decodeURIComponent(a[2]);
            str = str.slice(a.index + a[0].length);
        }
        r = /[\?&]([^&#]*)=([^&#]*)/;
        a = r.exec(str);
    }
    return p;
}

function param(name, str) {return params(str)[name]}

function wake_webapp() {
// Wake up the webapp
    console.log("Checking web app...");
    $.ajax({url:"https://webapp.davidmaccarthy.repl.co/utc.json",
        success:function(j) {console.log(j)},
        error:function() {setTimeout(wake_webapp, 5000)}});
}

wake_webapp();