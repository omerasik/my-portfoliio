"use client";

import { motion } from "framer-motion";

const orbs = [
  { x: "10%",  y: "15%", size: 400, color: "rgba(109,40,217,0.18)",  dur: 22 },
  { x: "75%",  y: "5%",  size: 320, color: "rgba(204,255,0,0.07)",   dur: 18 },
  { x: "60%",  y: "65%", size: 360, color: "rgba(139,92,246,0.12)",  dur: 26 },
  { x: "5%",   y: "70%", size: 280, color: "rgba(0,212,170,0.07)",   dur: 30 },
];

const dots = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.8 + Math.random() * 1.8,
  dur: 2.5 + Math.random() * 5,
  delay: Math.random() * 6,
  color: i % 4 === 0 ? "#CCFF00" : i % 4 === 1 ? "#8B5CF6" : i % 4 === 2 ? "#00D4AA" : "rgba(255,255,255,0.5)"
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Ambient orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i} aria-hidden
          className="absolute rounded-full blur-[80px]"
          style={{ width: o.size, height: o.size, left: o.x, top: o.y, background: o.color }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Twinkling micro-particles */}
      {dots.map(d => (
        <motion.div
          key={d.id} aria-hidden
          className="absolute rounded-full"
          style={{ width: d.r * 2, height: d.r * 2, left: `${d.x}%`, top: `${d.y}%`, background: d.color,
            boxShadow: `0 0 ${d.r * 4}px ${d.color}` }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.3, 0.4] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Horizontal scan */}
      <motion.div aria-hidden
        className="absolute left-0 right-0 h-px opacity-15"
        style={{ background: "linear-gradient(90deg, transparent, #8B5CF6 30%, #CCFF00 70%, transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
