"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ index, eyebrow, title, description }: Props) {
  return (
    <div className="mb-14 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <span className="font-mono text-sm font-bold text-mg">{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-mg to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-dim">{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base leading-relaxed text-dim sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
