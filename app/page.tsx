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
  Briefcase,
  Sparkles,
  Globe,
  User,
  MapPin,
  Send,
  Rocket,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  Mail,
} from "lucide-react";

import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-[#41a100] selection:text-white relative overflow-hidden ${
        isDarkMode ? "bg-[#0d0d0d] text-white" : "bg-slate-50 text-slate-900"
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

                <div
                  className={`pt-3 border-t flex items-center space-x-6 px-3 ${
                    isDarkMode
                      ? "border-zinc-800 text-zinc-400"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <a
                    href="https://www.linkedin.com/in/weldamlak-ayenew"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter/X Profile"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 min-h-[85vh] flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {/* HOME TAB */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-12 sm:space-y-16"
            >
              {/* Animated Glow Background Effects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#41a100] rounded-full blur-[120px] pointer-events-none -z-10"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Hero Text Staggered Container */}
                <motion.div
                  variants={containerVariants}
                  className="order-2 md:order-1 md:col-span-7 space-y-5 text-center md:text-left"
                >
                  <motion.div variants={itemVariants}>
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-xs text-[#41a100] border ${
                        isDarkMode
                          ? "bg-zinc-900/80 border-zinc-800"
                          : "bg-emerald-50 border-emerald-200"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Addis Ababa, Ethiopia</span>
                    </div>
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Weldamlak.A Endalew
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
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveTab("projects")}
                      className="w-full sm:w-auto bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-6 py-3 rounded-md transition-all shadow-[0_0_25px_rgba(65,161,0,0.35)] flex items-center justify-center space-x-2"
                    >
                      <span>Let&apos;s get started</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
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

                {/* Profile Avatar with Floating Entrance Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 shadow-2xl ${
                      isDarkMode
                        ? "border-zinc-800 bg-zinc-900 shadow-[#41a100]/10"
                        : "border-slate-200 bg-white shadow-slate-200"
                    }`}
                  >
                    <Image
                      src="/profile1.jpg"
                      alt="Weldamlak Ayenew"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                      priority
                    />
                  </motion.div>
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
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
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
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
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
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-lg border sm:col-span-2 md:col-span-1 transition-all ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
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
                  I am Weldamlak Ayenew, a high school graduate from Saint Joseph School in Addis Ababa. 
                  I am a Full-Stack AI Developer and Machine Learning Specialist. My technical focus involves building modern 
                  web applications using Next.js and combining them with Python-driven ML models for smart, real-world functionalities.
                </p>
                <p
                  className={`leading-relaxed text-xs sm:text-sm mt-3 ${
                    isDarkMode ? "text-zinc-400" : "text-slate-600"
                  }`}
                >
                  Beyond software engineering, my core passion is teaching and mentorship. I believe in leveraging education and 
                  technology to empower underserved students and nurture bright minds in Ethiopia.
                </p>
              </div>

              {/* Specialized Training */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="text-[#41a100] w-5 h-5" /> Key Highlights & Specialized Training
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`p-4 sm:p-5 rounded-lg border space-y-2 ${
                      isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-mono text-[#41a100]">2026</span>
                    <h4
                      className={`font-medium text-sm sm:text-base ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Ethiopian Artificial Intelligence Institute (EAII) Summer Camp
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      Selected for the Machine Learning track to advance skills in core AI technologies.
                    </p>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-lg border space-y-2 ${
                      isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-mono text-[#41a100]">2025</span>
                    <h4
                      className={`font-medium text-sm sm:text-base ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      INSA Summer Camp (Embedded Systems)
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      One of 40 students accepted into Robotics & Electrical Engineering. Selected as 1 of 4 students to present a final project directly to the head of the institute.
                    </p>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-lg border space-y-2 ${
                      isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-mono text-[#41a100]">Internship</span>
                    <h4
                      className={`font-medium text-sm sm:text-base ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      CodeAlpha
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      Machine Learning Intern building applied AI and Python projects.
                    </p>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-lg border space-y-2 ${
                      isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-mono text-[#41a100]">Mentorship</span>
                    <h4
                      className={`font-medium text-sm sm:text-base ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Sci-Mi Mentorship
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      Completed specialized Computer Science studies under the Sci-Mi summer mentorship program.
                    </p>
                  </div>
                </div>
              </div>

              {/* Honors & Awards */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="text-[#41a100] w-5 h-5" /> Honors & Awards
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "1st Place Champion – Addis Ababa City-Wide Science & Technology Competition (2026)",
                    "1st Place Winner – Kirkos Subcity Science Fair (2025 & 2026)",
                    "Top 20 Finalist – Bruh Federal/National Startup Competition (2025)",
                    "1st Place Winner – Digital Literacy & Advocacy Program (ENG Ethiopia & Meta, 2024)",
                    "Top 5 Best Research Papers – Saint Joseph School (Grade 11 Research, 2025)",
                    "Leadership Certification – Youth Ambassadors Advisory Role (ENG Ethiopia, 2025)",
                  ].map((award, idx) => (
                    <li
                      key={idx}
                      className={`p-3 rounded-lg border flex items-start gap-2 text-xs sm:text-sm ${
                        isDarkMode
                          ? "bg-zinc-900/30 border-zinc-800/80 text-zinc-300"
                          : "bg-white border-slate-200 text-slate-700 shadow-sm"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                <Briefcase className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Leadership & Experience
              </h2>

              <div className="space-y-6">
                {[
                  {
                    role: "Founder & Lead Developer",
                    organization: "AXION Tech",
                    period: "2024 - Present",
                    description:
                      "Spearheading technical innovation and software development for AI solutions, custom web applications, and community tech initiatives.",
                  },
                  {
                    role: "Founder & Director",
                    organization: "Winger Academy",
                    period: "2024 - Present",
                    description:
                      "Directing educational programs designed to provide high-quality tutoring and digital skills to high school students across Addis Ababa.",
                  },
                  {
                    role: "Machine Learning Intern",
                    organization: "CodeAlpha",
                    period: "2025",
                    description:
                      "Developed predictive Machine Learning models using Python, Pandas, and Scikit-Learn to analyze data and improve model accuracy.",
                  },
                  {
                    role: "Robotics & Embedded Systems Research Presenter",
                    organization: "INSA Summer Program",
                    period: "2025",
                    description:
                      "Engineered embedded hardware hardware-software solutions; selected as 1 of 4 students to present research directly to the institute head.",
                  },
                ].map((exp, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border relative transition-all ${
                      isDarkMode
                        ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3
                        className={`text-lg font-semibold ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {exp.role}{" "}
                        <span className="text-[#41a100]">@ {exp.organization}</span>
                      </h3>
                      <span className="font-mono text-xs text-[#41a100] bg-[#41a100]/10 px-2.5 py-1 rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                <Sparkles className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Recent Work & Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Bahire Hasab Computational Model",
                    category: "Python / Algorithm Modeling",
                    description:
                      "A computational system designed to digitize, calculate, and preserve the traditional Ge'ez calendar calculations (Bahire Hasab).",
                    tech: ["Python", "Algorithms", "Next.js"],
                  },
                  {
                    title: "AI-Powered Learning Platform",
                    category: "Full-Stack AI",
                    description:
                      "An interactive platform empowering Ethiopian students with AI-assisted learning resources and personalized guidance.",
                    tech: ["Next.js", "Tailwind CSS", "Python API", "OpenAI"],
                  },
                  {
                    title: "Embedded Systems & Robotics Prototype",
                    category: "INSA Research",
                    description:
                      "Custom hardware-software interface utilizing microcontrollers and real-time sensors to automate practical monitoring workflows.",
                    tech: ["C++", "Arduino / Microcontrollers", "Sensors"],
                  },
                  {
                    title: "Winger Academy Portal",
                    category: "Web Application",
                    description:
                      "Centralized hub for student enrollment, learning resources, and community management built for Winger Academy initiatives.",
                    tech: ["React", "Next.js", "Tailwind CSS", "Vercel"],
                  },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border flex flex-col justify-between transition-all group ${
                      isDarkMode
                        ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-[#41a100]">
                          {project.category}
                        </span>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[#41a100] transition-colors" />
                      </div>
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                          isDarkMode ? "text-zinc-400" : "text-slate-600"
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                            isDarkMode
                              ? "bg-zinc-800/60 border-zinc-700 text-zinc-300"
                              : "bg-slate-100 border-slate-200 text-slate-700"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                <Globe className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Get In Touch
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Contact Info */}
                <div className="md:col-span-5 space-y-6">
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDarkMode ? "text-zinc-300" : "text-slate-700"
                    }`}
                  >
                    Whether you have a question, project proposal, or collaboration opportunity in AI or education, feel free to reach out!
                  </p>

                  <div className="space-y-4 font-mono text-xs sm:text-sm">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-[#41a100]" />
                      <a
                        href="mailto:weldamlakendalew@gmail.com"
                        className="hover:underline"
                      >
                        weldamlakendalew@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-[#41a100]" />
                      <span>Addis Ababa, Ethiopia</span>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-7">
                  <form
                    onSubmit={handleFormSubmit}
                    className={`p-6 rounded-xl border space-y-4 ${
                      isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    {formSubmitted && (
                      <div className="p-3 bg-[#41a100]/20 border border-[#41a100] rounded-lg text-[#41a100] text-xs font-mono">
                        Message sent successfully! I will get back to you soon.
                      </div>
                    )}

                    <div>
                      <label
                        className={`block font-mono text-xs mb-1.5 ${
                          isDarkMode ? "text-zinc-400" : "text-slate-600"
                        }`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
                          isDarkMode
                            ? "bg-zinc-800/50 border-zinc-700 focus:border-[#41a100] text-white"
                            : "bg-slate-50 border-slate-200 focus:border-[#41a100] text-slate-900"
                        }`}
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label
                        className={`block font-mono text-xs mb-1.5 ${
                          isDarkMode ? "text-zinc-400" : "text-slate-600"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
                          isDarkMode
                            ? "bg-zinc-800/50 border-zinc-700 focus:border-[#41a100] text-white"
                            : "bg-slate-50 border-slate-200 focus:border-[#41a100] text-slate-900"
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label
                        className={`block font-mono text-xs mb-1.5 ${
                          isDarkMode ? "text-zinc-400" : "text-slate-600"
                        }`}
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
                          isDarkMode
                            ? "bg-zinc-800/50 border-zinc-700 focus:border-[#41a100] text-white"
                            : "bg-slate-50 border-slate-200 focus:border-[#41a100] text-slate-900"
                        }`}
                        placeholder="Say hello or discuss a potential project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 text-center font-mono text-xs transition-colors ${
          isDarkMode
            ? "border-zinc-800/80 text-zinc-500"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <p>© {new Date().getFullYear()} Weldamlak Ayenew Endalew. All rights reserved.</p>
      </footer>
    </div>
  );
}
