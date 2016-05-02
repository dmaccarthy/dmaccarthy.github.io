#!python3

from scropr.sketch import Sprite
from scropr.image import Image
from scropr.physics import Environment
from scropr.util import rgba
from scropr.robot import Robot, remote_control
from pygame import KEYDOWN

WHITE, BLACK, RED, BLUE = rgba("white", "black", "red", "blue")
ROBOT_COLORS = rgba("#ffd428", "#a0a0ff")

def setup(sk):
    "Create the robot's environment"

    # Initialize environment
    sk.wall = BLACK
    sk.setBackground(Image(sk.size, WHITE))
    sk.animate(eventMap={KEYDOWN:remote_control})

    # Add obstacles
    r = sk.height / 12
    drag = 0.004
    ball = Image.ellipse(r, fill=RED)
    Sprite(sk, ball, mass=3, radius=True, drag=drag)
    ball = Image.ellipse(r/3, fill=BLUE)
    Sprite(sk, ball, mass=0.05, radius=True, drag=drag)

    # Create robot
    Robot(sk, colors=ROBOT_COLORS, height=1.5*r)

    # Position sprites randomly with no collisions
    while len(sk.sprites.collisions()):
        for sprite in sk.sprites:
            sprite.posn = sk.randPixel()


# Run the sketch
Environment(setup).run()