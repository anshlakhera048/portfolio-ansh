import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import { motion } from "framer-motion";

const Experiences = () => {
  return (
    <section className="relative c-space section-spacing w-full" id="experiences" aria-label="Work experience">
      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Work Experience
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="w-full mt-12 px-4 sm:px-0"
      >
        <Timeline data={experiences} />
      </motion.div>
    </section>
  );
};

export default Experiences;
