function connect_remote() {
// Connect to web app for remote control
    let l = atob(localStorage.getItem("remote_login")).split("#");
    webData.user = l[0];
    webData.pw = l[1];
    remote.active = new Date();
    remote({success:function() {
        webData.ok = true;
        console.log("Listening for remote");
    }, error:function() {
        clearTimeout(remote.timeout);
    }});
}

function remote(cb) {
// Look for remote comands
    webData.flush({}, cb ? cb : remote.complete);
    clearTimeout(remote.timeout);
    if (new Date() - remote.active < remote.sleepTime * 60000) {
        remote.timeout = setTimeout(remote, 250);
        remote.status = true;
    }
    else if (remote.status) remote.toggle();
}

remote.sleepTime = 10;

remote.wake = function() {
    remote.active = new Date();
    remote({});
    remote.status = true;
    console.log("Remote is awake.");
}

remote.pause = function() {
    clearTimeout(remote.timeout);
    remote.status = false;
    console.log("Remote is sleeping.");
}

remote.complete = {
// Perform remote command (AJAX callback)
    success:function(r) {
        if (r && Object.keys(r).length) {
            remote.active = new Date();
            if (r.code == "ArrowRight") advance();
            else if (r.code == "ArrowLeft") advance(-1);
            else if (r.key == "+" || r.key == "-") console.log("Zoom");
            // else if (r.zoom) zoom(r.zoom);
            else if (r.slide) slide(r.slide - 1, 0);
            else if (r.link == 0) $("body")[0].click();
            else if (r.link) {
                let v = visibleLinks(), err;
                try {v[r.link - 1].click()}
                catch(err) {}
            }
        }
    },
    error:function() {console.log(arguments)}
}

remote.toggle = function() {
    if (!webData.ok) connect_remote();
    else if (remote.status) remote.pause();
    else remote.wake();
    $("tr[title='Remote'] td")[1].innerHTML = "Remote: " + (remote.status ? "ON" : "OFF");
}

function visibleLinks() {
    let e = $(".SlideShow *:visible");
    let v = [];
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        if (ei.is("a") || ei.is("[onclick]")) v.push(ei[0]);
    }
    return v;
}
