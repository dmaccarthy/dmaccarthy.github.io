"""
Convert S8V file (sc8pr 2) to ZIP archive (sc8pr 3).
Run this program using sc8pr 2.2!
"""

# Conversion parameters...

INFILE = "video.s8v"
OUTFILE = "video.zip"
MODE = "x"               # "w" to overwrite
COMPRESS = "DEFLATED"    # or "LZMA", "BZIP2", "STORED"


# Run the program...

from sc8pr import version, Image, logError
assert version[:2] == (2, 2), "sc8pr version 2.2 is required!"

import json, pygame, zipfile as zf
from sc8pr.misc.s8v import S8Vfile

def convert():
    c = getattr(zf, "ZIP_{}".format(COMPRESS.upper()))
    with zf.ZipFile(OUTFILE, MODE, compression=c) as archive:
        s8v = S8Vfile(INFILE)
        fps = s8v.meta.get("frameRate", 30)
        size = bits = None
        try:
            n = 0
            prev = None
            while True:
                srf = s8v.read(n).srf
                if size is None: size = srf.get_size()
                if bits is None:
                    bits = srf.get_bitsize()
                    alpha = bits == 32
                    mode = "RGBA" if alpha else "RGB"
                if srf.get_bitsize() != bits:
                    srf = srf.convert(alpha)
                if srf.get_size() != size:
                    srf = Image(srf).config(size=size).image
                data = pygame.image.tostring(srf, mode)
                if data != prev:
                    archive.writestr(str(n), data)
                    prev = data
                n += 1
        except KeyError: pass
        s8v.close()
        meta = dict(size=size, mode=mode, fps=fps, nframes=n)
        archive.writestr("meta.json", json.dumps(meta))
        print("Converted {} frames".format(n))

try: convert()
except: logError()

