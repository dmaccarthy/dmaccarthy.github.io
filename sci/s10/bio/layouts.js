let bio = {title:"Unit C: Biology", show: "2024.7", id:"bio", icon:"leaf", menu:[
    {title:"Part 1: Cell Theory", id:"cells", menu:[
        {title:"Microscopes", id:"micro"},
        {title:"Cell Theory", id:"cell"},
        {title:"Organelles", id:"org"},
    ]},
    {title:"Part 2: Membranes & Transport", id:"membrane", menu:[
        {title:"Biological Membranes", id:"fm"},
        {title:"Passive Transport", id:"ptr"},
        {title:"Active Transport", id:"atr"},
    ]},
    {title:"Part 3: Plant Systems", id:"plant", menu:[
        {title:"Cell Specialization", id:"spec"},
        {title:"Photosynthesis", id:"photo"},
        {title:"Gas Exchange", id:"gas"},
        {title:"Water Transport", id:"wtr"},
        {title:"Plant Control Systems", id:"tropism"},
    ]},
]};

lesson.chap = "bio";

layout.bio = [{icons:[
    {text:"Stem Cell Research", icon:"gdoc", url:"1NkfJkyPolerVB0NEKjiCRKfAJmsZFRr0x1UzECRkmEM"},
    {text:"Unit Review", icon:"gdrv", url:"1z0U7kbaxfb9iQECdh-IBjH6c5vXqp6Uj"},
    {text:"Answer Key", show:"2023.5.29.14", icon:"gdrv", url:"1nZa7aCmwsRo0DZW-Njr2ayJMngGCBRLN"},
]}, 0, 1];

// Part 3

tmp = lesson("spec", "1oNMFpan9wiwtadgfMTaOqAOgZH1wmWd4", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Red_maple_leaf_in_autumn.jpg/537px-Red_maple_leaf_in_autumn.jpg", width:453}})[0].icons;
tmp.splice(0, 1);
tmp.push({text:"Leaf Lab", icon:"gdrv", url:"12gZT11yzKfyBd_23VatvBFbIRc1GtYVw"});

tmp = lesson("photo", "1VY5iblPZv3Fk2GX02ckVjZ-oo3QYNQbq", {vid:"#PLpVmtCaB-lyl-3YflYKGbMkgGYSwAfIdd"})[0].icons;
tmp[0] = {text:"Lesson Notes", icon:"note", url:"https://docs.google.com/presentation/d/11zl5GF0VgrNojVPIWGbLGaerb42djfIATyvtBpJHvZI"};
tmp.push({text:"Lab Handout", icon:"gdrv", url:"1JdKcgfe-knySlX8x76cCMSDrBzr7RiNm"});

tmp = lesson("gas", "18Y5d6zZrawvYZu2TRPifI0lFROnskMi3", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Green_leaf_for_texture.jpg/640px-Green_leaf_for_texture.jpg", width:540}})[0].icons;
tmp[0] = {text:"Lesson Notes", icon:"note", url:"https://docs.google.com/presentation/d/1A1nqaSPSjbQia9YlNB74RixvCHGjlDiR63lBZTI7QiE"};

tmp = lesson("wtr", "1NsoqmrMf81B7y35au1FPISouvPtpy0Wt", {vid:"h9oDTMXM7M8"})[0].icons;
tmp[0] = {text:"Lesson Notes", icon:"note", url:"https://docs.google.com/presentation/d/1T9swb7XJxenjxa-MA_6nOoZTwtLmYIalZnjREZ3_4Ss"};

tmp = lesson("tropism", "1C2rZ8QlWkFTnP5K8PuCnQBdQdCxu2vnG", {vid:"#PLpVmtCaB-lylU4P1GdPb8b-zDbwUcvGCf"})[0].icons;
tmp[0] = {text:"Lesson Notes", icon:"note", url:"https://docs.google.com/presentation/d/1NxKWWQRXaY2yZxrAL3EYZUzBpLXKTDoEeGHjIxlN32g"};

// Part 2

lesson("fm", "1b-Sayr3hmBxi0s5G2aLzOXr-l4RhHaDq", {vid:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN"})[0].icons.splice(0, 1);
lesson("ptr", "10L1w5bugd4EK67BX1-d3KP9OjeYCgk1B", {vid:"Ksnu4BWkJAY"});
lesson("atr", "1Afc6VxCHDjfS6iWixgSnjNvb1oGcC740", {vid:"Ptmlvtei8hw"});

// Part 1

lesson("micro", "1atUAObI_QFth2B5WFuOAnYKUFaUsrX3t", {vid:"tVcEEw6qbBQ"})[0].icons.push(
    {text:"Lab Handout", icon:"gdrv", url:"1hB1THaL5OKbtmj-wrpERf6wgQfGlmvkC"}
);
lesson("cell", "1c_CNWa8AITc5Pk9l-BvEIGWeasZtoVeq", {img:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Angiosperm_Morphology_Peltate_Trichome_in_Abaxial_Epidermis_of_Ligustrum_%2836198189074%29.jpg/800px-Angiosperm_Morphology_Peltate_Trichome_in_Abaxial_Epidermis_of_Ligustrum_%2836198189074%29.jpg", width:718}});

layout.org = [
    {icons:[
        {icon:"gdrv", text:"Assignment", url:"1aP2Ix8y9mE_A2ToPPvaRikpC9FepDj6Z"},
        {icon:"gdrv", show:"2023.5.11.12", text:"Answer Key", url:"1XNulD_ZUD7sPPgtoxOIZ-2Q9T7kYnEOb"},
        {text:"Lab Handout", icon:"gdrv", url:"1bQ4eKfffbRP-kIU3T36OPt8zdCrQFSB9"},
        // {icon:"note", text:"Lesson Notes", url:"bio/.html"},
        // {key:"bio/"},
    ]},
    {vid:"8IlzKri08kk"}, 1
];
