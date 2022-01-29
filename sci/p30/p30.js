let mom = [
    {title:"Assignment Booklet", gdrv:"1oEg1xXVLErF9p_39NoGSLIe9EOfBC9lP"},
    {title:"Work-Energy Review", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/we.html"},
        {title:"Practice Solutions", gdoc:"1JSZtuwwxjCc1B2E2HDjHMpO1AK_-mgnDPXQ7LbvymxA"},
    ]},
    {title:"Momentum", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/mom.html"},
        {title:"Practice Solutions", gdoc:"1nmhmq0oCQt40NWidf4FFZR70_tQ5HzpwmBdULBRyHLk"},
        {title:"Video Analysis", icon:"html5", open:"../tools/vid_analysis/"},
    ]},
    {title:"Impulse", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/impulse.html"},
        {title:"Practice Solutions", gdoc:"12MIibYktRjVXETUgOsvuslQzYl6UhiRHKqMZSWW2uzw"},
    ]},
    {title:"Momentum Conservation", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/pCons.html"},
        {title:"Practice Solutions", gdoc:"1hXHo-fjHKUnIeNlc1kEabIBmkvfJNql0vDC3AFbUDFs"},
    ]},
    {title:"Elastic & Inelastic Collisions", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/collide.html"},
        {title:"Practice Solutions", gdoc:"108IGVY2V9-fRYXVPBAyl8XRg2Y-bqyN64qM3HaQ3UzM"},
    ]},
    {title:"2D Vectors Review", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/vec.html"},
        {title:"Practice Solutions", gdoc:"1T53ne9L6w1BnRVGHpsOXCjBJ59AT336V6KIrY7hg7lg"},
    ]},
    {title:"2D Collisions", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/collide2d.html"},
        {title:"Practice Solutions", gdoc:"1SqKWCOb7_5PE-KHdNbZJsiSJXrs5-LM7dBmFMWx_IUs"},
    ]},
];

let elec = [ // Coulomb's Exp't https://www.youtube.com/watch?v=PHrN5AlwkRQ
    {title:"Assignment Booklet", gdrv:""},
    {title:"", icon:1, menu:[
        {title:"Simulation", icon:"html5", open:"../applet/coulomb.html"},
        {title:"Lesson Notes", open:"elec/.html"},
        {title:"Practice Solutions", gdoc:""},
    ]},
];

let atom = [
    {title:"Thomson's CRT Experiment", icon:1, menu:[
        {title:"Simulation", icon:"html5", open:"../applet/thomson.html"},
    ]},
];


// Double-Slit https://www.desmos.com/calculator/2dcav2cmz5

let mag, emr, photon, nuke;

let home = addHome({title:"Physics 30", id:"home", htmx:"<p class='Right'>Teacher: <a href='mailto:david.maccarthy@eips.ca'>D.G. MacCarthy</a></p>", menu:[
    {title:"Course Links", icon:"link", menu:[
        {title:"Brightspace", icon:"bs", open:"https://eips.brightspace.com/d2l/home/40848"},
        {title:"Data Booklet", icon:"link", open:"https://www.alberta.ca/assets/documents/edc-physics30-data-booklet.pdf"},
        {title:"Graph Paper", gdrv:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        {title:"Solution Template", gdrv:"14tETNQF1xZbm-J9BXNokX9PfsGwJmT0r"},
        {title:"Email Mr. MacCarthy", icon:"mail", open:"mailto:david.maccarthy@eips.ca"},
        {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
        {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
        {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", gdrv:"1iG0oo3ekpCxkiQfROZG7mvvjGydQxU1O"},
    ]},
    {title:"Chapter 9: Momentum & Impulse", id:"mom", icon:"train", menu:mom},
    {title:"Chapters 10 & 11: Electric Fields", unavail:1, id:"elec", icon:"../media/lightning.jpg", menu:elec},
    {title:"Chapter 12: Magnetic Fields", unavail:1, id:"mag", icon:"magnet", menu:mag},
    {title:"Chapter 13: Electromagnetic Waves", unavail:1, id:"emr", icon:"lightbulb", menu:emr},
    {title:"Chapter 14: Photons", unavail:1, id:"photon", icon:"xray", menu:photon},
    {title:"Chapter 15: Atomic Physics", unavail:1, id:"atom", icon:"atom", menu:atom},
    {title:"Chapters 16 & 17: Nuclear & Particle Physics", unavail:1, id:"nuke", icon:"nuke", menu:nuke},
]});
