var sitemap = {title:"sc8pr 2 Home", link:"home", pages:[
	{title:"Gallery", link:"ex"},
	{title:"Installation", link:"inst"},
	{title:"Tutorial", link:"tut", pages:[
		{title:"Basics", link:"sk", pages:[
			{title:"The <code>setup</code> Function", link:"setup"},
			{title:"Adding Graphics", link:"gr"},
			{title:"Animations", link:"anim"}
		]},
		{title:"Event Handling", link:"ev", pages:[
			{title:"<code>ondraw</code> Handlers", link:"draw"},
			{title:"Mouse Events", link:"click"},
		]},
		{title:"Object-Oriented Style", link:"oop"},
		{title:"Sprite Animations", link:"spriteAnim", pages:[
			{title:"Sprite Collision", link:"collision_tut"},
		]},
		{title:"GUI Controls", link:"gui_tut"},
	]},
	{title:"Reference", link:"ref", pages:[
		{title:"Graphic Class Hierarchy", link:"hierarchy22"},
		{title:"Event Model", link:"evList"},
		{title:"sc8pr", link:"init", pages:[
			{title:"class Graphic", link:"graphic"},
			{title:"class BaseSprite", link:"base"},
			{title:"class Canvas", link:"canvas"},
			{title:"class Image", link:"image"},
			{title:"class PixelData", link:"pixeldata"},
			{title:"class Renderable", link:"render"},
			{title:"class Sketch", link:"sketch"},
		]},
		{title:"sc8pr.geom", link:"geom"},
		{title:"sc8pr.gui.*", link:"gui", pages:[
			{title:".scroll", link:"scroll"},
			{title:"class Button", link:"button_class"},
			{title:"class Dialog", link:"dialog"},
			{title:"class Menu", link:"menu_class"},
			{title:"class MessageBox", link:"msgbox"},
			{title:"class NumInputBox", link:"msgbox"},
			{title:"class Options", link:"options"},
			{title:"class Radio", link:"radio"},
			{title:"class Slider", link:"slider"},
			{title:"class TextInput", link:"ti_class"},
			{title:"class TextInputCanvas", link:"ti_canvas"},
		]},
		{title:"sc8pr.misc.*", link:"misc", pages:[
			{title:".effect", link:"effect"},
			{title:".hsv", link:"hsv"},
			{title:".media", link:"media", pages:[
				{title:"class FFReader", link:"ffr"},
				{title:"class FFWriter", link:"ffw"},
				{title:"class Grabber", link:"grabber"},
				{title:"class Movie", link:"movie"},
			]},
			{title:".plot [Deprecated]", link:"plot", pages:[
				{title:"class Locus", link:"locus_depr"},
				{title:"class Plot", link:"plot_class"},
				{title:"class Series", link:"series"},
			]},	
			{title:".progress", link:"progress"},
			{title:".s8v", link:"s8v"},
			{title:".typeset", link:"typeset"},
			{title:".effect", link:"effect"},
			{title:".video", link:"video", pages:[
				{title:"class Video", link:"video_class"},
			]},
			{title:".webcache", link:"webcache", pages:[
				{title:"class WebCache", link:"wc"},
			]},
		]},
		{title:"sc8pr.plot.*", link:"plot_pkg", pages:[
			{title:".mpl", link:"mpl"},
//			{title:".regression", link:"regression"},
		]},
		{title:"sc8pr.robot.*", link:"robot_class", pages:[
			{title:".gui", link:"r_gui"},
		]},
		{title:"sc8pr.shape", link:"shape", pages:[
			{title:"class Arc", link:"arc"},
			{title:"class Arrow", link:"arrow"},
			{title:"class Circle", link:"circle"},
			{title:"class Ellipse", link:"ellipse"},
			{title:"class Line", link:"line"},
			{title:"class Locus", link:"locus"},
			{title:"class Polygon", link:"polygon"},
		]},
		{title:"sc8pr.sprite", link:"sprite", pages:[
			{title:"class CostumeImage", link:"sprite_class"},
			{title:"class Sprite", link:"sprite_class"},
			{title:"class Collisions", link:"collisions"},
		]},
		{title:"sc8pr.text", link:"text", pages:[
			{title:"class Font", link:"font"},
			{title:"class Text", link:"text_class"},
		]},
		{title:"sc8pr.util", link:"util"},
	]},
]}
