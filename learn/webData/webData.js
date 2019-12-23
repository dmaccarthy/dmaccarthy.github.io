/***

This script allows multiple clients to exchange JSON-formatted
data by password-protected communication with a web app.

***/


function webData(user, pw, cmd, opt) {
// Exchange JSON data with the web app
    var form = $("<form>")[0];
    var data = new FormData(form);
    data.append("user", user);
    data.append("pw", pw);
    data.append("cmd", JSON.stringify(cmd));
    let args = {
        type: "POST",
        enctype: 'multipart/form-data',
        url: webData.url,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
    };
    if (opt) Object.assign(args, opt);
    $.ajax(args);
}

// Web app location
webData.url = "https://webdata.davidmaccarthy.repl.co/";

webData.log = function(r) {
// Log the response to the console
    let j = r.responseJSON;
    console.log(j ? j : r);
}

webData.cmd = function(cmd, opt) {
// Call webData using encapsulated username/password
    if (!opt) opt = {complete:webData.log};
    webData(webData.user, webData.pw, cmd, opt);
}

// Common requests...
webData.wake = function() {$.ajax(webData.url + "wake")}
webData.set = function(arg, opt) {webData.cmd({"set":arg}, opt)};
webData.del = function(arg, opt) {webData.cmd({"del":arg}, opt)};
webData.get = function(arg, opt) {webData.cmd({"get":arg}, opt)};
webData.flush = function(arg, opt) {webData.cmd({"get":true, "del":true, "set":arg}, opt)};
