// Timeline re-timed to the REAL speech segments (docs/segments.json). Cuts sit in the pauses;
// wipes are centred on the cut so the new scene is fully visible by the next word.
const T=[0,1.40,3.0,4.15,6.95,8.85,11.2,13.25,15.95,18.6,19.9,21.15,24.8,25.55,26.8];
const WIPES=[[3.0,C.brown],[4.15,C.amber],[6.95,C.brown],[8.85,C.amber],[11.2,C.brown],[13.25,C.brown],[18.6,C.brown],[21.15,C.amber],[25.55,C.brown]];
const blink=(t,t0)=>{const u=(t-t0)/0.14;return u>0&&u<1?Math.sin(u*Math.PI):0;};
const ST={stroke:C.cream};

// 0.00-1.40  "يا ابني" (voice 0.05-0.47) + silent half-smile over the glasses
function s1(t){
  bg(C.cream);
  circ(540,1020,560*sp(t,0.0,HV),C.sand);
  const gd=sp(t,0.02,[200,15]);
  kamal({x:540,y:1100,s:2.0+0.2*(t/1.4),tilt:-0.05*sp(t,0.1),gd,look:[0.0,0.12],lid:0.5-0.12*sp(t,0.8),
    browL:24*sp(t,0.75,PL),open:1-0.85*blink(t,1.1),mouth:'half',talk:true,t,
    glass:{x:185,y:250,sc:1.2,rot:-0.05,level:0.75,steamCol:C.amber}});
  const p=sp(t,0.06,PL)*(1-sp(t,1.15,SN));
  if(p>0.02)txt('يا ابني',540,350,250,C.brown,{sc:p,rot:-0.05,stroke:C.cream,sw:16});
}

// 1.40-3.00  "إنت قاعد كده بقالك كام ساعة؟" (1.43-2.90)
function s2(t){
  bg(C.amber);
  const lean=sp(t,1.4,PL);
  circ(540,1250,620*sp(t,1.4,HV),'#EFA645');
  kamal({x:540,y:1200,s:lerp(2.0,2.42,lean),tilt:0.04*Math.sin(t*7)*envAt(t),look:[0,0.1],lid:0.3,browL:26,browR:30,
    mouth:'half',talk:true,t,gd:1-sp(t,1.5,SN),
    glass:{x:185,y:250,sc:1.2,rot:-0.05,level:0.75,steamCol:C.cream}});
  const a=sp(t,1.55,PL)*(1-sp(t,2.22,SN)),b=sp(t,2.3,PL);
  if(a>0.02)txt('قاعد كده؟',540,350,230,C.brown,{sc:a,rot:-0.05,stroke:C.cream,sw:16});
  if(b>0.02)txt('كام ساعة؟',540,350,240,C.brown,{sc:b,rot:0.04,stroke:C.cream,sw:16});
}

// 3.00-4.15  pause: hours of scrolling (clock + counter + phone)
function s3(t){
  const tl=t-T[2];bg(C.cream);
  circ(540,1250,640,C.sand);
  g.fillStyle=C.jacket;g.beginPath();g.moveTo(-40,1920);g.lineTo(60,1560);g.lineTo(300,1580);g.lineTo(330,1920);g.fill();
  g.beginPath();g.moveTo(1120,1920);g.lineTo(1010,1580);g.lineTo(790,1600);g.lineTo(760,1920);g.fill();
  const py=1470+(1-sp(t,3.0,DF))*600;
  phone(540,py,560,1100,-0.03+0.01*Math.sin(tl*5),1,(w,h)=>feedScreen(w,h,tl));
  for(let i=0;i<3;i++)fillRR(190,py-90+i*100,150,64,32,C.skin);
  thumbTo(650,py+120+Math.sin(tl*9)*150,260,92,0.18,0.5+0.5*Math.sin(tl*9));
  const cp=sp(t,3.05,PL);
  if(cp>0.01){g.save();g.translate(540,400);g.scale(cp,cp);clock(0,0,170,tl*1.2);g.restore();}
  const secs=6*3600+42*60+19+tl*1500;
  const hh=Math.floor(secs/3600),mm=Math.floor(secs/60)%60,ss=Math.floor(secs)%60;
  const pp=sp(t,3.2,PL);
  g.save();g.translate(540,700);g.scale(pp,pp);fillRR(-330,-70,660,140,70,C.brown);
  txt(AR(String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')+':'+String(ss).padStart(2,'0')),0,34,96,C.cream,{dir:'ltr'});g.restore();
}

// 4.15-6.95  "عينك هتقع من مكانها (4.35-5.7) وإنت لسه بتقلب (5.75-6.85)"
function s4(t){
  const tl=t-T[3];bg(C.brown);
  const bu=sp(t,4.45,BO);
  g.save();g.translate(Math.sin(t*40)*2*bu,0);
  circ(540,820,520,'#4A2E1F');
  kamal({x:540,y:900,s:3.1,look:[Math.sin(t*3)*0.4,Math.sin(t*9)],lid:0,wide:true,pupil:7,browL:46,browR:46,tiltL:-0.15,tiltR:0.15,
    mouth:'o',t,bulge:Math.max(0,bu),dizzy:t>5.85?t*9:0,gd:0,cheek:0.6,tilt:Math.sin(t*5)*0.02*bu});
  g.restore();
  const a1=sp(t,4.5,PL)*(1-sp(t,5.72,SN)),a2=sp(t,5.78,PL);
  if(a1>0.02)txt('عينك هتقع!',540,260,210,C.amber,{sc:a1,stroke:C.brown,sw:18,rot:-0.04,maxW:860});
  if(a2>0.02)txt('لسه بتقلّب..',540,260,200,C.cream,{sc:a2,stroke:C.brown,sw:18,rot:0.04,maxW:860});
  phone(540,2080,700,900,0,1,(w,h)=>feedScreen(w,h,tl,1600));
  thumbTo(640,1830+Math.sin(tl*12)*90,300,96,0.12,0.5+0.5*Math.sin(tl*12));
}

// 6.95-8.85  phone slam, then Kamal rises: "قوم يا ابني" (7.75-8.40)
function s5(t){
  const tl=t-T[4];bg(C.cream);
  circ(780,1000,520,C.sand);
  const slam=sp(t,7.2,SN),shake=t>7.28?Math.sin(t*80)*Math.exp(-(t-7.28)*12)*26:0;
  g.save();g.translate(0,shake);
  fillRR(0,1500,W,420,0,C.brown);
  const exit=sp(t,7.55,DF);
  if(exit<0.99){
    phoneBack(540,lerp(1180,2600,exit),400,780,0.05,lerp(1.7,1,slam));
    if(t>7.25&&t<7.55){const k=(t-7.25)/0.3;g.strokeStyle=C.amber;g.lineWidth=14;g.lineCap='round';
      for(let i=0;i<10;i++){const a=i*Math.PI/5,r0=300+k*60,r1=r0+90*(1-k);g.beginPath();g.moveTo(540+Math.cos(a)*r0,1180+Math.sin(a)*r0*0.9);g.lineTo(540+Math.cos(a)*r1,1180+Math.sin(a)*r1*0.9);g.stroke();}}
  }
  g.restore();
  if(t>=7.5){
    const up=sp(t,7.6,PL);
    kamal({x:330,y:lerp(2150,1400,up),s:1.55,look:[0.8,-0.2],lid:0.3,browL:14,browR:18,mouth:'smile',talk:true,t,tilt:0.05*Math.sin(t*6)});
  }
  const q=sp(t,7.76,PL);
  if(q>0.02)txt('قوم!',540,520,330,C.brown,{sc:q,rot:-0.06,stroke:C.amber,sw:20});
}

// 8.85-11.20  "اشرب كوباية شاي" (9.05-10.15), then a steamy pause
function s6(t){
  const tl=t-T[5];bg(C.cream);
  circ(780,1000,520,C.sand);
  fillRR(0,1500,W,420,0,C.brown);
  kamal({x:330,y:1400,s:1.55,look:[0.8,-0.2],lid:0.3,browL:14+10*Math.sin(t*3),browR:18,mouth:'smile',talk:true,t,tilt:0.05*Math.sin(t*6)});
  const gp=sp(t,9.05,PL);
  cup(780,1010,3.0*gp,{t,level:lerp(0.1,0.7,sp(t,9.1,[60,14]))});
  const t1=sp(t,9.08,PL),t2=sp(t,9.5,PL);
  txt('اشرب',560,300,250,C.brown,{sc:t1,rot:-0.04,stroke:C.cream,sw:14});
  txt('كوباية شاي',540,470,170,C.hib,{sc:t2,rot:0.03,stroke:C.cream,sw:12,maxW:960});
}

// 11.20-13.25  "مش عارف تفتكر؟" (11.45-12.40) shrug + question marks
function s7(t){
  const tl=t-T[6];bg(C.cream);circ(540,1180,600,C.sand);
  const shr=sp(t,11.45,PL);
  kamal({x:540,y:1260,s:2.0,sh:shr*90,tilt:0.1*shr-0.05*sp(t,12.6),look:[0.2-0.9*sp(t,12.6),-0.1-0.4*sp(t,12.6)],lid:0.2,browL:34*shr,browR:10*shr,tiltL:-0.2*shr,
    mouth:'flat',t,talk:true,open:1-blink(t,12.2)*0.9,gd:0.3});
  [[200,660,'#B5304A',11.6,-0.2],[880,600,C.amber,11.85,0.2],[820,960,C.brown,12.1,0.1]].forEach(([x,y,c,t0,r])=>{
    const p=sp(t,t0,PL);if(p>0.01)txt('؟',x,y+Math.sin(t*6+x)*10,300,c,{sc:p,rot:r});});
}

// 13.25-15.95  "اتفضل" (13.5-14.1) / "نزّل تطبيق" (14.6-15.5): handing the phone over, download ring
function s8(t){
  const tl=t-T[7];bg(C.amber);circ(540,1150,650,'#EFA645');
  const rise=sp(t,13.4,DF),grow=sp(t,14.6,PL);
  kamal({x:540,y:1300,s:2.0,look:[0,0.1],lid:0.3,browL:20,browR:20,mouth:'half',talk:true,t,tilt:0.03*Math.sin(t*5),gd:0.2});
  const prog=clamp((t-14.65)/0.85);
  phone(540,lerp(lerp(2500,1905,rise),1080,grow),520,1000,-0.05*(1-grow),lerp(lerp(0.7,0.9,rise),1.25,grow),(w,h)=>splashScreen(w,h,t-13.4,prog));
  const a=sp(t,13.5,PL)*(1-sp(t,14.5,SN)),b=sp(t,14.65,PL);
  if(a>0.02)txt('اتفضل',540,330,270,C.brown,{sc:a,rot:-0.05,stroke:C.cream,sw:16});
  if(b>0.02)txt('نزّل التطبيق',540,300,190,C.brown,{sc:b,rot:0.03,stroke:C.cream,sw:14});
}

// 15.95-18.60  "كوباية" (16.0) logo -> app home assembles -> "بيفكرك تقوم" (17.3) notification -> taps
function s9(t){
  const tl=t-T[8];bg(C.amber);
  circ(540,1100,700*sp(t,15.95,HV),'#EFA645');
  const lp=sp(t,15.98,PL),mv=sp(t,16.55,DF);
  const pe=sp(t,16.55,DF),px=540,py=1150+(1-pe)*900,pw=640,ph=1320,u=pw/390;
  const sel=t>18.2?0:-1,press=t>18.48&&t<18.6?1:0;
  phone(px,py,pw,ph,0,1,(w,h)=>homeScreen(w,h,t-16.7,sel,press));
  const ox=px-pw/2,oy=py-ph/2;
  const tap1=sp(t,17.95,DF)*(1-sp(t,18.4,DF)),tap2=sp(t,18.25,DF)*(1-sp(t,18.62,DF));
  if(tap1>0.01){const tx=ox+HOME.chip.ray[0]*u,ty=oy+HOME.chip.ray[1]*u;thumbTo(lerp(tx+120,tx,tap1),lerp(ty+500,ty,tap1),380,130,0.2,t>18.2?1:0);}
  if(tap2>0.01){const tx=ox+HOME.btn[0]*u,ty=oy+HOME.btn[1]*u;thumbTo(lerp(tx+200,tx,tap2),lerp(ty+520,ty,tap2),380,130,0.25,press);}
  cup(540,lerp(780,165,mv),lerp(3.0,0.72,mv)*lp,{line:C.brown,tea:C.cream,steam:C.cream,t,level:0.6});
  const wp=lp*(1-mv);
  if(wp>0.01)txt('كوباية',540,1190,330,C.brown,{sc:wp,maxW:900});
  const dn=sp(t,17.3,PL),up=sp(t,18.1,SN);
  if(dn>0.01&&up<0.99){
    g.save();g.translate(540,lerp(-260,335,dn)-up*700);g.rotate(Math.sin(t*22)*0.02*sp(t,17.3,[200,10]));
    fillRR(-440,-90,880,180,50,C.paper);cup(350,6,0.62,{t,level:0.62,steamOn:false});
    txt('كوباية',250,-14,58,C.brown,{al:'right',maxW:560});
    txt('قوم اشرب شاي.. الشاي مش هيبرد',-30,56,44,'#6B5646',{f:'b',al:'center',maxW:640,w:500});
    g.restore();
  }
}

// 18.60-19.90  "وتريّح دماغك" (18.8-19.9): the calm session screen
function s10(t){
  const tl=t-T[9];bg(C.amber);circ(540,1150,650,'#EFA645');
  phone(540,1180,640,1320,0,1,(w,h)=>sessionScreen(w,h,tl,272-tl));
}

// 19.90-21.15  quiet pause: the sip
function s11(t){
  bg(C.cream);circ(540,1000,640,C.sand);
  const sip=sp(t,20.0,DF);
  kamal({x:540,y:1250,s:2.3,tilt:-0.07*sip,look:[0,0],open:lerp(1,0,sp(t,19.98,SN)),lid:0.2,browL:8,browR:8,mouth:'smile',cheek:1.4,t,
    glass:{x:lerp(225,40,sip),y:lerp(330,190,sip),sc:1.15,rot:lerp(-0.05,-0.1,sip),level:lerp(0.75,0.6,sip),steamCol:C.amber,steamA:1}});
  const w=sp(t,20.55,PL);
  if(w>0.01)txt('آااه..',540,330,230,C.brown,{sc:w,rot:-0.05,stroke:C.cream,sw:14,a:1-sp(t,21.05,SN)});
}

// 21.15-24.80  "وبعدين ارجع كمّل" (21.35-22.5) / "محدّش واخد منها حاجة" (22.9-24.45) + wink
function s12(t){
  const tl=t-T[11];bg(C.cream);circ(540,1150,620,C.sand);
  const wk=clamp((t-24.3)/0.3),w=Math.sin(wk*Math.PI);
  const look=t<22.8?[0,0.9]:[0,0];
  kamal({x:540,y:1160,s:1.9,look,lid:0.3,browL:6,browR:6,mouth:'half',talk:true,t,eyeR:1-w*0.95,cheek:1.2,tilt:0.03*Math.sin(t*2)});
  const pp=sp(t,21.25,DF);
  phone(540,lerp(2400,1850,pp),380,700,0.04,1,(w2,h2)=>feedScreen(w2,h2,tl,500));
  thumbTo(650,lerp(2500,1900,pp)+Math.sin(tl*5)*30,260,86,0.15,0.5);
  cup(170,lerp(2200,1700,pp),1.0,{t,level:0.6});
  const a=sp(t,21.37,PL)*(1-sp(t,22.8,SN)),b=sp(t,22.92,PL),c=sp(t,23.3,PL);
  if(a>0.02)txt('ارجع كمّل',540,360,250,C.brown,{sc:a,rot:-0.04,stroke:C.cream,sw:16,maxW:860});
  if(b>0.02)txt('محدّش واخد',540,300,170,C.brown,{sc:b,rot:-0.03,stroke:C.cream,sw:14,maxW:860});
  if(c>0.02)txt('منها حاجة',540,500,170,C.hib,{sc:c,rot:0.03,stroke:C.cream,sw:14,maxW:860});
}

// 24.80-25.55  the laugh (24.85-25.55)
function s13(t){
  const tl=t-T[12];bg(C.amber);circ(540,1150,640,'#EFA645');
  const ph=tl*2*Math.PI*7,dec=Math.exp(-tl*1.2);
  kamal({x:540,y:1200+Math.abs(Math.sin(ph))*-14,s:2.2,sh:Math.sin(ph)*26*dec+8,tilt:Math.sin(ph*0.5)*0.05,look:[0,0],open:0,
    browL:30,browR:30,mouth:'laugh',mouthOpen:0.5+0.5*Math.abs(Math.sin(ph)),cheek:1.6,t});
  const p=sp(t,24.82,PL),bounce=1+0.06*Math.sin(ph);
  txt('هيهيهي',540,400,260,C.cream,{sx:p*bounce,sy:p/bounce,rot:Math.sin(ph*0.5)*0.05,stroke:C.brown,sw:20,maxW:860});
}

// 25.55-26.80  logo lockup + tagline
function s14(t){
  bg(C.cream);circ(540,760,600*sp(t,25.55,HV),C.sand);
  cup(540,690,2.5*sp(t,25.6,PL),{t,level:0.62});
  txt('كوباية',540,1250,330,C.brown,{sc:sp(t,25.7,PL),maxW:900});
  const tp=sp(t,25.9,DF);
  txt('شاي وراحة بال',540,1385,86,C.mint,{f:'b',w:700,a:clamp(tp*1.5),sy:tp});
  const pk=sp(t,26.0,PL);
  kamal({x:540,y:lerp(2150,1820,pk),s:1.0,look:[0,0.1],lid:0.4,browL:20,browR:10,mouth:'half',t,eyeR:t>26.45&&t<26.6?0.05:1});
}

const SHOTS=[s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14];
