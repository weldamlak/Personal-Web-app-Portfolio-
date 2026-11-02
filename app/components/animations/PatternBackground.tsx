"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Flat, gradient-free texture behind the whole site.
 *  - Layer 1: round dot grid everywhere (slow parallax)
 *  - Layer 2: a different pattern per tab, cross-faded (faster parallax)
 *      home / contact → "WELDAMLAK" name pattern
 *      about          → square dots
 *      experience     → rings
 *      projects       → plus marks
 *      blog           → diamonds
 *  - Layer 3: sparse green accent shapes
 * Every pattern's scroll offset is wrapped by its tile height, so the
 * parallax loops seamlessly forever.
 */

type Kind = "dots" | "squares" | "rings" | "crosses" | "diamonds" | "name" | "accent";

const TILE: Record<Kind, { w: number; h: number }> = {
  dots: { w: 22, h: 22 },
  squares: { w: 26, h: 26 },
  rings: { w: 34, h: 34 },
  crosses: { w: 30, h: 30 },
  diamonds: { w: 28, h: 28 },
  name: { w: 150, h: 56 },
  accent: { w: 132, h: 132 },
};

const TAB_PATTERN: Record<string, Kind> = {
  home: "name",
  about: "squares",
  experience: "rings",
  projects: "crosses",
  "saying-more": "diamonds",
  contact: "name",
};

const NAME = "WELDAMLAK";

function PatternShapes({ kind }: { kind: Kind }) {
  switch (kind) {
    case "dots":
      return <circle cx="11" cy="11" r="1.2" fill="currentColor" />;
    case "squares":
      return <rect x="11.5" y="11.5" width="3" height="3" fill="currentColor" />;
    case "rings":
      return (
        <circle cx="17" cy="17" r="3.6" fill="none" stroke="currentColor" strokeWidth="1" />
      );
    case "crosses":
      return (
        <path
          d="M15 11.5v7M11.5 15h7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      );
    case "diamonds":
      return (
        <rect
          x="12.25"
          y="12.25"
          width="3.5"
          height="3.5"
          transform="rotate(45 14 14)"
          fill="currentColor"
        />
      );
    case "name": {
      const style = {
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 9,
        letterSpacing: 3,
        fontWeight: 600,
      } as const;
      return (
        <>
          <text x="2" y="18" fill="currentColor" style={style}>{NAME}</text>
          <text x="77" y="46" fill="currentColor" style={style}>{NAME}</text>
          <text x="-73" y="46" fill="currentColor" style={style}>{NAME}</text>
        </>
      );
    }
    case "accent":
      return (
        <>
          <circle cx="22" cy="22" r="2.2" fill="#41a100" />
          <rect x="84" y="40" width="5" height="5" fill="#41a100" />
          <circle cx="104" cy="104" r="4" fill="none" stroke="#41a100" strokeWidth="1.2" />
          <path d="M40 98v8M36 102h8" stroke="#41a100" strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
  }
}

function PatternLayer({
  kind,
  speed,
  className,
}: {
  kind: Kind;
  speed: number;
  className: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const { w, h } = TILE[kind];
  const y = useTransform(scrollY, (v) => (reduce ? 0 : -((v * speed) % h)));
  const id = `pattern-${kind}`;

  return (
    <motion.div
      style={{ y, height: `calc(100% + ${h}px)` }}
      className={`absolute left-0 top-0 w-full ${className}`}
    >
      <svg width="100%" height="100%" aria-hidden>
        <defs>
          <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
            <PatternShapes kind={kind} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </motion.div>
  );
}

interface PatternBackgroundProps {
  activeTab: string;
  isDarkMode: boolean;
}

export default function PatternBackground({ activeTab, isDarkMode }: PatternBackgroundProps) {
  const kind = TAB_PATTERN[activeTab] ?? "dots";
  const base = isDarkMode ? "text-white/[0.17]" : "text-slate-900/[0.18]";
  const overlay = isDarkMode ? "text-white/[0.15]" : "text-slate-900/[0.14]";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft focus: a hair of blur keeps the pattern visible but calm */}
      <div className="absolute -inset-3 blur-[0.5px]">
      <PatternLayer kind="dots" speed={0.12} className={`transition-colors duration-300 ${base}`} />

      <AnimatePresence>
        <motion.div
          key={kind}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <PatternLayer kind={kind} speed={0.22} className={`transition-colors duration-300 ${overlay}`} />
        </motion.div>
      </AnimatePresence>

      <PatternLayer kind="accent" speed={0.32} className="opacity-80" />
      </div>

      {/* haze so text on top stays easy to read */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDarkMode ? "bg-[#0d0d0d]/10" : "bg-slate-50/15"
        }`}
      />
    </div>
  );
}