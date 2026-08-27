"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Award, CheckCircle2, ExternalLink, ArrowLeft, X, Maximize2 } from "lucide-react";

interface HonorItem {
  title: string;
  subtitle: string;
  images: string[];
  badge: string;
}

const HONORS_DATA: HonorItem[] = [
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
    images: ["/CER/ENG.jpg"],
    badge: "Winner",
  },
];

interface HonorsSectionProps {
  isDarkMode?: boolean;
}

export default function HonorsSection({ isDarkMode = false }: HonorsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
        <Award className="text-[#41a100] w-5 h-5 shrink-0" /> Honors & Awards
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HONORS_DATA.map((award, idx) => (
          <div
            key={idx}
            className={`group p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
              isDarkMode
                ? "bg-zinc-900/50 border-zinc-800/80 hover:bg-zinc-900/80 hover:border-[#41a100]/50"
                : "bg-white border-slate-200 shadow-sm hover:shadow-slate-200 hover:border-[#41a100]/50"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0" />
                  <span className="text-xs font-mono font-semibold text-[#41a100] uppercase tracking-wider">
                    {award.title}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isDarkMode
                      ? "bg-[#41a100]/10 text-[#41a100] border-[#41a100]/30"
                      : "bg-[#41a100]/10 text-[#2d7000] border-[#41a100]/30"
                  }`}
                >
                  {award.badge}
                </span>
              </div>

              <h4
                className={`font-semibold text-sm sm:text-base leading-snug ${
                  isDarkMode ? "text-zinc-100" : "text-slate-900"
                }`}
              >
                {award.subtitle}
              </h4>
            </div>

            <div
              className={`grid gap-2 rounded-lg p-1.5 border ${
                isDarkMode
                  ? "bg-zinc-950/60 border-zinc-800/60"
                  : "bg-slate-50 border-slate-200/80"
              } ${award.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {award.images.map((imgSrc, imgIdx) => (
                <div key={imgIdx} className="flex flex-col space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedImage(imgSrc)}
                    title="Click to view full screen"
                    className="relative h-32 sm:h-40 w-full rounded-md overflow-hidden bg-zinc-950/20 group/img block text-left cursor-pointer touch-manipulation active:scale-[0.98] transition-transform"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${award.subtitle} preview ${imgIdx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                      loading="lazy"
                    />

                    {/* Desktop-only Hover Overlay */}
                    <div className="hidden md:flex absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 items-center justify-center p-2">
                      <span className="text-white text-[10px] sm:text-[11px] font-mono bg-black/75 px-2.5 py-1 rounded border border-white/20 shadow-md">
                        View Image
                      </span>
                    </div>

                    {/* Mobile Minimal Visual Indicator */}
                    <div className="md:hidden absolute top-2 left-2 p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </button>

                  <a
                    href="https://translate.google.com/?sl=auto&tl=en&op=images"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[10px] font-mono flex items-center justify-center gap-1 py-1 rounded transition-colors touch-manipulation active:bg-zinc-800/20 ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-[#41a100] hover:bg-zinc-800/60"
                        : "text-slate-500 hover:text-[#41a100] hover:bg-slate-200/60"
                    }`}
                  >
                    <span>Translate via Google</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {mounted &&
        selectedImage &&
        createPortal(
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-between p-4 sm:p-6 bg-black/95 backdrop-blur-md select-none touch-none animate-in fade-in duration-200"
          >
            <div 
              className="w-full flex items-center justify-between z-20 pt-safe"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-800/90 text-white text-xs font-mono active:bg-[#41a100] transition-all border border-white/10 shadow-lg touch-manipulation min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-2.5 rounded-full bg-zinc-800/90 text-white active:bg-red-600 transition-colors border border-white/10 shadow-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden px-1 py-4"
            >
              <div className="relative w-full h-[65vh] sm:h-[80vh]">
                <Image
                  src={selectedImage}
                  alt="Award Full View"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div 
              className="w-full text-center pb-safe z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[11px] font-mono text-zinc-400">
                Tap anywhere outside or press back to exit view
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}