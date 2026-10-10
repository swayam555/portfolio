"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { elements, groups, type Group } from "@/data/skills";
import { Chapter } from "./Reveal";

// One hue per group (tokens in globals.css). Text stays in ink; the hue only marks identity.
const groupColor: Record<Group, string> = {
  Language: "var(--g-language)",
  "Back end": "var(--g-backend)",
  "Front end": "var(--g-frontend)",
  Data: "var(--g-data)",
  Cloud: "var(--g-cloud)",
  Testing: "var(--g-testing)",
};

const code = (g: Group) => g.slice(0, 2).toUpperCase();

export function Toolbox() {
  const [pinned, setPinned] = useState<Group | null>(null);
  const [preview, setPreview] = useState<Group | null>(null);
  const [selected, setSelected] = useState(0);
  const focus = preview ?? pinned;
  const el = elements[selected];

  return (
    <section id="toolbox" className="border-y-2 border-ink bg-bg-2/40">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <Chapter n="04" title="Periodic table of my stack" meta={`${elements.length} elements · each one used in real work`} />

        <div role="group" aria-label="Highlight a group" className="mb-5 flex flex-wrap gap-2">
          {groups.map((g) => {
            const on = pinned === g;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={on}
                onClick={() => setPinned(on ? null : g)}
                onMouseEnter={() => setPreview(g)}
                onMouseLeave={() => setPreview(null)}
                className={`flex h-9 items-center gap-2 border border-ink px-3 font-mono text-xs uppercase transition-colors ${on ? "bg-ink text-bg" : "hover:bg-card"}`}
              >
                <span className="size-3" style={{ background: groupColor[g] }} />
                {g}
                <span className="opacity-60">{elements.filter((e) => e.group === g).length}</span>
              </button>
            );
          })}
        </div>

        {/* Readout for the selected element */}
        <div className="mb-px grid grid-cols-[auto_1fr] items-stretch border border-ink bg-card" aria-live="polite">
          <div className="relative flex w-28 flex-col justify-between border-r border-ink p-3 md:w-36" style={{ boxShadow: `inset 0 5px 0 ${groupColor[el.group]}` }}>
            <span className="mt-1 flex justify-between font-mono text-[10px] text-muted">
              <span>{selected + 1}</span>
              <span>{code(el.group)}</span>
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={el.sym}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="display block text-6xl leading-none md:text-7xl"
                style={{ textTransform: "none" }}
              >
                {el.sym}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-1 p-4 md:px-6">
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted uppercase">
              <span className="size-2.5" style={{ background: groupColor[el.group] }} />
              {el.group}
            </p>
            <p className="display text-3xl md:text-4xl">{el.name}</p>
            <p className="text-sm text-ink-2 md:text-base">
              <span className="font-mono text-[11px] text-muted uppercase">Used in · </span>
              {el.used}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-3 gap-px border border-ink bg-ink sm:grid-cols-5 md:grid-cols-7 xl:grid-cols-10">
          {elements.map((e, i) => {
            const dim = focus !== null && focus !== e.group;
            const active = i === selected;
            return (
              // The cell background stays solid; only the contents fade in, so the ink grid never shows through.
              <li key={e.name} className="bg-card">
                <button
                  type="button"
                  aria-pressed={active}
                  aria-label={`${e.name}, ${e.group}. Used in ${e.used}`}
                  onClick={() => setSelected(i)}
                  className={`relative block aspect-square w-full p-2 text-left text-ink transition-[opacity,background-color] duration-200 hover:bg-bg ${dim ? "opacity-35" : ""} ${active ? "bg-bg" : ""}`}
                  style={{
                    boxShadow: `inset 0 4px 0 ${groupColor[e.group]}${active ? ", inset 0 0 0 2px var(--ink)" : ""}`,
                  }}
                >
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: (i % 10) * 0.03 + Math.floor(i / 10) * 0.05, duration: 0.35 }}
                  >
                    <span className="mt-1 flex justify-between font-mono text-[9px] text-muted">
                      <span>{i + 1}</span>
                      <span className="hidden sm:inline">{code(e.group)}</span>
                    </span>
                    <span className="display mt-1 block text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none" style={{ textTransform: "none" }}>
                      {e.sym}
                    </span>
                    <span className="mt-1 block truncate text-[11px] font-semibold">{e.name}</span>
                  </motion.span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 font-mono text-[10px] tracking-wider text-muted uppercase">Select an element to see where it was used</p>
      </div>
    </section>
  );
}
