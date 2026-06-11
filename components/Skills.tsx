"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillSphere from "@/components/SkillSphere";

/* Cycling terminal: types real commands with their output */
const SESSIONS: { cmd: string; out: string[] }[] = [
  { cmd: "whoami", out: ["omer_asik :: full-stack developer"] },
  { cmd: "cat focus.txt", out: ["automation / ai agents / power platform"] },
  { cmd: "./deploy.sh --target=prod", out: ["build passed", "shipped in 3.2s"] },
  { cmd: "node mail-agent.js --run", out: ["42 emails processed", "0 touched by hand"] },
  { cmd: "git log --oneline -1", out: ["a3f9c1e always learning, always shipping"] }
];

function Terminal() {
  const [si, setSi] = useState(0);
  const [typed, setTyped] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    const session = SESSIONS[si];
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= session.cmd.length; i++) {
      timers.push(setTimeout(() => setTyped(i), 350 + i * 55));
    }
    const afterCmd = 350 + session.cmd.length * 55 + 250;
    timers.push(setTimeout(() => setShowOut(true), afterCmd));
    timers.push(
      setTimeout(() => {
        setShowOut(false);
        setTyped(0);
        setSi((v) => (v + 1) % SESSIONS.length);
      }, afterCmd + 2600)
    );
    return () => timers.forEach(clearTimeout);
  }, [si]);

  const session = SESSIONS[si];

  return (
    <div className="panel ticks flex h-full min-h-[300px] flex-col p-0">
      <div className="flex items-center justify-between border-b border-edge/15 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">omer@dev: ~</span>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 bg-a1/60" />
          <span className="h-2 w-2 bg-a3/60" />
          <span className="h-2 w-2 bg-a2/60" />
        </span>
      </div>
      <div className="flex-1 p-5 font-mono text-sm leading-7">
        <p className="text-ink">
          <span className="text-a1">$ </span>
          {session.cmd.slice(0, typed)}
          <span className="caret" />
        </p>
        {showOut &&
          session.out.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="text-dim"
            >
              {line}
            </motion.p>
          ))}
      </div>
      <div className="border-t border-edge/15 px-5 py-2.5 font-mono text-[10px] text-dim">
        <span className="text-a1">[OK]</span> 24 tools loaded / 0 categories needed
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="section-padding relative">
      <SectionHeader index="03" eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.desc} />

      <div className="grid items-stretch gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative lg:col-span-3"
        >
          <SkillSphere />
          <p className="mt-2 flex items-center justify-center gap-2 font-mono text-xs text-dim">
            <MousePointer2 size={12} className="text-a1" />
            {t.skills.hint}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
