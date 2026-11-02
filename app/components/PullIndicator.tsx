"use client";

import React, { useMemo } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useSettledValue } from "../hooks/useSettledValue";

interface PullIndicatorProps {
  isDarkMode: boolean;
  label: string | null; // page the pull leads to
  isBack: boolean; // last page: the pull goes back one page
  pull: MotionValue<number>; // 0 → 1
  onGo: () => void;
  bottom: number; // px from the bottom of the screen (sits just above the footer)
}

/** Small button that only appears while the user keeps scrolling past the bottom. */
export default function PullIndicator({ isDarkMode, label, isBack, pull, onGo, bottom }: PullIndicatorProps) {
  const info = useMemo(() => ({ label, isBack }), [label, isBack]);
  const shown = useSettledValue(info, pull);

  const p = useTransform(pull, (v) => Math.min(1, Math.max(0, v)));
  const opacity = useTransform(p, [0, 0.06, 0.2], [0, 0, 1]);
  const y = useTransform(p, [0, 0.2], [14, 0]);
  const scale = useTransform(p, [0, 0.2], [0.94, 1]);
  const fill = useTransform(p, (v) => `${v * 100}%`);
  const pointerEvents = useTransform(opacity, (o): "auto" | "none" => (o > 0.5 ? "auto" : "none"));

  if (!shown.label) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
      style={{ bottom }}
    >
      <motion.button
        type="button"
        onClick={onGo}
        style={{ opacity, y, scale, pointerEvents }}
        className={`relative overflow-hidden rounded-full border px-6 py-2.5 font-mono text-xs font-semibold shadow-lg backdrop-blur-md ${
          isDarkMode
            ? "border-zinc-700 bg-zinc-900/90 text-zinc-100"
            : "border-slate-300 bg-white/90 text-slate-800"
        }`}
      >
        <motion.span
          aria-hidden
          style={{ width: fill }}
          className={`absolute inset-y-0 left-0 ${isDarkMode ? "bg-white/15" : "bg-accent/25"}`}
        />
        <span className="relative">
          {shown.isBack ? "Previous" : "Next"}: {shown.label}
        </span>
      </motion.button>
    </div>
  );
}