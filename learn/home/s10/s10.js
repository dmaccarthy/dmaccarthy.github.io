let s10 = {title:"Science 10", id:"s10",
    cal:"24128d37", grc:"u/0/w/NDE0MTA2OTM3Mzha",
    // cal:{2:"24128d37", 4:""}, grc:{2:"u/0/w/NDE0MTA2OTM3Mzha", 4:""},
    menu:[
    {title:"Unit 1 - Chemistry", id:"chem", menu:[
        {title:"Lab Safety", slide:"chem/safety", separator:true},
        {title:"Classifying Matter", slide:"chem/matter"},
        {title:"Atomic Theory", slide:"chem/atomic"},
        {title:"Isotopes & Ions", slide:"chem/isotope"},
        {title:"Bohr Model (Energy Levels)", slide:"chem/bohr"},
        {title:"Periodic Table & Dot Diagrams", slide:"chem/dot"},

        {title:"Ionic Compounds", slide:"chem/ionic", separator:true},
        {title:"Molecular Compounds", slide:"chem/molecular"},
        {title:"Polyatomic Ions / Solubility", slide:"chem/poly"},
        {title:"Acids & Bases", slide:"chem/acid"},
        {title:"Properties of Water", slide:"chem/water"},

        {title:"Chemical Reactions", slide:"chem/rxn", separator:true},
        {title:"Molar Mass", slide:"chem/mole"},
    ]},
    {title:"Unit 2 - Physics", id:"phys", menu:[
        {title:"Scientific Notation", slide:"phys/sci_not"},
        {title:"Système Internationale (SI) Units", slide:"phys/si"}, // Significant Digits
        {title:"Scientific Method", slide:"phys/method"},
        {title:"Graphing Data", slide:"phys/graph"},

        {title:"Displacement", slide:"phys/displ", separator:true},
        {title:"Velocity", slide:"phys/vel"},
        {title:"Acceleration", slide:"phys/accel"},

        {title:"Mechanical Energy", slide:"phys/mech", separator:true},
        {title:"Energy Transformations", slide:"phys/transform"},
        {title:"Work & Energy", slide:"phys/work"},

        {title:"Theories of Heat", slide:"phys/heat", separator:true},
        {title:"Efficiency", slide:"phys/effic"},
    ]},
    {title:"Unit 3 - Biology", id:"bio", menu:[
        {title:"Microscopes", open:"https://docs.google.com/presentation/d/1wKI1blXJukMRBUC7b1B4PhBrgXfBZs7KKx_DVFRf-9M/"},
        {title:"Cell Theory", open:"https://docs.google.com/presentation/d/1yg_Q804TGQauW9EzNnbmJZlHkK8nR0qiIp5iaESYRBA"},
        {title:"Organelles", slide:"bio/organelle"},

        {title:"Membranes", slide:"bio/memb", separator:true},
        {title:"Active & Passive Transport", open:"https://docs.google.com/presentation/d/1qJYqVyhLdOpIwEF8qv0EsbnYO6dRbofZvqICN0g568g/"},
        {title:"Cell Size", js:"uc()", slidex:"bio/size"},

        {title:"Photosynthesis", js:"uc()", slidex:"bio/photo", separator:true},
        {title:"Gas Exhange", js:"uc()", slidex:"bio/gas"},
        {title:"Water Transport", js:"uc()", slidex:"bio/water"},
        {title:"Tropisms", js:"uc()", slidex:"bio/trop"},
        {title:"Stem Cells", js:"uc()", slidex:"bio/stem"},
    ]},
    {title:"Unit 4 - Climate", id:"clim", menu:[
        {title:"Heat Capacity", slide:"clim/heatcap"},
        {title:"Latent Heat", slide:"clim/latent"},
        // {title:"Modern Energy Sources", slide:"clim/"},
        {title:"Heat Transfer", slide:"clim/transfer"},
        {title:"Energy Budget / Greenhouse Effect", slide:"clim/budget"},

        // {title:"Climate Models", js:"uc()", slidex:"clim/"},
        {title:"Climatographs", js:"uc()", slidex:"clim/", separator:true},
        {title:"Biomes", js:"uc()", slidex:"clim/"},
    ]},
    {title:"Documents & Links", id:"link10", menu:[
        {title:"Salisbury Composite", open:"https://salcomp.ca"},
        {title:"Program of Studies", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", open:"https://scienceoutlines.davidmaccarthy.repl.co/?s10"},
        // {title:"Video", youtube:{list:"PLpVmtCaB-lykMzpjcg79la6effekhfsJq"}},
    ]},

]};

let home = {title:"Mr. Mac's Home", id:"home", menu:[s10]};
slides += "s10/";