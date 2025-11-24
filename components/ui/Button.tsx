"use client";

import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  href?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const baseStyles =
  "relative inline-flex items-center justify-center rounded-full font-medium tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-gradient-to-r from-accent-pink to-accent-magenta text-white shadow-glow hover:shadow-cyan",
  secondary: "bg-white/10 text-white border border-white/15 backdrop-blur hover:text-accent-cyan",
  outline: "border border-white/20 text-white hover:border-accent-pink hover:text-accent-pink",
  ghost: "text-white/70 hover:text-white"
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-xs uppercase tracking-[0.3em]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base"
};

type MotionAnchorProps = MotionProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type MotionButtonProps = MotionProps & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <motion.a
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
        {...(anchorProps as MotionAnchorProps)}
      >
        {icon && <span className="mr-2 inline-flex">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  const isDisabled = Boolean(buttonProps.disabled);

  return (
    <motion.button
      type="button"
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "pointer-events-none opacity-60 cursor-not-allowed",
        className
      )}
      whileHover={isDisabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      {...(buttonProps as MotionButtonProps)}
    >
      {icon && <span className="mr-2 inline-flex">{icon}</span>}
      {children}
    </motion.button>
  );
}
