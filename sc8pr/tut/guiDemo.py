from sc8pr import Sketch, TOPLEFT, TOPRIGHT, BOTTOM, CENTER, TOP, Canvas
from sc8pr.util import rgba
from sc8pr.text import BOLD, Font
from sc8pr.gui.textinput import TextInput
from sc8pr.gui.radio import Radio, Options
from sc8pr.gui.slider import Slider
from sc8pr.gui.progress import ProgressBar
from sc8pr.gui.button import Button

GREY, BLUE = rgba("#ececec", "blue")
FONT = Font.sans()

def noResize(gr, size): pass

def setup(sk):
    # Create a Canvas as a GUI dialog
    cv = Canvas(sk.size).config(pos=sk.center, bg="#f0f0ff", weight=1)
    sk += cv.bind(resize=noResize)

    # Add a TextInput
    xc = sk.center[0]
    cv += TextInput("", "Type Some Text...").config(anchor=TOP,
        font=FONT, fontStyle=BOLD, pos=(xc,8), color=BLUE,
        bg="#d8d8d8", padding=4, name="Input").bind(onaction)

    # Add a Slider
    slider = Slider((16, cv.height), BLUE, 100, 0, 100)
    slider.config(pos=(cv.width, 0), anchor=TOPRIGHT, bg=GREY, weight=1)
    cv += slider.bind(onchange=sliderChange)

    # Add a ProgressBar
    prog = ProgressBar((180, 16), BLUE).bind(ondraw=progress)
    cv += prog.config(pos=(xc, cv.height-5), bg=GREY,
        anchor=BOTTOM, weight=1, change=0.01)

    # Add a Radio box
    text = "Option A", "Option B", "Option C"
    radio = Radio(text, font=FONT, fontSize=16).bind(onchange=radioChange)
    cv += radio.config(pos=(8, 80), anchor=TOPLEFT, selected=1)

    # Add an Options box
    text = "Option X", "Option Y", "Option Z"
    radio = Options(text, font=FONT, fontSize=16).config(pos=(8, 180), anchor=TOPLEFT)
    cv += radio.bind(onaction=optionsChange)

    # Add a selectable button
    size = 120, 48
    print(0)
    btn = Button(size).content("Selectable\nButton").bind(onaction=buttonClick)
    print(1)
    cv += btn.config(pos=(240, 80), anchor=TOP, name="Selectable")
    btn[0].config(font=FONT, fontSize=16, color=BLUE, align=CENTER)

    # Add a non-selectable 'Okay' button
    print(2)
    btn = Button(size, 2).content("Okay").bind(onaction=buttonClick)
    cv += btn.config(pos=(240, 180), anchor=TOP, name="Okay")
    btn[0].config(font=FONT, fontSize=16)
    print(3)

def onaction(gr, ev):
    "Event handler for TextInput"
    print(gr, gr.data)

def radioChange(gr, ev):
    "Event handler for Radio"
    print(gr, gr.selected.layer)

def optionsChange(gr, ev):
    "Event handler for Options"
    target = ev.target
    print(gr, target.layer, target.selected)

def sliderChange(gr, ev):
    "Event handler for Slider"
    print(gr, gr.value)

def buttonClick(btn, ev):
    "Event handler for buttons"
    print(btn, btn.selected)

def progress(gr):
    "Update progress bar"
    if gr.value >= 1: gr.change = -0.01
    elif gr.value <= 0: gr.change = 0.01
    gr.value += gr.change


# Play the sketch
Sketch((384, 288)).play("GUI Demo")
