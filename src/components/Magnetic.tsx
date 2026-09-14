"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({
  children,
  stiffness = 150,
  damping = 15,
  mass = 0.5,
  pull = 0.3,
  className = "inline-block",
}: {
  children: React.ReactNode;
  stiffness?: number;
  damping?: number;
  mass?: number;
  pull?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply magnetic effect on devices with a mouse pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * pull, y: middleY * pull });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      className={className}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness, damping, mass }}
    >
      {children}
    </motion.div>
  );
}
