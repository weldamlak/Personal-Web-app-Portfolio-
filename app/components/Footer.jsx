import React from "react";
import Link from "next/link";
import { 
  FaGithub, 
  FaLinkedin, 
  FaXTwitter, 
  FaInstagram, 
  FaDiscord, 
  FaWhatsapp, 
  FaEnvelope 
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-0.5">
          <Link 
            href="/" 
            className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Weldamlak Ayenew Endalew
          </Link>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium">
            © {currentYear} Weldamlak. All rights reserved.
          </p>
        </div>

        {/* Right: Social Media Icons (Touch-friendly for Mobile) */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
          <a
            href="https://github.com/weldamlak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/weldamlak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/weldamlak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter Profile"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/weldamlak.a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaInstagram />
          </a>
          <a
            href="https://discord.com/users/1503749867770609845"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord Profile"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaDiscord />
          </a>
          <a
            href="https://wa.me/251964995549"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Contact"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:weldamlak.a.endalew@gmail.com"
            aria-label="Email"
            className="p-2 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800/60 rounded-xl transition-all text-lg active:scale-95"
          >
            <FaEnvelope />
          </a>
        </div>

      </div>
    </footer>
  );
}