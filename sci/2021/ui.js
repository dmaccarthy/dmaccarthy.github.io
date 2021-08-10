function makeIcon(node) {
    let icon = node.icon;
    if (!icon) icon = node.lesson;
    if (icon) {
        let i = makeIcon.urls[icon];
        if (i) icon = i;
        else if (icon.search("/") == -1)
            icon = `${makeIcon.media}${icon}.png`;
        icon = $("<img>").attr({src:icon}).addClass("Icon");
    }
    else icon = "&nbsp;";
    return icon;
}

//makeIcon.media = "../media/";
makeIcon.media = "/sci/media/";

makeIcon.urls = {
    "bs": "https://s.brightspace.com/lib/favicon/2.0.0/favicon.ico",
    "ps": "https://powerschool.eips.ca/favicon.ico",
    "ab": "https://www.alberta.ca/build/20201029/favicons/favicon-192.png",
    "gdrv": "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
    "py":"https://www.python.org/static/favicon.ico",
    "repl":"https://replit.com/public/icons/favicon-196.png",
};

// function up(p) {
//     p = p.node.parent;
//     if (p) drawNode(p);
// }

function deep(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function video(node) {
    let id = node.vid;
    if (id.charAt(0) == "#") id = "videoseries?list=" + id.slice(1);
    let w = node.width;
    let a = node.aspect;
    if (!w) w = 720;
    if (!a) a = 16 / 9;
    // let h = Math.round(w / a);
    let iframe = $("<iframe>").attr({width:w, frameborder:0, allowfullscreen:1,
        allow:video.allow, src:"https://www.youtube.com/embed/" + id, "data-aspect":a});
    return $("<p>").addClass("Video").html(iframe);
}

function breadCrumbs(node) {
    let p = nodePath(node), e = $("#Crumbs").html("");
    for (let i=0;i<p.length;i++) {
        if (i) e.append(" / ");
        let s = $("<span>").html(p[i].title);
        s[0].node = p[i];
        s.click(function() {drawNode(this.node)});
        e.append(s);
        if (i < p.length-1) s.attr({title:"Open this Folder"})
    }
}

function drawNode(node) {
    // $("p.Title")[0].node = node;
    // let p = $("#Title").html(node.title).parent();
    $("#Links").remove();
    $("#Content").html("");
    breadCrumbs(node);
    let tbl = $("<table>").attr({id:"Links"});
    if (node.menu) for (let i=0;i<node.menu.length;i++) {
    let mi = node.menu[i];
    let tr = $("<tr>").appendTo(tbl);
    let img = mi.icon ? "Icon" : "&nbsp;"
    tr.append($("<td>").html(makeIcon(mi))).append($("<td>").html(mi.title));
    tr.click(function() {
        if (mi.open) window.open(mi.open);
        if (mi.menu) drawNode(mi);
        else if (mi.href) location.href = mi.href;
        else drawContent(mi);
    });
   }
   tbl.appendTo($("article"));
//    if (node === home) p.addClass("Home");
//    else $("p.Title").removeClass("Home");
   drawContent(node);
}

function drawContent(node, e) {
    e = $(e ? e : (node.content ? node.content : "#Content"));
    if (node.html) e.html(node.html);
    if (node.vid) {
        e.html(video(node));
        aspect();
    }
}

window.onresize = aspect;

$(function() {
    let node = qsArgs("id");
    if (node) node = findNode(node, true); 
    drawNode(node ? node : home);
})
