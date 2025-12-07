"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { education } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Education() {
  return (
    <motion.section
      id="education"
      className="section-padding space-y-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        eyebrow="Education"
        title="Learning Path"
        description="Formal studies that shaped my problem-solving mindset and full-stack toolkit."
      />
      <div className="relative pt-4">
        <div
          className="pointer-events-none absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-accent-pink via-accent-pink/80 to-accent-pink/40 md:left-1/2"
          aria-hidden
        />
        <ul className="space-y-12">
          {education.map((item, index) => (
            <li key={item.school} className="relative">
              <span
                className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent-pink bg-accent-pink shadow-lg shadow-accent-pink/50 md:left-1/2"
                aria-hidden
              />
              <div className={cn(
                "md:w-1/2",
                index % 2 === 0 ? "md:pr-8" : "md:ml-auto md:pl-8"
              )}>
                <Card className="relative bg-white/[0.03] border border-white/10 p-6 ml-12 md:ml-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-pink/30 bg-accent-pink/10">
                        <svg className="h-6 w-6 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-white">{item.school}</h3>
                        <p className="text-sm text-accent-pink uppercase tracking-[0.3em] font-medium">{item.program}</p>
                      </div>
                    </div>
                    <span className="text-sm text-white/60 font-medium">{item.period}</span>
                  </div>
                  <p className="text-white/80 leading-relaxed">{item.description}</p>
                </Card>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
