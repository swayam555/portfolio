"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { ContactRows } from "./ContactRows";
import { ResumeCard } from "./ResumeCard";

const ease = [0.22, 1, 0.36, 1] as const;

function Letters({ text, delay }: { text: string; delay: number }) {
  return (
    <span aria-hidden="true" className="block overflow-hidden">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.85, delay: delay + i * 0.045, ease }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

// Thin crosshair with live coordinates. Only for fine pointers.
function Crosshair({ area }: { area: React.RefObject<HTMLElement | null> }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45 });
  const sy = useSpring(y, { stiffness: 600, damping: 45 });
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = area.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      x.set(px);
      y.set(py);
      setPos({ x: Math.round(px), y: Math.round(py) });
    };
    const leave = () => setPos(null);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [area, x, y]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-300 ${pos ? "opacity-100" : "opacity-0"}`}>
      <motion.div className="absolute inset-x-0 top-0 h-px bg-accent/50" style={{ y: sy }} />
      <motion.div className="absolute inset-y-0 left-0 w-px bg-accent/50" style={{ x: sx }} />
      <motion.div className="absolute top-0 left-0 font-mono text-[10px] text-accent" style={{ x: sx, y: sy }}>
        <span className="ml-2 inline-block translate-y-2 bg-bg px-1">
          x {pos?.x ?? 0} · y {pos?.y ?? 0}
        </span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [markOn, setMarkOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMarkOn(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} className="graph relative border-b-2 border-ink pt-14">
      <Crosshair area={ref} />

      {/* Spec-sheet header row */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 border-x border-rule font-mono text-[10px] tracking-[0.14em] text-muted uppercase md:grid-cols-4">
        {[
          ["Doc", "SB / Portfolio · Rev 10.26"],
          ["Role", site.role],
          ["Now", "Fidelity Investments · Plynk"],
          ["Base", site.location],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            className={`border-b border-rule px-4 py-2.5 ${i % 2 ? "" : "border-r"} md:border-r md:last:border-r-0`}
          >
            <span className="text-accent">{k}</span> · <span className="text-ink-2">{v}</span>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 border-x border-rule px-4 pt-10 pb-12 md:px-8 lg:grid-cols-[1fr_380px] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10 lg:pt-14 lg:pb-16">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <h1 className="display text-[clamp(4.6rem,17vw,15rem)]">
            <span className="sr-only">Swayam Bajpai</span>
            <Letters text="Swayam" delay={0.1} />
            <span className="flex items-end gap-4">
              <Letters text="Bajpai" delay={0.35} />
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.95, type: "spring", stiffness: 380, damping: 16 }}
                className="mb-[0.08em] inline-block size-[0.16em] shrink-0 bg-accent"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-8 max-w-3xl text-[clamp(1.15rem,2.1vw,1.6rem)] leading-snug font-medium text-ink-2"
          >
            I build the <span className={`marker text-ink ${markOn ? "on" : ""}`}>money-moving back ends</span> and the screens
            in front of them: Spring Boot microservices and an Angular app at{" "}
            <span className="font-serif text-[1.15em] text-ink italic">Fidelity</span>, and before that a whole edtech platform{" "}
            <span className={`marker text-ink ${markOn ? "on" : ""}`} style={{ transitionDelay: "0.35s" }}>
              shipped to Google Play
            </span>
            .
          </motion.p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ResumeCard />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="max-w-3xl min-w-0 lg:col-start-1 lg:row-start-2"
        >
          <ContactRows />
        </motion.div>
      </div>
    </section>
  );
}
