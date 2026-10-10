import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-bg">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-8">
        <p className="display text-[clamp(3rem,12vw,9rem)] leading-[0.8]">
          Swayam<span className="text-accent">.</span>
        </p>
        <div className="space-y-1 font-mono text-[11px] tracking-wider uppercase md:text-right">
          <p>
            <a href={site.phoneHref} className="inline-block py-1.5 hover:text-accent">
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="inline-block py-1.5 hover:text-accent">
              {site.email}
            </a>
          </p>
          <p className="opacity-60">Set in Archivo &amp; IBM Plex Mono · Built with Next.js, Tailwind &amp; Motion</p>
          <p className="opacity-60">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
