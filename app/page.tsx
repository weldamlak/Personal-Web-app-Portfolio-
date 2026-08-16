"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import {
  ChevronRight,
  Code,
  Cpu,
  Award,
  User,
  MapPin,
  Rocket,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Recent Work" },
    { id: "contact", label: "Get In Touch" },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Main Tab Transition Variants
  const tabTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Home Page Entrance Stagger Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  const titleWords = "Weldamlak.A Endalew".split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-[#41a100] selection:text-white relative overflow-hidden ${
        isDarkMode
          ? "bg-[#0d0d0d] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <Analytics />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4">
        <nav
          className={`backdrop-blur-md border rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl relative transition-colors duration-300 ${
            isDarkMode
              ? "bg-[#18181b]/95 border-zinc-800/80"
              : "bg-white/90 border-slate-200/90 shadow-slate-200/50"
          }`}
        >
          {/* Logo / Brand Name */}
          <span className="font-mono text-sm font-bold text-[#41a100] md:hidden">
            Weldamlak.A
          </span>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`font-mono text-xs md:text-sm transition-colors py-1 ${
                  activeTab === item.id
                    ? "text-[#41a100] font-semibold"
                    : isDarkMode
                    ? "text-zinc-400 hover:text-zinc-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls & Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className={`p-1.5 rounded-lg border transition-colors ${
                isDarkMode
                  ? "border-zinc-800 text-amber-400 hover:bg-zinc-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div
              className={`h-4 w-px ${
                isDarkMode ? "bg-zinc-800" : "bg-slate-200"
              }`}
            />

            <div
              className={`flex items-center space-x-3 ${
                isDarkMode ? "text-zinc-400" : "text-slate-500"
              }`}
            >
              <a
                href="https://www.linkedin.com/in/weldamlak-ayenew"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`transition-colors p-1 ${
                  isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                }`}
              >
                <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={`transition-colors p-1 ${
                  isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                }`}
              >
                <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter/X Profile"
                className={`transition-colors p-1 ${
                  isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                }`}
              >
                <FaXTwitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className={`p-1.5 rounded-lg border transition-colors ${
                isDarkMode
                  ? "border-zinc-800 text-amber-400"
                  : "border-slate-200 text-slate-700"
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`p-1 focus:outline-none ${
                isDarkMode ? "text-zinc-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute top-full left-0 right-0 mt-2 border rounded-xl p-4 flex flex-col space-y-3 shadow-2xl md:hidden z-50 ${
                  isDarkMode
                    ? "bg-[#18181b] border-zinc-800"
                    : "bg-white border-slate-200"
                }`}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`font-mono text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-[#41a100]/10 text-[#41a100] font-semibold"
                        : isDarkMode
                        ? "text-zinc-300 hover:bg-zinc-800/50"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 min-h-[85vh] flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {/* HOME TAB WITH ANIMATIONS */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-12 sm:space-y-16"
            >
              {/* Dual Glowing Background Orbs */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.25, 0.15],
                  x: [-20, 20, -20],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#41a100] rounded-full blur-[130px] pointer-events-none -z-10"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.2, 0.1],
                  x: [20, -20, 20],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-teal-500 rounded-full blur-[140px] pointer-events-none -z-10"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Hero Text Staggered Container */}
                <motion.div
                  variants={containerVariants}
                  className="order-2 md:order-1 md:col-span-7 space-y-5 text-center md:text-left"
                >
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-xs text-[#41a100] border transition-shadow ${
                        isDarkMode
                          ? "bg-zinc-900/80 border-zinc-800 shadow-[0_0_15px_rgba(65,161,0,0.15)]"
                          : "bg-emerald-50 border-emerald-200"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 animate-bounce" />
                      <span>Addis Ababa, Ethiopia</span>
                    </motion.div>
                  </motion.div>

                  {/* Kinetic Word-by-Word Reveal Headline */}
                  <motion.h1
                    variants={containerVariants}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight flex flex-wrap justify-center md:justify-start gap-x-3"
                  >
                    {titleWords.map((word, idx) => (
                      <motion.span
                        key={idx}
                        variants={wordVariants}
                        className={`inline-block ${
                          idx === 0
                            ? isDarkMode
                              ? "text-white"
                              : "text-slate-900"
                            : "bg-gradient-to-r from-[#41a100] via-emerald-400 to-teal-300 bg-clip-text text-transparent"
                        }`}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className={`font-mono text-xs sm:text-sm leading-relaxed max-w-xl mx-auto md:mx-0 ${
                      isDarkMode ? "text-zinc-400" : "text-slate-600"
                    }`}
                  >
                    Full-Stack AI Developer & Machine Learning Specialist. Founder of
                    AXION Tech & Winger Academy. High school graduate from Saint
                    Joseph School (Addis Ababa). Building modern web applications
                    with Next.js & Tailwind, integrated with Python ML models to solve real-world problems.
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(65, 161, 0, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab("projects")}
                      className="w-full sm:w-auto bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-6 py-3 rounded-md transition-all flex items-center justify-center space-x-2 group"
                    >
                      <span>Let&apos;s get started</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab("contact")}
                      className={`w-full sm:w-auto border font-mono text-sm px-6 py-3 rounded-md transition-all ${
                        isDarkMode
                          ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300"
                          : "border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-sm"
                      }`}
                    >
                      Get in touch
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Animated Profile Avatar with Rotating Gradient Ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end"
                >
                  <div className="relative group">
                    {/* Rotating Animated Neon Halo Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#41a100] via-emerald-400 to-cyan-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Pulsing Backlight Aura */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-3 rounded-full bg-[#41a100]/40 blur-2xl"
                    />

                    {/* Levitating Hover Avatar Container */}
                    <motion.div
                      animate={{ y: [-7, 7] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      whileHover={{ scale: 1.04, rotate: 2 }}
                      className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 shadow-2xl z-10 transition-colors ${
                        isDarkMode
                          ? "border-zinc-800 bg-zinc-900"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <Image
                        src="/profile1.jpg"
                        alt="Weldamlak Ayenew"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                        priority
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Highlights Cards Staggered Animation */}
              <motion.div
                variants={containerVariants}
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-10 ${
                  isDarkMode ? "border-zinc-800/80" : "border-slate-200"
                }`}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-zinc-800/80 hover:border-[#41a100]/50 hover:shadow-[0_0_20px_rgba(65,161,0,0.15)]"
                      : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <Code className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3
                    className={`font-semibold mb-1 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Full-Stack AI
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-zinc-400" : "text-slate-600"
                    }`}
                  >
                    Next.js, React, Tailwind CSS, Python, and Machine Learning models.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-zinc-800/80 hover:border-[#41a100]/50 hover:shadow-[0_0_20px_rgba(65,161,0,0.15)]"
                      : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <Rocket className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3
                    className={`font-semibold mb-1 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Founder & CEO
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-zinc-400" : "text-slate-600"
                    }`}
                  >
                    Leading AXION Tech and educational impact through Winger Academy.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-lg border sm:col-span-2 md:col-span-1 transition-all ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-zinc-800/80 hover:border-[#41a100]/50 hover:shadow-[0_0_20px_rgba(65,161,0,0.15)]"
                      : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <Award className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3
                    className={`font-semibold mb-1 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Recognized Innovator
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-zinc-400" : "text-slate-600"
                    }`}
                  >
                    1st Place City Science Competition & Top 20 National Startup Finalist.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-10 sm:space-y-12"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
                  <User className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> About Me
                </h2>
                <p
                  className={`leading-relaxed text-sm sm:text-base ${
                    isDarkMode ? "text-zinc-300" : "text-slate-700"
                  }`}
                >
                  I am Weldamlak Ayenew, a high school graduate from Saint Joseph School in Addis Ababa (Class of August 2026). 
                  I am a Full-Stack AI Developer and Machine Learning Specialist. My technical focus involves building modern 
                  web applications using Next.js and combining them with Python-driven ML models for smart, real-world functionalities.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
