import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center")}>
      <Badge variant="cyan" className={align === "center" ? "mx-auto" : undefined}>
        {eyebrow}
      </Badge>
      <div className="space-y-3">
        <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-white sm:text-4xl">{title}</h2>
        {description &&
          (typeof description === "string" ? (
            <p className="text-base text-white/70 sm:text-lg">{description}</p>
          ) : (
            description
          ))}
      </div>
    </div>
  );
}
