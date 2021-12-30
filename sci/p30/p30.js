let mom = [
    {title:"Assignment Booklet", gdrv:""},
    {title:"Momentum", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/mom.html"},
        {title:"Practice Solutions", gdoc:""},
    ]},
    {title:"Video Analysis", icon:"html5", open:"../tools/vid_analysis/"},
];

let elec = [
    {title:"Assignment Booklet", gdrv:""},
    {title:"", icon:1, menu:[
        {title:"Lesson Notes", open:"elec/.html"},
        {title:"Practice Solutions", gdoc:""},
    ]},
];

let mag, emr, photon, atom, nuke;

let home = addHome({title:"Physics 30", id:"home", htmx:"<p class='Right'>Teacher: <a href='mailto:david.maccarthy@eips.ca'>D.G. MacCarthy</a></p>", menu:[
    {title:"Course Links", icon:"link", menu:[
        {title:"Brightspace", icon:"bs", open:"https://eips.brightspace.com/d2l/home/"},
        {title:"Data Booklet", icon:"link", open:"https://www.alberta.ca/assets/documents/edc-physics30-data-booklet.pdf"},
        {title:"Graph Paper", gdrv:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        {title:"Email Mr. MacCarthy", icon:"mail", open:"mailto:david.maccarthy@eips.ca"},
        {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
        {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
        {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", icon:"link", open:"https://scienceoutlines.davidmaccarthy.repl.co/?p30"},
    ]},
    {title:"Chapter 9: Momentum & Impulse", id:"mom", icon:"train", menu:mom},
    {title:"Chapters 10 & 11: Electric Fields", unavail:1, id:"elec", icon:"", menu:elec},
    {title:"Chapter 12: Magnetic Fields", unavail:1, id:"mag", icon:"magnet", menu:mag},
    {title:"Chapter 13: Electromagnetic Waves", unavail:1, id:"emr", icon:"lightbulb", menu:emr},
    {title:"Chapter 14: Photons", unavail:1, id:"photon", icon:"xray", menu:photon},
    {title:"Chapter 15: Atomic Physics", unavail:1, id:"atom", icon:"", menu:atom},
    {title:"Chapters 16 & 17: Nuclear & Particle Physics", unavail:1, id:"nuke", icon:"nuke", menu:nuke},
]});
