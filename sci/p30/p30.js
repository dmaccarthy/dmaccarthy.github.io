let nuke = [
    {title:"Assignment Booklet", gdrv:"14m9IJioJ2nxFK7S-HX6i5cj-NgaD_y-J"},
    {title:"Isotopes & Mass Spectrometry", id:"iso", icon:1, menu:[
        {title:"Lesson Notes", open:"nuke/iso.html"},
        {title:"Practice Solutions", gdoc:"12uMlJAh4t1ZBhlRVMGPwcVX8OGo1QsDf_m9PUMG2BDs"},
    ]},
    {title:"Radioactivity", id:"Bq", icon:1, menu:[
        {title:"Lesson Notes", open:"nuke/radio.html"},
        {title:"Practice Solutions", gdoc:"1NM9pZSePw_DL6jIdWYnwoBpkHYLvV3qlVzleFTx23fk"},
    ]},
    {title:"Nuclear Reactions", id:"nukeRn", icon:1, menu:[
        {title:"Lesson Notes", open:"nuke/nukeRn.html"},
        {title:"Practice Solutions", gdoc:"1GR6QHi-w37Fjz7n2P6-AnR_ouURlfebXwyV-NifMhu4"},
    ]},
    {title:"Half-life", id:"half", icon:1, menu:[
        {title:"Lesson Notes", unavail:1, open:"nuke/half.html"},
        {title:"Practice Solutions", gdoc:"18UYJgyheUIIkO5WSYLT6BRvSCIYf3mNY-NZ65xNFJZ4"},
        {title:"Simulation", icon:"html5", open:"../applet/halflife.html"},
    ]},
    {title:"Nuclear Energy", id:"mc2", icon:1, menu:[
        {title:"Lesson Notes", unavail:1, open:"nuke/energy.html"},
        {title:"Practice Solutions", gdoc:"1HyjtHhnUoKr6l7tXJbSVVLL2s1jkrTtNyu8LltwNjIo"},
    ]},
    {title:"Fission & Fusion", id:"fiss", icon:1, menu:[
        {title:"Lesson Notes", unavail:1, open:"nuke/fission.html"},
        {title:"Practice Solutions", gdoc:"10U8NxWjPZEO6TIROh7V9VjYba5J0YC1hLNDYNwIt7ug"},
    ]},
    {title:"Standard Model of Particle Physics", id:"quark", icon:1, menu:[
        {title:"Lesson Notes", unavail:1, open:"nuke/quark.html"},
        {title:"Practice Solutions", gdoc:"1X742dlRHzvyLoFSsroMb73I3AzkPVTXsRjquBRvP0hU"},
    ]},
];

let atom = [
    {title:"Assignment Booklet", gdrv:"14m9IJioJ2nxFK7S-HX6i5cj-NgaD_y-J"},
    {title:"Thomson’s CRT Experiment", id:"crt", icon:1, menu:[
        {title:"Simulation", icon:"html5", open:"../applet/thomson.html"},
        {title:"Lesson Notes", open:"atom/crt.html"},
        {title:"Practice Solutions", gdoc:"1deDoYrjvqIfXPwTsKGd2VbqNDEVY_1qcR6a27PmbA4A"},
    ]},
    {title:"Atomic Models", id:"models", vid:"dNp-vP17asI", icon:1, menu:[
        {title:"Alpha Scattering Simulation", icon:"html5", open:"https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_en.html"},
        {title:"Lesson Notes", open:"atom/atoms.html"},
        {title:"Practice Solutions", gdoc:"1Vmp2D8hsh9Htomg3LCff0jw7LBfYIuykza5VzObz_a8"},
    ]},
    {title:"Wave-Particle Duality", id:"wpd", icon:1, menu:[
        {title:"Lesson Notes", open:"atom/wpd.html"},
        {title:"Practice Solutions", gdoc:"1o6_I3Bh8B35CCi4qzT0Y5b78NeLyajPFCc5zCHHd7go"},
    ]},
    {title:"Bohr’s Model of the Atom", id:"bohr", icon:1, vid:"Vd5duzNtBuI", menu:[
        {title:"Lesson Notes", open:"atom/bohr.html"},
        {title:"Practice Solutions", gdoc:"1nNgIw6zHEwtU_E1P_QsIpMxXpVuqT02cwXYqO_6ArYg"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch15", ajax:"atom/summary.htm", menu:[]},
];

let photon = [
    {title:"Assignment Booklet", gdrv:"1q3ZaEGu59VSRxFBBP2lZQ08nyo-pG9IM"},
    {title:"Thermal (Blackbody) Radiation", id:"bbr", icon:1, menu:[
        {title:"Lesson Notes", open:"photon/bbr.html"},
        {title:"Practice Solutions", gdoc:"1oDMgwW_ED78nLgwPtdJglNS9k3c7RV-c7Al7l9nwTiQ"},
    ]},
    {title:"Photons", id:"albert", icon:1, menu:[
        {title:"Lesson Notes", open:"photon/photon.html"},
        {title:"Practice Solutions", gdoc:"1YRH5ZC939t2OFAgrxyskp9y89enKA-f4y8GMAVe9ids"},
    ]},
    {title:"Photoelectric Effect", id:"pe", icon:1, menu:[
        {title:"Simulation (PhET)", icon:"html5", open:"https://phet.colorado.edu/en/simulation/photoelectric"},
        // {title:"Simulation (PhET)", icon:"html5", open:"https://applets.davidmaccarthy.repl.co/phet/photoelectric.jar"},
        {title:"Lesson Notes", open:"photon/pe.html"},
        {title:"Practice Solutions", gdoc:"1Mpe6KLtiwrwvo_Ir_y2LdkgkfOw4RtF5ZI7DssYNbnY"},
    ]},
    {title:"X-Rays", id:"xray", vid:"#PLpVmtCaB-lylfDfVoo8b_7Hl_dKd_JDm3", icon:1, menu:[
        {title:"Lesson Notes", open:"photon/xray.html"},
        {title:"Practice Solutions", gdoc:"1sNBDrNe1NaLuwajlEfgVxnBNQ9TSE2CrqLhGrjpAMRk"},
    ]},
    {title:"Compton Scattering", vid:"fI2C4VlR1OM", id:"compton", icon:1, menu:[
        {title:"Lesson Notes", open:"photon/compton.html"},
        {title:"Practice Solutions", gdoc:"19X-WhiOUKLSeMVpgySX9tHcMBQbsSSKR2xaDS-3sxzs"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch14", ajax:"photon/summary.htm", menu:[]},
    {title:"Unit Review Solutions", gdoc:"1ANYjP7T1kBWLPxCX7JLoApJemuz97gQs8icrGkrX-EU"},
];

let emr = [
    {title:"Assignment Booklet", gdrv:"1q3ZaEGu59VSRxFBBP2lZQ08nyo-pG9IM"},
    {title:"Electromagnetic Waves", id:"maxwell", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/maxwell.html"},
        {title:"Practice Solutions", gdoc:"1aILeCwQWa49KykHlc3C4IT9jIcrJyjJiaBtqHQNj52k"},
    ]},
    {title:"Speed of Light", id:"c", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/c.html"},
        {title:"Practice Solutions", gdoc:"1_dPPoZv0-7tq9O5nPMyS-_fFxwWNuiYGs3BcsxRKLDM"},
    ]},
    {title:"Young’s Experiment", id:"young", vid:"VUUGCtFzFX8", icon:1, menu:[
        // {title:"Animation", icon:"html5", open:"https://www.desmos.com/calculator/8z9gyanhek"},
        {title:"Lesson Notes", open:"emr/young.html"},
        {title:"Practice Solutions", gdoc:"1hVUQY3gGIuwno6Pgy_Hv_WuJ29EpPJx4Ctx7Udlud6U"},
    ]},
    {title:"Diffraction", id:"diff", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/diff.html"},
        {title:"Practice Solutions", gdoc:"1Egj3_doRij0LE2OyxHxhWfrnCvl5CGVI3op3_LgKKNM"},
    ]},
    {title:"EM Waves Review", icon:"lesson", id:"ch13a", ajax:"emr/summarya.htm", menu:[]},
    {title:"Refraction", id:"refr", vid:"#PLpVmtCaB-lymeU79p8sxIsej26C2dlAQc", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/refr.html"},
        {title:"Practice Solutions", gdoc:"1JKho7wFm4qJ6147lu3jc-8d3T1I3UdF5fPxM8RwkT_k"},
    ]},
    {title:"Ray Diagrams", id:"ray", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/ray.html"},
        {title:"Practice Solutions", gdoc:"1uvQrC8tyaAA1Aatu2WDXq5-OCbo__o369Tz45FCw4D8"},
    ]},
    {title:"Principal Rays", id:"prRay", icon:1, menu:[
        {title:"Ray Diagram Applet", icon:"html5", open:"../applet/ray.html"},
        {title:"Lesson Notes", open:"emr/prRay.html"},
        {title:"Practice Solutions", gdoc:"11tYqkSZ8bQQLH9c3FR5VjBFoyg_oDU-vOM18pZLlm6k"},
    ]},
    {title:"Mirror Equation", id:"mirror", icon:1, menu:[
        {title:"Lesson Notes", open:"emr/mirror.html"},
        {title:"Practice Solutions", gdoc:"1cBgTS4UX51SFHe6jbebOZ5TxE0QQAbhyPCJ33gMmd4A"},
    ]},
    {title:"Lenses", id:"lens", icon:1, menu:[
        {title:"Ray Diagram Tool", icon:"html5", open:"../applet/ray.html?lens=1"},
        {title:"Lesson Notes", open:"emr/lens.html"},
        {title:"Practice Solutions", gdoc:"1rzRv-lssMLKpHlEbIuasmzqffAZ_JFQjwo3Cm8EmsJw"},
    ]},
    {title:"Optics Review", icon:"lesson", id:"ch13b", ajax:"emr/summaryb.htm", menu:[]},
];

//     {title:"Snell’s Law Derivation", icon:"html5", open:"https://www.geogebra.org/m/agnjb9mf"},


let mag = [
    {title:"Assignment Booklet", gdrv:"1KuLEqojBVQOI4wZcC5TKVjmrpGE2hpYE"},
    {title:"Electromagnetism", id:"em", icon:1, menu:[
        {title:"Lesson Notes", open:"em/mag.html"},
        {title:"Practice Solutions", gdoc:"1gf_5knTUqHibU_09BV6LvKX4Il0BDE1vWieigAc4B4E"},
        {title:"Weak Field (Logger Pro)", gdrv:"10TYeWeR9Cx9NEJV-cnuNUodkP5kWmjB9"},
        {title:"Strong Field (Logger Pro)", gdrv:"1f4G4NCbVLARARGNBuHqWmjQop2_7ic-p"},
    ]},
    {title:"Magnetic Fields", id:"B", icon:1, menu:[
        {title:"Lesson Notes", open:"em/Bfield.html"},
        {title:"Practice Solutions", gdoc:"1CzvKH05dm8RNAFyEayJ2vmiTsyZh5liUu3oXiC00qrg"},
    ]},
    {title:"Magnetic Force", id:"Fm", icon:1, menu:[
        {title:"Lesson Notes", open:"em/Bforce.html"},
        {title:"Practice Solutions", gdoc:"1UgsNVEyDVkBgqXSTPbMNaF6Vguj9k2ZSb7grv8OhDwo"},
    ]},
    {title:"Motion in a Uniform Magnetic Field", vid:"#PLpVmtCaB-lyl3kut6XKatUImVUmG7PFNP", id:"helix", icon:1, menu:[
        {title:"Lesson Notes", open:"em/helix.html"},
        {title:"Practice Solutions", gdoc:"1DoIyddl-AyKOouyIAi_jUPJudfC0JkKW2CdqfArsXxE"},
    ]},
    {title:"Motor Principle", id:"motor", icon:1, menu:[
        {title:"Lesson Notes", open:"em/motor.html"},
        {title:"Practice Solutions", gdoc:"1wS4aufiTjtOiTtVapskfasgRvSbs6HSo6pyCxONBcmg"},
    ]},
    {title:"Electromagnetic Induction", id:"faraday", icon:1, menu:[
        {title:"Lesson Notes", open:"em/faraday.html"},
        {title:"Practice Solutions", gdoc:"1vue7fvamInOCeptxnyQ1BLcszv6DgGiLA_C-M2Zv88g"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch12", ajax:"em/summaryB.htm", menu:[]},
];

let elec = [ // Coulomb's Exp't https://www.youtube.com/watch?v=PHrN5AlwkRQ
    {title:"Assignment Booklet", gdrv:"1KuLEqojBVQOI4wZcC5TKVjmrpGE2hpYE"},
    {title:"Electrostatics", id:"statics", icon:1, menu:[
        {title:"Lesson Notes", open:"em/statics.html"},
        {title:"Practice Solutions", gdoc:"1X2V5OOijL9L7xrdoIX1E27kGdBHK5tGKl_13flf9cM8"},
    ]},
    {title:"Coulomb’s Law", id:"coulomb", icon:1, menu:[
        {title:"Simulation", icon:"html5", open:"../applet/coulomb.html"},
        {title:"Physics 20 Data Analysis Review", icon:"da", open:"https://sci.davidmaccarthy.repl.co/p20/#da"},
        {title:"Lesson Notes", open:"em/coulomb.html"},
        {title:"Practice Solutions", gdoc:"1uY1-f-DxC1GJlf4iLhX6-STY1mIas0fl9JkEOTsbXXc"},
    ]},
    {title:"Electic Fields", id:"Efield", icon:1, menu:[
        {title:"Lesson Notes", open:"em/Efield.html"},
        {title:"Field Visualization (PhET)", icon:"html5", open:"https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html"},
        {title:"Field Visualization (Falstad)", icon:"html5", open:"https://falstad.com/vector2de/vector2de.html?f=InverseSquaredRadial&fc=Floor%3A%20field%20magnitude&fl=Overlay%3A%20field%20lines&d=partsvel&m=Mouse%20%3D%20Adjust%20Angle&st=1&pc=500&ft=true&rx=63&ry=0&rz=0&zm=1.2"},
        {title:"Practice Solutions", gdoc:"1GoddXPXgkrUBvCXcD7qmUorE5MREf0HbZYsPrROQbaY"},
    ]},
    {title:"Motion in a Uniform Electic Field", id:"motion", icon:1, menu:[
        {title:"Lesson Notes", open:"em/motion.html"},
        {title:"Practice Solutions", gdoc:"187EL4mH70qJ14-cCA1S7vhvh2GDdakVw7B0Kh29XM8I"},
    ]},
    {title:"Electic Potential Difference", id:"volt", icon:1, menu:[
        {title:"Lesson Notes", open:"em/volt.html"},
        {title:"Practice Solutions", gdoc:"1U9a7fQFcgbH7flF1s-T_eTrNQVqZtIOy6gQQUumnHIk"},
    ]},
    {title:"Millikan’s Oil Drop Experiment", id:"oilDrop", icon:1, menu:[
        {title:"Lesson Notes", open:"em/oilDrop.html"},
        {title:"Practice Solutions", gdoc:"1uiVgxx_ngPf_slS0y93JhK4ggYRYaKYY2htwYEAtXrU"},
        {title:"Simulation", icon:"html5", open:"../applet/oildrop"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch10_11", ajax:"em/summaryE.htm", menu:[]},
];

let mom = [
    {title:"Assignment Booklet", gdrv:"1oEg1xXVLErF9p_39NoGSLIe9EOfBC9lP"},
    {title:"Work-Energy Review", id:"energy", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/we.html"},
        {title:"Practice Solutions", gdoc:"1JSZtuwwxjCc1B2E2HDjHMpO1AK_-mgnDPXQ7LbvymxA"},
    ]},
    {title:"Momentum", id:"p", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/mom.html"},
        {title:"Practice Solutions", gdoc:"1nmhmq0oCQt40NWidf4FFZR70_tQ5HzpwmBdULBRyHLk"},
        {title:"Video Analysis", icon:"html5", open:"../tools/vid_analysis/"},
        {title:"Extra Videos", icon:"gdrv", open:"https://drive.google.com/drive/folders/1Q8pXcPX-Luihd2A6ToGSK5tUKeiYZoxi"},
    ]},
    {title:"Impulse", id:"imp", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/impulse.html"},
        {title:"Practice Solutions", gdoc:"12MIibYktRjVXETUgOsvuslQzYl6UhiRHKqMZSWW2uzw"},
    ]},
    {title:"Momentum Conservation", id:"pcons", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/pCons.html"},
        {title:"Practice Solutions", gdoc:"1hXHo-fjHKUnIeNlc1kEabIBmkvfJNql0vDC3AFbUDFs"},
    ]},
    {title:"Elastic & Inelastic Collisions", id:"coll", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/collide.html"},
        {title:"Practice Solutions", gdoc:"108IGVY2V9-fRYXVPBAyl8XRg2Y-bqyN64qM3HaQ3UzM"},
    ]},
    {title:"2D Vectors Review", id:"vec2d", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/vec.html"},
        {title:"Practice Solutions", gdoc:"1T53ne9L6w1BnRVGHpsOXCjBJ59AT336V6KIrY7hg7lg"},
    ]},
    {title:"2D Collisions", id:"coll2d", icon:1, menu:[
        {title:"Lesson Notes", open:"mom/collide2d.html"},
        {title:"Practice Solutions", gdoc:"1SqKWCOb7_5PE-KHdNbZJsiSJXrs5-LM7dBmFMWx_IUs"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch9", ajax:"mom/summary.htm", menu:[]},
];

let home = addHome({title:"Physics 30", id:"home", htmx:"<p class='Right'>Teacher: <a href='mailto:david.maccarthy@eips.ca'>D.G. MacCarthy</a></p>", menu:[
    {title:"Course Links", icon:"link", menu:[
        {title:"Brightspace", icon:"bs", open:"https://eips.brightspace.com/d2l/home/40848"},
        {title:"Data Booklet", icon:"link", open:"https://www.alberta.ca/assets/documents/edc-physics30-data-booklet.pdf"},
        {title:"Graph Paper", gdrv:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        // {title:"Solution Template", gdrv:"14tETNQF1xZbm-J9BXNokX9PfsGwJmT0r"},
        {title:"Email Mr. MacCarthy", icon:"mail", open:"mailto:david.maccarthy@eips.ca"},
        {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
        {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
        {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", gdrv:"1iG0oo3ekpCxkiQfROZG7mvvjGydQxU1O"},
    ]},
    {title:"Chapter 9: Momentum & Impulse", id:"mom", icon:"train", menu:mom},
    {title:"Chapters 10 & 11: Electric Fields", id:"elec", icon:"../media/lightning.jpg", menu:elec},
    {title:"Chapter 12: Magnetic Fields", id:"mag", icon:"magnet", menu:mag},
    {title:"Chapter 13: Electromagnetic Waves", id:"emr", icon:"lightbulb", menu:emr},
    {title:"Chapter 14: Photons", id:"photon", icon:"xray", menu:photon},
    {title:"Chapter 15: Atomic Physics", id:"atom", icon:"atom", menu:atom},
    {title:"Chapters 16 & 17: Nuclear & Particle Physics", id:"nuke", icon:"nuke", menu:nuke},
    {title:"Course Review", id:"rev30", icon:"magnet", menu:[
        {title:"Momentum & Impulse", icon:"train", id:"rev9", ajax:"mom/summary.htm", menu:[]},
        {title:"Electric Fields", icon:"../media/lightning.jpg", id:"rev11", ajax:"em/summaryE.htm", menu:[]},
        {title:"Magnetic Fields", icon:1, id:"rev12", ajax:"em/summaryB.htm", menu:[]},
        {title:"EM Waves", icon:"lightbulb", id:"rev13a", ajax:"emr/summarya.htm", menu:[]},
        {title:"Optics", icon:"lightbulb", id:"rev13b", ajax:"emr/summaryb.htm", menu:[]},
        {title:"Photons", icon:"xray", id:"rev14", ajax:"photon/summary.htm", menu:[]},
        {title:"Atomic Physics", icon:"atom", id:"rev15", ajax:"atom/summary.htm", menu:[]},
        // {title:"Nuclear & Particle Physics", icon:"nuke", id:"rev16", ajax:"atom/summary.htm", menu:[]},
    ]},
]});
