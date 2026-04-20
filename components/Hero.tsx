"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDownRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { socialLinks } from "@/lib/data";
import type { SocialLink } from "@/lib/data";
import type { ReactNode } from "react";

/* ──────────────── Typing line ───────────────── */
const roles = ["Full-Stack Developer", "Problem Solver", "AI Builder", "Open Source Builder"];

function TypingRole() {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState("");
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text.length < cur.length)       t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 55);
    else if (!del && text.length === cur.length) t = setTimeout(() => setDel(true), 1800);
    else if (del && text.length > 0)             t = setTimeout(() => setText(text.slice(0, -1)), 30);
    else { setDel(false); setIdx(p => (p + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span className="font-mono text-accent-violet text-base sm:text-lg tracking-wide">
      {text}<span className="animate-pulse text-accent-lime">_</span>
    </span>
  );
}

/* ──────────────── 3D Icosahedron via Canvas ───────────────── */
function HeroCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef({
    mouseX: 0, mouseY: 0,        // normalized -0.5 to 0.5
    isHover: false,
    explode: 0,                   // 0 = normal, 1 = fully exploded
    hoverGlow: 0,                 // ambient glow intensity
    rotX: 0, rotY: 0,
    time: 0, orbitAngle: 0,
  });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 380;
    canvas.width  = SIZE;
    canvas.height = SIZE;

    // ── Icosahedron vertices ──
    // BASE_R=78, max explode=18 → max R=96. FOV=460, z-offset=400:
    // worst projected x = 96*460/(0+400) = 110.4px < 190 (half of 380). Safe!
    const φ = (1 + Math.sqrt(5)) / 2;
    const BASE_R = 78;
    const norm = (v: number[], r: number) => {
      const l = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
      return v.map(c => c / l * r);
    };
    const rawBase: number[][] = [
      [-1, φ, 0], [1, φ, 0], [-1, -φ, 0], [1, -φ, 0],
      [0, -1, φ], [0, 1, φ], [0, -1, -φ], [0, 1, -φ],
      [φ, 0, -1], [φ, 0, 1], [-φ, 0, -1], [-φ, 0, 1],
    ];

    const edges: [number, number][] = [
      [0,1],[0,5],[0,7],[0,10],[0,11],
      [1,5],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,6],[2,10],[2,11],
      [3,4],[3,6],[3,8],[3,9],
      [4,5],[4,9],[4,11],
      [5,9],[5,11],
      [6,7],[6,8],[6,10],
      [7,8],[7,10],
      [8,9],[10,11],
    ];

    const rotateX = (v: number[], a: number) => [
      v[0],
      v[1] * Math.cos(a) - v[2] * Math.sin(a),
      v[1] * Math.sin(a) + v[2] * Math.cos(a),
    ];
    const rotateY = (v: number[], a: number) => [
      v[0] * Math.cos(a) + v[2] * Math.sin(a),
      v[1],
      -v[0] * Math.sin(a) + v[2] * Math.cos(a),
    ];
    const project = (v: number[], cx: number, cy: number) => {
      const fov = 460;
      const z   = v[2] + 400;
      return { x: cx + (v[0] * fov) / z, y: cy + (v[1] * fov) / z, z: v[2] };
    };

    // ── Events ──
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseX = (e.clientX - rect.left - SIZE / 2) / SIZE;
      stateRef.current.mouseY = (e.clientY - rect.top  - SIZE / 2) / SIZE;
    };
    const onEnter = () => { stateRef.current.isHover = true; };
    const onLeave = () => { stateRef.current.isHover = false; };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, SIZE, SIZE);
      // Safety clip — nothing can render outside canvas bounds
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, SIZE, SIZE);
      ctx.clip();
      const cx = SIZE / 2;
      const cy = SIZE / 2;

      s.time        += 0.006;
      s.orbitAngle  += 0.009;

      // ── Smooth state transitions ──
      const targetExplode = s.isHover ? 1 : 0;
      s.explode    = lerp(s.explode, targetExplode, 0.04);
      s.hoverGlow  = lerp(s.hoverGlow, s.isHover ? 1 : 0, 0.05);

      // Mouse-driven rotation with extra speed on hover
      const rotSpeed = s.isHover ? 0.08 : 0.05;
      s.rotX = lerp(s.rotX, s.mouseY * 0.6 + s.time * 0.18, rotSpeed);
      s.rotY = lerp(s.rotY, s.mouseX * 0.6 + s.time * 0.12, rotSpeed);

      // ── Scale: explode outward on hover ──
      const explodedR = BASE_R + s.explode * 18;
      const verts = rawBase.map(v => norm(v, explodedR));

      const transformed = verts.map(v => {
        let r = rotateX(v, s.rotX);
        r     = rotateY(r, s.rotY);
        return r;
      });

      // ── Ambient glow (brighter on hover) ──
      const glowAlpha = 0.10 + s.hoverGlow * 0.25;
      const glowR     = 130 + s.hoverGlow * 30; // max 160px — well within 190px half
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0, `rgba(139,92,246,${glowAlpha.toFixed(2)})`);
      grd.addColorStop(0.5, `rgba(0,212,170,${(glowAlpha * 0.4).toFixed(2)})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // ── Cursor-proximity color for edges ──
      // Map mouse to canvas coords
      const mCanvasX = cx + s.mouseX * SIZE;
      const mCanvasY = cy + s.mouseY * SIZE;

      edges.forEach(([a, b]) => {
        const pa = project(transformed[a], cx, cy);
        const pb = project(transformed[b], cx, cy);
        const depth = (pa.z + pb.z) / 2;
        const baseAlpha = 0.08 + ((depth + explodedR) / (2 * explodedR)) * 0.35;

        // Distance from edge midpoint to cursor
        const midX = (pa.x + pb.x) / 2;
        const midY = (pa.y + pb.y) / 2;
        const dist  = Math.sqrt((midX - mCanvasX) ** 2 + (midY - mCanvasY) ** 2);
        const proximity = s.isHover ? Math.max(0, 1 - dist / 130) : 0;

        // Interpolate color: violet → lime on proximity
        const vR = 139, vG = 92,  vB = 246;
        const lR = 204, lG = 255, lB = 0;
        const cr = Math.round(lerp(vR, lR, proximity));
        const cg = Math.round(lerp(vG, lG, proximity));
        const cb = Math.round(lerp(vB, lB, proximity));
        const alpha = baseAlpha + proximity * 0.6;
        const width  = 0.8 + proximity * 1.8;

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(2)})`;
        ctx.lineWidth   = width;
        ctx.stroke();

        // Bright glow duplicate on highly-proximate edges
        if (proximity > 0.4) {
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(proximity * 0.25).toFixed(2)})`;
          ctx.lineWidth   = width * 5;
          ctx.stroke();
        }
      });

      // ── Vertices ──
      transformed.forEach(v => {
        const p  = project(v, cx, cy);
        const depth = (v[2] + explodedR) / (2 * explodedR);
        const dist = Math.sqrt((p.x - mCanvasX) ** 2 + (p.y - mCanvasY) ** 2);
        const prox = s.isHover ? Math.max(0, 1 - dist / 80) : 0;

        const alpha = 0.3 + depth * 0.7 + prox * 0.3;
        const size  = 1.5 + depth * 2.5 + prox * 3 + s.explode * 1.5;

        // Color mix: lime → white near cursor
        const dotR = Math.round(lerp(204, 255, prox));
        const dotG = Math.round(lerp(255, 255, prox));
        const dotB = Math.round(lerp(0,   255, prox));

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotR},${dotG},${dotB},${(alpha * 0.9).toFixed(2)})`;
        ctx.fill();

        // Halo — kept tight so it doesn't hard-clip at canvas edge
        const haloSize = size * (3 + prox * 1.5);
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloSize);
        halo.addColorStop(0, `rgba(${dotR},${dotG},${dotB},${(alpha * 0.35).toFixed(2)})`);
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloSize, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      });

      // ── Outer orbit ring — max 148+6=154px, well within 190px half ──
      const ORBIT_PTS = 6;
      const ORBIT_R   = 148 + s.explode * 6;
      const ellipseY  = 0.36;

      for (let i = 0; i < ORBIT_PTS; i++) {
        const a   = s.orbitAngle + (i / ORBIT_PTS) * Math.PI * 2;
        const ox  = cx + Math.cos(a) * ORBIT_R;
        const oy  = cy + Math.sin(a) * ORBIT_R * ellipseY;
        const bright = 0.5 + 0.5 * Math.sin(a + s.time);
        const col = i % 2 === 0 ? [139, 92, 246] : [0, 212, 170];
        const dotAlpha = bright * (0.6 + s.hoverGlow * 0.4);

        ctx.beginPath();
        ctx.arc(ox, oy, 2.5 + s.hoverGlow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${dotAlpha.toFixed(2)})`;
        ctx.fill();

        const h2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, 10 + s.hoverGlow * 4);
        h2.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${(dotAlpha * 0.4).toFixed(2)})`);
        h2.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(ox, oy, 10 + s.hoverGlow * 4, 0, Math.PI * 2);
        ctx.fillStyle = h2;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.ellipse(cx, cy, ORBIT_R, ORBIT_R * ellipseY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${(0.04 + s.hoverGlow * 0.06).toFixed(2)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Inner ring ──
      const INNER_R = 108 + s.explode * 5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, INNER_R, INNER_R * 0.28, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139,92,246,${(0.08 + s.hoverGlow * 0.12).toFixed(2)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      const innerA = -s.orbitAngle * 1.6;
      const lix = cx + Math.cos(innerA) * INNER_R;
      const liy = cy + Math.sin(innerA) * INNER_R * 0.28;
      ctx.beginPath();
      ctx.arc(lix, liy, 2 + s.hoverGlow, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(204,255,0,${(0.9 + s.hoverGlow * 0.1).toFixed(2)})`;
      ctx.fill();
      const liHalo = ctx.createRadialGradient(lix, liy, 0, lix, liy, 8 + s.hoverGlow * 5);
      liHalo.addColorStop(0, `rgba(204,255,0,${(0.3 + s.hoverGlow * 0.2).toFixed(2)})`);
      liHalo.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(lix, liy, 8 + s.hoverGlow * 5, 0, Math.PI * 2);
      ctx.fillStyle = liHalo;
      ctx.fill();

      ctx.restore(); // release clip
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ width: 380, height: 380 }}>
      {/* Soft background pulse */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.4) 0%, transparent 65%)" }}
      />
      <canvas ref={canvasRef} style={{ display: "block", cursor: "crosshair", maxWidth: "100%" }} />
      {/* Reflection shadow */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-xl pointer-events-none"
        animate={{ opacity: [0.15, 0.35, 0.15], scaleX: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 180, height: 14, background: "rgba(139,92,246,0.6)" }}
      />
    </div>
  );
}

/* ──────────────── Social icons ───────────────── */
const ICONS: Record<SocialLink["icon"], ReactNode> = {
  Github:   <Github className="h-4 w-4" />,
  Linkedin: <Linkedin className="h-4 w-4" />,
  Mail:     <Mail className="h-4 w-4" />,
};

/* ──────────────── HERO ───────────────── */
export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center pt-28 pb-20 overflow-hidden">

      {/* Top availability tag */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-3"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-lime/80">
          Available for Work &amp; Collaborations — Ghent, BE
        </span>
      </motion.div>

      {/* Main layout */}
      <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-center">

        {/* ── Left: Text ── */}
        <div className="space-y-8">
          {/* Giant name */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-black leading-[0.9] tracking-tight text-ink">
              <span className="block text-[clamp(4rem,12vw,9rem)]">OMER</span>
              <span
                className="block text-[clamp(4rem,12vw,9rem)]"
                style={{
                  WebkitTextStroke: "2px rgba(139,92,246,0.8)",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(139,92,246,0.4))"
                }}
              >
                ASIK
              </span>
            </h1>
          </motion.div>

          {/* Role + typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-accent-violet" />
            <TypingRole />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            I build modern, scalable applications and turn complex problems into
            elegant, practical solutions. Passionate about automation, AI agents,
            and the intersection between design and engineering.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-violet px-7 py-3.5 font-display font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-violet"
            >
              See My Work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent-violet/40 px-7 py-3.5 font-display font-semibold text-ink/80 transition-all duration-300 hover:border-accent-violet hover:text-white hover:bg-accent-violet/10"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 pt-2"
          >
            {socialLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-ink/50 transition-all hover:border-accent-violet/50 hover:bg-accent-violet/10 hover:text-accent-violet"
              >
                {ICONS[l.icon]}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Canvas 3D ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center overflow-hidden -mt-12"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/25">SCROLL</span>
        <motion.div
          className="h-10 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.7), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
