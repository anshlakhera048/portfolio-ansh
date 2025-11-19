import { motion } from "motion/react";
const Card = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 cursor-grab"
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      alt="Technology logo"
    />
  ) : (
    <motion.div
      className="absolute px-1 py-2 sm:py-4 text-sm sm:text-base md:text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[8rem] sm:w-[10rem] md:w-[12rem] cursor-grab"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Card;
