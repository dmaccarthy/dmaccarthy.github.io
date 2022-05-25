Array.prototype.extend = function(a) {
    this.push.apply(this, a);
    return this;
}

Array.prototype.remove = function(val, removeAll) {
    let loop = true;
    while (loop) {
        let i = this.indexOf(val);
        if (i >= 0) this.splice(i, 1);
        if ((i == -1) || (!removeAll)) loop = false;
    }
    return this;
}

function qsArgs(key, str) {
    if (str == null) str = location.search;
    let qs = str.split("?")[1];
    if (qs == null) return key ? null : {};
    qs = qs.split("&");
    args = {}
    for (let i=0;i<qs.length;i++) {
        let a = qs[i].split("=");
        args[a[0]] = decodeURIComponent(a[1]);
    }
    return key ? args[key] : args;
}

function makeURL(path, search, hash) {
    if (path == true) path = location.pathname;
    if (search == null) search = {};
    else if (search == true) search = qsArgs();
    let s = "";
    for (let k in search) {
        if (s.length) s += "&";
        else s = "?";
        s += `${encodeURIComponent(k)}=${encodeURIComponent(search[k])}`;
    }
    hash = hash === true ? location.hash : (hash ? "#" + hash : "");
    return `${path}${s}${hash}`.replace("//", "/");
}

function objectInList(data, key, val) {
    for (i=0;i<data.length;i++) {
        let v = data[i][key];
        if (val != null && v == val || val == null && v != null) return data[i];
    }
}

function aspect() {
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let a = eval(ei.attr("data-aspect"));
        let h = Math.round(ei.width() / a);
        e.css({height:h});
    }
}
