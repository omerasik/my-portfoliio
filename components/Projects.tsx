"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, Github, Mail, Sparkles, Workflow, X } from "lucide-react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

/* 3D tilt wrapper */
function Tilt({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${py * -7}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

/* Featured AI Mail Agent visual */
function MailAgentVisual() {
  return (
    <div className="relative flex h-52 items-center justify-center overflow-hidden sm:h-full sm:min-h-[280px]">
      <div className="absolute inset-0 bg-gradient-to-br from-a1/15 via-transparent to-a2/10" />
      <div className="relative flex items-center gap-3 sm:gap-5">
        {[
          { icon: Mail, label: "inbox", color: "text-a2 border-a2/40" },
          { icon: Bot, label: "ai agent", color: "text-a1 border-a1/40" },
          { icon: Workflow, label: "workflow", color: "text-a3 border-a3/40" }
        ].map((node, i) => (
          <div key={node.label} className="flex items-center gap-3 sm:gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, type: "spring" }}
              className="flex flex-col items-center gap-2"
            >
              <span className={`relative flex h-14 w-14 items-center justify-center border bg-card/70 backdrop-blur sm:h-16 sm:w-16 ${node.color}`}>
                <node.icon size={24} />
                {i === 1 && <span className="animate-pulse-ring absolute inset-0 border border-a1/50" />}
              </span>
              <span className="font-mono text-[10px] text-dim">{node.label}</span>
            </motion.div>
            {i < 2 && (
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.25, duration: 0.4 }}
                className="block h-px w-8 origin-left bg-gradient-to-r from-a1 to-a2 sm:w-12"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, viewLabel, onOpen }: { project: Project; index: number; viewLabel: string; onOpen: () => void }) {
  const featured = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08 }}
      className={featured ? "sm:col-span-2 lg:col-span-3" : ""}
    >
      <Tilt
        onClick={onOpen}
        className={`panel group relative cursor-pointer overflow-hidden ${featured ? "grid sm:grid-cols-2" : ""}`}
      >
        {featured ? (
          <MailAgentVisual />
        ) : (
          <div className="relative h-44 overflow-hidden bg-bg2">
            {project.images && project.images.length > 0 ? (
              <div className="absolute inset-0 flex items-center justify-center gap-2 p-3">
                {project.images.map((img, idx) => (
                  <div key={idx} className="relative h-full w-full flex-1">
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
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
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Sparkles size={28} className="text-a2/50" />
              </div>
            )}
            <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-a1 via-a2 to-a3 transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        )}

        <div className={`tilt-inner p-6 ${featured ? "sm:p-9" : ""}`}>
          <div className="flex items-center gap-2">
            {featured && <Sparkles size={14} className="text-a3" />}
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${featured ? "text-a3" : "text-a1"}`}>
              {project.category}
            </span>
          </div>
          <h3 className={`mt-3 font-display font-bold ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {project.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed text-dim ${featured ? "sm:text-base" : "line-clamp-3"}`}>
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, featured ? 8 : 4).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-a1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            {viewLabel} <ArrowUpRight size={15} />
          </span>
        </div>
      </Tilt>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="panel max-h-[85vh] w-full max-w-2xl overflow-y-auto p-7 sm:p-9"
        style={{ background: "rgb(var(--card) / 0.95)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-a3">{project.category}</span>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="btn-chamfer flex h-9 w-9 shrink-0 items-center justify-center border border-edge/25 text-dim transition-colors hover:border-a3/50 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-4 leading-relaxed text-dim">{project.description}</p>

        {project.features && (
          <ul className="mt-5 space-y-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gradient-to-r from-a1 to-a2" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.links.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-chamfer inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-300 ${
                  link.variant === "primary"
                    ? "bg-gradient-to-r from-a1 to-a2 text-bg hover:shadow-glow-a1"
                    : "border border-edge/30 text-ink hover:border-a1/50 hover:text-a1"
                }`}
              >
                {link.icon === "Github" ? <Github size={15} /> : <ArrowUpRight size={15} />}
                {link.label}
              </a>
            ) : (
              <span key={link.label} className="inline-flex items-center gap-2 border border-edge/20 border-l-2 border-l-a3 px-5 py-2.5 font-mono text-xs text-dim">
                {link.label}
              </span>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <SectionHeader index="05" eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.desc} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} viewLabel={t.projects.view} onOpen={() => setSelected(project)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
