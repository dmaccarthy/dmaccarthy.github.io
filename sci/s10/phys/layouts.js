let phys = {title:"Unit B: Physics", show: "2024.7", id:"phys", icon:"rocket", menu:[
    {title:"Part 1: Motion", id:"motion", menu:[
        {title:"SI Units", id:"si"},
        {title:"Graphing Data", id:"scatter"},
        {title:"Position & Displacement", id:"displ"},
        {title:"Velocity & Speed", id:"vel"},
        {title:"Acceleration", id:"accel"},
        // {title:"", id:""},
    ]},
    {title:"Part 2: Energy", id:"energy", menu:[
        {title:"Mechanical Energy", id:"mech"},
        {title:"Energy Transformations", id:"Etransform"},
        {title:"Work-Energy Theorem", id:"work"},
        {title:"Efficiency", id:"eff"},
        // {title:"Energy Transforming Technologies", id:"tech"},
    ]},
    {title:"Part 3: Heat", id:"heat", menu:[
        {title:"Theories of Heat", id:"kmt"},
        {title:"Heat Capacity", id:"mcT"},
        {title:"Latent Heat", id:"latent"},
    ]},
    {title:"Unit Review", id:"phys_rev"},
]};

layout.phys = [{icons:[
    {icon:"gdoc", text:"Unit Project", url:"1Tzg2GicMO0712rPXkqi_1t_XOtFkVlLXMaNU86dIb18"},
]}, 0, 1];

lesson.chap = "phys";

lesson("kmt", "1xZoZuTOb14rIIHHt8BqgQT123mJlojjP", {vid:"HkSXiHz9vUc"});
lesson("mcT", "1cBLR1R940ByiQdxo5s571titIWAhgjgN", {img:{src:"https://c.pxhere.com/photos/a1/6f/tea_pot_stove_tea_fire_cooking_pot_camping-1103276.jpg!d", width:610}})[0].icons[2] = 
    {text:"Lab Handout", icon:"gdrv", url:"169-8XKn9lWZSjBCq1yfUHAfLBMj3GQVg"};
lesson("latent", "1vOxFsnN9_VCaGVw4Ev-WHTf3zNUUGGPT", {img:{src:"https://www.publicdomainpictures.net/pictures/90000/velka/melting-ice.jpg", width:463}});

lesson("mech", "1N8lKfz_u-o7iAKZcBpA32eQm8bDM1jCX", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dodonpa_Roller_Coaster_in_2009.jpg/640px-Dodonpa_Roller_Coaster_in_2009.jpg", width:540}});
lesson("Etransform", "1llNuv5Juc3lypmkma69vkPG5PZi5SASX", {img:{src:"https://images-assets.nasa.gov/image/NHQ202212160011/NHQ202212160011~thumb.jpg", width:607}})[0].icons.push(
    {text:"Lab Handout", icon:"gdrv", url:"1J3UHaAFFkB6H37hY8dvqBvTNEpk3ocJb"});
lesson("work", "1G-Zw8rE1jMEUkIZiM4E5WjHP9LeE4gZh", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TourDeFrance_2005_07_09.jpg/602px-TourDeFrance_2005_07_09.jpg", width:508}});
lesson("eff", "1QBsDw6qFznFWBkLp6mD015bqV4sIiKjn", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Minarets_and_Western_Locomotive_102.jpg/640px-Minarets_and_Western_Locomotive_102.jpg", width:549}})[0].icons.push(
    {icon:"gdrv", text:"Energy Transforming Technologies", url:"1FCXM6LwtdYSLMO7zfgdvavNGYl2l6r-q"}
);

lesson("si", "1x8E0bfm3t58KKMdKYLPigTJsjhO4I0zJ", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/International_prototype_of_the_kilogram_aka_Le_Grand_K.jpg/386px-International_prototype_of_the_kilogram_aka_Le_Grand_K.jpg", width:326}});
lesson("scatter", "12wqPxyx5sAjEqgVkAHuZJq0tSr6YX4GJ", {desmos:"atvylhkqe5", width:720, "data-aspect":"16/9"});
lesson("displ", "1GwGukfbNNNInGkFOx63WI6BO-yzLBiqx", {img:{src:"phys/img/bike2.png", width:760}})[0].icons.push(
    {text:"Lab Handout", icon:"gdrv", url:"1Qc8ihNQzDQ7W2YdO5PCvFqTcCsNKKHje"});
lesson("vel", "1GlGnzRa5pyJosff22wOV7_XQrjyIvznJ", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/NASCAR_practice.jpg/640px-NASCAR_practice.jpg", width:"620"}});
lesson("accel", "1c5l8hBrLs0DQG3Y7X9nCXd_RDIgdyCWb", {img:{src:"https://c.pxhere.com/photos/4c/c7/photo-180873.jpg!d", width:608}});

layout.phys_rev = [{icons:[
    {icon:"gdrv", text:"Assignment", url:"1sW_0M6HozB6fB1FIFQWk8kN1BTXaO64i"},
    {icon:"gdrv", text:"Answer Key", show:"2023.5.6.12", url:"1IjzARdbPgoCzgC_DDM5pfC95PKm-U6To"},
]}, {img:{src:"https://images-assets.nasa.gov/image/NHQ202212160011/NHQ202212160011~thumb.jpg", width:607}}, 1];


layout._z = [
    {icons:[
        {icon:"note", text:"Lesson Notes", url:"phys/.html"},
        {icon:"gdrv", text:"Assignment", url:""},
        {key:"phys/"},
    ]}, 1
];
