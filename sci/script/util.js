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


/*** 

Functions for downloading data as files or opening data in a browser window.

saveText("Hello, world!", {download: "hello.txt"})
saveText("Hello, world!", {filetype: "txt", target: true})
saveText("[1, 2, 3, 4]", {filetype: "json", target: true})

saveElem("body", {download: "body.html"})
saveElem("#SVG", {download: "drawing.svg"})
saveElem("#SVG", {filetype: "svg", target: true})

saveCanvas("#Canvas", {download: "drawing.png"})
saveCanvas("#Canvas", {target: true})

***/


function saveBlob(b, options) {
// Options...
//   download: File name to save
//   target: Browser window name to open blob data
    let url = URL.createObjectURL(b);
    let attr = {href: url};
    Object.assign(attr, options);
    let a = $("<a>").attr(attr);
    a[0].click();
    return attr.target;
}

function saveText(data, options) {
// Options...
//   download: File name to save
//   target: Browser window name
//   filetype: One of the saveText.types keys
    options = saveText.options(options);
    let ftype = saveText.types[options.filetype];
    if (!ftype && options.download) {
        let ftype = options.download.split(".");
        ftype = saveText.types[ftype[ftype.length - 1]];
    }
    if (!ftype) ftype = "text/plain"; 
    return saveBlob(new Blob([data], {type:ftype}), options);
}

saveText.options = function(options) {
/* Pick a random target name when options.target === true */
    let attr = Object.assign({}, options);
    if (options.target === true) {
        attr.target = String.random(12);
    }
    return attr;
}

saveText.types = {
    html: "text/html",
    htm: "text/html",
    js: "text/javascript",
    xml: "text/xml",
    svg: "image/svg+xml",
    json: "application/json",
    csv: "text/csv",
    py: "text/x-python"
}

function saveElem(sel, options) {
/* Download file or open browser tab containing element outerHTML */
    return saveText($(sel)[0].outerHTML, options);
}

function saveCanvas(cv, options) {
/* Save or open a canvas as a PNG image */
    let attr = saveText.options(options);
    $(cv)[0].toBlob(function(b) {
        saveBlob(b, attr);
    })
    return attr.target;
}
