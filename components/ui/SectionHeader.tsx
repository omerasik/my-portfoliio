import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-5", align === "center" && "text-center")}>
      {/* Eyebrow badge */}
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent-cyan" />
        <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-accent-cyan">
          {eyebrow}
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent-cyan" />
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h2
          className="font-display text-3xl font-black uppercase tracking-[0.15em] text-white sm:text-4xl"
          style={{
            textShadow: "0 0 40px rgba(255,255,255,0.1)"
          }}
        >
          {title}
        </h2>
        {description &&
          (typeof description === "string" ? (
            <p className="text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>
          ) : (
            description
          ))}
      </div>
    </div>
  );
}
