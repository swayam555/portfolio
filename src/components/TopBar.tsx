"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { nav, site } from "@/data/site";
import { DownloadIcon } from "./Icons";

type Theme = "paper" | "blueprint";

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "blueprint" ? "blueprint" : "paper");

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "paper" as Theme);
  const set = (t: Theme) => {
    if (t === "blueprint") document.documentElement.dataset.theme = "blueprint";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };
  return [theme, set] as const;
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: site.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setNow(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);
  return (
    <span className="font-mono text-[11px] tabular-nums" aria-label="Local time in Bengaluru">
      BLR <span className="text-ink">{now ?? "--:--:--"}</span> IST
    </span>
  );
}

export function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  const isBp = theme === "blueprint";
  return (
    <button
      type="button"
      onClick={() => setTheme(isBp ? "paper" : "blueprint")}
      aria-label={`Switch to ${isBp ? "paper" : "blueprint"} theme`}
      aria-pressed={isBp}
      className="group relative flex h-8 items-center border border-ink font-mono text-[10px] tracking-wider uppercase"
    >
      {(["paper", "blueprint"] as const).map((t) => (
        <span key={t} className={`relative z-10 px-2 transition-colors ${theme === t ? "text-on-accent" : "text-muted group-hover:text-ink"}`}>
          {t === "paper" ? "Paper" : "Blueprint"}
        </span>
      ))}
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 bg-accent"
        animate={isBp ? { left: "47%", right: 0 } : { left: 0, right: "53%" }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
    </button>
  );
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = nav.map((n) => n.href.split("#")[1]);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-ink bg-bg/90 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[1400px] items-stretch justify-between px-4 md:px-6">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3 pr-4">
          <span className="display grid size-8 place-items-center bg-ink text-lg text-bg transition-colors group-hover:bg-accent group-hover:text-on-accent">
            SB
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="semi-condensed block text-sm font-bold tracking-tight uppercase">Swayam Bajpai</span>
            <span className="block font-mono text-[10px] text-muted uppercase">Software Engineer</span>
          </span>
        </Link>

        <ul className="hidden items-stretch lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href.split("#")[1];
            return (
              <li key={item.href} className="flex">
                <a
                  href={item.href}
                  className={`relative flex items-center gap-1.5 border-l border-rule px-4 text-sm font-semibold uppercase transition-colors last:border-r ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent">{item.n}</span>
                  {item.label}
                  {isActive && <motion.span layoutId="nav-bar" className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden text-muted xl:inline">
            <Clock />
          </span>
          <span className="hidden md:block">
            <ThemeSwitch />
          </span>
          <a
            href={site.resume}
            download="Swayam_Bajpai_Resume.pdf"
            className="inline-flex h-10 items-center gap-2 bg-ink px-3 font-mono text-[11px] font-medium tracking-wider text-bg uppercase transition-colors hover:bg-accent hover:text-on-accent sm:h-8"
          >
            <DownloadIcon className="size-3.5" /> Résumé
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center border border-ink lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute top-1.5 left-0 h-0.5 w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="graph h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-ink bg-bg px-4 pt-4 pb-10 lg:hidden"
          >
            <ul>
              {nav.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <a href={item.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b border-ink py-3">
                    <span className="display text-5xl">{item.label}</span>
                    <span className="font-mono text-xs text-accent">{item.n}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={site.resume} download="Swayam_Bajpai_Resume.pdf" className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-accent px-4 font-mono text-sm text-on-accent uppercase">
                <DownloadIcon /> Résumé
              </a>
              <ThemeSwitch />
            </div>
            <p className="mt-6 text-muted">
              <Clock />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
