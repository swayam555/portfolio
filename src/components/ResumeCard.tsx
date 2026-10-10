"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";
import { ArrowUpRight, DownloadIcon } from "./Icons";

// The résumé as a physical sheet on the desk: tilts, straightens on hover, stamped with its revision.
export function ResumeCard() {
  return (
    <motion.aside
      aria-label="Résumé"
      initial={{ opacity: 0, y: 40, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col lg:pt-4"
    >
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] uppercase">
        <span>
          <span className="text-accent">▲</span> Résumé
        </span>
        <span className="text-muted">1 page · PDF</span>
      </div>

      <a
        href={site.resume}
        target="_blank"
        rel="noreferrer"
        aria-label="Open résumé PDF in a new tab"
        className="group relative block [perspective:1200px]"
      >
        <div className="relative origin-bottom -rotate-2 border border-rule bg-white transition-transform duration-500 ease-out [box-shadow:var(--shadow)] group-hover:rotate-0 group-hover:-translate-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/resume-preview.jpg"
            alt="First page of Swayam Bajpai's résumé"
            width={935}
            height={1210}
            fetchPriority="high"
            className="block h-auto w-full"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 bg-white px-3 py-1.5 font-mono text-xs text-black uppercase">
              Open full PDF <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 1.8, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 14 }}
          className="absolute -top-4 -right-1 grid size-20 sm:-right-3 sm:size-24 place-items-center rounded-full border-2 border-accent bg-bg/80 text-center font-mono text-[9px] leading-tight font-semibold tracking-wider text-accent uppercase backdrop-blur-sm"
        >
          <span>
            Updated
            <br />
            <span className="display text-xl leading-none">{site.resumeUpdated}</span>
          </span>
        </motion.span>
      </a>

      <div className="mt-5 grid grid-cols-2 border-2 border-ink">
        <a
          href={site.resume}
          download="Swayam_Bajpai_Resume.pdf"
          className="flex items-center justify-center gap-2 bg-accent py-3.5 font-mono text-xs font-semibold tracking-wider text-on-accent uppercase transition-[filter] hover:brightness-110"
        >
          <DownloadIcon /> Download
        </a>
        <a
          href={site.resume}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 border-l-2 border-ink py-3.5 font-mono text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-ink hover:text-bg"
        >
          View <ArrowUpRight />
        </a>
      </div>
    </motion.aside>
  );
}
