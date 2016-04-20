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
	$(ev.currentTarget).next().toggle();
}

function toggle(alt, parent) {
	var e = $("img[alt='" + alt + "']").closest("p");
	(parent ? e.parent() : e).toggle();
}

function nodeHtml(node) {
	var e = $("<code>").html(node.getAttribute("name"));
	e = $("<p>").html(e);
	e.append(": ").append(node.childNodes[0]);
	var tags = ["Arg", "Constant", "PropA", "PropR", "Class", "Method", "Function"];
	var n = tags.indexOf(node.tagName);
	var cNodes = childElements(node);
	if (n > 0) {
		e.prepend($("<img>").addClass("Icon").attr({alt:tags[n], src:"img/" + tags[n].toLowerCase() + ".png"}));
	}
	if (n >= 4 && cNodes.length) {
		var div = $("<div>").addClass("Collapse");
		for (var j=0;j<cNodes.length;j++)
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

function noModule() {alert("Under Construction!")}

$(function() {
	setTimeout(nextScreen, 8000);
	onresize();
	show("Overview");
	$("nav p.Link").click(show);
})

window.onresize = function() {
	$("nav").height($(window).height());
}
