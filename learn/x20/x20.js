let home = linkParents({title:"Mr. Mac's Website", icon:"$home", menu:[
    {title:"Computing Science 10", id:"cs10", icon:"#laptop", menu:[
        {title:"Structured Programming", id:"sp", icon:"https://www.python.org/static/favicon.ico"},
        {title:"Robotics Programming", id:"robo", icon:"#robot"},
    ]},
    {title:"Physics 20", id:"p20", icon:"#rocket", href:"#/x20/"},
]})

findNode(home, "p20").menu = [
    {title:"Energy & Work", id:"energy", icon:"#arrow", js:"showPages('#energy')", menu:[
        {title:"Mechanical Forms of Energy", id:"Emech", href:"#/x20/u1/test.html"},
        {title:"Energy Conservation"},
        {title:"Work-Energy Theorem"},
        {title:"Assignment Booklet", icon:"https://www.gstatic.com/images/icons/material/product/1x/drive_64dp.png"},
    ]},
    {title:"Kinematics", id:"kin", icon:"#train", js:"showPages('#kin')", menu:[]},
    {title:"Dynamics", id:"dyn", icon:"#rocket", js:"showPages('#dyn')", menu:[]},
    {title:"2D Vectors", id:"vec2d", icon:"#map", js:"showPages('#vec2d')", menu:[]},
    {title:"Circular & Planetary Motion", id:"circ", icon:"#earth", js:"showPages('#circ')", menu:[]},
    {title:"Universal Gravitation", id:"grav", icon:"#newton", js:"showPages('#grav')", menu:[]},
    {title:"Simple Harmonic Motion", id:"shm", icon:"#crane", js:"showPages('#shm')", menu:[]},
    {title:"Mechanical Waves", id:"wave", icon:"#speaker", js:"showPages('#wave')", menu:[]},
    {title:"Links", id:"link20", icon:"$link", sep:true, menu:[]},
];
