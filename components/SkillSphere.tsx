"use client";

import { useEffect, useRef } from "react";
import { skillCloud } from "@/lib/data";

type RGB = [number, number, number];

function readVar(name: string): RGB {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  return [parts[0] || 255, parts[1] || 255, parts[2] || 255];
}

/**
 * 3D rotating word sphere. No dependencies: Fibonacci sphere
 * distribution + perspective projection on a 2D canvas.
 * Auto-rotates, drag to spin, hover highlights the nearest skill.
 */
export default function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = skillCloud.length;

    // Fibonacci sphere
    const base = skillCloud.map((label, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { label, x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
    });

    let cA1 = readVar("--a1");
    let cA2 = readVar("--a2");
    let cInk = readVar("--ink");
    let cDim = readVar("--dim");
    const themeObserver = new MutationObserver(() => {
      cA1 = readVar("--a1");
      cA2 = readVar("--a2");
      cInk = readVar("--ink");
      cDim = readVar("--dim");
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Rotation state: auto + drag inertia
    let rotX = -0.25, rotY = 0;
    let velX = 0, velY = 0.0028;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let pointerX = -1e4, pointerY = -1e4;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.00035;
      velX = (e.clientY - lastY) * -0.00035;
      rotY += (e.clientX - lastX) * 0.005;
      rotX -= (e.clientY - lastY) * 0.005;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => { dragging = false; };
    const onLeave = () => { pointerX = -1e4; pointerY = -1e4; dragging = false; };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      if (!dragging && !reduced) {
        rotY += velY;
        rotX += velX;
        // ease velocity back to the idle spin
        velY += (0.0028 - velY) * 0.01;
        velX += (0 - velX) * 0.01;
      }

      ctx.clearRect(0, 0, W, H);

      const R = Math.min(W, H) * 0.36;
      const cx = W / 2;
      const cyc = H / 2;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      // project all, find hovered (nearest front-facing label to pointer)
      const proj = base.map((p) => {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const f = 2.2 / (2.2 + z);
        return { label: p.label, sx: cx + x * R * f, sy: cyc + y * R * f, z, f };
      });

      let hovered = -1;
      let best = 42 * 42;
      proj.forEach((p, i) => {
        if (p.z > 0.2) return;
        const dx = p.sx - pointerX;
        const dy = p.sy - pointerY;
        const d = dx * dx + dy * dy;
        if (d < best) { best = d; hovered = i; }
      });

      // faint connection lines from hovered node
      if (hovered >= 0) {
        const h = proj[hovered];
        ctx.lineWidth = 1;
        for (const p of proj) {
          if (p === h || p.z > 0.4) continue;
          const dx = p.sx - h.sx, dy = p.sy - h.sy;
          if (dx * dx + dy * dy < R * R * 0.55) {
            ctx.strokeStyle = `rgba(${cA1[0]},${cA1[1]},${cA1[2]},0.12)`;
            ctx.beginPath();
            ctx.moveTo(h.sx, h.sy);
            ctx.lineTo(p.sx, p.sy);
            ctx.stroke();
          }
        }
      }

      // draw labels back to front
      const order = proj.map((_, i) => i).sort((a, b) => proj[b].z - proj[a].z);
      for (const i of order) {
        const p = proj[i];
        const depth = (1 - p.z) / 2; // 0 back, 1 front
        const isHover = i === hovered;
        const size = (11 + depth * 7) * (isHover ? 1.45 : 1);
        ctx.font = `${isHover ? "700" : "500"} ${size}px var(--font-jetbrains), monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (isHover) {
          ctx.shadowBlur = 16;
          ctx.shadowColor = `rgb(${cA1[0]},${cA1[1]},${cA1[2]})`;
          ctx.fillStyle = `rgb(${cA1[0]},${cA1[1]},${cA1[2]})`;
          ctx.globalAlpha = 1;
        } else {
          const t = depth;
          const r = cDim[0] + (cInk[0] - cDim[0]) * t;
          const g = cDim[1] + (cInk[1] - cDim[1]) * t;
          const b = cDim[2] + (cInk[2] - cDim[2]) * t;
          ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
          ctx.globalAlpha = 0.25 + depth * 0.75;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(p.label, p.sx, p.sy);

        // small node dot under front labels
        if (depth > 0.55 && !isHover) {
          ctx.globalAlpha = 0.5 * depth;
          ctx.fillStyle = `rgb(${cA2[0]},${cA2[1]},${cA2[2]})`;
          ctx.fillRect(p.sx - 1, p.sy + size * 0.75, 2, 2);
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      themeObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="relative h-[420px] w-full sm:h-[480px]">
      <canvas ref={canvasRef} className="h-full w-full touch-none select-none" aria-hidden />
      {/* SEO / accessibility fallback */}
      <ul className="sr-only">
        {skillCloud.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
