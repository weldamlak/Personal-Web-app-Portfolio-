"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Send,
  Share2,
  BookOpen,
  Share,
  MessageSquare,
  Check,
  ExternalLink,
  HeartHandshake,
  Cpu,
  Globe,
  GraduationCap,
} from "lucide-react";

interface BlogSectionProps {
  isDarkMode: boolean;
  handleTabClick: (tab: string) => void;
  tabTransition?: any;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  fullText: string;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "goldfish-vision",
    title: "Did You Know? Goldfish Can See Ultraviolet Light",
    category: "Science & Vision",
    date: "Aug 2026",
    fullText:
      "Unlike human eyes, which rely on three visual pigments to detect light (red, green, and blue), goldfish possess tetrachromatic vision. They have four specialized cone receptors that allow them to perceive Ultraviolet (UV) light in addition to the visible spectrum. This unique evolutionary adaptation enables goldfish to navigate murky waters, detect prey invisible to human sight, and perceive polarized light underwater.",
  },
  {
    id: "bahire-hasab-algo",
    title: "Preserving Ancient Algorithms: Digitizing Bahire Hasab",
    category: "Computer Science",
    date: "AUG 2026",
    fullText:
      "Bahire Hasab (ባሕረ ሐሳብ) is a mathematical system used for centuries to calculate movable feasts and astronomical cycles. By translating these ancient algorithmic rules into clean Python and TypeScript libraries, we ensure cultural preservation while giving modern software developers simple APIs for traditional calendrical computations.",
  },
  {
    id: "embedded-ai-ethiopia",
    title: "Edge AI & Real-World Hardware: Lessons from Axion",
    category: "AI & Hardware",
    date: "AUG 2026",
    fullText:
      "Deploying vision models on lightweight edge devices requires balancing frame rate, thermal constraints, and quantization. By deploying micro-TensorFlow models directly to microcontrollers, smart assistive technology like intelligent mobility aids can perform real-time obstacle avoidance without relying on cloud bandwidth.",
  },
];

const SayingMoreSection = ({
  isDarkMode,
  handleTabClick,
  tabTransition,
}: BlogSectionProps) => {
  const [activeSubTab, setActiveSubTab] = useState<"articles" | "social">(
    "articles"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All",
    "Science & Vision",
    "Computer Science",
    "AI & Hardware",
  ];

  const handleShare = (post: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}#blog-${post.id}`
      );
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredPosts =
    selectedCategory === "All"
      ? INITIAL_POSTS
      : INITIAL_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <motion.div
      key="blog"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={
        tabTransition || {
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -15 },
        }
      }
      className="space-y-10"
    >
      {/* WHAT I BELIEVE SECTION */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            What I Believe!
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-zinc-300" : "text-slate-700"
            }`}
          >
            Technology without purpose is just complexity. My goal isn&apos;t
            simply to make projects. It is to solve human problems and pave
            paths for future generations in Ethiopia.
          </p>
        </div>

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-3 transition-all ${
              isDarkMode
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <HeartHandshake className="w-7 h-7 text-[#41a100]" />
            <h3 className="font-bold text-base sm:text-lg">Knowledge</h3>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? "text-zinc-400" : "text-slate-600"
              }`}
            >
              Through Winger Academy and local mentorship programs, I am
              dedicated to breaking down barriers to quality education,
              ensuring aspiring developers get guidance regardless of their
              background.
            </p>
          </div>

          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-3 transition-all ${
              isDarkMode
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <Cpu className="w-7 h-7 text-[#41a100]" />
            <h3 className="font-bold text-base sm:text-lg">Embedded System</h3>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? "text-zinc-400" : "text-slate-600"
              }`}
            >
              Projects like AXION reflect my core passion: fusing embedded
              systems (Arduino, C++) with modern web frontends and AI models to
              build tactile, physical devices that change lives.
            </p>
          </div>

          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-3 transition-all ${
              isDarkMode
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <Globe className="w-7 h-7 text-[#41a100]" />
            <h3 className="font-bold text-base sm:text-lg">Global Ambition</h3>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? "text-zinc-400" : "text-slate-600"
              }`}
            >
              Preparing for top-tier computer science and data science higher
              education to collaborate with global researchers and push the
              frontiers of Artificial Intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION HEADER & SUB-NAV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-4 border-b border-zinc-800/40">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#41a100]" />
            <span>Thoughts, Writes & Socials</span>
          </h2>
          <p
            className={`text-xs sm:text-sm font-mono ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            A digital notebook for tech quick-reads, engineering insights, and leadership updates.
          </p>
        </div>

        {/* Segmented Control Toggle Switch */}
        <div
          className={`grid grid-cols-2 p-1 rounded-xl border w-full sm:w-auto shrink-0 ${
            isDarkMode
              ? "bg-zinc-900/80 border-zinc-800"
              : "bg-slate-200/70 border-slate-300/80"
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveSubTab("articles")}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
              activeSubTab === "articles"
                ? "bg-[#41a100] text-white shadow-sm"
                : isDarkMode
                ? "text-zinc-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("social")}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
              activeSubTab === "social"
                ? "bg-[#41a100] text-white shadow-sm"
                : isDarkMode
                ? "text-zinc-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Share className="w-3.5 h-3.5" />
            <span>Social Feeds</span>
          </button>
        </div>
      </div>

      {/* ARTICLES TAB VIEW */}
      {activeSubTab === "articles" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-[#41a100]/20 text-[#41a100] border-[#41a100]"
                    : isDarkMode
                    ? "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                id={`blog-${post.id}`}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 shadow-md"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20">
                      <Sparkles className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        isDarkMode ? "text-zinc-500" : "text-slate-400"
                      }`}
                    >
                      • {post.date}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight mb-2">
                  {post.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    isDarkMode ? "text-zinc-300" : "text-slate-600"
                  }`}
                >
                  {post.fullText}
                </p>

                {/* Article Share Bar */}
                <div className="flex items-center justify-end pt-3 border-t border-zinc-800/20">
                  <button
                    type="button"
                    onClick={() => handleShare(post)}
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-lg border transition-all active:scale-95 ${
                      copiedId === post.id
                        ? "bg-[#41a100]/20 text-[#41a100] border-[#41a100]/40"
                        : isDarkMode
                        ? "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:text-white"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {copiedId === post.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#41a100]" />
                        <span>Copied Link</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Post</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* SOCIAL FEEDS TAB VIEW */}
      {activeSubTab === "social" && (
        <div className="space-y-6">
          <p
            className={`text-xs font-mono ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            Direct embeds & research profiles:
          </p>

          {/* ACADEMIA.EDU FEATURED BANNER */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
              isDarkMode
                ? "bg-zinc-900/70 border-zinc-800 hover:border-[#41a100]/40"
                : "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#41a100]/40"
            }`}
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="p-3 rounded-xl bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20 shrink-0 hidden sm:block">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#41a100] font-bold">
                  Academic Research Profile
                </span>
                <h3 className="font-bold text-base sm:text-lg">
                  Academia.edu Publications
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isDarkMode ? "text-zinc-400" : "text-slate-600"
                  }`}
                >
                  Explore published papers, algorithms, and computational research preprints.
                </p>
              </div>
            </div>

            <a
              href="https://independent.academia.edu/WeldamlakEndalew"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-xs font-semibold shadow transition-all duration-200 active:scale-95 shrink-0"
            >
              <GraduationCap className="w-4 h-4 sm:hidden" />
              <span>Visit Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* LinkedIn Embed 1 */}
            <div
              className={`p-3 rounded-2xl border flex flex-col items-center overflow-hidden ${
                isDarkMode
                  ? "bg-zinc-900/40 border-zinc-800"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="w-full flex items-center justify-between px-2 py-1.5 mb-2 border-b border-zinc-800/20">
                <span className="text-xs font-mono font-semibold text-[#41a100]">
                  LinkedIn Update
                </span>
                <a
                  href="https://www.linkedin.com/posts/weldamlak-ayenew_alxmun2026-mun-leadership-activity-7457304722245312512-i1SX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-zinc-400 hover:text-[#41a100] flex items-center gap-1"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full overflow-x-auto flex justify-center">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7494282239493496832"
                  height="626"
                  width="100%"
                  className="max-w-[504px] rounded-lg border-0"
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded LinkedIn post 1"
                />
              </div>
            </div>

            {/* LinkedIn Embed 2 */}
            <div
              className={`p-3 rounded-2xl border flex flex-col items-center overflow-hidden ${
                isDarkMode
                  ? "bg-zinc-900/40 border-zinc-800"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="w-full flex items-center justify-between px-2 py-1.5 mb-2 border-b border-zinc-800/20">
                <span className="text-xs font-mono font-semibold text-[#41a100]">
                  Leadership Post
                </span>
                <a
                  href="https://www.linkedin.com/posts/weldamlak-ayenew_alxmun2026-mun-leadership-activity-7457304722245312512-i1SX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-zinc-400 hover:text-[#41a100] flex items-center gap-1"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full overflow-x-auto flex justify-center">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7328851604068052994?collapsed=1"
                  height="523"
                  width="100%"
                  className="max-w-[504px] rounded-lg border-0"
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded LinkedIn post 2"
                />
              </div>
            </div>
          </div>

          {/* TikTok Featured Banner */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDarkMode
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-slate-900 text-white border-slate-800 shadow-md"
            }`}
          >
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#41a100] font-bold">
                TikTok Video Highlight
              </span>
            </div>

            <a
              href="https://vm.tiktok.com/ZSVgb6DwH/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-xs font-semibold shadow transition-all duration-200 active:scale-95 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Watch on TikTok</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* LET'S BUILD TOGETHER CALLOUT */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border ${
          isDarkMode
            ? "bg-zinc-900/30 border-zinc-800"
            : "bg-emerald-50/50 border-emerald-100"
        }`}
      >
        <h3 className="text-xl font-bold mb-3">Let&apos;s Build Together</h3>
        <p
          className={`text-sm leading-relaxed mb-6 ${
            isDarkMode ? "text-zinc-300" : "text-slate-700"
          }`}
        >
          Whether you are an engineer, a researcher, a university admissions director, or an innovator looking to collaborate on high-impact technological solutions, I am always excited to connect.
        </p>
        <button
          type="button"
          onClick={() => handleTabClick("contact")}
          className="w-full sm:w-auto bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>Get In Touch With Me</span>
        </button>
      </div>
    </motion.div>
  );
};

export default memo(SayingMoreSection);