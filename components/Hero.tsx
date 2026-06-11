"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { heroRoles, heroStats, techMarquee } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import Hero3D from "@/components/Hero3D";

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = heroRoles[roleIndex];
    const speed = deleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = role.slice(0, text.length + 1);
        setText(next);
        if (next === role) setTimeout(() => setDeleting(true), 1700);
      } else {
        const next = role.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % heroRoles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <span className="font-mono text-lg text-cy sm:text-xl md:text-2xl">
      {text}
      <span className="caret" />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center">
      <div className="absolute inset-0 -z-10">
        <Hero3D />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-edge/20 bg-card/40 px-4 py-1.5 backdrop-blur"
        >
          <Sparkles size={14} className="text-mg" />
          <span className="font-mono text-xs tracking-widest text-dim">
            AUTOMATION &amp; AI — BUILDING WHAT&apos;S NEXT
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-[clamp(3rem,11vw,8.5rem)] font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="glitch block" data-text="ÖMER">ÖMER</span>
          <span className="glitch text-aurora-animated block" data-text="AŞIK">AŞIK</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 h-8"
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-dim sm:text-lg"
        >
          I build full-stack web apps and intelligent automations — from React frontends
          to AI agents that handle real business workflows. New tech doesn&apos;t scare me;
          it&apos;s my favourite playground.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            Explore my work
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="border-aurora p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{stat.label}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="marquee-mask relative -mx-5 overflow-hidden border-y border-edge/10 py-4 sm:-mx-8 lg:-mx-12"
      >
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span key={`${tech}-${i}`} className="flex items-center gap-10 font-mono text-sm text-dim">
              {tech}
              <span className="text-mg">✦</span>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-24 right-2 hidden flex-col items-center gap-2 lg:flex"
        aria-label="Scroll down"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-edge/30 p-1.5">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-cy" />
        </span>
        <ArrowDown size={14} className="text-dim" />
      </motion.a>
    </section>
  );
}
