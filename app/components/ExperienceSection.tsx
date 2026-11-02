"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, type Variants } from "framer-motion";
import { Briefcase, Globe, ExternalLink } from "lucide-react";
import CertificationsSection from "./CertificationsSection";
import { EXPERIENCES, type Experience } from "../lib/data";
import { tabTransition } from "../lib/animations";

interface ExperienceSectionProps {
  isDarkMode: boolean;
  handleTabClick: (id: string) => void;
}

/*
 * The logo used to be observed by whileInView while scaled to 0. A zero-size
 * element never reports as "in view" on several phone browsers, so it stayed
 * invisible. Now the real-size wrapper is observed and the logo just follows
 * it through variants.
 */
const nodeVariants: Variants = {
  hidden: { scale: 0.4, opacity: 0, rotate: -60 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

function TimelineItem({
  exp,
  isDarkMode,
  isLast,
}: {
  exp: Experience;
  isDarkMode: boolean;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // this item's own line segment fills as you scroll through it
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="group relative"
    >
      {/* Line segment: from this logo's centre down to the next one */}
      {!isLast && (
        <>
          <div
            aria-hidden
            className="absolute top-6 left-[-40px] h-[calc(100%+2rem)] w-0.5 -translate-x-1/2 bg-zinc-500/20 sm:top-8 sm:left-[-48px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute top-6 left-[-40px] h-[calc(100%+2rem)] w-0.5 origin-top -translate-x-1/2 bg-accent/60 shadow-[0_0_10px_var(--accent-glow)] sm:top-8 sm:left-[-48px]"
          />
        </>
      )}

      {/* Logo node, centred on the line */}
      <motion.div
        variants={nodeVariants}
        className="absolute top-0 left-[-64px] z-10 h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-accent bg-zinc-950 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:left-[-80px] sm:h-16 sm:w-16"
      >
        <Image
          src={exp.image}
          alt={`${exp.organization} logo`}
          fill
          sizes="64px"
          className="object-cover"
        />
      </motion.div>

      {/* Card */}
      <div
        className={`rounded-xl border p-5 transition-all duration-300 group-hover:border-accent/40 sm:p-6 ${
          isDarkMode ? "border-zinc-800 bg-zinc-900/40" : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <h3
            className={`text-base font-bold sm:text-lg ${
              isDarkMode ? "text-white" : "text-slate-950"
            }`}
          >
            {exp.role}
          </h3>
          <span className="shrink-0 font-mono text-xs font-semibold text-accent">{exp.period}</span>
        </div>
        <p className="mb-3 font-mono text-xs font-semibold text-accent">{exp.organization}</p>
        <p
          className={`mb-4 text-xs leading-relaxed sm:text-sm ${
            isDarkMode ? "text-zinc-400" : "text-slate-600"
          }`}
        >
          {exp.desc}
        </p>

        {exp.highlights && (
          <div className="mb-4 space-y-2">
            {exp.highlights.map((item) => (
              <div
                key={item.title}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 font-mono text-xs ${
                  isDarkMode
                    ? "border-zinc-800/80 bg-zinc-950/60 text-zinc-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item.title}
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-accent">{item.period}</span>
              </div>
            ))}
          </div>
        )}

        {exp.link && (
          <a
            href={exp.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3.5 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{exp.link.label}</span>
            <ExternalLink className="ml-0.5 h-3 w-3 opacity-80" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ExperienceSection({ isDarkMode }: ExperienceSectionProps) {
  return (
    <motion.div
      key="experience"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabTransition}
      className="space-y-8"
    >
      <div>
        <h2
          className={`mb-2 flex items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-3xl ${
            isDarkMode ? "text-white" : "text-slate-950"
          }`}
        >
          <Briefcase className="h-6 w-6 text-accent sm:h-7 sm:w-7" /> Leadership & Experience
        </h2>
        <p className={`font-mono text-xs sm:text-sm ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
          Building technology initiatives and driving educational impact.
        </p>
      </div>

      <div className="relative space-y-8 pl-16 sm:pl-20">
        {EXPERIENCES.map((exp, i) => (
          <TimelineItem
            key={exp.organization}
            exp={exp}
            isDarkMode={isDarkMode}
            isLast={i === EXPERIENCES.length - 1}
          />
        ))}
      </div>

      <CertificationsSection isDarkMode={isDarkMode} />

    </motion.div>
  );
}