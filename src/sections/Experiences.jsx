import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import { motion } from "motion/react";
import SubsystemLabel from "../components/SubsystemLabel";

const Experiences = () => {
  return (
    <section className="relative c-space section-spacing" id="experiences" aria-label="Work experience">
      <SubsystemLabel id="experiences" />
      <motion.div
        className="flex items-center gap-4 mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-primary)", boxShadow: "0 0 8px var(--accent-primary)" }} />
        <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
          // professional history
        </p>
      </motion.div>
      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Work <span className="text-gradient">Experience</span>
      </motion.h2>
      <div className="flex flex-col gap-8 md:gap-8 mt-12">
        <Timeline data={experiences} cardGap="gap-8 md:gap-8" />
      </div>
    </section>
  );
};

export default Experiences;
