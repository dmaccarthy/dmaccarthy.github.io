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

"A demonstration of sc8pr 2.0's Plot class"

from sc8pr import Sketch
from sc8pr.misc.plot import Plot, Series
from math import sin, pi

def wave(x, A=1, k=1, x0=0, y0=0):
    "Calculate a point on a sine wave"
    return A * sin(k * (x - x0)) + y0

def setup(sk):
    # Create the Plot
    param = [-3.5, 3.5, -1.6, 1.6]
    p = Plot(sk.size, param).bind(ondraw)
    sk += p.config(pos=sk.center).axis()

    # Add a sine wave Series
    param = param[:2] + [sk.width - 1]
    p["Wave"] = Series(wave, param=param).config(
        stroke="blue", weight=2, vars={"k":4, "x0":0, "A":1.5})

    # Add tick marks to the x-axis
    param = [-pi, 3.2, pi / 4]
    p["_xtick"] = p.xtick(param)

    # Add labels to the x-axis
    attr = dict(marker="{:.2f}", fontSize=16, omitZero=True)
    p["_xlabel"] = p.xtick(param, **attr).transform(shift=(0, -0.15))

    # Add tick marks and labels to the y-axis
    param = [-1.5, 1.6, 0.5]
    p["_ytick"] = p.ytick(param)
    p["_ylabel"] = p.ytick(param, **attr).transform(shift=(-0.3, 0))

def ondraw(p):
    "Modify wave variables"

    # Shift wave by 0.01 and reduce amplitude
    v = p["Wave"].vars
    v["x0"] += 0.01
    v["A"] *= 0.999

    # Mark plot as stale for re-rendering
    p.stale = True

Sketch().play("Plot Animation")