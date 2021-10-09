from glob import glob

DEFAULT = "htm/**/*.htm"
p = input("Pattern [{}]? ".format(DEFAULT))
p = glob(p if len(p) else DEFAULT, recursive=True)
s = input("Search term? ")
for fn in p:
    with open(fn, encoding="utf8") as f:
        code = f.read()
        if s in code: print(fn)
input("Done!")
