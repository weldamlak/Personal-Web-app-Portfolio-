"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, Send, ExternalLink } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa6";
import { CONTACT_SOCIALS } from "../lib/data";
import { tabTransition } from "../lib/animations";
import type { ContactFormData } from "../hooks/useContactForm";

interface ContactSectionProps {
  isDarkMode: boolean;
  formData: ContactFormData;
  setFormData: (data: ContactFormData) => void;
  formSubmitted: boolean;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function ContactSection({
  isDarkMode,
  formData,
  setFormData,
  formSubmitted,
  isSubmitting,
  handleFormSubmit,
}: ContactSectionProps) {
  const cardClass = isDarkMode
    ? "bg-zinc-900/40 border-zinc-800"
    : "bg-white border-slate-200 shadow-sm";

  const channelClass = isDarkMode
    ? "bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800"
    : "bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100";

  const inputClass = `w-full text-sm px-3.5 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#41a100] transition-colors ${
    isDarkMode
      ? "bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500"
      : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
  }`;

  return (
    <motion.div
      key="contact"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabTransition}
      className="space-y-8"
    >
      {/* Section Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Send className="text-[#41a100] w-6 h-6 sm:w-7 sm:h-7" /> Get In Touch
        </h2>
        <p
          className={`text-xs sm:text-sm font-mono ${
            isDarkMode ? "text-zinc-400" : "text-slate-600"
          }`}
        >
          Have a question, collaboration proposal, or project idea? Send a message below or connect directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        {/* Sidebar Info & Direct Channels */}
        <div className="md:col-span-5 space-y-4">
          {/* Location Card */}
          <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${cardClass}`}>
            <div className="flex items-center gap-2 text-[#41a100]">
              <MapPin className="w-5 h-5 shrink-0" />
              <h3 className="font-semibold text-sm">Location</h3>
            </div>
            <p className={`text-xs sm:text-sm ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
              Addis Ababa, Ethiopia
            </p>
          </div>

          {/* Direct Contact Buttons */}
          <div className={`p-4 sm:p-5 rounded-xl border space-y-3 ${cardClass}`}>
            <h3 className="font-semibold text-sm mb-1">Direct Channels</h3>

            <a
              href="mailto:weldamlak.a.endalew@gmail.com"
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all hover:border-[#41a100]/50 ${channelClass}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <FaEnvelope className="w-4 h-4 text-[#41a100] shrink-0" />
                <span className="truncate">weldamlak.a.endalew@gmail.com</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0 ml-2" />
            </a>

            <a
              href="https://wa.me/251964995549"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all hover:border-[#41a100]/50 ${channelClass}`}
            >
              <div className="flex items-center gap-2.5">
                <FaWhatsapp className="w-4 h-4 text-[#41a100] shrink-0" />
                <span>+251 964 995 549</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0 ml-2" />
            </a>
          </div>

          {/* Social Networks */}
          <div className={`p-4 sm:p-5 rounded-xl border space-y-3 ${cardClass}`}>
            <div className="flex items-center gap-2 text-[#41a100]">
              <Globe className="w-5 h-5 shrink-0" />
              <h3 className="font-semibold text-sm">Social Profiles</h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {CONTACT_SOCIALS.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  title={name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-all hover:border-[#41a100] hover:text-[#41a100] ${
                    isDarkMode
                      ? "bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleFormSubmit}
            className={`p-5 sm:p-6 rounded-xl border space-y-4 ${
              isDarkMode
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <div>
              <label className="block text-xs font-mono mb-1.5 font-medium">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-1.5 font-medium">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-1.5 font-medium">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={inputClass}
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#41a100] hover:bg-[#4cc000] text-white font-mono text-sm py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <Send className="w-4 h-4" />
            </button>

            {formSubmitted && (
              <p className="text-xs text-emerald-500 font-mono text-center pt-2">
                Thank you! Your message has been sent directly to my inbox.
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}