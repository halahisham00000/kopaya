# python tools/render.py FPS  -> out/silent.mp4  (pure function of time, one seek per frame)
import sys,subprocess
from playwright.sync_api import sync_playwright
from pathlib import Path
FPS=int(sys.argv[1]) if len(sys.argv)>1 else 30; DUR=26.8
ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-i','-','-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-r',str(FPS),'out/silent.mp4'],stdin=subprocess.PIPE)
url=Path('index.html').resolve().as_uri(); n=round(DUR*FPS)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('PAGEERR',e)); pg.goto(url); pg.evaluate('document.fonts.ready')
    for i in range(n):
        pg.evaluate('t=>window.seek(t)',i/FPS)
        ff.stdin.write(pg.locator('#c').screenshot(type='jpeg',quality=94))
        if i%FPS==0: print('frame',i,'/',n,flush=True)
    b.close()
ff.stdin.close(); ff.wait(); print('done')
