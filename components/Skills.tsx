"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SkillCategory = "Languages" | "Frameworks & Backend" | "Platforms & Tools";
type SkillBadge = { name: string; category: SkillCategory; brandColor: string; asset: string; };

const technologies: SkillBadge[] = [
  { name: "JavaScript",  category: "Languages",              brandColor: "#F7DF1E", asset: "/logos/javascript.svg" },
  { name: "TypeScript",  category: "Languages",              brandColor: "#3178C6", asset: "/logos/typescript.svg" },
  { name: "PHP",         category: "Languages",              brandColor: "#777BB4", asset: "/logos/php.png" },
  { name: "Python",      category: "Languages",              brandColor: "#3776AB", asset: "/logos/python.svg" },
  { name: "HTML5",       category: "Languages",              brandColor: "#E34F26", asset: "/logos/html5.svg" },
  { name: "CSS3",        category: "Languages",              brandColor: "#1572B6", asset: "/logos/css3.svg" },
  { name: "React",       category: "Frameworks & Backend",   brandColor: "#61DAFB", asset: "/logos/react.svg" },
  { name: "Next.js",     category: "Frameworks & Backend",   brandColor: "#ffffff", asset: "/logos/nextdotjs.svg" },
  { name: "Node.js",     category: "Frameworks & Backend",   brandColor: "#3C873A", asset: "/logos/nodedotjs.svg" },
  { name: "Express",     category: "Frameworks & Backend",   brandColor: "#ffffff", asset: "/logos/express.svg" },
  { name: "Laravel",     category: "Frameworks & Backend",   brandColor: "#F9322C", asset: "/logos/laravel.svg" },
  { name: "MySQL",       category: "Frameworks & Backend",   brandColor: "#00758F", asset: "/logos/mysql.svg" },
  { name: "PostgreSQL",  category: "Frameworks & Backend",   brandColor: "#336791", asset: "/logos/postgresql.svg" },
  { name: "Craft CMS",   category: "Platforms & Tools",      brandColor: "#E5422B", asset: "/logos/craftcms.svg" },
  { name: "Strapi",      category: "Platforms & Tools",      brandColor: "#2F2E8B", asset: "/logos/strapi.svg" },
  { name: "Prisma",      category: "Platforms & Tools",      brandColor: "#0C344B", asset: "/logos/prisma.svg" },
  { name: "Supabase",    category: "Platforms & Tools",      brandColor: "#3ECF8E", asset: "/logos/supabase.svg" },
  { name: "Tailwind",    category: "Platforms & Tools",      brandColor: "#06B6D4", asset: "/logos/tailwindcss.svg" },
  { name: "Vite",        category: "Platforms & Tools",      brandColor: "#646CFF", asset: "/logos/vite.svg" },
  { name: "n8n",         category: "Platforms & Tools",      brandColor: "#F05A28", asset: "/logos/n8n.png" },
  { name: "Figma",       category: "Platforms & Tools",      brandColor: "#F24E1E", asset: "/logos/figma_logo.png" },
  { name: "Git",         category: "Platforms & Tools",      brandColor: "#F05033", asset: "/logos/git.svg" },
  { name: "Docker",      category: "Platforms & Tools",      brandColor: "#0DB7ED", asset: "/logos/docker.svg" },
];

const categories: SkillCategory[] = ["Languages", "Frameworks & Backend", "Platforms & Tools"];
const catLabels: Record<SkillCategory, string> = {
  "Languages":            "CORE LANGUAGES",
  "Frameworks & Backend": "FRAMEWORKS & DATABASES",
  "Platforms & Tools":    "TOOLS & PLATFORMS",
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      {/* Section tag */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mb-16 flex items-center gap-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-violet">003 — Skills</span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/30 to-transparent" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-16 font-display text-5xl font-black leading-none tracking-tight sm:text-6xl"
      >
        TECH <span className="text-gradient-vt">STACK</span>
      </motion.h2>

      <div className="space-y-14">
        {categories.map((cat, ci) => {
          const skills = technologies.filter(s => s.category === cat);
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
              className="space-y-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/30">{catLabels[cat]}</p>

              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.08, y: -4, boxShadow: `0 8px 25px -8px ${s.brandColor}40` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/6 bg-surface/50 px-4 py-2.5 backdrop-blur-sm transition-colors duration-200 hover:border-white/14"
                  >
                    {/* Brand color glow layer */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle at 30% 50%, ${s.brandColor}20, transparent 65%)` }}
                    />
                    {/* Bottom accent bar */}
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: `linear-gradient(90deg, ${s.brandColor}, transparent)` }}
                    />
                    <Image src={s.asset} alt={s.name} width={18} height={18} className="h-[18px] w-[18px] flex-shrink-0 object-contain transition-transform duration-200 group-hover:scale-125" />
                    <span className="relative font-mono text-xs text-ink/70 transition-colors group-hover:text-ink/95 whitespace-nowrap">
                      {s.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
