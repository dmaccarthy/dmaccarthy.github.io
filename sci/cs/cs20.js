let cs20 = {title:"Computing Science 20", text:"CS 20", id:"cs20", menu:[
    {title:"Procedural Programming 1", id:"pp1", menu:[
        {title:"Functions", id:"def"},
        {title:"Variable Scope", id:"scope"},
        {title:"Top-Down Design", id:"top"},
        {title:"Pre- & Post-Conditions", id:"pre"},
        {title:"Exception Handling", id:"try"},
    ]},
    {title:"Game Programming Project", id:"game", icon:"sc8pr", menu:[
        {title:"Sketchs & Sprites", id:"s8"},
        {title:"Customizing the Animation", id:"s8custom"},
        {title:"Text in Animations", id:"s8text"},
        {title:"Keyboard Events", id:"s8key"},
        {title:"Mouse Events", id:"s8mouse"},
    ]},
    {title:"Data Structures", id:"ds", menu:[
        {title:"Tuples & Lists", id:"tuple"},
        {title:"Iteration", id:"iteration"},
        {title:"Dictionaries & Sets", id:"dict"},
        {title:"Positional & Keyword Arguments", id:"kwargs"},
        {title:"List Comprehensions", id:"list_comp"},
        {title:"Generator Functions", id:"gen"},
        {title:"Arrays", id:"array"},        
    ]},
]};

layout.cs20 = [{icons:[
    {icon:"today", text:"Brightspace", url:"https://eips.brightspace.com/d2l/home/63493"},
]}, 0, {html:"After finishing the <i>Data Structures</i> credit, complete two additional credits under <a href='#web'>Web Scripting</a>, or if you already completed these in CS 10, work ahead into <a href='#cs30'>CS 30</a>."}];

// Procedural Programming 1

layout.pp1 = [{icons:[
    {text:"repl.it Project", url:"https://replit.com/@DavidMacCarthy/CS20"},
]}, 0];

layout.def = [{ajax:"pp/func.html"}, 1];
layout.scope = [{ajax:"pp/scope.html"}, 1];
layout.top = [{ajax:"pp/top.html"}, 1];
layout.pre = [{ajax:"pp/pre.html"}, 1];
layout.try = [{ajax:"pp/except.html"}, 1];

// Game Programming Prject

layout.game = [{icons:[
    {text:"repl.it Project", url:"https://replit.com/@DavidMacCarthy/Game"},
]}, 0];

layout.s8 = [{ajax:"game/sketch.html"}, 1];
layout.s8custom = [{ajax:"game/custom.html"}, 1];
layout.s8text = [{ajax:"game/text.html"}, 1];
layout.s8key = [{ajax:"game/key.html"}, 1];
layout.s8mouse = [{ajax:"game/mouse.html"}, 1];

// Data Structures 1

layout.tuple = [{ajax:"ds/list.html"}, 1];
layout.iteration = [{ajax:"ds/iter.html"}, 1];
layout.dict = [{ajax:"ds/dict.html"}, 1];
layout.kwargs = [{ajax:"ds/args.html"}, 1];
layout.list_comp = [{ajax:"ds/comp.html"}, 1];
layout.gen = [{ajax:"ds/gen.html"}, 1];
layout.array = [{ajax:"ds/array.html"}, 1];

// Client-Side Scripting 1

layout.web1 = [{icons:[
    {text:"repl.it Project", show:"2023.1", url:"https://replit.com/@DavidMacCarthy/Web1"},
]}, 0];

layout.www = [{vid:"#PLpVmtCaB-lymr5oyB7BWvxEnddOou05Nf"}, {ajax:"web1/www.html"}, 1];
layout.tree = [{ajax:"web1/tree.html"}, 1];
layout.xml = [{ajax:"web1/xml.html"}, 1];
layout.text = [{ajax:"web1/text.html"}, 1];
layout.entity = [{ajax:"web1/entity.html"}, 1];
layout.html = [{ajax:"web1/html5.html"}, 1];
layout.char = [{ajax:"web1/char.html"}, 1];
layout.img = [{ajax:"web1/img.html"}, 1];
layout.table = [{ajax:"web1/table.html"}, 1];

// Client-Side Scripting 2

layout.form = [{ajax:"web2/form.html"}, 1];
layout.style = [{ajax:"web2/style.html"}, 1];
layout.ext = [{ajax:"web2/ext.html"}, 1];
layout.div = [{ajax:"web2/div.html"}, 1];
layout.js = [{ajax:"web2/js.html"}, 1];

layout.web3 = [{icons:[
    // {text:"repl.it Project", show:"2023.1", url:"https://replit.com/@DavidMacCarthy/Web3"},
]}, uc, 0];
