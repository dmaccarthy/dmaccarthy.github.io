function lewis(elem, val, q) {
    let dots = ["", "&nbsp;.&nbsp;", ".&nbsp;."];
    let e = $(lewis.html);
    e.find(".E").html(`&nbsp;${elem}&nbsp;`);
    if (q) {
        let qs = q < 0 ? "&ndash;" : "+";
        q = Math.abs(q);
        e.find(".Q").html(`${q==1?"":q}${qs}`);
    }
    for (let i=0;i<4;i++) {
        let n = val ? (val > 4 - i ? 2 : 1) : 0;
        val -= n;
        e.find(`.${"LBRT"[i]}`).html(dots[n]);
    }
    return e;
}

lewis.html = `<table class="Lewis">
    <tr><td></td><td class="T"></td><td class="Q"></td></tr>
    <tr><td class="L"></td><td class="E"></td><td class="R"></td></tr>
    <tr><td></td><td class="B"></td><td></td></tr>
</table>`;
