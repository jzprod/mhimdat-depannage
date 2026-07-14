/* =========================================================
   MHIMDAT Service Dépannage — progressive enhancement only.
   Everything works with JS off; this only adds polish.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* ---- Current year ---- */
  var yearEl = document.getElementById("mh-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveals ---- */
  var animatables = Array.prototype.slice.call(document.querySelectorAll("[data-mh-anim]"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Fallback: just show everything.
    animatables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    animatables.forEach(function (el) { io.observe(el); });
  }

  /* ---- Header shadow on scroll + sticky mobile bar ---- */
  var header = document.getElementById("mh-header");
  var sticky = document.getElementById("mh-sticky");
  var lastY = 0;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-stuck", y > 8);
    if (sticky) {
      var show = y > 560;
      sticky.classList.toggle("is-visible", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
    }
    lastY = y;
  }
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { onScroll(); ticking = false; });
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("mh-burger");
  var mobileNav = document.getElementById("mh-mobile-nav");

  function closeMenu() {
    if (!burger || !mobileNav) return;
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    mobileNav.hidden = true;
    mobileNav.style.display = "";
  }

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var open = burger.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      if (open) {
        mobileNav.hidden = false;
        mobileNav.style.display = "flex";
      } else {
        closeMenu();
      }
    });
    // Close after tapping any link
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }
})();
