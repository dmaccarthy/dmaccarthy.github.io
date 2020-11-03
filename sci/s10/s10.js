let s10 = {title:"Science 10", article:"Home", links:[
    {title:"Calendar", url:"https://calendar.google.com/calendar/embed?src=eips.ca_classroom24128d37%40group.calendar.google.com&ctz=America%2FEdmonton", icon:"cal"},
    {title:"Data Booklet", gdrv:"1i3wbmTM3sWiUoSb3q4y1B44EXwhP79M6"},
    {title:"Brightspace", articlx:"BS", url:"https://eips.brightspace.com/d2l/home/26288", icon:"bs"},
    {title:"PowerSchool", url:"https://powerschool.eips.ca/public/home.html", icon:"https://powerschool.eips.ca/favicon.ico"},
    {title:"Sal Comp", url:"https://salcomp.ca", icon:"https://www.salcomp.ca/uploads/263/Salisbury%20S_red-grey/1452114178-250w_Salisbury%20S_red-grey.jpg"},
    {title:"Course Outline", url:"https://scienceoutlines.davidmaccarthy.repl.co/?s10", icon:"flask"},
    {title:"Program of Studies", url:"https://education.alberta.ca/science-10-12/programs-of-study/?searchMode=3", icon:"https://www.alberta.ca/build/20201029/favicons/favicon-192.png"},
], nodes:[
	{title:"Unit 1: Chemistry", id:"chem", ajax:"chem/matter.htm#Chem", nodes:[
		{title:"Matter", ajax:"chem/matter.htm#Matter", links:[
            {title:"Google Drive", url:"https://drive.google.com", icon:"gdrv"},
            {title:"Google Drive Link", url:"https://database.davidmaccarthy.repl.co/cloud.html?crs=Science%2010"},
    		{title:"Assignment Booklet", gdrv:"1lTmBaRuHLrszMlnP76dc-b6xTKs_b7NQ"},
            {title:"WHMIS 2015", icon:"https://www.ccohs.ca/assets/favicon.ico", url:"https://www.ccohs.ca/oshanswers/chemicals/whmis_ghs/pictograms.html#wb-auto-5"},
            {title:"WHMIS 1988", icon:"https://www.ccohs.ca/assets/favicon.ico", url:"https://www.ccohs.ca/oshanswers/legisl/msds_lab.html#wb-auto-15"},
        ], nodes:[
        ]},
		// {title:"Compounds", ajax:"chem/compound.htm#Comp", nodes:[]},
		// {title:"Chemical Reactions", ajax:"chem/rxn.htm#Rxn", nodes:[]},
	]},
	{title:"Unit 2: Physics", id:"phys", ajax:"phys/motion.htm#Phys", nodes:[
		{title:"Motion", ajax:"phys/motion.htm#Motion", nodes:[
        ]},
		// {title:"Energy", ajax:"phys/energy.htm#Energy", nodes:[
        //     {title:"Mechanical Energy", nodes:[]},
        //     {title:"Work"},
        // ]},
		// {title:"Heat", ajax:"phys/heat.htm#Heat", nodes:[
        //     {title:"Theories of Heat", links:[]},
        //     {title:"Efficiency"},
        // ]},
	]},
	// {title:"Unit 3: Biology", id:"bio", article:"Choose", nodes:[
	// 	{title:"Cells", ajax:"bio/cell.htm#Cell", nodes:[]},
	// 	{title:"Membranes & Transport", ajax:"bio/membrane.htm#Memb", nodes:[]},
	// 	{title:"Plant Systems", ajax:"bio/plant.htm#Plant", nodes:[
    //         {title:"Photosynthesis", ajax:"bio/plant.htm#Photo", links:[
    //             {title:"Amoeba Sisters", video:"uixA8ZXx0KU"},
    //             {title:"Playlist", video:"#PLpVmtCaB-lykC3KWCNWfsOFWwLVtPHwhN"},
    //         ]},
    //     ]},
	// ]},
	// {title:"Unit 4: Climate", id:"clim", article:"Choose", nodes:[
	// 	{title:"A. Climate Science", nodes:[]},
	// 	{title:"B. Biomes", nodes:[]},
	// ]},
]}

let home = s10; //{title:"Mr. Mac’s Home", nodes:[s10]};
