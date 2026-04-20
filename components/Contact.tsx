"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import { contactDetails } from "@/lib/data";
import type { ContactDetail } from "@/lib/data";
import type { ReactNode } from "react";

const ICONS: Record<ContactDetail["icon"], ReactNode> = {
  Mail:     <Mail     className="h-5 w-5" />,
  Phone:    <Phone    className="h-5 w-5" />,
  MapPin:   <MapPin   className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github:   null,
};

/* ── Animated terminal block ─────────────────────── */
const terminalLines: { key: string; value: string; color: string }[] = [
  { key: "name",    value: '"Omer Asik"',             color: "text-accent-lime"   },
  { key: "status",  value: '"available"',             color: "text-[#00D4AA]"     },
  { key: "focus",   value: '"Full-Stack  ·  AI"',     color: "text-accent-violet" },
  { key: "base",    value: '"Ghent, Belgium"',         color: "text-ink/70"        },
  { key: "builds",   value: '"ideas  →  production"',  color: "text-accent-lime"   },
];

function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/6 bg-void/70 backdrop-blur-sm">
      {/* macOS-style window bar */}
      <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60"    />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60"  />
        <span className="ml-3 font-mono text-[10px] text-ink/25">contact.config.ts</span>
      </div>

      {/* Code body */}
      <div className="p-5 font-mono text-sm leading-7">
        {/* Opening brace */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-ink/30"
        >
          const <span className="text-accent-violet">developer</span> = {"{"}
        </motion.p>

        {terminalLines.map((line, i) => (
          <motion.div
            key={line.key}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.35 }}
            className="flex gap-0 pl-6"
          >
            <span className="text-ink/40 whitespace-nowrap">{line.key}:&nbsp;</span>
            <span className={`${line.color} whitespace-nowrap`}>{line.value}<span className="text-ink/30">,</span></span>
          </motion.div>
        ))}

        {/* Closing brace */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 + terminalLines.length * 0.15 }}
          className="text-ink/30"
        >
          {"}"}<span className="text-ink/20">;</span>
        </motion.p>

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          className="mt-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent-lime"
        />
      </div>
    </div>
  );
}

/* ── CONTACT SECTION ─────────────────────────────── */
export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">

      {/* Subtle ambient glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/6 blur-3xl" />

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mb-16 flex items-center gap-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-violet">006 — Contact</span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
      </motion.div>

      {/* Giant heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="font-display font-black leading-none tracking-tight">
          <span className="block text-[clamp(3rem,10vw,7rem)] text-ink/90">LET&apos;S</span>
          <span className="block text-[clamp(3rem,10vw,7rem)]"
            style={{ WebkitTextStroke: "2px rgba(139,92,246,0.7)", WebkitTextFillColor: "transparent" }}>
            WORK
          </span>
          <span className="block text-[clamp(3rem,10vw,7rem)] text-gradient-vl">TOGETHER.</span>
        </h2>
      </motion.div>

      {/* ── Grid ──────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">

        {/* LEFT: description + contact rows */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <p className="max-w-md text-lg leading-relaxed text-ink/55">
            I&apos;m currently open to junior developer roles and internships.
            If you have a project, a question, or just want to say hi — my inbox is always open.
          </p>

          <div className="space-y-3">
            {contactDetails.filter(d => d.icon !== "Github").map((d, i) => (
              <motion.a
                key={d.label}
                href={d.href}
                target={d.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-5 rounded-xl border border-white/6 bg-surface/50 p-4 transition-all hover:border-accent-violet/30 hover:bg-surface"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent-violet/25 bg-accent-violet/10 text-accent-violet flex-shrink-0">
                  {ICONS[d.icon]}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink/35">{d.label}</p>
                  <p className="truncate text-sm font-medium text-ink/80 group-hover:text-ink transition-colors">{d.value}</p>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 flex-shrink-0 text-ink/20 transition-all group-hover:text-accent-violet group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl border border-accent-violet/20 bg-surface/60 p-8 backdrop-blur-sm"
        >
          {/* Card glows */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent-violet/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-accent-lime/8  blur-3xl" />

          <div className="relative space-y-6">
            {/* Icon */}
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-violet/30 bg-accent-violet/15">
              <Mail className="h-7 w-7 text-accent-violet" />
            </div>

            {/* Heading + sub */}
            <div>
              <h3 className="font-display text-3xl font-black text-ink">Ready to start?</h3>
              <p className="mt-2 text-ink/50">
                Drop me a message and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* CTA button */}
            <motion.a
              href="mailto:omerfarukasik54@gmail.com?subject=Let's Work Together"
              whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(139,92,246,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-accent-violet py-4 font-display text-base font-bold text-white transition-all hover:bg-accent-indigo"
            >
              <Mail className="h-5 w-5" />
              Send an Email
            </motion.a>

            {/* Terminal animation */}
            <TerminalCard />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
