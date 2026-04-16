"use client";

import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0;
    const dot = dotRef.current;
    const ring = cursorRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const loop = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      ring.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`;
      requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-accent-violet/50 mix-blend-screen" />
      <div ref={dotRef}    className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent-lime"
        style={{ boxShadow: "0 0 10px #CCFF00, 0 0 20px rgba(204,255,0,0.5)" }} />
    </>
  );
}
