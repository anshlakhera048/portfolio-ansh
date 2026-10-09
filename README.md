# Ansh Lakhera — Portfolio

Personal portfolio of Ansh Lakhera, software engineer. Built with React, Vite, Tailwind CSS and Three.js.

**Live:** https://anshlakhera.in

## Features

- **4-theme switcher** — Ember (supernova), Abyss (deep ocean), Singularity (black hole), Bloom (sakura). Each theme has its own color palette and 3D hero scene, switchable from the navbar (desktop + mobile), persisted across visits.
- **3D hero scenes** — lazy-loaded React Three Fiber scenes per theme: black hole with accretion disk and asteroids, bioluminescent deep-sea orb with marine snow and bubbles, supernova core with shockwave rings and ember burst, breathing sakura blossom with falling petals. Mouse-parallax camera, mobile-aware framing.
- **Animated hero** — per-character headline reveal, rotating "I build …" line, count-up metric chips, magnetic CTAs, availability pill, scroll parallax.
- **Projects** — newest-first with visible dates, flagship Kairos card, GitHub source links.
- **Open source** — merged PRs and filed issues.
- **Experience** — timeline plus competitive-programming stats.
- **Interactive terminal** — operator console with real commands (`help`, `projects`, `contact`, …).
- **Contact** — working email form (EmailJS) with validation and status feedback, social logo links.
- **Custom cursor** — theme-aware dot + trailing ring that expands over interactive elements (desktop only).
- **Motion details** — scroll progress bar, scroll-velocity tech marquee, reveal-on-scroll, film grain, animated scroll cue.
- **Accessibility & performance** — reduced-motion support, lazy-loaded 3D (never blocks first paint), code-split vendor chunks.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Contact form needs `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` set in the environment.
