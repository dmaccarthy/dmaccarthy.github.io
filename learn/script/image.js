function preload() {
// Preload images
    for (let i=0;i<arguments.length;i++) {
        let a = arguments[i];
        let img = new Image();
        img.src = linkURL(a);
        preload.data[a] = img;
    }
}

preload.data = {}

preload.get = function(id) {
// Retreive a preloaded image
    let k;
    for (k in preload.data) {
        let v = k.split("/");
        if (id == k || id == v[v.length-1].split(".")[0])
            return preload.data[k];
    }
}

function latexPreload() {
    let eqs = $("#LaTeX-Preload > [data-key]");
    latexPreload.waiting = eqs.length;
    for (let i=0;i<eqs.length;i++) {
        let eq = eqs[i];
        html2canvas(eq, {onrendered:function(cv) {
            let img = new Image();
            preload.data[eq.getAttribute("data-key")] = img;
            if (latexPreload.onload) img.onload = function() {
                latexPreload.waiting -= 1;
                if (latexPreload.waiting == 0) {
                    $("#LaTeX-Preload").remove();
                    latexPreload.onload();
                }
            }
            img.src = cv.toDataURL();
        }});
    }
}

if (window.MathJax) MathJax.Hub.Register.MessageHook("End Math", latexPreload);
