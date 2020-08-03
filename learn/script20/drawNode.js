function drawNode(node, e) {
    if (typeof(node) == "string") node = findNode(home, node);
    if (node) {
        drawNode.current = node;
        e = $(e ? e : "#Menu").html("").addClass("NoWinClick");
        e = $("<table>").appendTo(e);
        let p = path(node);
        drawNode.items(e, [{title:"Toggle Menu", icon:"$menu_open"}], false);
        let item = drawNode.items(e, p);
        p = node.menu;
        if (p) drawNode.items(e, p, true);
        else item.addClass("NoMenu");
        return e.find("tr").click(drawNode.click);
    }
}

function iconHTML(icon) {
    if (icon == "$") icon = "$bookmark_border";
    if (icon) {
        let c = icon.charAt(0);
        if (c == "$") return $("<em>").addClass("material-icons").html(icon.slice(1));
        else if (c == "#") {
            icon = icon.slice(1);
            if (icon.indexOf(".") == -1) icon += ".png";
            icon = linkURL.home + "media/" + icon;
        }
        return $("<img>").attr({src:icon});
    }
    return "";
}

drawNode.items = function(e, p, menu) {
    let item;
    for (let i=0;i<p.length;i++) {
        let pi = p[i];
        item = $("<tr>").attr({title:pi.title}).append($("<td>").html(pi.title)); // addClass(cls).
        let icon = pi.icon;
        if (!icon && pi.menu) {
            icon = "$folder";
            if (!menu) icon += (i == p.length - 1 ? "_special" : "_folder") 
        }
        item.prepend($("<td>").addClass("Icon").html(iconHTML(icon)));
        if (!icon) item.addClass("NoIcon");
        if (pi.sep || i == 0 && (menu != false)) item.addClass("Sep");
        item[0].node = pi;
        e.append(item);
    }
    return item;
}

drawNode.click = function() {goNode(this.node)}

drawNode.showMenu = function(show) {
    let nav = $("#Menu").show();
    let b = $("body");
    if (show == null) show = b.hasClass("MenuMin");
    if (show) b.removeClass("MenuMin");
    else b.addClass("MenuMin");
    nav.animate({right: (show ? 0 : 40 - nav.outerWidth())});
}

function linkURL(url) {
    if (url.charAt(0) == '#') {
        url = linkURL.home + url.slice(1);
    }
    return url;
}

function goNode(node) {
    if (typeof(node) == "string") node = findNode(home, node);
    if (node.icon == "$menu_open") drawNode.showMenu();
	if (node.href) location.href = linkURL(node.href);
    else {
        if (node.menu) {
            drawNode(node, "#Menu");
            drawNode.showMenu(true);
        }
        if (node.js) eval(node.js);
    }
    // console.log(node);
}

function showPages() {
    $(".Page").hide();
    for (let i=0;i<arguments.length;i++)
        $(arguments[i]).show();
}
