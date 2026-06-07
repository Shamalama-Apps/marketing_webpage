/* Shamalama — shared site behaviour */
(function () {
  // Scroll reveal
  function initReveal() {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // Mobile nav toggle
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Bouncing shape field: gentle drift, grow/shrink pulse, elastic collisions
  function initShapes() {
    var hosts = document.querySelectorAll('[data-shapes]');
    if (!hosts.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    hosts.forEach(function (host) {
      var els = [].slice.call(host.querySelectorAll('.blob'));
      if (!els.length) return;
      var bounds, items = [];

      function measure() {
        var w = host.clientWidth, h = host.clientHeight;
        var pw = Math.min(480, Math.max(300, w * 0.46)); // playground hugs the right side, clear of the headline
        bounds = { x0: w - pw, x1: w, y0: 0, y1: h };
      }
      measure();

      els.forEach(function (el) {
        var size = parseFloat(el.getAttribute('data-size')) || 90;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        var rot = parseFloat(el.getAttribute('data-rot')) || 0;
        var span = Math.max(1, (bounds.x1 - bounds.x0) - size);
        var spanY = Math.max(1, (bounds.y1 - bounds.y0) - size);
        items.push({
          el: el, size: size, base: size, rot: rot,
          x: bounds.x0 + Math.random() * span,
          y: bounds.y0 + Math.random() * spanY,
          vx: (Math.random() * 2 - 1) * 0.32,
          vy: (Math.random() * 2 - 1) * 0.32,
          phase: Math.random() * Math.PI * 2,
          freq: 0.5 + Math.random() * 0.5,
          amp: 0.10 + Math.random() * 0.05
        });
      });

      function place(it, scale) {
        it.el.style.left = it.x + 'px';
        it.el.style.top = it.y + 'px';
        it.el.style.transform = 'rotate(' + it.rot + 'deg) scale(' + scale + ')';
      }

      if (reduce) {
        items.forEach(function (it) { place(it, 1); it.el.classList.add('shown'); });
        return;
      }

      // separate any initial overlaps a little
      items.forEach(function (it) { place(it, 1); it.el.classList.add('shown'); });

      var t0 = performance.now();
      function step(now) {
        var t = (now - t0) / 1000;
        // move + walls
        items.forEach(function (it) {
          it.x += it.vx; it.y += it.vy;
          if (it.x < bounds.x0) { it.x = bounds.x0; it.vx = Math.abs(it.vx); }
          if (it.x + it.size > bounds.x1) { it.x = bounds.x1 - it.size; it.vx = -Math.abs(it.vx); }
          if (it.y < bounds.y0) { it.y = bounds.y0; it.vy = Math.abs(it.vy); }
          if (it.y + it.size > bounds.y1) { it.y = bounds.y1 - it.size; it.vy = -Math.abs(it.vy); }
        });
        // pairwise elastic collisions (circle approximation)
        for (var a = 0; a < items.length; a++) {
          for (var b = a + 1; b < items.length; b++) {
            var A = items[a], B = items[b];
            var ax = A.x + A.size / 2, ay = A.y + A.size / 2;
            var bx = B.x + B.size / 2, by = B.y + B.size / 2;
            var dx = bx - ax, dy = by - ay;
            var dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
            var min = (A.size + B.size) / 2;
            if (dist < min) {
              var nx = dx / dist, ny = dy / dist;
              var overlap = (min - dist) / 2;
              A.x -= nx * overlap; A.y -= ny * overlap;
              B.x += nx * overlap; B.y += ny * overlap;
              var avn = A.vx * nx + A.vy * ny, bvn = B.vx * nx + B.vy * ny;
              var diff = bvn - avn;
              A.vx += diff * nx; A.vy += diff * ny;
              B.vx -= diff * nx; B.vy -= diff * ny;
            }
          }
        }
        // gentle speed clamp + render with pulse
        items.forEach(function (it) {
          var sp = Math.sqrt(it.vx * it.vx + it.vy * it.vy);
          var max = 0.55, lo = 0.16;
          if (sp > max) { it.vx *= max / sp; it.vy *= max / sp; }
          else if (sp < lo && sp > 0) { it.vx *= lo / sp; it.vy *= lo / sp; }
          var scale = 1 + Math.sin(t * it.freq + it.phase) * it.amp;
          place(it, scale);
        });
        raf = requestAnimationFrame(step);
      }
      var raf = requestAnimationFrame(step);

      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(measure, 150);
      });
    });
  }

  function init() { initReveal(); initNav(); initShapes(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
