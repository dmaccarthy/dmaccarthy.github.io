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
            {title:"Assignment Handout", show:"2023.1", gdrv:""},
        ]},
        {title:"Atomic Theory", icon:1, vid:"ogPNZ_MXksM", aspect:"4/3", menu:[
            {title:"Lesson Notes", open:"chem/atom.html"},
            {title:"Assignment Handout", gdrv:"1fRKyEaIaaT4zFDXfT4exwJeppPl2tG0G"},
        ]},
        {title:"Isotopes &amp; Ions", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/isotope.html"},
            {title:"Review & Practice", id:"iso-rp", ajax:"chem/assign/isotope.htm", menu:[]},
            {title:"Assignment Handout", gdrv:"1bE0pDVeVvo58cGcbTSK1qd4rk1oJOtWb"},
        ]},
        {title:"Bohr Model (Energy Levels)", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/bohr.html"},
        ]},
        {title:"Periodic Table &amp; Dot Diagrams", icon:1, menu:[
            {title:"Lesson Notes", open:"chem/dot.html"},
            {title:"Metals & Non-Metals Lab Handout", gdrv:"1eYQ2Z6Zm7R-_f7HQcM3ve16G_bK-bdXG"}, 
        ]},
    ]},
    {title:"Part 2: Compounds", id:"c2", icon:"flask", menu:[
        {title:"Binary Ionic Compounds", icon:1, open:"chem/ionic.html"},
        {title:"Molecular Compounds", icon:1, open:"chem/molec.html"},
        {title:"Polyatomic Ions & Solubility", icon:1, open:"chem/poly.html"},
        {title:"Acids & Bases", icon:1, open:"chem/acid.html"},
        {title:"Properties of Water", icon:1, vid:"HVT3Y3_gHGg", menu:[
            {title:"Lesson Notes", icon:1, open:"chem/water.html"},
        ]},
        {title:"Naming Compounds Review", icon:1, menu:[
            {title:"Assignment", gdrv:"1HZnLEGAKM8eJqCEz7luhv65hk9mshnt7"},
            {title:"Answer Key", gdrv:"18QUwK6hA3r9A6ln3JmF7LVFRMRznbu0x"},
        ]},
    ]},
    {title:"Part 3: Reactions", id:"c3", icon:"flask", menu:[
        {title:"Chemical Reactions", icon:1, open:"chem/rxn.html"},
        {title:"Formation & Decomposition", icon:1, open:"chem/rxn_fd.html"},
        {title:"Single & Double Replacement", icon:1, open:"chem/rxn_sdr.html"},
        {title:"Hydrocarbon Combustion", icon:1, open:"chem/rxn_c.html"},
        {title:"Molar Mass", icon:1, open:"chem/mole.html"},
    ]},
    {title:"Unit Review Key", gdrv:"1IaRKpczT_-sy76rFqBEOcIwyQ3AORxxYAEzJGKJpY7w"},
]};

let phys = {title:"Unit B: Physics", id:"phys", icon:"rocket", menu:[
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

let clim = {title:"Unit D: Climate", id:"clim", icon:"earth", menu:[
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

let bio = {title:"Unit C: Biology", id:"bio", icon:"leaf", menu:[
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
        {title:"Brightspace", icon:"bs", open:"https://eips.brightspace.com/d2l/home/41189"},
        {title:"Data Booklet", gdrv:"1i3wbmTM3sWiUoSb3q4y1B44EXwhP79M6"},
        {title:"Graph Paper", gdrv:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
        {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
        {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", icon:"link", open:"https://scienceoutlines.davidmaccarthy.repl.co/?s10"},
    ]},
    chem, phys, bio,
    {title:"Pre-IB: Measurement Uncertainty", gdrv:"1UTzGI6zXaNLDsVK6ezVVFwysF2QbytOX"},
    clim, {title:"Course Review", icon:"flask", id:"rev", menu:[
        {title:"Assignment", gdrv:"1L4k_84zsZ01nYmdVQ-DxNdWATVfFVrkY"},
        {title:"Answer Key", gdrv:"17oewSnZoPMUuKuINSBXWivw_hyhlHBwZ"},
    ]},
    ]});

//

// home.menu[0].menu.splice(2, 3);
