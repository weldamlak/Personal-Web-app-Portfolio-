"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { NAV_ITEMS, NAV_SOCIALS } from "../lib/data";

interface NavbarProps {
  activeTab: string;
  isDarkMode: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleTabClick: (id: string) => void;
  toggleTheme: () => void;
}

const COLLAPSE_AT = 48; // px scrolled before the bar tucks into a button
const TOP_DWELL_MS = 250; // rest at the top this long before "scroll again" counts
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Three bars that morph into an X */
function BurgerIcon({ open }: { open: boolean }) {
  const bar = `absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${EASE}`;
  return (
    <span aria-hidden className="relative block h-4 w-5">
      <span className={`${bar} ${open ? "top-[7px] rotate-45" : "top-0"}`} />
      <span className={`${bar} top-[7px] ${open ? "scale-x-0 opacity-0" : ""}`} />
      <span className={`${bar} ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`} />
    </span>
  );
}

export default function Navbar({
  activeTab,
  isDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleTabClick,
  toggleTheme,
}: NavbarProps) {
  const [collapsed, setCollapsed] = useState(false);

  /*
   * Rules:
   *  - any scroll past COLLAPSE_AT  → collapse to the floating button
   *  - scrolling back UP never expands it
   *  - it only expands (a) when tapped, or (b) when the page is at the very
   *    top and the user scrolls up / drags down / presses ↑ again
   */
  useEffect(() => {
    let atTopSince = window.scrollY <= 1 ? performance.now() - 1000 : 0;
    let touchFromTop = false;
    let touchY = 0;

    if (window.scrollY > COLLAPSE_AT) setCollapsed(true);

    const onScroll = () => {
      const y = window.scrollY;
      if (y > COLLAPSE_AT) setCollapsed(true);
      if (y <= 1) {
        if (!atTopSince) atTopSince = performance.now();
      } else {
        atTopSince = 0;
      }
    };

    const expandAtTop = (needDwell: boolean) => {
      if (window.scrollY > 1) return;
      if (needDwell && (!atTopSince || performance.now() - atTopSince < TOP_DWELL_MS)) return;
      setCollapsed(false);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) expandAtTop(true);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchFromTop = window.scrollY <= 1;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchFromTop && e.touches[0].clientY - touchY > 10) expandAtTop(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home") expandAtTop(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // close the phone menu whenever the bar tucks away
  useEffect(() => {
    if (collapsed) setMobileMenuOpen(false);
  }, [collapsed, setMobileMenuOpen]);

  const expand = () => {
    setCollapsed(false);
    // on phones the button opens straight into the menu
    if (window.matchMedia("(max-width: 767px)").matches) setMobileMenuOpen(true);
  };

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      {/* wrapper: 64rem wide when expanded, full width (so the button reaches the right edge) when collapsed */}
      <div
        className={`relative mx-auto w-full transition-[max-width] duration-500 ${EASE} motion-reduce:transition-none`}
        style={{ maxWidth: collapsed ? "100%" : "64rem" }}
      >
        <nav
          aria-label="Primary"
          style={{ width: collapsed ? 52 : "100%", borderRadius: collapsed ? 16 : 12 }}
          className={`pointer-events-auto relative ml-auto h-[52px] border backdrop-blur-md transition-[width,border-radius,background-color,border-color,box-shadow] duration-500 ${EASE} motion-reduce:transition-none ${
            isDarkMode
              ? "bg-[#18181b]/95 border-zinc-800/80"
              : "bg-white/90 border-slate-200/90"
          } ${
            collapsed
              ? "shadow-xl hover:border-accent/60"
              : "shadow-2xl " + (isDarkMode ? "" : "shadow-slate-200/50")
          }`}
        >
          {/* ---- collapsed: single floating button ---- */}
          <button
            type="button"
            onClick={expand}
            aria-label="Open navigation menu"
            aria-hidden={!collapsed}
            tabIndex={collapsed ? 0 : -1}
            className={`absolute inset-0 flex items-center justify-center rounded-[inherit] text-accent transition-opacity duration-300 active:scale-95 ${
              collapsed ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
            }`}
          >
            <BurgerIcon open={false} />
          </button>

          {/* ---- expanded: full bar ---- */}
          <div
            aria-hidden={collapsed}
            className={`absolute inset-0 flex items-center justify-between overflow-hidden rounded-[inherit] px-4 whitespace-nowrap transition-opacity duration-200 sm:px-6 ${
              collapsed ? "pointer-events-none opacity-0" : "opacity-100 delay-150"
            }`}
          >
            <span className="font-mono text-sm font-bold text-accent md:hidden">Weldamlak.A</span>

            {/* Desktop nav items */}
            <div className="hidden items-center space-x-6 md:flex">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  tabIndex={collapsed ? -1 : 0}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative py-1 font-mono text-xs transition-colors md:text-sm ${
                    activeTab === item.id
                      ? "font-semibold text-accent"
                      : isDarkMode
                      ? "text-zinc-400 hover:text-zinc-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute right-0 -bottom-0.5 left-0 h-0.5 rounded bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop controls */}
            <div className="hidden items-center space-x-4 md:flex">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
                className={`rounded-lg border p-1.5 transition-colors ${
                  isDarkMode
                    ? "border-zinc-800 text-amber-400 hover:bg-zinc-800"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <div className={`h-4 w-px ${isDarkMode ? "bg-zinc-800" : "bg-slate-200"}`} />

              <div
                className={`flex items-center space-x-3 ${
                  isDarkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                {NAV_SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`p-1 transition-colors ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
                className={`rounded-lg border p-1.5 transition-colors ${
                  isDarkMode ? "border-zinc-800 text-amber-400" : "border-slate-200 text-slate-700"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className={`flex h-9 w-9 items-center justify-center focus:outline-none ${
                  isDarkMode ? "text-zinc-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <BurgerIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile dropdown (outside <nav> so it isn't clipped) */}
        <AnimatePresence>
          {!collapsed && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`pointer-events-auto absolute top-full right-0 left-0 z-50 mt-2 flex flex-col space-y-3 rounded-xl border p-4 shadow-2xl md:hidden ${
                isDarkMode ? "border-zinc-800 bg-[#18181b]" : "border-slate-200 bg-white"
              }`}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors ${
                    activeTab === item.id
                      ? "bg-accent/10 font-semibold text-accent"
                      : isDarkMode
                      ? "text-zinc-300 hover:bg-zinc-800/50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div
                className={`flex items-center space-x-6 border-t px-3 pt-3 ${
                  isDarkMode ? "border-zinc-800 text-zinc-400" : "border-slate-200 text-slate-500"
                }`}
              >
                {NAV_SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="transition-colors hover:text-accent"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}