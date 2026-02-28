import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section className="relative c-space section-spacing" id="work" aria-label="Projects">
      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        My Selected Projects
      </motion.h2>
      <div className="flex flex-col gap-4 md:gap-6 mt-12">
        {myProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
          >
            <Project {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
