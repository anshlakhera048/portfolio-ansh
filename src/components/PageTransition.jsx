import { motion } from "motion/react";
import { useEffect, useState } from "react";

const BOOT = [
  { text: "$ initializing system kernel...",      color: "#6e7681" },
  { text: "✓ distributed services online",        color: "#61c2a2" },
  { text: "✓ kafka brokers connected [3/3]",      color: "#61c2a2" },
  { text: "✓ observability pipeline active",      color: "#61c2a2" },
  { text: "▶ launching interface",                color: "#8be9c7" },
];

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const timers = BOOT.map((_, i) =>
      setTimeout(() => setLineIdx(i), i * 220)
    );
    const done = setTimeout(() => setIsLoading(false), BOOT.length * 220 + 400);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: "var(--bg-base, #0f1115)" }}
      >
        <div className="space-y-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {BOOT.slice(0, lineIdx + 1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm"
              style={{ color: line.color }}
            >
              {line.text}
            </motion.p>
          ))}
          <span
            className="inline-block w-2 h-4 align-middle mt-1"
            style={{
              background: "#61c2a2",
              animation: "terminal-blink 1.1s step-end infinite",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
