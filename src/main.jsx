import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { CursorProvider } from './context/CursorContext'

// Always start at the top of the page — disable browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Glow-hover mouse tracking for cards
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.glow-hover, .metric-card, .grid-default-color');
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
}, { passive: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CursorProvider>
        <App />
      </CursorProvider>
    </ThemeProvider>
  </StrictMode>,
)
