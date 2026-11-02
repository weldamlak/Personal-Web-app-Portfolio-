"use client";

import React from "react";
import Link from "next/link";
import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaDiscord,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa6";
import { useSettledValue } from "../hooks/useSettledValue";

interface FooterProps {
  isDarkMode: boolean;
  tabIndex: number; // current page
  targetIndex: number; // page the pull leads to
  pull: MotionValue<number>; // 0 → 1 while the user keeps scrolling past the bottom
}

const SOCIALS = [
  { href: "https://github.com/weldamlak", label: "GitHub Profile", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/weldamlak-ayenew", label: "LinkedIn Profile", Icon: FaLinkedin },
  { href: "https://x.com/WeldamlakAyenew", label: "X/Twitter Profile", Icon: FaXTwitter },
  { href: "https://www.instagram.com/weldamlak.a", label: "Instagram Profile", Icon: FaInstagram },
  { href: "https://discord.com/users/1503749867770609845", label: "Discord Profile", Icon: FaDiscord },
  { href: "https://wa.me/251964995549", label: "WhatsApp Contact", Icon: FaWhatsapp },
  { href: "mailto:weldamlak.a.endalew@gmail.com", label: "Email", Icon: FaEnvelope },
];

// light mode: a soft green that shifts a little on every page (change 9 to 0 for one fixed green)
const hueFor = (i: number) => 96 + i * 9;

export default function Footer({ isDarkMode, tabIndex, targetIndex, pull }: FooterProps) {
  const year = new Date().getFullYear();

  // colour wash that fills the footer (left → right) as the user keeps scrolling
  const fillIndex = useSettledValue(targetIndex, pull);
  const progress = useTransform(pull, (v) => Math.min(1, Math.max(0, v)));

  // dark mode: clean gray · light mode: soft green
  const bg = isDarkMode ? "rgb(24 24 27 / 0.95)" : `hsl(${hueFor(tabIndex)} 65% 96% / 0.92)`;
  const line = isDarkMode ? "rgb(63 63 70 / 0.7)" : `hsl(${hueFor(tabIndex)} 65% 40% / 0.35)`;
  const wash = isDarkMode ? "rgb(63 63 70 / 0.85)" : `hsl(${hueFor(fillIndex)} 70% 84% / 0.95)`;

  const iconCls = isDarkMode
    ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
    : "text-slate-700 hover:text-slate-950 hover:bg-slate-200/70";

  return (
    <footer
      className="relative z-10 w-full overflow-hidden border-t backdrop-blur-md"
      style={{
        backgroundColor: bg,
        borderColor: line,
        transition: "background-color 800ms ease, border-color 800ms ease",
      }}
    >
      <motion.div
        aria-hidden
        style={{ scaleX: progress, backgroundColor: wash }}
        className="pointer-events-none absolute inset-0 origin-left"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:gap-6 sm:px-6 sm:py-8">
        <div className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
          <Link
            href="/"
            className={`text-base font-semibold tracking-tight transition-colors hover:text-accent sm:text-lg ${
              isDarkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Weldamlak Ayenew Endalew
          </Link>
          <p className={`text-xs font-medium sm:text-sm ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
            © {year} Weldamlak. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className={`rounded-xl p-2 text-lg transition-all active:scale-95 ${iconCls}`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}