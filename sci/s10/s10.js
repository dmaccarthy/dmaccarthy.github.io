let s10 = {title:"Science 10", id:"s10", article:"Home", links:[
    // {title:"Calendar", url:"https://calendar.google.com/calendar/embed?src=eips.ca_classroom24128d37%40group.calendar.google.com&ctz=America%2FEdmonton", icon:"cal"},
    {title:"Brightspace / Calendar", articlx:"BS", url:"https://eips.brightspace.com/d2l/home/26288", icon:"bs"},
    {title:"Google Meet [hpu-wwks-xfr]", icon:"https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-512dp/logo_meet_2020q4_color_1x_web_512dp.png", url:"https://meet.google.com/hpu-wwks-xfr"},
    {title:"Schedule", icon:"cal", ajax:"virtual.htm#Sched"},
    {title:"Data Booklet", gdrv:"1i3wbmTM3sWiUoSb3q4y1B44EXwhP79M6"},
    {title:"PowerSchool", url:"https://powerschool.eips.ca/public/home.html", icon:"https://powerschool.eips.ca/favicon.ico"},
    {title:"Sal Comp", url:"https://salcomp.ca", icon:"https://www.salcomp.ca/uploads/263/Salisbury%20S_red-grey/1452114178-250w_Salisbury%20S_red-grey.jpg"},
    {title:"Course Outline", url:"https://scienceoutlines.davidmaccarthy.repl.co/?s10", icon:"flask"},
    {title:"Program of Studies", url:"https://education.alberta.ca/science-10-12/programs-of-study/?searchMode=3", icon:"https://www.alberta.ca/build/20201029/favicons/favicon-192.png"},
], nodes:[
	{title:"Unit A: Chemistry", id:"chem", ajax:"chem/matter.htm#Chem", links:[
    	{title:"Lab Booklet", gdrv:"1z0Q_C5StUJFBZfuLjdmhQINjH6fQgI1x"},      
    ], nodes:[
		{title:"Part 1: Matter", ajax:"chem/matter.htm#Matter", links:[
    		{title:"Assignment Booklet", gdrv:"1VpaQvs63Zo9fR_LkpNCsnUdYQDBNmyIH"},
        ], nodes:[
            {title:"Lab Safety", video:"MEIXRLcC6RA", links:[
                // {title:"Google Drive", url:"https://drive.google.com", icon:"gdrv"},
                // {title:"Google Drive Link", url:"https://database.davidmaccarthy.repl.co/cloud.html?crs=Science%2010"},
                {title:"WHMIS 2015", icon:"https://www.ccohs.ca/assets/favicon.ico", url:"https://www.ccohs.ca/oshanswers/chemicals/whmis_ghs/pictograms.html#wb-auto-5"},
                {title:"WHMIS 1988", icon:"https://www.ccohs.ca/assets/favicon.ico", url:"https://www.ccohs.ca/oshanswers/legisl/msds_lab.html#wb-auto-15"},
                {title:"Lesson Notes", icon:"lesson", url:"https://slides.davidmaccarthy.repl.co/s10/chem/safety.html"},
            ]},
            {title:"Classifying Matter", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/chem/matter.html"},
            {title:"Atomic Theory", links:[
                {title:"Bill Nye", video:"ogPNZ_MXksM"},
                {title:"Early Atomic Theory", video:"UDIprICe9kg"},
                {title:"Lesson Notes", icon:"lesson", url:"https://slides.davidmaccarthy.repl.co/s10/chem/atomic.html"},
            ]},
            {title:"Isotopes & Ions", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/chem/isotope.html"},
            {title:"Bohr Model (Energy Levels)", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/chem/bohr.html"},
            {title:"Periodic Table & Dot Diagrams", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/chem/dot.html"},
        ]},
		{title:"Part 2: Compounds", article:"Unavail", ajaxx:"chem/molec.htm#Comp", links:[
    		{title:"Assignment Booklet", gdrv:"1hQ0ogBPmS1Q0XQvbN1QvK75dXOzsvLUe"},
        ], nodes:[
            // {title:"Molecular Compounds", id:"molec", ajax:"chem/molec.htm#Molec"},
            // {title:"Binary Ionic Compounds", id:"ionic", ajax:"chem/ionic.htm#Ionic"},
            // {title:"", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/chem/.html"},
            // {title:"", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/chem/.html"},
        ]},
		{title:"Part 3: Chemical Reactions", article:"Unavail", ajaxx:"chem/rxn.htm#Rxn", nodes:[
        ]},
	]},
	{title:"Unit B: Physics", id:"phys", ajax:"phys/motion.htm#Phys", links:[
    	{title:"Lab Booklet", gdrv:"1OPceA63nJfQ8PLbmUzg1ZRbdJapCIDqy"},      
    ], nodes:[
		{title:"Part 1: Motion", ajax:"phys/motion.htm#Motion", links:[
    		{title:"Assignment Booklet", gdrv:"1GPDHxXN53d9-CIoep1kiadbW57lAJzs0"},
        ], nodes:[
            {title:"Scientific Notation", id:"sciNot", ajax:"phys/skill/sciNot.htm#SciNot"},
            {title:"SI Units", id:"si", ajax:"phys/skill/SI.htm#SI"},
            {title:"Scientific Method", id:"expDes", ajax:"phys/skill/expDes.htm#ExpDes", links:[
                {title:"Video", video:"nzfDvfoBv_g"},
            ]},
            {title:"Graphing Data", id:"scatter", ajax:"phys/skill/scatter.htm#Scatter"},
            {title:"Position & Displacement", article:"Tab", id:"displ", url:"https://slides.davidmaccarthy.repl.co/s10/phys/displ.html"},
            {title:"Velocity", article:"Tab", id:"vel", url:"https://slides.davidmaccarthy.repl.co/s10/phys/vel.html"},
            {title:"Acceleration", article:"Tab", id:"accel", url:"https://slides.davidmaccarthy.repl.co/s10/phys/accel.html"},
        ]},
		{title:"Part 2: Energy", ajax:"phys/energy.htm#Energy", links:[
    		{title:"Assignment Booklet", gdrv:"16bG3m7hDfrJIt27qTXtnOlnP8psb9wje"},
    		{title:"Unit Project", icon:"gdrv", url:"https://docs.google.com/document/d/1Tzg2GicMO0712rPXkqi_1t_XOtFkVlLXMaNU86dIb18"},
        ], nodes:[
            {title:"Mechanical Energy", article:"Tab", id:"mech", url:"https://slides.davidmaccarthy.repl.co/s10/phys/mech.html"},
            {title:"Energy Transformations", article:"Tab", id:"Etran", url:"https://slides.davidmaccarthy.repl.co/s10/phys/transform.html"},
            {title:"Work & Energy", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/phys/work.html"},
            {title:"Heat", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/phys/heat.html"},
            {title:"Efficiency", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/phys/effic.html"},
        ]},
	]},
	{title:"Unit C: Biology", id:"bio", ajax:"bio/cell.htm#Bio", links:[
    	{title:"Assignment Booklet", gdrv:"1FJAIV5ZcYVq97d0yU5NPUbW-pApN2sVI"},
    	{title:"Lab Booklet", gdrv:"1vwczNk166SFFxYEoC82FDI4Ck2D_edap"},      
    ], nodes:[
		{title:"Part 1: Cells", ajax:"bio/cell.htm#Cell", nodes:[
    		{title:"Compound Light Microscope", article:"Tab", url:"https://docs.google.com/presentation/d/1wKI1blXJukMRBUC7b1B4PhBrgXfBZs7KKx_DVFRf-9M"},
    		{title:"Biogenesis & Cell Theory", article:"Tab", url:"https://docs.google.com/presentation/d/1yg_Q804TGQauW9EzNnbmJZlHkK8nR0qiIp5iaESYRBA"},
    		{title:"Organelles", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/bio/organelle.html"},
        ]},
		{title:"Part 2: Membranes & Transport", id:"membrane", ajax:"bio/membrane.htm#Memb", nodes:[
    		{title:"Membranes", article:"Tab", url:"https://slides.davidmaccarthy.repl.co/s10/bio/memb.html"},
    		{title:"Active & Passive Transport", article:"Tab", url:"https://docs.google.com/presentation/d/1qJYqVyhLdOpIwEF8qv0EsbnYO6dRbofZvqICN0g568g"},

        ]},
		{title:"Part 3: Plant Systems", id:"plants", ajax:"bio/plant.htm#Plant", nodes:[
            {title:"Photosynthesis", ajax:"bio/plant.htm#Photo", links:[
                // {title:"Amoeba Sisters", video:"uixA8ZXx0KU"},
                // {title:"Playlist", video:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN"},
            ]},
    		// {title:"", article:"Tab", url:""},
    		// {title:"", article:"Tab", url:""},
        ]},
	]},
	{title:"Unit D: Climate", id:"clim", article:"Unavail", nodes:[
		// {title:"Climate Science", nodes:[]},
		// {title:"Biomes", nodes:[]},
		// {title:"Climate Change", nodes:[]},
	]},
]}

let home = s10; //{title:"Mr. Mac’s Home", nodes:[s10]};
