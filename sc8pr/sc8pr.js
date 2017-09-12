function SiteNode(data, parent) {
	this.name = data[0];
	this.url = data[1];
	this.parent = parent;
	this.children = [];
	if (data.length > 2) {
		data = data[2];
		for (var i=0;i<data.length;i++) {
			var c = data[i];
			this.children.push(new SiteNode(c, this));
		}
	}
}

SiteNode.prototype.path = function() {
	var p = this.parent;
	p = p ? p.path() : [];
	p.push(this);
	return p;
}

SiteNode.prototype.nextSib = function() {
	var p = this.parent;
	if (p) {
		var c = p.children;
		var i = c.indexOf(this);
		if (i < c.length - 1) return c[i+1];
		return p.nextSib();
	}
}

SiteNode.prototype.next = function() {
	var c = this.children;
	if (c.length) return c[0];
	return this.nextSib();
}

SiteNode.prototype.find = function(id) {
	var n = this;
	while (n) {
		if (n.url == id) return n;
		n = n.next();
	}
}

SiteNode.prototype.setPath = function(e) {
	var p = this.path();
	for (var i=0;i<p.length;i++) {
		if (i) e.append(" / ");
		var span = $("<span>").html(p[i].name);
		if (i < p.length - 1) span.attr("data-n", i);
		else span.addClass("Current");
		e.append(span);
	}
}

SiteNode.prototype.setLinks = function() {
	var e = $("#Links");
	var c = this.children;
	for (var i=0;i<c.length;i++) {
		var a = $("<a>").attr("href", c[i].url + ".html").html(c[i].name);
		e.append($("<li>").append(a));
	}
}

function url() {
	var split = "/sc8pr/";
	var path = location.pathname.split(split);
	url.base = path[0] + split;
	path = path[1].split(".")[0];
	return path.length ? path : "index";
}

var node = new SiteNode(["sc8pr Home", "index", [
	["Installation Guide", "inst"],
	["Tutorial", "tut/tut", [
		["Sketch", "tut/sk", []],
		["setup", "tut/setup", []],
	]],
	["Reference", "ref/ref", [
		["sc8pr.__init__", "ref/init", []],
		["sc8pr.text", "ref/text", []],
	]]
]]).find(url());

function setMetrics() {
	var h = $("#Path").outerHeight() + 8;
	$("body").css("margin-top", h + "px");
	$("article").css("margin", "8px");
}

function navClick(ev) {
	var n = $(ev.target).attr("data-n");
	if (n!= null) location.href = url.base + node.path()[n].url + ".html";
}

window.onresize = setMetrics;

window.onload = function() {
	var e = $("<nav>").attr("id", "Path").click(navClick);
	$("body").prepend(e).find("article");
	node.setPath(e);
	node.setLinks();
	setMetrics();
}
