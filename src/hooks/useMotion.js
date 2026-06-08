import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for smooth scroll-linked progress value.
 * Returns a value between 0-1 representing scroll progress of an element.
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Progress: 0 when element enters viewport, 1 when it exits
      const start = windowHeight;
      const end = -elementHeight;
      const current = elementTop;
      const p = 1 - (current - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, p)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

/**
 * Hook that returns whether reduced motion is preferred.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * Hook for magnetic hover effect on an element.
 * Returns handlers to attach to the element.
 */
export function useMagneticHover(strength = 0.3) {
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setStyle({ transform: `translate(${deltaX}px, ${deltaY}px)` });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: "translate(0px, 0px)", transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" });
  }, []);

  return { style, handleMouseMove, handleMouseLeave };
}

/**
 * Hook for viewport visibility detection with threshold.
 */
export function useInView(ref, threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

/**
 * Smooth parallax value for an element — returns a transform offset
 * based on scroll position. speed > 1 = faster, < 1 = slower.
 */
export function useParallax(ref, speed = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!ref.current) { ticking = false; return; }
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const delta = (center - viewCenter) * speed * 0.1;
        setOffset(delta);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed]);

  return offset;
}

/**
 * Cinematic depth scroll — returns scale, opacity, and blur for a section
 * as it enters/exits the viewport, creating a "depth zoom" effect.
 */
export function useCinematicScroll(ref) {
  const [state, setState] = useState({ scale: 1, opacity: 1, blur: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!ref.current) { ticking = false; return; }
        const rect = ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 = below viewport, 0.5 = centered, 1 = above viewport
        const progress = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
        const clamped = Math.max(0, Math.min(1, progress));

        // Entry phase (0 to 0.2): fade up + scale up
        // Active phase (0.2 to 1): fully visible
        // Exit phase: removed opacity fade to prevent premature dimming
        let scale = 1, opacity = 1, blur = 0, y = 0;

        if (clamped < 0.2) {
          const t = clamped / 0.2;
          scale = 0.96 + t * 0.04;
          opacity = t;
          y = (1 - t) * 30;
        }

        setState({ scale, opacity, blur, y });
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return state;
}

/**
 * Global scroll progress (0 to 1) for the full page.
 */
export function useGlobalScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
