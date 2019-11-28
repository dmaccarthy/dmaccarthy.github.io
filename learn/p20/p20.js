links = [
    {title:"Course Outline", open:"https://scienceoutlines.davidmaccarthy.repl.co/?p20"},
    {title:"Data Sheet", drive:"0B_gX0kaqRFXTNVk0Y0ZuVHBMN1U"},
].concat(links);

let topics = [
    {title:"Energy & Work", id:"energy", icon:"#cal", href:"#/p20/energy/"},
    {title:"Motion in 1D", id:"kin", icon:"@train", href:"#/p20/kin/"},
    {title:"Dynamics", id:"dyn", icon:"@rocket", href:"#/p20/dyn/"},
    {title:"Oscillations (SHM)", id:"shm", icon:"@crane", href:"#/p20/shm/"},
    {title:"Waves", id:"wave", icon:"@speaker", href:"#/p20/wave/"},
    {title:"Circular & Planetary Motion", id:"circ", icon:"@planet", href:"#/p20/circ/", menu:true},
    {title:"Universal Gravitation", id:"grav", icon:"@newton", href:"#/p20/grav/", menu:true},
    {title:"2D Vectors", id:"vec2d", icon:"@map", href:"#/p20/vec2d/"},
];

let p20 = {title:"Physics 20", id:"p20", icon:"@rocket", href:"#/p20/", menu:[
    {title:"Topics of Study", icon:"@planet", menu:topics},
    {title:"Current Topic:<br/><i>Universal Gravitation</i>", icon:"@newton", js:"goNode('grav')"},
    {title:"Course Links", icon:"@link", menu:links, sep:[4]},
]};

home.menu[1] = p20;
init20 = init;
