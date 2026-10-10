import sys,subprocess
from playwright.sync_api import sync_playwright
from pathlib import Path
out=sys.argv[1]; cols=int(sys.argv[2]); times=[float(x) for x in sys.argv[3:]]
url=Path('index.html').resolve().as_uri(); Path('out/cf').mkdir(exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('PAGEERR',e))
    pg.goto(url); pg.evaluate('document.fonts.ready')
    for i,t in enumerate(times):
        pg.evaluate('t=>window.seek(t)',t); pg.locator('#c').screenshot(path=f'out/cf/{i:02d}.png')
    b.close()
rows=(len(times)+cols-1)//cols
subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','1','-i','out/cf/%02d.png','-vf',f'scale=300:-1,tile={cols}x{rows}:padding=6:color=black','-frames:v','1',out],check=True)
