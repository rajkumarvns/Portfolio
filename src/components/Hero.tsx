"use client";

import React, { useState, useEffect, useMemo, forwardRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import ParticlesBackground from "./ParticlesBackground";
import Magnetic from "./Magnetic";

const socials = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raj-kumar-gupta-990093305/",
  },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/rajkumarvns" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const HeroAvatar = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative block min-h-[350px] lg:h-full w-full mt-8 lg:mt-0 flex items-center justify-center lg:justify-end"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none lg:right-[10px]"
        style={{
          width: "min(60vw, 410px)",
          height: "min(80vw, 760px)",
          borderRadius: "50%",
          filter: "blur(38px)",
          opacity: 0.32,
          background:
            "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
        }}
      />
      <motion.img
        src="/hero_avtar.png"
        alt="Software Developer avatar"
        className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-[-30px] object-contain select-none pointer-events-none w-[70vw] lg:w-[45vw] max-w-[400px] lg:max-w-[780px]"
        style={{
          maxHeight: "90vh",
          transform: "translateZ(50px)",
          zIndex: 20,
        }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />
    </motion.div>
  );
};

const Hero = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const roles = useMemo(() => ["Software Developer", "Web Developer"], []);
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    // typing effect logic
    useEffect(() => {
      const current = roles[index];
      const timeout = setTimeout(
        () => {
          if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
          else if (!deleting && subIndex === current.length)
            setTimeout(() => setDeleting(true), 1200);
          else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
          else if (deleting && subIndex === 0) {
            setDeleting(false);
            setIndex((p) => (p + 1) % roles.length);
          }
        },
        deleting ? 40 : 60,
      ); // original typing speed
      return () => clearTimeout(timeout);
    }, [subIndex, deleting, index, roles]);

    return (
      <section
        ref={ref}
        id="home"
        className="md:h-screen h-auto pt-25 w-full relative overflow-hidden bg-black"
      >
        <ParticlesBackground />

        {/* linear blobs */}
        <div className="absolute inset-0">
          <div
            className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2]
          opacity-30 sm:opacity-20 md:opacity-10 
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
          />
          <div
            className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[500px] max-h-[500px] 
          rounded-full 
          bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
          opacity-40 sm:opacity-30 
          blur-[100px] sm:blur-[130px] md:blur-[150px] 
          animate-pulse delay-500"
          />
        </div>

        <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* left */}
          <motion.div
            className="flex flex-col justify-center h-full text-center lg:text-left relative py-8 lg:py-0"
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full lg:pr-24 mx-auto max-w-7xl">
              {/* typing text */}
              <motion.div
                className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span>{roles[index].substring(0, subIndex)}</span>
                <span
                  className="inline-block w-0.5 ml-1 bg-white animate-pulse align-middle"
                  style={{ height: "1em" }}
                />
              </motion.div>

              {/* name */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Hello, I&apos;m
                <br />
                <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                  Raj Kumar Gupta
                </span>
              </motion.h1>

              {/* description */}
              <motion.p
                className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                I turn complex ideas into seamless, high-impact web experiences
                — building modern, scalable, and lightning-fast applications
                that make a difference.
              </motion.p>

              {/* buttons */}
              <motion.div
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Magnetic>
                  <a
                    href="#projects"
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-base sm:text-lg font-medium text-white text-center
                  bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]
                  shadow-lg hover:scale-105 transition-all block"
                  >
                    View My Work
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/Raj_Gupta9.pdf"
                    download
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-base sm:text-lg font-medium text-black bg-white text-center
                  hover:bg-gray-200 shadow-lg hover:scale-105 transition-all block"
                  >
                    My Resume
                  </a>
                </Magnetic>
              </motion.div>

              {/* socials */}
              <motion.div
                className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {socials.map(({ Icon, label, href }) => (
                  <Magnetic key={label} pull={0.4}>
                    <motion.a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={glowVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="text-gray-300 block p-2"
                    >
                      <Icon />
                    </motion.a>
                  </Magnetic>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* right */}
          <HeroAvatar />
        </div>
      </section>
    );
  },
);

Hero.displayName = "Hero";

export default Hero;
