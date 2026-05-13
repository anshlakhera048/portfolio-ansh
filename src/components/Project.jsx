import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Derive display status from project URL
function getStatus(href) {
  if (!href) return { label: "BUILT", color: "#8b949e", glow: "rgba(139,148,158,0.4)" };
  if (!href.includes("github.com")) return { label: "LIVE",  color: "#61c2a2", glow: "rgba(97,194,162,0.5)" };
  return { label: "BUILT", color: "#e6a900", glow: "rgba(230,169,0,0.5)" };
}

// Inline SVG external-link icon
const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Project = ({ title, description, subDescription, href, image, tags }) => {
  const [expanded, setExpanded] = useState(false);
  const status = getStatus(href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, type: "spring", bounce: 0.12 }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderLeft: "3px solid rgba(97,194,162,0.5)",
        boxShadow: "var(--shadow-card)",
      }}
      whileHover={{ y: -2 }}
    >
      {/* ── Header row ─────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Status badge */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: status.color, boxShadow: `0 0 7px ${status.glow}` }}
            />
            <span
              className="text-xs font-mono font-semibold tracking-wide"
              style={{ color: status.color, fontFamily: "'JetBrains Mono', monospace" }}
            >
              {status.label}
            </span>
          </div>

          <span style={{ color: "var(--border-default)", fontSize: "0.9em" }}>│</span>

          {/* Title */}
          <h3
            className="text-base font-bold truncate"
            style={{ color: "var(--txt-primary)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {title}
          </h3>
        </div>

        {/* External link */}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono flex-shrink-0 ml-3 transition-colors duration-200"
            style={{ color: "var(--txt-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#61c2a2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--txt-muted)")}
          >
            <ExternalIcon />
            {status.label === "LIVE" ? "visit" : "github"}
          </a>
        )}
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-5 p-5">
        {/* Project image */}
        <div
          className="relative w-full md:w-56 h-36 rounded-xl overflow-hidden flex-shrink-0"
          style={{ border: "1px solid var(--border-default)" }}
        >
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {/* Right-edge blend */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 55%, var(--bg-surface))" }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--txt-secondary)" }}
          >
            {description}
          </p>

          {/* Stack topology — tags as connected chips */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {tags.slice(0, 6).map((tag, i) => (
              <React.Fragment key={tag.id}>
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    color: "var(--txt-secondary)",
                  }}
                >
                  {tag.path && (
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-3.5 h-3.5"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  {tag.name}
                </span>
                {i < Math.min(tags.length - 1, 5) && (
                  <span className="text-xs font-mono" style={{ color: "rgba(97,194,162,0.45)" }}>→</span>
                )}
              </React.Fragment>
            ))}
            {tags.length > 6 && (
              <span className="text-xs font-mono" style={{ color: "var(--txt-muted)" }}>
                +{tags.length - 6} more
              </span>
            )}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded((p) => !p)}
            className="self-start flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded transition-all duration-200"
            style={{
              color: "#61c2a2",
              border: "1px solid rgba(97,194,162,0.3)",
              background: expanded ? "rgba(97,194,162,0.1)" : "rgba(97,194,162,0.06)",
            }}
          >
            <span
              className="transition-transform duration-200"
              style={{ display: "inline-block", transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              ▸
            </span>
            {expanded ? "collapse" : "architecture"}
          </button>
        </div>
      </div>

      {/* ── Expanded architecture details ──────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-3"
              style={{ borderTop: "1px solid var(--border-default)" }}
            >
              <p
                className="text-xs font-mono tracking-widest uppercase mb-3"
                style={{ color: "#61c2a2", fontFamily: "'JetBrains Mono', monospace" }}
              >
                // architecture
              </p>
              <ul className="space-y-2.5">
                {subDescription.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-2.5 text-sm"
                    style={{ color: "var(--txt-secondary)" }}
                  >
                    <span className="flex-shrink-0 font-mono" style={{ color: "#61c2a2" }}>›</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Project;
