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

  /* =======================================================
     INTERNATIONALISATION (FR default / AR / EN)
     ======================================================= */
  var I18N = window.MH_I18N || {};
  var STORE_KEY = "mh-lang";
  var SUPPORTED = ["fr", "ar", "en"];
  var RTL = { ar: true };

  // Capture the original French strings straight from the DOM so
  // switching back to FR restores them exactly (no FR dictionary needed).
  var frText = {};
  var frHtml = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in frText)) frText[k] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-html");
    if (!(k in frHtml)) frHtml[k] = el.innerHTML;
  });

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "fr";
    var dict = lang === "fr" ? null : I18N[lang] || {};

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var val = lang === "fr" ? frText[k] : dict[k];
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      var val = lang === "fr" ? frHtml[k] : dict[k];
      if (val != null) el.innerHTML = val;
    });

    // Document direction & language
    root.setAttribute("lang", lang);
    root.setAttribute("dir", RTL[lang] ? "rtl" : "ltr");
    root.classList.toggle("mh-rtl", !!RTL[lang]);

    // Switcher label + checked state
    var cur = document.getElementById("mh-lang-cur");
    if (cur) cur.textContent = lang.toUpperCase();
    document.querySelectorAll("#mh-lang-menu [data-lang]").forEach(function (b) {
      b.setAttribute("aria-checked", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  function setLang(lang) { applyLang(lang); }

  /* ---- Language switcher dropdown ---- */
  var langWrap = document.getElementById("mh-lang");
  var langBtn = document.getElementById("mh-lang-btn");
  var langMenu = document.getElementById("mh-lang-menu");

  function openLangMenu() {
    if (!langMenu) return;
    langMenu.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
    langWrap.classList.add("is-open");
  }
  function closeLangMenu() {
    if (!langMenu) return;
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
    langWrap.classList.remove("is-open");
  }
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (langMenu.hidden) openLangMenu(); else closeLangMenu();
    });
    langMenu.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        setLang(b.getAttribute("data-lang"));
        closeLangMenu();
      });
    });
    document.addEventListener("click", function (e) {
      if (langWrap && !langWrap.contains(e.target)) closeLangMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  /* ---- First-visit language modal ---- */
  var modal = document.getElementById("mh-langmodal");

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    // force reflow then add class for the transition
    void modal.offsetWidth;
    modal.classList.add("is-open");
    document.body.classList.add("mh-noscroll");
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("mh-noscroll");
    var onEnd = function () { modal.hidden = true; modal.removeEventListener("transitionend", onEnd); };
    if (reduceMotion) { modal.hidden = true; }
    else modal.addEventListener("transitionend", onEnd);
  }

  if (modal) {
    modal.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        setLang(b.getAttribute("data-lang"));
        closeModal();
      });
    });
    modal.querySelectorAll("[data-lm-close]").forEach(function (el) {
      // clicking the backdrop keeps French (the default) and closes
      el.addEventListener("click", function () { setLang("fr"); closeModal(); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) { setLang("fr"); closeModal(); }
    });
  }

  /* ---- Boot the language state ---- */
  var saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
  if (saved && SUPPORTED.indexOf(saved) !== -1) {
    applyLang(saved);            // returning visitor: honour their choice
  } else {
    applyLang("fr");             // default view
    openModal();                 // first visit: let them choose
  }
})();
