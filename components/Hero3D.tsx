"use client";

import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };
type RGB = [number, number, number];

function readVar(name: string): RGB {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  return [parts[0] || 255, parts[1] || 255, parts[2] || 255];
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = 360;
    const R = 1.55;
    const r = 0.62;
    const points: Vec3[] = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      const cq = Math.cos(3 * t);
      const w = R + r * cq;
      points.push({
        x: w * Math.cos(2 * t),
        y: w * Math.sin(2 * t),
        z: r * Math.sin(3 * t)
      });
    }

    const edges: [number, number][] = [];
    const threshold = 0.55;
    for (let i = 0; i < N; i++) {
      edges.push([i, (i + 1) % N]);
      for (let j = i + 2; j < Math.min(i + 40, N); j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) edges.push([i, j]);
      }
    }

    const STARS = 90;
    const stars = Array.from({ length: STARS }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      tw: Math.random() * Math.PI * 2
    }));

    let cCy = readVar("--cy");
    let cVi = readVar("--vi");
    let cMg = readVar("--mg");
    let glowStrength = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--glow-strength")
    ) || 1;

    const themeObserver = new MutationObserver(() => {
      cCy = readVar("--cy");
      cVi = readVar("--vi");
      cMg = readVar("--mg");
      glowStrength = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--glow-strength")
      ) || 1;
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

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMouse = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    const proj = (p: Vec3, rx: number, ry: number, scale: number) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      let x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      let y = p.y * cosX - z * sinX;
      z = p.y * sinX + z * cosX;
      const fov = 4.2;
      const f = fov / (fov + z);
      return { sx: W / 2 + x * scale * f, sy: H / 2 + y * scale * f, z, f };
    };

    let raf = 0;
    let time = 0;
    const projected = new Array(N);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      time += reduced ? 0 : 0.0035;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 2.2 + s.tw));
        const px = (s.x * W + mx * -18 * s.z + W) % W;
        const py = (s.y * H + my * -12 * s.z + H) % H;
        ctx.globalAlpha = 0.35 * tw * s.z * glowStrength;
        ctx.fillStyle = `rgb(${cCy[0]},${cCy[1]},${cCy[2]})`;
        ctx.fillRect(px, py, s.z * 1.8, s.z * 1.8);
      }

      const ry = time + mx * 0.5;
      const rx = 0.45 + Math.sin(time * 0.6) * 0.12 + my * 0.35;
      const scale = Math.min(W, H) * 0.19;

      for (let i = 0; i < N; i++) projected[i] = proj(points[i], rx, ry, scale);

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = projected[a], pb = projected[b];
        const depth = ((pa.z + pb.z) / 2 + 2.4) / 4.8;
        const alpha = (1 - depth) * 0.34 * glowStrength + 0.03;
        const col = mix(cCy, mix(cVi, cMg, depth), 0.4 + depth * 0.5);
        ctx.strokeStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const p = projected[i];
        const depth = (p.z + 2.4) / 4.8;
        const near = 1 - depth;
        const size = 1 + near * 2.4;
        const col = mix(cCy, mix(cVi, cMg, depth), depth);
        ctx.globalAlpha = 0.25 + near * 0.75;
        ctx.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();

        const pulse = (i / N + (time * 0.9) % 1) % 1;
        if (pulse < 0.012) {
          ctx.globalAlpha = 0.9 * glowStrength;
          ctx.shadowBlur = 14;
          ctx.shadowColor = `rgb(${cCy[0]},${cCy[1]},${cCy[2]})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size + 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalAlpha = 1;
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      themeObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
