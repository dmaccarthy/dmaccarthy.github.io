let chem = {title:"Unit A: Chemistry", id:"chem", menu:[
    {title:"Part 1: Matter", id:"matter", menu:[
        {title:"WHMIS / Lab Safety", id:"whmis"},
        {title:"Experiment Design", id:"expDes"},
        {title:"Classifying Matter", id:"classify"},
        {title:"Atomic Theory", id:"atomic"},
        {title:"Isotopes & Ions", id:"isotope"},
        {title:"Bohr Model (Energy Levels)", id:"bohr"},
        {title:"Periodic Table & Dot Diagrams", id:"dot"},
    ]},
    {title:"Part 2: Compounds", show:"2023.7", id:"compound", menu:[
        {title:"Binary Ionic Compounds", id:"ionic"},
        {title:"Molecular Compounds", id:"molec"},
        {title:"Polyatomic Ions & Solubility", id:"poly"},
        {title:"Acids & Bases", id:"acid"},
        {title:"Properties of Water", id:"water"},
    ]},
    {title:"Part 3: Reactions", show:"2023.7", id:"reaction", menu:[
        {title:"Chemical Reactions", id:"rxn"},
        {title:"Formation & Decomposition", id:"rxn_fd"},
        {title:"Single & Double Replacement", id:"rxn_sd"},
        {title:"Hydrocarbon Combustion", id:"rxn_c"},
        {title:"Molar Mass", id:"mole"},
    ]},
    {title:"Unit Review", show:"2023.7", id:"chem_rev", menu:[
        
    ]},
]};

lesson.chap = "chem";

layout.chem_rev = [{icons:[
    {icon:"gdrv", text:"Antacids Project", url:"11UBjbZNTnvHZEb8_JpBXj1X2_jqBJt-w"},    
    {icon:"gdrv", text:"Assignment", url:"1X861gwjsc5jhm-0KnWObdV4ApDQjwM5S"},
    {icon:"gdrv", text:"Answer Key", show:"2023.7", url:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},
]}, 0];

// Part 1: Matter

_l = lesson("whmis", "14wdP3YUoyp57uUFT3-IsTCiqhIyyEsxH", {img:{src:"https://sbt.blob.core.windows.net/storyboards/oliversmith/lab-safety.png", width:"697"}});
_l[0].icons.splice(0, 0,
    {icon:"science", text:"WHMIS 2015", url:"https://www.ccohs.ca/oshanswers/chemicals/whmis_ghs/pictograms.html#wb-auto-5"},
    {icon:"science", text:"WHMIS 1988", url:"https://www.ccohs.ca/oshanswers/legisl/msds_lab.html#wb-auto-15"}
);

_l = lesson("expDes", "1D1uE5sm9ZaBew958QC88CKhzhc4WA5H-", {vid:"x2606GQmDqY"});
_l[0].icons[1].text = "Lab Handout";
_l[0].icons.pop(); // No key!

lesson("classify", "1OtFHEIrGpSYUEfQ-BbS4Cx34S1aW_zih", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Water_drop_001.jpg/320px-Water_drop_001.jpg", width:"608"}});

lesson("atomic", "1B4YSICICgk6GCp7rmpIJSWdzysGCxfk6", {vid:"ogPNZ_MXksM", aspect:"4/3"})[0].icons[2] =
    {icon:"gdrv", text:"Answer Key", show:"2023.2.6.12", url:"1XDp9oNYsFG59WSe8OOKwKvzB9m0XgFi1"};

lesson("isotope", "1bLGfc3IslpSN-5xYvkCK_qz7AjTZ4miO", {img:{src:"https://static.simpsonswiki.com/images/thumb/c/cd/I%27m_Just_a_Girl_Who_Can%27t_Say_D%27oh_billboard_gag.png/790px-I%27m_Just_a_Girl_Who_Can%27t_Say_D%27oh_billboard_gag.png", width:"533"}});
lesson("bohr", "1Zqoen7f551BpjqJctTSpQ-OO_BPvA793", {vid:"Vd5duzNtBuI"});
lesson("dot", "1FyV47UafHRW3bPBemF7-5o2_z61xEby8", {img:{src:"chem/img/pt.png", width:"724"}})[0].icons.push(
    {icon:"gdrv", text:"Lab Handout", url:"1JNRmuk-naEjNIAOKpzfoLdkiKE94pVby"}
);

// Part 2: Compounds

lesson("ionic", "1ngNJIFv1GXXhg8gZQiFBLxYwC4yHOHme", );
// lesson("", "", );
// lesson("", "", );

// Part 3: Reactions

// lesson("", "", );
// lesson("", "", );
