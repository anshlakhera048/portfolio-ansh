import { createContext, useContext, useEffect, useRef, useCallback } from "react";

const CursorContext = createContext({ x: 0.5, y: 0.5 });

/**
 * Provides normalized cursor position (0-1 range) across the viewport.
 * Uses a ref to avoid re-renders — consumers should useRef or subscribe.
 */
export function CursorProvider({ children }) {
  const pos = useRef({ x: 0.5, y: 0.5 });
  const listeners = useRef(new Set());

  useEffect(() => {
    const handleMove = (e) => {
      pos.current.x = e.clientX / window.innerWidth;
      pos.current.y = e.clientY / window.innerHeight;
      // Notify subscribers without triggering React re-renders
      listeners.current.forEach((fn) => fn(pos.current));
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <CursorContext.Provider value={{ pos, listeners }}>
      {children}
    </CursorContext.Provider>
  );
}

/**
 * Subscribe to cursor position updates. Returns a ref with { x, y }.
 * Does NOT cause re-renders — uses subscription pattern.
 */
export function useCursorPosition() {
  const { pos } = useContext(CursorContext);
  return pos;
}

/**
 * Subscribe to cursor movement with a callback (no re-renders).
 */
export function useCursorSubscribe(callback) {
  const { listeners } = useContext(CursorContext);

  useEffect(() => {
    listeners.current.add(callback);
    return () => listeners.current.delete(callback);
  }, [callback, listeners]);
}
