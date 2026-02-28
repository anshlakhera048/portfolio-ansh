import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ArrowUpIcon = ({ theme }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
    <path fill="none" stroke={theme === "light" ? "#222" : "#fff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
  </svg>
);

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  const { theme } = useTheme ? useTheme() : { theme: 'light' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto backdrop-blur-sm p-4 sm:p-6">
      <motion.div
        className="relative w-full max-w-2xl border shadow-xl rounded-2xl bg-gradient-to-br from-midnight via-navy to-storm border-white/10 my-auto"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0.18 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-md top-3 right-3 sm:top-5 sm:right-5 bg-midnight hover:bg-gray-500 z-10 shadow"
          aria-label="Close modal"
        >
          <img src="assets/close.svg" className="w-5 h-5 sm:w-6 sm:h-6" alt="Close" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl object-cover max-h-64" />
        <div className="p-4 sm:p-6">
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold text-white-800 dark:text-white">{title}</h5>
          <p className="mb-3 text-base sm:text-lg font-normal text-white-600 dark:text-neutral-300">{description}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            {subDescription.map((subDesc, index) => (
              <li key={index} className="text-white-600 dark:text-neutral-400 text-sm md:text-base">{subDesc}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-lavender text-xs md:text-sm font-semibold shadow-sm border border-black-300"
                >
                  {tag.path && tag.path.startsWith("/assets/") ? (
                    <img src={tag.path} alt={tag.name} className="w-5 h-5 mr-1" />
                  ) : null}
                  {tag.name}
                </span>
              ))}
            </div>
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-lavender to-purple-400 text-white font-semibold shadow hover:scale-105 hover:shadow-2xl transition-all duration-200"
            >
              View Project
              <ArrowUpIcon theme={theme} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
