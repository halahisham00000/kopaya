import json
segs=[(1.43,2.90),(4.37,6.87),(7.78,8.35),(9.08,10.14),(11.44,12.40),(13.52,14.10),(14.62,15.50),(16.04,16.51),(17.35,18.38),(18.84,19.90),(21.36,22.53),(22.92,24.46),(24.89,25.55)]
# (phrase, syllable weight) split at the script's natural breaks
P=[("يا ابني",3),("إنت قاعد كده بقالك كام ساعة؟",11),
("عينك هتقع من مكانها",10),("وإنت لسه بتقلب",8),
("قوم يا ابني",4),("اشرب كوباية شاي",7),
("مش عارف تفتكر؟",6),("اتفضل، نزل تطبيق",7),
("كوباية",3),("بيفكرك تقوم",6),("وتريّح دماغك",6),
("وبعدين ارجع كمّل",7),("محدّش واخد منها حاجة",9),("هيهيهي",4)]
tot=sum(s[1]-s[0] for s in segs); W=sum(w for _,w in P)
def real(x): # speech-time -> real time
    for a,b in segs:
        d=b-a
        if x<=d: return a+x
        x-=d
    return segs[-1][1]
c=0;out=[]
for p,w in P:
    s=real(c/W*tot); e=real((c+w)/W*tot); c+=w
    out.append((p,round(s,2),round(e,2))); print(f"{s:6.2f} {e:6.2f}  {p}")
json.dump({"segments":segs,"phrases":out},open("/home/claude/kobaya/docs/timing.json","w"),ensure_ascii=False,indent=1)
