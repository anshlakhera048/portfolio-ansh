import { useEffect, useRef } from "react";
import { useCursorSubscribe } from "../context/CursorContext";
import { useTheme } from "../context/ThemeContext";

/**
 * CursorLight — A full-page ambient glow that follows the cursor.
 * Uses a large radial gradient that subtly illuminates the background.
 * No re-renders — pure DOM manipulation via subscription.
 */
export default function CursorLight() {
  const ref = useRef(null);
  const { theme } = useTheme();

  useCursorSubscribe((pos) => {
    if (!ref.current) return;
    ref.current.style.background = `radial-gradient(800px circle at ${pos.x * 100}% ${pos.y * 100}%, ${
      theme === "dark"
        ? "rgba(124, 58, 237, 0.04)"
        : "rgba(124, 58, 237, 0.025)"
    }, transparent 60%)`;
  });

  // Also handle theme changes for the gradient color
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.background = `radial-gradient(800px circle at 50% 50%, ${
      theme === "dark"
        ? "rgba(124, 58, 237, 0.04)"
        : "rgba(124, 58, 237, 0.025)"
    }, transparent 60%)`;
  }, [theme]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
      aria-hidden="true"
      style={{
        willChange: "background",
        mixBlendMode: "screen",
      }}
    />
  );
}
