"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { contactDetails } from "@/lib/data";
import type { ContactDetail } from "@/lib/data";
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
  return (
    <section id="contact" className="section-padding relative">
      <SectionHeader
        index="06"
        eyebrow="Contact"
        title="Let's build something together."
        description="Open to junior roles, freelance projects, and conversations about automation & AI. My inbox is the fastest route — an AI agent doesn't answer it yet, I still do."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="border-aurora relative overflow-hidden p-9 backdrop-blur lg:col-span-3"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgb(var(--vi) / 0.5), transparent 70%)" }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-dim">Ready when you are</p>
          <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Have an idea?
            <br />
            <span className="text-aurora-animated">Let&apos;s automate it.</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-dim sm:text-base">
            Whether it&apos;s a web app, a business workflow, or an AI agent — I&apos;d love to hear
            about it and figure out how to build it.
          </p>
          <div className="mt-8">
            <MagneticButton href="mailto:omerfarukasik54@gmail.com" variant="primary">
              <Mail size={16} /> Say hello
            </MagneticButton>
          </div>
        </motion.div>

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
              className="glass group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 hover:border-cy/40 hover:shadow-glow-cy"
            >
              <span className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge/20 bg-card/60 text-cy transition-colors group-hover:text-mg">
                  {ICONS[detail.icon]}
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    {detail.label}
                  </span>
                  <span className="block text-sm font-medium text-ink">{detail.value}</span>
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cy"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
