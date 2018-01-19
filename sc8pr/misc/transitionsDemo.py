# Copyright 2018 D.G. MacCarthy <http://dmaccarthy.github.io>
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

"A demonstration of some transition effects from sc8pr.misc.effect"

from sc8pr import Sketch, RIGHT, BOTTOM
from sc8pr.sprite import Sprite
from sc8pr.misc.effect import Tint, PaintDrops, Wipe, \
    WipeSlope, Squash, Dissolve, MathEffect, ClockHand
from sc8pr.text import Text, Font
#from sc8pr.misc.video import Video


def setup(sk):
    sk.frameRate = 30
#    sk.capture = Video().config(interval=1)
    alien = Sprite("aliens.png", 2, 2).config(
        pos = sk.center,
        height = sk.height / 2,
        costumeTime = 6,
    ).bind(ondraw=alienDraw)
    sk += alien.costumeSequence([0, 0, 0, 1, 2, 3, 3, 2, 1])
    pos = alien.pos[0], 32
    text = Text("Tint('green')").config(fontSize=30, font=Font.mono(), pos=pos)
    sk += text.bind(ondraw=textDraw)
    setEffect(alien)

def setEffect(alien, n=0, f=0):
    "Modify transition effects for alien sprite"
    alien.effects = [[
        Tint("green").time(f, f+90),        # Transition in from green
        Tint("red").time(f+270, f+150),     # Transition out to red
        Tint().time(f+360, f+270)           # Fade out to transparent
    ], [ # n = 1
        PaintDrops().time(f, f+90),         # Transition in
        PaintDrops(-8).time(f+240, f+150)   # Transition out
    ], [ # n = 2
        Wipe(RIGHT).time(f, f+90),          # Transition in
        WipeSlope(-0.2).time(f+240, f+150)  # Transition out
    ], [ # n = 3
        Squash(BOTTOM).time(f, f+90),       # Transition in
        Dissolve().time(f+240, f+150)       # Transition out
    ], [ # n = 4
        MathEffect().time(f, f+90),         # Transition out
        ClockHand().time(f+240, f+150)]     # Transition in
    ][n]

def alienDraw(alien):
    "ONDRAW event handler for alien sprite"
    Sprite.ondraw(alien)
    f = alien.sketch.frameCount
    if f == 360: setEffect(alien, 1, f)
    elif f == 600: setEffect(alien, 2, f)
    elif f == 840: setEffect(alien, 3, f)
    elif f == 1080: setEffect(alien, 4, f)
    elif f == 1350: alien.sketch.quit = True

def textDraw(text):
    "ONDRAW event handler for text"
    caption = {90:"", 150:"Tint('red')", 270:"Tint()", 360:"PaintDrops()",
        450:"", 510:"PaintDrops(-8)", 600:"Wipe(RIGHT)", 690:"",
        750:"WipeSlope(-0.2)", 840:"Squash(BOTTOM)", 930:"",
        990:"Dissolve()", 1080:"MathEffect()", 1170:"", 1230:"ClockHand()",
        1320:""}
    f = text.sketch.frameCount
    if f in caption: text.config(data=caption[f])

Sketch((640,360)).play("Transitions Demo")#.capture.save("demo.s8v")
