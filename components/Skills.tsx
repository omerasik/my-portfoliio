"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow, Atom, Blocks, Bot, Box, Braces, Building2, Code, Database,
  GitBranch, Infinity as InfinityIcon, Layout, Palette, Server, Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { technicalSkills } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS: Record<string, LucideIcon> = {
  Code, Atom, Layout, Palette, Server, Braces, Database, Box, Blocks,
  GitBranch, Building2, AppWindow, Workflow, Bot, Infinity: InfinityIcon
};

const categories = ["All", "Automation & AI", "Frontend", "Backend", "Tools"] as const;

const categoryAccent: Record<string, string> = {
  "Frontend": "cy",
  "Backend": "vi",
  "Automation & AI": "mg",
  "Tools": "cy"
};

export default function Skills() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const visible =
    filter === "All" ? technicalSkills : technicalSkills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="section-padding relative">
      <SectionHeader
        index="03"
        eyebrow="Skills"
        title="My toolkit, always expanding."
        description="From modern web stacks to the Microsoft Power Platform and AI agents — I pick the right tool and learn the missing ones."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? "text-bg"
                : "border border-edge/20 bg-card/40 text-dim hover:border-cy/40 hover:text-ink"
            }`}
          >
            {filter === cat && (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cy via-vi to-mg"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            )}
            <span className="relative">{cat}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((skill, i) => {
            const Icon = ICONS[skill.icon] ?? Code;
            const accent = categoryAccent[skill.category] ?? "cy";
            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -6 }}
                className="border-aurora group p-6 backdrop-blur"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-card/60 transition-all duration-300 ${
                      accent === "mg"
                        ? "border-mg/30 text-mg group-hover:shadow-glow-mg"
                        : accent === "vi"
                        ? "border-vi/30 text-vi group-hover:shadow-glow-vi"
                        : "border-cy/30 text-cy group-hover:shadow-glow-cy"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    {skill.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{skill.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-dim">{skill.description}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
