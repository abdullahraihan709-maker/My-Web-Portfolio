// Builds the three project detail pages (public/projects/*.html) and the 404 page.
// Edit the content below, then run:  node scripts/generate.mjs
// No dependencies. The site itself (public/) is plain static files.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const index = readFileSync(join(publicDir, "index.html"), "utf8");
const sprite = index.match(/<svg id="sprite"[\s\S]*?<\/svg>/)?.[0];
if (!sprite) throw new Error("Could not find the icon sprite in public/index.html");

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const projects = [
  {
    slug: "fitlog",
    file: "fitlog.html",
    name: "Fit Log",
    tagline: "Train with intent. Log every set.",
    image: { n: 1, w: 1893, h: 946, alt: "Screenshot of the Fit Log home page: a dark workout library with a lime Browse Workouts button and a muscle-anatomy figure on a gym machine." },
    host: "assignment-5-dev-stack-isrv.vercel.app",
    live: "https://assignment-5-dev-stack-isrv.vercel.app/",
    repo: "https://github.com/abdullahraihan709-maker/FitLog",
    summary: "Fit Log is a dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and watch the week's work add up.",
    overview: [
      "Fit Log helps you find exercises, plan a daily routine, track your workouts, and keep an eye on training volume. It is responsive, and built with Next.js and TypeScript.",
    ],
    features: [
      ["Workout library", "Exercises grouped by major muscle group. Each card shows muscle tags, equipment, estimated duration, calorie burn and a rating."],
      ["Workout pages", "Every workout has its own page with target muscles, equipment, difficulty tiers (beginner, intermediate, advanced), sets and reps guidance, and step-by-step form instructions."],
      ["Today's plan", "Add workouts to a daily routine and mark exercises as done, with visual feedback and toast notifications."],
      ["Save for later", "Bookmark exercises into a Saved collection and switch between it and today's plan."],
      ["Session totals and sorting", "My Plan shows live totals for exercises, minutes and estimated kcal, and workouts can be sorted by duration, calories or rating."],
    ],
    stack: ["Next.js", "TypeScript", "React 19", "Tailwind CSS v4"],
    also: ["DaisyUI 5", "React Context API", "React-Toastify", "React Hot Toast", "Oswald and Geist fonts"],
    challenges: [
      ["One plan, many screens", "The navbar counters, the workout library and the My Plan page all read from the same plan and saved lists. Keeping them in sync meant moving that state into a shared React Context instead of passing props through every page."],
      ["Deciding what runs on the server", "With the App Router, workout pages can render on the server, but the plan, save and done buttons need the browser. Drawing that line cleanly, with server components for content and client components for interaction, took planning."],
      ["Totals that stay correct", "Exercise count, minutes and estimated calories on My Plan have to recalculate whenever a workout is added or removed, so the numbers always match what is on screen."],
      ["Feedback without friction", "Toast notifications confirm each action, such as adding, saving and completing a workout, so the interface answers every tap without interrupting the flow."],
    ],
    next: ["Add a proper authentication system", "Add more workout cards", "Add more functionality"],
  },
  {
    slug: "bookvibe",
    file: "book-vibe.html",
    name: "Book Vibe",
    tagline: "Books to freshen up your bookshelf.",
    image: { n: 2, w: 1891, h: 942, alt: "Screenshot of the Book Vibe home page: a stack of hardcover books beside the headline 'Books to freshen up your bookshelf' and a green View The List button." },
    host: "my-book-vibe-woad.vercel.app",
    live: "https://my-book-vibe-woad.vercel.app/",
    repo: "https://github.com/abdullahraihan709-maker/Book-Vibe",
    summary: "Book Vibe lets you explore curated collections, discover new favorites, and track your reading goals effortlessly.",
    overview: [
      "Popular books appear as cards with their cover, title, author, genre and rating. The navigation leads to the full Books list, a Listed Books section and a Pages to Read section, with Sign In and Sign Up entry points.",
    ],
    features: [
      ["Curated collections", "A featured reading hero and an Explore Popular Books section highlight timeless classics and well-known authors."],
      ["Book cards", "Each book shows its cover, title, author, genre and rating in a consistent card."],
      ["Reading sections", "Books, Listed Books and Pages to Read are one click away from the navbar."],
      ["Account entry points", "Sign In and Sign Up buttons sit in the navbar, ready for a full authentication flow."],
    ],
    stack: ["Next.js", "TypeScript", "React 19", "Tailwind CSS v4"],
    also: ["DaisyUI 5", "Recharts", "React Icons", "React-Toastify"],
    challenges: [
      ["Covers that never match", "Book covers come in different shapes and colours, so a grid of cards needs a fixed frame that keeps every card the same height without stretching or cropping the artwork."],
      ["One set of books, several views", "The Books, Listed Books and Pages to Read sections all describe the same collection, so each book's data has to be structured once and reused everywhere."],
      ["Charts on small screens", "Recharts is part of the stack, and charts need careful sizing to stay readable on a phone as well as on a wide monitor."],
    ],
    next: ["Add a complete authentication system", "Add more book cards", "Enhance the overall UI"],
  },
  {
    slug: "devstack",
    file: "dev-stack.html",
    name: "Dev Stack",
    tagline: "Build your ideal development stack.",
    image: { n: 3, w: 1895, h: 770, alt: "Screenshot of the Dev Stack home page: the headline 'Build Your Ideal Development Stack' beside an isometric illustration of layered, glowing chips." },
    host: "assignment-5-dev-stack-blond.vercel.app",
    live: "https://assignment-5-dev-stack-blond.vercel.app/",
    repo: "https://github.com/abdullahraihan709-maker/DevStack",
    summary: "Dev Stack helps software engineers explore, compare and assemble their preferred technology stack.",
    overview: [
      "It covers frontend, backend, database and DevOps tools. Pick technologies from the library and your custom stack updates in real time, with duplicates blocked and a toast confirming every change.",
    ],
    features: [
      ["Interactive stack builder", "Add or remove tools with real-time state tracking, and get toast notifications for additions, removals and duplicate attempts."],
      ["Badges and metadata", "Tools are labelled by difficulty and rating, with colour-coded badges for quick recognition."],
      ["One-variable theming", "A single CSS gradient variable drives the global theme, so the look stays consistent everywhere."],
      ["Mobile-first layout", "The interface is designed for small screens first and scales up to desktop."],
    ],
    stack: ["Vite", "TypeScript", "React 19", "Tailwind CSS v4"],
    also: ["DaisyUI", "React-Toastify", "Local JSON data with React's use() hook and Suspense"],
    challenges: [
      ["Handling duplicates gracefully", "Adding a technology that is already in your stack shouldn't fail silently or create a copy. The builder blocks the duplicate and explains why with a toast."],
      ["Loading data the React 19 way", "Technology data is read from local JSON with React's use() hook inside a Suspense boundary, which meant rethinking where loading and fallback states live compared with the usual useEffect approach."],
      ["One gradient, whole theme", "The global look is driven by a single CSS gradient variable, so changing one value re-themes buttons, headings and badges consistently."],
    ],
    next: ["Add more content and sections", "Add more functionality"],
  },
];

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Source+Serif+4:opsz,wght@8..60,400..700&display=swap" rel="stylesheet">`;

const favicon = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%232d3a58'/%3E%3Ctext x='32' y='43' font-family='Arial,sans-serif' font-size='30' font-weight='700' text-anchor='middle' fill='white'%3EAR%3C/text%3E%3C/svg%3E">`;

const themeScript = `<script>
    (function () {
      try {
        var t = localStorage.getItem("theme");
        if (!t) t = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        document.documentElement.dataset.theme = t;
      } catch (e) {}
    })();
  </script>`;

const navHtml = `<header class="nav" data-nav>
    <div class="container nav__inner">
      <a class="brand" href="../index.html#home" aria-label="Abdullah Raihan, home">
        <span class="brand__mark" aria-hidden="true">AR</span>
        <span>Abdullah Raihan</span>
      </a>
      <ul class="nav__links" id="site-menu">
        <li><a href="../index.html#about">About</a></li>
        <li><a href="../index.html#skills">Skills</a></li>
        <li><a href="../index.html#projects" aria-current="true">Projects</a></li>
        <li><a href="../index.html#contact">Contact</a></li>
      </ul>
      <div class="nav__actions">
        <a class="btn btn--ghost btn--small nav__resume" href="../Abdullah-Raihan-Resume.pdf" target="_blank" rel="noopener">Resume</a>
        <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Dark theme" aria-pressed="true">
          <svg class="icon icon--sun" aria-hidden="true"><use href="#i-sun"/></svg>
          <svg class="icon icon--moon" aria-hidden="true"><use href="#i-moon"/></svg>
        </button>
        <button class="icon-btn menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-menu" aria-label="Menu">
          <svg class="icon icon--menu" aria-hidden="true"><use href="#i-menu"/></svg>
          <svg class="icon icon--close" aria-hidden="true"><use href="#i-close"/></svg>
        </button>
      </div>
    </div>
  </header>`;

const footerHtml = `<footer class="footer">
    <div class="container footer__inner">
      <p>&copy; <span data-year>2026</span> Abdullah Raihan. Full Stack Developer.</p>
      <ul class="footer__links" aria-label="Social links">
        <li><a href="https://github.com/abdullahraihan709-maker" target="_blank" rel="noopener" aria-label="GitHub"><svg class="icon icon--fill" aria-hidden="true"><use href="#i-github"/></svg></a></li>
        <li><a href="https://www.linkedin.com/in/abdullah-raihan-bd" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="icon icon--fill" aria-hidden="true"><use href="#i-linkedin"/></svg></a></li>
        <li><a href="https://x.com/AbDuLlAhRM07" target="_blank" rel="noopener" aria-label="X (Twitter)"><svg class="icon icon--fill" aria-hidden="true"><use href="#i-x"/></svg></a></li>
        <li><a href="https://www.facebook.com/abdullah.raihan.5055" target="_blank" rel="noopener" aria-label="Facebook"><svg class="icon icon--fill" aria-hidden="true"><use href="#i-facebook"/></svg></a></li>
      </ul>
    </div>
  </footer>`;

const list = (items, cls = "chips") => `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

function projectPage(p, i) {
  const prev = projects[(i + projects.length - 1) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const title = `${p.name} | Abdullah Raihan`;

  return `<!doctype html>
<html lang="en" data-theme="dark" data-accent="${p.slug}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${p.summary} A project by Abdullah Raihan, Full Stack Developer.">
  <meta name="theme-color" content="#12151d">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${p.summary}">
  ${favicon}
  ${themeScript}
  ${fontLink}
  <link rel="stylesheet" href="../assets/styles.css">
</head>
<body>
  ${sprite}

  <a class="skip" href="#main">Skip to content</a>

  ${navHtml}

  <main id="main">
    <section class="phero" data-project="${p.slug}">
      <div class="container">
        <a class="back" href="../index.html#projects"><svg class="icon" aria-hidden="true"><use href="#i-back"/></svg>All projects</a>
        <h1 class="display phero__title">${p.name}</h1>
        <p class="phero__tag">${p.tagline}</p>
        <div class="phero__actions">
          <a class="btn btn--primary" href="${p.live}" target="_blank" rel="noopener">Live site<svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
          <a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener"><svg class="icon icon--fill" aria-hidden="true"><use href="#i-github"/></svg>GitHub repository</a>
        </div>
      </div>
    </section>

    <div class="container pshot">
      <div class="frame">
        <div class="frame__bar"><i></i><i></i><i></i><span class="frame__url">${p.host}</span></div>
        <picture>
          <source srcset="../Project-${p.image.n}-image.webp" type="image/webp">
          <img src="../Project-${p.image.n}-image.png" width="${p.image.w}" height="${p.image.h}" alt="${p.image.alt}" fetchpriority="high">
        </picture>
      </div>
    </div>

    <div class="container pgrid">
      <article>
        <section class="psection prose">
          <h2>Overview</h2>
          <p>${p.summary}</p>
          ${p.overview.map((t) => `<p>${t}</p>`).join("\n          ")}
        </section>

        <section class="psection">
          <h2>What it does</h2>
          <ul class="flist">
            ${p.features.map(([t, d]) => `<li><strong>${t}.</strong> ${d}</li>`).join("\n            ")}
          </ul>
        </section>

        <section class="psection">
          <h2>Challenges along the way</h2>
          <ul class="challenges">
            ${p.challenges.map(([t, d]) => `<li class="challenge"><h3>${t}</h3><p>${d}</p></li>`).join("\n            ")}
          </ul>
        </section>

        <section class="psection">
          <h2>What's next</h2>
          <ul class="flist">
            ${p.next.map((t) => `<li>${t}.</li>`).join("\n            ")}
          </ul>
        </section>
      </article>

      <aside class="aside" aria-label="Project facts">
        <div>
          <h2>Main stack</h2>
          ${list(p.stack)}
        </div>
        <div>
          <h2>Also used</h2>
          ${list(p.also)}
        </div>
        <div class="aside__links">
          <a class="btn btn--primary" href="${p.live}" target="_blank" rel="noopener">Open live site<svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
          <a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener"><svg class="icon icon--fill" aria-hidden="true"><use href="#i-github"/></svg>View the code</a>
        </div>
      </aside>
    </div>

    <nav class="container pnav" aria-label="Other projects">
      <a href="${prev.file}" data-project="${prev.slug}"><small>Previous project</small><strong>${prev.name}</strong></a>
      <a href="${next.file}" data-project="${next.slug}"><small>Next project</small><strong>${next.name}</strong></a>
    </nav>
  </main>

  ${footerHtml}

  <script src="../assets/main.js" defer></script>
</body>
</html>
`;
}

function notFoundPage() {
  return `<!doctype html>
<html lang="en" data-theme="dark" data-accent="neutral">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found | Abdullah Raihan</title>
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#12151d">
  ${favicon}
  ${themeScript}
  ${fontLink}
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  <main class="container lost">
    <h1 class="display" style="font-size:clamp(3.5rem,1rem + 10vw,8rem)">Page not found</h1>
    <p class="lede">That link doesn't lead anywhere. The portfolio's home page has everything.</p>
    <p><a class="btn btn--primary" href="/">Go to the home page</a></p>
  </main>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* Write                                                               */
/* ------------------------------------------------------------------ */

mkdirSync(join(publicDir, "projects"), { recursive: true });
projects.forEach((p, i) => writeFileSync(join(publicDir, "projects", p.file), projectPage(p, i)));
writeFileSync(join(publicDir, "404.html"), notFoundPage());
console.log("Wrote", projects.map((p) => `projects/${p.file}`).join(", "), "and 404.html");
