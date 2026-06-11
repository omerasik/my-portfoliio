"use client";

import { motion } from "framer-motion";
import {
  AppWindow, Database, MonitorSmartphone, ServerCog, Users, Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS: Record<string, LucideIcon> = {
  AppWindow, MonitorSmartphone, ServerCog, Database, Workflow, Users
};

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <SectionHeader
        index="04"
        eyebrow="What I do"
        title="From idea to running product."
      />

      <div className="grid gap-px overflow-hidden rounded-3xl border border-edge/15 bg-edge/10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = ICONS[service.icon] ?? AppWindow;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-card/80"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 30% 20%, rgb(var(--vi) / 0.12), transparent 60%)" }}
              />
              <span className="font-mono text-xs text-mg">0{i + 1}</span>
              <Icon size={24} className="mt-4 text-cy transition-transform duration-500 group-hover:scale-110 group-hover:text-vi" />
              <h3 className="mt-4 font-display text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
