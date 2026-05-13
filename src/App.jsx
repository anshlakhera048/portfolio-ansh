
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import SystemDashboard from "./sections/SystemDashboard";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import TerminalSection from "./sections/TerminalSection";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import CursorLight from './components/CursorLight';
import SystemHUD from './components/SystemHUD';
import LiveCodeSurface from './components/LiveCodeSurface';
import { SectionDivider, CinematicSection } from './components/MotionPrimitives';
import { SignalPulse, TelemetryTicker } from './components/ComputationalMotion';

const App = () => {
  return (
    <PageTransition>
      <div className="w-full max-w-[100vw] overflow-x-hidden relative">
        {/* ── Atmospheric layers ── */}
        <CursorLight />
        <SystemHUD />

        {/* ── Ambient code surfaces (visible on edges) ── */}
        <div className="fixed inset-0 pointer-events-none z-[1] hidden xl:block" aria-hidden="true">
          <LiveCodeSurface position="left" speed={90} />
          <LiveCodeSurface position="right" speed={110} />
        </div>

        <Navbar />
        <Hero />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden relative z-10">
          {/* Telemetry ticker — ambient data flow */}
          <div className="py-4 hidden sm:block">
            <TelemetryTicker />
          </div>
          <SignalPulse />
          <CinematicSection parallaxSpeed={0.2}>
            <SystemDashboard />
          </CinematicSection>
          <SignalPulse />
          <CinematicSection parallaxSpeed={0.25}>
            <About />
          </CinematicSection>
          <SectionDivider />
          <CinematicSection parallaxSpeed={0.3}>
            <Projects />
          </CinematicSection>
          <SignalPulse />
          <CinematicSection parallaxSpeed={0.2}>
            <Experiences />
          </CinematicSection>
          <SectionDivider />
          <CinematicSection parallaxSpeed={0.15}>
            <TerminalSection />
          </CinematicSection>
          <SignalPulse />
          <CinematicSection parallaxSpeed={0.2}>
            <Contact />
          </CinematicSection>
        </div>
        <Footer/>
        <ScrollToTop />
      </div>
    </PageTransition>
  );
};

export default App;
