/***

Functions for rendering LaTex markup as
a <canvas> using MathJax and html2canvas

Dependencies...

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=default"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>

Usage...

latexCanvas("A=\\pi r^2",
    function(cv) {
        $(cv).appendTo("body");
        let img = new Image();
        img.onload = function() {console.log(this)}
        img.src = cv.toDataURL();
    },
    {fontSize:"2em", width:"5em"}
);

***/

function latexCanvas(latex, callback, css) {
    let mj = $("<div>").html("$$" + latex + "$$").appendTo("body");
    if (css) mj.css(css);
    _latexOnRender.div = mj;
    _latexOnRender.cb = callback;
    latexCanvas.init = true;
    MathJax.Hub.Typeset();
}

function _latexOnRender() {
    if (latexCanvas.init)
        html2canvas(_latexOnRender.div[0], {onrendered:function(cv) {
            _latexOnRender.div.remove();
            _latexOnRender.cb(cv);
        }});
}

MathJax.Hub.Register.MessageHook("End Math", _latexOnRender);


/*
preload.latex = function(args) {
// Pre-render LaTeX equations
    let k;
    for (k in args) {
        let data = args[k], css = {};
        Object.assign(css, preload.latexCSS);
        if (data instanceof Array) {
            Object.assign(css, data[1]);
            data = data[0];
        }
        latexCanvas(data, function(cv) {
            let img = new Image();
            img.src = cv.toDataURL();
            preload.data[k] = img;
        }, css);
    }
}

preload.latexCSS = {fontSize:"1.5em", width:"6em"};
*/