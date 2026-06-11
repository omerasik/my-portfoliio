"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgb(var(--a1)), rgb(var(--a2)), rgb(var(--a3)))",
        boxShadow: "0 0 12px rgb(var(--a2) / 0.8)"
      }}
    />
  );
}
