"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Analytics } from "@vercel/analytics/next";

import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SayingMoreSection from "./components/SayingMoreSection";
import ContactSection from "./components/ContactSection";
import Lightbox from "./components/Lightbox";
import Footer from "./components/Footer";
import PullIndicator from "./components/PullIndicator";
import PatternBackground from "./components/animations/PatternBackground";

import { GALLERY_IMAGES, NAV_ITEMS } from "./lib/data";
import { tabTransition } from "./lib/animations";
import { useContactForm } from "./hooks/useContactForm";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import { usePullToNext } from "./hooks/usePullToNext";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);

  const contactForm = useContactForm();

  const mainRef = useRef<HTMLElement>(null);
  useScrollAnimations(mainRef);

  // Theme tokens (accent colour etc.) live on <html data-theme="…"> so that
  // portals such as the Honors image viewer get them too.
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const tabIndex = NAV_ITEMS.findIndex((i) => i.id === activeTab);
  const nextItem = NAV_ITEMS[tabIndex + 1] ?? null;
  const prevItem = NAV_ITEMS[tabIndex - 1] ?? null;
  // On the last page a very long pull takes you back one page instead
  const target = nextItem ?? prevItem;
  const isBack = !nextItem;
  const targetIndex = target ? NAV_ITEMS.findIndex((i) => i.id === target.id) : tabIndex;

  // footer height, so the pull indicator can sit just above it (outside the footer)
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(160);
  useEffect(() => {
    const el = footerWrapRef.current;
    if (!el) return;
    const update = () => setFooterH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---------------- scroll past the bottom → next page ---------------- */
  const pull = useMotionValue(0);
  const pullSmooth = useSpring(pull, { stiffness: 180, damping: 26, mass: 0.4 });
  const mainY = useTransform(pullSmooth, [0, 1], [0, -48]);
  const mainScale = useTransform(pullSmooth, [0, 1], [1, 0.97]);
  const mainOpacity = useTransform(pullSmooth, [0, 1], [1, 0.55]);

  const goTarget = useCallback(() => {
    if (!target) return;
    setActiveTab(target.id);
    setMobileMenuOpen(false);
    // let the old page finish its exit animation, then jump to the top
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), 280);
  }, [target]);

  usePullToNext({
    enabled: !!target && selectedImgIndex === null,
    pull,
    onAdvance: goTarget,
    resetKey: activeTab,
    effort: isBack ? 2.5 : 1, // the way back needs a much longer pull
  });

  // after every page change, ease the pull back to rest
  useEffect(() => {
    const c = animate(pull, 0, { duration: 0.6, delay: 0.35, ease: "easeOut" });
    return () => c.stop();
  }, [activeTab, pull]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-accent selection:text-white relative isolate overflow-x-clip ${
        isDarkMode ? "bg-[#0d0d0d] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Analytics />

      <PatternBackground activeTab={activeTab} isDarkMode={isDarkMode} />

      <Navbar
        activeTab={activeTab}
        isDarkMode={isDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleTabClick={handleTabClick}
        toggleTheme={toggleTheme}
      />

      <motion.main
        ref={mainRef}
        style={{ y: mainY, scale: mainScale, opacity: mainOpacity }}
        className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 min-h-[85vh] flex flex-col justify-center relative z-10"
      >
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeSection
              key="home"
              isDarkMode={isDarkMode}
              galleryImages={GALLERY_IMAGES}
              handleTabClick={handleTabClick}
              setSelectedImgIndex={setSelectedImgIndex}
            />
          )}

          {activeTab === "about" && (
            <AboutSection key="about" isDarkMode={isDarkMode} handleTabClick={handleTabClick} />
          )}

          {activeTab === "experience" && (
            <ExperienceSection
              key="experience"
              isDarkMode={isDarkMode}
              handleTabClick={handleTabClick}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsSection
              key="projects"
              isDarkMode={isDarkMode}
              handleTabClick={handleTabClick}
              tabTransition={tabTransition}
            />
          )}

          {activeTab === "saying-more" && (
            <SayingMoreSection
              key="saying-more"
              isDarkMode={isDarkMode}
              handleTabClick={(tabId) => setActiveTab(tabId)}
              tabTransition={tabTransition}
            />
          )}

          {activeTab === "contact" && (
            <ContactSection key="contact" isDarkMode={isDarkMode} {...contactForm} />
          )}
        </AnimatePresence>
      </motion.main>

      <Lightbox
        galleryImages={GALLERY_IMAGES}
        selectedImgIndex={selectedImgIndex}
        setSelectedImgIndex={setSelectedImgIndex}
      />

      <PullIndicator
        isDarkMode={isDarkMode}
        label={target?.label ?? null}
        isBack={isBack}
        pull={pullSmooth}
        onGo={goTarget}
        bottom={footerH + 16}
      />

      <div ref={footerWrapRef}>
        <Footer
          isDarkMode={isDarkMode}
          tabIndex={Math.max(tabIndex, 0)}
          targetIndex={Math.max(targetIndex, 0)}
          pull={pullSmooth}
        />
      </div>
    </div>
  );
}