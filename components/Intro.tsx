"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COMMAND = "> run omer_asik.exe --mode=portfolio";

const LOGS = [
  "[ 0.012s ] kernel: loading 3d_engine.o ............ OK",
  "[ 0.094s ] agent: ai_modules linked ............... OK",
  "[ 0.176s ] pipeline: power_platform attached ...... OK",
  "[ 0.231s ] i18n: 5 locales mounted ................ OK",
  "[ 0.307s ] compiling experience ................... DONE"
];

const BARS = 7;

export default function Intro() {
  const [typed, setTyped] = useState(0);
  const [logs, setLogs] = useState(0);
  const [granted, setGranted] = useState(false);
  const [stage, setStage] = useState<"boot" | "wipe" | "off">("boot");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("off");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. type the command
    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(setTimeout(() => setTyped(i), 120 + i * 26));
    }
    const afterType = 120 + COMMAND.length * 26 + 120;

    // 2. rapid log burst
    LOGS.forEach((_, i) => {
      timers.push(setTimeout(() => setLogs(i + 1), afterType + i * 130));
    });
    const afterLogs = afterType + LOGS.length * 130 + 150;

    // 3. access granted stamp
    timers.push(setTimeout(() => setGranted(true), afterLogs));

    // 4. wipe out
    timers.push(setTimeout(() => setStage("wipe"), afterLogs + 800));
    timers.push(setTimeout(() => setStage("off"), afterLogs + 1550));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === "off") return null;

  return (
    <div className="fixed inset-0 z-[9990]">
      <AnimatePresence>
        {stage === "boot" && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="scanlines absolute inset-0 flex items-center justify-center bg-bg"
          >
            <div className="w-[min(560px,88vw)] font-mono">
              <div className="mb-5 flex items-center justify-between border-b border-edge/20 pb-3 text-[10px] uppercase tracking-[0.3em] text-dim">
                <span>OMER ASIK // SYSTEM BOOT</span>
                <span className="text-a1">v2.0.26</span>
              </div>

              <p className="text-sm text-ink sm:text-base">
                {COMMAND.slice(0, typed)}
                <span className="caret" />
              </p>

              <div className="mt-4 space-y-1.5 text-[11px] leading-relaxed text-dim sm:text-xs">
                {LOGS.slice(0, logs).map((line) => (
                  <motion.p key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                    {line}
                  </motion.p>
                ))}
              </div>

              <div className="mt-8 flex h-16 items-center justify-center">
                {granted && (
                  <motion.span
                    initial={{ opacity: 0, scale: 2.4, rotate: -14 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 420, damping: 16 }}
                    className="stamp px-6 py-2 text-xl font-bold uppercase tracking-[0.3em] sm:text-2xl"
                  >
                    Access granted
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical bar wipe */}
      {stage === "wipe" && (
        <div className="absolute inset-0 flex">
          {Array.from({ length: BARS }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.76, 0, 0.24, 1] }}
              className="h-full flex-1 origin-top bg-bg"
              style={{ boxShadow: "0 2px 0 rgb(var(--a1) / 0.5)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
