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
    {title:"Part 2: Compounds", id:"compound", menu:[
        {title:"Binary Ionic Compounds", id:"ionic"},
        {title:"Molecular Compounds", id:"molec"},
        {title:"Polyatomic Ions & Solubility", id:"poly"},
        {title:"Acids & Bases", id:"acid"},
        {title:"Properties of Water", id:"water"},
        {title:"Compounds Review", id:"comp_rev"},
    ]},
    {title:"Part 3: Reactions", id:"reaction", menu:[
        {title:"Chemical Reactions", id:"rxn"},
        {title:"Formation & Decomposition", id:"rxn_fd"},
        {title:"Single & Double Replacement", id:"rxn_sd"},
        {title:"Hydrocarbon Combustion", id:"rxn_c"},
        {title:"Scientific Notation", id:"sciNot"},
        {title:"Molar Mass", id:"mole"},
    ]},
    {title:"Unit Review", id:"chem_rev"}
]};

lesson.chap = "chem";

layout.chem_rev = [{icons:[
    {icon:"gdrv", text:"Assignment", url:"1L7QCik7ThRSG7uBUSi7Z42MwsiUyd9Z7"},
    {icon:"gdrv", text:"Answer Key", show:"2023.7", url:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},
]}, {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gas_stove_burner_flame.jpg/800px-Gas_stove_burner_flame.jpg", style:"width:540px;height:405px;object-fit:cover"}}, 1];

// Part 3: Reactions

lesson("rxn", "15Xa_SKGBfi7B8MK7Yu9y77KdjlwAcB9m", {vid:"eNsVaUCzvLA"})[0].icons.push(
    {icon:"gdrv", text:"Lab Handout", url:"1uT5hoiboL7d7_AKExX-9qpYuZXXsGZBJ"}    
);
lesson("rxn_fd", "1cLM_ohdfG7wQFTSyqVOhoLtFq4cm1phu", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ford_Taurus_Rust.jpg/640px-Ford_Taurus_Rust.jpg", width:540}});
lesson("rxn_sd", "1Pwfjh6e8CmT7LymBABlpL4Rd0B_1IhNe", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Precipitate_of_HAuCl4_%2B_NaOH.jpg/524px-Precipitate_of_HAuCl4_%2B_NaOH.jpg", width:442}});
lesson("rxn_c", "1m0haYxXS3wrYfznQWD10557Ds46wDBl9", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gas_stove_burner_flame.jpg/800px-Gas_stove_burner_flame.jpg", style:"width:540px;height:405px;object-fit:cover"}});
lesson("sciNot", "1PMCcqP2ioyC_HYrGxAXDtCubwkLo4asq", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Andromeeda1.jpg/640px-Andromeeda1.jpg", width:604}});
lesson("mole", "10hs-zakljzCXkFoFu0Tmiuo_J7UvnJWZ", {img:{src:"chem/img/balance.jpg", width:461}});

// Part 2: Compounds

lesson("ionic", "1ngNJIFv1GXXhg8gZQiFBLxYwC4yHOHme", {vid:"#PLpVmtCaB-lynZX8Pn3MyzoBCoGjUyNRUi"})[0].icons.push(
    {icon:"gdrv", text:"Lab Handout", url:"16UmZJn9xumq8k2S2uR1Nb7FzlsUFkI9H"}    
);
lesson("molec", "1zBGawUGNqHVnDipMt72pLBbxjzykblDz", {vid:"#PLpVmtCaB-lymbqbJT3eh6yoIccoR1wAAm"});
lesson("poly", "1O1PJIPG7dVkcLP7BwHhZbla2GUTnqhNO", {vid:"#PLpVmtCaB-lymw8n95Vk-jxco6DuI0TqC_"});
lesson("acid", "1aCWr_vgqf_S9HTu3pRKUsVd6oBqqh3r9", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Citrus_x_limon%2C_lemon_on_tree%2C_Co%C3%ADn%2C_Spain.jpg/640px-Citrus_x_limon%2C_lemon_on_tree%2C_Co%C3%ADn%2C_Spain.jpg", width:540}})[0].icons.push(
    {icon:"gdrv", text:"Lab Handout", url:"181mzsLvBms8hrKoLVFEZ_C0aA4fSYgjD"}
);
lesson("water", "1Wqy3DvoCYWjc0PPFKPgRBqAP3lDz3Nq_", {vid:"HVT3Y3_gHGg"});

layout.comp_rev = [{icons:[
    {icon:"gdrv", text:"Compounds Review", url:"1er-RIbhabNosb6_ZH9HZv7ekNGwspIBD"},
    {icon:"gdrv", text:"Answer Key", url:"1Ue7Q5rct2HmJfJB-GAY4Rwp2BLNBtyTI"},
]}, 0, 1];

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
