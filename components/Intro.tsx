"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const bootLines = [
  "> initializing omer.dev ...",
  "> loading 3D engine .......... OK",
  "> connecting AI modules ...... OK",
  "> automation pipeline ........ READY"
];

export default function Intro() {
  const [done, setDone] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), 280 + i * 330));
    });
    timers.push(setTimeout(() => setDone(true), 280 + bootLines.length * 330 + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-bg"
        >
          <div className="w-[min(420px,85vw)]">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cy via-vi to-mg font-display text-sm font-extrabold text-bg">
                ÖA
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-dim">BOOT SEQUENCE</span>
            </div>
            <div className="space-y-2 font-mono text-sm">
              {bootLines.slice(0, shown).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === bootLines.length - 1 ? "text-cy" : "text-dim"}
                >
                  {line}
                </motion.p>
              ))}
              <span className="caret" />
            </div>
            <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-edge/15">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cy via-vi to-mg"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
