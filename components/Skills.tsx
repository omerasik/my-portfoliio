"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2, Terminal as TerminalIcon } from "lucide-react";
import { skillCloud, skillMeta } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillSphere from "@/components/SkillSphere";

/* Interactive inspector: reacts to the skill clicked in the sphere */
function SkillInspector({ selected }: { selected: string | null }) {
  const groups = useMemo(() => {
    const set = new Set(Object.values(skillMeta).map((m) => m.group));
    return Array.from(set);
  }, []);

  const meta = selected ? skillMeta[selected] : null;

  return (
    <div className="panel ticks flex h-full min-h-[300px] flex-col p-0">
      <div className="flex items-center justify-between border-b border-edge/15 px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
          <TerminalIcon size={12} className="text-a1" />
          omer@dev: ~/skills
        </span>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 bg-a1/60" />
          <span className="h-2 w-2 bg-a3/60" />
          <span className="h-2 w-2 bg-a2/60" />
        </span>
      </div>

      <div className="flex-1 p-5 font-mono text-sm leading-7">
        <AnimatePresence mode="wait">
          {meta && selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-ink">
                <span className="text-a1">$ </span>inspect <span className="text-a2">{`"${selected}"`}</span>
              </p>

              <p className="mt-4 text-dim">
                <span className="text-dim/60">group</span> &nbsp;:: <span className="text-a3">{meta.group}</span>
              </p>

              <p className="mt-1 flex items-center gap-2 text-dim">
                <span className="text-dim/60">level</span> ::
                <span className="tracking-[0.15em] text-a1">
                  {"\u2588".repeat(meta.level)}
                  <span className="text-edge/40">{"\u2591".repeat(5 - meta.level)}</span>
                </span>
                <span className="text-xs text-dim/70">{meta.level}/5</span>
              </p>

              <p className="mt-4 leading-relaxed text-ink/90">
                <span className="text-a1">&gt; </span>
                {meta.note}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-ink">
                <span className="text-a1">$ </span>select a node<span className="caret" />
              </p>
              <p className="mt-3 text-dim">Tap any skill in the orbit to inspect it.</p>

              <p className="mt-6 text-dim/70">
                <span className="text-dim/50"># groups</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {groups.map((g) => (
                  <span key={g} className="tag">
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-edge/15 px-5 py-2.5 font-mono text-[10px] text-dim">
        {meta ? (
          <span>
            <span className="text-a1">[OK]</span> node selected · {skillCloud.length} tools indexed
          </span>
        ) : (
          <span>
            <span className="text-a3">[..]</span> awaiting input · {skillCloud.length} tools indexed
          </span>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

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
          <SkillSphere selected={selected} onSelect={(label) => setSelected((cur) => (cur === label ? null : label))} />
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
          <SkillInspector selected={selected} />
        </motion.div>
      </div>
    </section>
  );
}
