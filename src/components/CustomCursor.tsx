"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.ontouchstart !== undefined);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't track cursor on mobile

    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => window.removeEventListener("mousemove", moveHandler);
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-9999 hidden md:block"
        style={{
          transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-80 blur-3xl"></div>
      </div>
    </>
  );
}
