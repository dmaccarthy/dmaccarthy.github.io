function monitorZoom() {
    let b = $("body");
    let s = b.children("section.Slide");
    if (b.hasClass("Present")) {
        let z0 = s.css("zoom");
        s.css({zoom:1});
        let z = $(window).height() / Math.ceil(1 + $("html").height());
        if (z < 1) s.css({zoom:z});
    }
    else z = s.css({zoom:1});
    setTimeout(monitorZoom, 250);
}

function makeMenu() {
    let div = $("<div>").attr({id:"Menu"}).addClass("Min").click(menuClick);
    for (let i=0;i<makeMenu.icons.length;i++) {
        let icon = makeMenu.icons[i];
        div.append($("<img>").attr({alt:icon[0], src:"/media/" + icon[1] + ".png", title:icon[2]}));
    }
    div.children("[alt='Menu']").attr({id:"MenuIcon"});
    let pg = $("<div>").html($("<span>").addClass("Min").attr({id:"SlideNumber"}).html(1));
    pg.append($("<input>").addClass("Max").attr({type:"text", value:1}).change(function() {
        console.log($(this).val());
    }));
    pg.append("<span> / </span>");
    pg.append($("<span>").attr({id:"SlideCount"}).html(2));
    return div.prepend(pg.children());
}

makeMenu.icons = [
    ["Mode", "slideshow", "Presentation Mode"],
    ["Open", "extlink", "Open in New Tab"],
    ["Hide", "x", "Close Menu"],
    ["Menu", "menu", "More / Less"]
];

function menuClick(ev) {
    let m = $("#Menu");
    if (m.hasClass("Min") || ev.target.id == "MenuIcon") m.toggleClass("Min Max");
    let action = $(ev.target).attr("alt");
    if (action == "Open") window.open(location.href); //.resizeTo(960, 540);
    else if (action == "Mode") $("body").toggleClass("Present");
    else if (action == "Hide") $("#Menu").hide();
}
