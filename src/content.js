/* newUI content hub — single source of truth, updated from resume (Oct 2026) */

export const profile = {
  name: "Ansh Lakhera",
  role: "Software Engineer",
  focus: "Backend & Distributed Systems",
  tagline: "I build the systems other systems depend on — exchange engines, streaming pipelines, event-driven payments.",
  email: "anshlakhera048@gmail.com",
  phone: "+91-9636049289",
  location: "Kota, Rajasthan, IN",
  github: "https://github.com/anshlakhera048",
  linkedin: "https://www.linkedin.com/in/ansh-lakhera",
  instagram: "https://www.instagram.com/swe.ngineer",
  resumeUrl: "https://drive.google.com/file/d/1RjS4AjH602rZ-JCf43un53uOUseoemdn/view?usp=sharing",
};

export const heroMetrics = [
  { num: 400, prefix: "", suffix: "K", decimals: 0, unit: "orders/sec", label: "sustained throughput", project: "AxiomX" },
  { num: 3, prefix: "", suffix: "µs", decimals: 0, unit: "p50 latency", label: "order-to-trade", project: "AxiomX" },
  { num: 100, prefix: "~", suffix: "ns", decimals: 0, unit: "per op", label: "book operations", project: "Kairos" },
  { num: 1000, prefix: "", suffix: "+", decimals: 0, unit: "TPS", label: "validated via k6", project: "Payments" },
];

export const stackMarquee = [
  "Java 21", "C++ 20", "Spring Boot", "Apache Kafka", "Apache Flink",
  "LMAX Disruptor", "PostgreSQL", "Redis", "ClickHouse", "Docker",
  "Kubernetes", "Prometheus", "Grafana", "Python", "React",
];

export const projects = [
  {
    id: "kairos",
    flagship: true,
    period: "Oct 2026",
    title: "Kairos",
    subtitle: "Low-latency matching engine + market-data simulator",
    description:
      "A C++ limit order book and matching engine with a full market-data simulator — built to study microstructure honestly, not to demo it.",
    bullets: [
      "Deterministic matching engine: 92/92 tests green, sanitizers clean, 18M-operation differential soak with zero divergence.",
      "Book operations at ~100ns — cache-conscious layout, no hidden allocations on the hot path.",
      "Market simulator closed a 19% realism gap vs. Poisson flow by modeling real limit-order-book dynamics.",
      "Avellaneda–Stoikov market maker went from 0 to 66 fills after fixing a 10^6x inventory-unit bug; rejects fell 8.9M → 1.",
    ],
    metrics: [
      { k: "tests", v: "92/92" },
      { k: "soak", v: "18M ops" },
      { k: "book op", v: "~100ns" },
      { k: "fills", v: "0 → 66" },
    ],
    tags: ["C++20", "CMake", "GoogleTest", "pybind11"],
    href: "https://github.com/anshlakhera048/Kairos",
    image: null,
  },
  {
    id: "axiomx",
    period: "May 2026",
    title: "AxiomX",
    subtitle: "Ultra-low-latency deterministic exchange engine",
    description:
      "Single-threaded Disruptor ring-buffer exchange engine with price-time priority matching and FIX connectivity.",
    bullets: [
      "Sustains 400K orders/sec at 3µs p50 latency; 250K orders/sec under mixed load.",
      "Price-time order book (TreeMap + FIFO): O(log N) match, O(1) cancel via indexed order references.",
      "Lock-free ingestion via Disruptor SPSC queues — strict event ordering, zero contention.",
      "8M FIX parses/sec with zero GC on the matching loop via object pooling and zero-allocation design.",
      "Event sourcing with replay and periodic snapshots for deterministic crash recovery.",
    ],
    metrics: [
      { k: "throughput", v: "400K/s" },
      { k: "p50", v: "3µs" },
      { k: "FIX parse", v: "8M/s" },
    ],
    tags: ["Java", "Disruptor", "Agrona", "fastutil"],
    href: "https://github.com/anshlakhera048/AxiomX",
    image: "/assets/axiomx.png",
  },
  {
    id: "quantstream",
    period: "Apr 2026",
    title: "QuantStream",
    subtitle: "Real-time quantitative market-data pipeline",
    description:
      "Event-time Kafka → Flink streaming pipeline for analytics, feature engineering, and replayable backtesting.",
    bullets: [
      "Computes SMA, VWAP, volatility and rolling indicators over sliding windows at 10–20K events/sec.",
      "Stateful Flink processing with RocksDB backend, 5s checkpoints, exactly-once semantics on the ingest-to-state path.",
      "Dual-layer feature store: Redis (300s TTL, async) for serving + ClickHouse for analytics, with consistency checks and 5% drift alerts.",
      "Binance WebSocket → Kafka ingestion with Avro + Schema Registry, idempotent producers, DLQ, schema evolution.",
    ],
    metrics: [
      { k: "events", v: "10–20K/s" },
      { k: "semantics", v: "exactly-once" },
      { k: "services", v: "16" },
    ],
    tags: ["Kafka", "Flink", "Spring Boot", "Redis", "ClickHouse", "Avro", "Docker"],
    href: "https://github.com/anshlakhera048/QuantStream",
    image: "/assets/quantstream.png",
  },
  {
    id: "payments",
    period: "Mar 2026",
    title: "Distributed Payment Infrastructure",
    subtitle: "Event-driven payments with real-time fraud detection",
    description:
      "Transactional-outbox payment system with a double-entry ledger and two-stage fraud detection.",
    bullets: [
      "Validated at 1,000+ TPS via k6; Kafka transactional outbox eliminates dual-write.",
      "Double-entry ledger enforcing SUM(DEBIT) = SUM(CREDIT) with optimistic locking on balances.",
      "3-tier idempotency (Redis, DB lock, UNIQUE constraint) for effectively-once processing over Kafka.",
      "Two-stage fraud detection (rules + IsolationForest) with adaptive backpressure on consumer lag.",
    ],
    metrics: [
      { k: "validated", v: "1,000+ TPS" },
      { k: "ledger", v: "double-entry" },
      { k: "idempotency", v: "3-tier" },
    ],
    tags: ["Spring Boot", "Kafka", "PostgreSQL", "Redis", "FastAPI", "Prometheus", "Grafana"],
    href: "https://github.com/anshlakhera048/Distributed-Payment-Infrastructure",
    image: "/assets/distributed_payment_infra.png",
  },
];

export const openSource = [
  {
    org: "Chisle",
    repo: "JayPokale/Chisle",
    stack: "JavaScript · Node.js · GitHub Actions",
    items: [
      "PR #30 — per-tool replay savings breakdown in the benchmark; iterated through maintainer review, merged.",
      "PR #34 — rerun benchmark chart from raw data; fixed global-baseline bias by pairing arms with same-task baseline.",
      "PR #35 — turns/run metric for the agentic benchmark score; two-decimal output exposed 5.38 vs 5.25 hidden by rounding.",
    ],
    href: "https://github.com/JayPokale/Chisle",
  },
  {
    org: "Muscade.jl",
    repo: "SINTEF/Muscade.jl",
    stack: "Julia · Documenter.jl",
    items: [
      "Issue #111 / PR #112 — restructured docs navigation in Documenter.jl; retargeted to dev branch per maintainer workflow.",
    ],
    href: "https://github.com/SINTEF/Muscade.jl",
  },
];

export const experience = [
  {
    company: "Tripfactory",
    role: "SDE Intern",
    location: "Bengaluru",
    period: "Jan 2026 – Jun 2026",
    bullets: [
      "Integrated BPoint REST v5 into B2B booking infra, owning auth-to-settlement across a multi-gateway architecture.",
      "Engineered an idempotent FSM refund engine with excess-refund prevention and precision-safe arithmetic under concurrency.",
      "Built a global hotel crawler (Playwright + Hibernate) with WAF/Akamai bypass, BFS traversal, upsert-safe persistence.",
      "Audited a CDC pipeline (PG → Debezium → Kafka → ClickHouse); designed a star-schema warehouse with MergeTree materialized views.",
    ],
    logo: "/assets/tripfactory.png",
  },
  {
    company: "Bluestock Fintech",
    role: "SDE Intern",
    location: "Remote",
    period: "May 2025 – Jun 2025",
    bullets: [
      "Built a real-time IPO market dashboard (React, Node, Tailwind) with modular architecture and WebSocket scalability design.",
    ],
    logo: "/assets/bluestocks.webp",
  },
  {
    company: "Warble Solutions",
    role: "UI/UX Intern",
    location: "Remote",
    period: "Apr 2024 – May 2024",
    bullets: ["Contributed to UI/UX design workflows and interface iteration."],
    logo: "/assets/warbleSolutions.png",
  },
  {
    company: "Freelancer",
    role: "Independent Developer",
    location: "Remote",
    period: "2023 – Present",
    bullets: ["Shipped client projects across web and backend systems."],
    logo: null,
  },
];

export const achievements = [
  { k: "CodeChef", v: "3★ · max 1601", d: "Global Rank 74, Starters 251" },
  { k: "LeetCode", v: "max 1648", d: "Top 3.3% globally, Biweekly 148" },
  { k: "DSA", v: "500+", d: "problems across LeetCode, Codeforces, CodeChef" },
  { k: "@swe.ngineer", v: "35K+", d: "views/month — AI, backend & system design content" },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Open Source", href: "#oss" },
  { label: "Experience", href: "#experience" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];
