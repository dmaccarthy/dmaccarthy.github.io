function availDate(d) {
    let a = d.split(".");
    if (a.length > 3) {
        d = `${a[0]}.${a[1]}.${a[2]} @ ${a[3]}`;
        d += a.length > 4 ? `:${a[4]}` : ":00";
    }
    return d;
}

function available(d) {
    return qsArgs("tp") == atob("UzBoaWJrZGlTMlJhU0hKUg==") || isAfter(d);
}

function countQ(i) {
    let d = chap[i].dates, n = 0;
    if (d) {
        for (let j=0;j<d.length;j++) 
            if (available(d[j][0])) n += d[j][1];
    }
    return n;
}
    
function init() {
    document.title = title;
    $("#Title").html(title);
    let s = $("#Chapter")[0];
    s.options.length = 0;
    for (let i=0;i<chap.length;i++) {
        let n = countQ(i);
        if (n) {
            s.options.length++;
            s.options[i].text = chap[i].title;   
            s.options[i].value = n;
        }
    }
    let n = qsArgs("chap");
    if (n) {
        n = parseInt(n);
        if (n > 0 && n < s.options.length) {
            s.selectedIndex = n;
        }
    }
    drawSelect();
}

function drawSelect() {
    let s = $("#Chapter")[0];
    let i = s.selectedIndex;
    let n = s.options[i].value;
    s = $("#Question").val(1).attr({max:n});
    goQuestion(s);
}

function ajaxDone(html) {
    $("#Answer").html(html);
    mjTypeset();
}

function goQuestion(q) {
    $("#Answer").html("");
    let i = $("#Chapter")[0].selectedIndex;
    let url = `soln/${chap[i].dir}/q${$(q).val()}.htm`;
    $.ajax({url:url, success:ajaxDone});
};

$(init);
