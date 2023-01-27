let web = {title:"Web Scripting", id:"web", icon:"html5", menu:[
    {title:"Client-Side Scripting 1", id:"web1", icon:"html5", menu:[
        {title:"Internet & World Wide Web", id:"www"},
        {title:"Data Trees", id:"tree"},
        {title:"eXtensible Markup Language (XML)", id:"xml"},
        {title:"Text & Comment Nodes", id:"text"},
        {title:"Entities", id:"entity"},
        {title:"Hypertext Markup Language (HTML)", id:"html"},
        {title:"Character Formatting", id:"char"},
        {title:"Images & Video", id:"img"},
        {title:"Lists & Tables", id:"table"},
    ]},
    {title:"Client-Side Scripting 2", id:"web2", icon:"html5", menu:[
        {title:"Forms", id:"form"},
        {title:"Stylesheets (CSS)", id:"style"},
        {title:"External Stylesheets", id:"ext"},
        {title:"Document Divisions", id:"div"},
        {title:"Javascript", id:"js"},        
    ]},
    {title:"Client-Side Scripting 3", id:"web3", icon:"html5", menu:[]},
    {title:"Server-Side Scripting 1", id:"web4", icon:"python", menu:[]},
]};

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

// Client-Side Scripting 3

layout.web3 = [{icons:[
    // {text:"repl.it Project", show:"2023.1", url:"https://replit.com/@DavidMacCarthy/Web3"},
]}, uc, 0];

// Server-Side Scripting 1

layout.web4 = [{icons:[
    // {text:"repl.it Project", show:"2023.1", url:"https://replit.com/@DavidMacCarthy/Web4"},
]}, uc, 0];
