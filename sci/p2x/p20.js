let wave = [
    // {title:"Assignment Booklet", gdrv:"1NC0Pk5VyhNKR8sGuTNhgHNQpG5ZiJyv9"},
    {title:"Harmonic Waves", id:"harm", icon:1, menu:[
        {title:"Lesson Notes", open:"wave/harm.html"},
        {title:"Practice Solutions", gdoc:"1xb381kGFZ0uQ3VJtC6x-fDlataT-SNVG73jFTrMFFyA"},
    ]},
    {title:"Doppler Effect", id:"dopp", icon:1, menu:[
        {title:"Lesson Notes", open:"wave/doppler.html"},
        {title:"Practice Solutions", gdoc:"1d31LStNsYOG7lU91dspgapqsm3JeiEoEFzDrINMc9-Q"},
    ]},
    {title:"Interference & Beats", id:"beat", icon:1, menu:[
        {title:"Lesson Notes", open:"wave/beat.html"},
        {title:"Practice Solutions", gdoc:"1tXxsgei7m80MUqUWvWXrTgxBhfrmgJBRW7iB21AD6SM"},
    ]},
    {title:"Standing Waves", id:"stand", icon:1, menu:[
        {title:"Standing Waves Animation", icon:"html5", open:"../applet/stWave.html"},
        {title:"Lesson Notes", open:"wave/stand.html"},
        {title:"Practice Solutions", gdoc:"1Nz98VKhZjecAm001MC1ImzppsVQHnJoT9V2M7_Q-kak"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch8", ajax:"wave/summary.htm", menu:[]},
];

let shm = [
    // {title:"Assignment Booklet", gdrv:"1epM1sYOHlUXxbMQ3DODu-J3aj_JYQ0YA"},
    {title:"Equilibrium & Oscillations", id:"eqm", icon:1, menu:[
        {title:"Pendulum Video", icon:"video", gdrv:"1EaP7bhyrze7XRIu52sILu5ErM5qhM7b0"},
        // {title:"Pendulum Motion Data", icon:"gdrv", open:"https://docs.google.com/spreadsheets/d/1nmwJnNxtU4Bn4u9thB75AOvNSB9_sb08TjivGVcUHdQ"},
        {title:"Lesson Notes", open:"shm/eqm.html"},
        {title:"Practice Solutions", gdoc:"1hYFX1MvbaVO8K-psaF189gWVsRHPRSIw_FUXNYLTRN4"},
    ]},
    {title:"Simple Harmonic Motion", id:"shm_eq", icon:1, menu:[
        {title:"Lesson Notes", open:"shm/shm.html"},
        {title:"Practice Solutions", gdoc:"1rioTx98SvQHei_l4f8jXOQwxPKtS17-fUKBDLDLD_z4"},
    ]},
    {title:"Period of SHM", id:"shm_T", icon:1, menu:[
        {title:"Lesson Notes", open:"shm/period.html"},
        {title:"Practice Solutions", gdoc:"1o5KvYsGQOVMT10Ce0e5fB9U2p8_VlyH3mdSeh0qW7Q4"},
    ]},
    {title:"Energy of SHM", id:"shm_E", icon:1, menu:[
        {title:"Lesson Notes", open:"shm/energy.html"},
        {title:"Practice Solutions", gdoc:"1lKmGWUFPgX6N19YKXzMrpxdo4ebAs8v88Y1r9BLiFfI"},
    ]},
    {title:"Simple Pendulum", id:"pend", icon:1, menu:[
        {title:"Lesson Notes", open:"shm/pend.html"},
        {title:"Practice Solutions", gdoc:"1l0OopFOETXE5pU4MpsPThlSV74FVj5BxEV_EC3Y90Xo"},
    ]},
    {title:"Mechanical Resonance", id:"res", icon:1, vid:"#PLpVmtCaB-lymgmGIEvph0whN7Fh1WA2SA", menu:[
        {title:"Lesson Notes", open:"shm/res.html"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch7", ajax:"shm/summary.htm", menu:[]},
];

let grav = [
    // {title:"Assignment Booklet", gdrv:"1rbDbfZ-SklBP0zx0XnSFJn2lPzJM_Vyd"},
    {title:"Universal Gravitation", icon:1, id:"ugrav", menu:[
        {title:"Lesson Notes", open:"grav/uGrav.html"},
        {title:"Practice Solutions", gdoc:"1b96Ht-6midtdBeRU2L2o9OkESdmDF3dzdA5Sj3On-nM"},
    ]},
    {title:"Cavendish Experiment", icon:1, id:"cav", menu:[
        {title:"Lesson Notes", open:"grav/cav.html"},
        {title:"Practice Solutions", gdoc:"1g8p4H2J2U6wDXiKpyxsu1r3SUObrI0P1EHmMN9VfbPE"},
    ]},
    {title:"Visualizing Gravity", id:"gvis", icon:1, menu:[
        {title:"Field Visualization (Falstad)", icon:"html5", open:"https://falstad.com/vector2de/vector2de.html?f=InverseSquaredRadial&fc=Floor%3A%20field%20magnitude&fl=Overlay%3A%20equipotentials&d=partsvel&m=Mouse%20%3D%20Adjust%20Angle&st=1&pc=500&hs=40&ft=true&rx=63&ry=0&rz=0&zm=1.2"},
        // {title:"Field Visualization (Falstad)", icon:"html5", open:"https://falstad.com/vector2de/vector2de.html"},
        {title:"Field Visualization (PhET)", icon:"html5", open:"https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html"},
        {title:"Field Visualization (Desmos)", icon:"desmos", open:"https://www.desmos.com/calculator/br0ig8pci1"},
    ]},
    {title:"Gravitational Field", id:"g", icon:1, vid:"MTY1Kje0yLg", menu:[
        {title:"Lesson Notes", open:"grav/field.html"},
        {title:"Practice Solutions", gdoc:"1ha6uk0RSF4bZKS_Q5CjW-4LlNtbGDihVfGdcGW-4YTA"},
    ]},
    {title:"Circular Orbital Motion", id:"orbit", icon:1, menu:[
        {title:"Lesson Notes", open:"grav/orbit.html"},
        {title:"Practice Solutions", gdoc:"1XxYSCqIJbKH016exfXOBS1yb-jTPia_UOcqxQfO1dwM"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch4", ajax:"grav/summary.htm", menu:[]},
];

let data = [
    {title:"Model Equations", id:"model", icon:1, menu:[
        {title:"Lesson Notes", open:"skill/eqn.html"},
        {title:"Practice Solutions", gdoc:"1q0L17HIG8W3RzaCKDaSEK5itlcRwmnzU-zkxxiI-_E0"},
    ]},
    {title:"Regression Analysis", id:"regr", icon:1, menu:[
        {title:"Lesson Notes", open:"skill/reg.html"},
        {title:"TI-83+ Data Analysis", gdrv:"0B_gX0kaqRFXTenBOOTNNNkczZ3M"},
        {title:"Practice Solutions", gdoc:"1EjnS2SHuKCvv4D8MGSvVv2_L8Sy8nRiwfpSnIXGCcE0"},
    ]},
    {title:"Transforming Power Data", id:"nonLin", icon:1, menu:[
        {title:"Lesson Notes", open:"skill/nonLin.html"},
        {title:"Practice Solutions", gdoc:"11JzR1EpOw7ATi7wZuzIyklMmeYtxv-yrJLxkm40_OFc"},
    ]},
];

let circ = [
    // {title:"Assignment Booklet", gdrv:"1wmnIhIc2yAJFbkAeUi5XUe3ijVRjXi6j"},
    {title:"Uniform Circular Motion", id:"ucm", icon:1, menu:[
        {title:"Lesson Notes", open:"circ/ucm.html"},
        {title:"Practice Solutions", gdoc:"1EC7Lao0wjSZNWTopkRewQ_FCvGUeE_dFdyLeNtUNnTI"},
    ]},
    {title:"Centripetal Acceleration", id:"ac", icon:1, menu:[
        {title:"Lesson Notes", open:"circ/ac.html"},
        {title:"Practice Solutions", gdoc:"1N9tQLEzRIabBf_Bs6p2ZYHnV_FKh5pTX4bKdHsTTfys"},
    ]},
    {title:"Apparent Weight", id:"appWt", icon:1, menu:[
        {title:"Lesson Notes", open:"circ/appWt.html"},
        {title:"Practice Solutions", gdoc:"1tI4TBQUCDj-xNb97iy9EUIVc2SuUbmeDHg0xFbS6GQ0"},
    ]},
    {title:"Planetary Motion (Kepler’s Laws)", id:"kepler", icon:1, vid:"1E3vlf-Esqk", menu:[
        {title:"Planetary Data", icon:"link", open:"https://nssdc.gsfc.nasa.gov/planetary/factsheet/"},
        {title:"Heliocentric Animation", icon:"html5", open:"../applet/helio.html"},
        {title:"Lesson Notes", open:"circ/kepler.html"},
        {title:"Practice Solutions", gdoc:"1psk6s2R8sf2ctXisySewke-TVosxjW2g8UduRfX2yT0"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch5", ajax:"circ/summary.htm", menu:[]},
];

let dyn = [
    {title:"Force & Inertia", id:"inert", icon:1, menu:[
        {title:"Lesson Notes", open:"dyn/inert.html"},
        {title:"Practice Solutions", gdoc:"1aMbFTmo1sNi91ULonApGutTAqpGIc7o3xE0NcVQ0GfQ"},
    ]},
    {title:"Free Body Diagrams", id:"fbd", icon:1, menu:[
        {title:"Lesson Notes", open:"dyn/fbd.html"},
        {title:"Practice Solutions", gdoc:"1ecVJbHXRGtCmoCOmTXco-DHDAvSjWlqaO-to-DjEEQ4"},
    ]},
    {title:"Newton’s Third Law", id:"N3", icon:1, menu:[
        {title:"Lesson Notes", open:"dyn/n3.html"},
        {title:"Practice Solutions", gdoc:"1zUzJTyrdwsWblAz1StqF0sNn3lclQigmLoTT4R1mfkc"},
    ]},
    {title:"Mass & Weight", id:"weight", icon:1, vid:"KDp1tiUsZw8", menu:[
        // {title:"Pennies Lab Video", gdrv:"1iJ9iZ2QLj3fwcki75mKcb9XR18yFSCvl"},
        // {title:"Experiment Handout", gdrv:"1Z05e3AIQpijSqzOmC3UOk74t9PFo1ErC"},
        {title:"Lesson Notes", open:"dyn/weight.html"},
        {title:"Practice Solutions", gdoc:"1wtfhYaqUeBUotX8nm4PHM0UjLZdUNLgdibdyFQcjjXo"},
    ]},
    {title:"Contact Forces", id:"fric", icon:1, menu:[
        {title:"Lesson Notes", open:"dyn/fric.html"},
        {title:"Practice Solutions", gdoc:"1jAoNeyNDfi1DPFyhi-Qf4AdesX2-Wfasv-Dsj0fYV0c"},
        {title:"Friction Simulation", icon:"html5", open:"../applet/pulley"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch3", ajax:"dyn/summary.htm", menu:[]},
];

let meas = [
    {title:"Experiment Design", id:"expDes", icon:1, menu:[
        {title:"Lesson Notes", open:"../s10/chem/expDes.html"},
        {title:"Review & Practice", id:"expDes-rp", ajax:"../p20/skill/assign/expDes.htm", menu:[]},
        // {title:"Practice Solutions", gdoc:"13UxfP50msvqwlMy4qc3miOa3av8FWLgC8A4VKu78DxE"},
    ]},
    {title:"Algebra", id:"algebra", icon:1, menu:[
        {title:"Lesson Notes", open:"../p20/skill/algebra.html"},
        {title:"Review & Practice", id:"algebra-rp", ajax:"../p20/skill/assign/algebra.htm", menu:[]},
    ]},
    {title:"Scientific Notation", id:"sciNot", icon:1, vid:"bXkewQ7WEdI?start=25", menu:[
        {title:"Lesson Notes", open:"../s10/phys/sciNot.html"},
        {title:"Review & Practice", id:"sciNot-rp", ajax:"../p20/skill/assign/sciNot.htm", menu:[]},
    ]},
    {title:"SI Units", id:"si", icon:1, vid:"DTv_eI9Hlro", menu:[
        {title:"Lesson Notes", open:"../s10/phys/si.html"},
        {title:"Review & Practice", id:"si-rp", ajax:"../p20/skill/assign/si.htm", menu:[]},
        // {title:"Practice Solutions", gdoc:"1Z9fiUwB-U9VCE_yPvb2wHFRSooBc97cuW-SAaA_CICQ"},
    ]},
    {title:"Scatter Plots & Slope", id:"scatter", icon:1, menu:[
        {title:"Lesson Notes", open:"../p20/skill/scatter.html"},
        {title:"Review & Practice", id:"scatter-rp", ajax:"../p20/skill/assign/scatter.htm", menu:[]},
        // {title:"Practice Solutions", gdoc:"1gfrttglGFggu4xvrl1yv4a5w_Q9yYydEWVLdnuwF6MA"},
    ]},
    {title:"Trigonometry", id:"trig", icon:1, menu:[
        {title:"Lesson Notes", open:"../p20/skill/trig.html"},
        {title:"Review & Practice", id:"trig-rp", ajax:"../p20/skill/assign/trig.htm", menu:[]},
    ]},
];

let energy = [
    {title:"Mechanical Energy", id:"mech", icon:1, vid:"CW0_S5YpYVo", menu:[
        {title:"Lesson Notes", open:"energy/mech.html"},
        {title:"Practice Solutions", gdoc:"1iloIQCAF9Mpqmu7UcgJUDTumhVlto3oiqaOynvRJXEM"},
    ]},
    {title:"Energy Conservation", id:"Econs", icon:1, vid:"#PLpVmtCaB-lymCk9sXymaiebN4XDuzZQsu", a:"HR5iEX3Sy1k", menu:[
        {title:"Lesson Notes", open:"energy/cons.html"},
        {title:"Practice Solutions", gdoc:"1R_2LFv4ACrEeqdQHBW2HgZGA0U4xBxyj_4OreFuKByc"},
    ]},
    // {title:"Lab: Energy Transformation on a Ramp", id:"rampLab", icon:1, menu:[
    //     {title:"Handout (Live Experiment)", gdrv:"1tSjy8SVnbKYEQSiBKyGj6i2DYtCpfvBH"},
    //     {title:"Handout (Simulation)", gdrv:"1vUVexzbmqghH1hGGlGV8eWGMJC0C0sOQ"},
    //     {title:"Simulation", icon:"html5", open:"../applet/ramp.html"},
    // ]},
    {title:"Non-Isolated Systems", id:"syst", icon:1, menu:[
        {title:"Lesson Notes", open:"energy/nonIso.html"},
        {title:"Practice Solutions", gdoc:"16l4nFjj8OgsKLtjsPEh-jtAtsg3pYahDXFcDsT3K0dk"},
    ]},
    {title:"Energy Transformations (Work)", id:"work", icon:1, menu:[
        {title:"Lesson Notes", open:"energy/work.html"},
        {title:"Practice Solutions", gdoc:"1M3ePHY_hvHRRvZpyOkLHkUbeOgSM0NQfO5oxZ75mKcY"},
    ]},
    {title:"Work-Energy Theorem", id:"we", icon:1, menu:[
        {title:"Lesson Notes", open:"energy/we.html"},
        {title:"Practice Solutions", gdoc:"1Xk85LGlNrOTX4Ckg672gfp5T6L9IZOTdKxAu7lKPGLM"},
    ]},
    {title:"Power & Efficiency", id:"power", icon:1, menu:[
        {title:"Lesson Notes", open:"energy/power.html"},
        {title:"Practice Solutions", gdoc:"1PHRVmr9tMgm8ncSCnykQ1zYYznPADaJZV1KcrYZAWmQ"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch6", ajax:"energy/summary.htm", menu:[]},
];

let kin1d = [
    {title:"Position & Displacement", id:"displ", icon:1, vid:"V8hJhTE3bUk", menu:[
        {title:"Lesson Notes", open:"kin/displ.html"},
        {title:"Review & Practice", id:"displ-rp", ajax:"kin/assign/displ.htm", menu:[]},
        {title:"Practice Solutions", gdoc:"1EkZMELpyV191px9oqb_zru74Xaf01eEAZsmLG4c3-jw"},
    ]},
    {title:"Velocity & Speed", id:"vel", icon:1, menu:[
        {title:"Lesson Notes", open:"kin/vel.html"},
        {title:"Practice Solutions", gdoc:"1eRjia_G9Zny7pNvpGp282N-XVMRCjJh9MWwRlNCW36A"},
        {title:"Basketball Lab (Logger Pro)", gdrv:"1pI39R2RcajEK35gwJq-gko6mjtzH-w1m"},
    ]},
    {title:"Motion Graphs", id:"graph", icon:1, menu:[
        {title:"Lesson Notes", open:"kin/graph.html"},
        {title:"Practice Solutions", gdoc:"12uwMmaCWOsEemtR8fj6jujP-FjGihNef3Wn08nHmCOY"},
    ]},
    {title:"Acceleration", id:"acc", icon:1, menu:[
        {title:"Lesson Notes", open:"kin/accel.html"},
        {title:"Practice Solutions", gdoc:"1RVLIxYzDym_sqjgL8SYdxtLIts9mJ0BAcoEG0FCZfvo"},
        {title:"Basketball Lab (Logger Pro)", gdrv:"1pI39R2RcajEK35gwJq-gko6mjtzH-w1m"},
        {title:"Bouncing Ball Simulation", icon:"ball", open:"../applet/bounce.html"},
    ]},
    {title:"Uniform Accelerated Motion", id:"uam", icon:1, menu:[
        {title:"Lesson Notes", open:"kin/uam.html"},
        {title:"Practice Solutions", gdoc:"14GrA1jhjfFNOpCzbr0xraPt_mwPBfb3PHOFu7G6e6XQ"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch1", ajax:"kin/summary.htm", menu:[]},
];

let vec2d = [
    {title:"2D Vectors Applet", icon:"html5", open:"../applet/vec.html"},
    {title:"Magnitude & Direction", id:"mag", icon:1, menu:[
        {title:"Lesson Notes", open:"vec/mag.html"},
        {title:"Practice Solutions", gdoc:"14vQp9XvGS1yPjDoLDfFNE2u5MAnIqKgcXTgIAwVCRQQ"},
    ]},
    {title:"Polar & Cartesian Form", id:"polar", icon:1, menu:[
        {title:"Lesson Notes", open:"vec/polar.html"},
        {title:"Practice Solutions", gdoc:"14-CgdDFUiCwpJfPlghKpw1iMRfC8J3NJBwrNP20fois"},
    ]},
    {title:"Vector Arithmetic", id:"arith", icon:1, menu:[
        {title:"Lesson Notrigtes", open:"vec/arith.html"},
        {title:"Practice Solutions", gdoc:"1960E_v1vFacD-7sbtFqrE3Xzqjr32rO4H435r4aT3WM"},
    ]},
    {title:"Projectile Motion", id:"proj", icon:1, menu:[
        {title:"Lesson Notes", open:"vec/proj.html"},
        {title:"Practice Solutions", gdoc:"14uVxnRHjWAdOALpevl9sJq1ZgGIU9Hw82uaAilHrFF4"},
    ]},
    {title:"Dynamics in 2D", id:"dyn2d", icon:1, menu:[
        {title:"Examples", open:"vec/dyn2d.html"},
        {title:"Practice Solutions", unavail:0, gdoc:"1cPXcnazyRT1zQ9xmbCXz7gkMr6YHswAZT1lvA1bsU_w"},
    ]},
    {title:"Chapter Review", icon:"lesson", id:"ch2", ajax:"vec/summary.htm", menu:[]},
];

let home = addHome({title:"Physics 20", id:"home", htmx:"<p class='Right'>Teacher: <a href='mailto:david.maccarthy@eips.ca'>D.G. MacCarthy</a></p>", menu:[
    {title:"Documents & Links", id:"doc", icon:"link", menu:[
        {title:"Brightspace", icon:"bs", open:"https://eips.brightspace.com/d2l/home/"},
        {title:"Data Sheet", gdrv:"1gWLP0yLweKtHtn5nJk--Ev_KB2XDibqq"},
        {title:"Graph Paper", gdrv:"1tiA8XrfPUxsZ2d-HDPP-8KMeRMngHalE"},
        // {title:"Solution Template", gdrv:"14tETNQF1xZbm-J9BXNokX9PfsGwJmT0r"},
        {title:"Email Mr. MacCarthy", icon:"mail", open:"mailto:david.maccarthy@eips.ca"},
        {title:"PowerSchool", icon:"ps", open:"https://powerschool.eips.ca/public/"},
        {title:"Salisbury Composite", icon:"sal", open:"https://salcomp.ca"},
        {title:"Program of Studies", icon:"ab", open:"https://education.alberta.ca/science-10-12/programs-of-study/"},
        {title:"Course Outline", gdrv:"1pIpT3c8RKU5QeN09m7iEQQoAuKHDtPgg"},
    ]},
    // {title:"Handouts", icon:"gdrv", id:"handout", menu:[
    //     {title:"Course Organizer", gdrv:"1GMSaHF4nIxAkWSCGY1_K7vbgHDm3mxgP"},
    //     {title:"Lab Handouts", gdrv:"1CWH5oxkvmGXAs3RD3nhfveevDBQIHB1X"},
    // ]},
    {title:"Science & Math 10 Review", id:"s10", icon:"da", menu:meas},
    {title:"Chapter 1: Kinematics", id:"kin", icon:"train", menu:kin1d},
    {title:"Chapter 2: 2D Vectors", id:"vec2d", icon:"soccer", menu:vec2d},
    {title:"Chapter 3: Dynamics", id:"dyn", icon:"rocket", menu:dyn},
    {title:"Data Analysis", id:"da", icon:"da", menu:data},
    {title:"Chapter 4: Universal Gravitation", id:"grav", icon:"earth", menu:grav},
    {title:"Chapter 5: Circular & Planetary Motion", id:"circ", icon:"midway", menu:circ},
    {title:"Chapter 6: Energy & Work", id:"energy", icon:"arrow", menu:energy},
    {title:"Chapter 7: Oscillations (SHM)", id:"shm", icon:"crane", menu:shm},
    {title:"Chapter 8: Mechanical Waves", id:"wave", icon:"speaker", menu:wave},
    {title:"Course Review", id:"rev20", icon:"rocket", menu:[
        {title:"Assignment / Solutions", gdrv:"1Pe-o2p0VbWJ9UAnGt0ZNPqLArqpvhhPG"},
        {title:"Kinematics", icon:"train", id:"rev1", ajax:"kin/summary.htm", menu:[]},
        {title:"2D Vectors", icon:"soccer", id:"rev2", ajax:"vec/summary.htm", menu:[]},
        {title:"Dynamics", icon:"rocket", id:"rev3", ajax:"dyn/summary.htm", menu:[]},
        {title:"Gravitation", icon:"earth", id:"rev4", ajax:"grav/summary.htm", menu:[]},
        {title:"Circular Motion", icon:"midway", id:"rev5", ajax:"circ/summary.htm", menu:[]},
        {title:"Energy", icon:"arrow", id:"rev6", ajax:"energy/summary.htm", menu:[]},
        {title:"Simple Harmonic Motion", icon:"crane", id:"rev7", ajax:"shm/summary.htm", menu:[]},
        {title:"Mechanical Waves", icon:"speaker", id:"rev8", ajax:"wave/summary.htm", menu:[]},
        {title:"Data Analysis", icon:"da", id:"rev_da", ajax:"./da_summary.htm", menu:[]},
        {title:"Printable Notes", gdrv:"1zQFWZVOF1ykK2mLAuiFsi63QJKhHkw9O"},
    ]},
]});
