<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light", savedTheme === "light");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.classList.toggle("light", defaultTheme === "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
=======
import { useEffect, useState } from "react";
import { ThemeContext, THEMES, DEFAULT_THEME } from "./theme-context";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("newui-theme-v2");
      return THEMES.includes(saved) ? saved : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("newui-theme-v2", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
