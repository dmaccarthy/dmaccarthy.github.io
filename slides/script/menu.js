function Menu(data, sep) {
    // Render menu as UL element
    let ul = $("<ul>").addClass("Menu");
    ul[0].menu = this;
    for (let i=0;i<data.length;i++) {
        let obj = data[i];
        let li = $("<li>").html(obj.title).appendTo(ul).click(function(ev) {
            this.menu.onclick(ev, this);
        });
        if (obj.css) li.addClass(obj.css);
        if (obj.rightText) li.append($("<span>").html(obj.rightText).css({float:"right"}));
        if (obj.icon) li.css("background-image", `url(${obj.icon})`);
        Object.assign(li[0], {node:obj, menu:this, ul:ul});
    }

    // Add separators
    if (sep) for (let i=0;i<sep.length;i++)
        $("<hr>").insertBefore($(ul.find("li")[sep[i]]));

    // Align spans to right
    this.ul = ul.appendTo($("body"));
    let items = ul.find("li");
    let w = ul.width();
    for (let i=0;i<items.length;i++) {
        let li = $(items[i]);
        let s = li.find("span");
        if (s.length) {
            let x = w - li.width() - parseInt(li.css("padding-left"));
            s.css({left:x - 8});
        }
    };
    ul.hide();
}

Menu.prototype.hide = function() {this.ul.slideUp(); return this}
Menu.prototype.show = function() {Menu.showOnly(this); return this}

Menu.prototype.toggle = function() {
    let ul = this.ul;
    if (ul.is(":visible")) this.hide();
    else this.show();
    return this;
}

Menu.showOnly = function(menu, toggle) {
    if (toggle == 2 && $("ul.Menu:visible").length > 0) menu = null;
    let m = $("ul.Menu");
    for (let i=0;i<m.length;i++) {
        let item = $(m[i]);
        if (i == menu || m[i].menu == menu) {
            if (toggle) item.slideToggle();
            else item.slideDown();
        }
        else item.slideUp();
    }
}

Menu.position = function(top) {
    let ul = $("ul.Menu");
    for (let i=0;i<ul.length;i++) $(ul[i]).css({top:top+"px"});
}


function Toolbar(data, css) {
    let nav = $("<nav>").addClass("Toolbar");
    nav[0].toolbar = this;
    for (let i=0;i<data.length;i++) {
        let obj = data[i];
        let html = obj.html;
        if (html) {
            if (typeof(html) == "string") html = $("<button>").html(html);
            else html = $(html);
        }
        else html = $("<img>").attr({src:obj.src});
        html.attr({title:obj.title}).appendTo(nav).click(function(ev) {
            this.toolbar.onclick(ev, this);
        });
        Object.assign(html[0], {node:obj, toolbar:this, nav:nav});
    }
    this.nav = nav;
    if (css) {
        this.css = css;
        this.margin = parseFloat($("body").css(css));
    }
}

Toolbar.prototype.onclick = Menu.prototype.onclick = function(event, item) {
    let _tb = item.menu == null;
    if (!_tb) item.menu.hide();
    let _node = item.node;
    if (_node.href) location.href = _node.href;
    if (_node.open) window.open(_node.open);
    if (_node.onclick) {
        let _js = _node.onclick;
        if (typeof(_js) == "string") eval(_js);
        else _js.apply(this, arguments);
    }
}

Toolbar.prototype.hide = function() {
    this.nav.closest("div").fadeOut();
    if (this.css) $("body").css(this.css, this.margin);
    return this;
}

Toolbar.prototype.show = function() {
    let nav = this.nav;
    nav.closest("div").fadeIn();
    if (this.css) $("body").css(this.css, parseInt(nav.height()) + this.margin);
    return this;
}

Toolbar.prototype.visible = function() {
    let div = this.nav.closest("div");
    return div.is(":visible");
}

Toolbar.prototype.toggle = function() {
    if (this.visible()) this.hide();
    else this.show();
    return this;
}

function smallScreen() {
    let w = $(window);
    return Math.min(w.width(), w.height()) < 480;
}
