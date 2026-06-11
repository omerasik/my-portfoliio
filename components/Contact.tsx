"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { contactDetails } from "@/lib/data";
import type { ContactDetail } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import type { ReactNode } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import MagneticButton from "@/components/ui/MagneticButton";

const ICONS: Record<ContactDetail["icon"], ReactNode> = {
  Mail: <Mail size={18} />,
  Phone: <Phone size={18} />,
  MapPin: null,
  Linkedin: <Linkedin size={18} />,
  Github: <Github size={18} />
};

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="section-padding relative">
      <SectionHeader index="06" eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.desc} />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="panel ticks relative overflow-hidden p-9 lg:col-span-3"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgb(var(--a1) / 0.4), transparent 70%)" }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-dim">{t.contact.ready}</p>
          <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {t.contact.heading1}
            <br />
            <span className="text-signal-animated">{t.contact.heading2}</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-dim sm:text-base">{t.contact.body}</p>
          <div className="mt-8">
            <MagneticButton href="mailto:omerfarukasik54@gmail.com" variant="primary">
              <Mail size={16} /> {t.contact.button}
            </MagneticButton>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          {contactDetails.map((detail, i) => (
            <motion.a
              key={detail.label}
              href={detail.href}
              target={detail.href.startsWith("http") ? "_blank" : undefined}
              rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="panel panel--quiet group flex items-center justify-between px-5 py-4 transition-all duration-300"
            >
              <span className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center border border-edge/20 bg-card/60 text-a1 transition-colors group-hover:text-a3">
                  {ICONS[detail.icon]}
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{detail.label}</span>
                  <span className="block text-sm font-medium text-ink">{detail.value}</span>
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-a1"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
