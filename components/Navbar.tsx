"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import LangSwitcher from "@/components/LangSwitcher";

export default function Navbar() {
  const { t } = useLang();
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map((n) => document.getElementById(n.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] border-b transition-all duration-500 ${
        scrolled ? "border-edge/15 bg-bg/75 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-2 font-mono text-sm font-bold tracking-wide text-ink">
          <span className="text-a1">&gt;_</span>
          omer<span className="text-dim">.</span><span className="text-signal">asik</span>
          <span className="caret" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-5 md:flex">
          {navItems.map((item, i) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`group flex items-baseline gap-1.5 font-mono text-[13px] transition-colors duration-300 ${
                    isActive ? "text-a1" : "text-dim hover:text-ink"
                  }`}
                >
                  <span className="text-[9px] opacity-60">0{i + 1}</span>
                  <span className="underline-slide">{t.nav[item.key]}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="btn-chamfer flex h-10 w-10 items-center justify-center border border-edge/25 bg-card/50 text-ink backdrop-blur md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-edge/15 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="px-5 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-edge/10 py-3.5 font-mono text-sm text-ink transition-colors hover:text-a1"
                  >
                    {t.nav[item.key]}
                    <span className="text-xs text-a1/70">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
