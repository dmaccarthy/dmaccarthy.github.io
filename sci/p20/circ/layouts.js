let circ = {title:"Chapter 5: Circular & Planetary Motion", id:"circ", icon:"midway", menu:[
    {title:"Uniform Circular Motion", id:"ucm"},
    {title:"Centripetal Acceleration", id:"ac"},
    {title:"Apparent Weight", id:"appWt"},
    {title:"Planetary Motion (Kepler’s Laws)", id:"kepler"},
    {title:"Circular & Planetary Motion Review", id:"ch5"},
]};

lesson.chap = "circ";
lesson("ucm", "1AHaxwz65xr5ieHivmF8XhaqMIy51UILq", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Carousel_%28sarajevo%29.jpg/640px-Carousel_%28sarajevo%29.jpg", width:540}});
lesson("ac", "10yPUEu0yyPawzCQE9UZAjKUaTvNsMvVY", {vid:"fAqa982j1a0"})[0].icons.push(
    {text:"Lab Handout", icon:"gdrv", url:"1kOy7lhS9UTbgGRYY1CxDo-KyKKk_YnrE"}
);
lesson("appWt", "143CUgYGws15A41UC8xX1v-XRF5axor0h", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Looping_Star%2C_Vid%C3%A1mpark_1.jpg/360px-Looping_Star%2C_Vid%C3%A1mpark_1.jpg", width:304}});

tmp = lesson("kepler", "1adtkPpamd7y65akhn8RkzYousXnqVS_6", {vid:"1E3vlf-Esqk"})[0].icons;
tmp.push({text:"Data Analysis", icon:"gdrv", url:"1Rff3WroKVT5gD9XZBAFFxFcrkeiVlaWp"});
tmp.splice(1, 0, {text:"Heliocentric Model", icon:"link", url:"../applet/helio.html"});

// {src:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Solar_system_Painting.jpg/640px-Solar_system_Painting.jpg", width:645}

// layout. = [uc, 1];
