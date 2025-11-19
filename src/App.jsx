import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

const App = () => {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden relative">
      <Navbar />
      <Hero />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <About />
        <Projects />
        <Experiences />
        {/* <Testimonial /> */}
        <Contact />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
