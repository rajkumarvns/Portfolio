"use client";

import React, { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let paused = false;
    let particles: Particle[] = [];

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 110,
    };

    const config = {
      particleColor: "rgba(255,255,255,0.85)",
      maxSpeed: reducedMotion ? 0.18 : 0.45,
      linkDistance: reducedMotion ? 85 : 120,
      glow: reducedMotion ? 6 : 10,
    };

    const getParticleCount = () => {
      const byArea = Math.floor((width * height) / 35000);
      return reducedMotion
        ? Math.max(14, Math.min(byArea, 28))
        : Math.max(24, Math.min(byArea, 70));
    };

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number;

      constructor() {
        this.radius = Math.random() * 2.2 + 0.8;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.maxSpeed;
        this.vy = (Math.random() - 0.5) * config.maxSpeed;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 1.6;
            this.y += (dy / dist) * force * 1.6;
          }
        }

        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.shadowBlur = config.glow;
        ctx.shadowColor = config.particleColor;
        ctx.fill();
        ctx.restore();
      }
    }

    const createParticles = () => {
      particles = Array.from(
        { length: getParticleCount() },
        () => new Particle()
      );
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const drawLinks = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < config.linkDistance) {
            const opacity = (1 - dist / config.linkDistance) * 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      if (paused) return;

      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) particle.update();
      drawLinks();
      for (const particle of particles) particle.draw();

      animationId = requestAnimationFrame(render);
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const clearMouse = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        clearMouse();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(animationId);
      } else {
        paused = false;
        render();
      }
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    window.addEventListener("mouseout", handleMouseOut as EventListener);
    window.addEventListener("blur", clearMouse);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      paused = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove as EventListener);
      window.removeEventListener("mouseout", handleMouseOut as EventListener);
      window.removeEventListener("blur", clearMouse);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
