"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Sparkles } from "lucide-react";

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
  return (
    <div
      className={`pt-10 border-t transition-colors duration-300 ${
        isDarkMode ? "border-zinc-800/80" : "border-slate-200"
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#41a100] animate-pulse" />
          <h3
            className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            Highlights & Activity
          </h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20 font-semibold">
          {galleryImages.length} Shots
        </span>
      </div>

      {/* Grid container with inline animation delays */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
        {galleryImages.map((imgPath, index) => {
          const isFeatured = index === 0 || index === 5;
          const isTall = index === 2;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImgIndex(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                isFeatured
                  ? "col-span-2 row-span-2"
                  : isTall
                  ? "col-span-1 row-span-2"
                  : "col-span-1 row-span-1"
              } ${
                isDarkMode
                  ? "border-zinc-800/80 bg-zinc-900/60 hover:border-[#41a100]/60 hover:shadow-[0_0_25px_-5px_rgba(65,161,0,0.3)]"
                  : "border-slate-200 bg-slate-100 hover:border-[#41a100]/80 shadow-sm hover:shadow-xl hover:shadow-[#41a100]/10"
              }`}
            >
              <Image
                src={imgPath}
                alt={`Highlight photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Hover Details Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <div className="flex items-center justify-between transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-mono text-emerald-400 backdrop-blur-md bg-black/40 px-2 py-1 rounded-md border border-emerald-500/30">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="p-2 rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/50">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}