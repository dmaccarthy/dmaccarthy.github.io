# Copyright 2020 D.G. MacCarthy <http://dmaccarthy.github.io>
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

"""
A demonstration of plotting and scrolling canvases using sc8pr.plot*
(*Experimental package in sc8pr v2.2)

"""

from math import sin, pi
from sc8pr import TOPRIGHT
from sc8pr.plot import PSketch, PCanvas
from sc8pr.plot.shape import PLocus, PVector
from sc8pr.text import Font, ITALIC
from sc8pr.shape import Circle
from sc8pr.util import mix, ondrag
from sc8pr.misc.plot import expon, leastSq

def setup(sk):
    "Draw a graph directly onto the PSketch"
    
    # Allow free resize with no scaling of graphics
    sk.config(fixedAspect=False, resizeContent=False)

    # Draw the coordinate grid from 0 to 10 using default step of 1
    grid = [0, 10, 0, 10]
    sk.gridlines(grid)

    # Draw some bars
    data = (2, 3.6), (4, 3), (6, 1.8), (8, 6)
    sk += sk.series(data, fill="yellow")

    # Draw the x and y axes
    sk.axis(grid)

    # Graph some data points; use zip function if x and y data are separate
    x, y = (0, 3, 6, 9), (0.5, 1, 4, 6)
    for dot in sk.series(zip(x, y), Circle(50).config(fill="red")):
        sk += dot.config(height=10)

    # Exponential and linear regressions
    sk += PLocus(expon(x, y)[0], (0, 10)).config(weight=2, stroke="darkgreen")
    sk += PLocus(leastSq(x, y)[0], (0, 10)).config(weight=2)

    # Label the data with some adjacent text
    font = {"font": Font.serif(), "fontSize": 16}
    sk += sk.series(zip(x, y), list("ABCD"), (0.2, 0.2), color="red", **font)

    # Label the axes
    sk += sk.series([(10, 0), (0, 10)], ["x", "y"], anchor=TOPRIGHT, color="blue", fontStyle=ITALIC, **font)
    sk += sk.series(mix(range(0, 9, 2), -0.3), "{x}", **font)
    sk += sk.series(mix(-0.2, range(0, 9, 2)), "{y}", **font)

    # Animated wave
    sk += PLocus(wave, (0, 10), A=2, k=3, x0=6, T=1, sk=sk).config(weight=2, stroke="purple")

    # Draw an inset vector diagram
    sk += vecDiag().config(weight=1, pos=sk.px(3, 7.5)).bind(ondrag)


def wave(x, A, k, x0, T, sk):
    "Animated sine-wave function"
    phase = 2 * pi / T * sk.frameCount / sk.frameRate
    return A * sin(k * x - phase) + x0

def vecDiag():
    "Draw a vector diagram in a PCanvas"

    # Create a plotting canvas with grid lines and axis
    cv = PCanvas(240, [-2.5, 6.5, -2.5, 4.5], bg="#fcfcfc")
    cv.gridlines([-2, 6, -2, 4], 1, {})

    # Create a vector
    v = PVector(6, 35).config(stroke="blue")

    # Add the vector and its components to the drawing canvas
    cv += v.components() + [v]
    return cv


PSketch((512, 288), [-0.75, 10.25, -0.75], (640, 640)).play("Plotting & Scrolling Demo")
