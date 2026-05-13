import { motion, AnimatePresence } from "motion/react";
const Alert = ({ type, text }) => {
  const alertVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50 flex items-center justify-center bottom-5 right-5"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={alertVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className="items-center leading-none lg:rounded-full flex lg:inline-flex rounded-md p-4"
          style={{
            background: type === "danger" ? "rgba(248,81,73,0.15)" : "rgba(97,194,162,0.15)",
            border: `1px solid ${type === "danger" ? "rgba(248,81,73,0.3)" : "rgba(97,194,162,0.3)"}`,
            color: "var(--txt-primary)",
          }}
        >
          <p
            className="flex rounded-full uppercase px-2.5 py-1 text-xs font-semibold mr-3"
            style={{
              background: type === "danger" ? "rgba(248,81,73,0.25)" : "rgba(97,194,162,0.25)",
              color: type === "danger" ? "#f85149" : "var(--accent-primary)",
            }}
          >
            {type === "danger" ? "Failed" : "Success"}
          </p>
          <p className="mr-2 text-left text-sm" style={{ color: "var(--txt-secondary)" }}>{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
