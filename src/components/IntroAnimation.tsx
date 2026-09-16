"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Safely register plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

const greetings = ["Hello", "नमस्ते", "Hii"];

export default function IntroAnimation({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let greetingTimer: NodeJS.Timeout;

    if (index < greetings.length - 1) {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 },
      );
      greetingTimer = setTimeout(() => setIndex((i) => i + 1), 180);
    } else {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 },
      );

      greetingTimer = setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => onFinish && onFinish(),
        });

        tl.to([overlayRef.current, greetingRef.current], {
          duration: 1.8,
          y: "-100vh",
          ease: "power4.inOut",
        });

        // Use direct attribute animation as a safe fallback if MorphSVG fails
        const path = overlayRef.current?.querySelector("path");
        if (path) {
          try {
            tl.to(
              path,
              {
                duration: 1.8,
                morphSVG: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z",
                ease: "power4.inOut",
              },
              "<",
            );
          } catch {
            tl.to(
              path,
              {
                duration: 1.8,
                attr: { d: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z" },
                ease: "power4.inOut",
              },
              "<",
            );
          }
        }
      }, 300);
    }

    return () => clearTimeout(greetingTimer);
  }, [index, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-white overflow-hidden pointer-events-none"
    >
      <h1
        ref={greetingRef}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20 px-4 text-center"
        style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
      >
        {greetings[index]}
      </h1>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path fill="black" d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>
    </div>
  );
}
