let courses = {sp1:"Structured Programming 1", sp2:"Structured Programming 2",
    web1: "Web Programming 1", web2: "Web Programming 2",
    pp: "Procedural Programming", game: "Video Game Project", ds: "Data Structures",
    iter:"Iterative Algorithms", oop1:"Object-Oriented Programming 1", rec:"Recursive Programming",
    dds1:"Dynamic Data Structures 1", robo:"Robotics Programming", ct1:"Computing Theory 1"};

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


function sequence(article) {
    let p = location.pathname.split("/");
    let fn = p[p.length - 1];
    let href = [], current;
    for (let i=0;i<sequence.map.length;i++) {
        let split = sequence.map[i].split("/");
        if (split[0] == course) {
            href.push(split[1]);
            if (fn == split[1]) current = href.length;
        }
    }
    if (current != null) if (current < href.length) {
        let a = $("<a>").html("Next Lesson").attr({href:href[current]});
        $("<p>").addClass("Next").html(a).appendTo(article);
    }
}

sequence.map = ["sp1/intro.html","sp1/ide.html","sp1/python.html","sp1/comment.html","sp1/var.html","sp1/io.html","sp1/type.html","sp1/mod.html","sp1/oper.html","ct1/algo.html","sp2/bool.html","sp2/if.html","sp2/loop.html","sp2/flag.html","sp2/iter.html","sp2/format.html","sp2/accum.html","sp2/str.html","robo/intro.html","robo/turn.html","robo/func.html","robo/colour.html","robo/soccer.html","robo/list.html","robo/park.html","web1/internet.html","web1/tree.html","web1/xml.html","web1/text.html","web1/entity.html","web1/html5.html","web1/char.html","web1/image.html","web1/list.html","web2/form.html","web2/style.html","web2/ext.html","web2/div.html","web2/js.html","pp/func.html","pp/scope.html","pp/top.html","pp/pre.html","pp/except.html","game/sketch.html","game/custom.html","game/text.html","game/key.html","game/mouse.html","ds/list.html","ds/iter.html","ds/dict.html","ds/args.html","ds/comp.html","ds/gen.html","ds/array.html","iter/search.html","iter/bsearch.html","iter/bubble.html","iter/insert.html","iter/sel.html","iter/merge.html","oop1/obj.html","oop1/mod.html","oop1/spec.html","oop1/inher.html","rec/rec.html","rec/sort.html","dds1/linkedList.html","dds1/mod.html","dds1/sort.html"];

$(function() {
    loadVid();
    let b = $("body > article");
    $("<h1>").attr({id:"Title"}).html(document.title).prependTo(b);
    let a = $("<a>").html(courses[course]);
    a.attr({href:"../?id=" + course});
    $("<p>").html(a).prependTo(b);
    pre_data();
    sequence(b);
    $(window).trigger("resize");
});
