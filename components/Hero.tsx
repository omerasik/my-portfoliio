"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import { techMarquee } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import MagneticButton from "@/components/ui/MagneticButton";
import Hero3D from "@/components/Hero3D";

function Typewriter({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex % roles.length];
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
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="font-mono text-lg text-a1 sm:text-xl md:text-2xl">
      {text}
      <span className="caret" />
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();

  const stats = [
    { label: t.hero.statFocus, value: t.hero.statFocusV },
    { label: t.hero.statLocation, value: t.hero.statLocationV },
    { label: t.hero.statStatus, value: t.hero.statStatusV }
  ];

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center">
      {/* 3D scene */}
      <div className="absolute inset-0 -z-10">
        <Hero3D />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 inline-flex w-fit items-center gap-2 border border-edge/25 border-l-2 border-l-a1 bg-card/40 px-4 py-1.5 backdrop-blur"
        >
          <Terminal size={13} className="text-a1" />
          <span className="font-mono text-xs tracking-widest text-dim">{t.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-[clamp(3rem,11vw,8.5rem)] font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="sr-only">Ömer Faruk Aşık (Omer Asik) — Full-Stack &amp; Automation Developer in Ghent, Belgium</span>
          <span aria-hidden className="glitch block" data-text="OMER">OMER</span>
          <span aria-hidden className="glitch text-signal-animated block" data-text="ASIK">ASIK</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 h-8"
        >
          <Typewriter roles={t.hero.roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-dim sm:text-lg"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            {t.hero.ctaWork}
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            {t.hero.ctaContact}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="panel panel--quiet ticks p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{stat.label}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tech marquee */}
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
              <span className="text-a1">/</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-24 right-2 hidden flex-col items-center gap-2 lg:flex"
        aria-label="Scroll down"
      >
        <span className="flex h-10 w-6 items-start justify-center border border-edge/30 p-1.5">
          <span className="animate-scroll-dot h-1.5 w-1.5 bg-a1" />
        </span>
        <ArrowDown size={14} className="text-dim" />
      </motion.a>
    </section>
  );
}
