import { useEffect, useState } from "react";
import { ThemeContext, THEMES, DEFAULT_THEME } from "./theme-context";

export function ThemeProvider({ children }) {
  // every visit starts on cyberpunk — the first impression is the point
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
