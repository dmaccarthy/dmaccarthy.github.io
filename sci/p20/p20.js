let ch3 = {title:"Chapter 3: Dynamics", id:"dyn", links:[
    {title:"Assignment Booklet", gdrv:"1c9HSP3IG2iXg84DFFJYiW_8jlpJ7mH2I"},
    {title:"Lab Booklet", gdrv:"1Z05e3AIQpijSqzOmC3UOk74t9PFo1ErC"},
], nodes:[
    {title:"Inertia & Force", id:"force", ajax:"dyn/force.htm#Force"},
    // {title:"Newton’s 3<sup>rd</sup> Law", id:"N3", ajax:"dyn/n3.htm#N3"},
    // {title:"", ajax:"", links:[]},
]};

let ch6 = {title:"Chapter 6: Energy", id:"energy", links:[
    {title:"Assignment Booklet", gdrv:"1wCOMOf5tN1rQ_qsfpKTL7aRsLCYtCyr2"},
    {title:"Lab Booklet", gdrv:"19_P_AtqF6yGA4481h0gH6ZPV4BeqSv8A"},
], nodes:[
    {title:"Mechanical Energy", id:"Emech", ajax:"energy/Emech.htm#Emech", links:[
        {title:"Answer Key", url:"https://docs.google.com/document/d/1iloIQCAF9Mpqmu7UcgJUDTumhVlto3oiqaOynvRJXEM"},
    ]},
    {title:"Energy Conservation", id:"Econs", ajax:"energy/Econs.htm#Econs", links:[
        {title:"Answer Key", url:"https://docs.google.com/document/d/1R_2LFv4ACrEeqdQHBW2HgZGA0U4xBxyj_4OreFuKByc"},
    ]},
    {title:"Non-Isolated Systems", id:"nonIso", ajax:"energy/nonIso.htm#NonIso", links:[
        {title:"Answer Key", url:"https://docs.google.com/document/d/16l4nFjj8OgsKLtjsPEh-jtAtsg3pYahDXFcDsT3K0dk"},
    ]},
    {title:"Energy Transformations (Work)", id:"work", ajax:"energy/work.htm#Work", links:[
        {title:"Answer Key", url:"https://docs.google.com/document/d/1M3ePHY_hvHRRvZpyOkLHkUbeOgSM0NQfO5oxZ75mKcY"},
    ]},
    {title:"Work-Energy Theorem", id:"we", ajax:"energy/we.htm#WE_Thm", links:[
        {title:"Answer Key", url:"https://docs.google.com/document/d/1Xk85LGlNrOTX4Ckg672gfp5T6L9IZOTdKxAu7lKPGLM"},
    ]},
    {title:"Power & Efficiency", id:"power", ajax:"energy/power.htm#Power", links:[
        // {title:"Answer Key", url:"https://docs.google.com/document/d/1PHRVmr9tMgm8ncSCnykQ1zYYznPADaJZV1KcrYZAWmQ"},
    ]},
]};

let p20 = {title:"Physics 20", id:"p20", article:"Home", links:[
    // {title:"Google Drive", url:"https://drive.google.com", icon:"gdrv"},
    // {title:"Google Drive Link", url:"https://database.davidmaccarthy.repl.co/cloud.html?crs=Physics%2020"},
    // {title:"Calendar", url:"https://calendar.google.com/calendar/embed?src=eips.ca_classrooma95b0655%40group.calendar.google.com&ctz=America%2FEdmonton", icon:"cal"},
    {title:"Brightspace / Calendar", url:"https://eips.brightspace.com/d2l/home/26301", icon:"bs"},
    {title:"Google Meet [vut-haca-skc]", icon:"https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-512dp/logo_meet_2020q4_color_1x_web_512dp.png", url:"https://meet.google.com/vut-haca-skc"},
    {title:"Schedule", icon:"cal", ajax:"virtual.htm#Sched"},
    {title:"Data Booklet", gdrv:"1BitARClCliTU4PZ0vPCJ3jnVmW-3lyag"},
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
    ]}, ch6, ch3,
	{title:"Chapter 5: Circular & Orbital Motion", id:"circ", article:"Unavail", links:[
        // {title:"Heliocentric Model", ajax:"circ/helio.htm#Helio", icon:"html5"},
    ], nodes:[]},
	{title:"Chapter 4: Universal Gravitation", id:"grav", article:"Unavail", nodes:[]},
	{title:"Chapter 7: Oscillations", id:"osc", article:"Unavail", nodes:[]},
	{title:"Chapter 8: Mechanical Waves", id:"wave", article:"Unavail", nodes:[]},
	{title:"Chapter 2: 2D Vectors", id:"vec2d", article:"Unavail", nodes:[]},
]}

let home = p20;
