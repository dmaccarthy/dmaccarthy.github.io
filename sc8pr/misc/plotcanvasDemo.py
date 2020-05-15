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
A demonstration of graphing using sc8pr.misc.plotcanvas*
(*Experimental module coming in v2.2)

"""

from math import sin, pi
from sc8pr import TOPRIGHT
from sc8pr.misc.plotcanvas import PSketch, PCanvas, Locus, Vector
from sc8pr.text import Font, ITALIC
from sc8pr.shape import Circle

def vecDiag():
    "Draw a vector diagram"

    # Create a drawing canvas
    cv = PCanvas(240, [-2, 6, -2, 4], 0.5, 1, "#fcfcfc")

    # Create a vector
    v = Vector(6, 35).config(stroke="blue")

    # Add the vector and its components to the drawing canvas
    vx = v.proj(0)
    cv += vx, v.proj(90).config(tail=vx.tip), v
    return cv

def setup(sk):
    "Draw a graph directly onto the sketch"

    font = {"font": Font.serif(), "fontSize": 16}

    # Draw coordinate grid and axes
    sk.gridlines([0, 10, 0, 10], (1, 1)).axis((0, 10), (0, 10))

    # Label axes
    sk.graph([(10, 0), (0, 10)], ["x", "y"], anchor=TOPRIGHT, color="blue", fontStyle=ITALIC, **font)
    sk.mix(range(0, 9, 2), -0.5, "{x}", **font)
    sk.mix(-0.2, range(0, 9, 2), "{y}", **font)

    # Draw items onto background and then remove them
    sk.flatten()

    # Draw an inset vector diagram
    sk += vecDiag().config(weight=1, pos=sk.pix((3, 7)))

    # Draw some points and labels
    points = (0, 0), (3, 1), (6, 3), (9, 6)
    marker = Circle(50).config(fill="red").snapshot().config(width=12)
    sk.graph(points, marker)
    sk.graph(points, list("ABCD"), (0.3, 0.3), color="red", **font)

    # Draw some bars
    data = (2, 4), (4, 3), (6, 1), (8, 6)
    sk.graph(data, 0.9, fill="yellow")

    # Graph an equation
    sk += Locus(wave, [0, 10], A=2, k=3, x0=6, T=1, sk=sk).config(weight=2, stroke="purple")

def wave(x, A, k, x0, T, sk):
    "Animated sine-wave function"
    phase = 2 * pi * sk.frameCount / (T * sk.frameRate)
    return A * sin(k * x - phase) + x0

PSketch(512, [0, 10, 0, 10], [0.75, 0.25, 0.75, 0.25]).play("Graphing Demo")
