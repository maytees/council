"use client"
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  radial?: boolean;
  fadeOut?: boolean;
  [key: string]: any;
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  radial = false,
  fadeOut = false,
  ...props
}: DotPatternProps) {
  const id = useId();
  const maskId = useId();

  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.svg
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 2 }}
      aria-hidden="true"
      className={cn(
        "pointer-events-none -z-50 absolute inset-0 h-full w-full fill-neutral-400/80",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
        <mask id={maskId}>
          <radialGradient id={`${maskId}-gradient`}>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="100%" height="100%" fill={`url(#${maskId}-gradient)`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${id})`}
        mask={`url(#${maskId})`}
        style={radial ? {
          clipPath: "circle(55% at 50% 50%)"
        } : undefined}
      />
    </motion.svg>
  );
}

export default DotPattern;
