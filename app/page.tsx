"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import {
  ChevronRight,
  Code,
  Cpu,
  Award,
  Briefcase,
  Sparkles,
  Globe,
  User,
  MapPin,
  Send,
  Rocket,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

// Types
type TabId = "home" | "about" | "experience" | "projects" | "contact";
type ThemeMode = "dark" | "light";

interface NavItem {
  id: TabId;
  label: string;
}

interface Project {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  technologies: string[];
  span?: boolean;
}

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string[];
  current?: boolean;
}

// Constants
const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Recent Work" },
  { id: "contact", label: "Get In Touch" },
];

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/weldamlak-ayenew",
  github: "https://github.com",
  twitter: "https://x.com",
} as const;

// Animation Variants
const ANIMATION_VARIANTS = {
  tabTransition: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2, ease: "easeIn" as const },
    },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] as const },
    },
  },
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleTabClick = useCallback((id: TabId) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const themeClasses = useMemo(
    () => ({
      background: isDarkMode ? "bg-[#0d0d0d] text-white" : "bg-slate-50 text-slate-900",
      nav: isDarkMode
        ? "bg-[#18181b]/95 border-zinc-800/80"
        : "bg-white/90 border-slate-200/90 shadow-slate-200/50",
      text: {
        primary: isDarkMode ? "text-white" : "text-slate-900",
        secondary: isDarkMode ? "text-zinc-400" : "text-slate-600",
        muted: isDarkMode ? "text-zinc-300" : "text-slate-700",
      },
      card: isDarkMode
        ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
        : "bg-white border-slate-200 shadow-sm hover:border-slate-300",
      border: isDarkMode ? "border-zinc-800" : "border-slate-200",
    }),
    [isDarkMode]
  );

  const projects: Project[] = [
    {
      title: "AXION Smart Wheelchair",
      description:
        "Assistive mobility device featuring a real-time AI camera system (TensorFlow), joystick/app control, automatic navigation, obstacle avoidance, voice feedback, GPS tracking, and health monitoring.",
      category: "AI & Assistive Robotics",
      icon: <Sparkles className="w-4 h-4 text-[#41a100]" />,
      technologies: ["Python", "TensorFlow", "Embedded Systems"],
    },
    {
      title: "Focus2018 Exam Prep",
      description:
        "National exam preparation ecosystem built to help Ethiopian high school students master national examination subjects through structured practice and performance analytics.",
      category: "EdTech Platform",
      icon: <Globe className="w-4 h-4 text-[#41a100]" />,
      technologies: ["Next.js", "Tailwind CSS", "Node.js"],
    },
    {
      title: "PULSE Ethiopia",
      description:
        "Centralized educational data analytics platform aggregating and evaluating academic metrics to help institutions identify performance gaps.",
      category: "Data Analytics",
      icon: <ExternalLink className="w-4 h-4 text-[#41a100]" />,
      technologies: ["Next.js", "React", "Analytics"],
    },
    {
      title: "FAOSTAT CPI Data Analyzer",
      description:
        "Data analysis and machine learning pipeline to model and forecast Food Consumer Price Index (CPI) trends.",
      category: "Machine Learning",
      icon: <Cpu className="w-4 h-4 text-[#41a100]" />,
      technologies: ["Python", "Scikit-Learn", "Next.js"],
    },
    {
      title: "Productivity & Screen Time Control App",
      description:
        "Cross-platform mobile application featuring Pomodoro focus timers and usage restriction tools designed to optimize student focus and time management.",
      category: "Mobile Development",
      icon: <ExternalLink className="w-4 h-4 text-[#41a100]" />,
      technologies: ["React Native", "TypeScript"],
      span: true,
    },
  ];

  const experiences: Experience[] = [
    {
      period: "Jan 2026 – Present",
      title: "Startup Founder & Tech Innovator",
      company: "AXION Tech",
      current: true,
      description: [
        "Founded a technology initiative focused on scalable, high-impact innovations in Ethiopia.",
        "Developed and deployed a national exam preparation ecosystem helping Ethiopian high school students prepare for national examinations.",
        "Placed 2nd at City Level (June 2025), awarded 100,000 ETB funding by the Addis Ababa City Administration Labor and Skills Bureau.",
      ],
    },
    {
      period: "2023 – Present",
      title: "Teaching, Volunteer Work & Community Impact",
      company: "Winger Academy Initiative",
      description: [
        "Founded an educational initiative supporting underserved students with tutoring and learning resources.",
        "Teaching Math, English, and Science to Grades 9–12 students at Wegene Foundation.",
        "Instructed Robotics & Programming at Saint Joseph School Summer Camp (2026).",
      ],
    },
    {
      period: "2024 – 2025",
      title: "Advocacy & Digital Literacy",
      company: "ENG Ethiopia & Meta",
      description: [
        "Placed 1st in Digital Literacy & Advocacy Program sponsored by Meta.",
        "Co-organized 1st Ethiopian Digital Literacy Olympiad and authored digital literacy handbook.",
        "Appointed advisor to mentor new ambassadors for digital literacy campaigns reaching 1M+ individuals.",
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-[#41a100] selection:text-white relative overflow-hidden ${themeClasses.background}`}
    >
      <Analytics />
      <Navigation
        activeTab={activeTab}
        isDarkMode={isDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        onTabClick={handleTabClick}
        onToggleTheme={toggleTheme}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 min-h-[85vh] flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeTab
              key="home"
              isDarkMode={isDarkMode}
              onNavigate={handleTabClick}
            />
          )}
          {activeTab === "about" && <AboutTab key="about" isDarkMode={isDarkMode} />}
          {activeTab === "experience" && (
            <ExperienceTab key="experience" isDarkMode={isDarkMode} experiences={experiences} />
          )}
          {activeTab === "projects" && (
            <ProjectsTab key="projects" isDarkMode={isDarkMode} projects={projects} />
          )}
          {activeTab === "contact" && <ContactTab key="contact" isDarkMode={isDarkMode} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Navigation Component
function Navigation({
  activeTab,
  isDarkMode,
  mobileMenuOpen,
  onTabClick,
  onToggleTheme,
  onToggleMobileMenu,
}: {
  activeTab: TabId;
  isDarkMode: boolean;
  mobileMenuOpen: boolean;
  onTabClick: (id: TabId) => void;
  onToggleTheme: () => void;
  onToggleMobileMenu: () => void;
}) {
  const socialIcons = [
    { href: SOCIAL_LINKS.linkedin, icon: <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />, label: "LinkedIn Profile" },
    { href: SOCIAL_LINKS.github, icon: <FaGithub className="w-4 h-4 md:w-5 md:h-5" />, label: "GitHub Profile" },
    { href: SOCIAL_LINKS.twitter, icon: <FaXTwitter className="w-4 h-4 md:w-5 md:h-5" />, label: "Twitter/X Profile" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4">
      <nav
        className={`backdrop-blur-md border rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl relative transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#18181b]/95 border-zinc-800/80"
            : "bg-white/90 border-slate-200/90 shadow-slate-200/50"
        }`}
      >
        <span className="font-mono text-sm font-bold text-[#41a100] md:hidden">
          Weldamlak.A
        </span>

        <div className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabClick(item.id)}
              className={`font-mono text-xs md:text-sm transition-colors py-1 ${
                activeTab === item.id
                  ? "text-[#41a100] font-semibold"
                  : isDarkMode
                  ? "text-zinc-400 hover:text-zinc-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark/light mode"
            className={`p-1.5 rounded-lg border transition-colors ${
              isDarkMode
                ? "border-zinc-800 text-amber-400 hover:bg-zinc-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className={`h-4 w-px ${isDarkMode ? "bg-zinc-800" : "bg-slate-200"}`} />

          <div className={`flex items-center space-x-3 ${isDarkMode ? "text-zinc-400" : "text-slate-500"}`}>
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={`transition-colors p-1 ${
                  isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark/light mode"
            className={`p-1.5 rounded-lg border transition-colors ${
              isDarkMode ? "border-zinc-800 text-amber-400" : "border-slate-200 text-slate-700"
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            className={`p-1 focus:outline-none ${
              isDarkMode ? "text-zinc-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-full left-0 right-0 mt-2 border rounded-xl p-4 flex flex-col space-y-3 shadow-2xl md:hidden z-50 ${
                isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-slate-200"
              }`}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabClick(item.id)}
                  className={`font-mono text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-[#41a100]/10 text-[#41a100] font-semibold"
                      : isDarkMode
                      ? "text-zinc-300 hover:bg-zinc-800/50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div
                className={`pt-3 border-t flex items-center space-x-6 px-3 ${
                  isDarkMode ? "border-zinc-800 text-zinc-400" : "border-slate-200 text-slate-500"
                }`}
              >
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// Home Tab Component
function HomeTab({ isDarkMode, onNavigate }: { isDarkMode: boolean; onNavigate: (id: TabId) => void }) {
  const highlights = [
    {
      icon: <Code className="w-6 h-6 text-[#41a100] mb-3" />,
      title: "Full-Stack AI",
      description: "Next.js, React, Tailwind CSS, Python, and Machine Learning models.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-[#41a100] mb-3" />,
      title: "Founder & CEO",
      description: "Leading AXION Tech and educational impact through Winger Academy.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#41a100] mb-3" />,
      title: "Recognized Innovator",
      description: "1st Place City Science Competition & Top 20 National Startup Finalist.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS.tabTransition}
      className="space-y-12 sm:space-y-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#41a100] rounded-full blur-[120px] pointer-events-none -z-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <motion.div
          variants={ANIMATION_VARIANTS.containerVariants}
          className="order-2 md:order-1 md:col-span-7 space-y-5 text-center md:text-left"
        >
          <motion.div variants={ANIMATION_VARIANTS.itemVariants}>
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-xs text-[#41a100] border ${
                isDarkMode ? "bg-zinc-900/80 border-zinc-800" : "bg-emerald-50 border-emerald-200"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </motion.div>

          <motion.h1
            variants={ANIMATION_VARIANTS.itemVariants}
            className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Weldamlak.A Endalew
          </motion.h1>

          <motion.p
            variants={ANIMATION_VARIANTS.itemVariants}
            className={`font-mono text-xs sm:text-sm leading-relaxed max-w-xl mx-auto md:mx-0 ${
              isDarkMode ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            Full-Stack AI Developer & Machine Learning Specialist. Founder of AXION Tech & Winger Academy.
            High school graduate from Saint Joseph School (Addis Ababa). Building modern web applications
            with Next.js & Tailwind, integrated with Python ML models to solve real-world problems.
          </motion.p>

          <motion.div
            variants={ANIMATION_VARIANTS.itemVariants}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("projects")}
              className="w-full sm:w-auto bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-6 py-3 rounded-md transition-all shadow-[0_0_25px_rgba(65,161,0,0.35)] flex items-center justify-center space-x-2"
            >
              <span>Let&apos;s get started</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("contact")}
              className={`w-full sm:w-auto border font-mono text-sm px-6 py-3 rounded-md transition-all ${
                isDarkMode
                  ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300"
                  : "border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-sm"
              }`}
            >
              Get in touch
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 shadow-2xl ${
              isDarkMode
                ? "border-zinc-800 bg-zinc-900 shadow-[#41a100]/10"
                : "border-slate-200 bg-white shadow-slate-200"
            }`}
          >
            <Image
              src="/profile1.jpg"
              alt="Weldamlak Ayenew"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={ANIMATION_VARIANTS.containerVariants}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-10 ${
          isDarkMode ? "border-zinc-800/80" : "border-slate-200"
        }`}
      >
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            variants={ANIMATION_VARIANTS.itemVariants}
            whileHover={{ y: -4 }}
            className={`p-5 rounded-lg border transition-all ${
              index === 2 ? "sm:col-span-2 md:col-span-1" : ""
            } ${
              isDarkMode
                ? "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
            }`}
          >
            {highlight.icon}
            <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {highlight.title}
            </h3>
            <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
              {highlight.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// About Tab Component
function AboutTab({ isDarkMode }: { isDarkMode: boolean }) {
  const training = [
    {
      year: "2026",
      title: "Ethiopian Artificial Intelligence Institute (EAII) Summer Camp",
      description: "Selected for the Machine Learning track to advance skills in core AI technologies.",
    },
    {
      year: "2025",
      title: "INSA Summer Camp (Embedded Systems)",
      description: "One of 40 students accepted into Robotics & Electrical Engineering. Selected as 1 of 4 students to present a final project directly to the head of the institute.",
    },
    {
      year: "Internship",
      title: "CodeAlpha",
      description: "Machine Learning Intern building applied AI and Python projects.",
    },
    {
      year: "Mentorship",
      title: "Sci-Mi Mentorship",
      description: "Completed specialized Computer Science studies under the Sci-Mi summer mentorship program.",
    },
  ];

  const awards = [
    "1st Place Champion – Addis Ababa City-Wide Science & Technology Competition (2026)",
    "1st Place Winner – Kirkos Subcity Science Fair (2025 & 2026)",
    "Top 20 Finalist – Bruh Federal/National Startup Competition (2025)",
    "1st Place Winner – Digital Literacy & Advocacy Program (ENG Ethiopia & Meta, 2024)",
    "Top 5 Best Research Papers – Saint Joseph School (Grade 11 Research, 2025)",
    "Leadership Certification – Youth Ambassadors Advisory Role (ENG Ethiopia, 2025)",
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS.tabTransition}
      className="space-y-10 sm:space-y-12"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <User className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> About Me
        </h2>
        <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? "text-zinc-300" : "text-slate-700"}`}>
          I am Weldamlak Ayenew, a high school graduate from Saint Joseph School in Addis Ababa (Class of August 2026).
          I am a Full-Stack AI Developer and Machine Learning Specialist. My technical focus involves building modern
          web applications using Next.js and combining them with Python-driven ML models for smart, real-world functionalities.
        </p>
        <p className={`leading-relaxed text-xs sm:text-sm mt-3 ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
          Beyond software engineering, my core passion is teaching and mentorship. I believe in leveraging education and
          technology to empower underserved students and nurture bright minds in Ethiopia.
        </p>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <Cpu className="text-[#41a100] w-5 h-5" /> Key Highlights & Specialized Training
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {training.map((item, index) => (
            <div
              key={index}
              className={`p-4 sm:p-5 rounded-lg border space-y-2 ${
                isDarkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <span className="text-xs font-mono text-[#41a100]">{item.year}</span>
              <h4 className={`font-medium text-sm sm:text-base ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {item.title}
              </h4>
              <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="text-[#41a100] w-5 h-5" /> Honors & Awards
        </h3>
        <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono ${isDarkMode ? "text-zinc-300" : "text-slate-700"}`}>
          {awards.map((award, index) => (
            <li
              key={index}
              className={`flex items-start gap-2.5 p-3 rounded-md border ${
                isDarkMode ? "bg-zinc-900/30 border-zinc-800/60" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
              <span>{award}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Experience Tab Component
function ExperienceTab({ isDarkMode, experiences }: { isDarkMode: boolean; experiences: Experience[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS.tabTransition}
      className="space-y-10"
    >
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
        <Briefcase className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Experience & Leadership
      </h2>

      <div className={`space-y-8 border-l pl-4 sm:pl-6 ml-2 ${isDarkMode ? "border-zinc-800" : "border-slate-300"}`}>
        {experiences.map((exp, index) => (
          <div key={index} className="relative space-y-2 sm:space-y-3">
            <div
              className={`absolute -left-[21px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full ${
                exp.current ? "bg-[#41a100]" : isDarkMode ? "bg-zinc-700" : "bg-slate-300"
              }`}
            />
            <span className="text-xs font-mono text-[#41a100]">{exp.period}</span>
            <h3 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {exp.title}
            </h3>
            <div className={`text-xs sm:text-sm space-y-2 ${isDarkMode ? "text-zinc-300" : "text-slate-700"}`}>
              {exp.description.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Projects Tab Component
function ProjectsTab({ isDarkMode, projects }: { isDarkMode: boolean; projects: Project[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS.tabTransition}
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Code className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Featured Projects
        </h2>
        <p className={`text-xs sm:text-sm ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
          Selected robotics, full-stack, and machine learning software solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className={`p-5 sm:p-6 rounded-lg space-y-3 flex flex-col justify-between border transition-all ${
              project.span ? "md:col-span-2" : ""
            } ${
              isDarkMode
                ? "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#41a100]">{project.category}</span>
                {project.icon}
              </div>
              <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {project.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-slate-600"}`}>
                {project.description}
              </p>
            </div>
            <div className={`pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className={
                    isDarkMode
                      ? "bg-zinc-800 px-2 py-1 rounded"
                      : "bg-slate-100 px-2 py-1 rounded border border-slate-200"
                  }
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Contact Tab Component
function ContactTab({ isDarkMode }: { isDarkMode: boolean }) {
  const inputClasses = `w-full text-sm px-3 py-2 rounded-md border focus:outline-none focus:border-[#41a100] transition-colors ${
    isDarkMode
      ? "bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500"
      : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
  }`;

  const labelClasses = `block text-xs font-mono mb-1 ${
    isDarkMode ? "text-zinc-300" : "text-slate-700"
  }`;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS.tabTransition}
      className="space-y-8 max-w-xl mx-auto w-full"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
          <Send className="text-[#41a100] w-6 h-6" /> Get In Touch
        </h2>
        <p className={`text-xs sm:text-sm ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
          Have a project in mind or want to collaborate? Send me a message!
       
