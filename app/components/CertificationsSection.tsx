"use client";

import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  Building2,
  Cpu,
  GraduationCap,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description: string;
  image: string;
  badge?: string;
}

interface CategoryGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  certificates: Certificate[];
}

const CERTIFICATE_CATEGORIES: CategoryGroup[] = [
  {
    id: "academic",
    label: "Academic & School",
    icon: GraduationCap,
    certificates: [
      {
        id: "school-1",
        title: "Appreciation for G12 Examination App",
        issuer: "Saint Joseph School",
        description: "Awarded for exceptional contributions to expanding the question bank for Class XII matric exam prep.",
        image: "/CER/SCHOOL.jpg",
        badge: "Appreciation",
      },
      {
        id: "school-2",
        title: "Summer Camp 2026 Volunteer Service",
        issuer: "Saint Joseph School",
        date: "August 2026",
        description: "Recognized for outstanding dedication as a volunteer at St. Joseph's Summer Camp.",
        image: "/CER/SCHOOL2.JPG",
        badge: "Volunteer",
      },
      {
        id: "school-3",
        title: "Addis Ababa City Science Fair Representation",
        issuer: "Saint Joseph School & AA City Education Bureau",
        date: "2024/2025",
        description: "Represented Saint Joseph School with distinction at the Addis Ababa City Education Bureau Science Fair.",
        image: "/CER/SCHOOL3.jpg",
        badge: "Participation",
      },
      {
        id: "school-4",
        title: "Certificate of Merit (Distinction)",
        issuer: "Saint Joseph School",
        date: "August 2026",
        description: "Awarded for achieving Distinction (90% and above in 5 subjects).",
        image: "/CER/SCHOOL4.jpg",
        badge: "Merit",
      },
      {
        id: "school-5",
        title: "Bahire Hasab Research Project",
        issuer: "Saint Joseph School Language Department",
        date: "2025",
        description: "Outstanding performance in Grade 11 research project selected among top five projects.",
        image: "/CER/SCHOOL5.JPG",
        badge: "Top 5 Project",
      },
      {
        id: "school-6",
        title: "Career & Technical Education (Web Design)",
        issuer: "Addis Ababa City Administration Education Bureau",
        date: "2024 - 2026",
        description: "Successful completion of Grade 11 & 12 Level One Web Design & Development Career Pathway.",
        image: "/CER/SCHOOL6.jpg",
        badge: "CTE Level 1",
      },
    ],
  },
  {
    id: "startup",
    label: "Startup & Innovation",
    icon: Building2,
    certificates: [
      {
        id: "startup-1",
        title: "Bruh-Ethiopia Innovative Business Idea Winner",
        issuer: "Ministry of Labor and Skills & EDI",
        date: "December 2025",
        description: "Recognized as competition winner after completing Design Your Venture Workshop.",
        image: "/CER/Startup.jpg",
        badge: "Winner",
      },
      {
        id: "startup-2",
        title: "Labor & Skill Office Recognition",
        issuer: "Kirkos Sub City Administration",
        description: "Official recognition from Kirkos Sub City Labor & Skill Office.",
        image: "/CER/Startup2.jpg",
      },
      {
        id: "startup-3",
        title: "Innovation Recognition",
        issuer: "Addis Ababa City Administration Labor & Skill Bureau",
        description: "Certificate from Addis Ababa Labor & Skill Bureau.",
        image: "/CER/Startup3.jpg",
      },
    ],
  },
  {
    id: "science-tech",
    label: "Science & Tech Competitions",
    icon: Cpu,
    certificates: [
      {
        id: "stc-1",
        title: "1st Place Gold Medal - City-Wide Innovation Exhibition",
        issuer: "Addis Ababa City Administration Education Bureau",
        date: "2018 E.C. (2026)",
        description: "Achieved First Place Gold Medal in city-wide Science and Technology Innovation Exhibition.",
        image: "/CER/STC.jpg",
        badge: "1st Place Gold",
      },
      {
        id: "stc-2",
        title: "Kirkos Sub-City Science Fair Award",
        issuer: "Kirkos Sub-City Education Office",
        date: "2018 E.C.",
        description: "Recognized for high achievement in student/teacher science & tech innovation competition.",
        image: "/CER/STC2.jpg",
      },
      {
        id: "stc-3",
        title: "Kirkos Innovation Award",
        issuer: "Kirkos Sub-City Education Office",
        date: "2018 E.C.",
        description: "Awarded for exceptional creative projects at sub-city level.",
        image: "/CER/STC3.jpg",
      },
      {
        id: "stc-4",
        title: "Kirkos Sub-City Innovation Certificate",
        issuer: "Kirkos Sub-City Education Office",
        date: "2017 E.C. (2025)",
        description: "Completed project presentation under the theme 'Innovation from Promise to Culture'.",
        image: "/CER/STC4.jpg",
      },
    ],
  },
  {
    id: "trainings",
    label: "Trainings & Projects",
    icon: BookOpen,
    certificates: [
      {
        id: "uda-1",
        title: "Data Analysis Fundamentals Nanodegree",
        issuer: "Udacity",
        date: "August 17, 2025",
        description: "Verified Nanodegree Program Completion in Data Analysis Fundamentals.",
        image: "/CER/UDA1.jpg",
        badge: "Nanodegree",
      },
      {
        id: "uda-2",
        title: "Programming Fundamentals Nanodegree",
        issuer: "Udacity",
        date: "August 10, 2025",
        description: "Verified Nanodegree Program Completion in Programming Fundamentals.",
        image: "/CER/UDA2.jpg",
        badge: "Nanodegree",
      },
      {
        id: "uda-3",
        title: "Android Developer Fundamentals Nanodegree",
        issuer: "Udacity",
        date: "August 13, 2025",
        description: "Verified Nanodegree Program Completion in Android Development.",
        image: "/CER/UDA3.jpg",
        badge: "Nanodegree",
      },
      {
        id: "uda-4",
        title: "Artificial Intelligence Fundamentals Nanodegree",
        issuer: "Udacity",
        date: "August 7, 2025",
        description: "Verified Nanodegree Program Completion in AI Fundamentals.",
        image: "/CER/UDA4.jpg",
        badge: "Nanodegree",
      },
      {
        id: "uda-ra",
        title: "The Udara Project - Agentic AI",
        issuer: "NSK AI",
        date: "July 13, 2026",
        description: "Completed virtual AI class engineering agentic artificial intelligence solutions.",
        image: "/CER/UDARA.jpg",
        badge: "Agentic AI",
      },
      {
        id: "proj-venture",
        title: "Project Venture - 2nd Place Winner",
        issuer: "Project Venture",
        date: "July 27, 2026",
        description: "Earned 2nd Place while serving as Head of Presentation evaluated by panel of judges.",
        image: "/CER/PROJECTV.jpg",
        badge: "2nd Place",
      },
    ],
  },
  {
    id: "space-science",
    label: "Space Science (ESSS)",
    icon: Sparkles,
    certificates: [
      {
        id: "esss-1",
        title: "Intermediate Astronomy & Astrophysics",
        issuer: "Ethiopian Space Science Society (ESSS)",
        date: "August 2021",
        description: "Completed Summer Space School on Intermediate Astronomy, Astrophysics, & Space Engineering.",
        image: "/CER/ESSS.jpg",
      },
      {
        id: "esss-2",
        title: "Technical Presenter - Summer Space School",
        issuer: "Ethiopian Space Science Society (ESSS)",
        date: "August 2021",
        description: "Shared technical knowledge as presenter at Addis Ababa Institute of Technology.",
        image: "/CER/ESSS2.jpg",
        badge: "Presenter",
      },
      {
        id: "esss-3",
        title: "Summer Space Training Ceremony Presenter",
        issuer: "Ethiopian Space Science Society (ESSS)",
        date: "August 19, 2023",
        description: "Outstanding presentation at closing ceremony held at AAIT.",
        image: "/CER/ESSS3.jpg",
      },
      {
        id: "esss-4",
        title: "Summer Space Training Volunteer",
        issuer: "Ethiopian Space Science Society (ESSS)",
        date: "August 2024",
        description: "Volunteer participation in Summer Space Training Programme at AAIT.",
        image: "/CER/ESSS4.jpg",
        badge: "Volunteer",
      },
      {
        id: "esss-5",
        title: "20th ESSS General Assembly Volunteer",
        issuer: "Ethiopian Space Science Society (ESSS)",
        date: "May 2025",
        description: "Volunteered at 20th General Assembly at Addis Ababa University.",
        image: "/CER/ESSS5.jpg",
        badge: "Assembly Volunteer",
      },
    ],
  },
  {
    id: "international-competitions",
    label: "International Contests",
    icon: Award,
    certificates: [
      {
        id: "iaac",
        title: "International Astronomy & Astrophysics Competition 2026",
        issuer: "IAAC",
        date: "May 4, 2026",
        description: "Prefinalist Qualifier receiving special honour for digitally written submission.",
        image: "/CER/IAAC.jpg",
        badge: "Prefinalist",
      },
      {
        id: "icsc",
        title: "International Computer Science Competition 2026",
        issuer: "ICSC",
        date: "July 20, 2026",
        description: "Prefinalist Qualifier with special honour for code passing all test cases.",
        image: "/CER/ICSC.jpg",
        badge: "Prefinalist",
      },
    ],
  },
  {
    id: "others",
    label: "Other Distinctions",
    icon: BookOpen,
    certificates: [
      {
        id: "strathmore",
        title: "Mathematics Contest",
        issuer: "Strathmore University",
        date: "March 7, 2026",
        description: "Participated in Strathmore University Mathematics Contest held in Addis Ababa.",
        image: "/CER/Other.jpg",
      },
      {
        id: "kotebe",
        title: "10th Science, Tech & Innovation Day",
        issuer: "Kotebe University Education / STEM Bureau",
        date: "May 2022",
        description: "Presented innovative research work at 10th STI Day.",
        image: "/CER/Other2.jpg",
      },
      {
        id: "vote-le-ethiopia",
        title: "Election Coordinator Recognition",
        issuer: "Vote Le Ethiopiaye Charitable Organization",
        date: "April 20, 2021",
        description: "Election Coordinator for 'New Student, New Africa, New World' project.",
        image: "/CER/Other.jpg",
        badge: "Coordinator",
      },
    ],
  },
];

interface CertificationsSectionProps {
  isDarkMode?: boolean;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCertificatesCount = useMemo(() => {
    return CERTIFICATE_CATEGORIES.reduce((acc, cat) => acc + cat.certificates.length, 0);
  }, []);

  const allCertificates = useMemo(() => {
    if (activeTab === "all") {
      return CERTIFICATE_CATEGORIES.flatMap((cat) => cat.certificates);
    }
    const cat = CERTIFICATE_CATEGORIES.find((c) => c.id === activeTab);
    return cat ? cat.certificates : [];
  }, [activeTab]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % allCertificates.length);
  }, [selectedIndex, allCertificates.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + allCertificates.length) % allCertificates.length);
  }, [selectedIndex, allCertificates.length]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  return (
    <section className="w-full py-6 sm:py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-8 gap-2 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
              <Award className="w-4 h-4 text-[#41a100]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#41a100] font-semibold">
                Honors & Verification
              </span>
            </div>
            <h2 className={`text-xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Certifications & Accomplishments
            </h2>
          </div>
          <p className={`text-xs sm:text-sm max-w-md ${isDarkMode ? "text-zinc-400" : "text-slate-500"}`}>
            Interactive collection of official awards, degree completions, and contest distinctions.
          </p>
        </div>

        {/* Optimized Mobile Filter Bar - Touch-friendly pills & CSS Snap Scrolling */}
        <div className="block lg:hidden w-full mb-5 -mx-4 px-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory touch-pan-x">
          <div className="flex items-center gap-2 min-w-max">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`snap-start flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all min-h-[40px] touch-manipulation active:scale-95 ${
                activeTab === "all"
                  ? "bg-[#41a100] text-white shadow-md shadow-[#41a100]/25 font-semibold"
                  : isDarkMode
                  ? "bg-zinc-900/90 border border-zinc-800 text-zinc-300 active:bg-zinc-800"
                  : "bg-white border border-slate-200 text-slate-700 active:bg-slate-100 shadow-sm"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>All</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === "all"
                  ? "bg-black/20 text-white"
                  : isDarkMode
                  ? "bg-zinc-800 text-zinc-400"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {totalCertificatesCount}
              </span>
            </button>

            {CERTIFICATE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`snap-start flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all min-h-[40px] touch-manipulation active:scale-95 ${
                    isActive
                      ? "bg-[#41a100] text-white shadow-md shadow-[#41a100]/25 font-semibold"
                      : isDarkMode
                      ? "bg-zinc-900/90 border border-zinc-800 text-zinc-300 active:bg-zinc-800"
                      : "bg-white border border-slate-200 text-slate-700 active:bg-slate-100 shadow-sm"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-black/20 text-white"
                      : isDarkMode
                      ? "bg-zinc-800 text-zinc-400"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {cat.certificates.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Desktop Dual Mode Vertical Sidebar Navigation */}
          <div className={`hidden lg:flex lg:col-span-1 flex-col gap-1.5 p-3 rounded-2xl border backdrop-blur-md sticky top-20 transition-colors ${
            isDarkMode 
              ? "border-zinc-800/80 bg-zinc-950/60 shadow-xl shadow-black/20" 
              : "border-slate-200/90 bg-white/80 shadow-md shadow-slate-200/50"
          }`}>
            <div className={`px-3 py-2 flex items-center justify-between border-b mb-1 ${
              isDarkMode ? "border-zinc-800/60" : "border-slate-100"
            }`}>
              <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                isDarkMode ? "text-zinc-400" : "text-slate-400"
              }`}>
                Categories
              </span>
              <span className="w-2 h-2 rounded-full bg-[#41a100] animate-pulse" />
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                activeTab === "all"
                  ? "bg-[#41a100] text-white shadow-md shadow-[#41a100]/20 font-semibold"
                  : isDarkMode
                  ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeTab === "all" ? "text-white" : "text-[#41a100]"}`} />
                <span>All Certificates</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                activeTab === "all"
                  ? "bg-black/20 text-white"
                  : isDarkMode
                  ? "bg-zinc-900 text-zinc-400 border border-zinc-800"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}>
                {totalCertificatesCount}
              </span>
            </button>

            {CERTIFICATE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? "bg-[#41a100] text-white shadow-md shadow-[#41a100]/20 font-semibold"
                      : isDarkMode
                      ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-[#41a100]"}`} />
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 ${
                    isActive
                      ? "bg-black/20 text-white"
                      : isDarkMode
                      ? "bg-zinc-900 text-zinc-400 border border-zinc-800"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>
                    {cat.certificates.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid View - Optimized for mobile tap targets and performance */}
          <div className="lg:col-span-3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {allCertificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`group relative flex flex-col rounded-2xl sm:rounded-xl overflow-hidden border transition-colors ${
                    isDarkMode
                      ? "border-zinc-800/80 bg-zinc-900/60 hover:border-[#41a100]/60 active:border-[#41a100]"
                      : "border-slate-200 bg-white hover:border-[#41a100]/60 shadow-sm"
                  }`}
                >
                  <div
                    onClick={() => setSelectedIndex(index)}
                    className="relative w-full h-48 sm:h-48 bg-zinc-950 overflow-hidden cursor-pointer touch-manipulation"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-102"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/50 sm:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-[10px] font-mono text-emerald-400 backdrop-blur-md bg-black/70 px-2 py-1 rounded border border-emerald-500/30">
                        Tap to View
                      </span>
                      <div className="p-2 rounded-full bg-[#41a100] text-white shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {cert.badge && (
                      <span className="absolute top-2.5 right-2.5 text-[9px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#41a100] text-white shadow-md">
                        {cert.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-4 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
                        <span className="truncate pr-2 font-semibold text-[#41a100]">{cert.issuer}</span>
                        {cert.date && <span className="shrink-0 text-zinc-400">{cert.date}</span>}
                      </div>
                      <h3 className={`text-sm font-semibold tracking-tight mb-1 line-clamp-2 ${
                        isDarkMode ? "text-zinc-100" : "text-slate-900"
                      }`}>
                        {cert.title}
                      </h3>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      }`}>
                        {cert.description}
                      </p>
                    </div>

                    <div className={`pt-3 mt-3 border-t flex items-center justify-between ${
                      isDarkMode ? "border-zinc-800/80" : "border-slate-100"
                    }`}>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`text-xs font-medium flex items-center gap-1.5 transition-colors py-1 touch-manipulation active:scale-95 ${
                          isDarkMode
                            ? "text-zinc-300 hover:text-[#41a100]"
                            : "text-slate-700 hover:text-[#41a100]"
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Full Screen
                      </button>
                      <a
                        href={cert.image}
                        download
                        className="p-2 text-zinc-400 hover:text-[#41a100] transition-colors touch-manipulation active:scale-95"
                        title="Download Certificate File"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MOBILE OPTIMIZED LIGHTBOX MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6 select-none touch-none"
                onClick={() => setSelectedIndex(null)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Top Mobile Controls Bar */}
                <div
                  className="w-full flex items-center justify-between z-10 pt-safe"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs font-mono text-zinc-300 bg-zinc-900/90 px-3 py-1.5 rounded-full border border-zinc-800">
                    {selectedIndex + 1} / {allCertificates.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={allCertificates[selectedIndex].image}
                      download
                      className="p-3 rounded-full bg-zinc-800/90 text-white active:bg-[#41a100] transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="Download Certificate"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      className="p-3 rounded-full bg-zinc-800/90 text-white active:bg-red-600 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="Close Lightbox"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Desktop Arrow Buttons (Hidden on Mobile) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800/80 text-white hover:bg-[#41a100] transition-colors z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800/80 text-white hover:bg-[#41a100] transition-colors z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Display */}
                <div
                  className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden px-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-[55vh] sm:h-[75vh]">
                    <Image
                      src={allCertificates[selectedIndex].image}
                      alt={allCertificates[selectedIndex].title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Bottom Information Bar */}
                <div
                  className="w-full text-center max-w-xl mx-auto pt-2 pb-safe z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs font-mono text-[#41a100] uppercase font-semibold block">
                    {allCertificates[selectedIndex].issuer} {allCertificates[selectedIndex].date && `• ${allCertificates[selectedIndex].date}`}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1 line-clamp-1">
                    {allCertificates[selectedIndex].title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2 px-2">
                    {allCertificates[selectedIndex].description}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 mt-2 sm:hidden font-mono">
                    <ChevronLeft className="w-3 h-3" /> Swipe left or right to navigate <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default memo(CertificationsSection);