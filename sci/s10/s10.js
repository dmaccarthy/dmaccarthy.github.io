// , vid:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN"

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
            {title:"Assignment Solutions", show:"2022.9.24", gdrv:"1JzWkgHMIiiuTZetrvvs3ys6i099uf4wQ"},            
        ]},
        {title:"Formation & Decomposition", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/rxn_fd.html"},

        ]},
        {title:"Single & Double Replacement", show:"2023.1", icon:1, open:"chem/rxn_sdr.html"},
        {title:"Hydrocarbon Combustion", show:"2023.1", icon:1, open:"chem/rxn_c.html"},
        {title:"Molar Mass", show:"2023.1", icon:1, open:"chem/mole.html"},
    ]},
    {title:"Unit Review Key", show:"2023.1", gdrv:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},
]};

let phys = {title:"Unit B: Physics", show:"2023.1", id:"phys", icon:"rocket", menu:[
    {title:"Assignment Booklet", gdrv:"1dKbreMxOXUs2u_TwsgtoqFPgQIS9PVAM"},
    // {title:"Science Skills", icon:"flask", menu:[]},
    {title:"Part 1: Science Skills & Motion", id:"p1", icon:"rocket", menu:[
        // {title:"Significant Digits", unavail:1, icon:1, open:"phys/sigdig.html"},
        {title:"Scientific Notation", icon:1, open:"phys/sciNot.html"},
        {title:"SI Units", icon:1, open:"phys/si.html"},
        // {title:"Scientific Method", icon:1, open:"phys/sciMeth.html"},
        {title:"Graphing Data", icon:1, open:"phys/scatter.html"},
        {title:"Displacement", icon:1, open:"phys/displ.html"},
        {title:"Velocity", icon:1, open:"phys/vel.html"},
        {title:"Acceleration", icon:1, open:"phys/accel.html"},
    ]},
    {title:"Part 2: Energy & Heat", id:"p2", icon:"rocket", menu:[
        {title:"Mechanical Energy", icon:1, open:"phys/mech.html"},
        {title:"Energy Transformations", icon:1, open:"phys/Etransform.html"},
        {title:"Work & Energy", icon:1, open:"phys/work.html"},
        {title:"Efficiency", icon:1, open:"phys/effic.html"},
        {title:"Unit Project", gdoc:"1Tzg2GicMO0712rPXkqi_1t_XOtFkVlLXMaNU86dIb18"},
    // ]},
    // {title:"Part 3: Thermodynamics", icon:"rocket", menu:[
        // {title:"Modern Energy Sources", icon:1, open:"phys/modsrc.html"},
    ]},
    {title:"Unit Review", icon:1, menu:[
        {title:"Assignment", gdrv:"1sW_0M6HozB6fB1FIFQWk8kN1BTXaO64i"},
        // {title:"Answer Key", unavail:1, gdrv:"1IjzARdbPgoCzgC_DDM5pfC95PKm-U6To"},
    ]},
]};

let clim = {title:"Unit D: Climate", show:"2023.1", id:"clim", icon:"earth", menu:[
    {title:"Assignment Booklet", gdrv:"1WlpJ3W-AIBaeofelJN23NDDWMdUQAyZZ"},
    {title:"Part 1: Climate Science", icon:"earth", menu:[
        {title:"Theories of Heat", icon:1, open:"clim/heat.html"},
        {title:"Heat Capacity", icon:1, open:"clim/heatcap.html"},
        {title:"Latent Heat", icon:1, open:"clim/latent.html"},
        {title:"Heat Transfer", icon:1, open:"clim/transfer.html"},
        {title:"Earth’s Energy Budget", icon:1, open:"clim/budget.html"},
        {title:"Climate Models", gdoc:"1GmAjjrBOW5aakCV5Y8AM6CtBUNiBkbw_BVwfoarlmCw"},
    ]},
    {title:"Part 2: Biomes & Climate Change", icon:"earth", menu:[
        {title:"Climatographs", icon:1, open:"clim/climatograph.html"},
        {title:"Climate Research Project", gdoc:"1fF5E7tykIHYTwe9aly5KvT3hVwTiu6cYVY-6RpbGFBs"},
        {title:"Biomes & Adaptations", icon:1, open:"clim/biome.html"},
        {title:"Polar Bears Video", icon:"video", open:"https://www.cbc.ca/archives/entry/climate-change-threatens-polar-bears"},
    ]},
]};

let bio = {title:"Unit C: Biology", show:"2023.1", id:"bio", icon:"leaf", menu:[
    {title:"Assignment Booklet", gdrv:"1ewtwqCG3yx79b6nmadMONLPDUNaI2vdM"},
    {title:"Part 1: Cells", id:"cell", icon:"leaf", menu:[
        {title:"Microscopes", icon:1, open:"https://docs.google.com/presentation/d/1wKI1blXJukMRBUC7b1B4PhBrgXfBZs7KKx_DVFRf-9M"},
        {title:"Cell Theory", icon:1, open:"https://docs.google.com/presentation/d/1yg_Q804TGQauW9EzNnbmJZlHkK8nR0qiIp5iaESYRBA"},
        {title:"Organelles", icon:1, open:"bio/org.html"},
    ]},
    {title:"Part 2: Membranes & Transport", id:"membr", icon:"leaf", menu:[
        {title:"Fluid-Mosaic Model", icon:1, vid:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN", menu:[]},
        {title:"Diffusion Simulation", icon:"html5", open:"https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_en.html"},
        {title:"Passive & Active Transport", icon:1, vid:"Ptmlvtei8hw", menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/1qJYqVyhLdOpIwEF8qv0EsbnYO6dRbofZvqICN0g568g"},
        ]},
    ]},
    {title:"Part 3: Plant Systems", id:"plants", icon:"leaf", menu:[
        {title:"Photosynthesis & Cell Specialization", icon:"leaf", vid:"#PLpVmtCaB-lyl-3YflYKGbMkgGYSwAfIdd", menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/11zl5GF0VgrNojVPIWGbLGaerb42djfIATyvtBpJHvZI"},
        ]},
        {title:"Gas Exchange", icon:1, open:"https://docs.google.com/presentation/d/1A1nqaSPSjbQia9YlNB74RixvCHGjlDiR63lBZTI7QiE"},
        {title:"Water Transport", icon:"leaf", vid:"h9oDTMXM7M8", menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/1T9swb7XJxenjxa-MA_6nOoZTwtLmYIalZnjREZ3_4Ss"},
        ]},
        {title:"Plant Control Systems (Tropisms)", id:"tropism", icon:"leaf", vid:"#PLpVmtCaB-lylU4P1GdPb8b-zDbwUcvGCf", menu:[
            {title:"Lesson Notes", icon:1, open:"https://docs.google.com/presentation/d/1NxKWWQRXaY2yZxrAL3EYZUzBpLXKTDoEeGHjIxlN32g"},
        ]},
    ]},
    {title:"Stem Cell Research", gdoc:"1NkfJkyPolerVB0NEKjiCRKfAJmsZFRr0x1UzECRkmEM"},
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
    {title:"Pre-IB: Measurement Uncertainty", show:"2023.1", gdrv:"1UTzGI6zXaNLDsVK6ezVVFwysF2QbytOX"},
    clim, {title:"Course Review", show:"2023.1", icon:"flask", id:"rev", menu:[
        {title:"Assignment", gdrv:"1L4k_84zsZ01nYmdVQ-DxNdWATVfFVrkY"},
        {title:"Answer Key", gdrv:"17oewSnZoPMUuKuINSBXWivw_hyhlHBwZ"},
    ]},
    ]});

//

// home.menu[0].menu.splice(2, 3);
