"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AppWindow, Database, MonitorSmartphone, ServerCog, Users, Workflow } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { services } from "@/lib/data";

const serviceIcons: Record<string, ReactNode> = {
  AppWindow: <AppWindow className="h-6 w-6" />,
  MonitorSmartphone: <MonitorSmartphone className="h-6 w-6" />,
  ServerCog: <ServerCog className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  Workflow: <Workflow className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />
};

export default function Services() {
  return (
    <motion.section
      id="services"
      className="section-padding space-y-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        eyebrow="Services"
        title="How I Can Help"
        description="Practical services for teams that need a reliable full-stack developer."
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="relative overflow-hidden border-white/5 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-pink/30 bg-accent-pink/10 text-accent-pink">
              {serviceIcons[service.icon]}
            </div>
            <h3 className="font-display text-2xl text-white">{service.title}</h3>
            <p className="mt-3 text-sm text-white/70">{service.description}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-accent-pink/40 via-transparent to-transparent" />
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
