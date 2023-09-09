let clim = {title:"Unit D: Climate Science", show: "2024.7", id:"clim", icon:"earth", menu:[
    // {title:"Part 1: Climate Science", id:"climsci", menu:[
        {title:"Heat Transfer", id:"transfer"},
        {title:"Earth’s Energy Budget", id:"budget"},
    // ]},
    // {title:"Part 2: Biomes & Climate Change", show:"2023.7", id:"biomes", menu:[
        {title:"Climatographs", id:"climatograph"},
        {title:"Biomes & Adaptations", id:"biome"},
        {title:"Natural Climate Change", id:"ncc"},
    // ]},
]};

lesson.chap = "clim";

lesson("transfer", "1wVNHdzNX-RZTZfWUr-K-eZWVeW9eVMVj", {img:{src:"https://i.stack.imgur.com/KaMzz.png", width:607},
    link:"https://physics.stackexchange.com/questions/23048/what-exactly-is-the-difference-between-radiation-conduction-and-convection"});
lesson("budget", "14g9soz3hUThLpkTYec_xZ_UCG0vocYiy", {vid:"82jE-yvB8xU"});
lesson("climatograph", "15WvtlQ_Nh1shPYYeiW4UtT5jS_-RtLMO", {img:{src:"clim/img/ottawa.png", width:698}, link:"https://climate.weather.gc.ca/climate_normals/results_1981_2010_e.html?searchType=stnName&txtStationName=ottawa&searchMethod=contains&txtCentralLatMin=0&txtCentralLatSec=0&txtCentralLongMin=0&txtCentralLongSec=0&stnID=4333&dispBack=0"});
lesson("biome", "1R-6aDt5xGoahOs2M5VN_5MsVmBEGH5to", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/White_polar_bear_animal_mammal_ursus_maritimus.jpg/640px-White_polar_bear_animal_mammal_ursus_maritimus.jpg", width:577}})[0].icons[2] = 
    {icon:"movie", text:"Polar Bear Video", url:"https://www.cbc.ca/player/play/1630724983"};
lesson("ncc", "10V6ooBaOhBhEebXaE-amyYRUBlsOpWaG", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Robert_Vere_Scott_Ben_Buckler_Bondi.jpg/1024px-Robert_Vere_Scott_Ben_Buckler_Bondi.jpg", style:"width:720px;height:405px;object-fit:cover"}})[0].icons.splice(0, 1);

layout.clim = [ 
    {icons:[
        {icon:"gdoc", text:"Climate Models Webquest", url:"1GmAjjrBOW5aakCV5Y8AM6CtBUNiBkbw_BVwfoarlmCw"},
        {icon:"gdoc", text:"Climate Project", url:"1LOHWhARu5ejJd-H55nkoSM57ibejnM2sj4TDydHJ_PE"},
    ]}, 0, 1
];
