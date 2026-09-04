
const imgs=[...Array(11)].map((_,i)=>`images/${i+1}.jpg`),stage=document.getElementById('stage'),dots=document.getElementById('dots'),counter=document.getElementById('counter');let idx=0;
imgs.forEach((src,i)=>{let el=document.createElement('div');el.className='slide';el.innerHTML=`<img src="${src}" alt="Ảnh cưới ${i+1}">`;stage.appendChild(el);let dot=document.createElement('i');dot.className='dot';dot.onclick=()=>{idx=i;render()};dots.appendChild(dot)});const slides=[...document.querySelectorAll('.slide')],dotEls=[...document.querySelectorAll('.dot')];
function render(){
  slides.forEach((el,i)=>{
    const d=(i-idx+imgs.length)%imgs.length;
    let cls='slide';
    if(d===0) cls+=' active';
    else if(d===1) cls+=' next';
    else if(d===imgs.length-1) cls+=' prev';
    else if(d===2) cls+=' farnext';
    else if(d===imgs.length-2) cls+=' farprev';
    el.className=cls;
  });
  dotEls.forEach((d,i)=>d.classList.toggle('active',i===idx));
  counter.textContent=String(idx+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0');
}
render();
document.getElementById('prev').onclick=()=>{idx=(idx-1+imgs.length)%imgs.length;render()};document.getElementById('next').onclick=()=>{idx=(idx+1)%imgs.length;render()};setInterval(()=>{idx=(idx+1)%imgs.length;render()},4500);
let sx=0;stage.addEventListener('pointerdown',e=>sx=e.clientX);stage.addEventListener('pointerup',e=>{let dx=e.clientX-sx;if(Math.abs(dx)>40){idx=(idx+(dx<0?1:-1)+imgs.length)%imgs.length;render()}});
const target=new Date('2026-09-18T08:00:00+07:00');function countdown(){let x=Math.max(0,target-new Date()),sec=Math.floor(x/1000);document.getElementById('d').textContent=Math.floor(sec/86400);document.getElementById('h').textContent=String(Math.floor(sec%86400/3600)).padStart(2,'0');document.getElementById('m').textContent=String(Math.floor(sec%3600/60)).padStart(2,'0');document.getElementById('s').textContent=String(sec%60).padStart(2,'0')}setInterval(countdown,1000);countdown();
const days=document.getElementById('days'),first=new Date(2026,8,1).getDay();let start=(first+6)%7;for(let i=0;i<start;i++)days.innerHTML+='<div></div>';for(let n=1;n<=30;n++)days.innerHTML+=`<div class="${n===18?'chosen':''}">${n}</div>`;
const audio=document.getElementById('audio'),music=document.getElementById('music');function play(){audio.play().then(()=>music.classList.add('on')).catch(()=>{})}document.addEventListener('pointerdown',play,{once:true});music.onclick=()=>{if(audio.paused){play()}else{audio.pause();music.classList.remove('on')}};
const key='syvy-thuthao-guestbook';function load(){let a=JSON.parse(localStorage.getItem(key)||'[]');document.getElementById('messages').innerHTML=a.map(x=>`<div class="msg"><strong>${escapeHtml(x.n)}</strong><p>${escapeHtml(x.m)}</p></div>`).join('')||'<div style="text-align:center;color:#9b8387;font-size:13px">Hãy là người đầu tiên gửi lời chúc!</div>'}function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}const gname=document.getElementById('gname'),gmsg=document.getElementById('gmsg');
document.getElementById('send').onclick=()=>{let n=gname.value.trim(),m=gmsg.value.trim();if(!n||!m)return alert('Vui lòng nhập tên và lời chúc.');let a=JSON.parse(localStorage.getItem(key)||'[]');a.unshift({n,m});localStorage.setItem(key,JSON.stringify(a));gname.value='';gmsg.value='';load()};load();

/* TỰ ĐỘNG CUỘN TOÀN TRANG — KHÔNG CHE NỘI DUNG NẾU TRÌNH DUYỆT CHẶN SCRIPT */
(function(){
  let running=true, last=0, timer=null;
  const speed=0.32; // px/ms
  function pause(){
    running=false;
    clearTimeout(timer);
    timer=setTimeout(()=>{running=true;last=performance.now()},3000);
  }
  ['wheel','touchstart','pointerdown','keydown'].forEach(e=>window.addEventListener(e,pause,{passive:true}));
  function loop(now){
    if(!last) last=now;
    const dt=Math.min(40,now-last); last=now;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    if(running && max>20){
      if(window.scrollY < max-2) window.scrollBy(0,speed*dt);
      else {
        running=false;
        clearTimeout(timer);
        timer=setTimeout(()=>{window.scrollTo(0,0); setTimeout(()=>{running=true;last=performance.now()},1000)},2500);
      }
    }
    requestAnimationFrame(loop);
  }
  // Reveal nhẹ nhưng không bao giờ làm trang trắng
  try{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.05});
    document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
  }catch(e){}
  window.addEventListener('load',()=>setTimeout(()=>requestAnimationFrame(loop),1200));
  setTimeout(()=>requestAnimationFrame(loop),1800);
})();

