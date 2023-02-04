// Math & Science 10 Review

let s10 = {title:"Science & Math 10 Review", id:"s10", icon:"trig", menu:[
    {title:"Experiment Design", id:"expDes"},
    {title:"Algebra", id:"algebra"},
    {title:"Scientific Notation", id:"sciNot"},
    {title:"SI Units", id:"si"},
    {title:"Scatter Plots & Slope", id:"scatter"},
    {title:"Trigonometry", id:"trig"},
]};

lesson.chap = "skill";

lesson("expDes", "15lujphlTWcHofXzm2VdvAHELEYj09IvZ", {vid:"x2606GQmDqY"})[0].icons.push(
    {icon:"gdrv", text:"Helicopter Lab", url:"1Bv7BOYwceaDLmzP2L2DGDyUoGm3uEKG4"}
);

lesson("algebra", "10tHFGoYWPkfpDiAjTpstfZ2OSVTm7c9X", {vid:"nUw-hB4m03I"})[0].icons.splice(1, 0,
    {icon:"gdrv", text:"Formative Review", url:"1NRu6srxS8rGsMkA0iYxNeV6leS5q38IA"},
);

lesson("sciNot", "1liWcVf-XYuY7yUnDuTxoyOALeSeVKTB1", {vid:"bXkewQ7WEdI?start=25"});
lesson("si", "1X_OvYBNAv1kSw-ReTRTJTeWFT4hj03-m", {vid:"s9s8IreslFw?start=80&end=490"});
lesson("scatter", "1qUD-eR8r8y0AZU3_q7Qa7LmYuolpfOzP", {desmos:"atvylhkqe5", width:720, "data-aspect":"16/9"});
lesson("trig", "1dY1oQV_zrJTrfQsb7-iPQh0dYwgZm2zN", {html:"$$Hyp^2 = Opp^2 + Adj^2$$ $$\\sin\\theta = \\frac{Opp}{Hyp}$$ $$\\cos\\theta = \\frac{Adj}{Hyp}$$  $$\\tan\\theta = \\frac{Opp}{Adj}$$"});


// Data Analysis

let da = {title:"Data Analysis", id:"data", icon:"da", menu:[
    {title:"Transforming Power Data", id:"pwr"},
]};

lesson("pwr", "#?#", {vid:"M_tUXprwPXs"});
// lesson("", "", {vid:""});
