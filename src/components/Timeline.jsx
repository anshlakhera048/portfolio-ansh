"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
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
                whileHover={{ scale: 1.04, boxShadow: '0 12px 36px 0 rgba(102,126,234,0.18)' }}
                className="bg-black-200 dark:bg-midnight rounded-2xl shadow-xl border border-black-300 px-4 py-4 md:px-8 md:py-8 transition-all duration-300 w-full"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    {item.logo && (
                      <img src={item.logo} alt={item.title} className="w-10 h-10 rounded-md object-contain bg-white p-1 shadow" />
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-white-800 dark:text-white mb-1 md:mb-0">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-primary dark:text-lavender bg-primary/10 px-3 py-1 rounded-full">
                    {item.date}
                  </span>
                </div>
                <div className="text-base md:text-lg text-white-600 dark:text-neutral-300 font-medium mb-1">
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
                      className="text-white-600 dark:text-neutral-400 text-sm md:text-base"
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
