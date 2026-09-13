"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NoiseOverlay() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
      animate={{
        backgroundPosition: ["0px 0px", "10px 10px", "-10px -10px", "0px 0px"],
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
      }}
    />
  );
}
