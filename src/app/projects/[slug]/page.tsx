import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: `${p.name}: case study`, description: p.summary },
  };
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-b border-ink py-10 md:grid-cols-[220px_1fr] md:gap-10 md:py-14">
      <Reveal>
        <p className="font-mono text-[11px] tracking-wider text-accent uppercase">§{n}</p>
        <h2 className="display mt-1 text-4xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.05} className="min-w-0 text-[17px] leading-relaxed text-ink-2">
        {children}
      </Reveal>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const p = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article>
      <header className="graph border-b-2 border-ink pt-14">
        <div className="mx-auto max-w-[1400px] border-x border-rule px-4 pt-8 pb-12 md:px-8 md:pt-12">
          <Link href="/#index" className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase hover:text-accent">
            <ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" /> All projects
          </Link>
          <div className="mt-8 grid grid-cols-2 border-t-2 border-l border-ink font-mono text-[10px] tracking-wider uppercase md:grid-cols-4">
            {[
              ["Case study", `CS/${String(idx + 1).padStart(2, "0")}`],
              ["Status", p.status],
              ["Type", p.category],
              ["Year", p.year],
            ].map(([k, v]) => (
              <div key={k} className="border-r border-b border-ink px-3 py-2">
                <span className="text-muted">{k}</span>
                <span className="mt-0.5 block text-xs font-semibold text-ink">{v}</span>
              </div>
            ))}
          </div>
          <Reveal>
            <h1 className="display mt-8 text-[clamp(3.6rem,13vw,11rem)]">{p.name}</h1>
            <p className="mt-3 max-w-3xl font-serif text-2xl text-ink-2 italic md:text-3xl">{p.tagline}</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">{p.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex h-11 items-center gap-2 border-2 border-ink px-4 font-mono text-xs font-semibold tracking-wider uppercase transition-colors ${
                    i === 0 ? "border-accent bg-accent text-on-accent hover:brightness-110" : "hover:bg-ink hover:text-bg"
                  }`}
                >
                  {l.label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
              {p.links.length === 0 && (
                <span className="inline-flex h-11 items-center border-2 border-dashed border-ink px-4 font-mono text-xs tracking-wider uppercase">
                  Private repo · walkthrough on request
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ul className="grid grid-cols-2 border-l border-ink md:grid-cols-4">
          {p.highlights.map((h) => (
            <li key={h} className="semi-condensed border-r border-b border-ink p-4 text-lg font-bold uppercase md:p-5 md:text-xl">
              {h}
            </li>
          ))}
        </ul>

        <Block n="1" title="The problem">
          <p>{p.problem}</p>
        </Block>
        <Block n="2" title="My role">
          <p>{p.role}</p>
        </Block>
        <Block n="3" title="Architecture">
          <ArchitectureDiagram diagram={p.diagram} title={p.name} />
        </Block>
        <Block n="4" title="Key decisions">
          <ol className="grid gap-px border border-ink bg-ink sm:grid-cols-2">
            {p.decisions.map((d, i) => (
              <li key={d.title} className={`bg-card p-5 ${i === p.decisions.length - 1 && p.decisions.length % 2 === 1 ? "sm:col-span-2" : ""}`}>
                <p className="font-mono text-[11px] text-accent">D/{String(i + 1).padStart(2, "0")}</p>
                <h3 className="semi-condensed mt-1 text-lg font-bold text-ink uppercase">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{d.body}</p>
              </li>
            ))}
          </ol>
        </Block>
        <Block n="5" title="Challenges">
          <ul className="space-y-4">
            {p.challenges.map((c) => (
              <li key={c} className="grid grid-cols-[20px_1fr]">
                <span className="mt-[9px] size-2 bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Block>
        {p.image && (
          <Block n="6" title="In action">
            <figure className="border-2 border-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image.src} alt={p.image.alt} loading="lazy" className="block h-auto w-full" width={1600} height={741} />
              <figcaption className="border-t border-ink bg-card px-4 py-2.5 font-mono text-xs text-muted">{p.image.caption}</figcaption>
            </figure>
          </Block>
        )}
        <Block n={p.image ? "7" : "6"} title="Stack">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="border border-ink px-2.5 py-1 font-mono text-xs text-ink">
                {s}
              </li>
            ))}
          </ul>
        </Block>

        <Link href={`/projects/${next.slug}/`} className="group my-16 flex items-center justify-between gap-6 border-2 border-ink p-6 transition-colors hover:bg-ink hover:text-bg md:p-8">
          <div>
            <p className="font-mono text-[11px] tracking-wider text-accent uppercase">Next case study</p>
            <p className="display mt-1 text-5xl md:text-7xl">{next.name}</p>
            <p className="mt-1 text-ink-2 group-hover:text-bg/80">{next.tagline}</p>
          </div>
          <ArrowRight className="size-8 shrink-0 text-accent transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}
