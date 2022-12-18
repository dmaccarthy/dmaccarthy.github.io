let today = "sciNot";

let p20 = {title:"Physics 20", id:"home", icon:"rocket", menu:[
    {title:"Science & Math 10 Review", id:"s10", icon:"da", menu:[
        {title:"Experiment Design", id:"expDes"},
        {title:"Algebra", id:"algebra"},
        {title:"Scientific Notation", id:"sciNot"},
        {title:"SI Units", id:"si"},
        {title:"Scatter Plots & Slope", id:"scatter"},
        {title:"Trigonometry", id:"trig"},
    ]},
    {title:"Chapter 1: Kinematics (1D)", id:"kin", icon:"train", menu:[
        {title:"Position & Displacement", id:"displ"},
        {title:"Velocity & Speed", id:"vel"},
        {title:"Basketball Lab", id:"bball", icon:"ball"},
        {title:"Motion Graphs", id:"graph"},
        {title:"Acceleration", id:"acc"},
        {title:"Uniform Accelerated Motion", id:"uam"},
        {title:"Kinematics Review", id:"ch1"},
    ]},
    {title:"Chapter 2: Vectors (2D)", id:"vec", show:"2023.7", icon:"soccer", menu:[
        
    ]},
    {title:"Chapter 3: Dynamics", id:"dyn", show:"2023.7", menu:[
        
    ]},
    {title:"Chapter 6: Energy & Work", id:"energy", show:"2023.7", icon:"arrow", menu:[
        
    ]},
    {title:"Chapter 5: Circular & Planetary Motion", id:"circ", show:"2023.7", icon:"midway", menu:[
        
    ]},
    {title:"Chapter 4: Universal Gravitation", id:"grav", show:"2023.7", icon:"earth", menu:[
        
    ]},
    {title:"Chapter 7: Oscillations", id:"shm", show:"2023.7", icon:"crane", menu:[
        
    ]},
    {title:"Chapter 8: Mechanical Waves", id:"wave", show:"2023.7", icon:"speaker", menu:[
        
    ]},
    {title:"Course Review", id:"rev20", menu:[
        {title:"Kinematics Review", id:"rev1", icon:"train"},
        {title:"Vectors Review", id:"rev2", icon:"soccer"},
        {title:"Dynamics Review", id:"rev3"},
        {title:"Energy & Work Review", id:"rev6", icon:"arrow"},
        {title:"Circular & Planetary Motion Review", id:"rev5", icon:"midway"},
        {title:"Universal Gravitation Review", id:"rev4", icon:"earth"},
        {title:"Oscillations Review", id:"rev7", icon:"crane"},
        {title:"Mechanical Waves Review", id:"rev8", icon:"speaker"},
    ]},
]}

let home = {title:"Mr. Mac’s Website", id:"~", menu:[p20], href:"../"};

let homeIcons = [
    {icons:[
        {icon:"gdrv", text:"Data Sheet", url:"1gWLP0yLweKtHtn5nJk--Ev_KB2XDibqq"},
        {icon:"today", text:"Brightspace", url:"https://eips.brightspace.com/d2l/home/62225"},
        {text:"PowerSchool", url:"https://powerschool.eips.ca/public/"},
        {icon:"mail", text:"Email Mr. MacCarthy", url:"mailto://david.maccarthy@eips.ca"},
        {icon:"more", text:"More", action:function() {swapIcons(homeIcons[1])}}
    ]},
    {icons:[
        {icon:"gdrv", text:"Graph Paper", url:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        {icon:"open", text:"Salisbury Composite", url:"https://salcomp.ca"},
        {icon:"gdrv", text:"Course Outline", url:"1pIpT3c8RKU5QeN09m7iEQQoAuKHDtPgg"},
        {icon:"open", text:"Program of Studies", url:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {icon:"more", text:"More", action:function() {swapIcons(homeIcons[0])}},
    ]}
];

let layout = {home: [homeIcons[0], 0]};
layout.ch1 = layout.rev1 = [1, {ajax:"kin/summary.htm"}];
layout.ch2 = layout.rev2 = [1, {ajax:"vec/summary.htm"}];
layout.ch3 = layout.rev3 = [1, {ajax:"dyn/summary.htm"}];
layout.ch6 = layout.rev6 = [1, {ajax:"energy/summary.htm"}];
layout.ch5 = layout.rev5 = [1, {ajax:"circ/summary.htm"}];
layout.ch4 = layout.rev4 = [1, {ajax:"grav/summary.htm"}];
layout.ch7 = layout.rev7 = [1, {ajax:"shm/summary.htm"}];
layout.ch8 = layout.rev8 = [1, {ajax:"wave/summary.htm"}];
