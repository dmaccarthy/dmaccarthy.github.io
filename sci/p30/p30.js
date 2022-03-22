let emr = [
    {title:"Assignment Booklet", gdrv:""},
    {title:"Electromagnetic Waves", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/wave.html"},
        {title:"Practice Solutions", gdoc:""},
    ]},
    {title:"Young’s Experiment", icon:1, menu:[
        {title:"Animation", icon:"html5", open:"https://www.desmos.com/calculator/2dcav2cmz5"},
        {title:"Lesson Notes", open:"emr/wave.html"},
        {title:"Practice Solutions", gdoc:""},
    ]},
];

//     {title:"Snell’s Law Derivation", icon:"html5", open:"https://www.geogebra.org/m/agnjb9mf"},


let mag = [
    {title:"Assignment Booklet", gdrv:"1KuLEqojBVQOI4wZcC5TKVjmrpGE2hpYE"},
    {title:"Electromagnetism", id:"em", icon:1, menu:[
        {title:"Lesson Notes", open:"em/mag.html"},
        {title:"Practice Solutions", gdoc:"1gf_5knTUqHibU_09BV6LvKX4Il0BDE1vWieigAc4B4E"},
        {title:"Weak Field (Logger Pro)", gdrv:"10TYeWeR9Cx9NEJV-cnuNUodkP5kWmjB9"},
        {title:"Strong Field (Logger Pro)", gdrv:"1f4G4NCbVLARARGNBuHqWmjQop2_7ic-p"},
    ]},
    {title:"Magnetic Fields", id:"B", icon:1, menu:[
        {title:"Lesson Notes", open:"em/Bfield.html"},
        {title:"Practice Solutions", gdoc:"1CzvKH05dm8RNAFyEayJ2vmiTsyZh5liUu3oXiC00qrg"},
    ]},
    {title:"Magnetic Force", id:"Fm", icon:1, menu:[
        {title:"Lesson Notes", open:"em/Bforce.html"},
        {title:"Practice Solutions", gdoc:"1UgsNVEyDVkBgqXSTPbMNaF6Vguj9k2ZSb7grv8OhDwo"},
    ]},
    {title:"Motion in a Uniform Magnetic Field", vid:"#PLpVmtCaB-lyl3kut6XKatUImVUmG7PFNP", id:"helix", icon:1, menu:[
        {title:"Lesson Notes", open:"em/helix.html"},
        {title:"Practice Solutions", gdoc:"1DoIyddl-AyKOouyIAi_jUPJudfC0JkKW2CdqfArsXxE"},
    ]},
    {title:"Motor Principle", id:"motor", icon:1, menu:[
        {title:"Lesson Notes", open:"em/motor.html"},
        {title:"Practice Solutions", gdoc:"1wS4aufiTjtOiTtVapskfasgRvSbs6HSo6pyCxONBcmg"},
    ]},
    {title:"Electromagnetic Induction", id:"faraday", icon:1, menu:[
        {title:"Lesson Notes", open:"em/faraday.html"},
        {title:"Practice Solutions", gdoc:"1vue7fvamInOCeptxnyQ1BLcszv6DgGiLA_C-M2Zv88g"},
    ]},
    // {title:"Chapter Review", icon:"lesson", id:"ch12", ajax:"em/summaryB.htm", menu:[]},
];

let elec = [ // Coulomb's Exp't https://www.youtube.com/watch?v=PHrN5AlwkRQ
    {title:"Assignment Booklet", gdrv:"1KuLEqojBVQOI4wZcC5TKVjmrpGE2hpYE"},
    {title:"Electrostatics", id:"statics", icon:1, menu:[
        {title:"Lesson Notes", open:"em/statics.html"},
        {title:"Practice Solutions", gdoc:"1X2V5OOijL9L7xrdoIX1E27kGdBHK5tGKl_13flf9cM8"},
    ]},
    {title:"Coulomb’s Law", id:"coulomb", icon:1, menu:[
        {title:"Simulation", icon:"html5", open:"../applet/coulomb.html"},
        {title:"Physics 20 Data Analysis Review", icon:"da", open:"https://sci.davidmaccarthy.repl.co/p20/#da"},
        {title:"Lesson Notes", open:"em/coulomb.html"},
        {title:"Practice Solutions", gdoc:"1uY1-f-DxC1GJlf4iLhX6-STY1mIas0fl9JkEOTsbXXc"},
    ]},
    {title:"Electic Fields", id:"Efield", icon:1, menu:[
        {title:"Lesson Notes", open:"em/Efield.html"},
        {title:"Field Visualization (PhET)", icon:"html5", open:"https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html"},
        {title:"Field Visualization (Falstad)", icon:"html5", open:"https://falstad.com/vector2de/vector2de.html?f=InverseSquaredRadial&fc=Floor%3A%20field%20magnitude&fl=Overlay%3A%20field%20lines&d=partsvel&m=Mouse%20%3D%20Adjust%20Angle&st=1&pc=500&ft=true&rx=63&ry=0&rz=0&zm=1.2"},
        {title:"Practice Solutions", gdoc:"1GoddXPXgkrUBvCXcD7qmUorE5MREf0HbZYsPrROQbaY"},
    ]},
    {title:"Motion in a Uniform Electic Field", id:"motion", icon:1, menu:[
        {title:"Lesson Notes", open:"em/motion.html"},
        {title:"Practice Solutions", gdoc:"187EL4mH70qJ14-cCA1S7vhvh2GDdakVw7B0Kh29XM8I"},
    ]},
    {title:"Electic Potential Difference", id:"volt", icon:1, menu:[
        {title:"Lesson Notes", open:"em/volt.html"},
        {title:"Practice Solutions", gdoc:"1U9a7fQFcgbH7flF1s-T_eTrNQVqZtIOy6gQQUumnHIk"},
    ]},
    {title:"Millikan’s Oil Drop Experiment", id:"oilDrop", icon:1, menu:[
        {title:"Lesson Notes", open:"em/oilDrop.html"},
        {title:"Practice Solutions", gdoc:"1uiVgxx_ngPf_slS0y93JhK4ggYRYaKYY2htwYEAtXrU"},
        {title:"Simulation", icon:"html5", open:"../applet/oildrop"},
    ]},
    // {title:"Chapter Review", icon:"lesson", id:"ch10_11", ajax:"em/summaryE.htm", menu:[]},
];

let atom = [
    {title:"Thomson’s CRT Experiment", icon:1, menu:[
        {title:"Simulation", icon:"html5", open:"../applet/thomson.html"},
    ]},
];

let photon, nuke;

let mom = [
    {title:"Assignment Booklet", gdrv:"1oEg1xXVLErF9p_39NoGSLIe9EOfBC9lP"},
    {title:"Work-Energy Review", id:"energy", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/we.html"},
        {title:"Practice Solutions", gdoc:"1JSZtuwwxjCc1B2E2HDjHMpO1AK_-mgnDPXQ7LbvymxA"},
    ]},
    {title:"Momentum", id:"p", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/mom.html"},
        {title:"Practice Solutions", gdoc:"1nmhmq0oCQt40NWidf4FFZR70_tQ5HzpwmBdULBRyHLk"},
        {title:"Video Analysis", icon:"html5", open:"../tools/vid_analysis/"},
        {title:"Extra Videos", icon:"gdrv", open:"https://drive.google.com/drive/folders/1Q8pXcPX-Luihd2A6ToGSK5tUKeiYZoxi"},
    ]},
    {title:"Impulse", id:"imp", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/impulse.html"},
        {title:"Practice Solutions", gdoc:"12MIibYktRjVXETUgOsvuslQzYl6UhiRHKqMZSWW2uzw"},
    ]},
    {title:"Momentum Conservation", id:"pcons", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/pCons.html"},
        {title:"Practice Solutions", gdoc:"1hXHo-fjHKUnIeNlc1kEabIBmkvfJNql0vDC3AFbUDFs"},
    ]},
    {title:"Elastic & Inelastic Collisions", id:"coll", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/collide.html"},
        {title:"Practice Solutions", gdoc:"108IGVY2V9-fRYXVPBAyl8XRg2Y-bqyN64qM3HaQ3UzM"},
    ]},
    {title:"2D Vectors Review", id:"vec2d", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/vec.html"},
        {title:"Practice Solutions", gdoc:"1T53ne9L6w1BnRVGHpsOXCjBJ59AT336V6KIrY7hg7lg"},
    ]},
    {title:"2D Collisions", id:"coll2d", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/collide2d.html"},
        {title:"Practice Solutions", gdoc:"1SqKWCOb7_5PE-KHdNbZJsiSJXrs5-LM7dBmFMWx_IUs"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch9", ajax:"mom/summary.htm", menu:[]},
];

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
    {title:"Chapters 10 & 11: Electric Fields", id:"elec", icon:"../media/lightning.jpg", menu:elec},
    {title:"Chapter 12: Magnetic Fields", id:"mag", icon:"magnet", menu:mag},
    {title:"Chapter 13: Electromagnetic Waves", unavail:0, id:"emr", icon:"lightbulb", menu:emr},
    {title:"Chapter 14: Photons", unavail:1, id:"photon", icon:"xray", menu:photon},
    {title:"Chapter 15: Atomic Physics", unavail:1, id:"atom", icon:"atom", menu:atom},
    {title:"Chapters 16 & 17: Nuclear & Particle Physics", unavail:1, id:"nuke", icon:"nuke", menu:nuke},
]});
