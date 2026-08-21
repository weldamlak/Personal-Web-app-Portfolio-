"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { FileText } from "lucide-react";
import { Variants } from "framer-motion";
import Footer from "./components/Footer";
import PhotoGallery from "./components/PhotoGallery";
import ProjectsSection from "./components/ProjectsSection";


const tabTransition: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};
import {
  Download,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Code,
  Cpu,
  Award,
  Briefcase,
  Globe,
  User,
  Send,
  Rocket,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  ArrowRight,
  Maximize2,
  Sparkles,
  BookOpen,
  HeartHandshake,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaXTwitter, FaInstagram, FaDiscord, FaWhatsapp, FaEnvelope } from "react-icons/fa6";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lightbox / Full-screen Image State
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);

  const galleryImages = Array.from({ length: 10 }, (_, i) => `/${i + 1}.jpg`);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "saying-more", label: "Blog" },
    { id: "contact", label: "Get In Touch" },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "9c58710a-10a9-429a-9c13-6cbf99ca566f",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert("Something went wrong while sending the message. Please try again.");
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Lightbox Navigation Controls
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((prev) =>
        prev === 0 ? galleryImages.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((prev) =>
        prev === galleryImages.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIndex !== null) {
        if (e.key === "Escape") setSelectedImgIndex(null);
        if (e.key === "ArrowLeft") handlePrevImage();
        if (e.key === "ArrowRight") handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIndex]);

  // Main Tab Transition Variants
  const tabTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Entrance Stagger Animation Variants
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
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-[#41a100] selection:text-white relative overflow-hidden ${isDarkMode ? "bg-[#0d0d0d] text-white" : "bg-slate-50 text-slate-900"
        }`}
    >
      <Analytics />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4">
        <nav
          className={`backdrop-blur-md border rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl relative transition-colors duration-300 ${isDarkMode
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
                className={`font-mono text-xs md:text-sm transition-colors py-1 ${activeTab === item.id
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
              className={`p-1.5 rounded-lg border transition-colors ${isDarkMode
                ? "border-zinc-800 text-amber-400 hover:bg-zinc-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div
              className={`h-4 w-px ${isDarkMode ? "bg-zinc-800" : "bg-slate-200"}`}
            />

            <div
              className={`flex items-center space-x-3 ${isDarkMode ? "text-zinc-400" : "text-slate-500"
                }`}
            >
              <a
                href="https://www.linkedin.com/in/weldamlak-ayenew"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`transition-colors p-1 ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                  }`}
              >
                <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={`transition-colors p-1 ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                  }`}
              >
                <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://x.com/WeldamlakAyenew"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter/X Profile"
                className={`transition-colors p-1 ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"
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
              className={`p-1.5 rounded-lg border transition-colors ${isDarkMode
                ? "border-zinc-800 text-amber-400"
                : "border-slate-200 text-slate-700"
                }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`p-1 focus:outline-none ${isDarkMode ? "text-zinc-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
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
                className={`absolute top-full left-0 right-0 mt-2 border rounded-xl p-4 flex flex-col space-y-3 shadow-2xl md:hidden z-50 ${isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-slate-200"
                  }`}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`font-mono text-left text-sm py-2 px-3 rounded-lg transition-colors ${activeTab === item.id
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
                  className={`pt-3 border-t flex items-center space-x-6 px-3 ${isDarkMode ? "border-zinc-800 text-zinc-400" : "border-slate-200 text-slate-500"
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
                    href="https://x.com/WeldamlakAyenew"
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Hero Text Staggered Container */}
                <motion.div
                  variants={containerVariants}
                  className="order-2 md:order-1 md:col-span-7 space-y-5 text-center md:text-left"
                >
                  <motion.div variants={itemVariants}>
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-xs text-[#41a100] border ${isDarkMode
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
                    className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Weldamlak.A Endalew
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className={`font-mono text-xs sm:text-sm leading-relaxed max-w-xl mx-auto md:mx-0 ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                  >
                    Full-Stack AI Developer & Machine Learning Specialist. Founder of
                    AXION Tech & Winger Academy. High school graduate from Saint
                    Joseph School (Addis Ababa). Building modern web applications
                    with Next.js & Tailwind, integrated with Python ML models to solve real-world problems.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleTabClick("about")}
                      className="w-full sm:w-auto bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-5 py-3 rounded-md transition-all shadow-[0_0_25px_rgba(65,161,0,0.35)] flex items-center justify-center space-x-2"
                    >
                      <span>Let&apos;s get started</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="/Weldamlak.A.Endalew CV.pdf"
                      download="Weldamlak_Ayenew_CV.pdf"
                      className={`w-full sm:w-auto border font-mono text-sm px-5 py-3 rounded-md transition-all flex items-center justify-center space-x-2 ${isDarkMode
                        ? "border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-white"
                        : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-sm"
                        }`}
                    >
                      <Download className="w-4 h-4 text-[#41a100]" />
                      <span>Download CV</span>
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleTabClick("contact")}
                      className={`w-full sm:w-auto border font-mono text-sm px-5 py-3 rounded-md transition-all ${isDarkMode
                        ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300"
                        : "border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-sm"
                        }`}
                    >
                      Get in touch
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Profile Avatar Container */}
                <div className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      // Allow profile photo zoom as well
                      setSelectedImgIndex(0);
                    }}
                    className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 shadow-2xl cursor-pointer group ${isDarkMode
                      ? "border-zinc-800 bg-zinc-900"
                      : "border-slate-200 bg-white shadow-slate-200"
                      }`}
                  >
                    <Image
                      src="/profile1.jpg"
                      alt="Weldamlak Ayenew"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono gap-1">
                      <Maximize2 className="w-4 h-4" />
                      <span>View</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Highlights Cards Staggered Animation */}
              <motion.div
                variants={containerVariants}
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-10 ${isDarkMode ? "border-zinc-800/80" : "border-slate-200"
                  }`}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-lg border transition-all ${isDarkMode
                    ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                >
                  <Code className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3
                    className={`font-semibold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Full-Stack AI
                  </h3>
                  <p
                    className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                  >
                    Next.js, React, Tailwind CSS, Python, and Machine Learning models.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-lg border transition-all ${isDarkMode
                    ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                >
                  <Rocket className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3
                    className={`font-semibold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Founder
                  </h3>
                  <p
                    className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                  >
                    Leading AXION Tech and educational impact through Winger Academy.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-lg border sm:col-span-2 md:col-span-1 transition-all ${isDarkMode
                    ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                >
                  <Award className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3
                    className={`font-semibold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Recognized Innovator
                  </h3>
                  <p
                    className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}
                  >
                    1st Place City Science Competition & Top 20 National Startup Finalist.
                  </p>
                </motion.div>
              </motion.div>


              {/* Render cleanly in page.tsx */}
              <section className="relative w-full">
                <PhotoGallery
                  galleryImages={galleryImages}
                  isDarkMode={isDarkMode}
                  setSelectedImgIndex={setSelectedImgIndex}
                />
              </section>


              {/* Bottom Call to Action: Next Page - Saying More */}
              <div className="pt-8 flex justify-center">
                <button
                  onClick={() => handleTabClick("about")}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#41a100] to-emerald-600 text-white font-mono text-sm font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Read More About Me </span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
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
                  className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? "text-zinc-300" : "text-slate-700"
                    }`}
                >
                  I am Weldamlak Ayenew, a high school graduate from Saint Joseph School in Addis Ababa.
                  I am a Full-Stack AI Developer and Machine Learning Specialist. My technical focus involves building modern
                  web applications using Next.js and combining them with Python-driven ML models for smart, real-world functionalities.
                </p>
                <p
                  className={`leading-relaxed text-xs sm:text-sm mt-3 ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                    }`}
                >
                  Beyond software engineering, my core passion is teaching and mentorship. I believe in leveraging education and
                  technology to empower underserved students and nurture bright minds in Ethiopia.
                </p>
              </div>
              {/* Specialized Training */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="text-[#41a100] w-5 h-5" /> Specialized Training
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* EAII Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-lg border flex flex-col justify-between space-y-3 ${isDarkMode
                      ? "bg-zinc-900/50 border-zinc-800"
                      : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#41a100]">2026</span>
                        <a
                          href="https://aii.et/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visit EAII website"
                          className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-700/50 shrink-0 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#41a100]/60"
                        >
                          <Image
                            src="/EAII.jpg"
                            alt="EAII Logo"
                            fill
                            className="object-contain rounded-md"
                          />
                        </a>
                      </div>
                      <h4
                        className={`font-medium text-sm sm:text-base ${isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                      >
                        Ethiopian Artificial Intelligence Institute (EAII) Summer Camp
                      </h4>
                      <p
                        className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                          }`}
                      >
                        Selected for the Machine Learning track to advance skills in core AI technologies.
                      </p>
                    </div>
                  </div>

                  {/* INSA Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-lg border flex flex-col justify-between space-y-3 ${isDarkMode
                      ? "bg-zinc-900/50 border-zinc-800"
                      : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#41a100]">2025</span>
                        <a
                          href="https://www.insa.gov.et/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visit INSA website"
                          className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-700/50 shrink-0 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#41a100]/60"
                        >
                          <Image
                            src="/INSA.jpg"
                            alt="INSA Logo"
                            fill
                            className="object-contain rounded-md"
                          />
                        </a>
                      </div>
                      <h4
                        className={`font-medium text-sm sm:text-base ${isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                      >
                        INSA Summer Camp (Embedded Systems)
                      </h4>
                      <p
                        className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                          }`}
                      >
                        One of 40 students accepted into Robotics & Electrical Engineering. Selected as 1 of 4 students to present a final project directly to the head of the institute.
                      </p>
                    </div>
                  </div>

                  {/* CodeAlpha Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-lg border flex flex-col justify-between space-y-3 ${isDarkMode
                      ? "bg-zinc-900/50 border-zinc-800"
                      : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#41a100]">Internship</span>
                        <a
                          href="https://www.codealpha.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visit CodeAlpha website"
                          className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-700/50 shrink-0 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#41a100]/60"
                        >
                          <Image
                            src="/CODEALPHA.jpg"
                            alt="CodeAlpha Logo"
                            fill
                            className="object-contain rounded-md"
                          />
                        </a>
                      </div>
                      <h4
                        className={`font-medium text-sm sm:text-base ${isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                      >
                        CodeAlpha
                      </h4>
                      <p
                        className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                          }`}
                      >
                        Machine Learning Intern building applied AI and Python projects.
                      </p>
                    </div>
                  </div>

                  {/* Sci-Mi Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-lg border flex flex-col justify-between space-y-3 ${isDarkMode
                      ? "bg-zinc-900/50 border-zinc-800"
                      : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#41a100]">Mentorship</span>
                        <a
                          href="https://www.sci-mi.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visit Sci-Mi website"
                          className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-700/50 shrink-0 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#41a100]/60"
                        >
                          <Image
                            src="/SCI-MI.jpg"
                            alt="Sci-Mi Logo"
                            fill
                            className="object-contain rounded-md"
                          />
                        </a>
                      </div>
                      <h4
                        className={`font-medium text-sm sm:text-base ${isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                      >
                        Sci-Mi Mentorship
                      </h4>
                      <p
                        className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"
                          }`}
                      >
                        Completed specialized Computer Science studies under the Sci-Mi summer mentorship program.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Honors & Awards */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="text-[#41a100] w-5 h-5" /> Honors & Awards
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "1st Place Champion",
                      subtitle: "Addis Ababa City-Wide Science & Technology Competition",
                      images: ["/c1.jpg"],
                      badge: "Champion",
                    },
                    {
                      title: "1st Place Winner (Two Times)",
                      subtitle: "Kirkos Subcity Science Fair",
                      images: ["/c2.jpg", "/c3.jpg"],
                      badge: "1st Place",
                    },
                    {
                      title: "Top 20 Finalist",
                      subtitle: "Bruh Federal/National Startup Competition",
                      images: ["/c4.jpg", "/c5.jpg"],
                      badge: "National Finalist",
                    },
                    {
                      title: "1st Place Winner",
                      subtitle: "Digital Literacy & Advocacy Program (ENG Ethiopia & Meta)",
                      images: ["/c6.jpg"],
                      badge: "Winner",
                    },
                  ].map((award, idx) => (
                    <div
                      key={idx}
                      className={`group p-4 sm:p-5 rounded-xl border transition-all duration-300 hover:border-[#41a100]/50 hover:shadow-lg flex flex-col justify-between space-y-4 ${isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800/80 hover:bg-zinc-900/80"
                        : "bg-white border-slate-200 shadow-sm hover:shadow-slate-200"
                        }`}
                    >
                      {/* Top Header & Title */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0" />
                            <span className="text-xs font-mono font-semibold text-[#41a100] uppercase tracking-wider">
                              {award.title}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isDarkMode
                              ? "bg-[#41a100]/10 text-[#41a100] border-[#41a100]/30"
                              : "bg-[#41a100]/10 text-[#2d7000] border-[#41a100]/30"
                              }`}
                          >
                            {award.badge}
                          </span>
                        </div>

                        <h4
                          className={`font-semibold text-sm sm:text-base leading-snug ${isDarkMode ? "text-zinc-100" : "text-slate-900"
                            }`}
                        >
                          {award.subtitle}
                        </h4>
                      </div>

                      {/* Dynamic Image Container */}
                      <div
                        className={`grid gap-2 rounded-lg p-1.5 border ${isDarkMode
                          ? "bg-zinc-950/60 border-zinc-800/60"
                          : "bg-slate-50 border-slate-200/80"
                          } ${award.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                      >
                        {award.images.map((imgSrc, imgIdx) => (
                          <div key={imgIdx} className="flex flex-col space-y-1.5">
                            {/* Clickable Image (Triggers Full View) */}
                            <button
                              type="button"
                              onClick={() => setSelectedImage(imgSrc)}
                              title="Click to view image"
                              className="relative h-36 sm:h-40 w-full rounded-md overflow-hidden bg-zinc-950/20 group/img block text-left cursor-pointer"
                            >
                              <Image
                                src={imgSrc}
                                alt={`${award.subtitle} proof ${imgIdx + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <span className="text-white text-[11px] font-mono bg-black/70 px-2 py-1 rounded border border-white/20">
                                  View Image
                                </span>
                              </div>
                            </button>

                            {/* Google Translate Image Link */}
                            <a
                              href="https://translate.google.com/?sl=auto&tl=en&op=images"
                              target="_self"
                              className={`text-[10px] font-mono flex items-center justify-center gap-1 py-1 rounded transition-colors ${isDarkMode
                                ? "text-zinc-400 hover:text-[#41a100] hover:bg-zinc-800/60"
                                : "text-slate-500 hover:text-[#41a100] hover:bg-slate-200/60"
                                }`}
                            >
                              <span>Translate with Google Translate</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Backdrop Overlay - Clicking outside the image sets selectedImage to null */}
                {selectedImage && (
                  <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
                  >
                    {/* Stopping propagation on image box so clicking inside image won't close it */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="relative max-w-4xl max-h-[85vh] w-full h-[80vh] cursor-default"
                    >
                      <Image
                        src={selectedImage}
                        alt="Award Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Core Skills Matrix */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code className="text-[#41a100] w-5 h-5" /> Technical Skills Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      category: "Frontend & Web",
                      skills: ["Next.js", "React", "Tailwind CSS", "TypeScript", "JavaScript"],
                    },
                    {
                      category: "AI & Data Science",
                      skills: ["Python", "Pandas", "NumPy", "Plotly", "Pygame", "Scikit-Learn"],
                    },
                    {
                      category: "Robotics & Hardware",
                      skills: ["C++", "Arduino", "Embedded Systems", "Sensors & IoT"],
                    },
                    {
                      category: "Tools & Backend",
                      skills: ["Supabase", "Git & GitHub", "Vercel", "VS Code", "Linux / Kali"],
                    },
                  ].map((group, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border space-y-3 ${isDarkMode
                        ? "bg-zinc-900/40 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                        }`}
                    >
                      <h4 className="text-xs font-mono font-bold text-[#41a100] uppercase tracking-wider">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`text-xs px-2 py-1 rounded font-mono ${isDarkMode
                              ? "bg-zinc-800 text-zinc-300"
                              : "bg-slate-100 text-slate-800"
                              }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Call to Action Button */}
              <div className="pt-8 flex justify-center">
                <button
                  onClick={() => handleTabClick("experience")}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}{/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-8"
            >
              {/* Section Header */}
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-3 ${isDarkMode ? "text-white" : "text-slate-950"
                    }`}
                >
                  <Briefcase className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Leadership & Experience
                </h2>
                <p className={`text-xs sm:text-sm font-mono ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                  Building technology initiatives and driving educational impact.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="space-y-8 relative pl-16 sm:pl-20">
                {/* Vertical Line connected precisely from center of first circle to center of last circle */}
                <div className="absolute left-7 sm:left-8 top-7 bottom-69 w-0.5 bg-[#41a100]/50 -translate-x-1/2" />

                {[
                  {
                    role: "Founder & Lead Developer",
                    organization: "AXION Tech",
                    period: "Jan 2026 - Present",
                    image: "/R1.jpg",
                    desc: "Engineered the AXION Smart Wheelchair prototype featuring Arduino microcontroller integration, custom mobile app controls, sensor obstacle detection, camera tracking, and solar auxiliary charging.",
                  },
                  {
                    role: "Founder & Director",
                    organization: "Winger Academy",
                    period: "Apr 2026 - Present",
                    image: "/R2.jpg",
                    desc: "Established an academic outreach platform designed to provide instruction, peer mentorship, and STEM resources to high school students across Ethiopia.",
                  },
                  {
                    role: "Volunteer Teacher",
                    organization: "Wegene Foundation",
                    period: "July 2026",
                    image: "/R3.jpg",
                    desc: "Teach high school mathematics, science, and English by transforming complex study materials into highly organized, step-by-step guides and delivering engaging, interactive lessons.",
                  },
                  {
                    role: "STEM Leader & Tech Educator",
                    organization: "Saint Joseph School",
                    period: "2024 - 2026",
                    image: "/R4.jpg",
                    desc: "Served in key student leadership and technology roles at Saint Joseph School, driving STEM initiatives, managing school-wide extracurricular activities, and teaching robotics and web development during the summer internship program.",
                    highlights: [
                      { title: "STEM Club President", period: "2025 - 2026" },
                      { title: "Innovation Club President", period: "2024 - 2025" },
                      { title: "Web Developer & Summer Camp Robotics Teacher", period: "July 2026" },
                    ],
                    link: {
                      url: "https://stemsjs.netlify.app/",
                      label: "Visit SJS STEAM Club Website",
                    },
                  },
                  {
                    role: "Volunteer, Researcher & Space Science Advocate",
                    organization: "Ethiopian Space Science Society (ESSS)",
                    period: "2022 - Present",
                    image: "/R5.jpg",
                    desc: "Participating in Citizen Science asteroid research while conducting outreach and advocating for space science, aerospace engineering, and satellite technology development in Ethiopia.",
                    highlights: [
                      { title: "Citizen Science Asteroid Research Project", period: "2025 - Present" },
                      { title: "Youth Volunteer & Summer Camp Educator", period: "2024 - Present" },
                      { title: "Keynote Speaker: Cosmology & Big Bang Theory", period: "2022 - 2023" },
                    ],
                    link: {
                      url: "https://www.ethiosss.org/esss-branch/",
                      label: "Visit ESSS Branch Website",
                    },
                  },
                ].map((exp, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circular Image Node centered over vertical line */}
                    <div className="absolute left-[-36px] sm:left-[-48px] top-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#41a100] overflow-hidden bg-zinc-950 shadow-lg transition-transform duration-300 group-hover:scale-110 z-10 shrink-0">
                      <Image
                        src={exp.image}
                        alt={`${exp.organization} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Experience Card */}
                    <div
                      className={`p-5 sm:p-6 rounded-xl border transition-all duration-300 group-hover:border-[#41a100]/40 ${isDarkMode
                        ? "bg-zinc-900/40 border-zinc-800"
                        : "bg-white border-slate-200 shadow-sm"
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                        <h3
                          className={`font-bold text-base sm:text-lg ${isDarkMode ? "text-white" : "text-slate-950"
                            }`}
                        >
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-[#41a100] shrink-0 font-semibold">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#41a100] mb-3 font-semibold">
                        {exp.organization}
                      </p>
                      <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                        {exp.desc}
                      </p>

                      {/* Sub-roles / Highlights */}
                      {exp.highlights && (
                        <div className="mb-4 space-y-2">
                          {exp.highlights.map((item, hIdx) => (
                            <div
                              key={hIdx}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono ${isDarkMode
                                ? "bg-zinc-950/60 border-zinc-800/80 text-zinc-300"
                                : "bg-slate-50 border-slate-200 text-slate-700"
                                }`}
                            >
                              <span className="font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#41a100]" />
                                {item.title}
                              </span>
                              <span className="text-[#41a100] font-semibold text-[11px]">
                                {item.period}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* External Website Button */}
                      {exp.link && (
                        <a
                          href={exp.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#41a100] hover:text-[#4cc000] bg-[#41a100]/10 hover:bg-[#41a100]/20 border border-[#41a100]/30 px-3.5 py-2 rounded-lg transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>{exp.link.label}</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Navigation Button */}
              <div className="pt-8 flex justify-center">
                <button
                  onClick={() => handleTabClick("projects")}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}



          {activeTab === "projects" && (
            <ProjectsSection
              isDarkMode={isDarkMode}
              handleTabClick={handleTabClick}
              tabTransition={tabTransition}
            />
          )}

          {/* SAYING MORE TAB / PAGE */}
          {activeTab === "saying-more" && (
            <motion.div
              key="saying-more"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-10"
            >
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-xs text-[#41a100] border mb-3 bg-emerald-50/10 border-emerald-500/20">
                  <BookOpen className="w-4 h-4" />
                  <span>Personal Philosophy & Vision</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  What I Believe!
                </h2>
                <p className={`text-base leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-slate-700"}`}>
                  Technology without purpose is just complexity. My goal isn&apos;t simply to make projects or train AI models. It is to solve human problems and pave paths for future generations in Ethiopia and beyond.
                </p>
              </div>

              {/* Deep Dive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className={`p-6 rounded-xl border space-y-3 ${isDarkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                    }`}
                >
                  <HeartHandshake className="w-8 h-8 text-[#41a100]" />
                  <h3 className="font-bold text-lg">Knowledge</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                    Through Winger Academy and local mentorship programs, I am dedicated to breaking down barriers to quality education, ensuring aspiring developers get guidance regardless of their background.
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl border space-y-3 ${isDarkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                    }`}
                >
                  <Cpu className="w-8 h-8 text-[#41a100]" />
                  <h3 className="font-bold text-lg">Embedded System</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                    Projects like AXION reflect my core passion: fusing embedded systems (Arduino, C++) with modern web frontends and AI models to build tactile, physical devices that change lives.
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl border space-y-3 ${isDarkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                    }`}
                >
                  <Globe className="w-8 h-8 text-[#41a100]" />
                  <h3 className="font-bold text-lg">Global Ambition</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                    Preparing for top-tier computer science and data science higher education to collaborate with global researchers and push the frontiers of Artificial Intelligence.
                  </p>
                </div>
              </div>

              {/* BLOG SECTION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#41a100]" />
                  <h3 className="text-xl font-bold tracking-tight">Recent Quick Read</h3>
                </div>

                <article
                  className={`p-6 rounded-xl border transition-all ${isDarkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                    }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20">
                      <Sparkles className="w-3 h-3" />
                    </span>
                    <span className={`text-xs font-mono ${isDarkMode ? "text-zinc-500" : "text-slate-400"}`}>
                      1 min read
                    </span>
                  </div>

                  <h4 className="text-lg font-bold mb-2">Did You Know? Goldfish Can See Ultraviolet Light</h4>

                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-slate-600"}`}>
                    Unlike human eyes, which rely on three visual pigments to detect light (red, green, and blue), goldfish possess tetrachromatic vision. They have four specialized cone receptors that allow them to perceive Ultraviolet (UV) light in addition to the visible spectrum. This unique evolutionary adaptation enables goldfish to navigate murky waters, detect prey invisible to human sight, and perceive polarized light underwater.
                  </p>
                </article>
              </div>

              {/* LET'S BUILD TOGETHER */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${isDarkMode ? "bg-zinc-900/30 border-zinc-800" : "bg-emerald-50/50 border-emerald-100"
                  }`}
              >
                <h3 className="text-xl font-bold mb-3">Let&apos;s Build Together</h3>
                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-zinc-300" : "text-slate-700"}`}>
                  Whether you are an engineer, a researcher, a university admissions director, or an innovator looking to collaborate on high-impact technological solutions, I am always excited to connect.
                </p>
                <button
                  onClick={() => handleTabClick("contact")}
                  className="bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Get In Touch With Me</span>
                </button>
              </div>
            </motion.div>
          )}
          {/* GET IN TOUCH TAB */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabTransition}
              className="space-y-8"
            >
              {/* Section Header */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                  <Send className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Get In Touch
                </h2>
                <p className={`text-xs sm:text-sm font-mono ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                  Have a question, collaboration proposal, or project idea? Send a message below or connect directly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                {/* Sidebar Info & Direct Channels */}
                <div className="md:col-span-5 space-y-4">
                  {/* Location Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-xl border space-y-2 ${isDarkMode ? "bg-zinc-900/40 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="flex items-center gap-2 text-[#41a100]">
                      <MapPin className="w-5 h-5 shrink-0" />
                      <h3 className="font-semibold text-sm">Location</h3>
                    </div>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                      Addis Ababa, Ethiopia
                    </p>
                  </div>

                  {/* Direct Contact Buttons */}
                  <div
                    className={`p-4 sm:p-5 rounded-xl border space-y-3 ${isDarkMode ? "bg-zinc-900/40 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <h3 className="font-semibold text-sm mb-1">Direct Channels</h3>

                    <a
                      href="mailto:weldamlak.a.endalew@gmail.com"
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all hover:border-[#41a100]/50 ${isDarkMode
                        ? "bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FaEnvelope className="w-4 h-4 text-[#41a100] shrink-0" />
                        <span className="truncate">weldamlak.a.endalew@gmail.com</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0 ml-2" />
                    </a>

                    <a
                      href="https://wa.me/251964995549"
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all hover:border-[#41a100]/50 ${isDarkMode
                        ? "bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FaWhatsapp className="w-4 h-4 text-[#41a100] shrink-0" />
                        <span>+251 964 995 549</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0 ml-2" />
                    </a>
                  </div>

                  {/* Social Networks */}
                  <div
                    className={`p-4 sm:p-5 rounded-xl border space-y-3 ${isDarkMode ? "bg-zinc-900/40 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="flex items-center gap-2 text-[#41a100]">
                      <Globe className="w-5 h-5 shrink-0" />
                      <h3 className="font-semibold text-sm">Social Profiles</h3>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        {
                          name: "LinkedIn",
                          url: "https://www.linkedin.com/in/weldamlak-ayenew",
                          icon: <FaLinkedin className="w-4 h-4" />,
                        },
                        {
                          name: "GitHub",
                          url: "https://github.com/weldamlak",
                          icon: <FaGithub className="w-4 h-4" />,
                        },
                        {
                          name: "Instagram",
                          url: "https://www.instagram.com/weldamlak.a",
                          icon: <FaInstagram className="w-4 h-4" />,
                        },
                        {
                          name: "Discord",
                          url: "https://discord.com/users/1503749867770609845",
                          icon: <FaDiscord className="w-4 h-4" />,
                        },
                        {
                          name: "X",
                          url: "https://x.com/WeldamlakAyenew",
                          icon: <FaXTwitter className="w-4 h-4" />,
                        },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          title={social.name}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-all hover:border-[#41a100] hover:text-[#41a100] ${isDarkMode
                            ? "bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                          {social.icon}
                          <span>{social.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Form */}
                <div className="md:col-span-7">
                  <form
                    onSubmit={handleFormSubmit}
                    className={`p-5 sm:p-6 rounded-xl border space-y-4 ${isDarkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                      }`}
                  >
                    <div>
                      <label className="block text-xs font-mono mb-1.5 font-medium">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#41a100] transition-colors ${isDarkMode
                          ? "bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                          }`}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono mb-1.5 font-medium">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#41a100] transition-colors ${isDarkMode
                          ? "bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                          }`}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono mb-1.5 font-medium">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#41a100] transition-colors ${isDarkMode
                          ? "bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                          }`}
                        placeholder="Type your message here..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </button>

                    {formSubmitted && (
                      <p className="text-xs text-emerald-500 font-mono text-center pt-2">
                        Thank you! Your message has been sent directly to my inbox.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImgIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImgIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Close wide image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Chevron Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Main Lightbox Wide Image Container */}
            <motion.div
              key={selectedImgIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src={galleryImages[selectedImgIndex]}
                alt={`Expanded view ${selectedImgIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white font-mono text-xs">
                <span>Highlight {selectedImgIndex + 1} of {galleryImages.length}</span>
                <span className="text-zinc-400">Use arrow keys to navigate</span>
              </div>
            </motion.div>

            {/* Right Chevron Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}