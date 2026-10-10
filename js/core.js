// Pure-function-of-time helpers (same spring maths as motion.js)
const W=1080,H=1920,DUR=26.8;
const cv=document.getElementById('c'), g=cv.getContext('2d');
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,t)=>a+(b-a)*t;
function spring(t,k=170,d=26){ if(t<=0)return 0; const w0=Math.sqrt(k),z=d/(2*w0);
  if(z<1){const wd=w0*Math.sqrt(1-z*z);return 1-Math.exp(-z*w0*t)*(Math.cos(wd*t)+(z*w0/wd)*Math.sin(wd*t));}
  return 1-Math.exp(-w0*t)*(1+w0*t); }
const SN=[320,30], DF=[170,26], HV=[90,20], PL=[220,14], BO=[150,8];
const sp=(t,t0,p=DF)=>spring(t-t0,p[0],p[1]);
function mulberry32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const C={amber:'#E8952B',brown:'#3A2216',mint:'#4E7F40',hib:'#B5304A',cream:'#FFF1D6',sand:'#F4D49A',
 skin:'#E1A671',skinSh:'#C98B58',jacket:'#9B6A45',jacketSh:'#7B4F31',cap:'#F0EADB',capSh:'#D9D0BA',
 hair:'#F2EFE8',frame:'#2B2624',lens:'#BFE3E8',tea:'#A94A1B',tee:'#8F959B',teeSh:'#6F767C',shoe:'#3B2E28',
 patch:'#7F8F6A',paper:'#FFFAF0',muted:'#A89F8E'};
const AR=s=>String(s).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const HEAD='Lalezar, "DejaVu Sans"', BODY='Tajawal, "DejaVu Sans"';
function envAt(t){const i=t*50, a=Math.floor(i); if(a<0||a>=ENV.length-1)return 0; const f=i-a; return ENV[a]*(1-f)+ENV[a+1]*f;}
function txt(str,x,y,px,col,o={}){
  g.save(); g.translate(x,y); if(o.rot)g.rotate(o.rot);
  g.scale(o.sx??o.sc??1,o.sy??o.sc??1);
  g.font=`${o.w||700} ${px}px ${o.f==='b'?BODY:HEAD}`; g.direction=o.dir||'rtl';
  g.textAlign=o.al||'center'; g.textBaseline='alphabetic';
  {const m=g.measureText(str).width,mw=o.maxW||900,sc0=Math.max(Math.abs(o.sx??o.sc??1),0.001); if(m*sc0>mw){const f=mw/(m*sc0);g.scale(f,f);}}
  if(o.a!==undefined)g.globalAlpha*=o.a;
  if(o.stroke){g.lineJoin='round';g.lineWidth=o.sw||12;g.strokeStyle=o.stroke;g.strokeText(str,0,0);}
  g.fillStyle=col; g.fillText(str,0,0); g.restore();
}
function rr(x,y,w,h,r){g.beginPath();g.roundRect(x,y,w,h,r);}
function fillRR(x,y,w,h,r,col){rr(x,y,w,h,r);g.fillStyle=col;g.fill();}
function circ(x,y,r,col){g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=col;g.fill();}
function bg(col){g.fillStyle=col;g.fillRect(0,0,W,H);}
// grain tiles (seeded) for a printed-paper feel
const GR=[];(function(){for(let k=0;k<4;k++){const c=document.createElement('canvas');c.width=540;c.height=960;const x=c.getContext('2d');
 const im=x.createImageData(540,960),r=mulberry32(100+k);for(let i=0;i<im.data.length;i+=4){const v=r()<.5?0:255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=r()<.22?10+r()*22:0;}
 x.putImageData(im,0,0);GR.push(c);}})();
