"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Cpu, Code } from "lucide-react";
import HonorsSection from "./HonorsSection";
import { TRAINING_ITEMS, SKILL_GROUPS } from "../lib/data";
import { tabTransition } from "../lib/animations";

interface AboutSectionProps {
  isDarkMode: boolean;
  handleTabClick: (id: string) => void;
}

export default function AboutSection({
  isDarkMode,
}: AboutSectionProps) {
  return (
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
          className={`leading-relaxed text-sm sm:text-base ${
            isDarkMode ? "text-zinc-300" : "text-slate-700"
          }`}
        >
          I am Weldamlak Ayenew, a high school graduate from Saint Joseph School in Addis Ababa.
          I am a Full-Stack AI Developer and Machine Learning Specialist. My technical focus involves building modern
          web applications using Next.js and combining them with Python-driven ML models for smart, real-world functionalities.
          As an aspiring computer engineer, I also work in hardware, designing circuits and PCBs and programming microcontrollers like the ESP32 to bring software and electronics together.
        </p>
        <p
          className={`leading-relaxed text-xs sm:text-sm mt-3 ${
            isDarkMode ? "text-zinc-400" : "text-slate-600"
          }`}
        >
          Beyond software and hardware engineering, my core passion is teaching and mentorship. I believe in leveraging education and
          technology to empower underserved students and nurture bright minds in Ethiopia.
        </p>
      </div>

      {/* Specialized Training */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <Cpu className="text-[#41a100] w-5 h-5" /> Specialized Training
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRAINING_ITEMS.map((item) => (
            <div
              key={item.title}
              className={`p-4 sm:p-5 rounded-lg border flex flex-col justify-between space-y-3 ${
                isDarkMode
                  ? "bg-zinc-900/50 border-zinc-800"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#41a100]">{item.label}</span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.linkTitle}
                    className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-700/50 shrink-0 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#41a100]/60"
                  >
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      fill
                      className="object-contain rounded-md"
                    />
                  </a>
                </div>
                <h4
                  className={`font-medium text-sm sm:text-base ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item.title}
                </h4>
                <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HonorsSection isDarkMode={isDarkMode} />

      {/* Core Skills Matrix */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <Code className="text-[#41a100] w-5 h-5" /> Technical Skills Matrix
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className={`p-4 rounded-lg border space-y-3 ${
                isDarkMode
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
                    className={`text-xs px-2 py-1 rounded font-mono ${
                      isDarkMode
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

    </motion.div>
  );
}