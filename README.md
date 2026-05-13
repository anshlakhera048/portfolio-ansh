<div align="center">

**The digital nervous system of a distributed systems engineer.**

[![Live](https://img.shields.io/badge/LIVE-anshlakhera.in-61c2a2?style=flat-square&labelColor=0d1117)](https://anshlakhera.in)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat-square&labelColor=0d1117&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r173-white?style=flat-square&labelColor=0d1117&logo=threedotjs)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff?style=flat-square&labelColor=0d1117&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-MIT-8be9c7?style=flat-square&labelColor=0d1117)](LICENSE)

</div>

---

## Vision

This is not a portfolio website.

It is a **computational ecosystem** — an interactive systems experience engineered to the same standard as production infrastructure. Every layer is intentional: the 3D scene behaves like a live topology graph, the terminal executes real infrastructure commands, the UI surfaces breathe with ambient telemetry, and the motion system feels like distributed systems synchronizing.

The design philosophy: **stop building "pretty." Build: atmosphere.**

> Someone visiting should feel overwhelmed, curious, technically intimidated, emotionally immersed, and unable to stop exploring.

---

## Experience Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ATMOSPHERIC LAYER                                                       │
│  SystemHUD  ·  LiveCodeSurface  ·  CursorLight  ·  TelemetryTicker      │
├─────────────────────────────────────────────────────────────────────────┤
│  3D SIMULATION LAYER                                                     │
│  InfraGalaxy  ·  CinematicCamera  ·  InstancedParticles  ·  PostFX      │
├─────────────────────────────────────────────────────────────────────────┤
│  MOTION LAYER                                                            │
│  CinematicSection  ·  SignalPulse  ·  InfrastructureAwaken  ·  Spring   │
├─────────────────────────────────────────────────────────────────────────┤
│  CONTENT LAYER                                                           │
│  Hero  ·  About (DNA Graph)  ·  Projects  ·  Terminal  ·  Contact       │
├─────────────────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER                                                    │
│  React 19  ·  Vite 6  ·  Tailwind CSS 4  ·  CSS Custom Properties      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Core Runtime

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.0.0 |
| Build System | Vite | 6.1.0 |
| Language | JavaScript (ESM) | ES2022+ |
| Styling | Tailwind CSS | 4.0.7 |
| Animation | Motion (Framer Motion v12) | 12.4.5 |

### 3D & WebGL Pipeline

| System | Technology | Version |
|---|---|---|
| 3D Renderer | Three.js | r173 |
| React Bindings | React Three Fiber | 9.0.4 |
| Helpers & Abstractions | @react-three/drei | 10.x |
| Post-Processing | @react-three/postprocessing | 3.0.4 |
| Globe Simulation | Cobe | 0.6.3 |

### Infrastructure Services

| Service | Technology |
|---|---|
| Contact Form | EmailJS 4.4.1 |
| CSS Utilities | tailwind-merge 3.0.1 |
| Deployment | anshlakhera.in |

---

## System Components

### `SystemHUD` — Persistent Engineering Atmosphere
A non-blocking UI overlay rendered at `z-50` across all sections. Displays:
- Live system clock with millisecond precision (47ms update interval)
- Streaming telemetry event log cycling 20 infrastructure events
- Active process list rotating through 10 daemon descriptors
- Infrastructure status indicators (Kafka, PG, Redis, gRPC, Prometheus)

### `InfraGalaxy` — WebGL Infrastructure Topology
The centerpiece 3D scene built with React Three Fiber:
- **Instanced rendering** — thousands of particles rendered in a single draw call
- **CinematicCamera** — smooth pointer-following with lerp factor 0.02
- **Tier-based quality** — auto-detects GPU capability, scales complexity
- **Mobile adaptation** — separate portrait camera `[0, 0.8, 5.5]`, dpr `[1,1]`, no postprocessing
- **Post-processing** — Bloom + Vignette (high tier), Bloom only (mid tier)
- **Procedural node graph** — interconnected infrastructure nodes with animated edges

### `HeroText` — Kernel Boot Sequence
The hero identity reveal:
- Phase 1: Kernel-style boot terminal showing 9 service initialization lines (`[  OK  ]` format)
- Phase 2: Name reveal with `text-heading-giant` + gradient, cycling role display with blur transitions
- Engineering stack one-liner in monospace
- `SystemHeartbeat` component with live uptime counter, pod health, throughput, and latency

### `LiveCodeSurface` — Ambient Code Streams
Fixed-position streaming code panels on page edges (visible `xl:+`):
- 5 Java infrastructure code blocks: Saga orchestration, Kafka consumer, CQRS projection, Redis cache-aside, gRPC interceptor
- Streams line-by-line at configurable speed
- `opacity: 0.15` dark / `0.3` light — visible but non-distracting

### `About` — Engineering Intelligence Chamber
A complete replacement for the traditional "About Me" section:

**Engineering DNA Visualization** — An SVG-based neural topology graph with 8 interconnected specialization nodes (DIST, STREAM, EVENT, LOWLAT, AI, OBS, CONCUR, PLATFORM), pulsing edge animations cycling through connections at 1.2s intervals, and hover-activated labels.

**Systems Expertise Matrix** — 16 capability cells rendered with signal-strength bar indicators (like RF signal bars), color-coded by engineering category (concurrency, architecture, streaming, infrastructure, systems, observability, resilience).

**Architecture Evolution Timeline** — A branching tree timeline showing 4 phases of engineering growth (Foundation → Event-Driven → Distributed → Intelligence) with glowing branch nodes and system tags.

**Live Process Indicators** — Cycling daemon display showing active infrastructure processes.

**Environment Metadata** — Live subsystem ID, thread hex, uptime counter, heap stats, GC type.

### `TerminalSection` — Infrastructure Debugging Console
A full split-pane terminal interface:
- **Left pane**: Interactive command shell with 15+ engineering commands
  - `inspect topology`, `trace pipeline`, `benchmark`, `monitor streams`
  - `inspect cache`, `explain saga`, `explain cqrs`, `neofetch`
  - Tab autocomplete, command history
- **Right pane** (`DiagnosticsPanel`): Live side panel with:
  - 6-metric runtime monitor (CPU, heap, threads, GC pause, conn pool, Kafka lag) — updates every 2s
  - Streaming log output with INFO/DEBUG/WARN severity coloring — new event every 1.8s
  - Active service badge indicators

### `CursorLight` — Ambient Cursor Glow
Full-page radial gradient following the cursor with zero re-renders — uses a subscription pattern (`useRef` + listener Set) to apply transform via direct DOM mutation, bypassing React reconciliation entirely.

### `SubsystemLabel` — Environmental Storytelling
Section metadata overlays displaying module name, thread, heap size, GC type, and engineering notes at section boundaries.

### `ComputationalMotion` — Micro-Interaction System
- `SignalPulse` — animated data packet traveling along infrastructure wiring between sections
- `TelemetryTicker` — ambient scrolling metric display at content boundaries
- `NetworkActivity` — floating packet animations for section backgrounds
- `InfrastructureAwaken` — viewport-triggered scan-line sweep reveal

---

## Motion Architecture

### Philosophy
Motion should feel like **systems synchronizing** — not UI animating.

### Layers
```
1. Page Transitions      — PageTransition component (opacity + scale)
2. Section Reveals       — CinematicSection (scroll-linked depth, parallax)
3. Viewport Triggers     — whileInView with once:true, stagger children
4. Physics Springs       — Spring stiffness 380, damping 30 for nav pill
5. Signal Propagation    — SignalPulse (CSS keyframe, 3.5s ease-in-out)
6. Atmospheric Loops     — SystemHUD, LiveCodeSurface, TelemetryTicker
7. Micro-interactions    — hover states, blur transitions, scale pulses
```

### Key Animation Primitives
- `CinematicSection` — scroll-progress-linked `scale`, `opacity`, `translateY`
- `FloatingElement` — parallax bob using `useParallax(ref, speed)`
- `useGlobalScrollProgress` — normalized 0–1 scroll position
- `SectionDivider` — scanning glow animation (`divider-glow`, 4s loop)
- `SignalPulse` — CSS-animated dot traveling a wire (`signal-travel`, 3.5s)

---

## Performance Engineering

### Bundle Splitting
```js
// vite.config.js — manual chunks
manualChunks: {
  "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
  "vendor":       ["react", "react-dom", "motion"],
}
```
Three.js (~733kB) is isolated into its own chunk, ensuring the main app hydrates immediately while the 3D scene loads asynchronously.

### Rendering Optimizations
- All display components wrapped in `React.memo()`
- `CursorLight` uses direct DOM mutation — zero re-renders on mousemove
- `SystemHUD` telemetry uses `AnimatePresence` with controlled interval timing
- R3F Canvas `dpr={[1, 1.5]}` desktop, `dpr={[1, 1]}` mobile
- `performance={{ min: 0.5 }}` on desktop Canvas — R3F auto-scales pixel ratio under load
- `powerPreference: "high-performance"` on WebGL context
- Postprocessing effects gated by tier detection: high → Bloom+Vignette, mid → Bloom only, low → none
- All 3D scenes use `<Suspense fallback={<Loader />}>` with lazy imports

### Mobile-Specific
- Dedicated mobile Canvas with portrait camera composition `[0, 0.8, 5.5]` fov 50
- Gradient overlay ensures text readability over 3D scene
- `mobile` prop to `InfraGalaxy` forces low tier: 8 nodes, no instanced particles, no second light, reduced bloom
- `antialias: false` on mobile GL context
- All heavy components (`LiveCodeSurface`, `DiagnosticsPanel`) hidden below breakpoints

---

## Theme System

CSS Custom Properties architecture — zero JavaScript for theme switching.

```css
/* Dark (default) */
:root {
  --bg-base:         #0d1117;
  --bg-surface:      #161b22;
  --txt-primary:     #e6edf3;
  --txt-secondary:   #8b949e;
  --accent-primary:  #61c2a2;
  --accent-secondary:#4a9eff;
  --border-primary:  rgba(97,194,162,0.3);
}

/* Light */
html.light {
  --bg-base:         #f7f8fa;
  --bg-surface:      #ffffff;
  --txt-primary:     #0f172a;
  --accent-primary:  #2d8a6e;
}
```

`ThemeContext` provides `{ theme, toggleTheme }` globally. All components read from CSS variables — no prop drilling, no theme re-renders.

---

## Navbar — IntersectionObserver Tracking

The navbar uses `IntersectionObserver` with 11 granular thresholds (0.0–1.0) instead of a scroll listener + manual `offsetTop` calculation. This correctly handles tall sections, sticky headers, and layout shifts.

**Active state determination**: the section with the highest `intersectionRatio` wins.

**Animated pill**: A `motion.div` with Spring physics (`stiffness: 380, damping: 30`) slides under the active nav item — position calculated via `getBoundingClientRect` delta between nav container and active item.

---

## Featured Projects

### AxiomX — Ultra-Low Latency Exchange Engine
> 480K+ ops/sec · sub-microsecond p50 · lock-free · deterministic

Built a production-grade deterministic exchange engine using LMAX Disruptor ring-buffer architecture. Price-time priority order book with O(log N) matching and O(1) cancellation. Zero-allocation hot paths using Agrona buffers, object pooling, and fastutil primitive collections. Full FIX gateway integration, event sourcing, snapshotting, and deterministic replay.

**Stack**: Java · LMAX Disruptor · Chronicle Queue · FIX Protocol · Docker · Linux

[GitHub →](https://github.com/anshlakhera048/AxiomX)

---

### QuantStream — Real-Time Quantitative Market Data Pipeline
> Kafka → Flink · exactly-once semantics · dual-layer feature store · replayable backtesting

Event-time streaming pipeline computing SMA, VWAP, volatility, and rolling indicators using sliding windows and watermark-based processing. RocksDB state backend with checkpointing. Dual-layer feature store: Redis (low-latency serving) + ClickHouse (analytics). Avro serialization with Schema Registry and backward-compatible evolution.

**Stack**: Kafka · Apache Flink · Spring Boot · Redis · ClickHouse · Kubernetes · Docker

[GitHub →](https://github.com/anshlakhera048/QuantStream)

---

### Distributed Payments Infrastructure
> Saga orchestration · real-time fraud detection · exactly-once Kafka · ACID ledger

High-throughput payments platform with event-driven asynchronous pipelines. Strongly consistent double-entry ledger with optimistic locking. Idempotent APIs using Redis deduplication + DB constraints. ML-based fraud detection via Python FastAPI integrated through event streaming. Transactional outbox, circuit breakers, DLQs, and Prometheus/Grafana observability.

**Stack**: Java · Spring Boot · Kafka · PostgreSQL · Redis · Python · FastAPI · Prometheus · Grafana

[GitHub →](https://github.com/anshlakhera048/Distributed-Payment-Infrastructure)

---

### AgentHub — Multi-Agent AI Orchestration Platform
> DAG workflows · RAG · tool execution · local LLM inference · streaming SSE

Modular AI agent system with pluggable agents (prompt optimization, planning, code review, RAG, tool execution). Central orchestrator supporting DAG-based workflows with `CompletableFuture` parallel execution. RAG using ChromaDB vector embeddings. Secure tool-calling framework with sandboxed code execution. Ollama local LLM inference with Redis-based session memory.

**Stack**: Java · Spring Boot · Redis · PostgreSQL · ChromaDB · Ollama · React · Docker

[GitHub →](https://github.com/anshlakhera048/AgentHub)

---

## Folder Architecture

```
src/
├── App.jsx                    # Root layout — atmospheric layer assembly
├── main.jsx                   # Entry — ThemeProvider → CursorProvider → App
├── index.css                  # CSS custom properties, typography, keyframes
│
├── scenes/
│   └── InfraGalaxy.jsx        # WebGL infrastructure topology (R3F)
│
├── sections/
│   ├── Hero.jsx               # Kernel boot → identity reveal + 3D canvas
│   ├── About.jsx              # Engineering Intelligence Chamber
│   ├── SystemDashboard.jsx    # Live system metrics dashboard
│   ├── Projects.jsx           # Project showcase
│   ├── Experiences.jsx        # Timeline-based experience section
│   ├── TerminalSection.jsx    # Split-pane infrastructure console
│   ├── Contact.jsx            # Contact form (EmailJS)
│   ├── Navbar.jsx             # IntersectionObserver nav + animated pill
│   └── Footer.jsx
│
├── components/
│   ├── SystemHUD.jsx          # Persistent atmospheric HUD overlay
│   ├── LiveCodeSurface.jsx    # Ambient streaming code panels (edges)
│   ├── ComputationalMotion.jsx# SignalPulse, TelemetryTicker, NetworkActivity
│   ├── SubsystemLabel.jsx     # Section-boundary engineering metadata
│   ├── CursorLight.jsx        # Zero-rerender cursor glow (DOM mutation)
│   ├── HeroText.jsx           # Boot sequence + identity reveal
│   ├── MotionPrimitives.jsx   # CinematicSection, SectionDivider, TextReveal
│   ├── EngineeringBackground.jsx # Animated dot-grid atmosphere
│   ├── globe.jsx              # Interactive Cobe globe
│   ├── Frameworks.jsx         # Orbiting tech stack icons
│   ├── PageTransition.jsx     # Route-level motion wrapper
│   ├── ThemeToggle.jsx        # Dark/light theme switcher
│   └── ...
│
├── context/
│   ├── ThemeContext.jsx        # CSS class toggle + localStorage persistence
│   └── CursorContext.jsx       # Normalized cursor position (subscription pattern)
│
├── hooks/
│   └── useMotion.js            # useParallax, useCinematicScroll, useGlobalScrollProgress
│
├── constants/
│   └── index.js                # Projects, experiences, socials data
│
└── shaders/
    └── infrastructure.glsl.js  # Custom GLSL shaders for 3D effects
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server (HMR enabled)
npm run dev

# Production build with chunk splitting
npm run build

# Preview production build
npm run preview
```

Requires **Node.js 18+**.

---

## Accessibility

- All sections have `aria-label` and `role` attributes
- Navigation uses `role="navigation"`, `role="menubar"`, `role="menuitem"`
- Active nav item marked with `aria-current="page"`
- `useReducedMotion()` hook disables parallax and cinematic transforms when `prefers-reduced-motion` is set
- All interactive elements are keyboard-navigable with `tabIndex`
- Color contrast maintained across both light and dark themes
- `CursorLight`, `SystemHUD`, `LiveCodeSurface`, atmospheric overlays all have `pointer-events-none` and `aria-hidden="true"`

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome 110+ | ✅ Full WebGL2 + postprocessing |
| Firefox 115+ | ✅ Full WebGL2 |
| Safari 16+ | ✅ WebGL2 (no postprocessing fallback) |
| Edge 110+ | ✅ Full |
| Mobile Chrome | ✅ Optimized low-tier 3D |
| Mobile Safari | ✅ Optimized low-tier 3D |

---

## Roadmap

- [ ] **WebGPU renderer** — upgrade Three.js renderer to WebGPU for shader-based atmospheric effects
- [ ] **Interactive topology** — clickable 3D nodes linking to project pages
- [ ] **Live GitHub metrics** — real commit frequency and contribution data via GitHub API
- [ ] **Command palette** — `⌘K` global command interface for instant section navigation
- [ ] **GLSL atmosphere shaders** — custom vertex/fragment shaders for depth fog and particle drift
- [ ] **Multiplayer cursor presence** — show visitor cursors in real-time (WebSocket)
- [ ] **Terminal persistence** — session storage for command history
- [ ] **i18n** — multilingual support

---

## Contact

| Channel | Link |
|---|---|
| Portfolio | [anshlakhera.in](https://anshlakhera.in) |
| LinkedIn | [ansh-lakhera](https://www.linkedin.com/in/ansh-lakhera/) |
| GitHub | [anshlakhera048](https://github.com/anshlakhera048) |
| Email | via contact form at anshlakhera.in |

---

<div align="center">

```
● sys.online — kernel v6.8.0 — all 6/6 pods healthy
```

*Engineered with obsessive attention to detail.*

</div>

---

© 2026 Ansh Lakhera. All rights reserved.
