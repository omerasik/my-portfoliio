"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Languages, Rocket, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { languages } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

const PILLAR_ICONS: LucideIcon[] = [Rocket, Workflow, Bot];
const PILLAR_COLORS = ["text-a1 border-a1/40", "text-a2 border-a2/40", "text-a3 border-a3/40"];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section-padding relative">
      <SectionHeader index="01" eyebrow={t.about.eyebrow} title={t.about.title} description={t.about.desc} />

      <div className="grid gap-6 lg:grid-cols-3">
        {t.about.pillars.map((p, i) => {
          const Icon = PILLAR_ICONS[i] ?? Rocket;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="panel ticks group p-7"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center border bg-card/60 ${PILLAR_COLORS[i]}`}>
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{p.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Currently */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="panel panel--quiet p-7"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-ping bg-a1 opacity-60" />
              <span className="h-2.5 w-2.5 bg-a1" />
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">{t.about.currently}</p>
          </div>
          <p className="mt-4 text-lg font-semibold">
            {t.about.currentlyRole} <span className="text-signal">@ {t.about.currentlyCompany}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-dim">{t.about.currentlyDesc}</p>
          <div className="mt-5 flex items-center gap-2 text-dim">
            <Languages size={15} className="text-a2" />
            <span className="text-sm">{languages.join(" · ")}</span>
          </div>
        </motion.div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="panel panel--quiet p-7"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">{t.about.humanSkills}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {t.about.soft.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 260 }}
                className="tag"
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-dim">
            <Cpu size={15} className="text-a1" />
            <span className="text-sm">{t.about.learning}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
