"use client";

import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = -100, my = -100, cx = -100, cy = -100;
    let raf = 0;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      const target = e.target as HTMLElement;
      const interactive = !!target.closest("a, button, [role='button']");
      ring.style.width = interactive ? "52px" : "36px";
      ring.style.height = interactive ? "52px" : "36px";
      ring.style.borderColor = interactive ? "rgb(var(--a3) / 0.8)" : "rgb(var(--a1) / 0.5)";
    };

    const loop = () => {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      const size = parseFloat(ring.style.width || "36");
      ring.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden lg:block" aria-hidden>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border"
        style={{
          borderColor: "rgb(var(--a1) / 0.5)",
          transition: "width 0.25s, height 0.25s, border-color 0.25s"
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{
          background: "rgb(var(--a1))",
          boxShadow: "0 0 10px rgb(var(--a1)), 0 0 22px rgb(var(--a1) / 0.5)"
        }}
      />
    </div>
  );
}
