Array.prototype.extend = function(a) {this.push.apply(this, a)}

function qsArgs(key) {
    let qs = location.search.slice(1).split("&");
    args = {}
    for (let i=0;i<qs.length;i++) {
        let a = qs[i].split("=");
        args[a[0]] = decodeURIComponent(a[1]);
    }
    return key ? args[key] : args;
}

function objectInList(data, key, val) {
    for (i=0;i<data.length;i++) {
        let v = data[i][key];
        if (val != null && v == val || val == null && v != null) return data[i];
    }
}
