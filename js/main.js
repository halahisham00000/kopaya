function shotIndex(t){for(let i=T.length-2;i>=0;i--)if(t>=T[i])return i;return 0;}
function draw(t){
  g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.clearRect(0,0,W,H);
  const i=shotIndex(t),tl=t-T[i],dur=T[i+1]-T[i];
  g.save();
  const z=1+0.03*(tl/dur);g.translate(W/2,H/2);g.scale(z,z);g.translate(-W/2,-H/2);
  g.save();SHOTS[i](t);g.restore();
  g.restore();
  for(const [tc,col] of WIPES)whip(t,tc,col);
  // paper grain, boils at 12 fps
  g.save();g.globalAlpha=1;const k=Math.floor(t*12)%4;g.imageSmoothingEnabled=false;g.drawImage(GR[k],0,0,W,H);g.restore();
}
window.seek=(t)=>{draw(Math.min(t,DUR-0.001));return true;};
// Live preview (not used by the renderer): the AUDIO is the clock, so picture and voice cannot drift.
if(navigator.webdriver){const h=document.getElementById('hint');if(h)h.style.display='none';}
if(!navigator.webdriver){
  const a=document.getElementById('a'),hint=document.getElementById('hint');
  let audioOk=true,fallbackStart=null;
  a.addEventListener('error',()=>{audioOk=false;});
  const toggle=()=>{
    if(a.paused){ if(a.ended||a.currentTime>=DUR-0.05)a.currentTime=0; const p=a.play(); if(p)p.catch(()=>{audioOk=false;fallbackStart=performance.now();}); hint.style.display='none'; }
    else{a.pause();hint.style.display='block';}
  };
  addEventListener('pointerdown',toggle);
  addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();toggle();}});
  (function loop(){
    let t=a.currentTime||0;
    if(!audioOk&&fallbackStart!==null)t=((performance.now()-fallbackStart)/1000)%DUR;
    if(audioOk&&a.ended){a.currentTime=0;a.play();}
    draw(Math.min(t,DUR-0.001));requestAnimationFrame(loop);
  })();
}
