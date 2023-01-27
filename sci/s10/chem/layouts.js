let chem = {title:"Unit A: Chemistry", id:"chem", menu:[
    {title:"Part 1: Matter", id:"matter", menu:[
        {title:"WHMIS / Lab Safety", id:"whmis"},
        {title:"Experiment Design", id:"expDes"},
        {title:"Classifying Matter", id:"classify"},
        {title:"Atomic Theory", id:"atomic"},
        {title:"Isotopes & Ions", id:"iso"},
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

layout.chem_rev = [{icons:[
    {icon:"gdrv", text:"Antacids Project", url:"11UBjbZNTnvHZEb8_JpBXj1X2_jqBJt-w"},    
    {icon:"gdrv", text:"Assignment", url:"1X861gwjsc5jhm-0KnWObdV4ApDQjwM5S"},
    {icon:"gdrv", text:"Answer Key", show:"2023.7", url:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},
]}, 0];

layout.whmis = [
    {icons:[
        {icon:"science", text:"WHMIS 2015", url:"https://www.ccohs.ca/oshanswers/chemicals/whmis_ghs/pictograms.html#wb-auto-5"},
        {icon:"science", text:"WHMIS 1988", url:"https://www.ccohs.ca/oshanswers/legisl/msds_lab.html#wb-auto-15"},
        {icon:"note", text:"Lesson Notes", url:"chem/whmis.html"},
        {icon:"gdrv", text:"Assignment", url:"14wdP3YUoyp57uUFT3-IsTCiqhIyyEsxH"},
    ]},
    {img:{src:"https://sbt.blob.core.windows.net/storyboards/oliversmith/lab-safety.png"}},
    1
];

layout.expDes = [
    {icons:[
        {icon:"note", text:"Lesson Notes", url:"chem/expDes.html"},
        {icon:"gdrv", text:"Lab Handout", url:"1D1uE5sm9ZaBew958QC88CKhzhc4WA5H-"},
    ]},
    {vid:"x2606GQmDqY"}, 1
];

layout.classify = [
    {icons:[
        {icon:"note", text:"Lesson Notes", url:"chem/matter.html"},
        {icon:"gdrv", text:"Assignment", url:"1OtFHEIrGpSYUEfQ-BbS4Cx34S1aW_zih"},
        {key:"chem/matter"},
    ]}, 1
];

layout.atomic = [
    {icons:[
        {icon:"note", text:"Lesson Notes", url:"chem/atom.html"},
        {icon:"gdrv", text:"Assignment", url:"1B4YSICICgk6GCp7rmpIJSWdzysGCxfk6"},
        {icon:"gdrv", text:"Answer Key", show:"2023.7", url:"1XDp9oNYsFG59WSe8OOKwKvzB9m0XgFi1"},
    ]},
    {vid:"ogPNZ_MXksM", aspect:"4/3"}, 1
];


layout.ionic = [
    {icons:[
        {icon:"note", text:"Lesson Notes", url:"chem/ionic.html"},
        {icon:"gdrv", text:"Assignment", url:"1ngNJIFv1GXXhg8gZQiFBLxYwC4yHOHme"},
        {key:"chem/ionic"},
    ]}, 1
];