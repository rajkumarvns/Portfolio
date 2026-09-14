"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "./ParticlesBackground";
import Image from "next/image";

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";

const SERVICE_OPTIONS = [
  { value: "web-development", label: "🌐 Web Development" },
  { value: "mobile-application", label: "📱 Mobile Application" },
  { value: "other", label: "💡 Other" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    currency: "USD",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const needsBudget = formData.service !== "" && formData.service !== "other";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"] as const;
    const newErrors: Record<string, string> = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );

    if (needsBudget && !formData.budget.trim())
      newErrors.budget = "Fill this field";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            ...formData,
            from_name: formData.name,
            reply_to: formData.email,
          },
          PUBLIC_KEY
        );
      }
      setStatus("success");
      setFormData({ name: "", email: "", service: "", currency: "USD", budget: "", idea: "" });
    } catch (err: any) {
      console.error("EmailJS Error:", err?.text || err?.message || err);
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  const fieldClasses = (name: string) => {
    if (errors[name]) return "border-red-500/60 focus:border-red-500";
    if (focusedField === name)
      return "border-cyan-500/70 shadow-lg shadow-cyan-500/10";
    return "border-white/10 focus:border-cyan-500/50";
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-16 text-white sm:py-20 lg:py-24"
    >
      <ParticlesBackground />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-6 h-32 w-32 animate-pulse rounded-full bg-purple-600/15 blur-3xl sm:left-10 sm:top-10 sm:h-48 sm:w-48" />
        <div className="delay-1000 absolute bottom-10 right-4 h-40 w-40 animate-pulse rounded-full bg-blue-600/15 blur-3xl sm:bottom-20 sm:right-10 sm:h-64 sm:w-64" />
        <div className="delay-500 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-600/8 blur-3xl sm:h-96 sm:w-96" />
        <div className="delay-700 absolute right-1/4 top-1/3 hidden h-48 w-48 animate-pulse rounded-full bg-emerald-500/8 blur-3xl sm:block" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,216,210,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,216,210,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-10 text-center sm:mb-14">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
            <span className="text-xs font-medium tracking-wide text-gray-300">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-3 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-4xl md:text-5xl"
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-xl px-2 text-sm text-gray-400 sm:text-base"
          >
            Have a project in mind? Let&apos;s bring your ideas to life.
          </motion.p>
        </div>

        <div className="flex flex-col-reverse items-stretch gap-8 lg:flex-row lg:items-center lg:gap-12">
          <motion.div
            variants={itemVariants}
            className="flex w-full justify-center lg:w-[42%]"
          >
            <div className="group relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <motion.img
                src="/developer.jpg"
                alt="Stylized 3D Software Developer Character"
                className="relative w-64 rounded-2xl object-cover shadow-2xl xs:w-72 sm:w-80 md:w-96 lg:w-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
              />

              <div className="absolute inset-0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-cyan-500/30" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full lg:w-[58%]">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 shadow-2xl backdrop-blur-xl sm:p-7 lg:p-8">
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                  <span className="text-white text-sm">✉</span>
                </div>
                <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  Send a Message
                </h2>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div
                    variants={formFieldVariants}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-medium text-gray-400"
                    >
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        className={`w-full rounded-lg border bg-white/5 p-2.5 pl-4 text-sm text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none ${fieldClasses(
                          "name"
                        )}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1 flex items-center gap-1 text-xs text-red-400"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    variants={formFieldVariants}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-medium text-gray-400"
                    >
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        className={`w-full rounded-lg border bg-white/5 p-2.5 pl-4 text-sm text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none ${fieldClasses(
                          "email"
                        )}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1 flex items-center gap-1 text-xs text-red-400"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div
                  className={`grid grid-cols-1 gap-4 ${
                    needsBudget ? "sm:grid-cols-2" : ""
                  }`}
                >
                  <motion.div
                    variants={formFieldVariants}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <label
                      htmlFor="contact-service"
                      className="mb-1.5 block text-xs font-medium text-gray-400"
                    >
                      Service Needed <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        aria-invalid={!!errors.service}
                        className={`w-full cursor-pointer appearance-none rounded-lg border bg-white/5 p-2.5 pl-4 pr-9 text-sm text-white transition-all duration-300 focus:outline-none ${fieldClasses(
                          "service"
                        )}`}
                      >
                        <option value="" disabled className="text-gray-400">
                          Select a service
                        </option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="text-black"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <AnimatePresence>
                      {errors.service && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1 flex items-center gap-1 text-xs text-red-400"
                        >
                          {errors.service}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {needsBudget && (
                      <motion.div
                        key="budget"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        className="overflow-hidden"
                      >
                        <label
                          htmlFor="contact-budget"
                          className="mb-1.5 block text-xs font-medium text-gray-400"
                        >
                          Budget <span className="text-cyan-400">*</span>
                        </label>
                        <div className="relative flex">
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="absolute left-1 top-1 bottom-1 z-10 w-[70px] cursor-pointer appearance-none rounded-md border-r border-white/10 bg-transparent px-2 text-sm text-gray-300 focus:outline-none"
                            style={{ backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right .5rem top 50%", backgroundSize: ".65rem auto" }}
                          >
                            <option value="USD" className="text-black">USD</option>
                            <option value="INR" className="text-black">INR</option>
                          </select>
                          <input
                            id="contact-budget"
                            type="text"
                            inputMode="numeric"
                            name="budget"
                            placeholder="5000"
                            value={formData.budget}
                            onChange={handleChange}
                            aria-invalid={!!errors.budget}
                            className={`w-full rounded-lg border bg-white/5 p-2.5 pl-[85px] text-sm text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none ${fieldClasses(
                              "budget"
                            )}`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.budget && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="mt-1 flex items-center gap-1 text-xs text-red-400"
                            >
                              {errors.budget}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  variants={formFieldVariants}
                  onFocus={() => setFocusedField("idea")}
                  onBlur={() => setFocusedField(null)}
                >
                  <label
                    htmlFor="contact-idea"
                    className="mb-1.5 block text-xs font-medium text-gray-400"
                  >
                    Your Idea <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-idea"
                      name="idea"
                      rows={4}
                      placeholder="Tell me about your amazing project idea..."
                      value={formData.idea}
                      onChange={handleChange}
                      aria-invalid={!!errors.idea}
                      className={`w-full resize-none rounded-lg border bg-white/5 p-2.5 pl-4 text-sm text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none ${fieldClasses(
                        "idea"
                      )}`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.idea && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 flex items-center gap-1 text-xs text-red-400"
                      >
                        {errors.idea}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                  {status && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: -5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.98 }}
                      className={`flex items-center gap-2 rounded-lg p-2.5 text-xs ${
                        status === "sending"
                          ? "border border-yellow-500/20 bg-yellow-500/15 text-yellow-300"
                          : status === "success"
                          ? "border border-green-500/20 bg-green-500/15 text-green-300"
                          : "border border-red-500/20 bg-red-500/15 text-red-300"
                      }`}
                    >
                      <span>
                        {status === "sending"
                          ? "Sending..."
                          : status === "success"
                          ? "Message sent! I'll get back to you soon. ✅"
                          : "Something went wrong. Please try again. ❌"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={status === "sending"}
                  type="submit"
                  className={`
                    group relative mt-1 w-full overflow-hidden rounded-lg
                    py-3 text-sm font-semibold
                    transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                    ${
                      status === "sending"
                        ? "cursor-not-allowed bg-gray-600 opacity-60"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-xl hover:shadow-cyan-500/20"
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      "Sending..."
                    ) : (
                      "Send Message"
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </section>
  );
}
