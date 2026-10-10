// Brand props: logo cup, phone + app screens (built from the brand sheet), clock, thumbs, wipes.

// Kopaya glass logo. (x,y)=centre of glass, s=scale (1 => glass ~124 wide)
function cup(x,y,s,o={}){
  const line=o.line||C.brown, tea=o.tea||C.amber, steamCol=o.steam||C.amber, lvl=o.level??0.62, t=o.t||0;
  g.save();g.translate(x,y);g.scale(s,s);
  if(o.steamOn!==false)steam(-2,-84,t,1,steamCol,o.steamA??1);
  // tea
  const top=60-130*lvl;
  g.save();g.beginPath();g.moveTo(-58,-70);g.lineTo(58,-70);g.lineTo(47,58);g.lineTo(-47,58);g.closePath();g.clip();
  g.fillStyle=tea;g.fillRect(-70,top,140,140);g.restore();
  g.lineJoin='round';g.lineCap='round';g.strokeStyle=line;g.lineWidth=14;
  g.beginPath();g.moveTo(-62,-70);g.lineTo(-50,62);g.lineTo(50,62);g.lineTo(62,-70);g.stroke();
  g.lineWidth=14;g.beginPath();g.moveTo(-76,80);g.lineTo(76,80);g.stroke();
  // mint leaf
  if(o.leaf!==false){g.save();g.translate(60,-74);g.rotate(-0.55);
    g.beginPath();g.ellipse(0,0,36,17,0,0,7);g.fillStyle=C.mint;g.fill();
    g.strokeStyle='rgba(58,34,22,.55)';g.lineWidth=3;g.beginPath();g.moveTo(-28,5);g.lineTo(26,-4);g.stroke();g.restore();}
  g.restore();
}

function thumb(x,y,len,wd,rot,press=0){
  g.save();g.translate(x,y);g.rotate(rot);g.scale(1+press*0.06,1-press*0.04);
  fillRR(-wd/2,-len,wd,len+wd*0.5,wd/2,C.skin);
  fillRR(-wd/2,-len,wd*0.32,len+wd*0.5,wd/2,'rgba(255,255,255,.12)');
  fillRR(-wd*0.3,-len+wd*0.12,wd*0.6,wd*0.55,wd*0.22,'#F1C79D');
  g.strokeStyle=C.skinSh;g.lineWidth=4;g.lineCap='round';
  g.beginPath();g.moveTo(-wd*0.28,-len*0.35);g.lineTo(wd*0.28,-len*0.35);g.moveTo(-wd*0.26,-len*0.2);g.lineTo(wd*0.26,-len*0.2);g.stroke();
  g.restore();
}

// phone with screen callback sc(w,h). Position = centre.
function phone(x,y,w,h,rot,scale,sc){
  g.save();g.translate(x,y);g.rotate(rot);g.scale(scale,scale);
  fillRR(-w/2-14,-h/2-14,w+28,h+28,70,'#1F1A17');
  g.save();rr(-w/2,-h/2,w,h,58);g.clip();g.translate(-w/2,-h/2);
  sc(w,h);g.restore();
  fillRR(-60,-h/2+14,120,30,15,'#1F1A17');
  g.restore();
}
function phoneBack(x,y,w,h,rot,scale){
  g.save();g.translate(x,y);g.rotate(rot);g.scale(scale,scale);
  fillRR(-w/2-14,-h/2-14,w+28,h+28,70,'#2B2320');
  fillRR(-w/2+30,-h/2+30,150,150,40,'#1F1A17');
  for(const [dx,dy] of[[75,75],[75,130],[130,100]])circ(-w/2+30+dx*0.9,-h/2+30+dy*0.9-14,18,'#3A302B');
  g.restore();
}

const fcards=(()=>{const r=mulberry32(9),a=[];const cols=[C.sand,C.amber,C.cream,C.mint,C.hib,'#E7C9A0',C.brown];
  for(let i=0;i<40;i++)a.push({h:150+Math.floor(r()*170),c:cols[Math.floor(r()*cols.length)],k:Math.floor(r()*3)});return a;})();
function feedScreen(w,h,tl,speed=900){
  const u=w/390;g.fillStyle=C.paper;g.fillRect(0,0,w,h);
  const cw=(w-36*u/2*0-30*u)/2;
  for(let col=0;col<2;col++){
    let y=-((tl*speed*u/2+col*200)%1400)+60*u;
    for(let i=0;i<40&&y<h+400;i++){const c=fcards[(i*2+col)%40];const ch=c.h*u*0.8;
      if(y+ch>-50){fillRR(10*u+col*(cw+10*u),y,cw,ch,18*u,c.c);
        g.fillStyle=c.c===C.brown?C.amber:C.brown;g.globalAlpha=0.5;
        if(c.k===0)circ(10*u+col*(cw+10*u)+cw/2,y+ch/2,ch*0.2,g.fillStyle);
        else if(c.k===1)fillRR(10*u+col*(cw+10*u)+cw*0.2,y+ch*0.4,cw*0.6,ch*0.12,8*u,g.fillStyle);
        else{g.beginPath();g.ellipse(10*u+col*(cw+10*u)+cw/2,y+ch/2,cw*0.28,ch*0.14,-0.5,0,7);g.fill();}
        g.globalAlpha=1;}
      y+=ch+10*u;}
  }
  fillRR(24*u,28*u,w-48*u,44*u,22*u,C.sand);
}
function splashScreen(w,h,tl,prog=0){g.fillStyle=C.amber;g.fillRect(0,0,w,h);
  const s=sp(tl,0.0,PL),u=w/390;cup(w/2,h/2-30*u,u*1.3*s,{line:C.brown,tea:C.cream,steam:C.cream,t:tl,level:0.6});
  if(prog>0){g.lineCap='round';g.lineWidth=12*u;g.strokeStyle='rgba(255,241,214,.35)';g.beginPath();g.arc(w/2,h/2-30*u,150*u,0,7);g.stroke();
    g.strokeStyle=C.brown;g.beginPath();g.arc(w/2,h/2-30*u,150*u,-Math.PI/2,-Math.PI/2+Math.PI*2*clamp(prog));g.stroke();
    if(prog>=1){const k=sp(tl,tl-0.001,PL);fillRR(w/2-90*u,h/2+170*u,180*u,56*u,28*u,C.mint);
      g.strokeStyle=C.cream;g.lineWidth=8*u;g.beginPath();g.moveTo(w/2-22*u,h/2+198*u);g.lineTo(w/2-6*u,h/2+212*u);g.lineTo(w/2+22*u,h/2+184*u);g.stroke();}}
}

// Home screen: layout constants in design units (390 wide) so taps can aim at real elements.
const HOME={chip:{ray:[390-24-38,160+20],mad:[390-24-76-10-46,160+20]},btn:[84,372]};
function homeScreen(w,h,tl,sel=-1,press=0){
  const u=w/390;g.fillStyle=C.paper;g.fillRect(0,0,w,h);
  const ap=(t0)=>sp(tl,t0,DF),R=w-24*u;
  const slide=(t0)=>{const a=ap(t0);g.globalAlpha=clamp(a*1.6);g.translate(0,(1-a)*28*u);};
  g.save();g.globalAlpha=1;txt('9:41',24*u,38*u,15*u,C.brown,{f:'b',al:'left',dir:'ltr'});g.restore();
  g.save();slide(0.05);txt('صباح الخير',R,102*u,48*u,C.brown,{al:'right'});g.restore();
  g.save();slide(0.18);txt('حاسس بإيه دلوقتي؟',R,136*u,17*u,'#6B5646',{f:'b',al:'right',w:500});g.restore();
  const chips=[['رايق',R-76*u,160,76],['مضغوط',R-76*u-10*u-96*u,160,96],['مش مركّز',R-108*u,210,108],['عايز أنام',R-108*u-10*u-104*u,210,104]];
  chips.forEach((c,i)=>{g.save();const a=sp(tl,0.35+i*0.1,PL);g.translate(c[1]+c[3]*u/2,c[2]*u+20*u);g.scale(a,a);
    const on=(i===0&&sel===0);
    fillRR(-c[3]*u/2,-20*u,c[3]*u,40*u,20*u,on?'rgba(78,127,64,.14)':C.paper);
    rr(-c[3]*u/2,-20*u,c[3]*u,40*u,20*u);g.lineWidth=2.5*u;g.strokeStyle=on?C.mint:C.brown;g.stroke();
    txt(c[0],0,6*u,16*u,on?C.mint:C.brown,{f:'b'});g.restore();});
  // card
  g.save();slide(0.85);
  fillRR(24*u,270*u,w-48*u,140*u,26*u,C.cream);
  cup(R-62*u,340*u,0.78*u*0.55,{t:tl,level:0.55,steamOn:true});
  txt('كوباية خمس',R-130*u,334*u,30*u,C.brown,{al:'right'});txt('دقايق',R-130*u,368*u,30*u,C.brown,{al:'right'});
  g.save();const pb=1-press*0.08;g.translate(84*u,372*u);g.scale(pb,pb);
  fillRR(-52*u,-22*u,104*u,44*u,22*u,press>0.3?C.brown:C.amber);txt('ابدأ',0,7*u,20*u,press>0.3?C.cream:C.brown,{f:'b'});g.restore();
  g.restore();
  g.save();slide(1.1);txt('فكرة النهارده',R,470*u,22*u,C.brown,{al:'right'});
  txt('سيب الموبايل دقيقة، وبص من',R,502*u,16*u,'#6B5646',{f:'b',al:'right',w:500});
  txt('الشباك. الشاي لسه سخن.',R,526*u,16*u,'#6B5646',{f:'b',al:'right',w:500});g.restore();
  g.save();slide(1.3);g.fillStyle=C.brown;g.fillRect(24*u,h-96*u,w-48*u,3*u);
  const nav=['الرئيسية','كوبايتي','السجل','حسابي'];nav.forEach((n,i)=>txt(n,R-i*84*u,h-52*u,15*u,i===0?C.brown:C.muted,{f:'b',al:'right'}));g.restore();
}

function sessionScreen(w,h,tl,secs){
  const u=w/390;g.fillStyle=C.paper;g.fillRect(0,0,w,h);
  txt('9:41',24*u,38*u,15*u,C.brown,{f:'b',al:'left',dir:'ltr'});
  const a=sp(tl,0.0,DF);g.save();g.globalAlpha=clamp(a*2);
  txt('كوباية هادية',w/2,110*u,40*u,C.brown);
  txt('الشاي بيتحضّر وإنت بتهدّى',w/2,146*u,16*u,'#6B5646',{f:'b',w:500});g.restore();
  const lvl=clamp(tl/1.3)*0.78;
  cup(w/2,385*u,1.12*u,{line:C.sand,tea:C.amber,steam:C.sand,level:lvl,t:tl});
  const m=Math.floor(secs/60),s=Math.floor(secs%60);
  txt(AR(String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')),w/2,552*u,76*u,C.brown,{dir:'ltr'});
  const br=(Math.sin(tl*2.4)+1)/2;
  txt(br>0.5?'شهيق… ثم زفير':'شهيق… ثم زفير',w/2,604*u,18*u,'#6B5646',{f:'b',w:500,sc:1+br*0.05});
  fillRR(40*u,h-130*u,150*u,56*u,28*u,C.cream);txt('وقّف',115*u,h-93*u,22*u,C.brown,{f:'b'});
  txt('كمّل',w-100*u,h-93*u,22*u,C.brown,{f:'b'});
}

function clock(x,y,r,tl){
  g.save();g.translate(x,y);
  circ(0,0,r,C.cream);g.lineWidth=r*0.07;g.strokeStyle=C.brown;g.beginPath();g.arc(0,0,r,0,7);g.stroke();
  g.lineCap='round';
  for(let i=0;i<12;i++){const a=i*Math.PI/6;g.lineWidth=i%3?r*0.04:r*0.07;g.beginPath();
    g.moveTo(Math.sin(a)*r*0.8,-Math.cos(a)*r*0.8);g.lineTo(Math.sin(a)*r*0.9,-Math.cos(a)*r*0.9);g.stroke();}
  const m=tl*16,hr=m/12;
  g.strokeStyle=C.brown;g.lineWidth=r*0.07;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(hr)*r*0.45,-Math.cos(hr)*r*0.45);g.stroke();
  g.strokeStyle=C.hib;g.lineWidth=r*0.05;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(m)*r*0.72,-Math.cos(m)*r*0.72);g.stroke();
  circ(0,0,r*0.07,C.brown);g.restore();
}

// whip transition: a brown panel (plus amber trailer) sweeping right->left over the cut at tc
function whip(t,tc,col){
  const u=(t-(tc-0.25))/0.5; if(u<=0||u>=1)return;
  const e=u<0.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
  const Wp=W+1100,x=lerp(W+60,-Wp-60,e);
  g.fillStyle=C.amber;g.fillRect(x+90,0,Wp,H);
  g.fillStyle=col;g.fillRect(x,0,Wp,H);
}

function thumbTo(tx,ty,len,wd,rot,press=0){thumb(tx-len*Math.sin(rot),ty+len*Math.cos(rot),len,wd,rot,press);}
