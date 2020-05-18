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
from sc8pr.util import ondrag

def vecDiag():
    "Draw a vector diagram"

    # Create a plotting canvas
    cv = PCanvas(240, [-2.5, 6.5, -2.5, 4.5], bg="#fcfcfc")
    cv.gridlines([-2, 6, -2, 4], [1, 1], {})

    # Create a vector
    v = PVector(6, 35).config(stroke="blue")

    # Add the vector and its components to the drawing canvas
    cv += v.components() + [v]
    return cv

def setup(sk):
    "Draw a graph directly onto the sketch"

    # Draw coordinate grid
    sk.config(resizeContent=False, fixedAspect=False)
    grid = [0, 10, 0, 10]
    sk.gridlines(grid, (1, 1))

    # Label axes
    font = {"font": Font.serif(), "fontSize": 16}
    sk.graph([(10, 0), (0, 10)], ["x", "y"], anchor=TOPRIGHT, color="blue", fontStyle=ITALIC, **font)
    sk.mix(range(0, 9, 2), -0.3, "{x}", **font)
    sk.mix(-0.2, range(0, 9, 2), "{y}", **font)

    # Draw some bars and the axes
    data = (2, 3.6), (4, 3), (6, -0.2), (8, 6)
    sk.graph(data, 0.75, fill="yellow")
    sk[-2].config(fill="red")
    sk.axis(grid)

    # Draw some points and labels
    data = (0, 0), (3, 1), (6, 3), (9, 6)
    sk.graph(data, Circle(50).config(fill="red"))
    for gr in sk[-len(data):]: gr.config(height=10)
    sk.graph(data, list("ABCD"), (0.2, 0.2), color="red", **font)

    # Graph an equation
    sk += PLocus(wave, [0, 10], A=2, k=3, x0=6, T=1, sk=sk).config(weight=2, stroke="purple")

    # Draw an inset vector diagram
    vecDiag().setCanvas(sk).config(weight=1, csPos=(3, 7.5)).bind(ondrag)

def wave(x, A, k, x0, T, sk):
    "Animated sine-wave function"
    phase = 2 * pi * sk.frameCount / (T * sk.frameRate)
    return A * sin(k * x - phase) + x0


PSketch((512, 288), [-0.75, 10.25, -0.75], (640, 640)).bind().play("Plotting & Scrolling Demo")
