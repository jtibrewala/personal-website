  (function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Theme toggle (light default; choice persisted in localStorage) ---- */
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      var root = document.documentElement;
      var syncBtn = function () {
        var dark = root.getAttribute('data-theme') === 'dark';
        themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
        themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      };
      themeBtn.addEventListener('click', function () {
        var dark = root.getAttribute('data-theme') === 'dark';
        if (dark) { root.removeAttribute('data-theme'); } else { root.setAttribute('data-theme', 'dark'); }
        try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
        syncBtn();
      });
      syncBtn();
    }

    /* ---- Scroll reveal via IntersectionObserver ---- */
    var revealEls = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ---- Hero typing effect ---- */
    var typeTarget = document.getElementById('typeTarget');
    if (typeTarget) {
      var phrases = [
        'Building AI-native wealthtech.',
        'Shipping agentic workflows.',
        'Turning 25 years into leverage.',
        'Product × Technology × AI.'
      ];
      if (reduce) {
        typeTarget.textContent = phrases[0];
      } else {
        var pi = 0, ci = 0, deleting = false;
        function tick() {
          var phrase = phrases[pi];
          if (!deleting) {
            ci++;
            typeTarget.textContent = phrase.slice(0, ci);
            if (ci === phrase.length) { deleting = true; return setTimeout(tick, 1900); }
          } else {
            ci--;
            typeTarget.textContent = phrase.slice(0, ci);
            if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
          }
          setTimeout(tick, deleting ? 40 : 70);
        }
        setTimeout(tick, 600);
      }
    }

    /* ---- Counting stats ---- */
    var counters = document.querySelectorAll('[data-count]');
    function animateCount(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduce) { el.textContent = prefix + target + suffix; return; }
      var start = null, dur = 1400;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (counters.length) {
      if (reduce || !('IntersectionObserver' in window)) {
        counters.forEach(animateCount);
      } else {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
          });
        }, { threshold: 0.6 });
        counters.forEach(function (el) { cio.observe(el); });
      }
    }

    /* ---- Floating skill tags: randomize drift/duration ---- */
    if (!reduce) {
      document.querySelectorAll('.skill-float').forEach(function (el, i) {
        var dur = (6 + (i % 5)).toFixed(1) + 's';
        var delay = ((i % 7) * 0.35).toFixed(2) + 's';
        var dx = ((i % 3) - 1) * 10 + 'px';
        var dy = (-6 - (i % 4) * 4) + 'px';
        el.style.setProperty('--dur', dur);
        el.style.setProperty('--delay', delay);
        el.style.setProperty('--dx', dx);
        el.style.setProperty('--dy', dy);
      });
    }

    /* ---- Scroll progress bar + back-to-top ---- */
    var progress = document.getElementById('scrollProgress');
    var toTop = document.getElementById('toTop');
    function onScroll() {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (scrolled / max) * 100 : 0;
      if (progress) progress.style.width = pct + '%';
      if (toTop) toTop.classList.toggle('is-visible', scrolled > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      });
    }
  })();
