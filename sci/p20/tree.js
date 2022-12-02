let layout = {};

// Course Review

layout.ch1 = layout.rev1 = [{ajax:"kin/summary.htm"}];
layout.ch2 = layout.rev2 = [{ajax:"vec/summary.htm"}];
layout.ch3 = layout.rev3 = [{ajax:"dyn/summary.htm"}];
layout.ch4 = layout.rev4 = [{ajax:"grav/summary.htm"}];
layout.ch5 = layout.rev5 = [{ajax:"circ/summary.htm"}];
layout.ch6 = layout.rev6 = [{ajax:"energy/summary.htm"}];
layout.ch7 = layout.rev7 = [{ajax:"shm/summary.htm"}];
layout.ch8 = layout.rev8 = [{ajax:"wave/summary.htm"}];

// Chapter 1: Kinematics

layout.displ = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"kin/displ.html"},
        {icon:"key", text:"Answer Key", url:"key.html#kin/displ"},
    ]},
    {vid:"V8hJhTE3bUk"},
    // {html:"$$C=2\\pi r$$"},
    // {ajax:"../p20/kin/displ.htm"}
];

layout.vel = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"kin/vel.html"},
        {icon:"key", text:"Answer Key", url:"key.html#kin/vel"},
    ]},
];

layout.bball = [
    {icons:[
        // {title:"Logger Pro Setup (Rolling)", gdrv:"1xPepAdIKoIzIembAw02G4gXEbVIeh_27"},
        // {title:"Logger Pro Setup (Bouncing)", gdrv:"1pI39R2RcajEK35gwJq-gko6mjtzH-w1m"},
        {icon:"gdrv", text:"Lab: Motion of a Rolling Ball", url:"1FohO987NAdlQm4Kg05GEkSADQH5CmCwh"},
        {icon:"gdrv", text:"Lab: Motion of a Bouncing Ball", url:"1K4FfWTyN2LLdPeTP8jYqpHmMryJ8Ljz2"},
        {icon:"link", text:"Bouncing Ball Simulation", url:"../applet/bounce.html"},
        {icon:"open", text:"Bouncing Ball Data", url:"https://www.desmos.com/calculator/mop5f8vzxj"},
    ]},
];

layout.graph = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"kin/graph.html"},
        {icon:"key", text:"Answer Key", url:"key.html#kin/graph"},
    ]},
];

layout.acc = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"kin/acc.html"},
        {icon:"key", text:"Answer Key", url:"key.html#kin/acc"},
    ]},
];

layout.uam = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"kin/uam.html"},
        {icon:"key", text:"Answer Key", url:"key.html#kin/uam"},
    ]},
];


// Chapter 2: Vectors

// Chapter :
// Chapter :
// Chapter 8: Mechanical Waves

// Math & Science 10 Review...

layout.expDes = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"skill/expDes.html"},
        {icon:"key", text:"Answer Key", url:"key.html#skill/expDes"},
    ]},
    {vid:"x2606GQmDqY"},
    // {html:"<ul><li>Manipulated, Responding &amp; Controlled Variables</li><li>Hypothesis</li></ul>"}
];

layout.algebra = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"skill/algebra.html"},
        {icon:"key", text:"Answer Key", url:"key.html#skill/algebra"},
    ]},
];

layout.sciNot = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"skill/sciNot.html"},
        {icon:"key", text:"Answer Key", url:"key.html#skill/sciNot"},
    ]},
];

layout.si = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"skill/si.html"},
        {icon:"key", text:"Answer Key", url:"key.html#skill/si"},
    ]},
];

layout.scatter = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"skill/scatter.html"},
        {icon:"key", text:"Answer Key", url:"key.html#skill/scatter"},
    ]},
];

layout.trig = [
    {icons:[
        {icon:"gdrv", text:"Handout", url:""},
        {icon:"note", text:"Lesson Notes", url:"skill/trig.html"},
        {icon:"key", text:"Answer Key", url:"key.html#skill/trig"},
    ]},
];

// Physics 20...

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
    {title:"Chapter 2: Vectors (2D)", id:"vec", icon:"soccer", menu:[
        
    ]},
    {title:"Chapter 3: Dynamics", id:"dyn", show:"2023.1", menu:[
        
    ]},
    {title:"Chapter 4: Universal Gravitation", id:"grav", show:"2023.1", icon:"earth", menu:[
        
    ]},
    {title:"Chapter 5: Circular & Planetary Motion", id:"circ", show:"2023.1", icon:"midway", menu:[
        
    ]},
    {title:"Chapter 6: Energy & Work", id:"energy", show:"2023.1", icon:"arrow", menu:[
        
    ]},
    {title:"Chapter 7: Oscillations", id:"shm", show:"2023.1", icon:"crane", menu:[
        
    ]},
    {title:"Chapter 8: Mechanical Waves", id:"wave", show:"2023.1", icon:"speaker", menu:[
        
    ]},
    {title:"Course Review", id:"rev20", menu:[
        {title:"Kinematics Review", id:"rev1", icon:"train"},
        {title:"Vectors Review", id:"rev2", icon:"soccer"},
        {title:"Dynamics Review", id:"rev3"},
        {title:"Universal Gravitation Review", id:"rev4", icon:"earth"},
        {title:"Circular & Planetary Motion Review", id:"rev5", icon:"midway"},
        {title:"Energy & Work Review", id:"rev6", icon:"arrow"},
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

layout.home = [0, homeIcons[0]];
