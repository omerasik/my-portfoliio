"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Languages, Rocket, Sparkles, Workflow } from "lucide-react";
import { languages, softSkills } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const pillars = [
  {
    icon: Rocket,
    title: "Ship fast",
    desc: "Ideas become working products. I prototype quickly and iterate until it's solid.",
    color: "cy"
  },
  {
    icon: Workflow,
    title: "Automate everything",
    desc: "If a task happens twice, I build a pipeline for it — from Power Automate flows to CI/CD.",
    color: "vi"
  },
  {
    icon: Bot,
    title: "AI-native",
    desc: "I build with AI, not just about it: agents that read, decide, and act on real business data.",
    color: "mg"
  }
] as const;

const colorMap = {
  cy: "text-cy border-cy/30 shadow-glow-cy",
  vi: "text-vi border-vi/30 shadow-glow-vi",
  mg: "text-mg border-mg/30 shadow-glow-mg"
};

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <SectionHeader
        index="01"
        eyebrow="About"
        title="Curious by default, builder by choice."
        description="Full-stack developer from Ghent, Belgium — currently interning at Astena, where I work on business automation and AI inside the Microsoft ecosystem. I love the moment a new technology clicks and becomes a tool I can build with."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -8 }}
            className="border-aurora group p-7 backdrop-blur"
          >
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border bg-card/60 transition-shadow duration-300 group-hover:shadow-none ${colorMap[p.color]}`}
            >
              <p.icon size={22} />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-7"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-cy opacity-60" />
              <span className="h-2.5 w-2.5 rounded-full bg-cy" />
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">Currently</p>
          </div>
          <p className="mt-4 text-lg font-semibold">
            Software Developer Intern <span className="text-aurora">@ Astena</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-dim">
            Business Central (AL) development, Power Apps &amp; Power Automate solutions,
            Azure DevOps pipelines — and an AI Mail Agent that automates real customer email workflows.
          </p>
          <div className="mt-5 flex items-center gap-2 text-dim">
            <Languages size={15} className="text-vi" />
            <span className="text-sm">{languages.join(" · ")}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-7"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-mg" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">Human skills</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {softSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 260 }}
                whileHover={{ scale: 1.08, rotate: i % 2 ? 2 : -2 }}
                className="rounded-full border border-edge/20 bg-card/50 px-4 py-1.5 text-sm text-dim transition-colors hover:border-cy/50 hover:text-ink"
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-dim">
            <Cpu size={15} className="text-cy" />
            <span className="text-sm">Always learning — currently deep in AI agents &amp; the Power Platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
