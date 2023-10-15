let M, F, A;
if (navigator.userAgent.match("Chrome")) {
    M = "Phil", F = "Sara", A = "Richard"; // "Liz";
}
else {
    M = "Richard", F = "Linda", A = "Zira";
}

say.callback = function(u, name, when) {
    if (when == 0) say.log(u, name, 0);
    else if (u.cue) runCue(u.cue);
}

function runCue(cue) {
   if (typeof(cue) == "string") {
        let e = $("#" + cue);
       runCue.section = e;
        if (e[0].tagName == "SECTION") {
            $("#Screen section").hide();
            e.show();
        }
        cue = 0;
    }
    let elem = runCue.section.find("[data-cue]");
    if (typeof(cue) == "function") return cue();
    if (cue === true) cue = runCue.current + 1;
    runCue.current = cue;
    for (let i=0;i<elem.length;i++) {
        let e = $(elem[i]);
        let c = e[0].cue;
        if (cue >= c[0] && cue < c[1]) e.show();
        else e.hide();
    }
}

function video(vids) {
    vids = vids.files;
    for (let i=0;i<vids.length;i++) {
        let vid = vids[i];
        let u = URL.createObjectURL(vid);
        let type = vid.name.split(".");
        type = `video/${type[type.length - 1]}`;
        let s = $("<source>").attr({src:u, type:type});
        video.elem[vid.name] = $("<video>").html(s)[0];
    }
}

video.elem = {};

function playVideo(name, pos, attr) {
    let vid = $(video.elem[name]).appendTo("#Screen");
    if (!vid.length) {
        console.log(`Unable to load video '${name}'`);
        return;
    }
   if (attr) vid.attr(attr);
    if (typeof(pos) == "number") {
        vid.css({border: `${pos}px solid black`});
        let s = $("#Screen");
        let x = (s.outerWidth() - vid.width()) / 2 - pos;
        let y = (s.outerHeight() - vid.height()) / 2 - pos;
        pos = [x, y];
   }
    vid.css({position:"fixed", left:pos[0], top:pos[1]});
}

function mouse(n) {
    let s = mouse.src + `${n}.png`;
    $("#Mouse").attr({src: s});
}

mouse.src = "../../../media/mouse";

$(window).on("mousemove", (e) => {
    let x = e.clientX, y = e.clientY;
    let s = $("#Screen");
    if (x < s.outerWidth() && y < s.outerHeight())
        $("#Mouse").css({left: x, top: y}).appendTo("body");;
})
.on("mousedown", () => {mouse("Alt")})
.on("mouseup", () => {mouse(0)})

$(function() {
    let sect = $("#Screen section");
    for (let i=0;i<sect.length;i++) {
        let s = $(sect[i]);
        let n = 0;
        let elem = s.find("[data-cue]");
        for (let j=0;j<elem.length;j++) {
            let e = elem[j];
            let cue = $(e).attr("data-cue").split(",");
            let c = cue[0];
            c = c == "=" ? n : (c == "+" ? n + 1 : parseInt(c));
            n = c;
            e.cue = [n];
            if (cue.length > 1) e.cue.push(n + parseInt(cue[1]));
        }
        for (let j=0;j<elem.length;j++) {
            let cue = elem[j].cue;
            if (cue.length < 2) cue.push(n + 1);
        }
    }
    $("<img>").attr({id: "Mouse", height: 64}).appendTo("body");
    mouse(0);
});
