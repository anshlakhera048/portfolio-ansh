import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion } from "motion/react";
import { myProjects, experiences } from "../constants";
import SubsystemLabel from "../components/SubsystemLabel";

// ── Command registry ──────────────────────────────────────────────
const COMMANDS = {
  help: {
    description: "List available commands",
    run: () => [
      { type: "info", text: "Available commands:" },
      { type: "table", rows: [
          ["  help",              "Show this help message"],
          ["  about",             "About Ansh Lakhera"],
          ["  skills",            "Technical skills & stack"],
          ["  projects",          "List all projects"],
          ["  experience",        "Work experience"],
          ["  contact",           "Get in touch"],
          ["  inspect topology",  "Visualize infrastructure topology"],
          ["  trace pipeline",    "Trace request lifecycle"],
          ["  benchmark",         "Run system benchmark simulation"],
          ["  monitor streams",   "Live Kafka stream status"],
          ["  inspect cache",     "Redis cache topology inspection"],
          ["  explain saga",      "Explain the Saga pattern"],
          ["  explain cqrs",      "Explain CQRS architecture"],
          ["  neofetch",          "System info"],
          ["  clear",             "Clear terminal"],
        ]},
    ],
  },

  about: {
    description: "About Ansh Lakhera",
    run: () => [
      { type: "section", text: "Ansh Lakhera — Backend & Systems Engineer" },
      { type: "text",    text: "Building distributed systems, event-driven architectures," },
      { type: "text",    text: "and AI-assisted developer platforms with Java, Spring Boot," },
      { type: "text",    text: "Kafka, PostgreSQL and Redis." },
      { type: "blank" },
      { type: "kv",   key: "Location",    value: "Kota, Rajasthan, India" },
      { type: "kv",   key: "Open to",     value: "Remote / Hybrid roles" },
      { type: "kv",   key: "Focus",       value: "Distributed Systems · Backend · AI" },
    ],
  },

  skills: {
    description: "Technical skills",
    run: () => [
      { type: "section", text: "Tech Stack" },
      { type: "kv",  key: "Languages",    value: "Java · Python · TypeScript · SQL" },
      { type: "kv",  key: "Frameworks",   value: "Spring Boot · FastAPI · React" },
      { type: "kv",  key: "Messaging",    value: "Apache Kafka · Redis Streams" },
      { type: "kv",  key: "Databases",    value: "PostgreSQL · Redis · ChromaDB" },
      { type: "kv",  key: "Infra",        value: "Docker · Kubernetes · Prometheus · Grafana" },
      { type: "kv",  key: "Patterns",     value: "Saga · Outbox · CQRS · Circuit Breaker" },
    ],
  },

  projects: {
    description: "List projects",
    run: () => [
      { type: "section", text: "Projects" },
      ...myProjects.flatMap((p, i) => [
        { type: "project-title", text: `${i + 1}. ${p.title}` },
        { type: "text",          text: `   ${p.description}` },
        { type: "project-link",  text: `   → ${p.href}` },
        { type: "blank" },
      ]),
    ],
  },

  experience: {
    description: "Work experience",
    run: () => [
      { type: "section", text: "Experience" },
      ...experiences.flatMap((e) => [
        { type: "project-title", text: `${e.title}` },
        { type: "kv",            key: "Role",   value: e.job  },
        { type: "kv",            key: "Period", value: e.date },
        { type: "blank" },
      ]),
    ],
  },

  contact: {
    description: "Contact information",
    run: () => [
      { type: "section", text: "Contact" },
      { type: "kv",  key: "GitHub",   value: "github.com/anshlakhera048" },
      { type: "kv",  key: "LinkedIn", value: "linkedin.com/in/ansh-lakhera" },
      { type: "kv",  key: "Email",    value: "Use the contact form below ↓" },
    ],
  },

  clear: {
    description: "Clear terminal",
    run: () => null, // handled specially
  },

  "inspect topology": {
    description: "Visualize infrastructure topology",
    run: () => [
      { type: "section", text: "Infrastructure Topology — Live Cluster State" },
      { type: "blank" },
      { type: "ascii", text: "                    ┌─────────────┐" },
      { type: "ascii", text: "                    │   CDN/LB    │" },
      { type: "ascii", text: "                    └──────┬──────┘" },
      { type: "ascii", text: "                           │" },
      { type: "ascii", text: "              ┌────────────┼────────────┐" },
      { type: "ascii", text: "              │            │            │" },
      { type: "ascii", text: "       ┌──────┴──┐  ┌─────┴────┐  ┌───┴─────┐" },
      { type: "ascii", text: "       │ Gateway │  │ GraphQL  │  │  Auth   │" },
      { type: "ascii", text: "       └────┬────┘  └─────┬────┘  └────┬────┘" },
      { type: "ascii", text: "            │             │             │" },
      { type: "ascii", text: "       ┌────┴─────────────┴─────┐      │" },
      { type: "ascii", text: "       │      Apache Kafka       │      │" },
      { type: "ascii", text: "       │    (Event Backbone)     │      │" },
      { type: "ascii", text: "       └──┬────────┬────────┬───┘      │" },
      { type: "ascii", text: "          │        │        │           │" },
      { type: "ascii", text: "   ┌──────┴──┐ ┌───┴───┐ ┌──┴────┐ ┌───┴────┐" },
      { type: "ascii", text: "   │ Payment │ │ Fraud │ │ Order │ │ Redis  │" },
      { type: "ascii", text: "   └────┬────┘ └───┬───┘ └───┬───┘ └────────┘" },
      { type: "ascii", text: "        │          │          │" },
      { type: "ascii", text: "   ┌────┴──────────┴──────────┴────┐" },
      { type: "ascii", text: "   │        PostgreSQL (CQRS)       │" },
      { type: "ascii", text: "   └───────────────────────────────┘" },
      { type: "blank" },
      { type: "kv", key: "Nodes",      value: "15 active" },
      { type: "kv", key: "Edges",      value: "17 connections" },
      { type: "kv", key: "Throughput", value: "42K rps (simulated)" },
      { type: "kv", key: "Latency",   value: "p99: 12ms" },
    ],
  },

  "trace pipeline": {
    description: "Trace request lifecycle",
    run: () => [
      { type: "section", text: "Request Lifecycle Trace — POST /api/v1/payment" },
      { type: "blank" },
      { type: "trace", text: "→ [0ms]    LB receives request" },
      { type: "trace", text: "→ [1ms]    Route to gateway-pod-3a7f" },
      { type: "trace", text: "→ [2ms]    JWT validation (auth-service)" },
      { type: "trace", text: "→ [3ms]    Rate limiter check: PASS (42/100 rps)" },
      { type: "trace", text: "→ [4ms]    Idempotency key lookup: MISS" },
      { type: "trace", text: "→ [5ms]    Begin Saga orchestration" },
      { type: "trace", text: "→ [6ms]    ├── Payment.reserve() — Kafka publish" },
      { type: "trace", text: "→ [12ms]   ├── Fraud.evaluate() — ML model v2.3" },
      { type: "trace", text: "→ [14ms]   ├── Fraud result: ALLOW (score: 0.02)" },
      { type: "trace", text: "→ [15ms]   ├── Payment.confirm() — PG write" },
      { type: "trace", text: "→ [18ms]   ├── Outbox event published" },
      { type: "trace", text: "→ [19ms]   └── Kafka ACK (partition 7, offset 284991)" },
      { type: "trace", text: "→ [20ms]   Response: 201 Created" },
      { type: "blank" },
      { type: "kv", key: "Total",    value: "20ms (SLA: 50ms ✓)" },
      { type: "kv", key: "Spans",    value: "8 spans, 3 services" },
      { type: "kv", key: "TraceID",  value: "7f3a91bc-2e4d-4a8f-b012-c84ed7f6a1b3" },
    ],
  },

  benchmark: {
    description: "Run system benchmark simulation",
    run: () => [
      { type: "section", text: "Benchmark — Throughput Analysis" },
      { type: "blank" },
      { type: "text", text: "Running 10s load test... (simulated)" },
      { type: "blank" },
      { type: "bar", label: "Gateway",    value: 95, color: "#8be9c7" },
      { type: "bar", label: "Kafka",      value: 88, color: "#e6a900" },
      { type: "bar", label: "PostgreSQL", value: 72, color: "#4a9eff" },
      { type: "bar", label: "Redis",      value: 98, color: "#f85149" },
      { type: "bar", label: "Auth",       value: 91, color: "#61c2a2" },
      { type: "blank" },
      { type: "kv", key: "Requests",     value: "421,847 total" },
      { type: "kv", key: "Throughput",   value: "42,184 rps" },
      { type: "kv", key: "Avg Latency",  value: "4.2ms" },
      { type: "kv", key: "p99 Latency",  value: "12ms" },
      { type: "kv", key: "Errors",       value: "0.003%" },
      { type: "kv", key: "Saturation",   value: "CPU 34% | Mem 61% | Net 22%" },
    ],
  },

  "monitor streams": {
    description: "Live Kafka stream status",
    run: () => [
      { type: "section", text: "Kafka Stream Monitor — Live" },
      { type: "blank" },
      { type: "kv", key: "Cluster",        value: "3 brokers, RF=3" },
      { type: "kv", key: "Topics",         value: "12 active" },
      { type: "kv", key: "Partitions",     value: "48 total, 0 under-replicated" },
      { type: "kv", key: "Consumer Groups",value: "7 active" },
      { type: "blank" },
      { type: "text", text: "  TOPIC                   LAG      RATE" },
      { type: "stream", topic: "payment.events",     lag: "0",    rate: "1.2K/s" },
      { type: "stream", topic: "fraud.evaluations",  lag: "3",    rate: "890/s" },
      { type: "stream", topic: "order.commands",     lag: "0",    rate: "2.1K/s" },
      { type: "stream", topic: "notification.out",   lag: "12",   rate: "450/s" },
      { type: "stream", topic: "audit.log",          lag: "0",    rate: "3.4K/s" },
      { type: "blank" },
      { type: "info", text: "All consumer groups healthy. Zero rebalances in 72h." },
    ],
  },

  "inspect cache": {
    description: "Redis cache topology inspection",
    run: () => [
      { type: "section", text: "Redis Cache Inspector" },
      { type: "blank" },
      { type: "kv", key: "Mode",        value: "Cluster (3 masters, 3 replicas)" },
      { type: "kv", key: "Memory",      value: "2.1GB / 8GB (26%)" },
      { type: "kv", key: "Hit Rate",    value: "99.7%" },
      { type: "kv", key: "Evictions",   value: "0 (LRU policy)" },
      { type: "kv", key: "Connections", value: "847 active" },
      { type: "blank" },
      { type: "text", text: "  KEYSPACE            KEYS      TTL" },
      { type: "stream", topic: "session:*",       lag: "12,847", rate: "30m" },
      { type: "stream", topic: "rate_limit:*",    lag: "3,291",  rate: "60s" },
      { type: "stream", topic: "user_cache:*",    lag: "8,104",  rate: "5m" },
      { type: "stream", topic: "fraud_score:*",   lag: "1,892",  rate: "2m" },
      { type: "stream", topic: "idempotency:*",   lag: "45,102", rate: "24h" },
      { type: "blank" },
      { type: "info", text: "Cache-aside pattern active. Write-through for sessions." },
    ],
  },

  "explain saga": {
    description: "Explain the Saga pattern",
    run: () => [
      { type: "section", text: "Saga Pattern — Distributed Transaction Coordination" },
      { type: "blank" },
      { type: "text", text: "A saga is a sequence of local transactions where each" },
      { type: "text", text: "transaction updates a service and publishes an event to" },
      { type: "text", text: "trigger the next step. Failures trigger compensating" },
      { type: "text", text: "transactions in reverse order." },
      { type: "blank" },
      { type: "trace", text: "  1. Payment.reserve()    → Success → emit PaymentReserved" },
      { type: "trace", text: "  2. Inventory.deduct()   → Success → emit InventoryDeducted" },
      { type: "trace", text: "  3. Shipping.schedule()  → FAIL" },
      { type: "trace", text: "  ↩ Compensate: Inventory.restore()" },
      { type: "trace", text: "  ↩ Compensate: Payment.release()" },
      { type: "blank" },
      { type: "kv", key: "Type Used",      value: "Orchestration-based (Saga Coordinator)" },
      { type: "kv", key: "Guarantees",     value: "Eventual consistency, at-least-once" },
      { type: "kv", key: "Observability",  value: "Saga state machine tracked in PG" },
    ],
  },

  "explain cqrs": {
    description: "Explain CQRS architecture",
    run: () => [
      { type: "section", text: "CQRS — Command Query Responsibility Segregation" },
      { type: "blank" },
      { type: "text", text: "Separates read and write models for optimal performance" },
      { type: "text", text: "at each path. Commands mutate state; queries read from" },
      { type: "text", text: "denormalized projections optimized for access patterns." },
      { type: "blank" },
      { type: "ascii", text: "  ┌──────────┐     ┌──────────────┐     ┌──────────┐" },
      { type: "ascii", text: "  │ Commands │────→│ Write Model  │────→│  Events  │" },
      { type: "ascii", text: "  └──────────┘     │ (PostgreSQL) │     │ (Kafka)  │" },
      { type: "ascii", text: "                   └──────────────┘     └─────┬────┘" },
      { type: "ascii", text: "                                              │" },
      { type: "ascii", text: "  ┌──────────┐     ┌──────────────┐     ┌────┴─────┐" },
      { type: "ascii", text: "  │ Queries  │←────│ Read Model   │←────│Projector │" },
      { type: "ascii", text: "  └──────────┘     │  (Redis/ES)  │     └──────────┘" },
      { type: "ascii", text: "                   └──────────────┘" },
      { type: "blank" },
      { type: "kv", key: "Write DB",  value: "PostgreSQL (normalized, ACID)" },
      { type: "kv", key: "Read DB",   value: "Redis + Elasticsearch (denormalized)" },
      { type: "kv", key: "Sync",      value: "Kafka event projections (< 50ms lag)" },
    ],
  },

  neofetch: {
    description: "System info",
    run: () => [
      { type: "section", text: "ansh@distributed-systems" },
      { type: "text", text: "─────────────────────────────────" },
      { type: "kv", key: "OS",        value: "Engineering OS v2.0 (Production)" },
      { type: "kv", key: "Kernel",    value: "JVM 21 (ZGC, -XX:+UseCompressedOops)" },
      { type: "kv", key: "Uptime",    value: "3 years of distributed systems" },
      { type: "kv", key: "Shell",     value: "Spring Boot 3.2 + Reactor" },
      { type: "kv", key: "Terminal",  value: "IntelliJ Ultimate + Neovim" },
      { type: "kv", key: "CPU",       value: "16 cores × obsessive optimization" },
      { type: "kv", key: "Memory",    value: "Unbounded curiosity (no GC pauses)" },
      { type: "kv", key: "Network",   value: "Kafka × Redis × gRPC" },
      { type: "kv", key: "Disk",      value: "PostgreSQL (WAL optimized)" },
      { type: "kv", key: "Processes", value: "Saga, CQRS, Outbox, Circuit Breaker" },
    ],
  },
};

// ── Output line renderer ──────────────────────────────────────────
function OutputLine({ line }) {
  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  if (line.type === "blank")   return <div className="h-2" />;
  if (line.type === "section") return (
    <p className="font-semibold mt-1" style={{ ...mono, color: "#8be9c7" }}>
      {line.text}
    </p>
  );
  if (line.type === "info") return (
    <p className="text-xs" style={{ ...mono, color: "var(--txt-muted)" }}>{line.text}</p>
  );
  if (line.type === "text") return (
    <p className="text-xs" style={{ ...mono, color: "#c9d1d9" }}>{line.text}</p>
  );
  if (line.type === "kv") return (
    <p className="text-xs" style={mono}>
      <span className="w-24 inline-block" style={{ color: "#6e7681" }}>{line.key}</span>
      <span style={{ color: "#c9d1d9" }}>{line.value}</span>
    </p>
  );
  if (line.type === "project-title") return (
    <p className="text-teal text-xs font-medium mt-1" style={{ ...mono, color: "#61c2a2" }}>
      {line.text}
    </p>
  );
  if (line.type === "project-link") return (
    <p className="text-xs hover:text-teal transition-colors" style={{ ...mono, color: "var(--txt-muted)" }}>
      {line.text}
    </p>
  );
  if (line.type === "table") return (
    <div className="space-y-0.5 mt-1">
      {line.rows.map(([cmd, desc], i) => (
        <p key={i} className="text-xs" style={mono}>
          <span className="w-28 inline-block" style={{ color: "#61c2a2" }}>{cmd}</span>
          <span style={{ color: "#6e7681" }}>{desc}</span>
        </p>
      ))}
    </div>
  );
  if (line.type === "error") return (
    <p className="text-xs" style={{ ...mono, color: "#f85149" }}>{line.text}</p>
  );
  if (line.type === "ascii") return (
    <p className="text-xs leading-tight" style={{ ...mono, color: "#6e7681", whiteSpace: "pre" }}>{line.text}</p>
  );
  if (line.type === "trace") return (
    <p className="text-xs" style={{ ...mono, color: "#e6a900" }}>{line.text}</p>
  );
  if (line.type === "bar") {
    const width = Math.min(line.value, 100);
    return (
      <div className="flex items-center gap-2 text-xs" style={mono}>
        <span className="w-20 inline-block" style={{ color: "#6e7681" }}>{line.label}</span>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden max-w-[200px]" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${width}%`, background: line.color || "#61c2a2" }} />
        </div>
        <span style={{ color: "#c9d1d9" }}>{line.value}%</span>
      </div>
    );
  }
  if (line.type === "stream") return (
    <p className="text-xs" style={mono}>
      <span className="w-36 inline-block" style={{ color: "#61c2a2" }}>  {line.topic}</span>
      <span className="w-14 inline-block" style={{ color: parseInt(line.lag) > 5 ? "#e6a900" : "#3fb950" }}>{line.lag}</span>
      <span style={{ color: "#6e7681" }}>{line.rate}</span>
    </p>
  );
  return null;
}

// ── Live diagnostics side panel ───────────────────────────────────
const DIAG_METRICS = [
  { label: "CPU",       getValue: () => (20 + Math.random() * 15).toFixed(1) + "%" },
  { label: "Heap",      getValue: () => (1.2 + Math.random() * 0.4).toFixed(2) + "G" },
  { label: "Threads",   getValue: () => String(180 + Math.floor(Math.random() * 20)) },
  { label: "GC Pause",  getValue: () => (0.1 + Math.random() * 0.3).toFixed(2) + "ms" },
  { label: "Conn Pool", getValue: () => (8 + Math.floor(Math.random() * 3)) + "/10" },
  { label: "Kafka Lag", getValue: () => String(Math.floor(Math.random() * 5)) },
];

const DIAG_LOGS = [
  "[INFO]  saga.orchestrator — payment saga completed (20ms)",
  "[DEBUG] redis.cache — HIT session:4f2a (TTL: 1740s)",
  "[INFO]  kafka.consumer — committed offset 284991 (partition 7)",
  "[WARN]  circuit.breaker — half-open → payment-external-api",
  "[INFO]  pg.writer — WAL flush completed (142 ops)",
  "[DEBUG] rate.limiter — 42/100 requests (window: 1s)",
  "[INFO]  grpc.gateway — TLS handshake 2.1ms (TLS 1.3)",
  "[INFO]  event.projector — order.read-model updated (lag: 3ms)",
  "[DEBUG] fraud.model — inference completed (score: 0.017)",
  "[INFO]  health.probe — all services passing (6/6 pods)",
  "[DEBUG] conn.pool — acquired connection (active: 9/10)",
  "[INFO]  outbox.relay — published 3 events to kafka",
  "[WARN]  gc.monitor — minor GC (ZGC) 0.28ms",
  "[INFO]  dist.trace — span completed trace-id:7f3a91bc",
];

function DiagnosticsPanel() {
  const [metrics, setMetrics] = useState(() => DIAG_METRICS.map((m) => ({ ...m, value: m.getValue() })));
  const [logs, setLogs] = useState([]);
  const logIdx = useRef(0);

  // Update metrics every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics(DIAG_METRICS.map((m) => ({ ...m, value: m.getValue() })));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Stream logs
  useEffect(() => {
    const addLog = () => {
      const log = DIAG_LOGS[logIdx.current % DIAG_LOGS.length];
      logIdx.current++;
      setLogs((prev) => [...prev.slice(-8), { id: logIdx.current, text: log }]);
    };
    addLog();
    const id = setInterval(addLog, 1800);
    return () => clearInterval(id);
  }, []);

  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <div className="terminal-window w-full lg:w-80 flex-shrink-0 hidden md:block">
      {/* Title bar */}
      <div className="terminal-titlebar">
        <span className="terminal-dot" style={{ background: "#f85149" }} />
        <span className="terminal-dot" style={{ background: "#e6a900" }} />
        <span className="terminal-dot" style={{ background: "#3fb950" }} />
        <span className="ml-2 text-xs" style={{ ...mono, color: "#6e7681" }}>
          diagnostics — htop
        </span>
      </div>

      <div className="p-3 h-80 overflow-hidden space-y-3">
        {/* Metrics grid */}
        <div>
          <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ ...mono, color: "#6e7681" }}>
            runtime metrics
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {metrics.map((m) => (
              <div key={m.label} className="flex justify-between" style={mono}>
                <span className="text-[10px]" style={{ color: "#6e7681" }}>{m.label}</span>
                <span className="text-[10px] font-medium" style={{ color: "#c9d1d9" }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Live log stream */}
        <div>
          <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ ...mono, color: "#6e7681" }}>
            system log stream
          </p>
          <div className="space-y-0.5 overflow-hidden">
            {logs.map((log) => (
              <p
                key={log.id}
                className="text-[9px] leading-relaxed truncate"
                style={{
                  ...mono,
                  color: log.text.includes("[WARN]") ? "#e6a900" : log.text.includes("[DEBUG]") ? "#6e7681" : "#8b949e",
                }}
              >
                {log.text}
              </p>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Process indicators */}
        <div>
          <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ ...mono, color: "#6e7681" }}>
            active services
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["kafka", "pg-writer", "redis", "saga", "grpc", "prometheus"].map((svc) => (
              <span
                key={svc}
                className="text-[9px] px-1.5 py-0.5 rounded"
                style={{ ...mono, color: "#3fb950", background: "rgba(63,185,80,0.08)", border: "1px solid rgba(63,185,80,0.15)" }}
              >
                ● {svc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main terminal ─────────────────────────────────────────────────
const WELCOME = [
  { type: "section", text: "Infrastructure Console v2.0 — Ansh Lakhera" },
  { type: "text",    text: 'Type "help" for commands. Tab to autocomplete.' },
  { type: "text",    text: 'Try: inspect topology, trace pipeline, benchmark' },
  { type: "blank" },
];

export default function TerminalSection() {
  const [history, setHistory] = useState(WELCOME);
  const [input, setInput]     = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outputRef  = useRef(null);
  const inputRef   = useRef(null);

  // Scroll the terminal OUTPUT div — not the page viewport
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [cmd, ...prev]);
    setHistIdx(-1);

    const echo = { type: "kv", key: "$", value: ` ${cmd}` };

    if (cmd === "clear") {
      setHistory([{ type: "blank" }]);
      return;
    }

    // Try exact match first, then first word
    const handler = COMMANDS[cmd] || COMMANDS[cmd.split(" ")[0]];
    if (!handler) {
      setHistory((prev) => [
        ...prev,
        echo,
        { type: "error", text: `Command not found: ${cmd}. Try "help".` },
        { type: "blank" },
      ]);
      return;
    }

    const output = handler.run();
    setHistory((prev) => [
      ...prev,
      echo,
      ...(output ?? []),
      { type: "blank" },
    ]);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete: find matching commands
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1 && input) {
        // Show available completions
        setHistory((prev) => [
          ...prev,
          { type: "info", text: `Completions: ${matches.join(", ")}` },
        ]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : cmdHistory[next] ?? "");
        return next;
      });
    }
  };

  return (
    <section
      className="relative c-space section-spacing"
      id="terminal"
      aria-label="Interactive terminal"
    >
      <SubsystemLabel id="terminal" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-2"
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#61c2a2", boxShadow: "0 0 8px #61c2a2" }}
        />
        <p
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}
        >
          infrastructure console
        </p>
      </motion.div>

      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Command <span className="text-gradient">Center</span>
      </motion.h2>

      <motion.p
        className="text-sm mb-8 max-w-xl"
        style={{ color: "var(--txt-secondary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Infrastructure debugging console with live diagnostics.{" "}
        <code
          className="px-1.5 py-0.5 rounded text-teal text-xs"
          style={{
            background: "rgba(97,194,162,0.1)",
            border: "1px solid rgba(97,194,162,0.2)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          help
        </code>{" "}
        for commands. Tab to autocomplete.
      </motion.p>

      {/* ═══ SPLIT-PANE TERMINAL LAYOUT ═══ */}
      <motion.div
        className="flex flex-col lg:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {/* ── LEFT PANE: Main terminal ── */}
        <div
          className="terminal-window flex-1 lg:max-w-none"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="terminal-titlebar">
            <span className="terminal-dot" style={{ background: "#f85149" }} />
            <span className="terminal-dot" style={{ background: "#e6a900" }} />
            <span className="terminal-dot" style={{ background: "#3fb950" }} />
            <span
              className="ml-2 text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6e7681" }}
            >
              infra-console — ansh@cluster-01 — zsh
            </span>
            <span
              className="ml-auto text-[9px]"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#3fb950" }}
            >
              ● LIVE
            </span>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            className="p-4 h-80 overflow-y-auto space-y-0.5 terminal-text"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(97,194,162,0.2) transparent" }}
          >
            {history.map((line, i) => (
              <OutputLine key={i} line={line} />
            ))}
          </div>

          {/* Input row */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span
              className="text-xs font-medium flex-shrink-0"
              style={{ color: "#61c2a2", fontFamily: "'JetBrains Mono', monospace" }}
            >
              ansh@cluster-01:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent outline-none text-xs caret-teal"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#c9d1d9" }}
              placeholder="type a command..."
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>

        {/* ── RIGHT PANE: Live diagnostics panel ── */}
        <DiagnosticsPanel />
      </motion.div>
    </section>
  );
}
