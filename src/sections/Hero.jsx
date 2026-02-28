import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";

import { motion } from "framer-motion";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const isTablet = useMediaQuery({ minWidth: 854, maxWidth: 1024 });
  return (
    <section
      className="relative flex items-start justify-center min-h-screen overflow-hidden w-full max-w-[100vw] md:items-start md:justify-start c-space pt-16 sm:pt-20"
      id="home"
      aria-label="Hero section"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="z-20 w-full max-w-2xl"
      >
        <HeroText />
      </motion.div>
      <ParallaxBackground />
      <motion.figure
        className="absolute inset-0 pointer-events-none md:pointer-events-auto md:left-auto md:right-0 md:w-1/2 lg:w-2/5 w-full"
        style={{ height: "100vh", width: "100vw", maxWidth: "100vw" }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
        aria-hidden="true"
      >
        <Canvas 
          camera={{ position: [0, 1, 3] }}
          className="w-full h-full"
        >
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : isTablet ? 0.25 : 0.33}
                position={isMobile ? [0, -1.5, 0] : isTablet ? [1.5, -0.5, 0] : [0, 5, -0.5]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </motion.figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
