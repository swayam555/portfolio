"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Note } from "@/data/notes";

const durations = [0.42, 0.7, 0.35, 0.95, 0.5, 0.6, 0.4]; // relative latencies of the 7 systems
const total = durations.reduce((a, b) => a + b, 0);
const max = Math.max(...durations);
const starts = durations.map((_, i) => durations.slice(0, i).reduce((a, b) => a + b, 0));

function Fanout({ on }: { on: boolean }) {
  return (
    <div className="space-y-5 font-mono text-[10px] text-muted">
      <div>
        <div className="mb-2 flex justify-between">
          <span>sequential</span>
          <span className="text-accent">Σ 7 calls</span>
        </div>
        <div className="relative h-16">
          {durations.map((d, i) => {
            const left = (starts[i] / total) * 100;
            return (
              <motion.div
                key={i}
                className="absolute h-1.5 bg-accent"
                style={{ top: i * 9, left: `${left}%` }}
                initial={{ width: 0 }}
                animate={on ? { width: `${(d / total) * 100}%` } : { width: 0 }}
                transition={{ duration: 0.35, delay: (left / 100) * 2.4 }}
              />
            );
          })}
        </div>
      </div>
      <div>
        <div className="mb-2 flex justify-between">
          <span>parallel · CompletableFuture</span>
          <span className="text-ok">max(7)</span>
        </div>
        <div className="relative h-16">
          {durations.map((d, i) => (
            <motion.div
              key={i}
              className="absolute left-0 h-1.5 bg-ok"
              style={{ top: i * 9 }}
              initial={{ width: 0 }}
              animate={on ? { width: `${(d / total) * 100}%` } : { width: 0 }}
              transition={{ duration: (d / max) * 0.9, delay: 0.2, ease: "easeOut" }}
            />
          ))}
          <motion.div
            className="absolute top-0 h-full w-px bg-ok"
            style={{ left: `${(max / total) * 100}%` }}
            initial={{ opacity: 0 }}
            animate={on ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          />
        </div>
      </div>
    </div>
  );
}

const items = [
  { id: "acct-1", code: 200 },
  { id: "acct-2", code: 200 },
  { id: "acct-3", code: 503 },
  { id: "acct-4", code: 200 },
  { id: "acct-5", code: 404 },
];

function Partial({ on }: { on: boolean }) {
  return (
    <div className="font-mono text-xs">
      <motion.div
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : {}}
        className="mb-3 inline-flex items-center gap-2 border border-warn bg-warn/10 px-2 py-1 text-warn"
      >
        HTTP/1.1 207 Multi-Status
      </motion.div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <motion.li
            key={it.id}
            initial={{ opacity: 0, x: -8 }}
            animate={on ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.15 }}
            className="flex items-center justify-between border border-ink/30 bg-bg px-3 py-1.5"
          >
            <span className="text-muted">{it.id}</span>
            <span className={it.code === 200 ? "text-ok" : "text-accent"}>
              {it.code} {it.code === 200 ? "ok" : "retry"}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Precision({ on }: { on: boolean }) {
  const real = "123456789012345678";
  const lossy = String(Number(real)); // what JS actually produces
  const [tick, setTick] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!on) return;
    if (reduce) {
      // Jump straight to the fixed state (set async so first paint matches the server).
      const t = setTimeout(() => setTick(2), 0);
      return () => clearTimeout(t);
    }
    const t = setInterval(() => setTick((s) => (s + 1) % 3), 1800);
    return () => clearInterval(t);
  }, [on, reduce]);
  const stage = tick;

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="border border-ink/30 bg-bg p-3">
        <div className="text-muted">{"// backend sends"}</div>
        <div className="mt-1 break-all text-ink">attemptId: {real}</div>
      </div>
      <div
        className={`border p-3 transition-colors duration-500 ${
          stage === 1 ? "border-accent bg-accent/10" : stage === 2 ? "border-ok bg-ok/10" : "border-ink/30 bg-bg"
        }`}
      >
        <div className="text-muted">{stage === 2 ? "// fixed: string end to end" : "// app receives (Number)"}</div>
        <div className="mt-1 break-all">
          attemptId:{" "}
          {stage === 2 ? (
            <span className="text-ok">&quot;{real}&quot;</span>
          ) : (
            lossy.split("").map((c, i) => (
              <span key={i} className={stage === 1 && c !== real[i] ? "text-accent underline decoration-accent" : "text-ink"}>
                {c}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-between text-muted">
        <span>2⁵³ = 9007199254740992</span>
        <span className={stage === 2 ? "text-ok" : "text-accent"}>{stage === 2 ? "saves 100%" : "saves 0%"}</span>
      </div>
    </div>
  );
}

function Progress({ on }: { on: boolean }) {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!on) return;
    if (reduce) {
      const t = setTimeout(() => setStep(90), 0);
      return () => clearTimeout(t);
    }
    // Climb 1% per tick to 90%, hold on "completed", then restart.
    let v = 0;
    let reset: ReturnType<typeof setTimeout> | undefined;
    const t = setInterval(() => {
      if (v >= 90) return;
      v += 1;
      setStep(v);
      if (v >= 90)
        reset = setTimeout(() => {
          v = 0;
          setStep(0);
        }, 1800);
    }, 50);
    return () => {
      clearInterval(t);
      clearTimeout(reset);
    };
  }, [on, reduce]);

  const p = step;
  const done = p >= 90;
  // A save goes out only when progress has moved 5% since the last one, or at the 90% mark.
  const saves = Math.floor(p / 5);
  const savedAt = saves * 5;
  return (
    <div className="font-mono text-xs">
      <div className="mb-2 flex justify-between text-muted">
        <span>lecture progress</span>
        <span className={done ? "text-ok" : "text-ink"}>{done ? "completed ✓" : `${p}%`}</span>
      </div>
      <div className="relative h-3 overflow-hidden bg-bg-2">
        <motion.div className="h-full bg-ok" animate={{ width: `${p}%` }} transition={{ duration: 0.05 }} />
        <div className="absolute top-0 left-[90%] h-full w-px bg-ink/40" />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted">
        <span>0</span>
        <span className="ml-auto pr-[8%]">90% complete</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-px border border-ink/30 bg-ink/30">
        <div className="bg-card px-3 py-2">
          <span className="block text-[10px] text-muted">player updates</span>
          <span className="text-ink">{p}</span>
        </div>
        <div className="bg-card px-3 py-2">
          <span className="block text-[10px] text-muted">saves sent</span>
          <span className="text-accent">{saves}</span>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-muted">
        last save at {savedAt}% · only on Δ ≥ 5%{done ? " · completion from server" : ""}
      </p>
    </div>
  );
}

export function NoteVisual({ kind }: { kind: Note["visual"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="border border-ink bg-card p-4" aria-hidden="true">
      {kind === "fanout" && <Fanout on={on} />}
      {kind === "partial" && <Partial on={on} />}
      {kind === "precision" && <Precision on={on} />}
      {kind === "progress" && <Progress on={on} />}
    </div>
  );
}
