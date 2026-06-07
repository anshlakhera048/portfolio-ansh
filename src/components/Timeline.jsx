"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";


export const Timeline = ({ data, cardGap = "gap-4 md:gap-4" }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Animate vertical progress bar as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height - windowHeight * 0.3;
      const scrolled = Math.min(Math.max(windowHeight * 0.3 - rect.top, 0), totalHeight);
      setProgress(totalHeight > 0 ? scrolled / totalHeight : 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full" ref={containerRef}>
      <div className={`flex flex-col ${cardGap}`}>
        <AnimatePresence>
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring', bounce: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full"
            >
              {/* Experience Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="rounded-2xl px-4 py-4 md:px-8 md:py-8 transition-all duration-300 w-full"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  boxShadow: "var(--shadow-card)",
                  borderLeft: "3px solid rgba(124,58,237,0.4)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    {item.logo && (
                      <img src={item.logo} alt={item.title} className="w-10 h-10 rounded-md object-contain bg-white p-1 shadow" />
                    )}
                    <h3
                      className="text-xl md:text-2xl font-bold mb-1 md:mb-0"
                      style={{ color: "var(--txt-primary)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className="text-sm md:text-base font-semibold px-3 py-1 rounded-full"
                    style={{
                      color: "#7C3AED",
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {item.date}
                  </span>
                </div>
                <div
                  className="text-base md:text-lg font-medium mb-1"
                  style={{ color: "var(--txt-secondary)" }}
                >
                  {item.job}
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  {item.contents.map((content, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-sm md:text-base"
                      style={{ color: "var(--txt-secondary)" }}
                    >
                      {content}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
