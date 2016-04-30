#!python3

from wigs.sketch import Sketch, Sprite, BOUNCE
from wigs.image import Image
from pygame import KEYDOWN
from random import uniform, randint

class Monsters(Sketch):

	def setup(self):
		"Initialize the sketch"
		self.setBackground("bg.png")
		self.image_monster = Image("costume.png")
		self.animate(self.customDraw)

	def customDraw(self):
		"Draw one frame of the sketch"

		# Redraw the sketch
		self.simpleDraw()

		# Create sprites randomly
		if randint(1, self.frameRate) == 1:
			velocity = uniform(-2, 2), uniform(-2, 2)
			posn = self.randPixel()
			h = self.height / 15 * uniform(0.5, 2)
			Sprite(self, self.image_monster, height=h, radius=True,
				orient=True, posn=posn, velocity=velocity, edge=BOUNCE)

		# Detect and remove colliding sprites
		collisions = self.sprites.collisions()
		self.sprites.remove(collisions)

		# Make sprites follow mouse
		for sprite in self.sprites:
			a = self.height / 10000
			sprite.accel = sprite.toward(self.mouseXY, a)

	def keyDown(self, ev):
		"Remove all sprites"
		if self.char == "r":
			self.sprites.empty()

	eventMap = {KEYDOWN: keyDown}


# Run the sketch
Monsters().run()