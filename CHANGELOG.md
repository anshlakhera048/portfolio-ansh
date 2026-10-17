# Changelog

## v6.0.0 — Neon rise

### New theme: Neon (cyberpunk) — now the default
- Fifth theme: cyan `#00f0ff` + magenta `#ff2bd6` on blue-black; every visit starts here
- Theme order: Neon → Singularity → Ember → Abyss → Bloom
- New hero scene: "the thinking machine" — neural-network core with firing synapse
  pulses, rotating wireframe processor core, gyroscope orbit rings with satellites
- Neon HUD treatment: corner brackets on cards, blueprint grid backdrops,
  `//`-style kickers, holographic title glow

### Hero (all five themes)
- Cinematic dolly-in on load, cursor-reactive particle field, cinematic vignette,
  smooth cross-fade when switching themes
- Per-scene focal polish: photon-ring shimmer (Singularity), expanding ripple rings
  (Abyss), breathing core flare (Ember), background bokeh (Bloom)

### Sections
- Theme-adaptive ambient backdrops + per-theme textures (heat lines / depth glow /
  gravity rings / bloom wash / blueprint grid)
- SkillsBand: dual counter-scrolling skill tickers right after the hero
  (big solid/outlined core stack + reversed mono tools row, hover to pause)
- Rebuilt Terminal section: boot sequence, tab completion, history, 20+ commands,
  theme switching, CRT scanlines, tmux-style status bar
- Glowing numbered section headings (01–05), accent hairline dividers,
  card lift + hover hairlines, gradient experience timeline

### Notes
- The live order-book section remains parked behind the `SHOW_BOOK` flag in `App.jsx`
- `main` deploys to anshlakhera.in via Vercel; `ansh/test` is the experiments branch
