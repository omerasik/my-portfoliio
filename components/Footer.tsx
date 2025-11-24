"use client";

import { Github, Linkedin, MoveUpRight } from "lucide-react";
import type { ReactNode } from "react";
import IconButton from "@/components/ui/IconButton";
import Logo from "@/components/ui/Logo";
import { socialLinks } from "@/lib/data";

const icons: Record<"Github" | "Linkedin", ReactNode> = {
  Github: <Github className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-sm text-white/70">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#hero" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <Logo className="w-14 h-14 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
          </a>
          <p className="text-white/70">Designed & developed by Omer Asik. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <IconButton key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" label={link.label}>
              {link.icon === "Mail" ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : (
                icons[link.icon as keyof typeof icons]
              )}
            </IconButton>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-accent-cyan hover:text-accent-cyan"
          >
            Back to top
            <MoveUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
