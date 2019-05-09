/** Traverse the nodes within this site **/

function linkParentNodes(node) {
	if (!node) node = sitemap;
	var pg = node.pages ? node.pages : [];
	for (var i=0;i<pg.length;i++) {
		pg[i].parent = node;
		linkParentNodes(pg[i]);
	}
}

function nextSib(node) {
	var p = node.parent;
	if (!p) return;
	var pgs = p.pages;
	var i = pgs.indexOf(node);
	if (i < pgs.length-1) return pgs[i+1];
	return nextSib(p);
}

function next(node) {
	var pg = node.pages;
	if (pg) if (pg.length) return pg[0];
	return nextSib(node);
}

function find(link, node) {
	if (!node) node = sitemap;
	while (node) {
		if (node.link == link) return node;
		node = next(node);
	}
	if (node) if (node.link == link) return node;
}


/** AJAX **/

var current, pop, init = true;

function goNode(node) {
	if (!node) node = sitemap;
	else if (typeof(node) == "string") node = find(node);
	if (!node) {
		if (current == null) goNode();
		alert("Page not found. This could be a bad URL or a page still under construction!");
	}
	else if (node != current) {
		var url = "htm/" + node.link + ".htm";
		if (node) $.ajax({url:url, success:function(h) {ajaxLoad(h, node)},
			error:function(h) {notFound(node)}});
	}
}

function goNext() {goNode(next(current))}

function ajaxLoad(html, node) {
	html = $(html).children();
	var w = parseInt(0.96 * $("article").width());
	var imgs = html.find("img").on("load", function() {
		var wMax = this.getAttribute("data-wide");
		if (wMax) if (w > wMax) w = wMax;
		if (this.width > w) this.width = w;
	});
	var a = $("article").html(html);
	a.find("pre.Code").click(codeExample).attr("title", "Shift+Click to Copy to Clipboard");
	document.title = $(html[0]).text();
	highlight(node);
	fitVideo();
	scrollTo(0, 0);
}

function notFound(node) {
	$("article").html("The requested location is not currently available.");
	document.title = "sc8pr";
	highlight(node);
}


/** Navigation Panel **/

function nodeHtml(node) {
	var img = $("<img>").attr({src:"img/blank.png"});
	var span = $("<span>").html(node.title).click(navClick).attr("data-id", node.link);
	var li = $("<li>").html(img).append("&nbsp;").append(span);
	li[0].node = node;
	if (node.pages) {
		img.click(collapseToggle).attr({src:"img/minus.png", title:"Expand or Collapse Menu", style:"cursor:pointer"});
		var ul = $("<ul>").addClass("Expanded");
		li.append(ul).addClass("Expanded");
		var pg = node.pages;
		for (var i=0;i<pg.length;i++) ul.append(nodeHtml(pg[i]));
	}
	return li;
}

function highlight(node) {
	var nav = $("nav");
	nav.find(".Current").removeClass("Current");
	var li = nav.find("[data-id='" + node.link + "']").addClass("Current").closest("li");
//	console.log("Highlight!", li);
	expandUp(li);
	if (pop) pop = null;
	else {
		var url = location.href.split("?")[0];
		if (node != sitemap) url += "?" + node.link;
		if (history.pushState) {
			if (init) history.replaceState({node:node}, "", url);
			else history.pushState({node:node}, "", url);
		}
		init = false;
	}
	current = node;
}

function collapseToggle(ev) {
	var li = $(this).closest("li");
	if (li.hasClass("Expanded")) collapse(li);
	else expand(li);
	console.log(li[0].node);	
	console.log(ev);
}

function collapse(li) {
	if (li.hasClass("Expanded")) {
		li.removeClass("Expanded").addClass("Collapsed");
		li.children("img").attr({src:"img/plus.png"});
		var ul = li.children("ul");
		ul.removeClass("Expanded").addClass("Collapsed");
		li = ul.children("li");
		for (var i=0;i<li.length;i++) collapse($(li[i]));
	}
}

function expand(li) {
	if (li.hasClass("Collapsed")) {
		li.removeClass("Collapsed").addClass("Expanded");
		li.children("img").attr({src:"img/minus.png"});
		var ul = li.children("ul");
		ul.removeClass("Collapsed").addClass("Expanded");		
	}
}

function expandUp(li) {
	while (li.length) {
		expand(li);
		li = $(li[0].parentNode.parentNode);
	}
}


/** Event Handling **/

function resize() {
	var w = $(window).width();
	var nav = $("nav");
	if (w >= 640) {
		nav.addClass("Wide");
		var h = $(window).height();
		h -= parseFloat(nav.css("padding-top")) + parseFloat(nav.css("padding-bottom"));
		nav.height(h).width(240);
		$("body").css("margin-left", 256);
	}
	else {
		nav.removeClass("Wide");
		w -= parseFloat(nav.css("padding-left")) + parseFloat(nav.css("padding-right"));
		nav.width(w).height("auto");
		$("body").css("margin-left", 0);
	}
	fitImages();
	fitVideo();
}

function navClick() {
	var li = $(this).closest("li");
	var node = li[0].node;
	if (node.link) goNode(node.link);
}

function codeExample(ev) {
	if (ev.shiftKey) {
		var c = $("textarea.Clip");
		c.removeClass("Clip").html($(this).text()).select();
		document.execCommand('copy');
		c.addClass("Clip");
	}
}

window.onresize = resize;

window.onload = function() {
	linkParentNodes();
	$($(nodeHtml(sitemap)).find("ul")[0]).addClass("Menu").insertBefore($("#Copyright"));
	var li = $("nav").children("ul").children("li");
	for (var i=0;i<li.length;i++) collapse($(li[i]));
	resize();
	goNode(location.href.split("?")[1]);
	animate();
}

window.onpopstate = function(ev) {
	pop = ev.state.node;
	goNode(pop);
}

window.onkeydown = function (ev) {
	var tag = ev.target.tagName.toUpperCase();
	if (tag != "INPUT" && tag != "TEXTAREA") {
		var key = ev.keyCode;
		if (key == 37) history.back();
		else if (key == 39) goNext();
	}
}


/** Other Functions **/

function fitImages() {
	var w = parseInt(0.96 * $("article").width());
	var imgs = $("article img.Fit");
	for (var i=0;i<imgs.length;i++) {
		var img = $(imgs[i]);
		var wMax = img[0].getAttribute("data-wide");
		img.width(Math.min(w, wMax ? wMax : img[0].naturalWidth))
	}
}

function fitVideo() {
	var w = parseInt(0.96 * $("article").width());
	var imgs = $("article iframe.Fit");
	for (var i=0;i<imgs.length;i++) {
		var img = $(imgs[i]);
		var wMax = img[0].getAttribute("data-wide");
		w = Math.min(w, wMax);
		var h = w * img[0].height / img[0].width;
		img.attr({width:w, height:h})
	}
}

function animate() {
	var f = animate.frame;
	var d = animate.change;
	f += d;
	if (f > 3 || f < 0) {
		f -= 2 * d;
		animate.change *= -1;
	}
	animate.frame = f;
	$("#Logo").attr("src", "img/alien" + f + ".png");
	setTimeout(animate, [8000, 100, 100, 500][f]);
}

animate.frame = 3;
animate.change = 1;
