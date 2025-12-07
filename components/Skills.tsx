"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

type SkillCategory =
  | "Languages"
  | "Frameworks & Backend"
  | "Platforms & Tools";

type SkillBadge = {
  name: string;
  category: SkillCategory;
  brandColor: string;
  asset: string;
  rimColor?: string;
};

const technologies: SkillBadge[] = [
  // Languages
  { name: "JavaScript", category: "Languages", brandColor: "#F7DF1E", asset: "/logos/javascript.svg" },
  { name: "TypeScript", category: "Languages", brandColor: "#3178C6", asset: "/logos/typescript.svg" },
  { name: "PHP", category: "Languages", brandColor: "#777BB4", asset: "/logos/php.png" },
  { name: "Python", category: "Languages", brandColor: "#3776AB", asset: "/logos/python.svg" },
  { name: "HTML5", category: "Languages", brandColor: "#E34F26", asset: "/logos/html5.svg" },
  { name: "CSS3", category: "Languages", brandColor: "#1572B6", asset: "/logos/css3.svg" },
  
  // Frameworks & Backend
  { name: "React Native", category: "Frameworks & Backend", brandColor: "#61DAFB", asset: "/logos/react.svg" },
  {
    name: "Next.js",
    category: "Frameworks & Backend",
    brandColor: "#000000",
    rimColor: "#2E2E2E",
    asset: "/logos/nextdotjs.svg"
  },
  { name: "Node.js", category: "Frameworks & Backend", brandColor: "#3C873A", asset: "/logos/nodedotjs.svg" },
  { name: "Express.js", category: "Frameworks & Backend", brandColor: "#FFFFFF", asset: "/logos/express.svg" },
  { name: "Laravel", category: "Frameworks & Backend", brandColor: "#F9322C", asset: "/logos/laravel.svg" },
  { name: "MySQL", category: "Frameworks & Backend", brandColor: "#00758F", asset: "/logos/mysql.svg" },
  { name: "PostgreSQL", category: "Frameworks & Backend", brandColor: "#336791", asset: "/logos/postgresql.svg" },
  
  // Platforms & Tools
  { name: "Craft CMS", category: "Platforms & Tools", brandColor: "#E5422B", asset: "/logos/craftcms.svg" },
  { name: "Strapi", category: "Platforms & Tools", brandColor: "#2F2E8B", asset: "/logos/strapi.svg" },
  { name: "Prisma ORM", category: "Platforms & Tools", brandColor: "#0C344B", asset: "/logos/prisma.svg" },
  { name: "Supabase", category: "Platforms & Tools", brandColor: "#3ECF8E", asset: "/logos/supabase.svg" },
  { name: "Tailwind CSS", category: "Platforms & Tools", brandColor: "#06B6D4", asset: "/logos/tailwindcss.svg" },
  { name: "Vite", category: "Platforms & Tools", brandColor: "#646CFF", asset: "/logos/vite.svg" },
  { name: "n8n", category: "Platforms & Tools", brandColor: "#F05A28", asset: "/logos/n8n.png" },
  { name: "Figma", category: "Platforms & Tools", brandColor: "#F24E1E", asset: "/logos/figma_logo.png" },
  { name: "Git", category: "Platforms & Tools", brandColor: "#F05033", asset: "/logos/git.svg" },
  { name: "GitHub", category: "Platforms & Tools", brandColor: "#ffffffff", rimColor: "#181717", asset: "/logos/github.png" },
  { name: "Docker", category: "Platforms & Tools", brandColor: "#0DB7ED", asset: "/logos/docker.svg" }
];

const rgbaFromHex = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized.length === 3 ? sanitized.repeat(2) : sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const categoryLabels: Record<SkillCategory, string> = {
  "Languages": "CORE LANGUAGES",
  "Frameworks & Backend": "FRAMEWORKS & DATABASES",
  "Platforms & Tools": "DEVELOPMENT TOOLS"
};

const categoryDescriptions: Record<SkillCategory, string> = {
  "Languages": "Programming languages I work with daily",
  "Frameworks & Backend": "Full-stack frameworks and database systems",
  "Platforms & Tools": "Essential tools for modern development"
};

export default function Skills() {
  const categories: SkillCategory[] = ["Languages", "Frameworks & Backend", "Platforms & Tools"];

  return (
    <motion.section
      id="skills"
      className="section-padding space-y-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        eyebrow="Skills"
        title="Tech Stack"
        description="Tools and technologies I use to design, build, and ship full-stack software."
        align="center"
      />

      {/* Categories */}
      <div className="space-y-12">
        {categories.map((category, categoryIndex) => {
          const categorySkills = technologies.filter(skill => skill.category === category);
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
                  {categoryLabels[category]}
                </h3>
                <p className="text-sm text-white/50">{categoryDescriptions[category]}</p>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill, index) => {
                  const glow = rgbaFromHex(skill.rimColor ?? skill.brandColor, 0.3);

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                      className="group relative"
                    >
                      {/* Skill Badge */}
                      <div
                        className={cn(
                          "relative flex items-center gap-3 overflow-hidden",
                          "rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
                          "px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300",
                          "hover:border-white/20 hover:shadow-xl"
                        )}
                      >
                        {/* Glow effect on hover */}
                        <motion.div
                          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${glow}, transparent 70%)`
                          }}
                        />

                        {/* Glass reflection */}
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

                        {/* Icon */}
                        <div className="relative z-10 flex items-center justify-center">
                          <Image
                            src={skill.asset}
                            alt={`${skill.name} logo`}
                            width={24}
                            height={24}
                            className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* Skill name */}
                        <span className="relative z-10 text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white whitespace-nowrap">
                          {skill.name}
                        </span>

                        {/* Color indicator */}
                        <div
                          className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ backgroundColor: skill.brandColor }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
