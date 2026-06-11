"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { education, experience } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <SectionHeader
        index="02"
        eyebrow="Experience & Education"
        title="The journey so far."
        description="From STEM classrooms to building AI automation in a real company — every step added a new layer."
      />

      <div className="relative pl-8 sm:pl-12">
        <span className="timeline-line" />

        {experience.map((job, i) => (
          <motion.article
            key={job.company}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="relative mb-12"
          >
            <span className="absolute -left-8 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-cy/50 bg-bg shadow-glow-cy sm:-left-12">
              <Briefcase size={13} className="text-cy" />
            </span>

            <div className="border-aurora p-7 backdrop-blur sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-bold">
                  {job.role} <span className="text-aurora">@ {job.company}</span>
                </h3>
                <span className="rounded-full border border-cy/30 bg-cy/10 px-3 py-1 font-mono text-xs text-cy">
                  {job.period}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-dim sm:text-base">{job.description}</p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {job.highlights.map((h, hi) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + hi * 0.1 }}
                    className="flex items-start gap-2.5 text-sm text-dim"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-vi" />
                    {h}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-edge/20 bg-card/60 px-3 py-1 font-mono text-xs text-dim transition-colors hover:border-mg/50 hover:text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}

        {education.map((edu, i) => (
          <motion.article
            key={edu.school}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-8 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-vi/40 bg-bg sm:-left-12">
              <GraduationCap size={13} className="text-vi" />
            </span>

            <div className="glass group rounded-3xl p-6 transition-all duration-300 hover:border-vi/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold">
                  {edu.program} <span className="text-dim">· {edu.school}</span>
                </h3>
                <span className="font-mono text-xs text-dim">{edu.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-dim">{edu.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
