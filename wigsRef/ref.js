function parseQuery(s, delim) {
	if (!delim) delim = "&";
	if (!s) s = location.search.slice(1);
	s = s.split(delim);
	var args = {}
	for (var i=0;i<s.length;i++) {
		var arg = s[i].split("=");
		var key = decodeURIComponent(arg[0]);
		if (key.length > 0) args[key] = decodeURIComponent(arg[1]);
	}
	return args;
}

function nextScreen() {
	if ($("#Overview:visible").length) {
		var img = $("img[alt=Screenshot]");
		var n = parseInt(img.attr("data-n")) + 1;
		if (n > 1) n = 0;
		img.attr({"data-n": n, src:"img/screen" + n + ".png"});
	}
	setTimeout(nextScreen, 8000);
}

function show(id) {
	if (typeof(id) != "string")
		id = $(id.currentTarget).attr("data-go");
	if (id) {
		$("article[id]").hide();
		$("#" + id).show();
	}
}

function goRef(id) {
	$.ajax({url: "ref/" + id + ".xml", dataType:"xml", success:loadRef, error:noModule});
}

function childElements(node) {
	var c = node.childNodes, e = [];
	for (var i=0;i<c.length;i++) {
		var node = c[i];
		if (node.nodeType == 1) e.push(node);
	}
	return e;
}

function collapse(ev) {
	var e = ev.currentTarget;
	if (!$(ev.target).attr("data-stop")) $(e).next().toggle();
}

function toggle(alt, parent) {
	var e = $("img[alt='" + alt + "']").closest("p");
	(parent ? e.parent() : e).toggle();
}

function nodeText(node) {
	node = node.childNodes[0];
	return node.innerHTML ? node.innerHTML : node.textContent;
}

function nodeHtml(node) {
	var e = $("<code>").html(node.getAttribute("name"));
	var def = node.getAttribute("default");
	if (def) e.append($("<span>").addClass("Default").html(" = " + def));
	e = $("<p>").html(e);
	e.append(": ").append(nodeText(node));
	var tags = ["Arg", "Constant", "PropA", "PropR", "Class", "Method", "Function"];
	var n = tags.indexOf(node.tagName);
	var cNodes = childElements(node);
	if (n > 0) {
		e.prepend($("<img>").addClass("Icon").attr({alt:tags[n], src:"img/" + tags[n].toLowerCase() + ".png"}));
	}
	if (cNodes.length) {
		var div = $("<div>").addClass("Collapse");
		for (var j=0;j<cNodes.length;j++) if (cNodes[j] != node.childNodes[0])
			div.append(nodeHtml(cNodes[j]));
		e = $("<div>").append(e.addClass("Hanging").click(collapse).attr({title:"Click to exapnd or collapse"}));
		e.append(div).find("div.Collapse").hide();
	}
	return e;
}

function moduleHtml(doc, e) {
	var nodes = doc.childNodes;
	for (var i=0;i<nodes.length;i++) {
		var node = nodes[i];
		if (node.nodeType == 1) e.append(nodeHtml(node));
	}
}

function loadRef(data) {
	data = data.documentElement;
	var e = $("#ModuleHtml").html("");
	moduleHtml(data, e);
	show("Module");
	$("#ModuleName").html(data.getAttribute("name"));
}

function noModule() {
	alert("Under Construction [" + this.url.replace(".xml","").replace("ref/","") + "]");
}

function tutorial() {
	if (!window.tutInfo) $.ajax({url: "tut/index.json", dataType:"json", success:loadTutJson});
	else show("Tutorial");
}

function loadTutJson(data) {
	tutInfo = data;
	data.html = $("<div>"); //.html("Home!!");
	data.seq = [];
	seqAppend(data, $(data.html));
	goTut(data.seq[0]);
}

function seqAppend(node, htmlParent) {
	var id = node.id, div = htmlParent;
	tutInfo.seq.push(id);
	var span = $("<span>").html(node.title);
	if (node != tutInfo) {
		span.addClass("Link").attr({onclick:"goTut('" + id + "')"});
		div = $("<div>").addClass("Collapse").append(span);
		htmlParent.append(div);
	}
	if (node.pages) for (var i=0;i<node.pages.length;i++) {
		var p = node.pages[i];
		seqAppend(p, div);
		p.parent = node;
	}
}

function findNode(node, id) {
	if (node.id == id) return node;
	var pg = node.pages;
	if (pg) for (var i=0;i<pg.length;i++) {
		var n = findNode(pg[i], id);
		if (n) return n;
	}
}

function nodePath(node) {
	var p = [node];
	while (node.parent) {
		node = node.parent;
		p.push(node);
	}
	p.reverse();
	return p;
}

function goTutNext(n) {
	if (n == null) n = 1;
	n += tutInfo.current;
	var size = tutInfo.seq.length;
	while (n < 0) n += size;
	while (n >= size) n -= size;
	goTut(tutInfo.seq[n]);
}

function goTut(id) {
	var node = findNode(tutInfo, id);
	if (node) {
		tutInfo.current = tutInfo.seq.indexOf(id);
		tutInfo.currentNode = node;
		if (node.html) loadTut(node.html);
		else $.ajax({url: "tut/" + id.toLowerCase() + ".htm", dataType:"html", success:loadTut});
	}
}

function loadTut(data) {
	$("#TutorHtml").html(data);
	var e = $("#TutorPath");
	e.html(""); //e.children()[0]).append("&nbsp;");
	var p = nodePath(tutInfo.currentNode);
	for (var i=0;i<p.length;i++) {
		var span = $("<span>").html(p[i].title);
		if (i < p.length - 1) span.addClass("Link").attr("data-id", p[i].id);
		if (i) e.append(" / ");
		e.append(span);
	}
	e.find("span[data-id]").click(clickPath);
	show("Tutorial");
}

function clickPath(ev) {
	var id = $(ev.currentTarget).attr("data-id");
	goTut(id);
}

function hideNav(hide) {
	var show = hide == false;
	var n = -15, c = 2;
	var h = $("nav").children();
	if (show) {
		n = 0;
		c = 17;
		h.show();
	}
	else h.hide();
	h = $("nav").css({left:n + "em"}).attr({title: (show ? "" : "Show Navigation Panel")});
	$("#Content").css({"margin-left":c + "em"});
	if (show) h.removeClass("Link");
	else h.addClass("Link");
}

function navClick(ev) {
	if (!(ev.target === $("#HideNav")[0])) hideNav(false);
}

$(function() {
	setTimeout(nextScreen, 8000);
	onresize();
	show("Overview");
	$("nav p.Link").click(show);
	$("nav").click(navClick);
	var query = parseQuery();
	if (query.module) goRef(query.module);
	else if (query.show) show(query.show);
})

window.onresize = function() {
	$("nav").height($(window).height());
}
