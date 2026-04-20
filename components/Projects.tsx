"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

const CATEGORY_COLOR: Record<string, string> = {
  "FULL-STACK":             "#8B5CF6",
  "FRONTEND":               "#00D4AA",
  "HEADLESS CMS":           "#CCFF00",
  "MOBILE APP — CURRENT PROJECT": "#CCFF00",
};

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  const accent = CATEGORY_COLOR[project.category] ?? "#8B5CF6";
  const isFeature = index < 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onClick={onClick}
      whileHover={{ y: -6 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/6 bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-white/14 hover:shadow-card-hover ${isFeature ? "sm:col-span-2" : ""}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-deep ${isFeature ? "h-52 sm:h-64" : "h-44"}`}>
        {/* Top border sweep on hover */}
        <div
          className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 z-10 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
        {project.images && project.images.length > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 p-4">
             {project.images.map((img, idx) => (
                <div key={idx} className="relative h-full flex-1 w-full">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    fill
                    priority={index < 3}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
             ))}
          </div>
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={index < 3}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl font-black text-white/5">{project.title[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />
        {/* Category tag */}
        <div className="absolute left-4 top-4">
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider"
            style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}30` }}
          >
            {project.category}
          </span>
        </div>
        {/* Arrow hint */}
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/8 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-white leading-tight">
          {project.title}
        </h3>
        <p className="text-xs leading-relaxed text-ink/45 line-clamp-2">{project.description}</p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, isFeature ? 5 : 3).map(t => (
            <span key={t} className="rounded-md border border-white/6 bg-white/4 px-2 py-1 font-mono text-[10px] text-ink/45">
              {t}
            </span>
          ))}
          {project.stack.length > (isFeature ? 5 : 3) && (
            <span className="rounded-md border border-white/6 bg-white/4 px-2 py-1 font-mono text-[10px] text-ink/45">
              +{project.stack.length - (isFeature ? 5 : 3)} more
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [sel, setSel] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="section-padding">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-violet">005 — Projects</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-16 font-display text-5xl font-black leading-none tracking-tight sm:text-6xl"
        >
          MY <span className="text-gradient-vl">WORK.</span>
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} onClick={() => setSel(p)} index={i} />
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-void/85 backdrop-blur-md p-0 sm:p-6"
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-deep shadow-card"
            >
              {/* Close */}
              <button
                onClick={() => setSel(null)}
                className="sticky top-4 float-right z-10 mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-ink/60 hover:bg-white/14 hover:text-ink transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="clear-both p-6 sm:p-8 space-y-6">
                {/* Category */}
                {(() => {
                  const accent = CATEGORY_COLOR[sel.category] ?? "#8B5CF6";
                  return (
                    <span className="inline-block rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}30` }}>
                      {sel.category}
                    </span>
                  );
                })()}

                <h2 className="font-display text-3xl font-black text-ink sm:text-4xl">{sel.title}</h2>
                <p className="text-base leading-relaxed text-ink/65">{sel.description}</p>

                {/* Image */}
                {sel.images && sel.images.length > 0 ? (
                  <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl border border-white/8 bg-surface">
                    <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-6 p-4 sm:p-6">
                      {sel.images.map((img, idx) => (
                        <div key={idx} className="relative h-full flex-1 w-full">
                          <Image src={img} alt={`${sel.title} screenshot ${idx + 1}`} fill className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : sel.image ? (
                  <div className="relative h-52 sm:h-64 overflow-hidden rounded-2xl border border-white/8 bg-surface">
                    <Image src={sel.image} alt={sel.title} fill className="object-contain p-4" />
                  </div>
                ) : null}

                {/* Features */}
                {sel.features && (
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink/35">Key Features</p>
                    <ul className="space-y-2">
                      {sel.features.map(f => (
                        <li key={f} className="flex gap-3 text-sm text-ink/60">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-lime" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack */}
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink/35">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {sel.stack.map(t => (
                      <span key={t} className="rounded-lg border border-white/8 bg-surface px-3 py-1.5 font-mono text-xs text-ink/65 hover:border-accent-violet/40 hover:text-ink transition-all">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {sel.links.map(l => {
                    if (!l.href || l.variant === "muted")
                      return <span key={l.label} className="rounded-full border border-white/8 px-5 py-2.5 font-mono text-xs text-ink/30">{l.label}</span>;
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
                          l.variant === "primary"
                            ? "bg-accent-violet text-white hover:bg-accent-indigo hover:shadow-violet"
                            : "border border-white/12 bg-white/5 text-ink/65 hover:border-white/25 hover:text-ink"
                        }`}
                      >
                        {l.icon === "Github" && <Github className="h-3.5 w-3.5" />}
                        {l.icon === "ArrowUpRight" && <ArrowUpRight className="h-3.5 w-3.5" />}
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
