import { motion } from "motion/react";
import SubsystemLabel from "../components/SubsystemLabel";

// ── Engineering specialization domains ───────────────────────────
const DOMAINS = [
  {
    name:   "Backend Systems Engineering",
    desc:   "High-throughput REST & gRPC APIs, connection pooling, graceful shutdown, health probes",
    color:  "#7C3AED",
    icon:   "⬡",
  },
  {
    name:   "Event-Driven Architectures",
    desc:   "Saga, Outbox, CQRS patterns; async workflows; eventual consistency guarantees",
    color:  "#8B5CF6",
    icon:   "⬡",
  },
  {
    name:   "Real-Time Streaming",
    desc:   "Apache Kafka pipelines, Redis Streams, backpressure, dead-letter queues, consumer groups",
    color:  "#F59E0B",
    icon:   "⬡",
  },
  {
    name:   "AI Infrastructure & RAG",
    desc:   "Vector stores (ChromaDB), embedding pipelines, LangChain, retrieval-augmented generation",
    color:  "#A855F7",
    icon:   "⬡",
  },
  {
    name:   "Distributed Caching",
    desc:   "Redis cache-aside, write-through, TTL strategies, cache invalidation at scale",
    color:  "#7C3AED",
    icon:   "⬡",
  },
  {
    name:   "Observability & Telemetry",
    desc:   "Prometheus metrics, Grafana dashboards, distributed tracing, structured logging",
    color:  "#8B5CF6",
    icon:   "⬡",
  },
  {
    name:   "API Platform Design",
    desc:   "Rate limiting, circuit breakers, idempotency keys, versioning, OpenAPI specs",
    color:  "#7C3AED",
    icon:   "⬡",
  },
  {
    name:   "Low-Latency Systems",
    desc:   "JVM tuning, connection reuse, async I/O, optimistic locking, query optimization",
    color:  "#A855F7",
    icon:   "⬡",
  },
];

// ── Architecture patterns ─────────────────────────────────────────
const PATTERNS = [
  { name: "Saga Pattern",         category: "Distributed" },
  { name: "CQRS",                 category: "Distributed" },
  { name: "Outbox Pattern",       category: "Distributed" },
  { name: "Circuit Breaker",      category: "Resilience"  },
  { name: "Event Sourcing",       category: "Event-Driven"},
  { name: "Pub/Sub",              category: "Messaging"   },
  { name: "Rate Limiting",        category: "API"         },
  { name: "Graceful Degradation", category: "Resilience"  },
  { name: "Backpressure",         category: "Streaming"   },
  { name: "Idempotency",          category: "API"         },
  { name: "Distributed Tracing",  category: "Observability"},
  { name: "Health Checks",        category: "Observability"},
];

const CATEGORY_COLOR = {
  "Distributed":   "#7C3AED",
  "Resilience":    "#8B5CF6",
  "Event-Driven":  "#F59E0B",
  "Messaging":     "#7C3AED",
  "API":           "#A855F7",
  "Streaming":     "#F59E0B",
  "Observability": "#8B5CF6",
};

// ── Tech stack ────────────────────────────────────────────────────
const STACK_ITEMS = [
  { name: "Java 21",       type: "lang"      },
  { name: "Spring Boot 3", type: "framework" },
  { name: "Apache Kafka",  type: "messaging" },
  { name: "PostgreSQL",    type: "data"      },
  { name: "Redis",         type: "data"      },
  { name: "ChromaDB",      type: "data"      },
  { name: "Docker",        type: "infra"     },
  { name: "Prometheus",    type: "observ"    },
  { name: "Python",        type: "lang"      },
  { name: "FastAPI",       type: "framework" },
];

const TYPE_COLOR = {
  lang:      "#8B5CF6",
  framework: "#7C3AED",
  messaging: "#F59E0B",
  data:      "#A855F7",
  infra:     "#7C3AED",
  observ:    "#8B5CF6",
};

export default function SystemDashboard() {
  return (
    <section
      className="relative c-space section-spacing"
      id="dashboard"
      aria-label="Engineering profile"
    >
      <SubsystemLabel id="dashboard" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-2"
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "#7C3AED", boxShadow: "0 0 8px #7C3AED" }} />
        <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
          systems expertise
        </p>
      </motion.div>

      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Engineering Depth
      </motion.h2>
      <motion.p
        className="subtext max-w-xl mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Core systems engineering domains — patterns applied, tools mastered, architectures shipped.
      </motion.p>

      {/* ── Specialization domain grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {DOMAINS.map((d, i) => (
          <motion.div
            key={d.name}
            className="metric-card group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            style={{ borderLeft: `2px solid ${d.color}40`, cursor: "default" }}
          >
            <div className="flex items-start gap-2 mb-2">
              <span
                className="text-lg leading-none mt-0.5 flex-shrink-0"
                style={{ color: d.color }}
                aria-hidden="true"
              >
                {d.icon}
              </span>
              <p
                className="text-xs font-semibold leading-tight"
                style={{ color: d.color, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {d.name}
              </p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--txt-muted)" }}>
              {d.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Architecture patterns + tech stack ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Architecture patterns */}
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "var(--txt-primary)" }}>Architecture Patterns</p>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              {PATTERNS.length} applied
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PATTERNS.map((p) => (
              <span
                key={p.name}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: `${CATEGORY_COLOR[p.category]}12`,
                  color: CATEGORY_COLOR[p.category],
                  border: `1px solid ${CATEGORY_COLOR[p.category]}25`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {p.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Core stack */}
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "var(--txt-primary)" }}>Core Stack</p>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              production
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {STACK_ITEMS.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: TYPE_COLOR[item.type] }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--txt-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
