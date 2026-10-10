// Uncle Kamal, drawn as flat vector shapes from the character sheet (bust only).
// Local units: head centre = (0,0), head width ~360. Everything is a function of the state object.

function steam(x,y,t,sc,col,al=1){
  g.save();g.translate(x,y);g.scale(sc,sc);g.lineWidth=9;g.lineCap='round';g.strokeStyle=col;
  for(const k of [-1,1]){
    for(let i=0;i<16;i++){
      const a=i/16,b=(i+1)/16;
      const f=u=>[k*17+Math.sin(u*6.5+t*3.2+k*1.3)*9*(0.4+u),-u*105];
      const p=f(a),q=f(b);
      g.globalAlpha=al*(1-a)*Math.min(1,a*8);
      g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();
    }
  }
  g.restore();
}

// Tea glass held in Kamal's hand. (x,y) = glass centre.
function teaGlass(x,y,rot,sc,level,hand,t){
  g.save();g.translate(x,y);g.rotate(rot);g.scale(sc,sc);
  if(hand){ // sleeve + cuff
    g.save();g.rotate(0.35);
    fillRR(-52,40,104,520,40,C.jacket);
    fillRR(-52,40,104,34,12,C.jacketSh);
    g.restore();
  }
  // glass body
  g.beginPath();g.moveTo(-40,-58);g.lineTo(40,-58);g.lineTo(32,58);g.lineTo(-32,58);g.closePath();
  g.fillStyle='rgba(238,234,222,.82)';g.fill();
  // tea
  const top=58-110*level;
  g.save();g.beginPath();g.moveTo(-40,-58);g.lineTo(40,-58);g.lineTo(32,58);g.lineTo(-32,58);g.closePath();g.clip();
  g.fillStyle=C.tea;g.fillRect(-45,top,90,130);
  g.fillStyle='rgba(255,255,255,.25)';g.fillRect(-45,top,90,5);
  g.restore();
  g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=5;g.beginPath();g.moveTo(-40,-58);g.lineTo(40,-58);g.stroke();
  if(hand){
    // fingers wrapping the glass front
    for(let i=0;i<4;i++){fillRR(-44+i*2,-22+i*24,74,22,11,C.skin);
      g.strokeStyle=C.skinSh;g.lineWidth=3;g.beginPath();g.moveTo(-14+i*2,-16+i*24);g.lineTo(-14+i*2,-2+i*24);g.stroke();}
    fillRR(-52,-40,26,70,13,C.skinSh);
  }
  g.restore();
}

function brow(cx,cy,rot,len){
  g.save();g.translate(cx,cy);g.rotate(rot);
  for(let pass=0;pass<2;pass++){
    g.fillStyle=pass?C.hair:C.capSh;
    for(let i=-2;i<=2;i++){
      const x=i*len/4,y=(i%2?-5:3)+(pass?0:5),r=(i===0?24:20)+(i%2?3:0);
      g.beginPath();g.arc(x,y,r,0,7);g.fill();
    }
  }
  g.restore();
}

function eye(cx,cy,open,lid,look,pupil,wide){
  if(open<=0.05){ // closed, relaxed
    g.strokeStyle=C.frame;g.lineWidth=6;g.lineCap='round';
    g.beginPath();g.moveTo(cx-24,cy+1);g.quadraticCurveTo(cx,cy+15,cx+24,cy+1);g.stroke();return;
  }
  const rx=wide?29:25, ry=(wide?27:19)*open;
  g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.clip();
  g.fillStyle='#FBF7EE';g.fillRect(cx-rx-2,cy-ry-2,2*rx+4,2*ry+4);
  const px=cx+look[0]*(rx-pupil-2),py=cy+look[1]*(ry*0.5);
  if(g._dizzy){ // spiral pupil
    g.strokeStyle=C.frame;g.lineWidth=4;g.beginPath();
    for(let a=0;a<22;a+=0.25){const r=a*1.2;g.lineTo(cx+Math.cos(a+g._dizzy)*r,cy+Math.sin(a+g._dizzy)*r*0.85);}g.stroke();
  } else circ(px,py,pupil,C.frame);
  if(lid>0){g.fillStyle=C.skin;g.fillRect(cx-rx-2,cy-ry-2,2*rx+4,2*ry*lid+2);}
  g.restore();
  g.strokeStyle=C.frame;g.lineCap='round';
  if(lid>0){g.lineWidth=5;const ly=cy-ry+2*ry*lid;g.beginPath();g.moveTo(cx-rx,ly+1);g.quadraticCurveTo(cx,ly-5,cx+rx,ly+1);g.stroke();}
  else if(wide){g.lineWidth=4;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.stroke();}
}

function glasses(gd,tilt){
  g.save();g.translate(0,gd*62);g.rotate(tilt);
  // temple arms
  g.strokeStyle=C.frame;g.lineWidth=12;g.lineCap='round';
  g.beginPath();g.moveTo(-154,8);g.lineTo(-184,-2);g.moveTo(154,8);g.lineTo(184,-2);g.stroke();
  for(const sx of[-1,1]){
    const cx=sx*88,cy=22;
    rr(cx-68,cy-56,136,112,40);
    g.fillStyle='rgba(217,208,186,.55)';g.fill();
    g.strokeStyle=C.lens;g.lineWidth=5;rr(cx-60,cy-48,120,96,34);g.stroke();
    g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.roundRect(cx-44,cy-26,30,10,5);g.fill();
    g.strokeStyle=C.frame;g.lineWidth=18;rr(cx-68,cy-56,136,112,40);g.stroke();
  }
  g.lineWidth=14;g.beginPath();g.moveTo(-22,12);g.lineTo(22,12);g.stroke();
  g.restore();
}

function mustache(){
  const half=(sx)=>{ // right half path points mirrored by sx
    return [[0,84],[50,68,112,74,150,90],[168,96,178,84,176,66],[184,92,174,112,142,124],[100,146,44,146,0,144]].map(p=>p.map((v,i)=>i%2===0?v*sx:v));
  };
  g.beginPath();g.moveTo(0,84);
  let r=half(1);
  g.bezierCurveTo(...r[1]);g.bezierCurveTo(...r[2]);g.bezierCurveTo(...r[3]);g.bezierCurveTo(...r[4]);
  let l=half(-1);
  // left side back up: reverse order
  g.bezierCurveTo(-44,146,-100,146,-142,124);g.bezierCurveTo(-174,112,-184,92,-176,66);
  g.bezierCurveTo(-178,84,-168,96,-150,90);g.bezierCurveTo(-112,74,-50,68,0,84);g.closePath();
  g.fillStyle=C.hair;g.fill();
  g.strokeStyle=C.capSh;g.lineWidth=5;g.lineCap='round';
  g.beginPath();g.moveTo(18,112);g.bezierCurveTo(60,126,110,118,150,98);
  g.moveTo(-18,112);g.bezierCurveTo(-60,126,-110,118,-150,98);g.stroke();
}

function mouth(kind,open){
  g.lineCap='round';
  if(open>0.04&&kind!=='laugh'){ // talking
    const ry=3+open*26,rx=24+open*12;
    g.beginPath();g.ellipse(0,166+ry*0.3,rx,ry,0,0,7);g.fillStyle='#5A1F14';g.fill();
    if(open>0.35){g.save();g.clip();circ(0,166+ry*1.1,rx*0.6,'#C4574F');g.restore();}
    return;
  }
  g.strokeStyle='#8A3D2A';g.lineWidth=7;g.beginPath();
  if(kind==='smile'){g.moveTo(-36,163);g.quadraticCurveTo(0,190,36,163);g.stroke();}
  else if(kind==='half'){g.moveTo(-30,170);g.quadraticCurveTo(6,176,36,156);g.stroke();
    g.lineWidth=5;g.beginPath();g.moveTo(40,150);g.quadraticCurveTo(46,158,42,166);g.stroke();}
  else if(kind==='flat'){g.moveTo(-28,170);g.lineTo(28,170);g.stroke();}
  else if(kind==='frown'){g.moveTo(-32,176);g.quadraticCurveTo(0,156,32,176);g.stroke();}
  else if(kind==='o'){g.beginPath();g.ellipse(0,176,17,21,0,0,7);g.fillStyle='#5A1F14';g.fill();}
  else if(kind==='laugh'){
    const k=0.55+0.45*open;
    g.beginPath();g.moveTo(-50,160);g.quadraticCurveTo(0,164,50,160);g.quadraticCurveTo(44,160+66*k,0,164+66*k);g.quadraticCurveTo(-44,160+66*k,-50,160);g.closePath();
    g.fillStyle='#5A1F14';g.fill();g.save();g.clip();circ(0,214+10*k,28,'#C4574F');g.restore();
  }
}

function body(d){
  const sh=d.sh;
  // neck
  fillRR(-70,150,140,130,24,C.skinSh);
  // jacket
  g.beginPath();g.moveTo(-346,760);g.lineTo(-352,340-sh*0.6);
  g.bezierCurveTo(-348,250-sh,-290,232-sh,-200,226-sh);g.lineTo(-90,222-sh*0.4);
  g.lineTo(90,222-sh*0.4);g.lineTo(200,226-sh);
  g.bezierCurveTo(290,232-sh,348,250-sh,352,340-sh*0.6);g.lineTo(346,760);g.closePath();
  g.fillStyle=C.jacket;g.fill();
  // sleeve seams
  g.strokeStyle=C.jacketSh;g.lineWidth=6;g.lineCap='round';
  g.beginPath();g.moveTo(-232,300-sh*0.5);g.quadraticCurveTo(-262,500,-250,740);
  g.moveTo(232,300-sh*0.5);g.quadraticCurveTo(262,500,250,740);g.stroke();
  // grey tee + lapels
  g.fillStyle=C.tee;g.beginPath();g.moveTo(-76,232-sh*0.4);g.lineTo(0,392);g.lineTo(76,232-sh*0.4);g.closePath();g.fill();
  g.fillStyle=C.jacketSh;
  for(const s of[-1,1]){g.beginPath();g.moveTo(s*136,226-sh*0.6);g.lineTo(s*74,232-sh*0.4);g.lineTo(0,396);g.lineTo(s*42,420);g.lineTo(s*158,276);g.closePath();g.fill();}
  // buttons + patch
  circ(0,470,13,C.frame);circ(0,560,13,C.frame);
  g.strokeStyle=C.jacketSh;g.lineWidth=5;g.setLineDash([12,9]);
  fillRR(-250,600,110,92,12,C.patch);rr(-250,600,110,92,12);g.stroke();g.setLineDash([]);
  // V stitch marks
  g.lineWidth=5;for(const [x,y] of[[-150,330],[160,360],[-190,470]]){g.beginPath();g.moveTo(x-10,y);g.lineTo(x,y+10);g.lineTo(x+10,y);g.stroke();}
}

function head(d,env){
  const t=d.t;
  // ears
  for(const s of[-1,1]){g.beginPath();g.ellipse(s*180,26,30,42,0,0,7);g.fillStyle=C.skin;g.fill();
    g.beginPath();g.ellipse(s*184,28,14,24,0,0,7);g.fillStyle=C.skinSh;g.fill();}
  // face
  g.beginPath();g.ellipse(0,15,178,200,0,0,7);g.fillStyle=C.skin;g.fill();
  // jaw shade
  g.save();g.beginPath();g.ellipse(0,15,178,200,0,0,7);g.clip();
  g.fillStyle='rgba(201,139,88,.35)';g.beginPath();g.ellipse(0,250,230,90,0,0,7);g.fill();g.restore();
  // cheeks
  if(d.cheek>0){for(const s of[-1,1])circ(s*112,128,34,`rgba(217,120,100,${0.32*d.cheek})`);}
  // nose
  g.beginPath();g.ellipse(0,64,26,30,0,0,7);g.fillStyle=C.skinSh;g.fill();
  // mouth (under mustache)
  const talk=d.talk?env:0;
  g.save();g.translate(0,d.mouthY||0);mouth(d.mouth,talk>0.04?talk:(d.mouthOpen||0));g.restore();
  // eyes (drawn before glasses so they show over the rim when glasses slide down)
  const gdn=d.gd;g._dizzy=d.dizzy?d.dizzy:0;
  const oL=d.eyeL??d.open,oR=d.eyeR??d.open;
  eye(-88,5,oL,d.lid,d.look,d.pupil,d.wide);eye(88,5,oR,d.lid,d.look,d.pupil,d.wide);
  g._dizzy=0;
  // mustache
  g.save();g.translate(0,-talk*5);mustache();g.restore();
  // cap
  g.beginPath();g.moveTo(-192,-66);g.bezierCurveTo(-204,-232,-112,-304,0,-304);g.bezierCurveTo(112,-304,204,-232,192,-66);g.closePath();
  g.fillStyle=C.cap;g.fill();
  g.strokeStyle=C.capSh;g.lineWidth=8;g.lineCap='round';
  for(const x of[-118,-60,0,60,118]){g.beginPath();g.moveTo(x*0.9,-250+Math.abs(x)*0.1);g.quadraticCurveTo(x*1.03,-170,x*1.04,-104);g.stroke();}
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=9;g.beginPath();g.arc(-30,-120,170,Math.PI*1.12,Math.PI*1.38);g.stroke();
  fillRR(-198,-104,396,52,24,C.capSh);
  fillRR(-198,-104,396,22,12,'#E6DFCB');
  // glasses
  glasses(gdn,d.gtilt||0);
  // brows
  brow(-88,-58-d.browL,-0.05+d.tiltL,118);
  brow(88,-58-d.browR,0.05+d.tiltR,118);
  // eyeball pop (comic bulge)
  if(d.bulge>0){
    for(const s of[-1,1]){
      const bx=s*(88+d.bulge*18),by=5-d.bulge*62+Math.sin(t*14+s)*d.bulge*5;
      g.strokeStyle=C.frame;g.lineWidth=7;g.lineJoin='round';g.beginPath();g.moveTo(s*88,22);
      const n=9;for(let i=1;i<=n;i++){const u=i/n;g.lineTo(lerp(s*88,bx,u)+(i%2?-1:1)*16*(1-u*0.3),lerp(22,by,u));}g.stroke();
      circ(bx,by,56,'#FBF7EE');g.strokeStyle=C.frame;g.lineWidth=6;g.beginPath();g.arc(bx,by,56,0,7);g.stroke();
      g.strokeStyle='rgba(181,48,74,.55)';g.lineWidth=3;
      for(let k=0;k<7;k++){const a=k*0.9+s;g.beginPath();g.moveTo(bx+Math.cos(a)*62,by+Math.sin(a)*62);g.lineTo(bx+Math.cos(a)*(36+(k%3)*6),by+Math.sin(a)*(36+(k%3)*6));g.stroke();}
      if(d.dizzy){g.strokeStyle=C.frame;g.lineWidth=5;g.beginPath();for(let a=0;a<20;a+=0.25){const r=a*1.9;g.lineTo(bx+Math.cos(a+d.dizzy*s)*r,by+Math.sin(a+d.dizzy*s)*r);}g.stroke();}
      else{circ(bx+d.look[0]*14,by+d.look[1]*14,22,C.frame);circ(bx+d.look[0]*14-6,by+d.look[1]*14-7,6,'#fff');}
    }
  }
}

function kamal(o){
  const d=Object.assign({x:540,y:1000,s:2,rot:0,look:[0,0],open:1,lid:.45,browL:0,browR:0,tiltL:0,tiltR:0,
    mouth:'smile',mouthOpen:0,talk:false,t:0,gd:0,sh:0,glass:null,cheek:1,bulge:0,dizzy:0,tilt:0,sx:1,sy:1,pupil:9,wide:false},o);
  const env=d.talk?envAt(d.t):0;
  g.save();g.translate(d.x,d.y);g.rotate(d.rot);g.scale(d.s*d.sx,d.s*d.sy);
  body(d);
  g.save();g.translate(0,200);g.rotate(d.tilt);g.translate(0,-200);
  head(d,env);
  g.restore();
  if(d.glass){const q=d.glass;
    if(q.steam!==false)steam(q.x,q.y-70*q.sc,d.t,q.sc,'rgba(255,241,214,.9)',q.steamA??1);
    teaGlass(q.x,q.y,q.rot||0,q.sc,q.level??0.72,true,d.t);}
  g.restore();
}
