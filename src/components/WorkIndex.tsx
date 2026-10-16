"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useMemo, useState } from "react";
import { caseStudies, categories, endYear, projectIndex, type Category, type IndexEntry } from "@/data/projects";
import { site } from "@/data/site";
import { MiniDiagram } from "./ArchitectureDiagram";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "./Icons";
import { Chapter, Reveal } from "./Reveal";

function Featured() {
  return (
    <ul className="grid gap-px border border-ink bg-ink sm:grid-cols-2 xl:grid-cols-4">
      {caseStudies.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 4) * 0.06} className="bg-card">
          <Link href={`/projects/${p.slug}/`} className="group flex h-full flex-col transition-colors hover:bg-ink hover:text-bg">
            <div className="flex items-center justify-between border-b border-ink px-4 py-2 font-mono text-[10px] tracking-wider uppercase group-hover:border-bg/30">
              <span className="text-accent">CS/{String(i + 1).padStart(2, "0")}</span>
              <span className={p.status === "Production" ? "bg-accent px-1.5 text-on-accent" : "text-muted group-hover:text-bg/60"}>{p.status}</span>
            </div>
            <div className="h-32 border-b border-ink px-4 py-3 text-ink transition-colors group-hover:border-bg/30 group-hover:text-bg">
              <MiniDiagram diagram={p.diagram} />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="display text-4xl transition-colors group-hover:text-accent">{p.name}</h3>
              <p className="mt-2 text-sm leading-snug text-ink-2 group-hover:text-bg/80">{p.tagline}</p>
              <p className="mt-auto flex items-center justify-between pt-5 font-mono text-[11px] tracking-wider uppercase">
                <span className="text-muted group-hover:text-bg/60">{p.stack.slice(0, 3).join(" · ")}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
      {/* Blank cells complete the last row, so the grid's ink background doesn't show through */}
      {Array.from({ length: (4 - (caseStudies.length % 4)) % 4 }, (_, i) => (
        <li key={`filler-${i}`} aria-hidden className={`${i < caseStudies.length % 2 ? "sm:block" : "xl:block"} hidden bg-card`} />
      ))}
    </ul>
  );
}

function Row({ p, i, onHover }: { p: IndexEntry; i: number; onHover: (p: IndexEntry | null) => void }) {
  const internal = !!p.slug;
  const href = internal ? `/projects/${p.slug}/` : p.href;
  const content = (
    <>
      <span className="font-mono text-[11px] text-muted group-hover:text-bg/60">{String(i + 1).padStart(2, "0")}</span>
      <span className="min-w-0">
        <span className="semi-condensed flex items-center gap-2 text-lg font-bold uppercase md:text-xl">
          {p.name}
          {internal && <span className="bg-accent px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-wider text-on-accent">Case study</span>}
          {p.note && !internal && <span className="border border-current px-1.5 py-0.5 font-mono text-[9px] font-medium">{p.note}</span>}
        </span>
        <span className="mt-0.5 block text-sm text-ink-2 group-hover:text-bg/80 md:hidden">{p.desc}</span>
      </span>
      <span className="hidden font-mono text-xs uppercase md:block">{p.category}</span>
      <span className="hidden truncate font-mono text-xs text-muted group-hover:text-bg/70 lg:block">{p.stack.join(" · ")}</span>
      <span className="hidden font-mono text-xs md:block">{p.year}</span>
      <span className="justify-self-end">{internal ? <ArrowRight className="size-4" /> : href ? <ArrowUpRight className="size-4" /> : <span className="font-mono text-[10px]">—</span>}</span>
    </>
  );
  const cls =
    "group grid grid-cols-[32px_1fr_24px] items-center gap-3 border-b border-ink px-2 py-3.5 transition-colors hover:bg-ink hover:text-bg md:grid-cols-[40px_1.3fr_110px_1fr_60px_24px] md:gap-5";
  return (
    <motion.li layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onMouseEnter={() => onHover(p)} onMouseLeave={() => onHover(null)}>
      {internal ? (
        <Link href={href!} className={cls}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {content}
        </a>
      ) : (
        <div className={cls}>{content}</div>
      )}
    </motion.li>
  );
}

export function WorkIndex() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [hover, setHover] = useState<IndexEntry | null>(null);
  const list = useMemo(() => (filter === "All" ? projectIndex : projectIndex.filter((p) => p.category === filter)), [filter]);
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, projectIndex.filter((p) => p.category === c).length])), []);

  // Floating preview that follows the cursor over the table
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  return (
    <section id="index" className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <Chapter n="03" title="The work index" meta={`${projectIndex.length} projects · ${caseStudies.length} case studies`} />

      <Reveal className="mb-4 flex items-baseline justify-between">
        <h3 className="display text-3xl">Case studies</h3>
        <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Architecture, decisions, trade-offs</p>
      </Reveal>
      <Featured />

      <Reveal className="mt-20 mb-4 flex flex-wrap items-end justify-between gap-4">
        <h3 className="display text-3xl">Everything I&apos;ve built</h3>
        <a href={site.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 py-2 font-mono text-xs uppercase hover:text-accent">
          <GitHubIcon /> github.com/swayam555 <ArrowUpRight className="size-3.5" />
        </a>
      </Reveal>

      <div role="group" aria-label="Filter projects" className="mb-4 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`relative h-9 border border-ink px-3 font-mono text-xs tracking-wider uppercase transition-colors ${filter === c ? "text-on-accent" : "hover:bg-ink hover:text-bg"}`}
          >
            {filter === c && <motion.span layoutId="filter-bg" className="absolute inset-0 bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative">
              {c} <span className="opacity-60">{c === "All" ? projectIndex.length : counts[c]}</span>
            </span>
          </button>
        ))}
      </div>

      <div
        className="relative"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left + 24);
          y.set(e.clientY - r.top - 40);
        }}
      >
        <div className="hidden grid-cols-[40px_1.3fr_110px_1fr_60px_24px] gap-5 border-y-2 border-ink px-2 py-2 font-mono text-[10px] tracking-wider text-muted uppercase md:grid">
          <span>No.</span>
          <span>Project</span>
          <span>Type</span>
          <span className="hidden lg:block">Stack</span>
          <span>Year</span>
          <span />
        </div>
        <motion.ul layout className="border-t-2 border-ink md:border-t-0" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout">
            {list.flatMap((p, i) => {
              const y = endYear(p.year);
              const row = <Row key={p.name} p={p} i={i} onHover={setHover} />;
              if (i > 0 && endYear(list[i - 1].year) === y) return [row];
              const inYear = list.filter((q) => endYear(q.year) === y).length;
              return [
                <motion.li
                  layout
                  key={`year-${y}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-baseline justify-between border-b border-ink bg-bg-2 px-2 pt-6 pb-2"
                >
                  <span className="display text-4xl">{y}</span>
                  <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                    {inYear} project{inYear === 1 ? "" : "s"}
                  </span>
                </motion.li>,
                row,
              ];
            })}
          </AnimatePresence>
        </motion.ul>

        <AnimatePresence>
          {hover && (
            <motion.div
              key="preview"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none absolute top-0 left-0 z-20 hidden w-72 border-2 border-ink bg-bg p-4 [box-shadow:var(--shadow)] md:block"
            >
              <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                {hover.category} · {hover.year}
              </p>
              <p className="display mt-1 text-3xl">{hover.name}</p>
              <p className="mt-2 text-sm leading-snug text-ink-2">{hover.desc}</p>
              <p className="mt-3 font-mono text-[10px] text-muted uppercase">
                {hover.slug ? "→ Read the case study" : hover.href ? "↗ Opens on GitHub" : "Private repository"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
