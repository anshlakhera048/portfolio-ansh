import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section className="relative c-space section-spacing mt-28" id="work" aria-label="Projects">
      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Projects Section
      </motion.h2>
      <div className="flex flex-col gap-4 md:gap-4 mt-12">
        {myProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
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
