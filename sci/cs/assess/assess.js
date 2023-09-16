function showOld() {
    $("section[data-date]").show();
    $("#Old").remove();
}

function init() {
    let s = $("section[data-date]");
    let n = -1;
    for (let i=0;i<s.length;i++) {
        let si = $(s[i]);
        let due = si.attr("data-date");
        si.find("h3").prepend(`[${due.split("-")[0]}]<br/>`);
        if (isAfter(due.replace("-", "."))) n = i;
    }
    for (let i=n+1;i<s.length;i++) $(s[i]).remove();
    if (n >= 0) {
        $(s[n]).show();
        if (n == 0) $("#Old").remove();
    }
    else {
        $("#Old").addClass("NoAssess").html("There are no assessments yet!");
        $("#Instructions").remove();
    }
    s = $("div[data-htm]");
    for (i=0;i<s.length;i++) {
        let si = $(s[i]);
        let f = function(e, s) {
            if (s == "success") {
                $(e.responseText).insertBefore(si);
                si.remove();
                setTimeout(function() {MathJax.Hub.Typeset()}, 500);
            }
            else console.log(e);
        }
        published(si.attr("data-htm"), {complete: f});
    }
}

$(init);
