"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  galleryImages: string[];
  selectedImgIndex: number | null;
  setSelectedImgIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Lightbox({
  galleryImages,
  selectedImgIndex,
  setSelectedImgIndex,
}: LightboxProps) {
  const total = galleryImages.length;

  const handlePrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedImgIndex((prev) =>
        prev === null ? prev : prev === 0 ? total - 1 : prev - 1
      );
    },
    [total, setSelectedImgIndex]
  );

  const handleNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedImgIndex((prev) =>
        prev === null ? prev : prev === total - 1 ? 0 : prev + 1
      );
    },
    [total, setSelectedImgIndex]
  );

  // Keyboard controls: Escape closes, arrows navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIndex === null) return;
      if (e.key === "Escape") setSelectedImgIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIndex, handlePrevImage, handleNextImage, setSelectedImgIndex]);

  return (
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
              <span>
                Highlight {selectedImgIndex + 1} of {galleryImages.length}
              </span>
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
  );
}