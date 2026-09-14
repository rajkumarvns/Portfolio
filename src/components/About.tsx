"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Layered neon background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">

        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar / Card */}
          <motion.div
            className="relative w-80 h-[400px] md:w-64 md:h-[340px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border border-[#1CD8D2]/25"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
            <Image src="/raj_avatar.jpeg" alt="Raj Kumar Gupta" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </motion.div>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Raj Kumar Gupta
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Software Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I build scalable, modern applications with a strong focus on clean architecture, delightful UX, and performance. My toolkit spans Java, React, Node.js, Next.js, Tailwind CSS, and Python—bringing ideas to life from concept to production with robust APIs and smooth interfaces.
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Education", value: "B.Tech CSE (7.86 CGPA)" },
                { label: "Achievement", value: "SIH Internal Winner" },
                { label: "Dedication", value: "50+ Days LeetCode" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center flex flex-col justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-[15px] font-semibold text-white mt-1 leading-tight">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] block w-full sm:w-auto text-center"
                  aria-label="View my projects"
                >
                  View Projects
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition block w-full sm:w-auto text-center"
                  aria-label="Get in touch"
                >
                  Get in Touch
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        {/* Body copy only */}
        <div className="grid md:grid-cols-1">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <TextReveal 
              text="About Me" 
              className="text-2xl sm:text-3xl font-bold text-white mb-3" 
            />
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              I’m a Software Developer and Web Enthusiast — passionate about building fast, resilient applications and sharing coding insights on LinkedIn.
            </p>
            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              I love turning ideas into scalable, user-friendly products that make an impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
