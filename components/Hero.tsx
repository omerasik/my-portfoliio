"use client";

import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDownRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { socialLinks } from "@/lib/data";
import type { SocialLink } from "@/lib/data";
import type { ReactNode } from "react";

/* ──────────────── Typing line ───────────────── */
const roles = ["Full-Stack Developer", "Problem Solver", "AI Builder", "Open Source Builder"];

function TypingRole() {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState("");
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text.length < cur.length)       t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 55);
    else if (!del && text.length === cur.length) t = setTimeout(() => setDel(true), 1800);
    else if (del && text.length > 0)             t = setTimeout(() => setText(text.slice(0, -1)), 30);
    else { setDel(false); setIdx(p => (p + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span className="font-mono text-accent-violet text-base sm:text-lg tracking-wide">
      {text}<span className="animate-pulse text-accent-lime">_</span>
    </span>
  );
}

/* ──────────────── Orbital System (NO labels) ───────────────── */
function OrbitalSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spx = useSpring(mx, { stiffness: 40, damping: 15 });
  const spy = useSpring(my, { stiffness: 40, damping: 15 });
  const tiltX = useTransform(spy, [-200, 200], [12, -12]);
  const tiltY = useTransform(spx, [-200, 200], [-12, 12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set(e.clientX - (r.left + r.width / 2));
      my.set(e.clientY - (r.top + r.height / 2));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const orbits = [
    { size: 280, duration: 8,  rotateZ: 20,  dotColor: "#CCFF00", dotSize: 10, glowColor: "rgba(204,255,0,0.7)", delay: 0 },
    { size: 200, duration: 11, rotateZ: -40, dotColor: "#8B5CF6", dotSize: 8,  glowColor: "rgba(139,92,246,0.8)", delay: 1.5 },
    { size: 350, duration: 15, rotateZ: 60,  dotColor: "#00D4AA", dotSize: 7,  glowColor: "rgba(0,212,170,0.7)",  delay: 0.8 },
    { size: 150, duration: 6,  rotateZ: -70, dotColor: "#ffffff", dotSize: 5,  glowColor: "rgba(255,255,255,0.6)", delay: 2 },
  ];

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: 400, height: 400 }}>
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center w-[400px] h-[400px]"
      >
        {/* ── Orbit rings ── */}
        {orbits.map((o, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border border-white/8"
            style={{
              width: o.size,
              height: o.size,
              transform: `rotateX(${70 + o.rotateZ}deg) rotateZ(${o.rotateZ}deg)`,
            }}
          />
        ))}

        {/* ── Orbiting dots ── */}
        {orbits.map((o, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute"
            style={{
              width: o.size,
              height: o.size,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: o.duration, repeat: Infinity, ease: "linear", delay: o.delay }}
          >
            {/* The glowing dot sits at the "top" of the orbit ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: o.dotSize,
                height: o.dotSize,
                top: -o.dotSize / 2,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: o.dotColor,
                boxShadow: `0 0 ${o.dotSize * 3}px ${o.glowColor}, 0 0 ${o.dotSize * 6}px ${o.glowColor}`
              }}
            />
          </motion.div>
        ))}

        {/* ── Central nucleus ── */}
        <motion.div
          className="absolute rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 60,
            height: 60,
            background: "radial-gradient(circle at 38% 35%, rgba(139,92,246,0.9), rgba(109,40,217,0.4))",
            boxShadow: "0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(139,92,246,0.25), inset 0 0 20px rgba(255,255,255,0.1)"
          }}
        />
        {/* Inner bright dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            background: "white",
            boxShadow: "0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(204,255,0,0.5)"
          }}
        />

        {/* ── Background ambient glow ── */}
        <div
          className="pointer-events-none absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(109,40,217,0.8) 0%, rgba(0,212,170,0.3) 50%, transparent 70%)"
          }}
        />
      </motion.div>

      {/* Ground shadow */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full opacity-20 blur-2xl"
        style={{ width: 200, height: 24, background: "rgba(139,92,246,0.8)" }}
      />
    </div>
  );
}

/* ──────────────── Social icons ───────────────── */
const ICONS: Record<SocialLink["icon"], ReactNode> = {
  Github:   <Github className="h-4 w-4" />,
  Linkedin: <Linkedin className="h-4 w-4" />,
  Mail:     <Mail className="h-4 w-4" />,
};

/* ──────────────── HERO ───────────────── */
export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center pt-28 pb-20 overflow-hidden">

      {/* Top availability tag */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-3"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-lime/80">
          Available for Work & Collaborations — Ghent, BE
        </span>
      </motion.div>

      {/* Main layout */}
      <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-center">

        {/* ── Left: Text ── */}
        <div className="space-y-8">
          {/* Giant name */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-black leading-[0.9] tracking-tight text-ink">
              <span className="block text-[clamp(4rem,12vw,9rem)]">OMER</span>
              <span
                className="block text-[clamp(4rem,12vw,9rem)]"
                style={{
                  WebkitTextStroke: "2px rgba(139,92,246,0.8)",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(139,92,246,0.4))"
                }}
              >
                ASIK
              </span>
            </h1>
          </motion.div>

          {/* Role + typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-accent-violet" />
            <TypingRole />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            I build modern, scalable applications and turn complex problems into
            elegant, practical solutions. Passionate about automation, AI agents,
            and the intersection between design and engineering.
          </motion.p>



          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-violet px-7 py-3.5 font-display font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-violet"
            >
              See My Work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent-violet/40 px-7 py-3.5 font-display font-semibold text-ink/80 transition-all duration-300 hover:border-accent-violet hover:text-white hover:bg-accent-violet/10"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 pt-2"
          >
            {socialLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-ink/50 transition-all hover:border-accent-violet/50 hover:bg-accent-violet/10 hover:text-accent-violet"
              >
                {ICONS[l.icon]}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Orbital System ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <OrbitalSystem />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/25">SCROLL</span>
        <motion.div
          className="h-10 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.7), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
