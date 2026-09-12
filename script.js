const $ = (s) => document.querySelector(s);

$("#openBtn").addEventListener("click", () => {
  document.querySelector(".section").scrollIntoView({behavior:"smooth"});
  startHearts();
});

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

let heartTimer;
function startHearts(){
  if(heartTimer) return;
  heartTimer=setInterval(()=>{
    const h=document.createElement("span");
    h.className="heart-float";
    h.textContent=Math.random()>.35?"♡":"✦";
    h.style.left=(Math.random()*100)+"%";
    h.style.fontSize=(10+Math.random()*15)+"px";
    h.style.setProperty("--drift",(Math.random()*100-50)+"px");
    h.style.animationDuration=(7+Math.random()*7)+"s";
    document.querySelector(".hearts").appendChild(h);
    setTimeout(()=>h.remove(),15000);
  },650);
}
startHearts();

const modal=$("#modal"), typed=$("#typed");
const message="Kalau suatu hari kamu bertanya seberapa berartinya kamu, mungkin aku tidak akan punya angka yang tepat. Aku cuma tahu: kehadiranmu membuat hidup terasa sedikit lebih indah. Jadi, tetaplah menjadi kamu. Tetap tersenyum. Dan jangan lupa... kamu sangat layak untuk dicintai. Selamat ulang tahun, sayang. ♡";
$("#secretBtn").addEventListener("click",()=>{
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  typed.textContent="";
  let i=0;
  const timer=setInterval(()=>{
    typed.textContent=message.slice(0,i++);
    if(i>message.length) clearInterval(timer);
  },28);
});
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}
$("#closeBtn").addEventListener("click",closeModal);
modal.addEventListener("click",(e)=>{if(e.target===modal) closeModal()});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape") closeModal()});
