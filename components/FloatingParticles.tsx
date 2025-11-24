"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  size: 160 + index * 25,
  delay: index * 0.4,
  gradient:
    index % 2 === 0
      ? "from-[rgba(77,233,255,0.25)] via-transparent to-transparent"
      : "from-[rgba(255,114,210,0.25)] via-transparent to-transparent"
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          aria-hidden
          className={`absolute rounded-full blur-3xl bg-gradient-to-br ${particle.gradient}`}
          style={{
            width: particle.size,
            height: particle.size,
            top: `${5 + particle.id * 10}%`,
            left: `${(particle.id * 13) % 90}%`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.25, 0.55, 0.35],
            y: [0, -20, 10],
            x: [0, 10, -10],
            scale: [0.9, 1.05, 0.95]
          }}
          transition={{
            duration: 18 + particle.id * 1.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

