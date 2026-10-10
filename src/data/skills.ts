export type Group = "Language" | "Back end" | "Front end" | "Data" | "Cloud" | "Testing";

export type Element = { sym: string; name: string; group: Group; used: string };

// A periodic table of the stack. "used" says where it was used, so every cell is backed by real work.
export const elements: Element[] = [
  { sym: "Jv", name: "Java", group: "Language", used: "Fidelity services · MediSync · FinTafsir · FinTrack" },
  { sym: "Ts", name: "TypeScript", group: "Language", used: "Plynk app · Marine Edge · Taska" },
  { sym: "Js", name: "JavaScript", group: "Language", used: "Most Node projects · ClaimSense" },
  { sym: "Go", name: "Go", group: "Language", used: "GoMicroHub" },
  { sym: "Py", name: "Python", group: "Language", used: "JobApp · RAG · Logwise · Repo Pilot · IMS" },
  { sym: "Sq", name: "SQL", group: "Language", used: "Oracle · PostgreSQL" },

  { sym: "Sb", name: "Spring Boot", group: "Back end", used: "9 Fidelity codebases · MediSync · FinTafsir · FinTrack" },
  { sym: "Nd", name: "Node.js", group: "Back end", used: "TorrentShare · GraphEcomX · Taska · Procuro · Payeazie" },
  { sym: "Ex", name: "Express", group: "Back end", used: "DivvyMate · NexRule · FortFile" },
  { sym: "Gq", name: "GraphQL", group: "Back end", used: "GraphEcomX · GoMicroHub" },
  { sym: "Ws", name: "WebSockets", group: "Back end", used: "Real-time quotes · SkyMetrics · IMS" },
  { sym: "Rt", name: "WebRTC", group: "Back end", used: "LiveKit classes" },
  { sym: "Fa", name: "FastAPI", group: "Back end", used: "Medical intake · Logwise · ClaimSense · Repo Pilot · IMS" },

  { sym: "Ng", name: "Angular", group: "Front end", used: "Plynk app · Marine Edge Android" },
  { sym: "Si", name: "Signals", group: "Front end", used: "Zoneless Plynk rebuild" },
  { sym: "Nx", name: "NgRx", group: "Front end", used: "13 stores · Signal Store" },
  { sym: "Re", name: "React", group: "Front end", used: "Marine Edge web · dashboards · Procuro · Payeazie" },
  { sym: "Nj", name: "Next.js", group: "Front end", used: "Marine Edge · this site" },
  { sym: "Tq", name: "TanStack Query", group: "Front end", used: "22 hook modules" },
  { sym: "Tw", name: "Tailwind", group: "Front end", used: "Marine Edge · this site" },
  { sym: "A11", name: "WCAG 2.2", group: "Front end", used: "Account opening" },

  { sym: "Or", name: "Oracle", group: "Data", used: "Fidelity" },
  { sym: "Pg", name: "PostgreSQL", group: "Data", used: "Marine Edge · TorrentShare · MediSync · FinTrack · Procuro · Repo Pilot" },
  { sym: "Mg", name: "MongoDB", group: "Data", used: "GraphEcomX · NexRule · IMS" },
  { sym: "Rd", name: "Redis", group: "Data", used: "Leases · caching · IMS · Payeazie" },
  { sym: "Kf", name: "Kafka", group: "Data", used: "Fidelity consumers · 7 projects" },
  { sym: "Qs", name: "AWS SQS", group: "Data", used: "Document pipeline" },

  { sym: "Ek", name: "AWS EKS", group: "Cloud", used: "Blue/green, 2 regions" },
  { sym: "S3", name: "AWS S3", group: "Cloud", used: "2 GB presigned uploads" },
  { sym: "Dk", name: "Docker", group: "Cloud", used: "Every service" },
  { sym: "K8", name: "Kubernetes", group: "Cloud", used: "EKS workloads" },
  { sym: "Tf", name: "Terraform", group: "Cloud", used: "Fidelity infra" },
  { sym: "Jk", name: "Jenkins", group: "Cloud", used: "Fidelity · DevLab · IMS" },
  { sym: "Dd", name: "Datadog", group: "Cloud", used: "APM + PII scrubbing" },
  { sym: "Oc", name: "Oracle Cloud", group: "Cloud", used: "Marine Edge image storage" },

  { sym: "Ju", name: "JUnit", group: "Testing", used: "Spring services · MediSync" },
  { sym: "Mk", name: "Mockito", group: "Testing", used: "Spring services" },
  { sym: "Je", name: "Jest", group: "Testing", used: "160+ specs" },
  { sym: "Pw", name: "Playwright", group: "Testing", used: "Accessibility audits" },
  { sym: "Vt", name: "Vitest", group: "Testing", used: "Front-end tests · Payeazie" },
];

export const groups: Group[] = ["Language", "Back end", "Front end", "Data", "Cloud", "Testing"];
