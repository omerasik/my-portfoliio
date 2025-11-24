"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

type SkillCategory =
  | "Languages"
  | "Frameworks & Backend"
  | "CMS & Backend Tools"
  | "Databases"
  | "Other Tools";

type SkillBadge = {
  name: string;
  category: SkillCategory;
  brandColor: string;
  asset: string;
  rimColor?: string;
};

const technologies: SkillBadge[] = [
  { name: "JavaScript", category: "Languages", brandColor: "#F7DF1E", asset: "/logos/javascript.svg" },
  { name: "TypeScript", category: "Languages", brandColor: "#3178C6", asset: "/logos/typescript.svg" },
  { name: "HTML5", category: "Languages", brandColor: "#E34F26", asset: "/logos/html5.svg" },
  { name: "CSS3", category: "Languages", brandColor: "#1572B6", asset: "/logos/css3.svg" },
  { name: "Python", category: "Languages", brandColor: "#3776AB", asset: "/logos/python.svg" },
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
  { name: "Craft CMS", category: "CMS & Backend Tools", brandColor: "#E5422B", asset: "/logos/craftcms.svg" },
  { name: "Strapi", category: "CMS & Backend Tools", brandColor: "#2F2E8B", asset: "/logos/strapi.svg" },
  { name: "Prisma ORM", category: "CMS & Backend Tools", brandColor: "#0C344B", asset: "/logos/prisma.svg" },
  { name: "Supabase", category: "CMS & Backend Tools", brandColor: "#3ECF8E", asset: "/logos/supabase.svg" },
  { name: "MySQL", category: "Databases", brandColor: "#00758F", asset: "/logos/mysql.svg" },
  { name: "PostgreSQL", category: "Databases", brandColor: "#336791", asset: "/logos/postgresql.svg" },
  { name: "MongoDB", category: "Databases", brandColor: "#47A248", asset: "/logos/mongodb.png" },
  { name: "Tailwind CSS", category: "Other Tools", brandColor: "#06B6D4", asset: "/logos/tailwindcss.svg" },
  { name: "Vite", category: "Other Tools", brandColor: "#646CFF", asset: "/logos/vite.svg" },
  { name: "n8n", category: "Other Tools", brandColor: "#F05A28", asset: "/logos/n8n.png" },
  { name: "Figma", category: "Other Tools", brandColor: "#F24E1E", asset: "/logos/figma.png" },
  { name: "Git", category: "Other Tools", brandColor: "#F05033", asset: "/logos/git.svg" },
  { name: "GitHub", category: "Other Tools", brandColor: "#ffffffff", rimColor: "#181717", asset: "/logos/github.png" },
  { name: "Docker", category: "Other Tools", brandColor: "#0DB7ED", asset: "/logos/docker.svg" }
];

const rgbaFromHex = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized.length === 3 ? sanitized.repeat(2) : sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="section-padding space-y-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <SectionHeader
        eyebrow="Skills"
        title="Professional Skills"
        description="Tools and technologies I use to design, build, and ship full-stack software."
        align="center"
      />

      {/* Grid layout matching other sections */}
      <div className="grid grid-cols-4 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {technologies.map((skill, index) => {
          const glow = rgbaFromHex(skill.rimColor ?? skill.brandColor, 0.3);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Card container */}
              <div
                className={cn(
                  "relative flex h-[140px] flex-col items-center justify-center overflow-hidden",
                  "rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.07] to-white/[0.02]",
                  "p-6 shadow-lg backdrop-blur-sm transition-all duration-300",
                  "hover:border-white/10 hover:shadow-xl"
                )}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${glow}, transparent 70%)`
                  }}
                />

                {/* Glass reflection */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  <Image
                    src={skill.asset}
                    alt={`${skill.name} logo`}
                    width={56}
                    height={56}
                    className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      skill.name === "GitHub" ? "h-16 w-16" : "h-14 w-14"
                    )}
                  />
                </div>

                {/* Skill name */}
                <p className="relative z-10 mt-4 text-center text-xs font-medium text-white/70 transition-colors duration-300 group-hover:text-white">
                  {skill.name}
                </p>

                {/* Color indicator dot */}
                <div
                  className="absolute bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: skill.brandColor }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
