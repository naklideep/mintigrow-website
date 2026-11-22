/* MintiGrow — cinematic scroll layer. Shared by index.html and every services/*.html page.
 *
 *  - Smooth, inertial scrolling (Lenis, vendored in js/vendor) driven by GSAP's ticker so ScrollTrigger stays in sync.
 *  - A small scene system: base scenes live here, pages can add their own with MGFX.scene(fn).
 *  - Everything is created inside ONE gsap.context and rebuilt/reverted as a unit, so no trigger or listener leaks
 *    when the home page switches views (main.js dispatches `mg:route`).
 *  - Reveals fire once per element (down OR up) — they never replay while you scroll back and forth.
 *  - Parallax is scrubbed, so it runs forward and backward by definition.
 *  - Nothing here touches layout: motion uses opacity, the individual `translate` property (see scroll-fx.css),
 *    clip-path and CSS variables only.
 */
(function () {
  'use strict';
  if (window.MGFX) return; // never initialise twice

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = window.gsap, ST = window.ScrollTrigger;

  /* ── Scroll helper used by main.js / service-page.js (works with or without Lenis) ── */
  let lenis = null, tick = null;
  window.mgScroll = {
    get lenis() { return lenis; },
    to(target, o) {
      o = o || {};
      if (lenis) return lenis.scrollTo(target, { offset: o.offset || 0, duration: o.duration || 1.2, immediate: !!o.immediate });
      const beh = (o.immediate || RM) ? 'auto' : 'smooth';
      if (typeof target === 'number') scrollTo({ top: target, behavior: beh });
      else if (target && target.getBoundingClientRect) scrollTo({ top: scrollY + target.getBoundingClientRect().top + (o.offset || 0), behavior: beh });
    }
  };

  if (!G || !ST) { window.MGFX = { scene() {}, build() {}, destroy() {} }; return; } // GSAP failed to load: page stays fully usable
  if (!G.core.globals().ScrollTrigger) G.registerPlugin(ST);

  /* ── Smooth scrolling ── */
  if (!RM && window.Lenis) {
    lenis = new window.Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false, // keep native touch scrolling on phones/tablets
      prevent: n => !!(n.matches && n.matches('textarea,select,[data-lenis-prevent]'))
    });
    lenis.on('scroll', ST.update);
    tick = t => lenis.raf(t * 1000);
    G.ticker.add(tick);
    G.ticker.lagSmoothing(0);
  }

  /* ── Scene helpers ── */
  const desk = matchMedia('(min-width:861px)');
  function helpers(root) {
    const done = new WeakSet();
    const fx = els => els.forEach(e => e.setAttribute('data-fx', ''));
    // Reveal a set of elements the first time they enter the viewport (scrolling down OR back up), staggered per batch.
    function reveal(els, o) {
      o = o || {};
      els = [...els].filter(Boolean); if (!els.length) return;
      fx(els);
      G.set(els, { opacity: 0, '--in-y': o.y == null ? 30 : o.y });
      const play = b => {
        const t = b.filter(e => !done.has(e)); if (!t.length) return;
        t.forEach(e => done.add(e));
        G.to(t, { opacity: 1, '--in-y': 0, duration: o.dur || 0.95, stagger: o.stagger == null ? 0.09 : o.stagger, ease: 'power3.out', overwrite: 'auto' });
      };
      ST.batch(els, { start: o.start || 'top 90%', interval: 0.08, batchMax: 8, onEnter: play, onEnterBack: play });
    }
    // Headline "wipe": rises through a clip mask (clip is removed afterwards so descenders/italics are never cut).
    function wipe(els, o) {
      o = o || {};
      els = [...els].filter(Boolean); if (!els.length) return;
      G.set(els, { opacity: 0, y: 40, clipPath: 'inset(-16% -8% 118% -8%)' });
      const play = b => {
        const t = b.filter(e => !done.has(e)); if (!t.length) return;
        t.forEach(e => done.add(e));
        G.to(t, { opacity: 1, y: 0, clipPath: 'inset(-16% -8% -16% -8%)', duration: 1.1, stagger: 0.12, ease: 'power3.out', overwrite: 'auto', onComplete: () => G.set(t, { clearProps: 'clipPath' }) });
      };
      ST.batch(els, { start: o.start || 'top 88%', interval: 0.08, batchMax: 4, onEnter: play, onEnterBack: play });
    }
    // Scrubbed depth: element drifts +amt → −amt px as it crosses the viewport.
    function parallax(els, amt, o) {
      o = o || {};
      [...els].forEach(el => {
        el.setAttribute('data-fx', '');
        G.fromTo(el, { '--fx-y': amt }, { '--fx-y': -amt, ease: 'none', scrollTrigger: { trigger: el, start: o.start || 'top bottom', end: o.end || 'bottom top', scrub: o.scrub || 0.8 } });
      });
    }
    return { root, desk: desk.matches, reveal, wipe, parallax };
  }

  /* ── Base scene: applies to the home views and to service pages ── */
  const EXCLUDE = '.why-card,.case,.feature,.quote,.fr,.rv,.contact-form,.hero,.vis,.proc-step,.service-deliverable,.service-sample,.service-video-card,.sw,.growth-orbit,.row';
  function baseScene(h) {
    const root = h.root;

    // Hero: copy lifts and softens as the next section arrives (shader canvas is left untouched).
    const hero = root.querySelector('.hero:not(.service-hero)');
    const heroIn = hero && hero.querySelector('.in');
    if (heroIn) G.to(heroIn, { y: -80, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });

    // Section hairline draws in as each section arrives, and un-draws if you scroll back above it.
    root.querySelectorAll('.content-section').forEach(sec => {
      sec.classList.add('fx-line');
      G.fromTo(sec, { '--sec-p': 0 }, { '--sec-p': 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 92%', end: 'top 50%', scrub: true } });
    });

    // Headlines wipe up; supporting copy staggers in.
    const free = e => !e.closest(EXCLUDE);
    h.wipe([...root.querySelectorAll('.content-section h2,.cta h2')].filter(free));
    h.reveal([...root.querySelectorAll('.content-section .kicker,.content-section .tagline,.content-section p,.content-section .chips,.cta .lab,.cta p,.cta .pill,.service-page-nav')].filter(free), { y: 26 });

    // Cards: stagger by position in their grid. The per-card delay is cleared after the entrance so hover stays instant.
    [['.feature-grid', '.feature'], ['.why-grid', '.why-card'], ['.case-grid', '.case'], ['.quote-grid', '.quote']].forEach(([g, c]) => {
      root.querySelectorAll(g).forEach(grid => [...grid.querySelectorAll(c)].forEach((el, i) => {
        if (el.classList.contains('is-visible')) return;
        el.style.setProperty('--rv-i', i);
        const clear = e => { if (e.propertyName === 'opacity') { el.style.removeProperty('--rv-i'); el.removeEventListener('transitionend', clear); } };
        el.addEventListener('transitionend', clear);
      }));
    });

    // Service directory rows (home › Services view).
    h.reveal(root.querySelectorAll('#service-directory .row'), { y: 22, stagger: 0.06 });
    h.reveal(root.querySelectorAll('.proc-grid .proc-step'), { y: 30, stagger: 0.1 });

    // Depth. Desktop only — on small screens single-column cards would collide.
    h.parallax(root.querySelectorAll('.growth-orbit'), h.desk ? 52 : 26);
    h.parallax(root.querySelectorAll('.vis'), h.desk ? 30 : 14);
    if (h.desk) {
      h.parallax(root.querySelectorAll('.big-copy'), 12);
      h.parallax(root.querySelectorAll('.feature-grid .feature:nth-child(even),.case-grid .case:nth-child(even)'), 14);
    }

    // Footer columns (outside the page views).
    h.reveal(document.querySelectorAll('footer .fg > div'), { y: 22, stagger: 0.1, start: 'top 94%' });
  }

  /* ── Scene registry + build/teardown ── */
  const scenes = [baseScene];
  let ctx = null, timer = 0;

  function build() {
    if (ctx) { ctx.revert(); ctx = null; }
    if (RM) return;
    const root = document.querySelector('.page-view.active') || document;
    ctx = G.context(() => {
      const h = helpers(root);
      scenes.forEach(fn => { try { fn(h); } catch (err) { console.warn('[MGFX] scene failed:', err); } });
    });
    ST.refresh();
  }
  const schedule = () => { clearTimeout(timer); timer = setTimeout(build, 60); };

  function destroy() {
    clearTimeout(timer);
    if (ctx) { ctx.revert(); ctx = null; }
    if (tick) { G.ticker.remove(tick); tick = null; }
    if (lenis) { lenis.destroy(); lenis = null; }
  }

  window.MGFX = {
    // Pages register extra scenes: MGFX.scene(h => {...}); `h` = { root, desk, reveal, wipe, parallax }.
    scene(fn) { scenes.push(fn); },
    build: schedule,
    destroy,
    get lenis() { return lenis; }
  };

  // Build once the page (and any page scripts that register scenes) is ready; rebuild when the home router switches views.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule); else schedule();
  addEventListener('mg:route', schedule);
  desk.addEventListener('change', schedule);
  addEventListener('load', () => ST.refresh());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());
  addEventListener('pagehide', e => { if (!e.persisted) destroy(); });
})();
