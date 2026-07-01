/* ============================================================
   Aarthi — Portfolio interactions. Vanilla JS, no deps.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Theme ---- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function vh() { return window.innerHeight || document.documentElement.clientHeight; }
  function inView(el) {
    var r = el.getBoundingClientRect();
    return r.top < vh() * 0.92 && r.bottom > 0;
  }
  function reveal(el) { el.classList.add('is-in'); }
  // Reveal anything currently in view; leave below-fold elements hidden so they
  // animate in as the user scrolls to them (this preserves the scroll effect).
  function revealInView() {
    for (var k = reveals.length - 1; k >= 0; k--) {
      if (reveals[k].classList.contains('is-in') || inView(reveals[k])) {
        reveal(reveals[k]);
        reveals.splice(k, 1);
      }
    }
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
  // Manual fallback (covers browsers without IntersectionObserver and any element the
  // observer misses): reveal in-view items on load, scroll and resize.
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView);
  window.addEventListener('load', revealInView);
  revealInView();

  /* ---- Testimonials carousel ---- */
  var track = document.getElementById('tTrack');
  if (track) {
    var items = track.children;
    var total = items.length;
    var i = 0;
    var numEl = document.getElementById('tNum');
    var totalEl = document.getElementById('tTotal');
    var dotsEl = document.getElementById('tDots');
    if (totalEl) totalEl.textContent = pad(total);

    // build dots
    var dots = [];
    if (dotsEl) {
      for (var d = 0; d < total; d++) {
        var b = document.createElement('button');
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Testimonial ' + (d + 1));
        (function (idx) { b.addEventListener('click', function () { go(idx); }); })(d);
        dotsEl.appendChild(b);
        dots.push(b);
      }
    }

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function go(n) {
      i = (n + total) % total;
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      if (numEl) numEl.textContent = pad(i + 1);
      dots.forEach(function (dot, idx) { dot.setAttribute('aria-selected', idx === i ? 'true' : 'false'); });
    }

    var prev = document.getElementById('tPrev');
    var next = document.getElementById('tNext');
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });

    go(0);
  }

  /* ---- Year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
