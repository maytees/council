"use client";
import { motion } from "motion/react";

const SlideWrapper = ({
  children,
  className = "",
  duration = 0.5,
  delay = 0,
  distance = 50,
  direction = "up",
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  return (
    <motion.div
      initial={{ ...getInitialPosition(), opacity: 0 }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideWrapper;
