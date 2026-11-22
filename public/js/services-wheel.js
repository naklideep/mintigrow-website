/* MintiGrow — 3D services wheel (home › #servicesWheel).
 *
 * A giant wheel seen from its side: cards ride the rim, the structure (tyre, ticks, spokes) turns behind them
 * at three depths, and the camera sits at a slight angle so you read real parallax between the layers.
 *
 *  - Order: Website Development → Performance Marketing → AI Videos → the remaining services → repeat.
 *  - Advances every ~3 s (1.9 s dwell + 1.1 s eased turn). The progress line is the timer itself (Web Animations API),
 *    so pausing/resuming never loses or invents time.
 *  - Auto-rotation pauses on: mouse hover (wheel OR panel), keyboard focus, the Pause button, a recent touch/click
 *    selection (6 s), the tab being hidden and the section being off-screen. It resumes automatically.
 *  - Clicking a card SELECTS it. "Explore More" links to services/<slug>.html for the *selected* service; the href is
 *    written in the same call that changes the selection, so panel, card and link can never disagree.
 *  - Reduced motion: no auto-rotation, no animated turn; selection still works.
 *  Service data comes from the `S` array in main.js, so names/descriptions/links can't drift from the rest of the site.
 */
(function () {
  'use strict';
  const host = document.getElementById('servicesWheel');
  if (!host || typeof S === 'undefined' || !S.length) return;

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ORDER = ['website-development', 'performance-marketing', 'ai-videos', 'ai-automation-systems', 'app-development', 'software-development', 'branding', 'influencer-marketing', 'google-ads', 'seo-aeo-geo', 'brand-kit', 'business-development'];
  const slug = s => s.id.replace(/^s-/, '');
  const bySlug = {}; S.forEach(s => { bySlug[slug(s)] = s; });
  const list = ORDER.map(k => bySlug[k]).filter(Boolean).concat(S.filter(s => ORDER.indexOf(slug(s)) < 0)); // any future service still appears
  const N = list.length, STEP = 360 / N;
  const DWELL = 1900, TURN = 1100, HOLD = 6000;
  const mod = (a, n) => ((a % n) + n) % n;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ── Build DOM ── */
  host.setAttribute('role', 'region');
  host.setAttribute('aria-label', 'Our services — rotating wheel');
  host.innerHTML =
    '<div class="sw-panel" id="swPanel">' +
      '<div class="kicker sw-swap"><span id="swNo"></span> / ' + String(N).padStart(2, '0') + '</div>' +
      '<h3 class="sw-title sw-swap" id="swTitle"></h3>' +
      '<p class="sw-desc muted sw-swap" id="swDesc"></p>' +
      '<div class="chips sw-swap" id="swChips"></div>' +
      '<div class="sw-actions"><a class="pill" id="swGo" href="#">Explore More <span class="ar">→</span></a>' +
      '<button class="ghost sw-toggle" id="swToggle" type="button" aria-pressed="false">Pause</button></div>' +
      '<div class="sw-prog" aria-hidden="true"><i id="swBar"></i></div>' +
    '</div>' +
    '<div class="sw-view" id="swView" role="group" aria-label="Services wheel. Use arrow keys to change service.">' +
      '<div class="sw-rig" id="swRig" style="--step:' + STEP + 'deg">' +
        '<div class="sw-disc sw-disc--back"></div>' +
        '<div class="sw-disc sw-disc--mid"><i class="sw-ring r1"></i><i class="sw-ring r2"></i><i class="sw-ring r3"></i>' +
          list.map((_, i) => '<i class="sw-spoke" style="--n:' + i + '"></i>').join('') + '</div>' +
        '<div class="sw-hub" aria-hidden="true">MG<span>✳</span></div>' +
        list.map((s, i) =>
          '<button class="sw-card" type="button" tabindex="-1" data-i="' + i + '" aria-label="' + esc(s.t) + ', service ' + (i + 1) + ' of ' + N + '">' +
            '<span class="sw-no">' + s.n + '</span><span><b class="sw-name">' + esc(s.t) + '</b><span class="sw-blurb">' + esc(s.d) + '</span></span></button>'
        ).join('') +
      '</div>' +
    '</div>';

  const $id = id => document.getElementById(id);
  const panel = $id('swPanel'), view = $id('swView'), rig = $id('swRig'), bar = $id('swBar'), go = $id('swGo'), toggle = $id('swToggle');
  const cards = [...rig.querySelectorAll('.sw-card')];
  if (RM) { toggle.hidden = true; }

  /* ── Geometry (recomputed on resize) ── */
  let geo = { R: 450 };
  function measure() {
    const W = view.clientWidth, mob = W < 560;
    const ch = mob ? 104 : 150;
    const cw = mob ? clamp(W * 0.62, 200, 250) : clamp(W * 0.5, 280, 340);
    const R = Math.round(ch * 2.85);
    const hubX = W * 0.05 + cw / 2 + R;
    geo = { R, hubX };
    rig.style.setProperty('--R', R + 'px');
    rig.style.setProperty('--cw', cw + 'px');
    rig.style.setProperty('--ch', ch + 'px');
    rig.style.left = hubX + 'px';
  }

  /* ── State ── */
  let pos = 0, tpos = 0, idx = 0, raf = 0, prog = null, holdTimer = 0;
  const reasons = new Set(['off']); // pause reasons; autoplay runs only while empty

  function render() {
    rig.style.setProperty('--rot', (pos * STEP).toFixed(3));
    for (let i = 0; i < N; i++) {
      const rel = mod(i - pos + N / 2, N) - N / 2;     // −N/2 … N/2, 0 = focus point
      const ar = Math.abs(rel), a = -rel * STEP * Math.PI / 180;
      const x = -geo.R * Math.cos(a), y = -geo.R * Math.sin(a);
      const f = Math.max(0, 1 - ar), e = f * f * (3 - 2 * f);
      const sc = 0.7 + 0.3 * e;
      const op = ar < 1 ? 1 - 0.38 * ar : ar < 2 ? 0.62 - 0.34 * (ar - 1) : Math.max(0, 0.28 * (1 - (ar - 2) / 1.4));
      const z = 110 * e - 30 * Math.min(ar, 2);
      const c = cards[i];
      c.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,' + z.toFixed(1) + 'px) scale(' + sc.toFixed(3) + ')';
      c.style.opacity = op.toFixed(3);
      c.style.visibility = op < 0.02 ? 'hidden' : 'visible';
    }
  }

  function turnTo(target) {
    cancelAnimationFrame(raf);
    const from = pos, dist = Math.abs(target - from);
    if (RM || dist < 1e-4) { pos = target; render(); return; }
    const dur = TURN * (0.75 + 0.25 * Math.min(dist, 4)), t0 = performance.now();
    (function step(now) {
      const t = Math.min(1, (now - t0) / dur);
      const k = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // ease-in-out cubic: wheel has weight
      pos = from + (target - from) * k;
      render();
      if (t < 1) raf = requestAnimationFrame(step);
    })(t0);
  }

  function paint() {
    const s = list[idx];
    $id('swNo').textContent = s.n;
    $id('swTitle').textContent = s.t;
    $id('swDesc').textContent = s.d;
    $id('swChips').innerHTML = s.b.map(b => '<span>' + esc(b) + '</span>').join('');
    go.setAttribute('href', 'services/' + slug(s) + '.html'); // written together with the selection — never stale
    go.setAttribute('aria-label', 'Explore more: ' + s.t);
    go.dataset.service = slug(s);
    cards.forEach((c, i) => {
      const on = i === idx;
      c.classList.toggle('is-active', on);
      c.tabIndex = on ? 0 : -1;
      if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
    });
    if (!RM) { panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap'); }
  }

  // Select a service by index, rotating the short way round.
  function setIndex(i, instant) {
    i = mod(i, N);
    if (i === idx && !instant) return;
    tpos += mod(i - idx + N / 2, N) - N / 2;
    idx = i;
    paint();
    if (instant) { cancelAnimationFrame(raf); pos = tpos; render(); } else turnTo(tpos);
  }

  /* ── Autoplay: the progress line is the timer ── */
  function startCycle() {
    if (prog) { prog.onfinish = null; prog.cancel(); prog = null; }
    if (RM) return;
    prog = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: DWELL + TURN, easing: 'linear', fill: 'forwards' });
    prog.onfinish = () => { setIndex(idx + 1); startCycle(); };
    if (reasons.size) prog.pause();
  }
  function sync() { if (prog) { if (reasons.size) prog.pause(); else prog.play(); } }
  const hold = on => { if (on) reasons.add(on); sync(); };
  const release = r => { reasons.delete(r); sync(); };

  function choose(i, fromUser) {
    setIndex(i);
    startCycle();
    if (fromUser) { reasons.add('hold'); clearTimeout(holdTimer); holdTimer = setTimeout(() => release('hold'), HOLD); sync(); } // touch has no hover, so give it a calm pause
  }

  /* ── Events ── */
  cards.forEach(c => c.addEventListener('click', () => { const i = +c.dataset.i; if (i !== idx) choose(i, true); }));
  view.addEventListener('keydown', e => {
    const k = e.key, fwd = k === 'ArrowDown' || k === 'ArrowRight', back = k === 'ArrowUp' || k === 'ArrowLeft';
    if (!fwd && !back) return;
    e.preventDefault();
    choose(idx + (fwd ? 1 : -1), true);
    cards[idx].focus({ preventScroll: true });
  });
  host.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' || e.pointerType === 'pen') hold('hover'); });
  host.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' || e.pointerType === 'pen') release('hover'); });
  host.addEventListener('focusin', e => { if (e.target.matches && e.target.matches(':focus-visible')) hold('focus'); });
  host.addEventListener('focusout', e => { if (!host.contains(e.relatedTarget)) release('focus'); });
  toggle.addEventListener('click', () => {
    const paused = reasons.has('user');
    if (paused) release('user'); else hold('user');
    toggle.textContent = paused ? 'Pause' : 'Play';
    toggle.setAttribute('aria-pressed', String(!paused));
  });
  new IntersectionObserver(en => { if (en[0].isIntersecting) release('off'); else hold('off'); }, { threshold: 0.2 }).observe(host);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hold('hidden'); else release('hidden'); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { measure(); render(); }).observe(view); else addEventListener('resize', () => { measure(); render(); });

  /* ── Go ── */
  measure();
  setIndex(0, true);
  startCycle();
})();
