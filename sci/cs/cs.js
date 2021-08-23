// let uc = "<p class='Center'>Under Construction! Please check back later.</p>"

let sp = [
    // {title:"Assignment Booklet", icon:"gdrv", open:""},
    {title:"Intro to Programming", lesson:"lesson", open:""},
    // {title:"", lesson:"lesson", menu:[
    //     {title:"Lesson Notes", lesson:"lesson", openx:"skill/nonLin.html"},
    // ]},
];

let link = {title:"General Links", icon:"link", menu:[
    {title:"Email Mr. MacCarthy", icon:"mail", open:"mailto:david.maccarthy@eips.ca"},
    {title:"Thonny (Python IDE)", icon:"thonny", open:"https://thonny.org/"},
    {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
    {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
    {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/career-and-technology-studies/bit-cluster-businessadminfinanceit/?searchMode=3"},
    {title:"Course Outline", icon:"link", open:"https://docs.google.com/document/d/1ElD-IF84gr2epoYlVpRtMFDyBv3EEbhGF0moBBoObSE"},
]};

let link10 = {title:"Course Links", icon:"link", menu:[
    {title:"Brightspace", icon:"bs", open:"https://eips.brightspace.com/d2l/home/26894"},
    {title:"repl.it Template", icon:"py", open:"https://replit.com/@DavidMacCarthy/CS10"},
]};

let iter = {title:"Iterative Algorithms", id:"iter", icon:"py", menu:[
    {title:"Linear Search", icon:"py", href:"iter/search.html"},
    {title:"Binary Search", icon:"py", href:"iter/bsearch.html"},
    {title:"Bubble Sort", icon:"py", href:"iter/bubble.html"},
    {title:"Insertion Sort", icon:"py", href:"iter/insert.html"},
    {title:"Selection Sort", icon:"py", href:"iter/sel.html"},
    {title:"Merging Sorted Data", icon:"py", href:"iter/merge.html"},
]};

// let iter30 = deep(iter);
// iter30.id = "iter30";

let repl_html = "<p>Login to your <a href='https://repl.it' target='repl'>repl.it</a> account first. Then create a “fork” of each of the repl’s below and share it with your teacher.</p>";

let home = {title:"Computing Science", htmx:"<p class='Right'>Teacher: <a href='mailto:david.maccarthy@eips.ca'>D.G. MacCarthy</a></p>", menu:[
    link,
    {title:"Computing Science 10", id:"cs10", icon:"robot", href:"https://dmaccarthy.github.io/learn/home/cs10.html"},
    // {title:"Computing Science 10", id:"cs10", icon:"robot", menu:[
    //     {title:"repl.it Online IDE", icon:"repl", html:repl_html, menu:[
    //         {title:"CS10 repl", icon:"repl", open:"https://replit.com/@DavidMacCarthy/CS10"},
    //     ]},
    //     link10, 
    //     {title:"Structured Programming", id:"sp", icon:"py", menu:[]},
    //     {title:"Computing Science", id:"cs1", icon:"laptop", menu:[]},
    //     {title:"Robotics Programming", id:"robo", icon:"robot", menu:[]},
    // ]},
    {title:"Computing Science 20", id:"cs20", icon:"py", menu:[
        // link20,
        {title:"repl.it Online IDE", icon:"repl", html:repl_html, menu:[
            {title:"Web Programming", icon:"repl", open:"https://replit.com/@DavidMacCarthy/Web1"},
            {title:"Python Programming", icon:"repl", open:"https://replit.com/@DavidMacCarthy/CS20"},
        ]},
        {title:"Web Programming 1", id:"web1", icon:"html5", menu:[
            {title:"Internet & World Wide Web", icon:"html5", href:"web1/internet.html"},
            {title:"Data Trees", icon:"html5", href:"web1/tree.html"},
            {title:"eXtensible Markup Language", icon:"html5", href:"web1/xml.html"},
            {title:"Text & Comment Nodes", icon:"html5", href:"web1/text.html"},
            {title:"Entities", icon:"html5", href:"web1/entity.html"},
            {title:"Hypertext Markup Language (HTML)", icon:"html5", href:"web1/html5.html"},
            {title:"Character Formatting", icon:"html5", href:"web1/char.html"},
            {title:"Images & Video", icon:"html5", href:"web1/image.html"},
            {title:"Lists & Tables", icon:"html5", href:"web1/list.html"},
        ]},
        {title:"Web Programming 2", id:"web2", icon:"html5", menu:[
            {title:"Forms", icon:"html5", href:"web2/form.html"},
            {title:"Style Sheets (CSS)", icon:"html5", href:"web2/style.html"},
            {title:"External Stylesheets", icon:"html5", href:"web2/ext.html"},
            {title:"Document Divisions", icon:"html5", href:"web2/div.html"},
            {title:"Javascript", icon:"html5", href:"web2/js.html"},
        ]},
        {title:"Procedural Programming", id:"pp", icon:"py", menu:[
            {title:"Functions", icon:"py", href:"pp/func.html"},
            {title:"Variable Scope", icon:"py", href:"pp/scope.html"},
            {title:"Top-Down Design", icon:"py", href:"pp/top.html"},
            {title:"Pre- & Post-Conditions", icon:"py", href:"pp/pre.html"},
            {title:"Exception Handling", icon:"py", href:"pp/except.html"},
        ]},
        {title:"Video Game Project", id:"game", icon:"sc8pr", menu:[
            {title:"Sketches & Sprites", icon:"sc8pr", href:"game/sketch.html"},
            {title:"Customizing the Animation", icon:"sc8pr", href:"game/custom.html"},
            {title:"Text in Animations", icon:"sc8pr", href:"game/text.html"},
            {title:"Keyboard Events", icon:"sc8pr", href:"game/key.html"},
            {title:"Mouse Events", icon:"sc8pr", href:"game/mouse.html"},
        ]},
        {title:"Data Structures", id:"ds", icon:"py", menu:[
            {title:"Tuples & Lists", icon:"py", href:"ds/list.html"},
            {title:"Iteration", icon:"py", href:"ds/iter.html"},
            {title:"Dictionaries & Sets", icon:"py", href:"ds/dict.html"},
            {title:"Positional & Keyword Arguments", icon:"py", href:"ds/args.html"},
            {title:"List Comprehensions", icon:"py", href:"ds/comp.html"},
            {title:"Generator Functions", icon:"py", href:"ds/gen.html"},
            {title:"Arrays", icon:"py", href:"ds/array.html"},
        ]},
        iter,
        // {title:"File Structures", id:"fs", icon:"laptop", menu:[
        //     {title:"", icon:"py", href:"fs/.html"},
        // ]},
    ]},
    {title:"Computing Science 30", id:"cs30", icon:"py", menu:[
        {title:"repl.it Online IDE", icon:"repl", html:repl_html, menu:[
            {title:"CS30 repl", icon:"repl", open:"https://replit.com/@DavidMacCarthy/CS30"},
        ]},
        // link30,
        // iter30,
        {title:"Object-Oriented Programming 1", id:"oop1", icon:"py", menu:[
            {title:"Objects", icon:"py", href:"oop1/obj.html"},
            {title:"Modifiers & Accessors", icon:"py", href:"oop1/mod.html"},
            {title:"Special Methods", icon:"py", href:"oop1/spec.html"},
            {title:"Inheritance", icon:"py", href:"oop1/inher.html"},
        ]},
        // {title:"Recursive Algorithms", id:"rec", icon:"py", menu:[
        //     {title:"", icon:"py", href:"rec/.html"},
        //     {title:"", icon:"py", href:"rec/.html"},
        //     {title:"", icon:"py", href:"rec/.html"},
        //     {title:"", icon:"py", href:"rec/.html"},
        // ]},
        // {title:"Dynamics Data Structures", id:"dds", icon:"py", menu:[
        //     {title:"", icon:"py", href:"dds/.html"},
        //     {title:"", icon:"py", href:"dds/.html"},
        //     {title:"", icon:"py", href:"dds/.html"},
        // ]},
    ]},
]}
