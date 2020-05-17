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
A demonstration of graphing using sc8pr.plot*
(*Experimental package in v2.2)

"""

from math import sin, pi
from sc8pr import TOPRIGHT
from sc8pr.plot import PSketch, PCanvas
from sc8pr.plot.shape import PLocus, PVector, PCircle
from sc8pr.text import Font, ITALIC

def vecDiag():
    "Draw a vector diagram"

    # Create a plotting canvas
    cv = PCanvas(240, [-2.5, 6.5, -2.5, 4.5], "#fcfcfc")
    cv.gridlines([-2, 6, -2, 4], [1, 1], {})

    # Create a vector
    v = PVector(6, 35).config(stroke="blue")

    # Add the vector and its components to the drawing canvas
    cv += v.components() + [v]
    return cv

def setup(sk):
    "Draw a graph directly onto the sketch"

    # Draw coordinate grid and axes
    sk.gridlines([0, 10, 0, 10], (1, 1), {})

    # Label axes
    font = {"font": Font.serif(), "fontSize": 16}
    sk.graph([(10, 0), (0, 10)], ["x", "y"], anchor=TOPRIGHT, color="blue", fontStyle=ITALIC, **font)
    sk.mix(range(0, 9, 2), -0.5, "{x}", **font)
    sk.mix(-0.2, range(0, 9, 2), "{y}", **font)

    # Draw items onto background and then remove them
    sk.flatten()

    # Draw an inset vector diagram
    sk += vecDiag().config(weight=1, pos=sk.pix(3, 7.5))

    # Draw some points and labels
    points = (0, 0), (3, 1), (6, 3), (9, 6)
    marker = [PCircle(0.1).config(fill="red") for i in range(4)]
    sk.graph(points, marker)
    sk.graph(points, list("ABCD"), (0.3, 0.3), color="red", **font)

    # Draw some bars
    data = (2, 4), (4, 3), (6, -0.2), (8, 6)
    sk.graph(data, 0.9, fill="yellow")
    sk[-2].config(fill="red")

    # Graph an equation
    sk += PLocus(wave, [0, 10], A=2, k=3, x0=6, T=1, sk=sk).config(weight=2, stroke="purple")

def wave(x, A, k, x0, T, sk):
    "Animated sine-wave function"
    phase = 2 * pi * sk.frameCount / (T * sk.frameRate)
    return A * sin(k * x - phase) + x0

PSketch(512, [-0.75, 10.25, -0.75, 10.25]).play("Graphing Demo")
