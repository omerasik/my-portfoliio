"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, Github, Mail, Sparkles, Workflow, X } from "lucide-react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

function Tilt({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${py * -8}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

function MailAgentVisual() {
  return (
    <div className="relative flex h-52 items-center justify-center overflow-hidden sm:h-full sm:min-h-[280px]">
      <div className="absolute inset-0 bg-gradient-to-br from-vi/20 via-transparent to-mg/15" />
      <div className="relative flex items-center gap-3 sm:gap-5">
        {[
          { icon: Mail, label: "inbox", color: "text-cy border-cy/40" },
          { icon: Bot, label: "AI agent", color: "text-mg border-mg/40" },
          { icon: Workflow, label: "workflow", color: "text-vi border-vi/40" }
        ].map((node, i) => (
          <div key={node.label} className="flex items-center gap-3 sm:gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, type: "spring" }}
              className="flex flex-col items-center gap-2"
            >
              <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-card/70 backdrop-blur sm:h-16 sm:w-16 ${node.color}`}>
                <node.icon size={24} />
                {i === 1 && <span className="animate-pulse-ring absolute inset-0 rounded-2xl border border-mg/50" />}
              </span>
              <span className="font-mono text-[10px] text-dim">{node.label}</span>
            </motion.div>
            {i < 2 && (
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.25, duration: 0.4 }}
                className="block h-px w-8 origin-left bg-gradient-to-r from-cy to-mg sm:w-12"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
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
        className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-edge/15 bg-card/50 backdrop-blur transition-colors duration-300 hover:border-vi/40 ${
          featured ? "grid sm:grid-cols-2" : ""
        }`}
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
                <Sparkles size={28} className="text-vi/50" />
              </div>
            )}
            <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cy via-vi to-mg transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        )}

        <div className={`tilt-inner p-6 ${featured ? "sm:p-9" : ""}`}>
          <div className="flex items-center gap-2">
            {featured && <Sparkles size={14} className="text-mg" />}
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${featured ? "text-mg" : "text-cy"}`}>
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
              <span key={tech} className="rounded-full border border-edge/20 bg-bg/60 px-2.5 py-0.5 font-mono text-[11px] text-dim">
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cy opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            View details <ArrowUpRight size={15} />
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="border-aurora max-h-[85vh] w-full max-w-2xl overflow-y-auto p-7 backdrop-blur-xl sm:p-9"
        style={{ background: "rgb(var(--card) / 0.92)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mg">{project.category}</span>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge/20 text-dim transition-colors hover:border-mg/50 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-4 leading-relaxed text-dim">{project.description}</p>

        {project.features && (
          <ul className="mt-5 space-y-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cy to-mg" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-vi/25 bg-vi/10 px-3 py-1 font-mono text-xs text-ink">
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
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  link.variant === "primary"
                    ? "bg-gradient-to-r from-cy via-vi to-mg text-bg shadow-glow-vi hover:shadow-glow-mg"
                    : "border border-edge/30 text-ink hover:border-cy/50"
                }`}
              >
                {link.icon === "Github" ? <Github size={15} /> : <ArrowUpRight size={15} />}
                {link.label}
              </a>
            ) : (
              <span key={link.label} className="inline-flex items-center gap-2 rounded-full border border-edge/20 px-5 py-2.5 font-mono text-xs text-dim">
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
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <SectionHeader
        index="05"
        eyebrow="Projects"
        title="Things I've actually built."
        description="Real products: AI automation, full-stack platforms, mobile apps. Click any card for the full story."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} onOpen={() => setSelected(project)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
