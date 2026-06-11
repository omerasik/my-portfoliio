"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

const JOB_TAGS = ["Business Central", "AL", "Power Apps", "Power Automate", "Azure DevOps", "AI Agents"];

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="section-padding relative">
      <SectionHeader index="02" eyebrow={t.exp.eyebrow} title={t.exp.title} description={t.exp.desc} />

      <div className="relative pl-8 sm:pl-12">
        <span className="timeline-line" />

        {/* Work */}
        <motion.article
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mb-12"
        >
          <span className="absolute -left-8 top-1 flex h-7 w-7 items-center justify-center border border-a1/50 bg-bg sm:-left-12">
            <Briefcase size={13} className="text-a1" />
          </span>

          <div className="panel ticks p-7 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-bold">
                {t.exp.role} <span className="text-signal">@ Astena</span>
              </h3>
              <span className="border border-a1/30 border-l-2 border-l-a1 bg-a1/10 px-3 py-1 font-mono text-xs text-a1">
                {t.exp.period}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-dim sm:text-base">{t.exp.jobDesc}</p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.exp.highlights.map((h, hi) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + hi * 0.1 }}
                  className="flex items-start gap-2.5 text-sm text-dim"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-a2" />
                  {h}
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {JOB_TAGS.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Education */}
        {t.exp.edu.map((edu, i) => (
          <motion.article
            key={edu.school}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-8 top-1 flex h-7 w-7 items-center justify-center border border-a2/40 bg-bg sm:-left-12">
              <GraduationCap size={13} className="text-a2" />
            </span>

            <div className="panel panel--quiet p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold">
                  {edu.program} <span className="text-dim">· {edu.school}</span>
                </h3>
                <span className="font-mono text-xs text-dim">{edu.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-dim">{edu.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
