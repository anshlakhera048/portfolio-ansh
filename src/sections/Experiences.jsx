import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import { motion } from "framer-motion";

const Experiences = () => {
  return (
    <section className="relative c-space section-spacing mt-28" id="experiences" aria-label="Work experience">
      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Work Experience
      </motion.h2>
      <div className="flex flex-col gap-8 md:gap-8 mt-12">
        <Timeline data={experiences} cardGap="gap-8 md:gap-8" />
      </div>
    </section>
  );
};

export default Experiences;
