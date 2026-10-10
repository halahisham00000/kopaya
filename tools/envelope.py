# voiceover.mp3 -> docs/envelope.json (speech loudness at 50 Hz, 0..1) used for lip-sync
import subprocess, array, json, math
raw = subprocess.run(["ffmpeg","-v","error","-i","assets/voiceover.mp3","-ac","1","-ar","8000","-f","s16le","-"],capture_output=True).stdout
a = array.array("h"); a.frombytes(raw)
win = 160  # 20 ms
env=[]
for i in range(0,len(a)-win,win):
    s=sum(x*x for x in a[i:i+win])/win
    env.append(math.sqrt(s))
m=max(env); env=[e/m for e in env]
# light smoothing + soft knee so mouth shapes read
sm=[]
for i in range(len(env)):
    w=env[max(0,i-1):i+2]; v=sum(w)/len(w)
    sm.append(round(min(1,max(0,(v-0.04)/0.5))**0.8,3))
json.dump(sm,open("docs/envelope.json","w"))
print(len(sm),"samples", round(len(sm)/50,2),"s")
