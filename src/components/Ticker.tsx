import { caseStudies, projectIndex } from "@/data/projects";

const items = [
  "9 codebases at Fidelity",
  "7 back-office calls → 1 parallel request",
  "HTTP 207 partial success",
  "14 Play Store builds",
  "0% → 100% exam saves",
  "Terraform blue/green on AWS EKS",
  "WCAG 2.2 · 3 languages",
  "Kafka · gRPC · SQS · WebSockets · WebRTC",
  `${projectIndex.length} projects · ${caseStudies.length} case studies`,
];

export function Ticker() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 whitespace-nowrap">
          <span className="display text-2xl md:text-3xl">{t}</span>
          <span className="size-2.5 rotate-45 bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ticker-wrap overflow-hidden border-b-2 border-ink bg-ink py-3 text-bg" role="marquee" aria-label="Highlights">
      <div className="ticker flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
