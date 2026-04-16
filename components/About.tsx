"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Coffee, Lightbulb, Rocket, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { languages } from "@/lib/data";

const values = [
  { icon: Rocket,    title: "Ship It",              desc: "I turn ideas into real products that people use and benefit from — reliably and fast.",       accent: "#CCFF00" },
  { icon: Users,     title: "Collaborate",           desc: "Great software is built together. I thrive in team environments where ideas become something bigger.", accent: "#8B5CF6" },
  { icon: Lightbulb, title: "Problem First",         desc: "Science background means I deconstruct problems analytically before writing a single line.", accent: "#00D4AA" },
  { icon: Zap,       title: "Automate Everything",   desc: "Repetitive tasks should be automated. AI and scripts are my tools of choice for smarter workflows.", accent: "#CCFF00" },
  { icon: Code2,     title: "Clean Code",            desc: "Code is read more than it's written. I write for the next developer, always.",               accent: "#8B5CF6" },
  { icon: Coffee,    title: "Always Learning",       desc: "Technology moves fast. I stay curious, build continuously, and embrace the unknown.",          accent: "#00D4AA" },
];

function Card3D({ icon: Icon, title, desc, accent, index }: { icon: LucideIcon; title: string; desc: string; accent: string; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spx = useSpring(mx, { stiffness: 120, damping: 22 });
  const spy = useSpring(my, { stiffness: 120, damping: 22 });
  const rotX = useTransform(spy, [-80, 80], [8, -8]);
  const rotY = useTransform(spx, [-80, 80], [-8, 8]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      style={{ perspective: 1000 }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/6 bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/12"
      >
        {/* Top accent line that grows on hover */}
        <div
          className="absolute left-0 right-0 top-0 h-[1px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
          style={{ backgroundColor: accent }}
        />

        <div
          className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ borderColor: `${accent}30`, background: `${accent}12`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h4 className="mb-2 font-display text-lg font-bold text-ink">{title}</h4>
        <p className="text-sm leading-relaxed text-ink/50">{desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding">
      {/* Section tag */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 flex items-center gap-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-violet">002 — About</span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
      </motion.div>

      <div className="grid gap-20 lg:grid-cols-[1fr_1fr] lg:items-start">
        {/* Left: headline + story */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="font-display text-5xl font-black leading-none tracking-tight text-ink sm:text-6xl">
            WHO <br/>
            <span className="text-gradient-vl">I AM.</span>
          </h2>
          <div className="space-y-5 border-l-2 border-accent-violet/30 pl-6">
            <p className="text-base leading-relaxed text-ink/65">
              I&apos;m a full-stack developer in training based in <strong className="text-ink/90">Ghent, Belgium</strong>, with
              a background in science and mathematics. I&apos;m especially excited by how{" "}
              <strong className="text-accent-violet">AI and automation</strong> can reshape digital workflows —
              making them faster, smarter, and more human.
            </p>
            <p className="text-base leading-relaxed text-ink/65">
              My approach is always product-first: I design and build{" "}
              <strong className="text-accent-teal">full-stack applications</strong> that feel great to use,
              choosing the right tool for each job and staying close to real-world feedback.
            </p>
            <p className="text-base leading-relaxed text-ink/65">
              When I&apos;m not coding I&apos;m reading about emerging tech, exploring side projects, or finding the
              perfect brew ☕.
            </p>
          </div>

          {/* Languages */}
          <div className="pt-4">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/30">Spoken Languages</p>
            <div className="flex flex-wrap gap-2">
              {languages.map(l => (
                <motion.span
                  key={l}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="rounded-lg border border-white/8 bg-surface/80 px-4 py-2 font-mono text-sm text-ink/70"
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: 2 focus areas */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-4"
        >
          {/* Full Stack Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-accent-violet/20 bg-surface/60 p-8 backdrop-blur-sm"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent-violet/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent-violet/60">01</span>
              <h3 className="mt-3 font-display text-3xl font-black text-ink">Full-Stack</h3>
              <h3 className="font-display text-3xl font-black text-gradient-vl">Development</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/50">
                From database schema to pixel-perfect UI. I design, build, and ship complete web applications end-to-end — covering front-end, back-end, APIs and deployment.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Next.js", "Node.js", "PostgreSQL", "Docker"].map(t => (
                  <span key={t} className="rounded-md border border-accent-violet/20 bg-accent-violet/8 px-2.5 py-1 font-mono text-[10px] text-accent-violet/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Agent Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-accent-lime/20 bg-surface/60 p-8 backdrop-blur-sm"
          >
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-accent-lime/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-lime/4 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent-lime/60">02</span>
              <h3 className="mt-3 font-display text-3xl font-black text-ink">AI Agent &</h3>
              <h3 className="font-display text-3xl font-black" style={{ color: "#CCFF00", textShadow: "0 0 30px rgba(204,255,0,0.4)" }}>Automation</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/50">
                Building intelligent AI agents, automation pipelines, and smart workflows. Using n8n, Supabase, and LLM APIs to make software smarter and processes faster.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["n8n", "Supabase", "LLM APIs", "Webhooks", "Python"].map(t => (
                  <span key={t} className="rounded-md border border-accent-lime/20 bg-accent-lime/6 px-2.5 py-1 font-mono text-[10px] text-accent-lime/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Values grid */}
      <div className="mt-24">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 font-display text-3xl font-black text-ink"
        >
          WHAT <span className="text-gradient-vl">DRIVES ME</span>
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => <Card3D key={v.title} {...v} index={i} />)}
        </div>
      </div>
    </section>
  );
}
