"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { LANGS, useLang } from "@/lib/i18n";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="btn-chamfer flex h-10 items-center gap-2 border border-edge/25 bg-card/50 px-3 font-mono text-xs uppercase tracking-wider text-dim backdrop-blur transition-colors duration-300 hover:border-a1/50 hover:text-ink"
      >
        <Globe size={15} className="text-a1" />
        {lang}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="panel panel--quiet absolute right-0 top-12 z-50 w-40 p-1.5"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left font-mono text-xs uppercase tracking-wider transition-colors ${
                    lang === l.code ? "bg-a1/10 text-a1" : "text-dim hover:bg-edge/10 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span className="text-[10px] opacity-60">{l.code}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
