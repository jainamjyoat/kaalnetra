"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

interface AnchorProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const circleVariants: Variants = {
  normal: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const lineVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [1, 0.2, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Anchor = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: AnchorProps) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.path
          d="M12 22V8"
          variants={lineVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M5 12H2a10 10 0 0 0 20 0h-3"
          variants={lineVariants}
          animate={controls}
          initial="normal"
        />
        <motion.circle
          cx="12"
          cy="5"
          r="3"
          variants={circleVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  );
};

export { Anchor };
