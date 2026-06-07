import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// SUBSYSTEM LABEL — Environmental storytelling element
// Renders infrastructure metadata at section boundaries.
// Makes the site feel like a real engineering operating system.
// ═══════════════════════════════════════════════════════════════════

const SUBSYSTEM_DATA = {
  dashboard: {
    module: "sys.profiler",
    thread: "main-0",
    heap: "128MB",
    gc: "ZGC",
    note: "engineering capability matrix",
  },
  about: {
    module: "identity.resolver",
    thread: "worker-3",
    heap: "64MB",
    gc: "G1",
    note: "operator profile & context",
  },
  projects: {
    module: "artifact.registry",
    thread: "io-pool-1",
    heap: "256MB",
    gc: "ZGC",
    note: "production systems catalog",
  },
  experiences: {
    module: "timeline.projector",
    thread: "event-loop-0",
    heap: "48MB",
    gc: "Shenandoah",
    note: "career event stream",
  },
  terminal: {
    module: "shell.interpreter",
    thread: "pty-0",
    heap: "32MB",
    gc: "Epsilon",
    note: "infrastructure debugging console",
  },
  contact: {
    module: "network.egress",
    thread: "netty-4",
    heap: "16MB",
    gc: "ZGC",
    note: "outbound connection handler",
  },
};

function SubsystemLabel({ id = "dashboard" }) {
  const data = SUBSYSTEM_DATA[id] || SUBSYSTEM_DATA.dashboard;
  
  return (
    <div
      className="flex items-center gap-3 py-2 select-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 4px #22C55E" }} />
        <span className="text-[9px] uppercase tracking-wider" style={{ color: "var(--txt-muted)", opacity: 0.5 }}>
          {data.module}
        </span>
      </div>
      <span className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.3 }}>|</span>
      <span className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.4 }}>
        t:{data.thread}
      </span>
      <span className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.3 }}>|</span>
      <span className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.4 }}>
        heap:{data.heap}
      </span>
      <span className="text-[9px] hidden sm:inline" style={{ color: "var(--txt-muted)", opacity: 0.3 }}>|</span>
      <span className="text-[9px] hidden sm:inline" style={{ color: "var(--txt-muted)", opacity: 0.4 }}>
        {data.note}
      </span>
    </div>
  );
}

export default memo(SubsystemLabel);
