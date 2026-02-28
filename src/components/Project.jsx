
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import ProjectDetails from "./ProjectDetails";

const ArrowRightIcon = ({ theme }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="w-4 h-4">
    <path fill={theme === "light" ? "#222" : "#fff"} fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8" clipRule="evenodd"/>
  </svg>
);

const ArrowUpIcon = ({ theme }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
    <path fill="none" stroke={theme === "light" ? "#222" : "#fff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
  </svg>
);

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
                  style={{ minWidth: 0 }}
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
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="flex flex-row gap-3 w-full max-[400px]:flex-col">
                <div className="flex flex-row gap-3 w-full flex-nowrap">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold shadow hover:scale-105 hover:shadow-2xl transition-all duration-200 w-auto text-sm sm:text-base"
                  >
                    Read More
                    <ArrowRightIcon theme={theme} />
                  </button>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-lavender to-purple-400 text-white font-semibold shadow hover:scale-105 hover:shadow-2xl transition-all duration-200 w-auto text-sm sm:text-base"
                  >
                    Visit Site
                    <ArrowUpIcon theme={theme} />
                  </a>
                </div>
              </div>
            </div>
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
