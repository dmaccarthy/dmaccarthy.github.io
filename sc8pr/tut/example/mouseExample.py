#!python3

from sc8pr.sketch import Sketch, Sprite, BOUNCE
from sc8pr.image import Image
from random import uniform, randint

def setup(sk):
    "Initialize the sketch"
    sk.setBackground("bg.png")
    sk.image_monster = Image("costume.png")
    sk.animate(customDraw)

def customDraw(sk):
    "Draw one frame of the sketch"

    # Redraw the sketch
    sk.drawBackground()
    sk.sprites.draw()

    # Create sprites randomly
    if randint(1, sk.frameRate) == 1:
        velocity = uniform(-2, 2), uniform(-2, 2)
        posn = sk.randPixel()
        h = sk.height / 15 * uniform(0.5, 2)
        Sprite(sk, sk.image_monster, height=h, orient=True,
            posn=posn, velocity=velocity, edge=BOUNCE)

    # Detect and remove colliding sprites
    collisions = sk.sprites.collisions()
    sk.sprites.remove(collisions)

    # Make sprites follow mouse
    accel = sk.height / 10000
    for sprite in sk.sprites:
        sprite.accel = sprite.toward(sk.mouseXY, accel)

# Play the sketch
Sketch(setup).play()