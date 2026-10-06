const body=document.body, theme=document.getElementById("theme"), modal=document.getElementById("modal"), form=document.getElementById("form");
const saved=localStorage.getItem("laiba-theme"); if(saved==="dark"){body.classList.add("dark");theme.textContent="☀"} 
theme.onclick=()=>{body.classList.toggle("dark");const dark=body.classList.contains("dark");theme.textContent=dark?"☀":"☾";localStorage.setItem("laiba-theme",dark?"dark":"light")};
function openModal(){modal.classList.add("open");document.body.style.overflow="hidden"}
function closeModal(){modal.classList.remove("open");document.body.style.overflow=""}
document.querySelectorAll("[data-open]").forEach(x=>x.onclick=openModal);
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
form.onsubmit=e=>{e.preventDefault();const d=new FormData(form);
const msg=`Hi Laiba AK! I'd like to discuss a collaboration.

Name: ${d.get("name")}
Business / Brand: ${d.get("business")}
Location: ${d.get("location")}
My WhatsApp: ${d.get("phone")}
Collaboration: ${d.get("type")}

Business / Product details:
${d.get("details")}

I found the collaboration details on the Laiba AK website.`;
window.open("https://wa.me/923400506456?text="+encodeURIComponent(msg),"_blank");
};
/* Scroll-triggered animations and 28-day reach counters */
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('reveal-ready');

  const revealItems = document.querySelectorAll('.hero-copy, .hero-art, .section, .cta, footer');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealItems.forEach(el => revealObserver.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  const cards = document.querySelectorAll('.reach-card');
  const counters = document.querySelectorAll('.count-up');
  let counted = false;

  function formatCompact(value){
    if (value >= 1000000) {
      const n = value / 1000000;
      return (n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)) + 'M+';
    }
    if (value >= 1000) {
      const n = value / 1000;
      return (n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)) + 'K+';
    }
    return Math.round(value).toLocaleString() + '+';
  }

  function animateCounters(){
    if (counted) return;
    counted = true;
    cards.forEach(card => card.classList.add('is-visible'));

    counters.forEach(counter => {
      const target = Number(counter.dataset.target || 0);
      const duration = 1700;
      if (prefersReduced) {
        counter.textContent = formatCompact(target);
        return;
      }
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = formatCompact(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
        else counter.textContent = formatCompact(target);
      }
      requestAnimationFrame(tick);
    });

    const bars = document.querySelectorAll('.reach-bar span');
    bars.forEach((bar, i) => {
      // Relative to the largest platform reach (1.1M).
      const widths = [64,100,54,4];
      setTimeout(() => { bar.style.width = widths[i] + '%'; }, 120);
    });
  }

  const reachSection = document.getElementById('reach28');
  if (reachSection && 'IntersectionObserver' in window) {
    const reachObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        animateCounters();
        reachObserver.disconnect();
      }
    }, {threshold: 0.25});
    reachObserver.observe(reachSection);
  } else {
    animateCounters();
  }
})();

/* Premium animated audience metrics */
(function(){
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const metrics = document.querySelectorAll('.follower-count, .view-count');
  if(!metrics.length) return;

  function formatMetric(value, isView){
    const n=Math.max(0,value);
    if(n >= 1000000){
      const digits = n < 10000000 ? 2 : 1;
      return (n/1000000).toFixed(digits).replace(/\.00$/,'') + 'M+';
    }
    if(n >= 1000){
      return (n/1000).toFixed(n < 100000 ? 1 : 0).replace(/\.0$/,'') + 'K+';
    }
    return Math.round(n).toLocaleString() + '+';
  }
  function animate(el){
    const target=Number(el.dataset.target||0);
    if(reduce){el.textContent=formatMetric(target, el.classList.contains('view-count'));return;}
    const duration=1800, start=performance.now();
    function tick(now){
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,4);
      el.textContent=formatMetric(target*eased, el.classList.contains('view-count'));
      if(p<1) requestAnimationFrame(tick);
      else el.textContent=formatMetric(target, el.classList.contains('view-count'));
    }
    requestAnimationFrame(tick);
  }
  let done=false;
  const stats=document.querySelector('.stats');
  const run=()=>{if(done)return;done=true;metrics.forEach(animate)};
  if('IntersectionObserver' in window && stats && !reduce){
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){run();observer.disconnect();}
    },{threshold:.18});
    observer.observe(stats);
  } else run();
})();
