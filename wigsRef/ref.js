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
	$("article[id]").hide();
	$("#" + id).show();
}

function goRef(id) {
	$.ajax({url: id + ".xml", dataType:"xml", success:loadRef, error:noModule});
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
	return node.outerHTML ? node.outerHTML : node.textContent;
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
	alert("Under Construction [" + this.url.replace(".xml","") + "]");
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
