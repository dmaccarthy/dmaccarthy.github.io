# Copyright 2018-2019 D.G. MacCarthy <http://dmaccarthy.github.io>
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

"A demonstration of sc8pr 2.1's Plot class"

from sc8pr import Sketch
from sc8pr.misc.plot import Plot, Series
from math import sin, pi

def wave(x, A=1, k=1, x0=0, y0=0):
    "Calculate a point on a sine wave"
    return A * sin(k * (x - x0)) + y0

def setup(sk):
    # Create the Plot; configure axes and gridlines
    lrbt = [-3.5, 3.5, -1.6, 1.6]
    p = Plot(sk.size, lrbt).bind(ondraw)
    sk += p.config(pos=sk.center).axis()
    pi_4 = pi / 4
    ends = [-pi, 3.2]
    p.grid(dx=pi_4, xends=ends).grid(dy=0.5, yends=[-1.5, 1.6])

    # Add a sine wave Series
    param = lrbt[:2] + [sk.width - 1]
    p["Wave"] = Series(wave, param=param).config(
        stroke="blue", weight=2, vars={"k":4, "x0":0, "A":1.5})

    # Add tick marks and labels to the x-axis
    p["_xtick"] = p.xtick(pi_4, ends)
    attr = dict(marker="{:.2f}", fontSize=16, omitZero=True)
    p["_xlabel"] = p.xtick(pi_4, ends, **attr).transform(shift=(0, -0.15))

    # Add tick marks and labels to the y-axis
    ends = [-1.5, 1.6]
    p["_ytick"] = p.ytick(0.5, ends)
    p["_ylabel"] = p.ytick(0.5, ends, **attr).transform(shift=(-0.3, 0))

def ondraw(p):
    "Modify wave variables"

    # Shift wave by 0.01 and reduce amplitude
    v = p["Wave"].vars
    v["x0"] += 0.01
    v["A"] *= 0.999

    # Mark plot as stale for re-rendering
    p.stale = True

Sketch().play("Plot Animation")
