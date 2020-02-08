let today = "scatter", ab_pos = "https://education.alberta.ca/media/3069387/pos_phys_20_30.pdf";

function uc() {
    alert("We haven't started this unit yet!");
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
        {title:"Power & Efficiency", id:""},
        {title:"Assignment Booklet", hr:-1, drive:"1kSJ1UKt8UcgFNPbF5STOekh4lPyr7jrI"},
    ]},
    {title:"Kinematics", js:"uc()", menx:[
        {title:"Displacement & Velocity", id:""},
        {title:"Motion Graphs", id:""},
        {title:"Acceleration", id:""},
        {title:"Uniform Accelerated Motion", id:""},
    ]},
    {title:"Dynamics", js:"uc()", menx:[
        {title:"Inertia & Force", id:""},
        {title:"Free Body Diagrams", id:""},
        {title:"Mass & Weight", id:""},
        {title:"Contact Forces", id:""},
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