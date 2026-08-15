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
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
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

  /* ---- Journey rail: the red bus traveling the homepage ----
     Position is driven by scroll progress across a fixed list of
     section landmarks (Hero → Journey → Routes → Why → Stats →
     About → Schedule → CTA → FAQ → Contact). A single number, p
     (0→1), is written to a CSS custom property once per frame;
     every visual (bus position, progress fill, active stop) reads
     that variable, so there is exactly one source of truth for
     "where the bus is" and no separate top/left animation. */
  const railRoot = document.getElementById('journeyRail');
  if (railRoot) {
    const STOP_SELECTORS = ['.hero', '#journey', '#routes', '#why', '#stats', '#about-preview', '#schedule-preview', '#cta-arrive', '#faq', '#contact'];
    const stopEls = STOP_SELECTORS.map(sel => document.querySelector(sel)).filter(Boolean);
    const stopMarkers = Array.from(railRoot.querySelectorAll('.journey-rail-stop'));
    const busEl = railRoot.querySelector('.journey-rail-bus');
    const busInner = railRoot.querySelector('.journey-rail-bus-inner');
    const wheelEls = railRoot.querySelectorAll('.journey-rail-bus .wheel');

    let journeyStart = 0;
    let journeyRange = 1;
    let stopFractions = [];

    function layoutRail() {
      if (!stopEls.length) return;
      const firstRect = stopEls[0].getBoundingClientRect();
      const lastEl = stopEls[stopEls.length - 1];
      const lastRect = lastEl.getBoundingClientRect();
      journeyStart = firstRect.top + window.scrollY;
      const rawEnd = lastRect.top + window.scrollY + lastRect.height;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const journeyEnd = Math.min(rawEnd, Math.max(maxScrollY, journeyStart + 1));
      journeyRange = Math.max(journeyEnd - journeyStart, 1);

      stopFractions = stopEls.map(el => {
        const r = el.getBoundingClientRect();
        const mid = r.top + window.scrollY + r.height / 2;
        return Math.min(Math.max((mid - journeyStart) / journeyRange, 0), 1);
      });

      stopMarkers.forEach((marker, i) => {
        if (stopFractions[i] !== undefined) {
          marker.style.top = (stopFractions[i] * 100) + '%';
        }
      });
    }

    let targetP = 0;
    let currentP = 0;
    let activeIndex = -1;
    let rafId = null;

    function computeTarget() {
      const y = window.scrollY;
      targetP = Math.min(Math.max((y - journeyStart) / journeyRange, 0), 1);
      const visible = y > 80 && y < journeyStart + journeyRange + 200;
      railRoot.classList.toggle('visible', visible);
    }

    function updateActiveStop() {
      let idx = 0;
      for (let i = 0; i < stopFractions.length; i++) {
        if (currentP >= stopFractions[i] - 0.004) idx = i;
      }
      if (idx !== activeIndex) {
        activeIndex = idx;
        stopMarkers.forEach((marker, i) => {
          marker.classList.toggle('active', i <= activeIndex);
          marker.classList.toggle('current', i === activeIndex);
        });
      }
    }

    if (reduceMotion) {
      // Static: snap straight to the correct position, no continuous
      // animation, no wheel spin, no suspension.
      const applyStatic = () => {
        layoutRail();
        computeTarget();
        currentP = targetP;
        railRoot.style.setProperty('--p', currentP.toFixed(4));
        updateActiveStop();
      };
      applyStatic();
      window.addEventListener('scroll', applyStatic, { passive: true });
      window.addEventListener('resize', applyStatic);
    } else {
      let wheelAngle = 0;

      function tick() {
        const diff = targetP - currentP;
        currentP += diff * 0.09;
        if (Math.abs(diff) < 0.0003) currentP = targetP;

        railRoot.style.setProperty('--p', currentP.toFixed(4));
        updateActiveStop();

        // Speed proxy from how fast we're closing the gap to the
        // target — naturally near-zero once settled at a stop, and
        // naturally largest right after a scroll input, so the bus
        // eases in exactly like it's slowing for a stop.
        const speed = Math.abs(diff);
        wheelAngle += speed * 900;
        if (wheelEls.length) {
          const rot = 'rotate(' + wheelAngle.toFixed(1) + 'deg)';
          wheelEls.forEach(w => { w.style.transform = rot; });
        }
        if (busInner) {
          const bounce = Math.min(speed * 40, 2.4);
          busInner.style.transform = 'translateY(' + (-bounce).toFixed(2) + 'px)';
        }

        rafId = requestAnimationFrame(tick);
      }

      layoutRail();
      computeTarget();
      window.addEventListener('scroll', computeTarget, { passive: true });
      window.addEventListener('resize', () => { layoutRail(); computeTarget(); });
      window.addEventListener('load', layoutRail);
      rafId = requestAnimationFrame(tick);
    }
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Route selector (schedules page) ---- */
  const routeTabs = document.querySelectorAll('.route-tab');
  const routeBus = document.querySelector('.route-track-bus');
  if (routeTabs.length) {
    routeTabs.forEach((tab, idx) => {
      tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
      tab.addEventListener('click', () => {
        routeTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
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
