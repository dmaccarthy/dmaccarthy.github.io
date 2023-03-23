let phys = {title:"Unit B: Physics", id:"phys", icon:"rocket", menu:[
    {title:"Part 1: Motion", id:"motion", menu:[
        {title:"SI Units", id:"si"},
        {title:"Graphing Data", id:"scatter"},
        {title:"Position & Displacement", id:"displ"},
        {title:"Velocity & Speed", show:"2023.7", id:"vel"},
        // {title:"", id:""},
        // {title:"", id:""},
    ]},
    {title:"Part 2: Energy", show:"2023.7", id:"energy", menu:[
        {title:"", id:""},
    ]},
    {title:"Part 3: Heat", show:"2023.7", id:"heat", menu:[
        {title:"", id:""},
    ]},
]};

lesson.chap = "phys";

lesson("si", "1x8E0bfm3t58KKMdKYLPigTJsjhO4I0zJ", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/International_prototype_of_the_kilogram_aka_Le_Grand_K.jpg/386px-International_prototype_of_the_kilogram_aka_Le_Grand_K.jpg", width:326}});
lesson("scatter", "12wqPxyx5sAjEqgVkAHuZJq0tSr6YX4GJ", {desmos:"atvylhkqe5", width:720, "data-aspect":"16/9"});
lesson("displ", "1GwGukfbNNNInGkFOx63WI6BO-yzLBiqx", {img:{src:"phys/img/bike2.png", width:760}});
lesson("vel", "1GlGnzRa5pyJosff22wOV7_XQrjyIvznJ", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/NASCAR_practice.jpg/640px-NASCAR_practice.jpg", width:"620"}});
// lesson("", "");

layout._z = [
    {icons:[
        {icon:"note", text:"Lesson Notes", url:"phys/.html"},
        {icon:"gdrv", text:"Assignment", url:""},
        {key:"phys/"},
    ]}, 1
];
