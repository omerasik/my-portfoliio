"use client";

import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  children: ReactNode;
};

export default function IconButton({ label, children, className, ...props }: IconButtonProps) {
  return (
    <motion.a
      {...props}
      aria-label={label}
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition",
        "hover:border-accent-pink hover:text-accent-pink",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}
