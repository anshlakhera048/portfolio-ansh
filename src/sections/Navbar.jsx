import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "motion/react";
import ThemeToggle from "../components/ThemeToggle";

const NAV_ITEMS = [
  { id: "home",        label: "Home"       },
  { id: "about",       label: "About"      },
  { id: "work",        label: "Work"       },
  { id: "experiences", label: "Experience" },
  { id: "terminal",    label: "Terminal"   },
  { id: "contact",     label: "Contact"    },
];

function Navigation({ onLinkClick }) {
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();
  const isLight = theme === "light";
  const activeColor = isLight ? "#7C3AED" : "#8B5CF6";
  const pillRef = useRef(null);
  const navRef = useRef(null);
  const activeItemRef = useRef(null);

  // ── IntersectionObserver-based scroll tracking ──────────────────
  useEffect(() => {
    const sectionIds = ["home", "about", "work", "experiences", "terminal", "contact"];
    const visibilityMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Find section with highest visibility ratio
        let maxRatio = 0;
        let maxSection = "home";
        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxSection = id;
          }
        });

        // Fallback: if at very top, force home
        if (window.scrollY < 100) {
          maxSection = "home";
        }
        // Fallback: if at very bottom, force contact
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
          maxSection = "contact";
        }

        setActiveSection(maxSection);
      },
      {
        // Multiple thresholds for precision — especially for tall sections
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-80px 0px -20% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Animated pill position tracking ─────────────────────────────
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updatePill = useCallback(() => {
    if (!activeItemRef.current || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = activeItemRef.current.getBoundingClientRect();
    setPillStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    updatePill();
  }, [activeSection, updatePill]);

  useEffect(() => {
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  const handleClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (onLinkClick) onLinkClick();
  };

  return (
    <nav aria-label="Main navigation" role="navigation">
      <ul ref={navRef} className="nav-ul relative" role="menubar">
        {/* Animated active pill */}
        <motion.div
          ref={pillRef}
          className="absolute bottom-0 h-[2px] rounded-full pointer-events-none"
          animate={{
            left: pillStyle.left,
            width: pillStyle.width,
            opacity: pillStyle.opacity,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)`,
            boxShadow: `0 0 8px ${activeColor}60`,
          }}
        />
        {NAV_ITEMS.map((item) => (
          <li className="nav-li" key={item.id} role="none">
            <a
              ref={activeSection === item.id ? activeItemRef : undefined}
              className={`nav-link transition-colors duration-200 ${activeSection === item.id ? "font-medium" : ""}`}
              href={`#${item.id}`}
              onClick={handleClick}
              role="menuitem"
              tabIndex={0}
              aria-current={activeSection === item.id ? "page" : undefined}
              style={activeSection === item.id ? { color: activeColor } : {}}
              onMouseEnter={(e) => { if (activeSection !== item.id) e.currentTarget.style.color = activeColor; }}
              onMouseLeave={(e) => { if (activeSection !== item.id) e.currentTarget.style.color = ""; }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: activeColor, boxShadow: `0 0 6px ${activeColor}` }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </a>
          </li>
        ))}
        <li className="nav-li" role="none">
          <a
            className="nav-link transition-colors duration-200"
            href="https://drive.google.com/file/d/1AxaJGhQI10XZJiPptxwBdm95o62TNr1F/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            tabIndex={0}
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <div
      className="fixed inset-x-0 z-50 w-full backdrop-blur-md border-b"
      style={{
        background: "var(--navbar-bg)",
        borderColor: "var(--navbar-border)",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-base font-semibold transition-colors duration-200 tracking-tight hover:opacity-80"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--txt-primary)",
            }}
          >
            ansh<span style={{ color: "var(--accent-primary)" }}>lakhera</span>.in
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer focus:outline-none sm:hidden"
              style={{ color: "var(--txt-secondary)" }}
            >
              <img
                src={
                  isOpen
                    ? (theme === "light" ? "assets/close-dark.svg" : "assets/close.svg")
                    : (theme === "light" ? "assets/menu-dark.svg"  : "assets/menu.svg")
                }
                className="w-6 h-6"
                alt="toggle menu"
              />
            </button>
            <nav className="hidden sm:flex w-full">
              <Navigation />
            </nav>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation onLinkClick={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
