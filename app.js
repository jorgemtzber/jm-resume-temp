document.addEventListener('DOMContentLoaded', () => {
  // HERO parallax (mouse)
  const parallax = document.querySelector('.parallax');
  const layers = document.querySelectorAll('.layer');
  if (parallax){
    parallax.addEventListener('mousemove', e => {
      const r = parallax.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2))/r.width;
      const dy = (e.clientY - (r.top + r.height/2))/r.height;
      layers.forEach((el, i) => {
        const depth = i === 0 ? -30 : -50;
        el.style.transform = `translate3d(${dx*depth}px, ${dy*depth}px, ${-60 - i*30}px)`;
      });
    });
  }

  // Contact section animated gradient (canvas 2D)
  const canvas = document.getElementById('mesh');
  if (canvas && canvas.getContext){
    const ctx = canvas.getContext('2d');
    let w, h, t=0;
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    new ResizeObserver(resize).observe(canvas); resize();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tick = () => {
      t += 0.008; ctx.clearRect(0,0,w,h);
      for(let i=0;i<3;i++){
        const tt=t+i*1.2, x=(Math.sin(tt*1.3+i)*0.4+0.5)*w, y=(Math.cos(tt*1.1+i)*0.4+0.5)*h;
        const r=Math.max(w,h)*0.8, g=ctx.createRadialGradient(x,y,0,x,y,r);
        const base=i*30+180; g.addColorStop(0,`hsla(${base},14%,28%,.35)`); g.addColorStop(1,`hsla(${base+20},14%,8%,0)`);
        ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      }
      requestAnimationFrame(tick);
    };
    if (!prefersReduced.matches) tick();
  }
});
