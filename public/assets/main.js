/* Abdullah Raihan — portfolio behaviour. No dependencies. */
(() => {
  "use strict";

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ---------- Theme ---------- */
  const themeBtn = $("[data-theme-toggle]");
  const themeMeta = $('meta[name="theme-color"]');

  function paintTheme(theme) {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.content = theme === "dark" ? "#12151d" : "#eef0f4";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(theme === "dark"));
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Dark theme" : "Light theme");
    }
  }
  paintTheme(root.dataset.theme === "light" ? "light" : "dark");

  themeBtn?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    paintTheme(next);
    try { localStorage.setItem("theme", next); } catch (_) { /* storage can be blocked */ }
  });

  /* ---------- Mobile menu ---------- */
  const nav = $("[data-nav]");
  const menuBtn = $("[data-menu-toggle]");

  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.toggleAttribute("data-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Menu");
  }
  menuBtn?.addEventListener("click", () => setMenu(!nav.hasAttribute("data-open")));
  $$(".nav__links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.hasAttribute("data-open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav?.hasAttribute("data-open") && !nav.contains(e.target)) setMenu(false);
  });
  matchMedia("(min-width: 821px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------- Active nav link + page accent ---------- */
  let zoneEl = null;
  function applyAccent() {
    const accent = zoneEl?.dataset.accentZone;
    if (accent) root.dataset.accent = accent;
  }

  const zones = $$("[data-accent-zone]");
  if (zones.length && "IntersectionObserver" in window) {
    const zoneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          zoneEl = entry.target;
          applyAccent();
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    zones.forEach((z) => zoneObserver.observe(z));
  }

  const navSections = $$("[data-nav-section]");
  const navLinks = $$(".nav__links a");
  if (navSections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    navSections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Project screenshots: gentle tilt following the pointer ---------- */
  if (!reduceMotion && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$("[data-tilt]").forEach((el) => {
      const frame = $(".frame", el);
      if (!frame) return;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
        frame.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
      });
      el.addEventListener("pointerleave", () => {
        frame.style.removeProperty("--rx");
        frame.style.removeProperty("--ry");
      });
    });
  }

  /* ---------- Copy buttons ---------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_e) { ok = false; }
      ta.remove();
      return ok;
    }
  }

  $$("[data-copy]").forEach((btn) => {
    const label = $("[data-copy-label]", btn);
    btn.addEventListener("click", async () => {
      const ok = await copyText(btn.dataset.copy);
      if (label) label.textContent = ok ? "Copied" : "Copy failed";
      btn.toggleAttribute("data-done", ok);
      setTimeout(() => {
        if (label) label.textContent = "Copy";
        btn.removeAttribute("data-done");
      }, 1800);
    });
  });

  /* ---------- Contact form -> opens the visitor's email app ---------- */
  const form = $("[data-contact-form]");
  if (form) {
    const status = $("[data-form-status]", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in your name, email and message.";
        (!name ? form.elements.name : !email ? form.elements.email : form.elements.message).focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "That email address doesn't look right. Check it and try again.";
        form.elements.email.focus();
        return;
      }

      const subject = encodeURIComponent("Portfolio message from " + name);
      const body = encodeURIComponent(message + "\n\n" + name + "\n" + email);
      status.textContent = "Opening your email app. If nothing happens, email abdullahraihan709@gmail.com directly.";
      window.location.href = "mailto:abdullahraihan709@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* ---------- Back to top + footer year ---------- */
  const toTop = $("[data-totop]");
  if (toTop) {
    const toggle = () => { toTop.hidden = window.scrollY < 900; };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  const year = $("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
