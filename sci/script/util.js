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

function aspect(w) { // Requires jQuery [code.jquery.com/jquery-3.7.1.min.js]
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
    if (window.MathJax) {
        let err;
        try {MathJax.typeset()}
        catch (err) {
            console.log(err);
            MathJax.Hub.Typeset();
        }
    }
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


class BData { // Requires jQuery [code.jquery.com/jquery-3.7.1.min.js]

/** Convert data to a Blob for downloading as a file or opening in a browser window.

static BData.text(data, filename) --> bdata (instance of BData)...
    Converts data to a Blob. If data is a string, the MIME type will default to "text/plain".

    If data is an object with a tagName attribute, it is assumed to be an HTML DOM element.
    * The data type will be "image/png" for CANVAS tags.
    * Non-canvas tags will be converted to strings using the outerHTML attribute.
    * Default type will be "image/svg+xml" for SVG tags and "text/html" for others.

    If data is a non-string object without a tagName, it will be converted using JSON.stringify;
    the default type will be "application/json". An exception is thrown if the object cannot be
    converted to a JSON string.

    The filename argument specifies a file name to use when saving the data. The file extension
    overrides the default MIME type; for example, a filename "data.csv" will result in a Blob
    with type "text/csv" rather than "text/plain". If the data is not intended to be saved as a
    file, you can pass just the extension ("csv").

static find(selector, filename) --> bdata...
    This function uses jQuery to find the first match to the selector and then passes the
    element to BData.text. Throws an exception if no matching elements are found.

bdata.open() --> bdata...
    Opens the blob in a new browser window or tab. The BData instance has an array attribute
    called windows. The new window in which the data is displayed will be prepended to the array.
    For canvas data, the conversion to PNG is asynchronous and the array entry will be null
    until the new window is actually opened.

bdata.save(filename) --> bdata...
    Saves the blob data as a downloaded file. The filename can be omitted if a filename was
    already specified when the BData instance was created. Some browsers may change the file
    name; for example, if the requested file extension does not match the MIME type of the data.

bdata.blob...     The data as a Blob instance.
bdata.filename... The filename (if any) associated with the data.
bdata.windows...  An array of browser windows created by the open method.

Examples...

BData.text("Hello, world!", "hi.txt").open().save();
BData.text([1, 2, 3]).open();

BData.text("1, 2, 3", "num.csv").save();
BData.text([1, 2, 3], "num.json").save();

BData.find("#FooBar").open();
BData.find("body").save("body.html");
BData.find("canvas").save("drawing.png");
BData.find("svg", "drawing.svg").save();

**/

    constructor(data, type) {
        this.windows = [];
        if (type) {
            let t = type.split(".");
            if (t.length > 1) {
                this.filename = type;
                type = t[t.length - 1].toLowerCase();
            }
        }
        if (data.tagName) {
            let t = data.tagName.toUpperCase();
            if (t == "CANVAS") {
                let bd = this;
                data.toBlob(function(b) {bd.blob = b});
                return;
            }
            if (!type) type = t == "SVG" ? "svg" : "html";
            data = data.outerHTML;
        }
        else if (typeof(data) != "string") {
            data = JSON.stringify(data);
            if (!type) type = "json";
        }
        type = {
            html: "text/html",
            htm: "text/html",
            js: "text/javascript",
            xml: "text/xml",
            svg: "image/svg+xml",
            json: "application/json",
            csv: "text/csv",
            py: "text/x-python"
        }[type];
        this.blob = new Blob([data], {type:type ? type : "text/plain"});
    }

    save(filename) {
        if (this.blob) {
            let url = URL.createObjectURL(this.blob);
            if (!filename) filename = this.filename;
            $("<a>").attr({href: url, download: filename})[0].click();       
        }
        else {
            let b = this;
            setTimeout(function() {b.save(filename)}, 25);
        }
        return this;
    }

    _open() {
        if (this.blob)
            this.windows[0] = window.open(URL.createObjectURL(this.blob));
        else {
            let b = this;
            setTimeout(function() {b._open()}, 25);
        }
    }

    open() {
        this.windows.splice(0, 0, null);
        this._open();
        return this;
    }

    static text(data, filename) {return new BData(data, filename)}
    static find(selector, filename) {return new BData($(selector)[0], filename)}
}
