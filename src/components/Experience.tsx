"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { certifications, education, fidelity, marineEdge } from "@/data/experience";
import { ArrowUpRight } from "./Icons";
import { Chapter, Reveal } from "./Reveal";

function RoleHeader({ company, title, product, period, location, url }: { company: string; title: string; product: string; period: string; location: string; url?: string }) {
  return (
    <div className="grid gap-y-2 border-y-2 border-ink py-4 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{product}</p>
        <h3 className="display mt-1 text-[clamp(2.4rem,6vw,4.4rem)]">
          {url ? (
            <a href={url} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-2 hover:text-accent">
              {company}
              <ArrowUpRight className="mt-2 size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            company
          )}
        </h3>
      </div>
      <div className="font-mono text-xs uppercase md:text-right">
        <p className="font-semibold">{title}</p>
        <p className="text-muted">
          {period} · {location}
        </p>
      </div>
    </div>
  );
}

function Stats({ stats }: { stats: { k: string; v: string }[] }) {
  return (
    <ul className="grid grid-cols-2 border-l border-ink md:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal as="li" key={s.v} delay={i * 0.06} y={10} className="border-r border-b border-ink p-4">
          <span className="display block text-5xl text-accent md:text-6xl">{s.k}</span>
          <span className="mt-1 block font-mono text-[11px] tracking-wider text-muted uppercase">{s.v}</span>
        </Reveal>
      ))}
    </ul>
  );
}

// Client-facing and core layers are filled; supporting layers are outlined.
const layerColor: Record<string, string> = {
  "Mobile app": "bg-accent text-on-accent",
  BFF: "bg-ink text-bg",
  Orchestration: "bg-ink text-bg",
  "Web portal": "bg-ink text-bg",
  API: "bg-ink text-bg",
};

type MapSystem = { name: string; layer: string; what: string; built: string[]; stack: string[] };

function SystemMap({ id, label, systems, delivery }: { id: string; label: string; systems: MapSystem[]; delivery: string[] }) {
  const [sel, setSel] = useState(0);
  const s = systems[sel];
  return (
    <div className="mt-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="display text-3xl">System map</h4>
        <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Select a system · {systems.length} {label}</p>
      </div>
      <div className="grid gap-px border border-ink bg-ink lg:grid-cols-[1.15fr_1fr]">
        <div role="tablist" aria-label={`${id} systems`} className="flex snap-x gap-px overflow-x-auto sm:grid sm:grid-cols-3 sm:overflow-visible">
          {systems.map((sys, i) => (
            <button
              key={sys.name}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={sel === i}
              aria-controls={`${id}-panel`}
              onClick={() => setSel(i)}
              onKeyDown={(e) => {
                const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                if (!step) return;
                e.preventDefault();
                const next = (i + step + systems.length) % systems.length;
                setSel(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }}
              tabIndex={sel === i ? 0 : -1}
              className={`relative flex min-h-24 w-[46vw] shrink-0 snap-start flex-col justify-between p-3 text-left transition-colors sm:min-h-28 sm:w-auto ${sel === i ? "bg-ink text-bg" : "bg-card hover:bg-bg-2"}`}
            >
              <span className="flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                <span className={sel === i ? "text-accent" : "text-muted"}>S/{String(i + 1).padStart(2, "0")}</span>
                <span className={`px-1.5 py-0.5 text-[9px] ${sel === i ? "border border-bg/40" : (layerColor[sys.layer] ?? "border border-ink")}`}>{sys.layer}</span>
              </span>
              <span className="semi-condensed mt-3 text-[15px] leading-tight font-bold uppercase">{sys.name}</span>
              {sel === i && <motion.span layoutId={`${id}-sel`} className="absolute inset-x-0 bottom-0 h-1 bg-accent" />}
            </button>
          ))}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${sel}`} className="min-h-[420px] bg-card p-5 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div key={s.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.28 }}>
              <p className="font-mono text-[11px] tracking-wider text-accent uppercase">
                S/{String(sel + 1).padStart(2, "0")} · {s.layer}
              </p>
              <h5 className="display mt-2 text-4xl">{s.name}</h5>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.what}</p>
              <p className="mt-6 font-mono text-[11px] tracking-wider text-muted uppercase">What I built</p>
              <ul className="mt-2 space-y-2.5">
                {s.built.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i }}
                    className="grid grid-cols-[18px_1fr] text-[15px] leading-snug"
                  >
                    <span className="mt-[7px] size-2 bg-accent" aria-hidden="true" />
                    {b}
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {s.stack.map((t) => (
                  <li key={t} className="border border-ink px-2 py-0.5 font-mono text-[11px]">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink py-3 font-mono text-[11px] tracking-wide uppercase">
        <span className="text-accent">Delivery →</span>
        {delivery.map((d) => (
          <span key={d} className="text-ink-2">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <Chapter n="01" title="Where I've shipped" meta="Experience · 2024 → now" />

      <Reveal>
        <RoleHeader company={fidelity.company} title={fidelity.title} product={fidelity.product} period={fidelity.period} location={fidelity.location} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <p className="text-lg leading-relaxed text-ink-2">{fidelity.summary}</p>
          <Stats stats={fidelity.stats} />
        </div>
      </Reveal>
      <SystemMap id="fidelity" label="codebases" systems={fidelity.systems} delivery={fidelity.delivery} />

      <div className="mt-24">
        <Reveal>
          <RoleHeader
            company={marineEdge.company}
            title={marineEdge.title}
            product={marineEdge.product}
            period={marineEdge.period}
            location={marineEdge.location}
            url={marineEdge.url}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <p className="text-lg leading-relaxed text-ink-2">{marineEdge.summary}</p>
            <Stats stats={marineEdge.stats} />
          </div>
        </Reveal>
        <SystemMap id="marine-edge" label="areas of the platform" systems={marineEdge.systems} delivery={marineEdge.delivery} />
      </div>

      <Reveal className="mt-16 grid gap-px border border-ink bg-ink md:grid-cols-2">
        <div className="bg-card p-5 md:p-6">
          <p className="font-mono text-[11px] tracking-wider text-accent uppercase">Education · {education.period}</p>
          <p className="semi-condensed mt-2 text-xl font-bold uppercase">{education.school}</p>
          <p className="text-ink-2">{education.degree}</p>
          <p className="mt-3 font-mono text-[11px] text-muted">{education.coursework.join(" · ")}</p>
        </div>
        <div className="bg-card p-5 md:p-6">
          <p className="font-mono text-[11px] tracking-wider text-accent uppercase">Certifications</p>
          <ul className="mt-2 space-y-1.5">
            {certifications.map((c) => (
              <li key={c} className="text-ink-2">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
