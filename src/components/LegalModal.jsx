import { useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const CONTENT = {
  terms: {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "1. General",
        body: "This portfolio website (anshlakhera.dev) is a personal project created solely for informational and professional showcase purposes. By accessing this site, you agree to these terms.",
      },
      {
        heading: "2. Intellectual Property",
        body: "All content on this website — including code samples, project descriptions, design elements, and written text — is the intellectual property of Ansh Lakhera unless otherwise credited. You may not reproduce, redistribute, or use any content commercially without explicit written permission.",
      },
      {
        heading: "3. Third-Party Links",
        body: "This site contains links to external platforms (GitHub, LinkedIn, Instagram, project demos). These are provided for convenience only. I am not responsible for the content, availability, or privacy practices of any third-party site.",
      },
      {
        heading: "4. No Warranty",
        body: "This website is provided \"as is\" without any warranties of any kind. Information about projects and experience is accurate to the best of my knowledge but may become outdated. I reserve the right to modify or remove content at any time.",
      },
      {
        heading: "5. Contact Form",
        body: "Messages submitted via the contact form are delivered to my personal email using EmailJS. By submitting a message, you confirm that your communication is professional and respectful. I am under no obligation to respond to every inquiry.",
      },
      {
        heading: "6. Changes",
        body: "These terms may be updated at any time without prior notice. Continued use of this site constitutes acceptance of any changes.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. Data I Collect",
        body: "This site does not use cookies, analytics trackers, or any form of user tracking. The only data collected is what you voluntarily submit via the contact form: your name, email address, and message.",
      },
      {
        heading: "2. How Your Data Is Used",
        body: "Contact form submissions are processed by EmailJS and delivered directly to my personal email inbox. Your data is used solely to respond to your message. It is never sold, shared, or used for marketing.",
      },
      {
        heading: "3. Data Storage",
        body: "I do not store contact form submissions in any database. EmailJS may retain message metadata according to their own privacy policy (emailjs.com/legal/privacy-policy). I recommend reviewing it if you have concerns.",
      },
      {
        heading: "4. Third-Party Services",
        body: "This site loads fonts from Google Fonts and 3D assets via Three.js. These services may log standard HTTP request data (IP address, user agent) per their own privacy policies. No personally identifiable information is shared with them.",
      },
      {
        heading: "5. Your Rights",
        body: "If you have submitted a message and would like it deleted or have any privacy-related questions, contact me directly at the email provided via the contact form and I will respond promptly.",
      },
      {
        heading: "6. Updates",
        body: "This privacy policy may be updated occasionally. The latest version is always available on this page.",
      },
    ],
  },
};

const LegalModal = memo(function LegalModal({ type, onClose }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const content = CONTENT[type];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!content) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className={[
            "relative z-10 w-full sm:max-w-xl sm:rounded-2xl rounded-t-2xl rounded-b-none sm:rounded-b-2xl",
            "max-h-[85vh] flex flex-col overflow-hidden",
            "border",
            isDark
              ? "bg-[#0e0f1f] border-white/10"
              : "bg-white border-neutral-200",
          ].join(" ")}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Header */}
          <div
            className={[
              "flex items-center justify-between px-6 py-4 border-b shrink-0",
              isDark ? "border-white/10" : "border-neutral-100",
            ].join(" ")}
          >
            <h2
              id="legal-modal-title"
              className={[
                "text-base font-bold tracking-tight",
                isDark ? "text-white" : "text-neutral-900",
              ].join(" ")}
            >
              {content.title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={[
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender",
                isDark
                  ? "text-neutral-400 hover:text-white hover:bg-white/10"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100",
              ].join(" ")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h3
                  className={[
                    "text-xs font-semibold uppercase tracking-widest mb-1.5",
                    isDark ? "text-lavender" : "text-indigo-600",
                  ].join(" ")}
                >
                  {section.heading}
                </h3>
                <p
                  className={[
                    "text-sm leading-relaxed",
                    isDark ? "text-neutral-300" : "text-neutral-600",
                  ].join(" ")}
                >
                  {section.body}
                </p>
              </div>
            ))}

            <p
              className={[
                "text-xs pt-2 border-t",
                isDark
                  ? "text-neutral-500 border-white/10"
                  : "text-neutral-400 border-neutral-100",
              ].join(" ")}
            >
              Last updated: April 2026
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

export default LegalModal;
