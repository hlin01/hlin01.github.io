// A handful of small, fully client-side easter eggs. Each feature is set up
// independently by its own init*() function so one failing to find its
// elements never blocks the others.
(function () {
  "use strict";

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // A quiet breadcrumb for anyone poking around in devtools. Assigning
  // console to a local first keeps terser's `drop_console` compress option
  // (which only recognizes literal `console.foo(...)` call sites) from
  // stripping this call out of the production build.
  function logBreadcrumb() {
    var c = window.console;
    if (c && typeof c.log === "function") {
      c.log("%cnothing to see here\u2026 except maybe /void/", "color:#8b98ac;font-style:italic;");
    }
  }

  // Konami code (\u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA) triggers a brief Matrix-style rain overlay.
  function initKonamiMatrixRain() {
    var sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var position = 0;

    document.addEventListener("keydown", function (event) {
      if (isTypingTarget(event.target)) return;

      var expected = sequence[position];
      var key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      var matches = key === expected;

      if (matches) {
        position++;
        if (position === sequence.length) {
          position = 0;
          if (!prefersReducedMotion()) triggerMatrixRain();
        }
      } else {
        position = key === sequence[0] ? 1 : 0;
      }
    });
  }

  function triggerMatrixRain() {
    if (document.querySelector(".matrix-rain-overlay")) return;

    var overlay = document.createElement("canvas");
    overlay.className = "matrix-rain-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);

    var ctx = overlay.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      overlay.width = window.innerWidth * dpr;
      overlay.height = window.innerHeight * dpr;
      overlay.style.width = window.innerWidth + "px";
      overlay.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener("resize", size);

    var fontSize = 16;
    var columns = Math.ceil(window.innerWidth / fontSize);
    var drops = new Array(columns).fill(0);
    var glyphs = "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B30123456789";
    var color = getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim() || "#39ff88";

    var duration = 5000;
    var fadeStart = 4200;
    var startTime = performance.now();
    var rafId = null;

    function draw(now) {
      var elapsed = now - startTime;

      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      var alpha = elapsed > fadeStart ? Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart)) : 1;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.font = fontSize + "px monospace";

      for (var i = 0; i < drops.length; i++) {
        var glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(glyph, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.globalAlpha = 1;

      if (elapsed < duration) {
        rafId = requestAnimationFrame(draw);
      } else {
        cleanup();
      }
    }

    function cleanup() {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", size);
      overlay.classList.add("is-fading");
      setTimeout(function () {
        overlay.remove();
      }, 400);
    }

    rafId = requestAnimationFrame(draw);
  }

  // Shift-clicking the theme toggle enters a hidden CRT theme layered on top
  // of the gem's light/dark/system variables. A normal click while active
  // exits back to light/dark.
  function initHiddenCrtTheme() {
    var STORAGE_KEY = "crtTheme";

    function isActive() {
      return document.documentElement.getAttribute("data-crt") === "true";
    }

    function apply(active) {
      if (active) {
        document.documentElement.setAttribute("data-crt", "true");
      } else {
        document.documentElement.removeAttribute("data-crt");
      }
      localStorage.setItem(STORAGE_KEY, String(active));
    }

    if (localStorage.getItem(STORAGE_KEY) === "true") {
      apply(true);
    }

    document.addEventListener("DOMContentLoaded", function () {
      var toggle = document.getElementById("light-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", function (event) {
        if (event.shiftKey) {
          apply(!isActive());
        } else if (isActive()) {
          apply(false);
        }
      });
    });
  }

  // Five quick clicks on the portrait triggers a brief glitch effect.
  function initPortraitGlitch() {
    document.addEventListener("DOMContentLoaded", function () {
      var frame = document.querySelector(".portrait-frame");
      var img = frame && frame.querySelector("img");
      if (!frame || !img) return;

      var clicks = [];
      var threshold = 5;
      var windowMs = 1600;
      var reduceMotion = prefersReducedMotion();

      img.addEventListener("click", function () {
        var now = Date.now();
        clicks = clicks.filter(function (t) {
          return now - t < windowMs;
        });
        clicks.push(now);

        if (clicks.length >= threshold) {
          clicks = [];
          triggerGlitch();
        }
      });

      function triggerGlitch() {
        if (frame.classList.contains("is-glitching") || frame.classList.contains("is-flashing")) return;
        var className = reduceMotion ? "is-flashing" : "is-glitching";
        var duration = reduceMotion ? 220 : 1500;
        frame.classList.add(className);
        setTimeout(function () {
          frame.classList.remove(className);
        }, duration);
      }
    });
  }

  // Typing "agent" anywhere spawns a small glowing marker that follows the
  // cursor; typing it again dismisses it.
  function initCursorPetAgent() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    var word = "agent";
    var buffer = "";
    var pet = null;
    var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var target = { x: pos.x, y: pos.y };
    var rafId = null;

    document.addEventListener("keydown", function (event) {
      if (isTypingTarget(event.target)) return;
      if (event.key.length !== 1) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-word.length);
      if (buffer === word) {
        buffer = "";
        pet ? despawn() : spawn();
      }
    });

    document.addEventListener("pointermove", function (event) {
      target.x = event.clientX;
      target.y = event.clientY;
    });

    function spawn() {
      pet = document.createElement("div");
      pet.className = "cursor-pet";
      pet.setAttribute("aria-hidden", "true");
      pet.textContent = "\u2726";
      document.body.appendChild(pet);
      pos.x = target.x;
      pos.y = target.y;
      animate();
    }

    function despawn() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      if (pet) {
        pet.remove();
        pet = null;
      }
    }

    function animate() {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      if (pet) {
        pet.style.left = pos.x + "px";
        pet.style.top = pos.y + "px";
        rafId = requestAnimationFrame(animate);
      }
    }
  }

  logBreadcrumb();
  initKonamiMatrixRain();
  initHiddenCrtTheme();
  initPortraitGlitch();
  initCursorPetAgent();
})();
