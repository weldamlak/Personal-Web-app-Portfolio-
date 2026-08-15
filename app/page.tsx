"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next"
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
} from "lucide-react";

import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Recent Work" },
    { id: "contact", label: "Get In Touch" },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#41a100] selection:text-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4">
        <nav className="bg-[#18181b]/95 backdrop-blur-md border border-zinc-800/80 rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl relative">
          
          {/* Logo / Brand Name on Mobile */}
          <span className="font-mono text-sm font-bold text-[#41a100] md:hidden">
            Weldamlak.A
          </span>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`font-mono text-xs md:text-sm transition-colors py-1 ${
                  activeTab === item.id
                    ? "text-[#41a100] font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4 text-zinc-400">
            <a
              href="https://www.linkedin.com/in/weldamlak-ayenew"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-white transition-colors p-1"
            >
              <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-white transition-colors p-1"
            >
              <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter/X Profile"
              className="hover:text-white transition-colors p-1"
            >
              <FaXTwitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden text-zinc-300 hover:text-white p-1 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#18181b] border border-zinc-800 rounded-xl p-4 flex flex-col space-y-3 shadow-2xl md:hidden z-50"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`font-mono text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-[#41a100]/10 text-[#41a100] font-semibold"
                        : "text-zinc-300 hover:bg-zinc-800/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="pt-3 border-t border-zinc-800 flex items-center space-x-6 px-3 text-zinc-400">
                  <a
                    href="https://www.linkedin.com/in/weldamlak-ayenew"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="hover:text-white transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter/X Profile"
                    className="hover:text-white transition-colors"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 min-h-[85vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* HOME TAB */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className="space-y-12 sm:space-y-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Hero Text */}
                <div className="order-2 md:order-1 md:col-span-7 space-y-5 text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full font-mono text-xs text-[#41a100]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Addis Ababa, Ethiopia</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                    Weldamlak.A Endalew
                  </h1>

                  <p className="font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                    Full-Stack AI Developer & Machine Learning Specialist. Founder of
                    AXION Tech & Winger Academy. High school graduate from Saint
                    Joseph School (Addis Ababa). Building modern web applications
                    with Next.js & Tailwind, integrated with Python ML models to solve real-world problems.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="w-full sm:w-auto bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm px-6 py-3 rounded-md transition-all shadow-[0_0_20px_rgba(65,161,0,0.4)] flex items-center justify-center space-x-2"
                    >
                      <span>Let&apos;s get started</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="w-full sm:w-auto border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 font-mono text-sm px-6 py-3 rounded-md transition-all"
                    >
                      Get in touch
                    </button>
                  </div>
                </div>

                {/* Profile Avatar */}
                <div className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-zinc-800 shadow-2xl bg-zinc-900">
                    <Image
                      src="/profile1.jpg"
                      alt="Weldamlak Ayenew"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Highlights Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t border-zinc-800/80 pt-10">
                <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-lg">
                  <Code className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3 className="font-semibold text-white mb-1">Full-Stack AI</h3>
                  <p className="text-xs text-zinc-400">
                    Next.js, React, Tailwind CSS, Python, and Machine Learning models.
                  </p>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-lg">
                  <Rocket className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3 className="font-semibold text-white mb-1">Founder & CEO</h3>
                  <p className="text-xs text-zinc-400">
                    Leading AXION Tech and educational impact through Winger Academy.
                  </p>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-lg sm:col-span-2 md:col-span-1">
                  <Award className="w-6 h-6 text-[#41a100] mb-3" />
                  <h3 className="font-semibold text-white mb-1">Recognized Innovator</h3>
                  <p className="text-xs text-zinc-400">
                    1st Place City Science Competition & Top 20 National Startup Finalist.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className="space-y-10 sm:space-y-12"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
                  <User className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> About Me
                </h2>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  I am Weldamlak Ayenew, a high school graduate from Saint Joseph School in Addis Ababa (Class of August 2026). 
                  I am a Full-Stack AI Developer and Machine Learning Specialist. My technical focus involves building modern 
                  web applications using Next.js and combining them with Python-driven ML models for smart, real-world functionalities.
                </p>
                <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm mt-3">
                  Beyond software engineering, my core passion is teaching and mentorship. I believe in leveraging education and 
                  technology to empower underserved students and nurture bright minds in Ethiopia.
                </p>
              </div>

              {/* Specialized Training */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="text-[#41a100] w-5 h-5" /> Key Highlights & Specialized Training
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 sm:p-5 rounded-lg space-y-2">
                    <span className="text-xs font-mono text-[#41a100]">2026</span>
                    <h4 className="font-medium text-white text-sm sm:text-base">
                      Ethiopian Artificial Intelligence Institute (EAII) Summer Camp
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Selected for the Machine Learning track to advance skills in core AI technologies.
                    </p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 sm:p-5 rounded-lg space-y-2">
                    <span className="text-xs font-mono text-[#41a100]">2025</span>
                    <h4 className="font-medium text-white text-sm sm:text-base">
                      INSA Summer Camp (Embedded Systems)
                    </h4>
                    <p className="text-xs text-zinc-400">
                      One of 40 students accepted into Robotics & Electrical Engineering. Selected as 1 of 4 students to present a final project directly to the head of the institute.
                    </p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 sm:p-5 rounded-lg space-y-2">
                    <span className="text-xs font-mono text-[#41a100]">Internship</span>
                    <h4 className="font-medium text-white text-sm sm:text-base">CodeAlpha</h4>
                    <p className="text-xs text-zinc-400">
                      Machine Learning Intern building applied AI and Python projects.
                    </p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 sm:p-5 rounded-lg space-y-2">
                    <span className="text-xs font-mono text-[#41a100]">Mentorship</span>
                    <h4 className="font-medium text-white text-sm sm:text-base">Sci-Mi Mentorship</h4>
                    <p className="text-xs text-zinc-400">
                      Completed specialized Computer Science studies under the Sci-Mi summer mentorship program.
                    </p>
                  </div>
                </div>
              </div>

              {/* Honors & Awards */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="text-[#41a100] w-5 h-5" /> Honors & Awards
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                    <span>1st Place Champion – Addis Ababa City-Wide Science & Technology Competition (2026)</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                    <span>1st Place Winner – Kirkos Subcity Science Fair (2025 & 2026)</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                    <span>Top 20 Finalist – Bruh Federal/National Startup Competition (2025)</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                    <span>1st Place Winner – Digital Literacy & Advocacy Program (ENG Ethiopia & Meta, 2024)</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                    <span>Top 5 Best Research Papers – Saint Joseph School (Grade 11 Research, 2025)</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/60 p-3 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-[#41a100] shrink-0 mt-0.5" />
                    <span>Leadership Certification – Youth Ambassadors Advisory Role (ENG Ethiopia, 2025)</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className="space-y-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                <Briefcase className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Experience & Leadership
              </h2>

              <div className="space-y-8 border-l border-zinc-800 pl-4 sm:pl-6 ml-2">
                {/* Section 1 */}
                <div className="relative space-y-2 sm:space-y-3">
                  <div className="absolute -left-[21px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#41a100]" />
                  <span className="text-xs font-mono text-[#41a100]">Jan 2026 – Present</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Startup Founder & Tech Innovator</h3>
                  <div className="text-xs sm:text-sm text-zinc-300 space-y-2">
                    <p>
                      <strong className="text-white">AXION Tech (Founder & CEO):</strong> Founded a technology initiative focused on scalable, high-impact innovations in Ethiopia.
                    </p>
                    <p>
                      <strong className="text-white">Focus2018:</strong> Developed and deployed a national exam preparation ecosystem helping Ethiopian high school students prepare for national examinations.
                    </p>
                    <p>
                      <strong className="text-white">Bruh National Business Competition:</strong> Placed 2nd at City Level (June 2025), awarded 100,000 ETB funding by the Addis Ababa City Administration Labor and Skills Bureau. Selected for intensive business training by EDI and ranked Top 20 nationwide out of 250+ entries.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="relative space-y-2 sm:space-y-3">
                  <div className="absolute -left-[21px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="text-xs font-mono text-[#41a100]">2023 – Present</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Teaching, Volunteer Work & Community Impact</h3>
                  <div className="text-xs sm:text-sm text-zinc-300 space-y-2">
                    <p>
                      <strong className="text-white">Winger Academy Initiative (Founder):</strong> Founded an educational initiative supporting underserved students with tutoring and learning resources.
                    </p>
                    <p>
                      <strong className="text-white">Wegene Foundation (Volunteer Educator):</strong> Teaching Math, English, and Science (Physics, Chemistry, Biology) to Grades 9–12 students.
                    </p>
                    <p>
                      <strong className="text-white">Saint Joseph School Summer Camp (2026):</strong> Instructed Robotics & Programming; managed camp registration portal and recruitment.
                    </p>
                    <p>
                      <strong className="text-white">Private Tutoring (3+ Years):</strong> Hands-on tutoring across Mathematics, Science, and English.
                    </p>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="relative space-y-2 sm:space-y-3">
                  <div className="absolute -left-[21px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="text-xs font-mono text-[#41a100]">2024 – 2025</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Advocacy & Digital Literacy (ENG Ethiopia & Meta)</h3>
                  <div className="text-xs sm:text-sm text-zinc-300 space-y-2">
                    <p>
                      <strong className="text-white">Youth Ambassador (2024):</strong> Placed 1st in Digital Literacy & Advocacy Program sponsored by Meta. Co-organized 1st Ethiopian Digital Literacy Olympiad and authored digital literacy handbook.
                    </p>
                    <p>
                      <strong className="text-white">Youth Ambassadors Advisory Team (2025):</strong> Appointed advisor to mentor new ambassadors for digital literacy campaigns reaching 1M+ individuals.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="relative space-y-2 sm:space-y-3">
                  <div className="absolute -left-[21px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="text-xs font-mono text-[#41a100]">Space Science</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Space Science & Astronomy (ESSS)</h3>
                  <div className="text-xs sm:text-sm text-zinc-300 space-y-2">
                    <p>
                      Active youth member, volunteer, and citizen science researcher with the Ethiopian Space Science Society.
                    </p>
                    <p>
                      Participated in outreach on Satellite Tech and Astrophysics. Delivered keynote speeches on Cosmology and the Big Bang Theory. Participated in international asteroid search campaigns analyzing astronomical datasets.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="relative space-y-2 sm:space-y-3">
                  <div className="absolute -left-[21px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="text-xs font-mono text-[#41a100]">Grades 6–8</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Early Technology Roots</h3>
                  <div className="text-xs sm:text-sm text-zinc-300 space-y-2">
                    <p>
                      Built electrical circuits for exhibitions; won 1st place to become Head of Science & Tech Club in Grade 7 at Dejazimach Wondirad Primary School. Built a mobile-controlled wireless robot in Grade 8, presenting to 1,000+ students.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                  <Code className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Featured Projects
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Selected robotics, full-stack, and machine learning software solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* AXION Smart Wheelchair */}
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 rounded-lg space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#41a100]">AI & Assistive Robotics</span>
                      <Sparkles className="w-4 h-4 text-[#41a100]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">AXION Smart Wheelchair</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Assistive mobility device featuring a real-time AI camera system (TensorFlow), joystick/app control, automatic navigation, obstacle avoidance, voice feedback, GPS tracking, and health monitoring.
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded">Python</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">TensorFlow</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Embedded Systems</span>
                  </div>
                </div>

                {/* Focus2018 */}
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 rounded-lg space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#41a100]">EdTech Platform</span>
                      <Globe className="w-4 h-4 text-[#41a100]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Focus2018 Exam Prep</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      National exam preparation ecosystem built to help Ethiopian high school students master national examination subjects through structured practice and performance analytics.
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded">Next.js</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Tailwind CSS</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Node.js</span>
                  </div>
                </div>

                {/* PULSE Ethiopia */}
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 rounded-lg space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#41a100]">Data Analytics</span>
                      <ExternalLink className="w-4 h-4 text-[#41a100]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">PULSE Ethiopia</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Centralized educational data analytics platform aggregating and evaluating academic metrics to help institutions identify performance gaps.
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded">Next.js</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">React</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Analytics</span>
                  </div>
                </div>

                {/* FAOSTAT CPI Analyzer */}
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 rounded-lg space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#41a100]">Machine Learning</span>
                      <Cpu className="w-4 h-4 text-[#41a100]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">FAOSTAT CPI Data Analyzer</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Data analysis and machine learning pipeline to model and forecast Food Consumer Price Index (CPI) trends.
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded">Python</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Scikit-Learn</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Next.js</span>
                  </div>
                </div>

                {/* Productivity App */}
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 rounded-lg space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all md:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#41a100]">Mobile Development</span>
                      <ExternalLink className="w-4 h-4 text-[#41a100]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Productivity & Screen Time Control App</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Cross-platform mobile application featuring Pomodoro focus timers and usage restriction tools designed to optimize student focus and time management.
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded">Flutter</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded">Dart</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className="max-w-2xl mx-auto space-y-6 sm:space-y-8"
            >
              <div className="text-center space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Get In Touch</h2>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
                  Whether you have an idea for collaboration, tech inquiries, or mentorship opportunities, feel free to drop a message.
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-zinc-900/40 p-5 sm:p-6 rounded-lg border border-zinc-800">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Weldamlak Ayenew"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41a100] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41a100] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Hi Weldamlak, I'd like to talk about..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#41a100] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm py-3 rounded-md transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(65,161,0,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
