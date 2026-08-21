"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Sparkles } from "lucide-react";

interface PhotoGalleryProps {
  galleryImages: string[];
  isDarkMode: boolean;
  setSelectedImgIndex: (index: number) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  galleryImages = [],
  isDarkMode,
  setSelectedImgIndex,
}) => {
  if (!galleryImages.length) return null;

  const total = galleryImages.length;

  return (
    <section
      className={`pt-8 sm:pt-10 border-t transition-colors duration-300 ${
        isDarkMode ? "border-zinc-800/80" : "border-slate-200"
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#41a100] animate-pulse" />
          <h2
            className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            Highlights & Activity
          </h2>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20 font-semibold">
          {total} {total === 1 ? "Shot" : "Shots"}
        </span>
      </div>

      {/* Grid Container with Dense Packing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-flow-dense gap-2.5 sm:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]">
        {galleryImages.map((imgPath, index) => {
          const isLast = index === total - 1;
          const isFeatured = index === 0;
          const isWide = index === 3;
          const isTall = index === 2 || index === 6;

          // If it's the 10th image (or last item) and trailing, stretch it across all columns into a feature banner
          let spanClasses = "col-span-1 row-span-1";

          if (isLast && total % 2 !== 0 && total >= 5) {
            spanClasses = "col-span-2 sm:col-span-3 md:col-span-4 row-span-1 sm:row-span-2";
          } else if (isFeatured) {
            spanClasses = "col-span-2 row-span-2";
          } else if (isWide) {
            spanClasses = "col-span-2 row-span-1";
          } else if (isTall) {
            spanClasses = "col-span-1 sm:row-span-2";
          }

          return (
            <motion.button
              key={`${imgPath}-${index}`}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImgIndex(index)}
              aria-label={`View photo ${index + 1}`}
              className={`group relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border text-left outline-none focus-visible:ring-2 focus-visible:ring-[#41a100] transition-all duration-300 ${spanClasses} ${
                isDarkMode
                  ? "border-zinc-800/80 bg-zinc-900/60 hover:border-[#41a100]/60 hover:shadow-[0_0_20px_-5px_rgba(65,161,0,0.3)]"
                  : "border-slate-200 bg-slate-100 hover:border-[#41a100]/80 shadow-sm hover:shadow-lg hover:shadow-[#41a100]/10"
              }`}
            >
              <Image
                src={imgPath}
                alt={`Highlight photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Hover/Focus Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-4">
                <div className="flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] sm:text-xs font-mono text-emerald-400 backdrop-blur-md bg-black/50 px-2 py-0.5 sm:py-1 rounded-md border border-emerald-500/30 font-medium">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="p-1.5 sm:p-2 rounded-full bg-[#41a100] text-white shadow-md shadow-[#41a100]/40">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default memo(PhotoGallery);