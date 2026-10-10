import { notes } from "@/data/notes";
import { NoteVisual } from "./NoteVisual";
import { Chapter, Reveal } from "./Reveal";

export function Notes() {
  return (
    <section id="notes" className="graph border-y-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <Chapter n="02" title="Field notes" meta="Problems from production" />
        <div className="border-t border-ink">
          {notes.map((n, i) => (
            <Reveal
              as="article"
              key={n.id}
              className="grid gap-6 border-b border-ink py-10 md:grid-cols-[90px_1fr_minmax(0,420px)] md:gap-10 md:py-14"
            >
              <span className="display text-6xl text-accent md:text-7xl">N°{i + 1}</span>
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{n.where}</p>
                <h3 className="display mt-2 text-[clamp(2rem,4.2vw,3.4rem)]">{n.title}</h3>
                <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                  {[
                    ["Problem", n.problem],
                    ["Fix", n.fix],
                    ["Outcome", n.outcome],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t-2 border-ink pt-2">
                      <dt className={`font-mono text-[11px] tracking-wider uppercase ${k === "Outcome" ? "text-accent" : "text-muted"}`}>{k}</dt>
                      <dd className={`mt-1 text-[15px] leading-relaxed ${k === "Outcome" ? "font-semibold text-ink" : "text-ink-2"}`}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <NoteVisual kind={n.visual} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
