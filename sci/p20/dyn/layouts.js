let dyn = {title:"Chapter 3: Dynamics", id:"dyn", icon:"rocket", menu:[
    {title:"Force & Inertia", id:"inert"},
    {title:"Free Body Diagrams", id:"fbd"},
    {title:"Newton’s Third Law", id:"N3"},
    {title:"Mass & Weight", id:"weight"},
    {title:"Contact Forces", id:"fric"},
    {title:"Dynamics in 2D", id:"dyn2d"},
    {title:"Dynamics Review", id:"ch3"},
]};

lesson.chap = "dyn";
lesson("inert", "1cZXh01761BYu-O-dgAFVfmI5L0zo-cbA", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Fleet_5_nations.jpg/640px-Fleet_5_nations.jpg", width:665}});
lesson("fbd", "1C7i049UnvhMTpHm1Ub13i3M6ckwkK3Fd", {img:{src:"dyn/img/fbd.png", width:270}});
lesson("N3", "1vINGzITSX-dakKHhQqbW7u_4anEZVoMC", {vid:"kKKM8Y-u7ds"}, /*{img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Soyuz_TMA-5_launch.jpg/308px-Soyuz_TMA-5_launch.jpg", width:260}}*/);
lesson("weight", "15s-hChBXekEegTLpc_HQWJstdhSO1qQW", {vid:"KDp1tiUsZw8"})[0].icons.push(
    {text:"Lab Handout", icon:"gdrv", url:"1PPUAbTJFc7uMWMng5TnKYkPwzPKXjf1a"});
lesson("fric", "1exMpTCd0HriDZcrKiT3SJpq_dN4zrAu4", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/f/f7/Friction_Animation_2_Blocks.gif", width:540}, link:"https://commons.wikimedia.org/wiki/File:Friction_Animation_2_Blocks.gif"})[0].icons.push(
    {text:"Lab Handout", icon:"gdrv", url:"1_rf0fmcl90UZc-fUb8WEasw7dOpYBIwH"});
lesson("dyn2d", "1N6jN2w_YAiSvQUUEuDltSW9LFm_H_9EK", {img:{src:"", width:405}});
