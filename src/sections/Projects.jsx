import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "motion/react";
import SubsystemLabel from "../components/SubsystemLabel";

const Projects = () => {
  return (
    <section className="relative c-space section-spacing" id="work" aria-label="Projects">
      <SubsystemLabel id="projects" />
      <motion.div
        className="flex items-center gap-4 mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-primary)", boxShadow: "0 0 8px var(--accent-primary)" }} />
        <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
          // engineering output
        </p>
      </motion.div>
      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Selected <span className="text-gradient">Projects</span>
      </motion.h2>
      <motion.p
        className="subtext max-w-2xl mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Production-grade systems built with distributed architecture, event-driven patterns, and AI infrastructure.
      </motion.p>
      <div className="flex flex-col gap-4 md:gap-4 mt-12">
        {myProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <div className="w-full">
              <Project {...project} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
