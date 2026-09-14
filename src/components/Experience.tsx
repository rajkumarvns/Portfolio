"use client";

import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import TextReveal from "./TextReveal";

const experiences = [
  {
    role: "Software Developer",
    company: "Raj Digital Pvt Ltd",
    duration: "August 2026 - Present",
    description:
      "Collaborating with a dynamic development team to create high-performance web applications, integrate features, and enhance user engagement through modern, scalable solutions.",
  },
  {
    role: "Web Development Learner",
    company: "Self Learning",
    duration: "2024 - Present",
    description:
      "Passionately exploring modern web technologies like HTML, CSS, JavaScript, React, and Node.js while building real-world projects that strengthen both frontend creativity and backend problem-solving skills.",
  },
  {
    role: "Aspiring Web Developer",
    company: "Open to Opportunities",
    duration: "2024 - Present",
    description:
      "Actively building projects using React, Node.js, Next.js, and JavaScript while improving problem-solving skills and preparing for software engineering roles.",
  },
];

interface ExperienceItemProps {
  exp: { role: string; company: string; duration: string; description: string };
  idx: number;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
  layout: string;
}

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout,
}: ExperienceItemProps) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0],
  );
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${exp.role}-${idx}`}
      >
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div
      key={`${exp.company}-${exp.role}-m-${idx}`}
      className="relative flex items-start"
    >
      <motion.div
        className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[85vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 100 * experiences.length * 1.6
    : 100 * experiences.length * 1.2;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: numExperiences },
        (_, i) => (i + 1) / numExperiences,
      ),
    [numExperiences],
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white ">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="shrink-0 px-4 sm:px-6 pt-6 sm:pt-8">
            <TextReveal
              text="Experience"
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 sm:mt-5 text-center justify-center"
            />
          </div>
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-8 sm:pb-10">
            <div className="relative w-full max-w-7xl hidden md:block">
              <div className="relative h-[6px] bg-white/10 rounded overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] rounded origin-left"
                  style={{
                    width: lineWidth,
                    boxShadow: "0 0 20px 2px rgba(28,216,210,0.6)",
                  }}
                />
              </div>
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            <div className="relative w-full max-w-md md:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/10 rounded overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-[#302b63] rounded origin-top"
                  style={{
                    height: lineHeight,
                    boxShadow: "0 0 20px 2px rgba(28,216,210,0.6)",
                  }}
                />
              </div>
              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
