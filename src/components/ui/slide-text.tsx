"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const SlideText = ({
  text,
  className = "",
  direction = "up",
  duration = 0.5,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      className={`${className}`}
    >
      {text}
    </motion.div>
  );
};

export default SlideText;
