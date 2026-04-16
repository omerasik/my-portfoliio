"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AppWindow, Database, MonitorSmartphone, ServerCog, Users, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  AppWindow, MonitorSmartphone, ServerCog, Database, Workflow, Users
};

const ACCENTS = ["#8B5CF6", "#CCFF00", "#00D4AA", "#8B5CF6", "#CCFF00", "#00D4AA"];

function ServiceCard({ title, description, icon, index }: { title: string; description: string; icon: string; index: number }) {
  const Icon = ICONS[icon] || AppWindow;
  const accent = ACCENTS[index % ACCENTS.length];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  const rotX = useTransform(sy, [-100, 100], [7, -7]);
  const rotY = useTransform(sx, [-100, 100], [-7, 7]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ perspective: 900 }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/6 bg-surface/50 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:shadow-card-hover"
      >
        {/* Animated top border */}
        <div
          className="absolute left-0 right-0 top-0 h-[1px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
        {/* Ambient */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
          style={{ backgroundColor: accent }}
        />

        {/* Number */}
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/20">
          {String(index + 1).padStart(2, "0")}
        </p>

        {/* Icon */}
        <div
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: `${accent}35`, background: `${accent}10`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mb-3 font-display text-xl font-bold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ink/50">{description}</p>

        {/* Bottom expand line */}
        <div
          className="mt-7 h-px w-0 transition-all duration-500 group-hover:w-2/3"
          style={{ background: `linear-gradient(90deg, ${accent}70, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mb-16 flex items-center gap-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-violet">004 — Services</span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-16 font-display text-5xl font-black leading-none tracking-tight sm:text-6xl"
      >
        HOW I <span className="text-gradient-vl">HELP.</span>
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
      </div>
    </section>
  );
}
