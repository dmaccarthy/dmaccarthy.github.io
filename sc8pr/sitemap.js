var sitemap = {title:"sc8pr 2.0 Home", link:"home", pages:[
	{title:"Installation", link:"inst"},
	{title:"Tutorial", link:"tut", pages:[
		{title:"Sketch Basics", link:"sk", pages:[
			{title:"The <code>setup</code> Function", link:"setup"},
			{title:"Adding Graphics", link:"gr"},
			{title:"Animations", link:"anim"}
		]},
		{title:"Event Handling", link:"ev", pages:[
			{title:"<code>ondraw</code> Handlers", link:"draw"},
			{title:"<code>onclick</code> Handlers", link:"click"},
			{title:"Supported Events", link:"evList"}
		]},
		{title:"Object-Oriented Style", link:"oop"},
		{title:"Sprite Animations", link:"spriteAnim"},
		{title:"GUI Controls", link:"gui_tut"},
	]},
	{title:"Module Reference", link:"ref", pages:[
		{title:"sc8pr", link:"init", pages:[
			{title:"class Graphic", link:"graphic"},
			{title:"class Image", link:"image"},
			{title:"class Canvas", link:"canvas"},
			{title:"class Sketch", link:"sketch"},
			{title:"class BaseSprite", link:"base"},
			{title:"class Renderable", link:"render"},
		]},
		{title:"sc8pr.geom", link:"geom", pages:[]},
/*		{title:"sc8pr.gui.*", link:"gui", pages:[]},
		{title:"sc8pr.misc.*", link:"misc", pages:[
			{title:".cursors", link:"cursors"},
			{title:".effect", link:"effect"},
			{title:".grab", link:"grab"},
			{title:".plot", link:"plot"},
			{title:".progress", link:"progress"},
			{title:".video", link:"video"},
		]},
		{title:"sc8pr.robot", link:"robot", pages:[]}, */
		{title:"sc8pr.shape", link:"shape", pages:[
			{title:"class Line", link:"line"},
		]},
		{title:"sc8pr.text", link:"text", pages:[
			{title:"class Font", link:"font"},
			{title:"class Text", link:"text_class"},
		]},
		{title:"sc8pr.util", link:"util", pages:[]},
	]},
]}
