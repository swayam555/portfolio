"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "tr";
};

export function Reveal({ children, delay = 0, y = 22, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

// Chapter header: oversized outlined number, title and a mono meta line, ruled underneath.
export function Chapter({ n, title, meta }: { n: string; title: string; meta: string }) {
  return (
    <div className="mb-10 grid grid-cols-[auto_1fr] items-end gap-x-5 border-b-2 border-ink pb-4 md:mb-14 md:gap-x-8">
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="display text-[clamp(4rem,13vw,10rem)] text-transparent [-webkit-text-stroke:1.5px_var(--ink)]"
      >
        {n}
      </motion.span>
      <div className="pb-1 md:pb-3">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">§{n} · {meta}</p>
        <h2 className="display mt-2 text-[clamp(2.2rem,6vw,4.6rem)]">{title}</h2>
      </div>
    </div>
  );
}
