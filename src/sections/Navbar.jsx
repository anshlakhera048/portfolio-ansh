import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "motion/react";
import ThemeToggle from "../components/ThemeToggle";

function Navigation({ onLinkClick }) {
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experiences", "work", "contact"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav aria-label="Main navigation" role="navigation">
      <ul
        className={
          `nav-ul` +
          (theme === "light" ? " !bg-transparent !shadow-none !border-none !outline-none !backdrop-blur-none !rounded-none" : "")
        }
        role="menubar"
        style={theme === "light" ? {
          background: "none",
          boxShadow: "none",
          border: "none",
          outline: "none",
          filter: "none",
          WebkitBackdropFilter: "none",
          backdropFilter: "none",
          borderRadius: 0,
        } : {}}
      >
        {[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "work", label: "Work" },
          { id: "experiences", label: "Experience" },
          { id: "contact", label: "Contact" },
        ].map((item) => (
          <li className="nav-li" key={item.id} role="none">
            <a
              className={`nav-link transition-colors duration-200
                ${theme === "light"
                  ? activeSection === item.id
                    ? "text-gray-900 font-semibold bg-gray-100 rounded-md"
                    : "text-gray-700 hover:text-indigo-700"
                  : activeSection === item.id
                    ? "text-white font-semibold bg-white/10 rounded-md"
                    : "text-neutral-400 hover:text-white"}
              `}
              href={`#${item.id}`}
              onClick={handleClick}
              role="menuitem"
              tabIndex={0}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li className="nav-li" role="none">
          <a
            className={`nav-link transition-colors duration-200 ${theme === "light" ? "text-gray-700 hover:text-indigo-700" : "text-neutral-400 hover:text-white"}`}
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
      className={`fixed inset-x-0 z-50 w-full transition-colors duration-300
        ${theme === "light"
          ? "bg-white border-b border-gray-200 shadow"
          : "backdrop-blur-lg bg-primary/40 border-b border-[#23263a] shadow-lg"}
        text-gray-900 dark:text-neutral-400`
      }
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className={`text-lg sm:text-xl font-bold transition-colors
              ${theme === "light" ? "text-gray-900 hover:text-indigo-700" : "text-neutral-400 hover:text-white"}`}
          >
            Ansh
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex cursor-pointer focus:outline-none sm:hidden
                ${theme === "light" ? "text-gray-700 hover:text-indigo-700" : "text-neutral-400 hover:text-white"}`}
            >
              <img
                src={
                  theme === "light"
                    ? isOpen
                      ? "assets/close-dark.svg"
                      : "assets/menu-dark.svg"
                    : isOpen
                      ? "assets/close.svg"
                      : "assets/menu.svg"
                }
                className="w-6 h-6"
                alt="toggle"
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
