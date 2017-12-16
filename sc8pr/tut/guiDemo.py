# Copyright 2017 D.G. MacCarthy <http://dmaccarthy.github.io>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


from sc8pr import Sketch, Canvas, Image, TOPLEFT, TOPRIGHT, BOTTOM, CENTER, TOP
from sc8pr.util import rgba, nothing, sc8prData
from sc8pr.text import BOLD, Font
from sc8pr.gui.textinput import TextInput
from sc8pr.gui.radio import Radio, Options
from sc8pr.gui.slider import Slider
from sc8pr.gui.button import Button, yesNo
from sc8pr.gui.menu import Menu, R_TRIANGLE
from sc8pr.misc.progress import ProgressBar

GREY, BLUE = rgba("#ececec", "blue")
FONT = Font.sans()

def setup(sk):
    # Create a Canvas as a GUI dialog
    cv = Canvas(sk.size).config(pos=sk.center, bg="#f0f0ff", weight=1)
    sk += cv.bind(resize=nothing)

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
    cfg = {"font":FONT, "fontSize":14}
    text = "Option A", "Option B", "Option C"
    radio = Radio(text, **cfg).bind(onchange=radioChange)
    cv += radio.config(pos=(8, 80), anchor=TOPLEFT, selected=1)

    # Add an Options box
    text = "Option X", "Option Y", "Option Z"
    radio = Options(text, **cfg).config(pos=(8, 180), anchor=TOPLEFT)
    cv += radio.bind(onaction=optionsChange)

    # Add a selectable button
    size = 120, 48
    btn = Button(size).textIcon("Selectable\nButton", yesNo()[0]).bind(onaction=buttonClick)
    cv += btn.config(pos=(240, 80), anchor=TOP, name="Selectable")
    btn[-1].config(color=BLUE, align=CENTER, **cfg)

    # Add a non-selectable button
    btn = Button(size, 2).textIcon("Popup Menu").bind(onaction=buttonClick)
    btn[-1].config(**cfg)
    cv += btn.config(pos=(240, 180), anchor=TOP, name="Popup")

    # Create a popup menu
    img = Image.fromBytes(sc8prData("alien"))
    items = [("Action", img, None), ("Back", None, R_TRIANGLE)]
    cv.menu = Menu(items, txtConfig=cfg).config(pos=sk.center)
    cv.menu.bind(resize=nothing, onaction=menuAction)

    # Create a cover to block other controls when popup running
    cv.cover = Image(bg="#ffffffc0").config(anchor=TOPLEFT)

def onaction(gr, ev):
    "Event handler for TextInput"
    print(gr, gr.data)

def radioChange(gr, ev):
    "Event handler for Radio"
    print(gr, gr.selected.layer)

def menuAction(menu, ev):
    "Event handler for Menu"
    n = menu.buttonNumber(ev.target)
    print(menu, n)
    if n == 1: # Item 1 = Back
        for btn in menu: btn.status = "normal"
        cv = menu.canvas
        cv.cover.remove()
        menu.remove()

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
    if btn.name == "Popup":
        cv = btn.canvas
        btn.status = "normal"
        cv += cv.cover.config(size=cv.size)
        cv += cv.menu

def progress(gr):
    "Update progress bar"
    if gr.value >= 1: gr.change = -0.01
    elif gr.value <= 0: gr.change = 0.01
    gr.value += gr.change


# Play the sketch
Sketch((384, 288)).play("GUI Demo")
