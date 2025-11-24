"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { socialLinks } from "@/lib/data";
import type { SocialLink } from "@/lib/data";

const socialIcons: Record<SocialLink["icon"], ReactNode> = {
  Github: <Github className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />
};

export default function Hero() {
  return (
    <section id="hero" className="section-padding relative flex min-h-screen flex-col justify-center pt-24 sm:pt-32">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div>
            <p className="mb-2 text-sm font-medium text-accent-cyan">👋 Hi, I&apos;m Omer</p>
            <p className="text-base font-semibold uppercase tracking-[0.4em] text-white">Full-Stack Developer</p>
          </div>
          <div>
            <h1 className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">Omer Asik</h1>
            <p className="mt-2 text-sm text-white/60">Based in Belgium</p>
          </div>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            I build clean and scalable web applications, and I enjoy turning real problems into simple solutions. I&apos;m curious about
            automation, data, and practical AI tools that make development smarter and faster. Most of all, I focus on being reliable
            and always improving as a full-stack developer.
          </p>
          <p className="text-sm text-white/60">Fueled by curiosity and good coffee ☕</p>
          <div className="flex flex-wrap gap-4">
            <Button href="#projects" size="lg">
              See My Work
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Let&apos;s Connect
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {socialLinks.map((link) => (
                <IconButton key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" label={link.label}>
                  {socialIcons[link.icon]}
                </IconButton>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end lg:items-center lg:-mt-10 xl:-mt-14 lg:pr-8"
        >
          <div className="relative h-64 w-64 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-2 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/15 bg-charcoal shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/linkedin_ohoto.jpg"
                alt={"\u00d6mer A\u015f\u0131k"}
                fill
                sizes="(max-width: 1024px) 20rem, 24rem"
                priority
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute -inset-4 -z-10 animate-blob rounded-full bg-gradient-to-r from-white/3 to-accent-cyan/5 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
