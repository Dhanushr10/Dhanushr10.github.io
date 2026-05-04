/* =====================================================
   VIOT Campus Bot — Case Study · Interactions
   Dhanush R · dhanushr10.github.io
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  reveals.forEach(el => revealObs.observe(el));

  /* ── Drag-to-scroll on screen strip ── */
  const strip = document.querySelector('.screens-strip');
  if (strip) {
    let isDown = false, startX, scrollLeft;
    strip.style.cursor = 'grab';
    strip.addEventListener('mousedown', (e) => {
      isDown = true;
      strip.style.cursor = 'grabbing';
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    });
    strip.addEventListener('mouseleave', () => { isDown = false; strip.style.cursor = 'grab'; });
    strip.addEventListener('mouseup',    () => { isDown = false; strip.style.cursor = 'grab'; });
    strip.addEventListener('mousemove',  (e) => {
      if (!isDown) return;
      e.preventDefault();
      strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX) * 1.5;
    });
  }

  /* ── Smooth scroll for in-page anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
