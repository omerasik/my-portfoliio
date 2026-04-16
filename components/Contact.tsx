"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import { contactDetails } from "@/lib/data";
import type { ContactDetail } from "@/lib/data";

const ICONS: Record<ContactDetail["icon"], React.ReactNode> = {
  Mail:     <Mail className="h-5 w-5" />,
  Phone:    <Phone className="h-5 w-5" />,
  MapPin:   <MapPin className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github:   null,
};

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mb-16 flex items-center gap-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-violet">006 — Contact</span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
      </motion.div>

      {/* Giant CTA text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="font-display font-black leading-none tracking-tight">
          <span className="block text-[clamp(3rem,10vw,7rem)] text-ink/90">LET&apos;S</span>
          <span
            className="block text-[clamp(3rem,10vw,7rem)]"
            style={{
              WebkitTextStroke: "2px rgba(139,92,246,0.7)",
              WebkitTextFillColor: "transparent",
            }}
          >
            WORK
          </span>
          <span className="block text-[clamp(3rem,10vw,7rem)] text-gradient-vl">TOGETHER.</span>
        </h2>
      </motion.div>

      {/* Contact grid */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left: description + contacts */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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

        {/* Right: big email CTA */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl border border-accent-violet/20 bg-surface/60 p-10 backdrop-blur-sm"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-violet/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-accent-lime/8 blur-3xl" />

          <div className="relative space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-violet/30 bg-accent-violet/15">
              <Mail className="h-7 w-7 text-accent-violet" />
            </div>
            <div>
              <h3 className="font-display text-3xl font-black text-ink">Ready to start?</h3>
              <p className="mt-2 text-ink/50">Drop me a message and I&apos;ll get back to you within 24 hours.</p>
            </div>
            <motion.a
              href="mailto:omerfarukasik54@gmail.com?subject=Let's Work Together"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-accent-violet py-4 font-display font-bold text-white transition-all hover:bg-accent-indigo hover:shadow-violet"
            >
              <Mail className="h-5 w-5" />
              Send an Email
            </motion.a>
            {/* Eye-Catching 3D Tesseract Core */}
            <div className="flex justify-center pt-10 pb-6">
              <div className="relative h-32 w-32" style={{ perspective: 1000 }}>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotateY: 360, rotateX: 360, rotateZ: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Outer Glass Cube */}
                  {[
                    "rotateY(0deg) translateZ(64px)",
                    "rotateY(180deg) translateZ(64px)",
                    "rotateY(90deg) translateZ(64px)",
                    "rotateY(-90deg) translateZ(64px)",
                    "rotateX(90deg) translateZ(64px)",
                    "rotateX(-90deg) translateZ(64px)",
                  ].map((transform, i) => (
                    <div
                      key={`outer-${i}`}
                      className="absolute inset-0 flex items-center justify-center border border-accent-violet/40 bg-accent-violet/5"
                      style={{ transform, backdropFilter: "blur(2px)" }}
                    >
                      {/* Grid lines on outer faces */}
                      <div className="h-[1px] w-full bg-accent-violet/20 absolute" />
                      <div className="h-full w-[1px] bg-accent-violet/20 absolute" />
                    </div>
                  ))}
                  
                  {/* Inner Glowing Cube */}
                  {[
                    "rotateY(0deg) translateZ(32px)",
                    "rotateY(180deg) translateZ(32px)",
                    "rotateY(90deg) translateZ(32px)",
                    "rotateY(-90deg) translateZ(32px)",
                    "rotateX(90deg) translateZ(32px)",
                    "rotateX(-90deg) translateZ(32px)",
                  ].map((transform, i) => (
                    <div
                      key={`inner-${i}`}
                      className="absolute left-1/4 top-1/4 h-1/2 w-1/2 border-2 border-accent-lime bg-accent-lime/20 shadow-[0_0_30px_#CCFF00]"
                      style={{ transform }}
                    />
                  ))}
                  
                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_30px_#ffffff]" />
                </motion.div>
                
                {/* Ambient Glow */}
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-60 blur-3xl">
                   <div className="h-24 w-24 rounded-full bg-accent-violet" />
                   <div className="absolute h-16 w-16 rounded-full bg-accent-lime" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
