let today = "contact", ab_pos = "https://education.alberta.ca/media/3069387/pos_phys_20_30.pdf";

function uc() {
    alert("Unavailable! Please use the Google Classroom.");
}

let home = {title:"Physics 20", id:"p20", href:"#/p20/", menu:[
    {title:"Topics", heading:1},
    {title:"Energy & Work", id:"energy", href:"#/p20/energy/", menu:[
        {title:"Mechanical Forms of Energy", id:"Emech", href:"#/p20/energy/Emech.html"},
        {title:"Energy Conservation", id:"Econs", href:"#/p20/energy/Econs.html"},
        {title:"<i>Scatter Plots & Model Equations</i>", id:"scatter", href:"#/p20/energy/scatter.html"},
        {title:"Non-Isolated Systems", id:"nonIso", href:"#/p20/energy/nonisolated.html"},
        {title:"Energy Transformations (Work)", id:"work", href:"#/p20/energy/work.html"},
        {title:"Work-Energy Theorem", id:"we_thm", href:"#/p20/energy/we_thm.html"},
        {title:"Power & Efficiency", id:"power", href:"#/p20/energy/power.html"},
        {title:"Assignment Booklet", hr:-1, drive:"1kSJ1UKt8UcgFNPbF5STOekh4lPyr7jrI"},
    ]},
    {title:"Kinematics", id:"kin1d", href:"#/p20/kin1d/", menu:[
        {title:"Displacement & Velocity", id:"displ", href:"#/p20/kin1d/displ.html"},
        {title:"Motion Graphs", id:"graph", href:"#/p20/kin1d/graph.html"},
        {title:"Acceleration", id:"accel", href:"#/p20/kin1d/accel.html"},
        {title:"Uniform Accelerated Motion", id:"uam", href:"#/p20/kin1d/uam.html"},
        {title:"Assignment Booklet", hr:-1, drive:"1gCi8XAaQUTTlxedh5fiR31u-h-r27J9g"},
    ]},
    {title:"Dynamics", id:"dyn", href:"#/p20/dyn/", menu:[
        {title:"Newton’s Laws of Motion", id:"force", href:"#/p20/dyn/force.html"},
        {title:"Free Body Diagrams", id:"fbd", href:"#/p20/dyn/fbd.html"},
        {title:"Mass & Weight", id:"weight", href:"#/p20/dyn/weight.html"},
        {title:"Contact Forces", id:"contact", href:"#/p20/dyn/contact.html"},
        {title:"Assignment Booklet", hr:-1, drive:"1Wj7P5yFeq1yguLCCoYCNGS6OjWKpCBSr"},
    ]}, 
    {title:"Two-Dimensional Vectors", js:"uc()", id:"vec2d", hrex:"#/p20/vec2d/", menx:[
        {title:"Test", id:"vTest", href:"#/p20/vec2d/cv.html"},
        {title:"Magnitude & Direction", id:""},
        {title:"Polar & Cartesian Form", id:"polar"},
        {title:"Vector Arithmetic", id:""},
        {title:"Projectile Motion", id:""},
        {title:"Dynamics in 2D", id:""},
    ]},
    {title:"Circular & Planetary Motion", js:"uc()", id:"circ", menx:[
        {title:"Uniform Circular Motion", id:"ucm"},
        {title:"Centripetal Acceleration", id:"ac"},
        {title:"Apparent Weight", id:"appWt"},
        {title:"Kepler’s Laws", id:"kepler"},
    ]},
    {title:"Universal Gravitation", js:"uc()", id:"grav", hrex:"#/p20/grav/", menx:[
        {title:"Newton’s Law of Universal Gravitation", id:"ugrav", href:"#/p20/grav/grav.html"},
        {title:"Cavendish Experiment", id:"cav"},
        {title:"Visualizing Gravity", id:"gField"},
        {title:"Orbital Motion", id:"orbit"},
    ]},
    {title:"Simple Harmonic Motion", js:"uc()", menx:[
        {title:"Equilibrium & Oscillations", id:""},
        {title:"Simple Harmonic Motion", id:""},
        {title:"Period of SHM", id:""},
        {title:"Energy of SHM", id:"shmE", href:"#/p20/shm/shmE.html"},
        {title:"Simple Pendulum", id:""},
        {title:"Mechanical Resonance", id:""},
    ]},
    {title:"Waves", js:"uc()", menx:[
        {title:"Harmonic Waves", id:""},
        {title:"Doppler Effect", id:""},
        {title:"Interference & Beats", id:""},
        {title:"Standing Waves", id:""},
    ]},
]}

linkParents(home);