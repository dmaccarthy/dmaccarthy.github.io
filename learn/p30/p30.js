let today = "mag", ab_pos = "https://education.alberta.ca/media/3069387/pos_phys_20_30.pdf";

function uc() {
    alert("We haven’t started this topic yet!");
}

let home = {title:"Physics 30", id:"p30", href:"#/p30/", menu:[
    {title:"Units", heading:1},
    {title:"Momentum & Impulse", id:"momentum", href:"#/p30/momentum/", menu:[
        {title:"Work & Energy Review", id:"work", href:"#/p30/momentum/work.html"},
        {title:"Momentum", id:"mv", href:"#/p30/momentum/momentum.html"},
        {title:"Impulse", id:"imp", href:"#/p30/momentum/impulse.html"},
        {title:"Momentum Conservation", id:"pCons", href:"#/p30/momentum/pCons.html"},
        {title:"Elastic & Inelastic Collisions", id:"elastic", href:"#/p30/momentum/elastic.html"},
        {title:"2D Collisions", id:"coll2d", href:"#/p30/momentum/coll2d.html"},
        {title:"Assignment Booklet", hr:-1, drive:"1X6AwJxewKTFZEr8OEjpYrRCPoQBcqIK7"},
    ]},
    {title:"Electric & Magnetic Fields", id:"em", href:"#/p30/em/", menu:[
        {title:"Electrostatics", id:"statics", href:"#/p30/em/statics.html"},
        {title:"Coulomb’s Law", id:"coulomb", href:"#/p30/em/coulomb.html"},
        {title:"Electric Fields", id:"Efield", href:"#/p30/em/Efield.html"},
        {title:"Motion in a Uniform Electric Field", id:"motion", href:"#/p30/em/motion.html"},
        {title:"Electric Potential Difference", id:"volt", href:"#/p30/em/volt.html"},
        {title:"Millikan’s Oil Drop Experiment", id:"oilDrop", href:"#/p30/em/oilDrop.html"},
        {title:"Electric Fields Assignments", hr:-1, drive:"1QNgBXHGbsAVkdWLp3NestMTilQWgeRI7"},
        {title:"Electromagnetism", id:"mag", hr:-1, href:"#/p30/em/mag.html"},
        // {title:"<b>Google Classroom</b>", open:"https://classroom.google.com/u/0/w/NTM1MTM4ODU1NTRa/t/all"},
        // {title:"Magnetic Fields", id:"Bfield", href:"#/p30/em/Bfield.html"},
    ]},
    {title:"Electromagnetic Radiation", id:"emr", js:"uc()", menu:[]},
    {title:"Atomic & Nuclear Physics", id:"nuke", js:"uc()", menu:[]},
]}

linkParents(home);