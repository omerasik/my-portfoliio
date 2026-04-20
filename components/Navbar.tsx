"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [active, setActive] = useState(navItems[0]?.href.replace("#", "") ?? "hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.25 }
    );
    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className={cn(
      "fixed left-0 right-0 top-0 z-[100] transition-all duration-500",
      scrolled
        ? "bg-void/85 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(139,92,246,0.12)]"
        : "bg-transparent"
    )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <a href="#hero">
          <motion.span
            className="font-display text-xl font-black tracking-tight text-ink"
            whileHover={{ scale: 1.05 }}
          >
            OA
            <span className="text-accent-lime" style={{ textShadow: "0 0 15px rgba(204,255,0,0.7)" }}>.</span>
          </motion.span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item, i) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={cn(
                  "relative font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                  isActive ? "text-ink" : "text-ink/45 hover:text-ink/80"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-lime"
                    style={{ boxShadow: "0 0 8px #CCFF00" }}
                  />
                )}
                {item.label}
              </motion.a>
            );
          })}
          <a
            href="#contact"
            className="rounded-full border border-accent-violet/50 bg-accent-violet/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent-violet transition-all hover:bg-accent-violet hover:text-white"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink/60 md:hidden"
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}><X className="h-5 w-5" /></motion.div>
              : <motion.div key="m" initial={{ rotate: 90 }}  animate={{ rotate: 0 }} exit={{ rotate: -90 }}><Menu className="h-5 w-5" /></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-accent-violet/10 bg-void/90 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-5 py-6">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors",
                    active === item.href.replace("#", "")
                      ? "bg-accent-violet/15 text-ink"
                      : "text-ink/50 hover:text-ink"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
