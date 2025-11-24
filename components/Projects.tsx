"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/lib/data";

export default function Projects() {
  const cardGradients = [
    "from-[#0F1C2E] via-[#070A14] to-[#111435]",
    "from-[#110E2D] via-[#090719] to-[#051C2C]"
  ];

  const glowGradients = [
    "from-accent-cyan/40 via-transparent to-accent-pink/40",
    "from-accent-pink/40 via-transparent to-accent-cyan/40"
  ];

  const badgeStyles =
    "group/badge relative overflow-hidden rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70 opacity-80 transition duration-300 hover:border-accent-cyan/60 hover:opacity-100 hover:text-white hover:shadow-[0_0_25px_rgba(45,212,191,0.35)]";

  const actionStyles: Record<"primary" | "secondary" | "muted", string> = {
    primary:
      "group/action inline-flex items-center gap-2 rounded-full border border-accent-cyan/60 bg-accent-cyan/10 px-5 py-2 text-sm font-semibold text-accent-cyan transition duration-300 hover:-translate-y-0.5 hover:bg-accent-cyan/20 hover:text-white hover:shadow-[0_0_18px_rgba(45,212,191,0.35)]",
    secondary:
      "group/action inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white/80 transition duration-300 hover:-translate-y-0.5 hover:border-accent-pink/60 hover:text-white hover:shadow-[0_0_18px_rgba(236,72,153,0.3)]",
    muted:
      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/50 cursor-default"
  };

  const actionIcon = (icon?: "ArrowUpRight" | "Github") => {
    if (icon === "Github") return <Github className="h-4 w-4 transition duration-300 group-hover/action:text-white" />;
    if (icon === "ArrowUpRight") return <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover/action:translate-x-0.5" />;
    return null;
  };

  return (
    <motion.section
      id="projects"
      className="section-padding space-y-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="space-y-4 text-center">
        <SectionHeader eyebrow="Projects" title="Explore My Work" description="A mix of full-stack applications, dashboards, and prototypes that reflect my current level." align="center" />
      </div>
      <div className="space-y-16 md:space-y-20">
        {projects.map((project, index) => {
          const cardGradient = cardGradients[index % cardGradients.length];
          const glowGradient = glowGradients[index % glowGradients.length];

          return (
            <motion.article
              key={project.title}
              whileHover={{ y: -6 }}
              className="group relative grid gap-10 overflow-hidden rounded-[1.75rem] p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            >
              <div className={`absolute inset-0 rounded-[1.75rem] bg-gradient-to-br ${cardGradient}`} />
              <div className="absolute inset-0 rounded-[1.75rem] border border-white/10" />
              <div className={`absolute -inset-6 rounded-[2.25rem] bg-gradient-to-r ${glowGradient} opacity-0 blur-3xl transition duration-700 group-hover:opacity-60`} />
              <div className="relative z-10 flex flex-col justify-center gap-7">
                <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  {project.category}
                </span>
                <div className="space-y-4">
                  <h3 className="font-display text-3xl text-white sm:text-4xl">{project.title}</h3>
                  <p className="text-base leading-relaxed text-white/80 md:text-lg">{project.description}</p>
                </div>
                {project.features && (
                  <ul className="space-y-2 text-sm text-white/70 md:text-base">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-cyan" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.stack.map((tech) => (
                    <span key={tech} className={badgeStyles}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  {project.links.map((link) => {
                    if (!link.href || link.variant === "muted") {
                      return (
                        <span key={link.label} className={actionStyles.muted}>
                          {link.label}
                        </span>
                      );
                    }

                    const variant = link.variant ?? "primary";

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionStyles[variant]}
                      >
                        {actionIcon(link.icon)}
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/5 backdrop-blur"
                >
                  {project.image ? (
                    <>
                      <div className="absolute inset-0 p-3 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-60" />
                      <div className="relative flex h-full flex-col justify-between p-6">
                        <div className="flex items-center gap-2 text-white/40">
                          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="space-y-3 text-white/50">
                          <div className="h-3 rounded-full bg-white/15" />
                          <div className="h-3 w-5/6 rounded-full bg-white/10" />
                          <div className="h-3 w-2/3 rounded-full bg-white/15" />
                          <div className="h-3 rounded-full bg-white/8" />
                          <div className="h-3 w-3/4 rounded-full bg-white/12" />
                          <div className="h-3 w-1/2 rounded-full bg-white/8" />
                        </div>
                        <div className="space-y-2 text-white/40">
                          <div className="h-2 rounded-full bg-white/8" />
                          <div className="h-2 w-4/5 rounded-full bg-white/12" />
                          <div className="h-2 w-2/3 rounded-full bg-white/8" />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] border border-white/10" />
                  <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[conic-gradient(from_140deg,rgba(6,182,212,0.35),rgba(236,72,153,0.35),rgba(6,182,212,0.35))] opacity-0 blur-3xl transition duration-700 group-hover:opacity-70" />
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
