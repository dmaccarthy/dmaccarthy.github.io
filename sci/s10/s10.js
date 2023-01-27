// , vid:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN"

let clim = {title:"Unit D: Heat & Climate", id:"clim", icon:"earth", menu:[
    // {title:"Assignment Booklet", gdrv:"1WlpJ3W-AIBaeofelJN23NDDWMdUQAyZZ"},
    {title:"Part 1: Climate Science", id:"climSci", icon:"earth", menu:[
        {title:"Theories of Heat", id:"heat", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/heat.html"},
            {title:"Review & Practice", id:"heat-rp", ajax:"clim/assign/heat.htm", menu:[]},
        ]},
        {title:"Heat Capacity", id:"heatcap", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/heatcap.html"},
            {title:"Review & Practice", id:"heatcap-rp", ajax:"clim/assign/heatcap.htm", menu:[]},
        ]},
        {title:"Latent Heat", id:"latent", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/latent.html"},
            {title:"Review & Practice", id:"latent-rp", ajax:"clim/assign/latent.htm", menu:[]},            
        ]},
        {title:"Heat Transfer", id:"transfer", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/transfer.html"},
            {title:"Review & Practice", id:"transfer-rp", ajax:"clim/assign/transfer.htm", menu:[]},
        ]},
        {title:"Earth’s Energy Budget", id:"budget", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/budget.html"},
            {title:"Review & Practice", id:"budget-rp", ajax:"clim/assign/budget.htm", menu:[]},
        ]},
        //https://docs.google.com/document/d/1GmAjjrBOW5aakCV5Y8AM6CtBUNiBkbw_BVwfoarlmCw/edit#heading=h.1y7n6h55na6z
        {title:"Climate Models", gdoc:"1GmAjjrBOW5aakCV5Y8AM6CtBUNiBkbw_BVwfoarlmCw"},
    ]},
    {title:"Part 2: Biomes & Climate Change", id:"clch", show:"2023.1", icon:"earth", menu:[
        {title:"Climatographs", id:"cg", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/climatograph.html"},
            {title:"Assignment Handout", gdrv:"12ba8JT4hLOjHO9hej_ZCFvqftL3bZxnh"},
        ]},
        {title:"Climate Research Project", gdoc:"1fF5E7tykIHYTwe9aly5KvT3hVwTiu6cYVY-6RpbGFBs"},
        {title:"Biomes & Adaptations", id:"biome", icon:1, menu:[
            {title:"Lesson Notes", open:"clim/biome.html"},
            {title:"Assignment Handout", gdrv:"1Fs96fVv9Nii1oXzwu_cgvpBhLvNlBFA0"},            
            {title:"Polar Bears Video", icon:"video", open:"https://www.cbc.ca/player/play/1630724983"},
        ]},
        {title:"Natural Climate Change", id:"ncc", icon:1, menu:[
            {title:"Review & Practice", id:"ncc-rp", ajax:"clim/assign/ncc.htm", menu:[]},
        ]},
    ]},
]};

let bio = {title:"Unit C: Biology", id:"bio", icon:"leaf", menu:[
    // {title:"Assignment Booklet", gdrv:"1ewtwqCG3yx79b6nmadMONLPDUNaI2vdM"},
    {title:"Part 1: Cells", id:"cell", icon:"leaf", menu:[
        {title:"Microscopes", icon:1, id:"micro", menu:[
            {title:"Lesson Notes", icon:"gdrv", open:"https://docs.google.com/presentation/d/1wKI1blXJukMRBUC7b1B4PhBrgXfBZs7KKx_DVFRf-9M"},
            // {title:"Lesson Notes", open:"bio/micro.html"},
            {title:"Review & Practice", id:"cell-rp", ajax:"bio/assign/micro.htm", menu:[]},
            {title:"Microscope Lab", gdrv:"1uMygwun4DCPu3yESLoDztbDrHPsxZ_dc"},
        ]},
        {title:"Cell Theory", icon:1, id:"ct", menu:[
            // {title:"Lesson Notes", icon:"gdrv", open:"https://docs.google.com/presentation/d/1yg_Q804TGQauW9EzNnbmJZlHkK8nR0qiIp5iaESYRBA"},
            {title:"Lesson Notes", open:"bio/cell.html"},
            {title:"Review & Practice", id:"micro-rp", ajax:"bio/assign/cell.htm", menu:[]},
        ]},
        {title:"Organelles", icon:1, id:"org", menu:[
            {title:"Lesson Notes", open:"bio/org.html"},
            {title:"Assignment Handout", gdrv:"17RHZ30dkl6tfjhiAufBPBzQ8wE80PlhZ"},
            {title:"Observing the Cell Lab", gdrv:"1v2NQhdqaG5uE2hNDjzxmEhvwbCSTY1VO"},
        ]},
        {title:"Cell Analogy / Model", gdrv:"1OUTokvdkVlela_raYkZ5GipWo2Ks7Gg_"},
    ]},
    {title:"Part 2: Membranes & Transport", id:"membr", icon:"leaf", menu:[
        {title:"Biological Membranes", icon:1, id:"fm", vid:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN", menu:[
            {title:"Review & Practice", id:"fm-rp", ajax:"bio/assign/fm.htm", menu:[]},
        ]},
        {title:"Passive Transport", icon:1, id:"ptr", vid:"Ptmlvtei8hw", menu:[
            {title:"Lesson Notes", open:"bio/ptr.html"},
            {title:"Review & Practice", id:"ptr-rp", ajax:"bio/assign/ptr.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"19t9Ud0fWTPNHq91uUfzHW4vLQJ9OEehp"},
            {title:"Assignment Solutions", show:"2022.11.25.12.00", gdrv:"1-9HXwNPldvaBWLDx-chsnDBOi0XMhWtW/"},
        ]},
        {title:"Active Transport", icon:1, id:"atr", vid:"Ptmlvtei8hw", menu:[
            {title:"Lesson Notes", open:"bio/atr.html"},
            {title:"Review & Practice", id:"atr-rp", ajax:"bio/assign/atr.htm", menu:[]},
        ]},
    ]},
    {title:"Part 3: Plant Systems", id:"plants", icon:"leaf", menu:[
        {title:"Cell Size Handout", gdrv:"1CjfLLnQjFiD5is2vvmGU59zxy5J11dfG"},
        {title:"Photosynthesis", id:"photo", icon:1, vid:"#PLpVmtCaB-lyl-3YflYKGbMkgGYSwAfIdd", menu:[
            // {title:"Lesson Notes", open:"bio/photo.html"},
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/11zl5GF0VgrNojVPIWGbLGaerb42djfIATyvtBpJHvZI"},
            {title:"Review & Practice", id:"photo-rp", ajax:"bio/assign/photo.htm", menu:[]},
            {title:"Leaf Lab", gdrv:"1XEoSmBcOAvTT6txCcdxcSYjin3aXjis0"},
        ]},
        {title:"Gas Exchange", id:"gas", icon:1, menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/1A1nqaSPSjbQia9YlNB74RixvCHGjlDiR63lBZTI7QiE"},
            {title:"Review & Practice", id:"gas-rp", ajax:"bio/assign/gas.htm", menu:[]},
        ]},
        {title:"Water Transport", id:"wtr", icon:1, vid:"h9oDTMXM7M8", menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/1T9swb7XJxenjxa-MA_6nOoZTwtLmYIalZnjREZ3_4Ss"},
            {title:"Review & Practice", id:"wtr-rp", ajax:"bio/assign/wtr.htm", menu:[]},
        ]},
        {title:"Aquatic Plants Lab", gdrv:"1pW0LS3i_NJRmDmPxVaWdqXUC-JUIjsMD"},
        {title:"Plant Control Systems (Tropisms)", id:"tropism", icon:"leaf", vid:"#PLpVmtCaB-lylU4P1GdPb8b-zDbwUcvGCf", menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/1NxKWWQRXaY2yZxrAL3EYZUzBpLXKTDoEeGHjIxlN32g"},
            {title:"Review & Practice", id:"tropism-rp", ajax:"bio/assign/tropism.htm", menu:[]},
        ]},
    ]},
    {title:"Stem Cell Research", gdoc:"1NkfJkyPolerVB0NEKjiCRKfAJmsZFRr0x1UzECRkmEM"},
    {title:"Biology Review", id:"revb", icon:"leaf", menu:[
        {title:"Assignment Handout", gdrv:"1RrtZTZn_WjtHq7lYGYoIci9W8mHQUYyV"},
        {title:"Answer Key", show:"2022.12.7.12.00", gdrv:"1A5nH2GaVEi-FBUTYAEUC6zXUPelwylnq"},
    ]},
]};

let phys = {title:"Unit B: Physics", id:"phys", icon:"rocket", menu:[
    // {title:"Assignment Booklet", gdrv:"1dKbreMxOXUs2u_TwsgtoqFPgQIS9PVAM"},
    // {title:"Science Skills", icon:"flask", menu:[]},
    {title:"Part 1: Science Skills & Motion", id:"p1", icon:"rocket", menu:[
        // {title:"Significant Digits", unavail:1, icon:1, open:"phys/sigdig.html"},
        {title:"Scientific Notation", id:"sciNot", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/sciNot.html"},
            {title:"Review & Practice", id:"sciNot-rp", ajax:"phys/assign/sciNot.htm", menu:[]},
        ]},
        {title:"SI Units", icon:1, id:"si", menu:[
            {title:"Lesson Notes", open:"phys/si.html"},
            {title:"Review & Practice", id:"si-rp", ajax:"phys/assign/si.htm", menu:[]},            
        ]},
        // {title:"Scientific Method", icon:1, open:"phys/sciMeth.html"},
        {title:"Graphing Data", id:"scatter", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/scatter.html"},
            {title:"Review & Practice", id:"scatter-rp", ajax:"phys/assign/scatter.htm", menu:[]},                        
            {title:"Assignment Handout", gdrv:"1OocOlfCpevWkVke-zUJHd6cfLQTDUEZ8"},
        ]},
        {title:"Displacement", id:"displ", icon:1, menu:[
            {title:"Kinematics (Motion) Lab", gdrv:"1sSre7Zf3TEng9bC6yFrQLRQCOI786rRM"},            
            {title:"Lesson Notes", open:"phys/displ.html"},
            {title:"Review", id:"displ-rp", ajax:"phys/assign/displ.htm", menu:[]},                        
            {title:"Assignment Handout", gdrv:"17Ovyqu2RzRBJXAvhXIgRzCkat6A9wksL"},
            {title:"Assignment Solutions", show:"2022.10.21.12.00", gdrv:"1ibOyPlj2OO3mb0cmy3g8Zo9Hvnt1n6NT"},
        ]},
        {title:"Velocity", id:"vel", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/vel.html"},
            {title:"Review", id:"vel-rp", ajax:"phys/assign/vel.htm", menu:[]},                        
            {title:"Assignment Handout", gdrv:"1V2YdSU_8Y-4RSRQ8U4TcYKdITrAUUvnT"},
            {title:"Assignment Solutions", show:"2022.10.24.12.00", gdrv:"1eplQRaG1v2c3_TCcivcD50_o3_pwWUAY"},
        ]},
        {title:"Acceleration", id:"accel", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/accel.html"},
            {title:"Review & Practice", id:"accel-rp", ajax:"phys/assign/accel.htm", menu:[]},
        ]},
    ]},
    {title:"Part 2: Mechanical Energy", id:"p2", icon:"rocket", menu:[
        {title:"Mechanical Energy", id:"mech", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/mech.html"},
            {title:"Review & Practice", id:"mech-rp", ajax:"phys/assign/mech.htm", menu:[]},
            {title:"Pendulum Energy Lab", gdrv:"172P9Mho1nPBk-7ZhI7iZuWpKVadIPuMr"},
        ]},
        {title:"Energy Transformations", id:"etr", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/Etransform.html"},
            {title:"Review & Practice", id:"etr-rp", ajax:"phys/assign/etr.htm", menu:[]},
        ]},
        {title:"Work & Energy", id:"work", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/work.html"},
            {title:"Review & Practice", id:"work-rp", ajax:"phys/assign/work.htm", menu:[]},
        ]},
        {title:"Efficiency", id:"eff", icon:1, menu:[
            {title:"Lesson Notes", open:"phys/eff.html"},
            {title:"Review & Practice", id:"eff-rp", ajax:"phys/assign/eff.htm", menu:[]},
            {title:"Energy Transforming Technologies", gdrv:"1rMOuLm4emO-j_mbX-57JWHcTK2Wi_XmT"},
            //
        ]},
        {title:"Unit Project", id:"", gdoc:"1Tzg2GicMO0712rPXkqi_1t_XOtFkVlLXMaNU86dIb18"},
    // ]},
    // {title:"Part 3: Thermodynamics", icon:"rocket", menu:[
        // {title:"Modern Energy Sources", icon:1, open:"phys/modsrc.html"},
    ]},
    {title:"Unit Review", id:"revp", icon:1, menu:[
        {title:"Assignment", gdrv:"1sW_0M6HozB6fB1FIFQWk8kN1BTXaO64i"},
        {title:"Answer Key", show:"2022.11.17", gdrv:"1IjzARdbPgoCzgC_DDM5pfC95PKm-U6To"},
    ]},
]};

let chem = {title:"Unit A: Chemistry", id:"chem", icon:"flask", menu:[
    // {title:"Assignment Booklet", gdrv:"1BH_QKnH_--Nkm69sG9joeWm-ZqM3lQGW"},
    {title:"Part 1: Matter", id:"c1", icon:"flask", menu:[
        {title:"Lab Safety / WHMIS", id:"whmis", icon:1, menu:[
            {title:"WHMIS 2015", icon:"ccohs", open:"https://www.ccohs.ca/oshanswers/chemicals/whmis_ghs/pictograms.html#wb-auto-5"},
            {title:"WHMIS 1988", icon:"ccohs", open:"https://www.ccohs.ca/oshanswers/legisl/msds_lab.html#wb-auto-15"},
            {title:"Lesson Notes", open:"chem/whmis.html"},
            {title:"Assignment Handout", gdrv:"19jhr02KoO0mgCJWH_vkc7J-RD2S2gUBW"},
            {title:"Review & Practice", id:"whmis-rp", ajax:"chem/assign/whmis.htm", menu:[]},
        ]},
        {title:"Experiment Design", id:"expDes", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/expDes.html"},
            {title:"Lab Handout", gdrv:"1xChBGgOjqwolkSPCZAo42c-CqIdGMr8b"},
        ]},
        {title:"Classifying Matter", id:"matter", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/matter.html"},
            {title:"Review & Practice", id:"matter-rp", ajax:"chem/assign/matter.htm", menu:[]},
        ]},
        {title:"Atomic Theory", id: "atomic", icon:1, vid:"ogPNZ_MXksM", aspect:"4/3", menu:[
            {title:"Lesson Notes", open:"chem/atom.html"},
            {title:"Assignment Handout", gdrv:"1fRKyEaIaaT4zFDXfT4exwJeppPl2tG0G"},
            {title:"Assignment Solutions", show:"2022.9.6.13.00", gdrv:"1naRa3xVxq3spruJniMfbK1Gy0M0TfhvZ"},
        ]},
        {title:"Isotopes &amp; Ions", id: "isotope", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/isotope.html"},
            {title:"Review & Practice", id:"iso-rp", ajax:"chem/assign/isotope.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1bE0pDVeVvo58cGcbTSK1qd4rk1oJOtWb"},
            {title:"Assignment Solutions", show:"2022.9.7.13.00", gdrv:"125clIsek0IG872nGZ8A1SnYJF-_rYo_i"},
        ]},
        {title:"Bohr Model (Energy Levels)", id: "bohr", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/bohr.html"},
            {title:"Review & Practice", id:"bohr-rp", ajax:"chem/assign/bohr.htm", menu:[]},
        ]},
        {title:"Periodic Table &amp; Dot Diagrams", id: "period", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/dot.html"},
            {title:"Review & Practice", id:"period-rp", ajax:"chem/assign/period.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1xLgfyrclg2YDKPh_eUmei4H2F8DWd_YS"},
            {title:"Assignment Solutions", gdrv:"1o1g-PWkqnY9z3feqJBlbzi2hcIum5XGi"},
            {title:"Metals & Non-Metals Lab", gdrv:"1eYQ2Z6Zm7R-_f7HQcM3ve16G_bK-bdXG"}, 
        ]},
    ]},
    {title:"Part 2: Compounds", id:"c2", icon:"flask", menu:[
        {title:"Binary Ionic Compounds", id:"ionic", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/ionic.html"},
            {title:"Review & Practice", id:"ionic-rp", ajax:"chem/assign/ionic.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1x5tSnUv0qXJwDDPPPdjvu4lJsPQaSDrY"},
            {title:"Assignment Solutions", gdrv:"1ajDfhK1mSVisR5CpqXz3NK6sz37aXN-Q"},
        ]},
        {title:"Molecular Compounds", id:"molec", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/molec.html"},
            {title:"Review & Practice", id:"molec-rp", ajax:"chem/assign/molec.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"109WpDPJXKdYqr1bRlBc3Uu0aSzVo7PS6"},
            {title:"Assignment Solutions", gdrv:"1XegcZuoaiEgzUQMqg4f266NVp9LHb1sm"},
        ]},
        {title:"Polyatomic Ions & Solubility", id:"poly", icon:1, menu:[
            {title:"Ionic & Molecular Substances Lab", gdrv:"14BIeHNXWcJyKdNEPHUC-sCUz-Fm8Nvdn"},
            {title:"Lesson Notes", open:"chem/poly.html"},
            {title:"Review", id:"poly-rp", ajax:"chem/assign/poly.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1akVMOU2ljfjZKcQGY7onk9G9BjbP8vaT"},
            {title:"Assignment Solutions", show:"2022.9.20.13.00", gdrv:"1WG9FS0Nb6vuNCcXy2J615s8IykN3zg03"},
        ]},
        {title:"Naming Compounds Review", id:"naming", icon:1, menu:[
            {title:"Assignment Handout", gdrv:"1cLqPivwCbeeczCF--uDCu0Jmhk_vCpSa"},
            {title:"Assignment Solutions", show:"2022.9.20.13.00", gdrv:"1j4Q0yOrHABsph21wqeJPWByMpFOG28KU"},
        ]},
        {title:"Acids & Bases", id:"acid", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/acid.html"},
            {title:"Review", id:"acid-rp", ajax:"chem/assign/acid.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1Alh-g5t0eo00q_ZkwGv7zaF7jTaLNtoZ"},
            {title:"Assignment Solutions", show:"2023.1", gdrv:"1FUu-4oJbLKRM9y8R_DgxfNDlbIOfRGQC"},
            {title:"Acids & Bases Lab", gdrv:"1OcNAvVqS3fqz0mwiNRfn9XZs3u2_XWjV"}, 
        ]},
        {title:"Properties of Water", id:"water", icon:1, vid:"HVT3Y3_gHGg", menu:[
            {title:"Lesson Notes", open:"chem/water.html"},
            {title:"Review", id:"water-rp", ajax:"chem/assign/water.htm", menu:[]},
        ]},
    ]},
    {title:"Part 3: Reactions", id:"c3", icon:"flask", menu:[
        {title:"Chemical Reactions", id:"rxn", icon:1, menu:[
            {title:"Evidence of Reaction Lab", gdrv:"1e_tzpIFuLJTgMCa9-Bc0OwDepNEkO-AR"},
            {title:"Lesson Notes", open:"chem/rxn.html"},
            {title:"Review & Practice", id:"rxn-rp", ajax:"chem/assign/rxn.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1sgnZIIZwLZ_pNfRfca4S9tSAMpvZzEyd"},
            {title:"Assignment Solutions", gdrv:"1JzWkgHMIiiuTZetrvvs3ys6i099uf4wQ"},            
        ]},
        {title:"Formation & Decomposition", id:"rxn-fd", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/rxn_fd.html"},
            {title:"Review & Practice", id:"rxn-fd-rp", ajax:"chem/assign/rxn_fd.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1N6QeWFMQ8SfWABtuaW25fDDGupcPN2LW"},
            {title:"Assignment Solutions", show:"2022.9.27.13.00", gdrv:"1CNNBdkYKKfkxuDu3WAtuSb5ZithFC5la"},
        ]},
        {title:"Single & Double Replacement", id:"rxn-sdr", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/rxn_sdr.html"},
            {title:"Review & Practice", id:"rxn-sdr-rp", ajax:"chem/assign/rxn_sdr.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1YVl64Ozh_HdXFfhjj5t24vkpvCoJzWRc"},
            {title:"Assignment Solutions", show:"2022.9.29.13.00", gdrv:"12gRc6fq0gHnXd4AyDyaf_aESOQMPP4zl"},            
        ]},
        {title:"Hydrocarbon Combustion", id:"rxn-c", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/rxn_c.html"},
            {title:"Review & Practice", id:"rxn-c-rp", ajax:"chem/assign/rxn_c.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"117UOa9ZT7sZtq3WCDXJZvxT-MGEM1nay"},
            {title:"Assignment Solutions", show:"2022.10.3.12.00", gdrv:"1LBiP0RwcFVfaH0k_dtxGQ3EC7DdapIni"},            
        ]},
        {title:"Molar Mass", id:"mole", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/mole.html"},
            {title:"Review & Practice", id:"mole-c-rp", ajax:"chem/assign/mole.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1PwdH5Sb7MA7z3-b4MnZyvW4TROz_kWPr"},
            {title:"Assignment Solutions", show:"2022.10", gdrv:"1B4WKY1HFQn0o6tLFaPSuRTvjvZ-L3KlD"},
        ]},
    ]},
    {title:"Antacids Project", gdrv:"11UBjbZNTnvHZEb8_JpBXj1X2_jqBJt-w"},
    {title:"Unit Review", id:"revc", icon:1, menu:[
            {title:"Assignment Handout", gdrv:"1X861gwjsc5jhm-0KnWObdV4ApDQjwM5S"},
            {title:"Assignment Solutions", gdrv:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},        
    ]},
    // {title:"Unit Review Key", gdrv:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},
]};

let home = addHome({title:"Science 10", id:"home", icon:"flask", htmx:"<p class='Center'>Teacher: <a href='mailto:david.maccarthy@eips.ca'>D.G. MacCarthy</a></p>", menu:[
    {title:"Course Links", icon:"link", menu:[
        {title:"Email Mr. MacCarthy", icon:"mail", open:"mailto:david.maccarthy@eips.ca"},
        {title:"Brightspace (Block 1)", icon:"bs", open:"https://eips.brightspace.com/d2l/home/62687"},
        {title:"Brightspace (Block 2)", icon:"bs", open:"https://eips.brightspace.com/d2l/home/62688"},
        {title:"Data Booklet", gdrv:"1i3wbmTM3sWiUoSb3q4y1B44EXwhP79M6"},
        {title:"Graph Paper", gdrv:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
        {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
        {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", gdrv:"1Iws0YDdjSkChdtqARUuuzx4yHTwaHrIz"},
    ]},
    chem, phys, bio,
    {title:"Pre-IB: Measurement Uncertainty", id:"unc", menu:[
        {title:"Lesson Notes", gdrv:"16s8TAPzv5P3sP1Gdy8hPibajXBCrhKtM"},
        {title:"Assignment", gdrv:"1UTzGI6zXaNLDsVK6ezVVFwysF2QbytOX"},
    ]},
    clim, {title:"Course Review", show:"2023.1", icon:"flask", id:"rev", menu:[
        {title:"Assignment", gdrv:"1L4k_84zsZ01nYmdVQ-DxNdWATVfFVrkY"},
        {title:"Answer Key", gdrv:"17oewSnZoPMUuKuINSBXWivw_hyhlHBwZ"},
    ]},
    ]});

// home.menu[0].menu.splice(2, 3);
