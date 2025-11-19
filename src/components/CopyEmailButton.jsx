import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "anshlakhera048@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
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
            <img src="assets/copy-done.svg" className="w-4 h-4 sm:w-5 sm:h-5" alt="copy Icon" />
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
            <img src="assets/copy.svg" className="w-4 h-4 sm:w-5 sm:h-5" alt="copy icon" />
            <span className="text-xs sm:text-sm">Copy Email Address</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
