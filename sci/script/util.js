Number.prototype.html = function(p, latex) {
    let s = this.toPrecision(p).toLowerCase().split("e");
    let n = s[1];
    n = s[0] + (s.length > 1 ?
        (latex ? `\times 10^{${n}}` : ` × 10<sup>${n}</sup>`) : "");
    if (!latex) n = n.replace("-", "–"); // hyphen -> endash
    return n;
}

Array.prototype.sum = function() {
    let n = this.length, s = 0;
    if (n) {
        s = this[0];
        for (let i=1; i<n; i++) s += this[i];
    }
    return s;
}
    
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
    let args = {};
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

function aspect(w) {
/* Adjust height(width) of iframe/video tags to maintain aspect ratio */
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let a = eval(ei.attr("data-aspect"));
        if (w) {
            w = Math.round(ei.height() * a);
            e.css({width:w});                        
        }
        else {
            let h = Math.round(ei.width() / a);
            e.css({height:h});            
            }
    }
}

function mjTypeset() {
    if (window.MathJax) MathJax.Hub.Typeset();
}

function isAfter(due, date) {
/* Check whether a date (today) is after the specified due date */
    if (due == null) return true;
    else if (due == false) return false;
    if (date == null) date = new Date();
    if (!(due instanceof Date)) {
        due = due.split(".");
        due[1] = parseInt(due[1]) - 1;
        due = new Date(...due);
    }
    return date >= due;
}

String.random = function(n, allowNum) {
// allowNum = 1: numerals are allowed
// allowNum = 2: allowed except for first character
    let s = "";
    if (allowNum == 2) {
        s = String.random(1);
        n--;
    }
    while (n--) {
        let i = Math.floor((allowNum ? 62 : 52) * Math.random());
        i = (i < 26 ? 65 : (i < 52 ? 97 : 48)) + i % 26;
        s += String.fromCharCode(i);
    }
    return s;
}
