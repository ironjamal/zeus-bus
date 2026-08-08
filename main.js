// ZEUS BUS — shared interactions
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav scroll state ---- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      panel.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      panel.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- Reveal on scroll ----
     Elements start fully visible in CSS. Only once we know the
     observer is live do we "arm" (hide) each element, then reveal
     it as it scrolls into view — so a slow or failed script never
     leaves content stuck invisible. */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => {
      el.style.setProperty('--i', el.dataset.i || 0);
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.92;
      el.classList.add('armed');
      if (alreadyVisible) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });
  }

  /* ---- Route spine progress (homepage) ---- */
  const spine = document.querySelector('.route-spine .spine-progress');
  const spineWrap = document.querySelector('.route-spine-wrap');
  if (spine && spineWrap && !reduceMotion) {
    const length = spine.getTotalLength ? spine.getTotalLength() : 2000;
    spine.style.strokeDasharray = length;
    spine.style.strokeDashoffset = length;
    const updateSpine = () => {
      const rect = spineWrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.5;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const pct = total > 0 ? scrolled / total : 0;
      spine.style.strokeDashoffset = length - length * pct;
    };
    updateSpine();
    window.addEventListener('scroll', () => requestAnimationFrame(updateSpine), { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(updateSpine));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- Route selector (schedules page) ---- */
  const routeTabs = document.querySelectorAll('.route-tab');
  const routeBus = document.querySelector('.route-track-bus');
  if (routeTabs.length) {
    routeTabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        routeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.route-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab.dataset.route).classList.add('active');
        if (routeBus && !reduceMotion) {
          const positions = ['8%', '48%', '88%'];
          routeBus.style.left = positions[idx] || '8%';
        }
      });
    });
  }
});
