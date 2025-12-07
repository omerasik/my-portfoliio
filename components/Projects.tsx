"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <motion.section
        id="projects"
        className="section-padding space-y-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4 text-center">
          <SectionHeader 
            eyebrow="Projects" 
            title="Explore My Work" 
            description="Click on any project to see detailed information" 
            align="center" 
          />
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1C2E] via-[#070A14] to-[#111435] border border-white/10 transition-all duration-200 hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]"
            >
              <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center p-2 sm:p-3 lg:p-4">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={true}
                    className="object-contain p-1 sm:p-2 transition-transform duration-300 group-hover:scale-103"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
                <h3 className="font-display text-sm sm:text-base lg:text-lg text-white group-hover:text-accent-cyan transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/60 line-clamp-2 leading-relaxed hidden sm:block">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.stack.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 border border-white/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 2 && (
                    <span className="rounded-full bg-white/5 border border-white/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] text-white/70">
                      +{project.stack.length - 2}
                    </span>
                  )}
                </div>
                <div className="pt-1 sm:pt-2 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-accent-cyan font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">Details</span>
                  <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0F1C2E] via-[#070A14] to-[#111435] rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-3 sm:top-4 right-3 sm:right-4 float-right z-10 rounded-full bg-white/10 p-2 sm:p-2.5 text-white/70 transition-all hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Header */}
                <div className="space-y-3 sm:space-y-4 clear-both">
                  <span className="inline-block rounded-full bg-accent-cyan/20 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent-cyan">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">{selectedProject.title}</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Image */}
                {selectedProject.image && (
                  <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-contain p-2 sm:p-4"
                    />
                  </div>
                )}

                {/* Features */}
                {selectedProject.features && (
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Key Features</h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {selectedProject.features.map((feature) => (
                        <li key={feature} className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-white/70">
                          <span className="mt-1.5 sm:mt-2 h-1 w-1 sm:h-1.5 sm:w-1.5 flex-shrink-0 rounded-full bg-accent-cyan" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Technologies Used</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/10 border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/80 hover:bg-white/20 hover:border-accent-cyan/50 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                  {selectedProject.links.map((link) => {
                    if (!link.href || link.variant === "muted") {
                      return (
                        <span
                          key={link.label}
                          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white/50"
                        >
                          {link.label}
                        </span>
                      );
                    }

                    const isPrimary = link.variant === "primary";
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-all ${
                          isPrimary
                            ? "bg-accent-cyan/10 border border-accent-cyan/60 text-accent-cyan hover:bg-accent-cyan hover:text-white hover:shadow-[0_0_20px_rgba(45,212,191,0.5)]"
                            : "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40"
                        }`}
                      >
                        {link.icon === "Github" && <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                        {link.icon === "ArrowUpRight" && <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                        <span>{link.label}</span>
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
