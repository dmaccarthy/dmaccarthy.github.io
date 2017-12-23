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

function nodeHtml(node) {
	var p = $("<p>").html(node.title).click(navClick).attr("data-id", node.link);
	var div = $("<div>").html(p);
	p[0].node = node;
	if (node.pages) {
		var pg = node.pages;
		for (var i=0;i<pg.length;i++) div.append(nodeHtml(pg[i]));
	}
	return div;
}

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
		collapse();
		$("nav button")[0].innerHTML = "Expand";
	}
	fitImages();
}

function fitImages() {
	var imgs = $("article img");
	var w = parseInt(0.96 * $("article").width());
	for (var i=0;i<imgs.length;i++) {
		var img = $(imgs[i]);
		img.width(Math.min(w, img[0].naturalWidth))
	}
}

function navClick() {
	var p = $(this);
	var div = p.closest("div");
	var node = p[0].node;
	div.children("div").toggle();
	if (node.link) goNode(node.link);
}

var current, pop, init = true;

function goNode(node) {
	if (!node) node = sitemap;
	else if (typeof(node) == "string") node = find(node);
	if (!node) alert("Page under construction!");
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
		if (this.width > w) this.width = w;
	});
	$("article").html(html);
	document.title = $(html[0]).text();
	highlight(node);
	$("body").scrollTop(0);
}

function highlight(node) {
	var p = $("nav").find("p");
	p.removeClass("Current");
	p = $("nav").find("p[data-id='" + node.link + "']");
	p.addClass("Current");
	if (pop) pop = null;
	else {
		var url = location.href.split("?")[0];
		if (node != sitemap) url += "?" + node.link;
		if (init) history.replaceState({node:node}, "", url);
		else history.pushState({node:node}, "", url);
		init = false;
	}
	current = node;
}

function notFound(node) {
	$("article").html("The requested location is not currently available.");
	document.title = "sc8pr";
	highlight(node);
}

function collapse(n) {
	expandAll();
	if (!n) n = 1;
	var s = "nav div";
	while (n--) s += " div";
	$(s).hide();
}

function expandAll() {$("nav div").show()}

function expandCollapse(e) {
	if (e.innerHTML == "Collapse") {
		collapse();
		e.innerHTML = "Expand";
	}
	else {
		expandAll();
		e.innerHTML = "Collapse";
	}
}

function clipCopy(e) {
	var c = $("textarea.Clip");
	c.removeClass("Clip").html($(e).text()).select();
	document.execCommand('copy');
	c.addClass("Clip");
}

window.onresize = resize;

window.onload = function() {
	linkParentNodes();
	var c = $(nodeHtml(sitemap).children());
	c.insertBefore($("#Copyright"));
	$(c[0]).remove();
	collapse();
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
		if (ev.keyCode == 27) expandCollapse($("#Collapse")[0]);
		else if (ev.keyCode == 37) history.back();
		else if (ev.keyCode == 39) goNext();
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
