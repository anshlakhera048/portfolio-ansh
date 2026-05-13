import { mySocials } from "../constants";
import { useCallback } from "react";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import LegalModal from "../components/LegalModal";
const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [legalModal, setLegalModal] = useState(null);

  // Helper to decode base64 SVGs
  const decodeBase64Svg = useCallback((dataUrl) => {
    try {
      const base64 = dataUrl.split(',')[1];
      const decoded = atob(base64);
      return decoded;
    } catch {
      return null;
    }
  }, []);

  // Helper to fetch and inline SVGs from public folder
  const [svgCache, setSvgCache] = useState({});
  const isMounted = useRef(true);
  useEffect(() => { isMounted.current = true; return () => { isMounted.current = false; }; }, []);
  useEffect(() => {
    mySocials.forEach((social) => {
      if (social.icon.endsWith('.svg') && !social.icon.startsWith('data:') && !svgCache[social.icon]) {
        fetch(social.icon)
          .then(res => res.text())
          .then(svg => { if (isMounted.current) setSvgCache(c => ({ ...c, [social.icon]: svg })); });
      }
    });
  }, [svgCache]);

  return (
    <footer className="w-full max-w-[100vw] bg-transparent py-8" style={{ color: "var(--txt-muted)" }} aria-label="Footer">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Divider */}
        <div
          className="h-[1px] w-full mb-6"
          style={{ background: 'var(--border-default)' }}
        />
        {/* Footer content row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Legal links */}
          <nav className="flex gap-3 items-center text-sm" aria-label="Footer links">
            <button
              onClick={() => setLegalModal("terms")}
              className="transition-colors duration-200 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-teal rounded-sm cursor-pointer"
              style={{ color: "var(--txt-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--txt-secondary)'}
            >
              Terms &amp; Conditions
            </button>
            <span style={{ color: "var(--txt-muted)" }}>·</span>
            <button
              onClick={() => setLegalModal("privacy")}
              className="transition-colors duration-200 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-teal rounded-sm cursor-pointer"
              style={{ color: "var(--txt-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--txt-secondary)'}
            >
            Privacy Policy
          </button>
        </nav>
          {/* Social icons */}
          <div className="flex gap-3 items-center" aria-label="Social links">
          {mySocials.map((social, index) => {
            // Inline SVG (base64 or file)
            const aStyle = {
              width: '1.25rem',
              height: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--txt-secondary)',
            };
            if (social.icon.startsWith('data:image/svg+xml')) {
              const svg = decodeBase64Svg(social.icon);
              if (svg) {
                const svgWithCurrentColor = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
                return (
                  <a
                    href={social.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal rounded-full"
                    aria-label={social.name}
                    style={aStyle}
                    dangerouslySetInnerHTML={{ __html: svgWithCurrentColor }}
                  />
                );
              }
            }
            if (social.icon.endsWith('.svg')) {
              const svg = svgCache[social.icon];
              if (svg) {
                const svgWithCurrentColor = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
                return (
                  <a
                    href={social.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal rounded-full"
                    aria-label={social.name}
                    style={aStyle}
                    dangerouslySetInnerHTML={{ __html: svgWithCurrentColor }}
                  />
                );
              } else {
                return (
                  <img
                    key={index}
                    src={social.icon}
                    style={{ width: '1.25rem', height: '1.25rem', filter: isDark ? 'invert(1) brightness(2)' : 'invert(0.35)' }}
                    alt={social.name}
                  />
                );
              }
            }
            return (
              <img
                key={index}
                src={social.icon}
                style={{ width: '1.25rem', height: '1.25rem', filter: isDark ? 'invert(1) brightness(2)' : 'invert(0.35)' }}
                alt={social.name}
              />
            );
          })}
          </div>
          {/* Copyright */}
          <p className="text-xs" style={{ color: "var(--txt-muted)" }}>© 2026 Ansh. All rights reserved.</p>
        </div>
      </div>
      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </footer>
  );
};

export default Footer;
