import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/40 w-full max-w-[100vw] left-0 right-0 overflow-hidden">
      <div className="relative h-screen overflow-hidden w-full max-w-[100vw]">
        {/* Background Sky */}
        <div
          className="absolute inset-0 -z-50 left-1/2 -translate-x-1/2"
          style={{
            width: "100vw",
            maxWidth: "100vw",
            height: "100vh",
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40 left-1/2 -translate-x-1/2"
          style={{
            width: "100vw",
            maxWidth: "100vw",
            height: "100vh",
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30 left-1/2 -translate-x-1/2"
          style={{
            width: "100vw",
            maxWidth: "100vw",
            height: "100vh",
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20 left-1/2 -translate-x-1/2"
          style={{
            width: "100vw",
            maxWidth: "100vw",
            height: "100vh",
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountaine Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10 left-1/2 -translate-x-1/2"
          style={{
            width: "100vw",
            maxWidth: "100vw",
            height: "100vh",
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;
