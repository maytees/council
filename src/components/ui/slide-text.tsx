"use client";
import { motion } from "motion/react";
const SlideText = ({
  text,
  className = "",
  direction = "up",
  duration = 0.5,
  delay = 0,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    return {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      className={`${className}`}
    >
      {text}
    </motion.div>
  );
};

export default SlideText;
