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
from sc8pr.misc.effect import Tint, PaintDrops, Wipe, WipeSlope, Squish, Dissolve
from sc8pr.text import Text, Font
#from sc8pr.misc.video import Video

def setup(sk):
    sk.frameRate = 30
#    sk.capture = Video().config(interval=1)
    x, y = sk.center
    alien = Sprite("aliens.png", 2, 2).config(
        pos = (x, y),
        height = sk.height / 2,
        costumeTime = 10,
    ).bind(ondraw=alienDraw)
    sk += alien.costumeSequence([0, 0, 0, 1, 2, 3, 3, 2, 1])
    text = Text("Tint('green')").config(fontSize=30, font=Font.mono(), pos=(x, 32))
    sk += text.bind(ondraw=textDraw)
    setEffect(alien)

def setEffect(alien, n=0, f=0):
    "Modify transition effects for alien sprite"
    if n == 0:
        alien.effects = [
            Tint("green").time(f, f+90),     # Transition in from green
            Tint("red").time(f+270, f+150),  # Transition out to red
            Tint().time(f+360, f+270),       # Fade out to transparent
        ]
    elif n == 1:
        alien.effects = [
            PaintDrops().time(f, f+90),                # Transition in
            PaintDrops(drops=-64).time(f+240, f+150),  # Transition out
        ]
    elif n == 2:
        alien.effects = [
            Wipe(RIGHT).time(f, f+90),                 # Transition in
            WipeSlope(-0.2).time(f+240, f+150),        # Transition out
        ]
    elif n == 3:
        alien.effects = [
            Squish(BOTTOM).time(f, f+90),              # Transition in
            Dissolve().time(f+240, f+150),             # Transition out
        ]

def alienDraw(alien):
    "ONDRAW event handler for alien sprite"
    f = alien.sketch.frameCount
    if f == 360: setEffect(alien, 1, f)
    elif f == 600: setEffect(alien, 2, f)
    elif f == 840: setEffect(alien, 3, f)
    elif f == 1080: alien.sketch.quit = True

def textDraw(text):
    f = text.sketch.frameCount
    t = None
    if f == 90: t = ""
    elif f == 150: t = "Tint('red')"
    elif f == 270: t = "Tint()"
    elif f == 360: t = "PaintDrops()"
    elif f == 450: t = ""
    elif f == 510: t = "PaintDrops(drops=-64)"
    elif f == 600: t = "Wipe(RIGHT)"
    elif f == 690: t = ""
    elif f == 750: t = "WipeSlope(-0.2)"
    elif f == 840: t = "Squish(BOTTOM)"
    elif f == 930: t = ""
    elif f == 990: t = "Dissolve()"
    if t is not None: text.config(data=t)
    

Sketch((640,360)).play("Transitions Demo") #.capture.save("demo.s8v")
