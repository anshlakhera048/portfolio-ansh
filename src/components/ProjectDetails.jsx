import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto backdrop-blur-sm p-4 sm:p-6">
      <motion.div
        className="relative w-full max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-3 right-3 sm:top-5 sm:right-5 bg-midnight hover:bg-gray-500 z-10"
          aria-label="Close modal"
        >
          <img src="assets/close.svg" className="w-5 h-5 sm:w-6 sm:h-6" alt="Close" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <div className="p-4 sm:p-6">
          <h5 className="mb-2 text-xl sm:text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 text-sm sm:text-base font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 text-sm sm:text-base font-normal text-neutral-400">{subDesc}</p>
          ))}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg w-8 h-8 sm:w-10 sm:h-10 hover-animation"
                />
              ))}
            </div>
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm sm:text-base font-medium cursor-pointer hover-animation"
            >
              View Project{" "}
              <img src="assets/arrow-up.svg" className="w-3 h-3 sm:w-4 sm:h-4" alt="External link" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
