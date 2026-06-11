"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export default function MagneticButton({ href, children, variant = "primary", external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm transition-all duration-300 will-change-transform";

  const styles =
    variant === "primary"
      ? "text-bg bg-gradient-to-r from-cy via-vi to-mg bg-[length:200%_100%] bg-left hover:bg-right shadow-glow-vi hover:shadow-glow-mg"
      : "text-ink border border-edge/30 bg-card/40 backdrop-blur hover:border-cy/60 hover:shadow-glow-cy";

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
      style={{ transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s, background-position 0.5s, border-color 0.3s" }}
    >
      {children}
    </a>
  );
}
