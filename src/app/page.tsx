"use client";

import { useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ReactLenis } from "lenis/react";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative text-white font-sans bg-black">
      <NoiseOverlay />
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
        }}
      >
        <CustomCursor />
        <Navbar />

        {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </ReactLenis>
    </div>
  );
}
