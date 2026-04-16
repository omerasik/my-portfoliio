"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #6D28D9, #8B5CF6, #CCFF00)",
        boxShadow: "0 0 12px rgba(139,92,246,0.9), 0 0 24px rgba(204,255,0,0.4)"
      }}
    />
  );
}
