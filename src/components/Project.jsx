
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import ProjectDetails from "./ProjectDetails";


const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme ? useTheme() : { theme: 'light' };
  return (
    <>
      <motion.div
        className="group relative flex flex-col md:flex-row items-stretch gap-6 md:gap-10 bg-black-200 dark:bg-midnight rounded-2xl shadow-xl border border-black-300 p-5 md:p-8 my-4 hover:shadow-2xl transition-all duration-300 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.18 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Project Image */}
        <motion.div
          className="relative w-full md:w-64 h-40 md:h-48 rounded-xl overflow-hidden shadow-lg border border-black-300 flex-shrink-0 mb-4 md:mb-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>
        {/* Project Content */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white-800 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-base md:text-lg text-white-600 dark:text-neutral-300 mb-3 line-clamp-2">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-lavender text-xs md:text-sm font-semibold shadow-sm border border-black-300"
                >
                  {tag.path && (tag.path.startsWith("/assets/") || tag.path.startsWith("data:image/svg+xml")) ? (
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-5 h-5 mr-1"
                    />
                  ) : null}
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setShowDetails(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold shadow hover:scale-105 hover:shadow-2xl transition-all duration-200"
            >
              Read More
              <img src="assets/arrow-right.svg" className="w-4 h-4" alt="Arrow right" />
            </button>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-lavender to-purple-400 text-white font-semibold shadow hover:scale-105 hover:shadow-2xl transition-all duration-200"
            >
              Visit Site
              <img src="assets/arrow-up.svg" className="w-4 h-4" alt="External link" />
            </a>
          </div>
        </div>
      </motion.div>
      {showDetails && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default Project;
