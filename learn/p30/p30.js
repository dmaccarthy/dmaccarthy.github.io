let today = "mv", ab_pos = "https://education.alberta.ca/media/3069387/pos_phys_20_30.pdf";

function uc() {
    alert("We haven't started this unit yet!");
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
    {title:"Electric & Magnetic Fields", id:"em", js:"uc()", menu:[]},
    {title:"Electromagnetic Radiation", id:"emr", js:"uc()", menu:[]},
    {title:"Atomic & Nuclear Physics", id:"nuke", js:"uc()", menu:[]},
]}

linkParents(home);