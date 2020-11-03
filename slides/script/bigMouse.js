function mousePointer(src) {
	if (!src) src = home + "media/mouse.png";
	let img = $("<img>").attr({src:src, alt:"Mouse", id:"MouseImage"}).appendTo($("body"));
	img.attr({style:"position:fixed;top:0;left:0;z-index:999;"});
	window.addEventListener("mousemove", function(ev) {
		$("#MouseImage").css({left:(ev.clientX + 2) + "px", top:ev.clientY + "px"});		
	});
    window.addEventListener("mousedown", mousePointer.button);
    window.addEventListener("mouseup", mousePointer.button);
}

mousePointer.button = function(ev) {
    let src = ["mouseAlt", "mouse"];
    if (!$("html").hasClass("Mouse")) {
        let i = ["mousedown", "mouseup"].indexOf(ev.type);
        let m = $("#MouseImage").attr({src:home + `media/${src[i]}.png`});
    }
}

if (window.initPage) {
    if (!localStorage.getItem("present")) $("html").addClass("Mouse");
} else {
	mousePointer("https://slides.davidmaccarthy.repl.co/media/mouse.png");
	$("html *").css({cursor:"none"});	
}
