function autoTime() {
    let t = 0, e = $("[data-t]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let a = ei.attr("data-t");
        if (a == "=") ei.attr("data-t", t)
        else if (a.charAt(0) == "+") {
            t += a.length == 1 ? 1 : parseInt(a.substr(1));
            ei.attr("data-t", t);
        }
        else if (a) {
            t = parseInt(a);
            ei.attr("data-t", t);            
        }
    }
}

function goTime(t, fade) {
    if (t == null) t = goTime.t + 1;
    else if (t < 0) t = 0;
    console.log(`Marker: ${t}`);
    goTime.t = t;
    if (fade == null) fade = goTime.fade;
    let n, e = $("[data-t]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let a = parseInt(ei.attr("data-t"));
        try {n = parseInt(ei.attr("data-n"))}
        catch(err) {n = null}
        let v = (t >= a) && (!n || t < a+n);
        if (v) ei.fadeIn(fade);
        else if (n && t == a+n && ei.attr("data-remove")) ei.remove();
        else ei.fadeOut(fade);
    }    
}

goTime.fade = 600 * 0;

function screenSize() {
    let e = $("#Screen");
    return [e.outerWidth(), e.outerHeight()];
}

function positionItem(e, x, y) {
    if (!x) x = 0;
    if (!y) y = 0;
    e = $(e);
    let s = screenSize();
    let w = s[0] - e.outerWidth(), h = s[1] - e.outerHeight();
    e.css({position:"fixed", left:`${x*w}px`, top:`${y*h}px`});
}

function vpp() {
/* Video toggle play/pause */
    let v = $("video:visible")[0];
    if (v) {
        if (v.paused) v.play();
        else v.pause();
    }
    
}

let drag;

$(window).on("keydown", function(e) {
    e = e.code;
    if (e == "ArrowRight") goTime(goTime.t + 1);
    else if (e == "ArrowLeft") goTime(goTime.t - 1);
}).click(function(e) {
    e = e.originalEvent;
    drag = e.altKey ? $(e.target).closest(".Drag") : null;
    if (e.ctrlKey) {
        let s = e.shiftKey;
        e = $(e.target).closest(".Layer");
        if (s) e.prependTo($("#Screen"));
        else e.appendTo($("#Screen"));
    }
}).on("mousemove", function(e) {
    if (drag) {
        e = e.originalEvent;
        let x = parseInt(drag.css("left")) + e.movementX;
        let y = parseInt(drag.css("top")) + e.movementY;
        drag.css({top:`${y}px`, left:`${x}px`});
    }
});

$(function() {
    let url = qsArgs("url");
    if (url) $.ajax({url:url, success:function(e) {
        let s = $("#Screen").html(e);
        autoTime();
        goTime(0, 0);
        mjTypeset();
        e = $("[data-pos]");
        for (let i=0;i<e.length;i++) {
            let ei = $(e[i]); 
            let p = ei.attr("data-pos");
            p = eval(`[${p}]`);
            positionItem(ei, ...p);
        }
        e = $(".Left");
        let l = e.length ? parseInt(e.outerWidth()) : 0;
        if (l) {
            e.width(l - 24).css({padding:"0 12px"});
        }
        s.css({width:screenSize()[0] - l, "padding-left":`${l}px`})
        
    }});
});

console.log(`.Drag ... Alt + Click
.Layer (Top) ... Ctrl + Click
.Layer (Bottom) ... Shift + Ctrl + Click
`);
