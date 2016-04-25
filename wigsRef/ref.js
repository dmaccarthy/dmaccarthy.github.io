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
		var qs;
		if (id == "Tutorial") qs = "?tutorial=" + tutInfo.currentNode.id;
		else qs = "?show=" + id;
		history.replaceState(null, id, location.href.split("?")[0] + qs);
	}
}

function goRef(id, attr) {
	goRef.attr = attr;
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

function toggle(n) {
	showAll();
	showAll(true);
	$("[data-type]").hide();
	$("[data-type=" + n + "]").show();
}

function showAll(top) {
	$("#ModuleHtml div").show();
	var e = $("#ModuleHtml div.Collapse");
	if (top) e.hide();
	else e.show();
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
	e.find("[onclick]").attr("data-stop", 1);
	var tags = ["Class", "Function", "Constant", "PropA", "PropR", "Method", "Arg"];
	var n = tags.indexOf(node.tagName);
	var cNodes = childElements(node);
	if (n < tags.length-1)
		e.prepend($("<img>").addClass("Icon").attr({alt:tags[n], src:"img/" + tags[n].toLowerCase() + ".png"}));
	var div = $("<div>").addClass("Collapse");
	for (var j=0;j<cNodes.length;j++) if (cNodes[j] != node.childNodes[0])
		div.append(nodeHtml(cNodes[j]));
	e = $("<div>").append(e.addClass("Hanging").click(collapse).attr({title:"Click to exapnd or collapse"}));
	if (n<3) e.attr("data-type", n);
	e.append(div).find("div.Collapse").hide();
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
	var name = data.getAttribute("name");
	$("#ModuleName").html(name);
	history.replaceState(null, name, location.href.split("?")[0] + "?module=" + name);
	if (goRef.attr) {
		showModuleAttr(goRef.attr);
		delete goRef.attr;
	};
}

function findModuleAttr(id, e) {
	if (e == null) e = $("#ModuleHtml");
	e = e.find("div.Collapse");
	var ids = id.split(".");
	for (var i=0;i<e.length;i++) {
		var cur = $(e[i]);
		var node = cur.parent().find("p:first code:first");
		var text = node.html().split("(")[0].split(":")[0].split("<")[0].split(" ")[0].split("=")[0];
		if (text == ids[0]) {
			return ids.length == 1 ? cur : findModuleAttr(id.slice(text.length + 1), cur);			
		}
	}
}

function showModuleAttr(id) {
	var e = findModuleAttr(id);
	$("#ModuleHtml div").hide();
	e.parents().show();
	e.find("*").show();
	console.log(e)
}

function refFilter(id, e) {
	if (e == null) e = $("#ModuleHtml").children("div").children("div.Collapse");
	for (var i=0;i<e.length;i++) {
		var node = $(e[i]).parent();
		var text = node.find("p:first code:first").html();
		text = text.split("(")[0].split(":")[0].split("<")[0].split(" ")[0].split("=")[0];
		console.log(text, node, e[i]);
		if (text == id) node.show();
		else node.hide();
	}
}

function noModule() {
	alert("Under Construction [" + this.url.replace(".xml","").replace("ref/","") + "]");
}

function tutorial(id) {
	if (!window.tutInfo) {
		$.ajax({url: "tut/index.json", dataType:"json", success:loadTutJson});
		tutorial.id = id;
	}
	else {
		show("Tutorial");
		if (id) goTut(id);
	}
}

function loadTutJson(data) {
	tutInfo = data;
	var div = $("<div>").append($("<p>").html("This tutorial is intended for programmers who are already familiar Python. A tutorial for new Python programmers is planned for the near future."));;
	data.html = $("<div>").append(div);
	data.seq = [];
	seqAppend(data, $(div));
	id = data.seq[0];
	if (tutorial.id) {
		id = tutorial.id;
		delete tutorial.id;
	}
	goTut(id);
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
		history.replaceState(null, node.title, location.href.split("?")[0] + "?tutorial=" + id);
	}
}

function loadTut(data) {
	$("#TutorHtml").html(data);
	var e = $("#TutorPath");
	e.html("");
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
	$("nav p.Link").click(show);
	$("nav").click(navClick);
	goQuery(parseQuery());
})


function goQuery(query) {
	if (query.module) goRef(query.module);
	else if (query.tutorial) tutorial(query.tutorial);
	else if (query.show) show(query.show);
	else show("Overview");	
}

window.onresize = function() {
	$("nav").height($(window).height());
}
