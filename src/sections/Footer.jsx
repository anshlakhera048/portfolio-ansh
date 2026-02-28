import { mySocials } from "../constants";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
const Footer = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);
    const handler = (e) => setIsDark(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

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
    <footer className="w-full max-w-[100vw] flex flex-col items-center justify-center gap-4 pb-3 text-xs sm:text-sm text-neutral-400 bg-transparent" aria-label="Footer">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-5">
        <div
          className={
            `mb-4 h-[1px] w-full ` +
            (isDark
              ? 'bg-gradient-to-r from-transparent via-neutral-700 to-transparent'
              : 'bg-gradient-to-r from-transparent via-neutral-100/0 via-neutral-300 via-neutral-100/0')
          }
        />
        <nav className="flex gap-2 items-center" aria-label="Footer links">
          <a href="#terms" className="hover:text-white transition-colors underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-sm">Terms & Conditions</a>
          <span>|</span>
          <a href="#privacy" className="hover:text-white transition-colors underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-sm">Privacy Policy</a>
        </nav>
        <div className="flex gap-3" aria-label="Social links">
          {mySocials.map((social, index) => {
            // Inline SVG (base64 or file)
            const aStyle = {
              width: '1.25rem',
              height: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#fff' : '#111',
            };
            if (social.icon.startsWith('data:image/svg+xml')) {
              const svg = decodeBase64Svg(social.icon);
              if (svg) {
                // Replace all fill attributes with fill="currentColor"
                const svgWithCurrentColor = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
                return (
                  <a
                    href={social.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"
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
                    className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"
                    aria-label={social.name}
                    style={aStyle}
                    dangerouslySetInnerHTML={{ __html: svgWithCurrentColor }}
                  />
                );
              } else {
                // fallback to img while loading
                return (
                  <img
                    key={index}
                    src={social.icon}
                    style={{ width: '1.25rem', height: '1.25rem', filter: isDark ? 'invert(1) brightness(2) contrast(2)' : 'invert(0) brightness(0)' }}
                    alt={social.name}
                  />
                );
              }
            }
            // PNG or other
            return (
              <img
                key={index}
                src={social.icon}
                style={{ width: '1.25rem', height: '1.25rem', filter: isDark ? 'invert(1) brightness(2) contrast(2)' : 'invert(0) brightness(0)' }}
                alt={social.name}
              />
            );
          })}
        </div>
        <p className="text-center sm:text-left">© 2026 Ansh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
