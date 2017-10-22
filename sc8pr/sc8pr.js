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

SiteNode.prototype.fullUrl = function() {
	var u = this.url;
	return u.slice(0, 4) == "http" ? u : url.base + u + ".html";
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
		var a = $("<a>").html(p[i].name);
		if (i < p.length - 1) a.attr("href", p[i].fullUrl());
		else a.addClass("Current");
		e.append(a);
	}
}

SiteNode.prototype.setLinks = function() {
	var e = $("#Links");
	var c = this.children;
	for (var i=0;i<c.length;i++) {
		var a = $("<a>").attr("href", c[i].fullUrl()).html(c[i].name);
		e.append($("<li>").append(a));
	}
}

function url() {
	var split = "/sc8pr/";
	var loc = location.pathname;
	var path = loc.split(split);
	fn = path[path.length-1];
	url.base = loc.slice(0, loc.length - fn.length);
	fn = fn.split(".")[0];
	return fn.length ? fn : "index";
}

function depth() {
	var u = url(), n = 0;
	for (var i=0;i<u.length;i++)
		if (u.charAt(i) == "/") n++;
	return n;
}

function goNext() {
	var n = node.next();
	if (n) location.href = n.fullUrl();
}

function clipCopy(e) {
	var c = $("textarea.Clip");
	c.removeClass("Clip").html($(e).text()).select();
	document.execCommand('copy');
	c.addClass("Clip");
}

var node = new SiteNode(["sc8pr Home", "index", [
	["Installation Guide", "inst"],
	["Tutorial", "tut/tut", [
		["Creating a Sketch", "tut/sk", [
			["The setup Function", "tut/setup"],
			["Adding Graphics", "tut/gr"],
			["Animations", "tut/anim"],
		]],
		["Event Handling", "tut/ev", [
			["ondraw Handlers", "tut/draw"],
			["onclick Handlers", "tut/click"],
//			["More Mouse Events", "tut/mouse"],
			["Supported Events", "tut/evList"],
		]],
		["Object-Oriented Style", "tut/oop"],
		["Sprites", "tut/sprite"],
	]],
	["Reference", "ref/ref", [
		["sc8pr", "ref/init", [
			["BaseSprite", "ref/base"],
			["Canvas", "ref/canvas"],
			["Graphic", "ref/graphic"],
			["Image", "ref/image"],
			["Renderable", "ref/render"],
			["Sketch", "ref/sketch"]
		]],
/*		["sc8pr.geom", "ref/geom", []],
		["sc8pr.gui.*", "ref/gui", []],
		["sc8pr.misc.*", "ref/misc", []],
		["sc8pr.shape", "ref/shape", []],
		["sc8pr.sprite", "ref/sprite", []],
		["sc8pr.text", "ref/text", []], */
		["sc8pr.util", "ref/util", []],
	]],
	["sc8pr on GitHub", "https://github.com/dmaccarthy/sc8pr"]
]]).find(url());

function setMetrics() {
	var h = $("#Path").outerHeight() + 8;
	$("body").css("margin-top", h + "px");
	$("article").css("margin", "8px");
//	var e = $("div.Links");
//	if (e.length) {
		if ($(window).width() < 512)
			$("div.LinkWide").removeClass("LinkWide").addClass("LinkNarrow")
		else $("div.LinkNarrow").removeClass("LinkNarrow").addClass("LinkWide")
//	}
}

window.onresize = setMetrics;

window.onload = function() {
	var e = $("<nav>").attr("id", "Path");
/*	var path = "";
	for (var i=depth();i;i--) path += "../";
	e.append($("<img>").addClass("Logo").attr({src:path+"alien.png"}));*/
	$("body").prepend(e).find("article");
	node.setPath(e);
	node.setLinks();
	setMetrics();
}
