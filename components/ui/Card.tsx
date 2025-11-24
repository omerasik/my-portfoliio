"use client";

import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export default function Card({ className, children, glow = true, ...props }: CardProps) {
  return (
    <motion.div
      {...props}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur-xl transition duration-300",
        glow && "hover:border-accent-pink/60",
        className
      )}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-1 rounded-[1rem] opacity-0 blur-3xl transition duration-500 group-hover:opacity-40"
          style={{ background: "radial-gradient(circle at 20% 20%, rgba(255, 0, 127, 0.28), transparent 55%)" }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
