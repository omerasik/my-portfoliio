"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/lib/data";
import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  Github: <Github size={16} />,
  Linkedin: <Linkedin size={16} />,
  Mail: <Mail size={16} />
};

export default function Footer() {
  return (
    <footer className="border-t border-edge/10 py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cy via-vi to-mg font-display text-xs font-extrabold text-bg">
            ÖA
          </span>
          <p className="text-sm text-dim">
            © {new Date().getFullYear()} Ömer Aşık — built with Next.js, caffeine &amp; curiosity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-edge/20 bg-card/40 text-dim transition-all duration-300 hover:border-cy/50 hover:text-cy hover:shadow-glow-cy"
            >
              {ICONS[link.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
