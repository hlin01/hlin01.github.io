// Ambient neural-network particle field behind the hero section. Drifting
// nodes connect with thin lines when nearby and drift gently toward the
// cursor, all colored from the live theme variables so it matches light,
// dark, and the hidden CRT theme without any special-casing here.
(function () {
  "use strict";

  function init() {
    var hero = document.querySelector(".hero");
    var canvas = hero && hero.querySelector(".hero-canvas");
    if (!hero || !canvas) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var width = 0;
    var height = 0;
    var nodes = [];
    var nodeCount = 46;
    var maxLinkDist = 130;
    var pointer = { x: 0, y: 0, active: false };
    var isVisible = true;
    var rafId = null;
    var colors = { node: "#2563eb", line: "#94a3b8" };

    function readColors() {
      var styles = getComputedStyle(document.documentElement);
      colors.node = styles.getPropertyValue("--global-theme-color").trim() || colors.node;
      colors.line = styles.getPropertyValue("--global-text-color-light").trim() || colors.line;
    }

    function seedNodes() {
      nodes = [];
      for (var i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
    }

    function resize() {
      var rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
      if (reduceMotion) drawFrame();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];

        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (pointer.active) {
            var dx = n.x - pointer.x;
            var dy = n.y - pointer.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90 && dist > 0.01) {
              var force = ((90 - dist) / 90) * 0.03;
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }

          var speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          var maxSpeed = 0.6;
          if (speed > maxSpeed) {
            n.vx = (n.vx / speed) * maxSpeed;
            n.vy = (n.vy / speed) * maxSpeed;
          }

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
      }

      ctx.fillStyle = colors.node;
      for (i = 0; i < nodes.length; i++) {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var ddx = nodes[i].x - nodes[j].x;
          var ddy = nodes[i].y - nodes[j].y;
          var d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < maxLinkDist) {
            ctx.globalAlpha = (1 - d / maxLinkDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      drawFrame();
      if (isVisible && !reduceMotion) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }

    function start() {
      if (rafId || reduceMotion) return;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    readColors();
    resize();
    start();

    window.addEventListener("resize", resize);

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(hero);
    }

    hero.addEventListener("pointermove", function (e) {
      var rect = hero.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });
    hero.addEventListener("pointerleave", function () {
      pointer.active = false;
    });

    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          start();
        } else {
          stop();
        }
      }).observe(hero);
    }

    new MutationObserver(function () {
      readColors();
      if (reduceMotion) drawFrame();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-crt"],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
