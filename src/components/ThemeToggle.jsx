import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex-shrink-0 w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300"
      style={{
        background: isDark ? "rgba(124,58,237,0.18)" : "rgba(124,58,237,0.25)",
        border: `1px solid ${isDark ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.5)"}`,
      }}
      whileTap={{ scale: 0.93 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center shadow-md"
        animate={{ x: isDark ? 0 : 22 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ background: isDark ? "#1E1E35" : "#ffffff" }}
      >
        {isDark ? (
          /* Moon icon */
          <svg className="w-3 h-3" fill="#8B5CF6" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          /* Sun icon */
          <svg className="w-3 h-3" fill="#F59E0B" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
