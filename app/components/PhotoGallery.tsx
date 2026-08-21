"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  galleryImages: string[];
  isDarkMode: boolean;
  setSelectedImgIndex: (index: number) => void;
}

export default function PhotoGallery({
  galleryImages,
  isDarkMode,
  setSelectedImgIndex,
}: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const total = galleryImages.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-advance timer set strictly to 2 seconds (2000ms)
  useEffect(() => {
    if (isHovered || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [handleNext, isHovered, total]);

  if (total === 0) return null;

  // Snappy horizontal slide + scale transition variants tailored for a 2s cadence
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      scale: 1.03,
      opacity: 0,
      filter: "blur(2px)",
    }),
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 350, damping: 32 },
        scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      scale: 0.97,
      opacity: 0,
      filter: "blur(2px)",
      transition: {
        x: { type: "spring", stiffness: 350, damping: 32 },
        scale: { duration: 0.3 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      className={`pt-10 border-t transition-colors duration-300 ${
        isDarkMode ? "border-zinc-800/80" : "border-slate-200"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#41a100]" />
          <h3
            className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            Highlights & Activity
          </h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20 font-semibold">
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Main Slider Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border transition-all duration-300 shadow-2xl ${
          isDarkMode
            ? "border-zinc-800 bg-zinc-950"
            : "border-slate-200 bg-slate-900"
        }`}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsHovered(true)}
            onDragEnd={(_, { offset }) => {
              setIsHovered(false);
              if (offset.x < -50) handleNext();
              else if (offset.x > 50) handlePrev();
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={galleryImages[currentIndex]}
              alt={`Highlight photo ${currentIndex + 1}`}
              fill
              priority
              className="object-cover pointer-events-none select-none"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            {/* Subtle aesthetic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Action Controls & Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-8">
          {/* Top Bar Controls */}
          <div className="flex justify-between items-center z-10">
            <span className="text-3xl sm:text-5xl font-mono font-bold text-white/90 drop-shadow-md select-none">
              #{String(currentIndex + 1).padStart(2, "0")}
            </span>

            <button
              onClick={() => setSelectedImgIndex(currentIndex)}
              className="pointer-events-auto p-3 rounded-full bg-black/40 hover:bg-[#41a100] text-white transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-transparent hover:scale-105 active:scale-95 shadow-lg group"
              aria-label="Expand image"
            >
              <Maximize2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            </button>
          </div>

          {/* Bottom Bar Controls & Navigation */}
          <div className="flex items-end justify-between z-10">
            {/* Interactive Dots / Progress Bar */}
            <div className="pointer-events-auto flex items-center gap-2">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="p-1 focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-[#41a100]"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all active:scale-90"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}