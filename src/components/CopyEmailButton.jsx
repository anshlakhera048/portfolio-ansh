
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme ? useTheme() : { theme: "light" };
  const email = "anshlakhera048@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // SVGs with theme-aware stroke color
  const copyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 512 512"
      className="w-4 h-4 sm:w-5 sm:h-5"
    >
      <rect
        width="336"
        height="336"
        x="128"
        y="128"
        fill="none"
        stroke={theme === "light" ? "#222" : "#fff"}
        strokeLinejoin="round"
        strokeWidth="32"
        rx="57"
        ry="57"
      />
      <path
        fill="none"
        stroke={theme === "light" ? "#222" : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
      />
    </svg>
  );

  const copyDoneIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className="w-4 h-4 sm:w-5 sm:h-5"
    >
      <g
        fill="none"
        stroke={theme === "light" ? "#222" : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
        <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14l2 2l4-4" />
      </g>
    </svg>
  );

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className="relative px-3 sm:px-1 py-3 sm:py-4 text-xs sm:text-sm text-center rounded-full font-extralight bg-primary w-full sm:w-[12rem] max-w-[12rem] cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            {copyDoneIcon}
            <span className="text-xs sm:text-sm">Email has Copied</span>
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {copyIcon}
            <span className="text-xs sm:text-sm">Copy Email Address</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
