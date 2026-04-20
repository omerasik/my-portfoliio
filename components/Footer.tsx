"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/lib/data";
import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  Github:   <Github className="h-4 w-4" />,
  Linkedin: <Linkedin className="h-4 w-4" />,
  Mail:     <Mail className="h-4 w-4" />,
};

export default function Footer() {
  return (
    <footer className="relative py-10">
      {/* Glow separator line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent-violet/35 to-transparent" />

      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left: brand */}
        <div>
          <a href="#hero" className="font-display text-2xl font-black text-ink">
            OA<span className="text-accent-lime" style={{ textShadow: "0 0 12px rgba(204,255,0,0.7)" }}>.</span>
          </a>
          <p className="mt-1 font-mono text-xs text-ink/30">Designed & built by Omer Faruk Asik © 2025</p>
        </div>

        {/* Right: socials + scroll to top */}
        <div className="flex items-center gap-3">
          {socialLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-surface/60 text-ink/45 transition-all hover:border-accent-violet/40 hover:bg-accent-violet/10 hover:text-accent-violet"
            >
              {ICONS[l.icon]}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 rounded-lg border border-accent-violet/25 bg-accent-violet/8 px-4 py-2 font-mono text-xs text-accent-violet transition-all hover:bg-accent-violet hover:text-white"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
