import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "pink" | "cyan";
  className?: string;
};

export default function Badge({ children, variant = "pink", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em]",
        variant === "pink" ? "border-accent-pink/60 text-accent-pink" : "border-accent-cyan/60 text-accent-cyan",
        className
      )}
    >
      {children}
    </span>
  );
}
