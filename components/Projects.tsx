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

/* Brand icons (inline, 24x24 simple-icons paths) */
type Brand = { name: string; color?: string; themed?: boolean; path?: string; node?: ReactNode };

const SOCIAL_BRANDS: Brand[] = [
  {
    name: "X",
    themed: true,
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
  },
  {
    name: "Instagram",
    color: "#E1306C",
    node: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
      </>
    )
  },
  {
    name: "YouTube",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  },
  {
    name: "TikTok",
    themed: true,
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  },
  {
    name: "Reddit",
    color: "#FF4500",
    path: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12c-.688 0-1.25.561-1.25 1.25 0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
  }
];

function BrandGlyph({ brand, size = 18 }: { brand: Brand; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={brand.path ? "currentColor" : "none"} aria-hidden>
      {brand.node ?? <path d={brand.path} />}
    </svg>
  );
}

/* Social media automation visual: static grid of platforms feeding an automation engine */
function SocialAutomationVisual() {
  return (
    <div className="relative flex h-44 flex-col items-center justify-center gap-4 overflow-hidden bg-bg2 px-6">
      <span className="absolute inset-0 bg-gradient-to-br from-a1/12 via-transparent to-a2/12" />
      <span
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(var(--edge) / 0.35) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 75% at 50% 45%, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 45%, black 35%, transparent 80%)"
        }}
      />

      {/* platform row */}
      <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
        {SOCIAL_BRANDS.map((brand) => (
          <span
            key={brand.name}
            title={brand.name}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border border-edge/25 bg-card/90 shadow-sm backdrop-blur sm:h-10 sm:w-10 ${
              brand.themed ? "text-ink" : ""
            }`}
            style={brand.themed ? undefined : { color: brand.color }}
          >
            <BrandGlyph brand={brand} />
          </span>
        ))}
      </div>

      {/* connector */}
      <span className="relative z-10 h-5 w-px bg-gradient-to-b from-edge/40 to-a1/60" />

      {/* automation engine pill */}
      <div className="relative z-10 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-a1 to-a2 px-4 py-2 text-bg shadow-glow-a1">
        <Bot size={18} />
        <span className="font-mono text-xs font-semibold tracking-wide">auto-publish</span>
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
        ) : project.visual === "social" ? (
          <SocialAutomationVisual />
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
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 17vw, 11vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} — project preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
