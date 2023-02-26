"""
Convert S8V file (sc8pr 2) to ZIP archive (sc8pr 3).
Run this program using sc8pr 2.2!
"""

import zipfile as zf
from sc8pr.misc.s8v import S8Vfile
from json import dumps

INFILE = "movie.s8v"
OUTFILE = "video.zip"
MODE = "x"   # "w" to overwrite
COMPRESS = zf.ZIP_DEFLATED

with zf.ZipFile(OUTFILE, MODE, compression=COMPRESS) as zf:
    f = S8Vfile(INFILE)
    fps = f.meta.get("frameRate", 30)
    try:
        n = 0
        prev = None
        while True:
            pix = bytes(f.read(n).decompress())
            if pix != prev:
                zf.writestr(str(n), pix)
                prev = pix
            n += 1
    except: pass
    f.close()
    meta = dict(nframes=n, fps=fps)
    zf.writestr("meta.json", dumps(meta))
    print("Converted {} frames".format(n))
