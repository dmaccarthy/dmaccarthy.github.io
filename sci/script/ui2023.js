function teacher(a) {
/* Enable / disable teacher mode */
    if (a == null) a = parseInt(localStorage.getItem("teacher_mode")) + 1;
    if (isNaN(a)) a = 1;
    a = a % 3;
    localStorage.setItem("teacher_mode", a);
    console.log(["Student", "Ask", "Teacher"][a] + " mode");
}

function teacher_mode() {
    let a = localStorage.getItem("teacher_mode");
    if (a != null && a != "0") {
        if (a == 2 || confirm("Teacher mode?")) {
            window.isAfter = function() {return true}
            isAfter.teacher = true;
            console.log("Teacher mode!");
        }            
    }
}

teacher_mode();

function linkNodes(node) {
/* Add parent attribute to each node in the tree */
    let m = node.menu, rm = [];
    if (m) {
        for (let i=0;i<m.length;i++) {
            let n = m[i];
            if (isAfter(n.show)) {
                n.parent = node;
                if (!n.id) n.id = `${node.id}-${i}`;
                linkNodes(n);            
            }
            else rm.push(i);
        }
        for (let i=rm.length-1;i>=0;i--) m.splice(rm[i], 1);
    }
}

function nextNode(i, node) {
/* Find a node by index relative to the current node */
    if (!node) node = current;
    if (!i) i = 1;
    i += current_index();
    let nodes = nodeList.all;
    return i < 0 || i >= nodes.length ? null : nodes[i];
}

function drawNext(i, node) {
    drawNode(nextNode(i, node));
}

function nodeList(node) {
/* Create an array of the current node and all of its descendants */
    let nodes = [node];
    let m = node.menu;
    if (m) for (let i=0;i<m.length;i++) {
        let c = nodeList(m[i]);
        nodes.extend(c);
    }
    return nodes;
}

function nodePath(node) {
/* Determine the path from the home node to the current node */
    let p = [node];
    while (node.parent) {
        node = node.parent;
        p.push(node);
    }
    p.reverse();
    return p;
}

function findNode(id) {
/* Find a node by its id attribute */
    nodes = nodeList.all;
    for (let i=0;i<nodes.length;i++)
        if (nodes[i].id == id) return nodes[i];
}

let current;
function current_index() {return nodeList.all.indexOf(current)}

function breadCrumbs(p) {
/* Display the current node tree location as bread crumbs */
    let n = p.length;
    let c = $("#Location > p").html("");
    for (let i=0;i<n;i++) {
        let item = p[i];
        if (i) c.append(" / ");
        let t = item.text ? item.text : item.title;
        let s = $("<span>").html(t).appendTo(c);
        s.attr("data-id", item.id);
        if (i == n-1) s.addClass("Current");
        else s.attr("title", `Go to ${item.title}`);
    }
    c.find("span").click(function(e) {
        let node = findNode($(this).attr("data-id"));
        if (!(current === node)) drawNode(node);
    });
    return p[n-1].title;
}

function breadSelect(s, p) {
/* Draw a <select> element on narrow screens instead of bread crumbs */
    let n = s.options.length = p.length;
    for (let i=0;i<n;i++) {
        let opt = s.options[i];
        opt.node = p[i];
        opt.innerHTML = p[i].title;
    }
    drawNode.index = s.selectedIndex = n - 1;
    $(s).trigger("blur");
    return s.value;
}

function drawNode(node, init) {
/* Draw the specified node */
    if (!node) return;
    current = node;
    let s = $("#Location > *")[0];
    if (node.href) {
        if(s) s.selectedIndex = drawNode.index;
        location.href = node.href;
    }
    else {
        let p = nodePath(node);
        document.title = $("body").hasClass("Narrow") ? breadSelect(s, p)
            : breadCrumbs(p);

        let url = makeURL(true, {}, node.id);
        if (init) history.replaceState({}, "", url);
        else history.pushState({}, "", url);
    
        drawLayout(node);
    }
}

let MENU = 0, NEXT = 1, uc = {html:"Under Construction..."};

function drawLayout(node) {
/* Draw the content for the specified node */
    let a = $("#Main").html("");
    let lay = node.layout;
    if (!lay) lay = layout[node.id];
    if (!lay && node.menu && node.menu.length) lay = [0];
    if (!lay) lay = [];
    mjTypeset.ajax = 0;
    for (let i=0;i<lay.length;i++) {
        let item = lay[i];
        if (item == NEXT) item = {icons:nextIcons()}
        if (item == MENU) drawMenu(node, a);
        else if (item.html) drawHtml(item, a);
        else if (item.img) drawImg(item, a);
        else if (item.ajax) {
            drawAjax(item, a);
            mjTypeset.ajax++;
        }
        else if (item.icons) drawIcons(item, a);
        else if (item.vid) drawVid(item, a);
    }
    if (!mjTypeset.ajax) mjTypeset();
    aspect();
}

function drawHtml(item, a) {
/* Draw an HTML item */
    let s = $("<section>").addClass("HTML").appendTo(a);
    s.append(item.html);
}

function drawImg(item, a) {
/* Draw an image */
    let s = $("<section>").addClass("Image").appendTo(a);
    let img = item.img;
    if (typeof(img) == "string") img = {src:img};
    let e = $("<img>").attr(img);
    if (item.link)
        e = $("<a>").attr({href:item.link, target:String.random(6)}).append(e);
    e.appendTo(s);
}

function drawAjax(item, a) {
/* Send an AJAX request for HTML content */
    let s = $("<section>").addClass("HTML").appendTo(a);
    s[0].item = item;
    s.append("Loading...");
    $.ajax({url:item.ajax, success:function(e) {
        ajaxDone(e, s);
    }});
}

function ajaxDone(e, s) {
    s[0].item.html = e;
    s.html(e);
    pre_data(s);
    if (mjTypeset.ajax) mjTypeset.ajax--;
    if (!mjTypeset.ajax) mjTypeset();
    aspect();
}

function drawIcons(item, a) {
    let s = $("<section>").addClass("Icons").appendTo(a);
    for (let i=0;i<item.icons.length;i++) {
        let b = item.icons[i];
        if (isAfter(b.show)) {
            let btn = $("<button>").appendTo(s);
            if (b.key) {
                if (!b.text) b.text = "Answer Key";
                if (!b.icon) b.icon = "key";
                if (!b.url) {
                    let t = isAfter.teacher ? `?tp=${btoa('KHbnGbKdZHrQ')}` : "";
                    b.url = `../key.html${t}#${crs}/${b.key}`;
                }
                delete b.key;
            }
            let k = b.icon;
            if (!k) k = b.icon = "open";
            let icon = drawIcons.map[k];
            btn.html($("<i>").html(icon ? icon : k).addClass("material-symbols-sharp"));
            btn.append(" " + b.text);
            btn.click(function(e) {buttonAction(b, e)});            
        }
    }
    return s;
}

drawIcons.map = {open:"open_in_new", gdrv:"cloud_download", gdoc:"cloud_download",
    note:"edit_note", more:"more_horiz"};

function swapIcons(item, s0) {
    if (!s0) s0 = $("section.Icons");
    let s = drawIcons(item, $("#Main"));
    s.insertBefore(s0);
    s0.remove();
}

function drawVid(item, a) {
    let s = $("<section>").addClass("Video").appendTo(a);
    let id = item.vid;
    if (id.charAt(0) == "#") id = "videoseries?list=" + id.slice(1);
    let w = item.width;
    let r = item.aspect;
    if (!w) w = 720;
    if (!r) r = "16/9";
    $("<iframe>").attr({width:w, frameborder:0, allowfullscreen:1,
        src:"https://www.youtube.com/embed/" + id, "data-aspect":r}).appendTo(s);
    // aspect();
}

function getIcon(node) {
    let i = node.icon;
    if (!i) i = 1;
    if (i == 1) return getIcon(node.parent);
    return i ? i : "folder";
}

function drawMenu(node, a) {
    let s = $("<section>").addClass("Menu").appendTo(a);
    let m = node.menu;
    if (m) {
        let tbl = $("<table>").appendTo(s);
        for (let i=0;i<m.length;i++) {
            let tr = $("<tr>").appendTo(tbl);
            tr[0].node = node = m[i];
            let icon = getIcon(node);
            if (getIcon[icon]) icon = getIcon[icon];
            else icon = `../media/${icon}.png`;
            let img = $("<img>").addClass("Icon").attr({alt:"Icon", src:icon});
            tr.append($("<td>").html(img));
            tr.append($("<td>").html(node.title));
        }
        tbl.find("tr").click(clickMenu);        
        }
}

function nextIcons() {
    let p = nextNode(-1), n = nextNode();
    let items = [];
    if (p) items.push({icon:"arrow_back", text:p.title});
    if (n) items.push({icon:"arrow_forward", text:n.title});
    // if (p) items.push({icon:"arrow_back", text:`Previous (${p.title})`});
    // if (n) items.push({icon:"arrow_forward", text:`Next (${n.title})`});
    return items;
}

window.onpopstate = function() {
    drawNode(findNode(location.hash.slice(1)), true);
}

function clickMenu(ev) {
    drawNode(ev.currentTarget.node);
}

function buttonAction(item, e) {
    let c = e.ctrlKey;
    let icon = item.icon, a = item.action;
    let link = ["link", "note", "key"];
    if (icon == "gdrv") window.open(`https://drive.google.com/file/d/${item.url}`);
    else if (icon == "gdoc") window.open(`https://docs.google.com/document/d/${item.url}`);
    else if (link.indexOf(icon) >= 0) {
        if (c) window.open(item.url);
        else location.href = item.url;
    }
    else if (item.url) window.open(item.url);
    else {
        let n = 2 * ["arrow_back", "arrow_forward"].indexOf(icon) - 1;
        if (n >= -1) drawNext(n);
    }
    if (a) {
        if (typeof(a) == "string") eval(a);
        else a(item);
    }
}

function keyNext(e) {
/* Go to the next or previous page */
    if (e.ctrlKey) {
        if (e.key == "ArrowRight") drawNext();
        else if (e.key == "ArrowLeft") drawNext(-1);
    } 
}

function noSwipe(e) {
    e = $(e);
    return (e[0].isMathJax) || e.closest("pre").is(".Code") || (e.closest("[data-swipe]").attr("data-swipe") == "0");
}

function swipe(data, ev) {
    if (noSwipe(ev.target)) return;
    if (data.swipe == "left") drawNext();
    else if (data.swipe == "right") drawNext(-1);
}

$(function() {
    if (touchscreen()) touch.swipe = swipe;
    if ($(window).width() < 641) $("body").addClass("Narrow");
    else $("#Location").html($("<p>").html("..."));
    $(window).on("resize", aspect).on("keydown", keyNext);
    linkNodes(home);
    nodeList.all = nodeList(home);
    let id = location.hash.slice(1);
    let node = findNode(id);
    if (qsArgs("today")) node = findNode(today);
    drawNode(node ? node : home.menu[0], true);
    $("#Location > select").change(function(e) {
        drawNode(this.options[this.selectedIndex].node);
    });
    if (isAfter.teacher) {
        let p = $("<p>").addClass("Teacher");
        p.html("Teacher Preview!");
        $("body").prepend(p);
        p.click(function() {
            teacher(0);
            location.reload();
        });
    }
});