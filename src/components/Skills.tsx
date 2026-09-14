"use client";

import { FaJava, FaReact } from "react-icons/fa";
import {
  SiNodedotjs,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiMongodb,
  SiCss,
  SiBootstrap,
  SiNextdotjs,
  SiExpress,
  SiMysql,
  SiCplusplus,
} from "react-icons/si";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiCss />, name: "CSS" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiBootstrap />, name: "Bootstrap" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiCplusplus />, name: "C++" },
  ];
  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchY = useRef<number | null>(null);
  const x = useMotionValue(0);

  // Use springs for smooth 3D tilting based on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const mouseRotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const mouseRotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e: WheelEvent) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e: TouchEvent) =>
      (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id: number;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dir * dt;
      const loop = (trackRef.current?.scrollWidth || 0) / 2;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden py-24"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p
        className="mt-2 mb-16 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div
        className="relative w-full overflow-visible max-w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Layer 1 - Background (Slower, reversed) */}
        <motion.div
          className="flex gap-10 text-6xl text-[#1cd8d2]/30 blur-[2px] mb-8"
          style={{
            x: useTransform(x, (v) => -v * 0.5),
            rotateX: mouseRotateX,
            rotateY: mouseRotateY,
            translateZ: "-100px",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {repeated.map((s, i) => (
            <div
              key={`bg-${i}`}
              className="flex flex-col items-center gap-2 min-w-32"
            >
              <span>{s.icon}</span>
            </div>
          ))}
        </motion.div>

        {/* Layer 2 - Middle (Normal speed) */}
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-7xl sm:text-8xl text-[#1cd8d2] drop-shadow-[0_0_15px_rgba(28,216,210,0.5)] z-20 relative"
          style={{
            x,
            rotateX: mouseRotateX,
            rotateY: mouseRotateY,
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {repeated.map((s, i) => (
            <div
              key={`mid-${i}`}
              className="flex flex-col items-center gap-4 min-w-40"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm mt-2 font-semibold tracking-wider uppercase">
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Layer 3 - Foreground (Faster, blurred) */}
        <motion.div
          className="flex gap-10 text-8xl text-[#1cd8d2]/50 blur-[4px] mt-12 pointer-events-none"
          style={{
            x: useTransform(x, (v) => v * 1.5),
            rotateX: mouseRotateX,
            rotateY: mouseRotateY,
            translateZ: "100px",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {repeated.map((s, i) => (
            <div
              key={`fg-${i}`}
              className="flex flex-col items-center gap-2 min-w-32"
            >
              <span>{s.icon}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
