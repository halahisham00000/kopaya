# python tools/frames.py out/f 1.0 3.5 ...  -> PNG per time
import sys
from playwright.sync_api import sync_playwright
from pathlib import Path
base=sys.argv[1]; times=[float(x) for x in sys.argv[2:]]
url=Path('index.html').resolve().as_uri()
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('PAGEERR',e)); pg.on('console',lambda m:print('CONSOLE',m.text) if m.type=='error' else None)
    pg.goto(url); pg.evaluate('document.fonts.ready')
    for t in times:
        pg.evaluate('t=>window.seek(t)',t); pg.locator('#c').screenshot(path=f'{base}_{t:05.2f}.png')
    b.close()
