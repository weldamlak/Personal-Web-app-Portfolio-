"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  Globe,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface LinkItem {
  label: string;
  url: string;
}

interface Project {
  title: string;
  category: string;
  tech: string[];
  image: string;
  desc: string;
  links: LinkItem[];
}

interface ProjectsSectionProps {
  isDarkMode: boolean;
  handleTabClick: (tab: string) => void;
  tabTransition: any;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "PULSE Ethiopia",
    category: "Full-Stack & Security",
    tech: ["React", "JavaScript", "Tailwind", "Node.js", "Axion Tech"],
    image: "/P6.jpg",
    desc: "Digital Academic Records & Tracking System providing role-based security, real-time performance analytics, and transparent record management across Ethiopian educational institutions.",
    links: [
      { label: "Live System", url: "https://etdarts.netlify.app/" },
      {
        label: "GitHub Repo",
        url: "https://github.com/weldamlak/PULSE-Ethiopia-Digital-Academic-Records-Tracking-System",
      },
    ],
  },
  {
    title: "Focus 2018 Platform",
    category: "EdTech & Exams",
    tech: ["React", "JavaScript", "Tailwind", "Amharic i18n", "ESSLE Prep"],
    image: "/P5.jpg",
    desc: "Comprehensive Ethiopian University Entrance Exam (ESSLE) platform featuring timed exam simulations, study modules, interactive reader, and curated subject libraries.",
    links: [{ label: "Focus App", url: "https://focus2018.netlify.app/" }],
  },
  {
    title: "AXION Smart Wheelchair",
    category: "Robotics & C++",
    tech: ["C++", "Arduino", "Next.js", "IoT", "Solar"],
    image: "/P1.jpg",
    desc: "Intelligent mobility wheelchair featuring obstacle avoidance, solar power management, camera tracking, and a web control interface.",
    links: [
      { label: "AXION Web", url: "https://axionet.netlify.app/" },
      { label: "Details", url: "https://project-axion.vercel.app/" },
    ],
  },
  {
    title: "Winger Academy",
    category: "Full-Stack Web",
    tech: ["Next.js", "React", "Tailwind", "Supabase", "TS"],
    image: "/P2.jpg",
    desc: "Educational hub empowering Ethiopian students with study guides, coursework tracking, and academic mentor connections.",
    links: [{ label: "Platform", url: "https://wingeracademy.netlify.app/" }],
  },
  {
    title: "ML Analytics Suite",
    category: "Data Science",
    tech: ["Python", "Pandas", "NumPy", "Plotly", "Scikit-Learn"],
    image: "/P3.jpg",
    desc: "Interactive economic and data visualization models designed to analyze structural trends and predict growth metrics.",
    links: [{ label: "Data Suite", url: "https://weld-data.vercel.app/" }],
  },
  {
    title: "2D Arcade Engine",
    category: "Game Dev",
    tech: ["Python", "Pygame", "OOP", "Physics"],
    image: "/P4.jpg",
    desc: "Custom 2D endless runner built with physics mechanics, dynamic obstacle generation, custom sprites, and score tracking.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/weldamlak/python-game.git",
      },
    ],
  },
];

const ProjectCard = memo(
  ({ project, isDarkMode }: { project: Project; isDarkMode: boolean }) => (
    <article
      className={`group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 hover:border-[#41a100]/60 hover:shadow-lg ${
        isDarkMode
          ? "bg-zinc-900/50 border-zinc-800/80 shadow-md hover:shadow-[#41a100]/10"
          : "bg-white border-slate-200 shadow-sm hover:shadow-slate-200"
      }`}
    >
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-zinc-950 shrink-0">
        <Image
          src={project.image}
          alt={`${project.title} screenshot preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        <span className="absolute top-2.5 left-2.5 text-[10px] sm:text-xs font-mono font-semibold text-white bg-[#41a100] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            {project.title}
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            {project.desc}
          </p>
        </div>

        <div className="space-y-3.5 pt-2 border-t border-zinc-800/30">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded font-medium ${
                  isDarkMode
                    ? "bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#41a100] hover:text-white bg-[#41a100]/10 hover:bg-[#41a100] active:scale-95 border border-[#41a100]/30 px-3 py-2 rounded-lg transition-all duration-200 touch-manipulation"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
);

ProjectCard.displayName = "ProjectCard";

function ProjectsSection({
  isDarkMode,
  handleTabClick,
  tabTransition,
}: ProjectsSectionProps) {
  return (
    <motion.div
      key="projects"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabTransition}
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <Rocket className="text-[#41a100] w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          <span>Featured Works</span>
        </h2>
        <p
          className={`text-xs sm:text-sm font-mono ${
            isDarkMode ? "text-zinc-400" : "text-slate-600"
          }`}
        >
          A showcase of hardware, full-stack web platforms, data models, and
          interactive software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {/* GitHub Callout Banner with Inline SVG */}
      <div
        className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isDarkMode
            ? "bg-zinc-900/60 border-zinc-800"
            : "bg-slate-900 text-white border-slate-800 shadow-md"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20 shrink-0">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">
              Explore More on GitHub
            </h4>
            <p className="text-xs text-zinc-400 font-mono">
              Check out open-source repos and active codebases.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/weldamlak"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-xs font-semibold shadow transition-all duration-200 active:scale-95 shrink-0 touch-manipulation"
        >
          <span>github.com/weldamlak</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={() => handleTabClick("saying-more")}
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm font-semibold shadow-md transition-all duration-200 active:scale-95 touch-manipulation"
        >
          <Sparkles className="w-4 h-4" />
          <span>Next</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default memo(ProjectsSection);