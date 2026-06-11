"use client";

import { motion } from "framer-motion";
import { Bot, Layers, Users, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS: LucideIcon[] = [Layers, Workflow, Bot, Users];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="section-padding relative">
      <SectionHeader index="04" eyebrow={t.services.eyebrow} title={t.services.title} />

      <div className="grid gap-px border border-edge/15 bg-edge/10 sm:grid-cols-2">
        {t.services.items.map((service, i) => {
          const Icon = ICONS[i] ?? Layers;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-card/80"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 30% 20%, rgb(var(--a1) / 0.1), transparent 60%)" }}
              />
              <span className="font-mono text-xs text-a1">0{i + 1}</span>
              <Icon size={24} className="mt-4 text-a2 transition-transform duration-500 group-hover:scale-110 group-hover:text-a1" />
              <h3 className="mt-4 font-display text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{service.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
