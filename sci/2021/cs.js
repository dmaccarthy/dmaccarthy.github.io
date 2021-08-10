let courses = {web1: "Web Programming 1", web2: "Web Programming 2",
    pp: "Procedural Programming", game: "Video Game Project", ds: "Data Structures",
    iter:"Iterative Algorithms", oop1:"Object-Oriented Programming 1"};

function loadVid() {
    let vids = $("[data-video]");
    for (let i=0;i<vids.length;i++) {
        let vid = $(vids[i]);
        let id = vid.attr("data-video");
        let src = "https://www.youtube.com/embed/" + (id.charAt(0) == "#" ? "videoseries?list=" + id.slice(1) : id);
        let e = $("<iframe>").attr({src:src, allowfullscreen:true, frameborder:0}).appendTo(vid);
        let size = eval(vid.attr("data-size"));
        if (size) {
            e.attr({width:size[0], height:size[1], "data-aspect": size[1] / size[0]});
        }
    }
}

function pre_data() {
    $("pre[data-mime]").click(function(ev) {
        if (ev.altKey) {
            let e = $(this);
            let url = "data:" + e.attr("data-mime") + ";charset=utf-8,";
            url += encodeURIComponent(e.text());
            e = $("<textarea>").text(url).appendTo($("body"));
            e.select();
            document.execCommand("copy");
            e.remove();
        }
    });
}


$(window).on("resize", function() {
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let h = ei.width() * parseFloat(ei.attr("data-aspect"));
        ei.attr({height:h})
    }
})

$(function() {
    loadVid();
    let b = $("body > article");
    $("<h1>").attr({id:"Title"}).html(document.title).prependTo(b);
    let a = $("<a>").html(courses[course]);
    a.attr({href:"../?id=" + course});
    $("<p>").html(a).prependTo(b);
    pre_data();
    $(window).trigger("resize");
});
