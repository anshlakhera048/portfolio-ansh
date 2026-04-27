import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const PLATFORM_META = {
  linkedin: {
    label: "LinkedIn",
    accent: "#0A66C2",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  github: {
    label: "GitHub",
    accent: "#7a57db",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    accent: "#E1306C",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
};

const FALLBACK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='48' fill='%237a57db' opacity='0.2'/%3E%3Ctext x='48' y='56' text-anchor='middle' font-size='36' fill='%237a57db'%3E%3F%3C/text%3E%3C/svg%3E";

const handleAvatarError = (e) => {
  e.currentTarget.src = FALLBACK_AVATAR;
};

const SocialCard = memo(function SocialCard({ platform, url, avatar, handle, index, isDark }) {
  const meta = PLATFORM_META[platform.toLowerCase()];
  if (!meta) return null;
  const { label, accent, icon } = meta;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${label} profile`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={[
        "group flex flex-col items-center gap-3 px-3 py-5 sm:px-5 sm:py-6",
        "rounded-2xl border transition-all duration-300 cursor-pointer no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isDark
          ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 shadow-sm hover:shadow-md"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 shadow-md hover:shadow-lg",
      ].join(" ")}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={avatar}
          alt={`${label} profile photo`}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover transition-all duration-300"
          style={{ outline: `2px solid ${accent}40`, outlineOffset: "2px" }}
          loading="lazy"
          onError={handleAvatarError}
        />
        {/* Platform badge */}
        <span
          className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: accent,
            boxShadow: isDark ? "0 0 0 2px rgba(255,255,255,0.1)" : "0 0 0 2px rgba(0,0,0,0.08)",
          }}
          aria-hidden="true"
        >
          <span className="text-white">{icon}</span>
        </span>
      </div>

      {/* Platform name */}
      <div
        className={[
          "flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200",
          isDark ? "text-neutral-200 group-hover:text-white" : "text-neutral-700 group-hover:text-neutral-900",
        ].join(" ")}
      >
        <span style={{ color: accent }}>{icon}</span>
        <span>{label}</span>
      </div>

      {/* Handle */}
      <p className={["text-xs font-mono tracking-tight", isDark ? "text-neutral-400" : "text-neutral-500"].join(" ")}>
        {handle}
      </p>

      {/* CTA */}
      <span
        className="mt-1 px-4 py-1.5 text-xs font-semibold rounded-lg text-white transition-all duration-200
          group-hover:brightness-110 group-hover:scale-105"
        style={{ backgroundColor: accent }}
      >
        {platform.toLowerCase() === "linkedin" ? "Connect" : "Follow"}
      </span>
    </motion.a>
  );
});

const ContactProfileCard = memo(function ContactProfileCard({ profiles }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {profiles.map((profile, i) => (
          <SocialCard key={profile.platform} {...profile} index={i} isDark={isDark} />
        ))}
      </div>
    </div>
  );
});

export default ContactProfileCard;
