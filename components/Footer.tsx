"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  Github: <Github size={16} />,
  Linkedin: <Linkedin size={16} />,
  Mail: <Mail size={16} />
};

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-edge/10 py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-sm text-dim">
          <span className="text-a1">&gt;_</span> © {new Date().getFullYear()} Omer Asik · {t.footer.tagline}
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="btn-chamfer flex h-9 w-9 items-center justify-center border border-edge/20 bg-card/40 text-dim transition-all duration-300 hover:border-a1/50 hover:text-a1"
            >
              {ICONS[link.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
