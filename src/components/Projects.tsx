"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";

const projects = [
  {
    title: "ACIE",
    link: "https://nav-kalpana.vercel.app/",
    github: "https://github.com/rajkumarvns",
    description:
      "An advanced comprehensive interactive environment. Engineered with modern web technologies to deliver seamless performance, deep integrations, and an intuitive user interface.",
    image: "/acie_live.png",
  },
  {
    title: "Cravings",
    link: "https://raj-cravings.netlify.app/",
    github: "https://github.com/rajkumarvns",
    description:
      "A highly responsive restaurant and food delivery application. Features real-time cart updates, beautiful UI animations, and a seamless checkout experience.",
    image: "/cravings_live.png",
  },
  {
    title: "RWave",
    link: "https://rwave-chat-app.vercel.app",
    github: "https://github.com/rajkumarvns",
    description:
      "A real-time chat application built for instant communication. Incorporates websockets for live messaging, user authentication, and a sleek, dark-themed responsive design.",
    image: "/rwave_live.png",
  },
];

export default function Projects() {
  const containerRef = React.useRef(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0a0a0a] text-white py-24 sm:py-32"
    >
      {/* Premium Background / Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#1CD8D2]/20 to-[#302b63]/20 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#00bf8f]/10 to-[#1CD8D2]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-[#1CD8D2] font-semibold tracking-widest uppercase text-sm mb-3">
            Things I&apos;ve Built
          </p>
          <TextReveal
            text="Projects"
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
          />
        </div>

        {/* Cards Stack Container */}
        <div className="relative flex flex-col gap-12 sm:gap-16 pb-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectType {
  title: string;
  link: string;
  github: string;
  description: string;
  image: string;
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire section to know when to scale down this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Calculate dynamic sticky top based on index
  const stickyTop = `calc(12vh + ${index * 30}px)`;

  // As we scroll past this card, it scales down and fades slightly to create depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Parallax scale for the image
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <motion.div
      ref={cardRef}
      className="sticky w-full"
      style={{ top: stickyTop, scale, opacity }}
    >
      <motion.div
        className="group relative w-full rounded-3xl overflow-hidden bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px]"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Left: Image */}
        <div className="relative w-full md:w-3/5 h-64 sm:h-80 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
          <motion.div
            style={{ scale: imageScale }}
            className="w-full h-full relative rounded-xl overflow-hidden shadow-[0_0_40px_rgba(28,216,210,0.15)] border border-white/10"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover sm:object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-2/5 p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-br from-[#111] to-[#0a0a0a]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              {project.title}
            </h3>
            <span className="text-2xl font-mono text-white/20 font-bold">
              0{index + 1}
            </span>
          </div>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-4">
            <Magnetic>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
              >
                <span>Live Demo</span>
                <FiExternalLink />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <span>GitHub</span>
                <FaGithub />
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
