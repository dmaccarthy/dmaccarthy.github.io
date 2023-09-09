let grav = {title:"Chapter 4: Universal Gravitation", id:"grav", icon:"", menu:[
    {title:"Universal Gravitation", id:"ugrav"},
    {title:"Cavendish Experiment", id:"cav"},
    {title:"Gravitational Fields", id:"field"},
    {title:"Circular Orbital Motion", id:"orbit"},
    {title:"Universal Gravitation Review", id:"ch4"},
]};

lesson.chap = "grav";

lesson("ugrav", "17WA9cS2-1lmaiFaKzTv61k8vDcBoerzo", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/d/d1/%C4%8Cierna_diera.jpg", width:540}});
lesson("cav", "1NlQTcj8mGeXtUXojhZmMUEcHxhHBW_On", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/d/dd/Cavendish_Experiment.png", width:542}});
tmp = lesson("field", "1GQ-aU9jZYHAPkNTItEAt6C1VXhI0onBy", {vid:"MTY1Kje0yLg"});
tmp.splice(0, 0, {icons:[
    {text:"Visualizing Gravity", icon:"gdrv", url:"1A3NFXDw2UXmzMJ-Me9D7YrPqaa4MNJP9"},    
    {text:"Falstad Applet", icon:"link", url:"https://falstad.com/vector2de/vector2de.html?f=InverseSquaredRadial&fc=Floor%3A%20field%20magnitude&fl=Overlay%3A%20equipotentials&d=partsvel&m=Mouse%20%3D%20Adjust%20Angle&st=1&pc=500&hs=40&ft=true&rx=63&ry=0&rz=0&zm=1.2"},
    {text:"PhET Applet", icon:"link", url:"https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html"},
    {text:"Desmos Applet", icon:"link", url:"https://www.desmos.com/calculator/br0ig8pci1"},
]});
lesson("orbit", "1ewf8n-dT6H1mQW4mq7cUZkHUDCcFUG-a", {iframe:{src:"https://sci.davidmaccarthy.repl.co/applet/helio.html?iframe", width:405, height:405, frameborder:0}});

// tmp.push({text:"Data Analysis", icon:"gdrv", url:"1Rff3WroKVT5gD9XZBAFFxFcrkeiVlaWp"});

// layout.orbit = [uc, 1];
