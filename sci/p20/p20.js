let p20 = {title:"Physics 20", id:"p20", article:"Home", links:[
    // {title:"Google Drive", url:"https://drive.google.com", icon:"gdrv"},
    // {title:"Google Drive Link", url:"https://database.davidmaccarthy.repl.co/cloud.html?crs=Physics%2020"},
    // {title:"Calendar", url:"https://calendar.google.com/calendar/embed?src=eips.ca_classrooma95b0655%40group.calendar.google.com&ctz=America%2FEdmonton", icon:"cal"},
    {title:"Data Booklet", gdrv:"1BitARClCliTU4PZ0vPCJ3jnVmW-3lyag"},
    {title:"Brightspace / Calendar", url:"https://eips.brightspace.com/d2l/home/26301", icon:"bs"},
    {title:"PowerSchool", url:"https://powerschool.eips.ca/public/home.html", icon:"https://powerschool.eips.ca/favicon.ico"},
    {title:"Sal Comp", url:"https://salcomp.ca", icon:"https://www.salcomp.ca/uploads/263/Salisbury%20S_red-grey/1452114178-250w_Salisbury%20S_red-grey.jpg"},
    {title:"Course Outline", url:"https://scienceoutlines.davidmaccarthy.repl.co/?p20", icon:"favicon"},
], nodes:[
	{title:"Physics Skills", id:"skill", article:"skill", nodes:[
    	{title:"Scientific Notation", ajax:"../s10/phys/skill/sciNot.htm#SciNot"},
    	{title:"SI Units", ajax:"../s10/phys/skill/SI.htm#SI"},
    	{title:"Experiment Design", ajax:"../s10/phys/skill/expDes.htm#ExpDes", links:[
            {title:"Video", video:"nzfDvfoBv_g"},
        ]},
		{title:"Scatter Plots", id:"scatter", ajax:"skill/scatter.htm#Scatter"},
		{title:"Equations of Lines", id:"linEq", ajax:"skill/linEq.htm#LinEq", links:[
            {title:"TI-83+ Regression", gdrv:"0B_gX0kaqRFXTenBOOTNNNkczZ3M"},
            {title:"Desmos", icon:"https://www.desmos.com/favicon.ico", url:"https://www.desmos.com/"},
        ]},
		// {title:"Non-Linear Data Analysis", id:"nonLin", ajaxx:"", links:[]},
    ]},
	{title:"Chapter 1: Kinematics (1D)", id:"kin1d", ajax:"kin1d/displ.htm#KinDyn", links:[
        {title:"Assignment Booklet", gdrv:"1BIjjYrWHCArAF0qcKrkqdnfCEg41jWuF"},
        {title:"Lab Booklet", gdrv:"1hh8Owger30gOqlBOclDT-kJnPmL3w-XR"},
    ], nodes:[
		{title:"Position & Displacement", id:"displ", ajax:"kin1d/displ.htm#Displ"},
		{title:"Velocity & Speed", id:"vel", ajax:"kin1d/vel.htm#Vel"},
		{title:"Motion Graphs", id:"dtGraph", ajax:"kin1d/graph.htm#dtGraph"},
		{title:"Acceleration", id:"accel", ajax:"kin1d/accel.htm#Accel"},
		{title:"Uniform Accelerated Motion", id:"uam", ajax:"kin1d/uam.htm#UAM"},
    ]},
	{title:"Chapter 6: Energy", id:"energy", links:[
        {title:"Assignment Booklet", gdrv:"1wCOMOf5tN1rQ_qsfpKTL7aRsLCYtCyr2"},
        {title:"Lab Booklet", gdrv:"19_P_AtqF6yGA4481h0gH6ZPV4BeqSv8A"},
        // {title:"Bar Chart", ajax:"energy/barchart.htm#_BarChart", icon:"html5"},
    ], nodes:[
		{title:"Mechanical Energy", id:"Emech", ajax:"energy/Emech.htm#Emech"},
		{title:"Energy Conservation", id:"Econs", ajax:"energy/Econs.htm#Econs"},
		{title:"Non-Isolated Systems", id:"nonIso", ajax:"energy/nonIso.htm#NonIso"},
        // {title:"Energy Transformations (Work)", ajax:"", links:[]},
		// {title:"Work-Energy Theorem", ajax:"", links:[]},
		// {title:"Power & Efficiency", ajax:"", links:[]},
	]},
	{title:"Chapter 3: Dynamics", id:"dyn", article:"Choose", links:[
        {title:"Assignment Booklet", gdrv:"1c9HSP3IG2iXg84DFFJYiW_8jlpJ7mH2I"},
        {title:"Lab Booklet", gdrv:"1Z05e3AIQpijSqzOmC3UOk74t9PFo1ErC"},
    ], nodes:[
		{title:"Inertia & Force", id:"force", ajax:"dyn/force.htm#Force"},
		{title:"Newton’s 3<sup>rd</sup> Law", id:"N3", ajax:"dyn/n3.htm#N3"},
		// {title:"", ajax:"", links:[]},
    ]},
	// {title:"Chapter 4: Circular & Orbital Motion", id:"circ", links:[
    //     {title:"Heliocentric Model", ajax:"circ/helio.htm#Helio", icon:"html5"},
    // ], nodes:[]},
	// {title:"Chapter 5: Universal Gravitation", id:"grav", article:"Choose", nodes:[]},
	// {title:"Chapter 6: Oscillations", id:"osc", article:"Choose", nodes:[]},
	// {title:"Chapter 7: Mechanical Waves", id:"wave", article:"Choose", nodes:[]},
	// {title:"Chapter 8: 2D Vectors", id:"vec2d", article:"Choose", nodes:[]},
]}

let home = p20;
