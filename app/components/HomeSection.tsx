"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download,
  ChevronRight,
  MapPin,
  Maximize2,
} from "lucide-react";
import PhotoGallery from "./PhotoGallery";
import { HIGHLIGHTS } from "../lib/data";
import { tabTransition, containerVariants, itemVariants } from "../lib/animations";

interface HomeSectionProps {
  isDarkMode: boolean;
  galleryImages: string[];
  handleTabClick: (id: string) => void;
  setSelectedImgIndex: (index: number) => void;
}


// Wide plus: arms are 60% of the width, so most of the photo stays visible
const PLUS =
  "polygon(20% 0, 80% 0, 80% 20%, 100% 20%, 100% 80%, 80% 80%, 80% 100%, 20% 100%, 20% 80%, 0 80%, 0 20%, 20% 20%)";

export default function HomeSection({
  isDarkMode,
  galleryImages,
  handleTabClick,
  setSelectedImgIndex,
}: HomeSectionProps) {
  // Scroll-linked parallax (hero text drifts up, avatar drifts down and tilts)
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -40]);
  const avatarY = useTransform(scrollY, [0, 500], [0, 70]);
  const avatarRotate = useTransform(scrollY, [0, 500], [0, 6]);

  return (
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
          style={{ y: textY }}
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
            Full-Stack & Machine Learning Developer and aspiring Computer Engineer. Founder of AXION Tech & Winger Academy. High school graduate from Saint Joseph School (Addis Ababa). Building modern web applications with Next.js & Tailwind, integrated with Python ML models to solve real-world problems, and combining hardware and software for Embedded Systems, IoT, and AI.
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
              className={`w-full sm:w-auto border font-mono text-sm px-5 py-3 rounded-md transition-all flex items-center justify-center space-x-2 ${
                isDarkMode
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
              className={`w-full sm:w-auto border font-mono text-sm px-5 py-3 rounded-md transition-all ${
                isDarkMode
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
  whileHover={{ scale: 1.03 }}
  style={{ y: avatarY, rotate: avatarRotate }}
  onClick={() => setSelectedImgIndex(0)}
  className="group relative h-56 w-56 cursor-pointer drop-shadow-2xl sm:h-72 sm:w-72 md:h-96 md:w-96"
>
  {/* outline (green, 3px) */}
  <div className="absolute inset-0 bg-accent" style={{ clipPath: PLUS }} />

  {/* photo */}
  <div
    className="absolute inset-[3px] overflow-hidden bg-zinc-900"
    style={{ clipPath: PLUS }}
  >
    <Image
      src="/profile1.jpg"
      alt="Weldamlak Ayenew"
      fill
      priority
      sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 384px"
      className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${isDarkMode ? "opacity-0" : "opacity-100"}`}
    />
    <Image
      src="/profile1.png"
      alt=""
      aria-hidden
      fill
      priority
      sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 384px"
      className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${isDarkMode ? "opacity-100" : "opacity-0"}`}
    />
    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/30 text-xs font-mono text-white opacity-0 transition-opacity group-hover:opacity-100">
      <Maximize2 className="h-4 w-4" />
      <span>View</span>
    </div>
  </div>
</motion.div>
        </div>
      </div>

      {/* Highlights Cards Staggered Animation */}
      <motion.div
        variants={containerVariants}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-10 ${
          isDarkMode ? "border-zinc-800/80" : "border-slate-200"
        }`}
      >
        {HIGHLIGHTS.map(({ Icon, title, desc, className }) => (
          <motion.div
            key={title}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`p-5 rounded-lg border ${className ?? ""} transition-all ${
              isDarkMode
                ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
            }`}
          >
            <Icon className="w-6 h-6 text-[#41a100] mb-3" />
            <h3
              className={`font-semibold mb-1 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {title}
            </h3>
            <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <section className="relative w-full">
        <PhotoGallery
          galleryImages={galleryImages}
          isDarkMode={isDarkMode}
          setSelectedImgIndex={setSelectedImgIndex}
        />
      </section>

    </motion.div>
  );
}