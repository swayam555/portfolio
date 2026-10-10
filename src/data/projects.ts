export type NodeKind = "client" | "service" | "data" | "event" | "external";

export type Diagram = {
  width: number;
  height: number;
  nodes: { id: string; label: string; sub?: string; x: number; y: number; kind: NodeKind }[];
  edges: { from: string; to: string; label?: string; both?: boolean }[];
};

export type Category = "Systems" | "Full-stack" | "AI" | "DevOps" | "Front end";

export type CaseStudy = {
  slug: string;
  name: string;
  status: "Production" | "Personal project" | "Private repo";
  category: Category;
  tagline: string;
  summary: string;
  year: string;
  stack: string[];
  links: { label: string; href: string }[];
  highlights: string[];
  problem: string;
  role: string;
  decisions: { title: string; body: string }[];
  challenges: string[];
  diagram: Diagram;
  image?: { src: string; alt: string; caption: string };
};

const caseStudyList: CaseStudy[] = [
  {
    slug: "marine-edge",
    name: "Marine Edge",
    status: "Production",
    category: "Front end",
    tagline: "Edtech platform for Merchant Navy exam prep, on web and Android",
    summary:
      "A learning platform on web and Android: a Next.js web app with 4 role-based portals and free public tools, and an Angular Android app on Google Play, with live WebRTC classes, Razorpay checkout and lockdown exams.",
    year: "2024 — 2025",
    stack: ["Next.js", "React", "TanStack Query", "Angular", "Ionic", "Capacitor", "NgRx", "LiveKit", "Razorpay"],
    links: [{ label: "marineedge.in", href: "https://marineedge.in" }],
    highlights: ["140+ routes", "49 mobile screens", "14 Play Store builds", "0% → 100% exam saves"],
    problem:
      "Merchant Navy aspirants needed one place for recorded lectures, live classes, study material and mock exams on any device. Exams had to be hard to cheat on, content hard to pirate, and purchases started in the app had to follow Google Play billing rules.",
    role: "Front-end and mobile engineer in a three-person team: built the Android app end to end and its releases, and the public tools, student and staff portals and checkout on the web platform.",
    decisions: [
      { title: "TanStack Query as the data layer", body: "22 hook modules with hierarchical cache keys, invalidated on mutation. Server state lives in one place; Zustand holds only true client state." },
      { title: "Don't retry what can't succeed", body: "4xx responses are never retried (they used to spin for ~7 s). AbortController timeouts stop a stalled proxy from hanging the UI." },
      { title: "Uploads that bypass the API", body: "Presigned direct-to-S3 uploads up to 2 GB, multipart above 100 MB with per-part ETags. XHR instead of fetch for real progress bars." },
      { title: "Checkout that respects Play policy", body: "The app hands purchases to web checkout with the student already logged in. The handoff token is scoped to the API path and lives an hour, so it beats a stale web login without shadowing a later one." },
      { title: "Native where it matters", body: "Capacitor plugins for offline downloads, push, deep links and a per-route privacy screen; everything else stays shared Angular code." },
      { title: "Tools before signup", body: "A 4-step eligibility wizard, BMI calculator and colour-blindness test give aspirants a reason to visit before they pay, and feed SEO." },
    ],
    challenges: [
      "0 of 49 exam attempt IDs survived the native bridge: 18-digit IDs lost precision as JS numbers. Keeping IDs as strings end to end took exam saves from 0% to 100%.",
      "A 401 on /me redirected to login, which called /me again: an infinite loop that blanked the app. The error interceptor now leaves /me to the auth guards.",
      "Exam integrity: fullscreen lockdown, 7 tracked violation types, a soft warning, auto-termination after 3 strikes, and a staff dashboard to review violations.",
      "Screenshot blocking applied per route (videos, materials, exams, live classes) so the rest of the app behaves normally.",
    ],
    diagram: {
      width: 820,
      height: 400,
      nodes: [
        { id: "web", label: "Web app", sub: "Next.js · 4 portals", x: 100, y: 90, kind: "client" },
        { id: "mob", label: "Android app", sub: "Angular · NgRx", x: 100, y: 300, kind: "client" },
        { id: "nginx", label: "nginx", sub: "Oracle Cloud", x: 300, y: 195, kind: "service" },
        { id: "api", label: "Go API", sub: "RBAC · cron", x: 500, y: 195, kind: "service" },
        { id: "db", label: "PostgreSQL", sub: "GORM", x: 710, y: 70, kind: "data" },
        { id: "obj", label: "S3", sub: "presigned", x: 710, y: 195, kind: "data" },
        { id: "rzp", label: "Razorpay", sub: "HMAC + webhook", x: 710, y: 320, kind: "external" },
        { id: "lk", label: "LiveKit", sub: "WebRTC", x: 300, y: 350, kind: "external" },
      ],
      edges: [
        { from: "web", to: "nginx" },
        { from: "mob", to: "nginx" },
        { from: "nginx", to: "api" },
        { from: "api", to: "db" },
        { from: "api", to: "obj", label: "sign" },
        { from: "api", to: "rzp", both: true },
        { from: "mob", to: "lk", both: true },
      ],
    },
  },
  {
    slug: "torrentshare",
    name: "TorrentShare",
    status: "Personal project",
    category: "Systems",
    tagline: "Peer-assisted artifact distribution for GPU fleets and MLOps pipelines",
    summary:
      "When 50 nodes pull the same 70 GB model at once, TorrentShare fetches the bytes once, verifies them chunk by chunk, and spreads them peer to peer across the VPC. It runs on its own BitTorrent engine: bencode, trackers, a Kademlia DHT and the peer wire protocol, written from scratch. Formerly TorrentEdge.",
    year: "2024 — 2026",
    stack: ["Node.js", "Kafka", "PostgreSQL", "Redis", "Docker", "Prometheus", "OpenTelemetry", "Nginx"],
    links: [
      { label: "GitHub", href: "https://github.com/swayam555/TorrentShare" },
      { label: "Dashboard UI", href: "https://github.com/swayam555/torrentshare-UI" },
    ],
    highlights: ["Native BitTorrent engine", "Redis fencing tokens", "SHA-256 CAS dedup", "462 Jest tests"],
    problem:
      "A GPU fleet pulling the same large artifact at the same time saturates NAT gateways and VPC endpoints, multiplies egress cost, and leaves every job waiting on the slowest download.",
    role: "Design and implementation of the control plane, the worker data plane, the lease protocol and the observability stack.",
    decisions: [
      { title: "Own the protocol", body: "Instead of wrapping a torrent library, the engine implements bencode, .torrent parsing and creation, magnet links, tracker announces, a Kademlia DHT routing table, the peer wire and extension protocols, and piece selection, so every byte path can be measured and controlled." },
      { title: "Separate control and data planes", body: "A stateless REST control plane owns orchestration with PostgreSQL as the ACID source of truth; horizontally scalable workers do the heavy lifting." },
      { title: "Crash-only workers with leases", body: "Redis SETNX leases with fencing tokens let a replacement worker resume an abandoned transfer without split-brain writes." },
      { title: "Content-addressable storage", body: "Verified chunks are stored by SHA-256 digest and materialised with symlinks, so identical data is deduplicated across transfers." },
      { title: "Kafka as the directive bus", body: "The API publishes JOB_ASSIGNED directives to partitioned consumers, so API latency is independent of transfer work." },
      { title: "Retry-safe by design", body: "X-Request-ID flows from REST ingress through Kafka metadata, so a CI/CD retry is recognised as a retry, not a new deployment." },
    ],
    challenges: [
      "Stopping two workers writing the same chunk after a partition: fencing tokens let storage reject a stale lease holder.",
      "Tracing across an async boundary: W3C trace context is carried through Kafka headers into workers and CAS writes.",
      "Prometheus metrics for queue depth, lease activity, CAS hit rate and deduplicated bytes, with Grafana dashboards.",
      "Downloads survive restarts: piece state is checkpointed and resumed, and upload and download are throttled per transfer.",
      "Moved from MongoDB to PostgreSQL (Sequelize) for transfers, chunks and nodes, because chunk ownership and lease state need transactions.",
    ],
    diagram: {
      width: 920,
      height: 420,
      nodes: [
        { id: "ci", label: "CI/CD pipeline", sub: "POST /torrent/create", x: 85, y: 210, kind: "client" },
        { id: "api", label: "Control plane", sub: "stateless REST", x: 280, y: 210, kind: "service" },
        { id: "pg", label: "PostgreSQL", sub: "ACID state", x: 280, y: 60, kind: "data" },
        { id: "k", label: "Kafka", sub: "jobs.dispatch", x: 490, y: 210, kind: "event" },
        { id: "w1", label: "Worker A", x: 680, y: 100, kind: "service" },
        { id: "w2", label: "Worker B", x: 680, y: 320, kind: "service" },
        { id: "redis", label: "Redis", sub: "leases + fencing", x: 490, y: 370, kind: "data" },
        { id: "cas", label: "CAS volume", sub: "SHA-256 chunks", x: 840, y: 210, kind: "data" },
      ],
      edges: [
        { from: "ci", to: "api" },
        { from: "api", to: "pg" },
        { from: "api", to: "k", label: "directive" },
        { from: "k", to: "w1" },
        { from: "k", to: "w2" },
        { from: "w1", to: "w2", both: true, label: "peers" },
        { from: "w2", to: "redis", both: true },
        { from: "w1", to: "cas" },
        { from: "w2", to: "cas" },
      ],
    },
    image: {
      src: "/projects/torrentshare-grafana.png",
      alt: "Grafana dashboard showing TorrentShare transfer throughput, queue lag, active workers, request rate and P95 latency",
      caption: "Grafana overview: throughput, queue lag, worker count and P95 latency per route.",
    },
  },
  {
    slug: "jobapp",
    name: "JobApp",
    status: "Private repo",
    category: "AI",
    tagline: "A semi-automated job-application pipeline with an AI résumé tailor",
    summary:
      "Scrapes LinkedIn, Indeed, Naukri, Greenhouse and Workday, scores each job against my profile, rewrites a LaTeX résumé and cover letter per job with an LLM, and fills application forms. It's all driven from a Chrome-extension dashboard.",
    year: "2026",
    stack: ["Python", "Flask", "SQLAlchemy", "Selenium", "spaCy", "OpenRouter LLM", "LaTeX", "Chrome extension"],
    links: [],
    highlights: ["5 job portals", "spaCy skill scoring", "LLM résumé per job", "7-tab extension UI"],
    problem:
      "Applying to jobs is repetitive: find postings, judge fit, tailor a résumé, write a cover letter, and fill the same form fields again and again on every portal.",
    role: "Sole developer: scrapers, matching engine, LLM résumé and cover-letter generation, form-filling engine, REST API and the extension dashboard.",
    decisions: [
      { title: "Human in the loop", body: "Scraped jobs land in a dashboard and I pick what to apply to. Automation fills forms; it doesn't spray applications." },
      { title: "Weighted skill matching", body: "spaCy NER scoring weighted 70% technical and 30% soft skills, with exact, synonym and related-match breakdowns per job." },
      { title: "Answers from cheapest source first", body: "Form answers resolve from config, then a DB cache of past answers, then the LLM, so repeat questions cost nothing." },
      { title: "LaTeX as the résumé source", body: "A master LaTeX résumé is rewritten per job description and compiled to PDF; the system degrades gracefully if LaTeX is missing." },
    ],
    challenges: [
      "Registration walls: detects them, auto-creates portal accounts and captures OTPs from email.",
      "Multi-user JWT auth with bcrypt and access/refresh token pairs, plus interview reminders over email and Telegram 60 minutes before.",
    ],
    diagram: {
      width: 820,
      height: 380,
      nodes: [
        { id: "portals", label: "Job portals", sub: "5 sources", x: 90, y: 90, kind: "external" },
        { id: "scr", label: "Scrapers", sub: "Selenium", x: 280, y: 90, kind: "service" },
        { id: "db", label: "SQL DB", sub: "jobs · answers", x: 470, y: 90, kind: "data" },
        { id: "match", label: "Matcher", sub: "spaCy 70/30", x: 470, y: 250, kind: "service" },
        { id: "ext", label: "Extension", sub: "7-tab dashboard", x: 90, y: 280, kind: "client" },
        { id: "api", label: "Flask API", sub: "JWT", x: 280, y: 280, kind: "service" },
        { id: "llm", label: "LLM", sub: "résumé + letter", x: 680, y: 170, kind: "external" },
        { id: "fill", label: "Form filler", sub: "config → cache → AI", x: 680, y: 320, kind: "service" },
      ],
      edges: [
        { from: "portals", to: "scr" },
        { from: "scr", to: "db" },
        { from: "db", to: "match" },
        { from: "ext", to: "api", both: true },
        { from: "api", to: "match" },
        { from: "match", to: "llm" },
        { from: "match", to: "fill" },
      ],
    },
  },
  {
    slug: "ims",
    name: "IMS",
    status: "Personal project",
    category: "Systems",
    tagline: "Incident management that collapses alert storms into one incident",
    summary:
      "Error signals from monitored services hit a FastAPI endpoint that answers 202 straight away, buffer in Kafka, and are debounced by a worker into deduplicated incidents. Each incident follows a strict lifecycle with mandatory RCA, and a React dashboard updates live over WebSockets.",
    year: "2026",
    stack: ["Python", "FastAPI", "Kafka (Redpanda)", "Redis", "PostgreSQL", "MongoDB", "React", "WebSockets", "Caddy", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/IMS" }],
    highlights: ["202 on the hot path", "100 signals / 10 s → 1 incident", "Survives a Kafka outage", "30-min SLA → P0"],
    problem:
      "When a dependency fails, every service that uses it fires the same error thousands of times. Writing each signal straight to the database overloads it, and opening an incident per signal buries the on-call engineer. The design target was 10,000 signals per second without losing any.",
    role: "Sole developer: ingestion API, Kafka worker, debounce logic, incident state machine, React dashboard, failure-simulation scripts and the Docker + Caddy deployment.",
    decisions: [
      { title: "Accept fast, process later", body: "The API validates, rate-limits in Redis, produces to Kafka and returns 202. Database speed never shows up in ingestion latency; bursts queue in the topic." },
      { title: "One store per job", body: "PostgreSQL holds incident state, RCA and the audit trail (ACID). MongoDB takes raw signals of any shape, deduplicated by a unique event_id index. Redis does counters, rate limits and pub/sub." },
      { title: "Debounce in Redis", body: "A per-component counter expires after 10 s. At 100 signals, SET NX lets exactly one worker create the incident, even with several workers consuming." },
      { title: "Lifecycle as a state machine", body: "OPEN → INVESTIGATING → RESOLVED → CLOSED, one class per state. Closing without a complete RCA returns 400, and a partial unique index (state != 'CLOSED') stops a second open incident for the same component." },
      { title: "Severity by strategy", body: "An AlertStrategy per component type (database, queue, cache, API, MCP host…) decides severity and dispatch, so a new type is a new class, not another if-branch." },
    ],
    challenges: [
      "Broker outage: if the produce fails, the API pushes the signal onto a Redis list and still returns 202. A background task drains it back into Kafka when the broker returns. A script stops Redpanda to prove it.",
      "Poison messages (bad JSON, missing fields) go to an ims.signals.dlq topic instead of stalling the consumer, with a replay script to feed them back.",
      "Incidents still open after 30 minutes are escalated to P0 by a worker loop and logged as SLA_BREACH events.",
      "Live updates: the worker publishes snapshots on Redis pub/sub and the API fans them out to every dashboard over WebSockets.",
    ],
    diagram: {
      width: 900,
      height: 420,
      nodes: [
        { id: "apps", label: "Monitored apps", sub: "POST /api/signals", x: 90, y: 210, kind: "external" },
        { id: "ui", label: "Dashboard", sub: "React · live", x: 90, y: 360, kind: "client" },
        { id: "api", label: "FastAPI", sub: "202 · rate limit", x: 270, y: 210, kind: "service" },
        { id: "k", label: "Kafka", sub: "ims.signals", x: 450, y: 80, kind: "event" },
        { id: "redis", label: "Redis", sub: "buffer · pub/sub", x: 450, y: 340, kind: "data" },
        { id: "w", label: "Worker", sub: "debounce · SLA", x: 630, y: 80, kind: "service" },
        { id: "mg", label: "MongoDB", sub: "raw signals", x: 810, y: 80, kind: "data" },
        { id: "pg", label: "PostgreSQL", sub: "incidents · RCA", x: 810, y: 230, kind: "data" },
      ],
      edges: [
        { from: "apps", to: "api" },
        { from: "api", to: "k", label: "produce" },
        { from: "api", to: "redis", both: true, label: "fallback" },
        { from: "k", to: "w" },
        { from: "w", to: "mg" },
        { from: "w", to: "pg", label: "incident" },
        { from: "w", to: "redis", label: "count · pub" },
        { from: "api", to: "ui", label: "WebSocket" },
      ],
    },
  },
  {
    slug: "payeazie",
    name: "Payeazie",
    status: "Personal project",
    category: "Full-stack",
    tagline: "Payment operations: async charging, recovery tools and a full audit trail",
    summary:
      "A Fastify API creates payments idempotently and hands charging to BullMQ workers. Every status change goes through one transition model with an audit record, and an internal ops dashboard lets operators retry, reconcile and refund stuck or failed payments.",
    year: "2026",
    stack: ["Node.js", "Fastify", "BullMQ", "Redis", "PostgreSQL", "React", "TypeScript", "Vitest"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/payeazie" }],
    highlights: ["2 background workers", "5 payment states", "Audit row per transition", "44 Vitest cases"],
    problem:
      "Charging a card inside the HTTP request makes checkout as slow as the gateway, and a timeout leaves nobody sure whether the customer paid. Payments that get stuck need a safe way for an operator to fix them, with a record of who did what.",
    role: "Sole developer: API, workers, status model, auth (JWT, Google OAuth, password reset), the merchant UI and the internal ops dashboard.",
    decisions: [
      { title: "Idempotent payment intents", body: "One CTE returns the existing payment for (order, idempotency key) or inserts a new one. Reusing a key with a different payload is 409; paying an order that's already processing or paid is 422." },
      { title: "API and workers split", body: "The API persists the payment as pending and enqueues a charge job (5 attempts, exponential backoff from 250 ms). The gateway call happens in a worker, never in the request." },
      { title: "No double charges", body: "The charge worker selects the payment with FOR UPDATE SKIP LOCKED, so two workers can never pick up the same payment." },
      { title: "One source of truth for status", body: "pending → processing → succeeded / failed, succeeded → refunded, failed → pending for a retry. Finality, retryability and refundability all come from the same module." },
      { title: "Role-aware surfaces", body: "Merchants see their own payments; admin and ops roles see all of them plus recovery actions, each attributed to the operator in the audit log." },
    ],
    challenges: [
      "Stuck payments: a reconcile worker sweeps payments that aren't in a final state and asks the gateway what really happened. Operators can also restart or reconcile one by hand.",
      "Testing failure paths without a real gateway: a mock gateway and webhook simulator force success, failure or slow processing on demand.",
      "Hardening the API with Helmet, rate limiting and secure sessions, plus health and metrics endpoints for basic operational visibility.",
    ],
    diagram: {
      width: 880,
      height: 380,
      nodes: [
        { id: "ui", label: "React app", sub: "merchant + ops", x: 90, y: 190, kind: "client" },
        { id: "api", label: "Fastify API", sub: "JWT · OAuth", x: 270, y: 190, kind: "service" },
        { id: "pg", label: "PostgreSQL", sub: "payments · audit", x: 470, y: 60, kind: "data" },
        { id: "q", label: "BullMQ", sub: "Redis", x: 470, y: 190, kind: "event" },
        { id: "cw", label: "Charge worker", sub: "SKIP LOCKED", x: 640, y: 100, kind: "service" },
        { id: "rw", label: "Reconciler", sub: "worker · stuck sweep", x: 640, y: 300, kind: "service" },
        { id: "gw", label: "Gateway", sub: "mock", x: 800, y: 200, kind: "external" },
      ],
      edges: [
        { from: "ui", to: "api", both: true },
        { from: "api", to: "pg" },
        { from: "api", to: "q", label: "enqueue" },
        { from: "q", to: "cw" },
        { from: "q", to: "rw" },
        { from: "cw", to: "pg" },
        { from: "cw", to: "gw" },
        { from: "rw", to: "gw" },
      ],
    },
  },
  {
    slug: "medisync",
    name: "MediSync",
    status: "Personal project",
    category: "Systems",
    tagline: "Patient-management back end as Spring Boot microservices with gRPC and Kafka",
    summary:
      "An API gateway checks JWTs and routes to the auth and patient services. Creating a patient opens a billing account over gRPC and publishes a Protobuf event to Kafka for analytics. Each service owns its PostgreSQL database, and the AWS infrastructure is written in CDK and deployed to LocalStack.",
    year: "2026",
    stack: ["Java 21", "Spring Boot", "Spring Cloud Gateway", "gRPC", "Protobuf", "Kafka", "PostgreSQL", "AWS CDK", "LocalStack", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/MediSync" }],
    highlights: ["5 services", "gRPC + Kafka", "Database per service", "ECS · RDS · MSK in CDK"],
    problem:
      "Patient records, authentication and billing change at different speeds and carry different risks. In one application, a billing change can take down the patient API, and every module reads and writes the same database.",
    role: "Built the five services, the gateway's JWT filter, the Protobuf contracts, the CDK stack and the integration tests.",
    decisions: [
      { title: "Authenticate once, at the edge", body: "A Spring Cloud Gateway filter rejects requests without a Bearer token and calls auth-service /validate before forwarding patient routes. Login and register stay public." },
      { title: "Sync when you need the answer", body: "Opening a billing account is a blocking gRPC call because the patient flow needs the result. The patient-created event goes to Kafka because nobody waits on it." },
      { title: "Protobuf on both channels", body: "The same .proto schemas type the gRPC calls and the Kafka payloads (sent as bytes), so producer and consumer share one contract." },
      { title: "Database per service", body: "Auth and patient each have their own PostgreSQL instance. Nothing joins across them; tests run on H2." },
      { title: "Infrastructure as code", body: "A Java CDK stack defines the VPC, two RDS PostgreSQL databases, an MSK cluster, ECS Fargate services and an ALB in front of the gateway, deployed to LocalStack so it runs without an AWS bill." },
    ],
    challenges: [
      "Create and update need different rules: registeredDate is required on create only, handled with a Bean Validation group instead of two DTOs.",
      "Updating a patient with the same email used to fail the uniqueness check; the query now excludes the patient's own row (existsByEmailAndIdNot).",
      "End-to-end tests with REST Assured log in through the gateway and call the patient API with the returned token.",
      "Next step: billing returns a placeholder account today. Persisting accounts and adding gRPC deadlines and retries comes next.",
    ],
    diagram: {
      width: 880,
      height: 420,
      nodes: [
        { id: "c", label: "Client", sub: "REST", x: 90, y: 210, kind: "client" },
        { id: "gw", label: "API gateway", sub: "JWT filter", x: 260, y: 210, kind: "service" },
        { id: "auth", label: "Auth service", sub: "JWT · BCrypt", x: 450, y: 70, kind: "service" },
        { id: "adb", label: "Auth DB", sub: "PostgreSQL", x: 650, y: 70, kind: "data" },
        { id: "pat", label: "Patient service", sub: "REST · CRUD", x: 450, y: 240, kind: "service" },
        { id: "pdb", label: "Patient DB", sub: "PostgreSQL", x: 450, y: 370, kind: "data" },
        { id: "bill", label: "Billing service", sub: "gRPC server", x: 650, y: 190, kind: "service" },
        { id: "k", label: "Kafka", sub: "Protobuf events", x: 650, y: 330, kind: "event" },
        { id: "an", label: "Analytics", sub: "consumer", x: 800, y: 330, kind: "service" },
      ],
      edges: [
        { from: "c", to: "gw" },
        { from: "gw", to: "auth", both: true, label: "validate" },
        { from: "gw", to: "pat" },
        { from: "auth", to: "adb" },
        { from: "pat", to: "pdb" },
        { from: "pat", to: "bill", label: "gRPC" },
        { from: "pat", to: "k", label: "patient" },
        { from: "k", to: "an" },
      ],
    },
  },
  {
    slug: "repo-pilot",
    name: "Repo Pilot",
    status: "Personal project",
    category: "Systems",
    tagline: "Payment-event ingestion and reconciliation that survives duplicates",
    summary:
      "A FastAPI service that ingests payment lifecycle events, keeps every transaction's current status, and reports reconciliation summaries and discrepancies computed in SQL. Duplicate and out-of-order events don't corrupt state.",
    year: "2026",
    stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "SQLite", "pytest", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/repo-pilot" }],
    highlights: ["11,000+ seeded events", "500 planted duplicates", "3 discrepancy checks", "2 queries per detail view"],
    problem:
      "Payment partners send webhooks at least once and not always in order. Reconciliation has to count each event exactly once, keep the right final status, and flag transactions whose history doesn't add up.",
    role: "Sole developer: data model, ingestion, reconciliation queries, migrations, the data generator, tests and the small dashboard pages.",
    decisions: [
      { title: "event_id is the primary key", body: "Deduplication happens in the database. A duplicate gets 200 with the stored event rather than 409, because webhook senders treat errors as a reason to retry. A racing insert hits IntegrityError and rolls back." },
      { title: "Late events can't rewind status", body: "A transaction's status only changes when the event's timestamp is at or after its current updated_at." },
      { title: "Aggregate in SQL", body: "The summary is one GROUP BY over date, merchant and status. No Python loops over rows." },
      { title: "No N+1 queries", body: "The detail view uses joinedload for the merchant and selectinload for the events: two queries in total, however long the history." },
      { title: "Easy to run, real in production", body: "SQLite when DATABASE_URL is unset, PostgreSQL in Docker, Alembic migrations for both, and a composite (status, merchant_id) index." },
    ],
    challenges: [
      "Finding discrepancies in SQL: settled transactions with a payment_failed event (an EXISTS subquery), payments stuck in initiated or processed for over 48 hours, and transactions with more than one terminal event.",
      "Timezone-aware timestamps are normalised to naive UTC so comparisons behave the same in SQLite and PostgreSQL.",
      "A generator writes 11,000+ events, including failures, discrepancies and 500 deliberate duplicates, and a seeder replays them through the API to check idempotency end to end.",
    ],
    diagram: {
      width: 820,
      height: 320,
      nodes: [
        { id: "p", label: "Webhooks", sub: "at-least-once", x: 90, y: 90, kind: "external" },
        { id: "api", label: "FastAPI", sub: "POST /events", x: 270, y: 90, kind: "service" },
        { id: "ing", label: "Ingest", sub: "dedupe · status", x: 450, y: 90, kind: "service" },
        { id: "db", label: "PostgreSQL", sub: "txns · events", x: 690, y: 160, kind: "data" },
        { id: "ui", label: "Dashboard", sub: "static pages", x: 90, y: 240, kind: "client" },
        { id: "rep", label: "Reports", sub: "summary · discrepancy", x: 450, y: 240, kind: "service" },
      ],
      edges: [
        { from: "p", to: "api" },
        { from: "api", to: "ing" },
        { from: "ing", to: "db" },
        { from: "ui", to: "rep", both: true },
        { from: "rep", to: "db", label: "GROUP BY" },
      ],
    },
  },
  {
    slug: "claimsense",
    name: "ClaimSense",
    status: "Personal project",
    category: "AI",
    tagline: "An LLM reads the insurance claim; plain code decides where it goes",
    summary:
      "Upload a First Notice of Loss as a PDF or text file. pdfplumber extracts the text, an LLM on NVIDIA NIM fills a Pydantic schema, and a deterministic rules engine routes the claim to fast track, manual review, the specialist queue or investigation, with a written reason.",
    year: "2026",
    stack: ["Python", "FastAPI", "Pydantic", "NVIDIA NIM", "pdfplumber", "JavaScript"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/ClaimSense" }],
    highlights: ["4 routing outcomes", "Temperature 0", "Schema-validated output", "5 req/min per IP"],
    problem:
      "Claims handlers read every FNOL document to pull out the same fields and choose a queue. LLMs are good at reading messy documents, but a routing decision has to be explainable and repeatable.",
    role: "Sole developer: document parser, extraction agent, routing engine, rate limiter and the single-page dashboard.",
    decisions: [
      { title: "AI extracts, code decides", body: "The LLM only fills in the schema. Routing is ordinary Python that a reviewer can read, test and audit." },
      { title: "The schema is the prompt", body: "The Pydantic model's JSON Schema is sent with the document at temperature 0, and the reply is validated with model_validate before anything uses it." },
      { title: "Rules in priority order", body: "Missing mandatory fields → manual review; fraud words (staged, suspicious, inconsistent…) → investigation; any injury → specialist queue; under $25,000 → fast track; otherwise manual review." },
      { title: "Protect the LLM quota", body: "A sliding-window middleware allows 5 requests a minute per IP on /api/process and 30 elsewhere, returning 429 beyond that." },
    ],
    challenges: [
      "Models wrap JSON in markdown fences despite instructions, so the agent strips them before parsing and fails clearly when the output still isn't valid.",
      "Injury detection treats \"none\", \"no\" and \"n/a\" as no injury, so the way an LLM writes \"nothing\" doesn't send a claim to the specialist queue.",
      "Processed claims are kept in localStorage, so the dashboard keeps its history without a database.",
    ],
    diagram: {
      width: 820,
      height: 300,
      nodes: [
        { id: "up", label: "FNOL upload", sub: "PDF · TXT", x: 90, y: 150, kind: "client" },
        { id: "rl", label: "Rate limiter", sub: "sliding window", x: 250, y: 150, kind: "service" },
        { id: "pr", label: "Parser", sub: "pdfplumber", x: 410, y: 150, kind: "service" },
        { id: "ag", label: "Extractor", sub: "Pydantic schema", x: 570, y: 60, kind: "service" },
        { id: "llm", label: "NVIDIA NIM", sub: "LLM · temp 0", x: 730, y: 60, kind: "external" },
        { id: "re", label: "Rules engine", sub: "deterministic", x: 570, y: 240, kind: "service" },
        { id: "out", label: "Route + reason", sub: "4 outcomes", x: 730, y: 240, kind: "client" },
      ],
      edges: [
        { from: "up", to: "rl" },
        { from: "rl", to: "pr" },
        { from: "pr", to: "ag", label: "text" },
        { from: "ag", to: "llm", both: true },
        { from: "ag", to: "re", label: "validated" },
        { from: "re", to: "out" },
      ],
    },
  },
  {
    slug: "procuro",
    name: "Procuro",
    status: "Personal project",
    category: "AI",
    tagline: "RFPs written from one sentence, vendor replies parsed from email, bids compared",
    summary:
      "A Node.js and React procurement tool. Groq's Llama 3.3 70B turns a one-line need into a structured RFP, extracts price, delivery and warranty from vendor replies picked up over IMAP, and ranks the proposals against the RFP.",
    year: "2026",
    stack: ["Node.js", "Express", "React", "TypeScript", "PostgreSQL", "Groq", "Llama 3.3", "IMAP / SMTP"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/procuro" }],
    highlights: ["3 LLM workflows", "IMAP inbox listener", "JSONB proposals", "Swagger docs"],
    problem:
      "Procurement teams email RFPs, get free-text replies in every format, and copy prices and timelines into spreadsheets by hand before they can compare vendors.",
    role: "Sole developer: Express API, prompts, IMAP and SMTP integration, PostgreSQL schema and the React front end.",
    decisions: [
      { title: "Keep raw and parsed", body: "Each proposal stores the original email and the LLM's JSONB extraction, so a bad parse can be checked and re-run." },
      { title: "JSON mode, low temperature", body: "Groq is called with response_format json_object at temperature 0.1, and a cleaner strips stray fences before JSON.parse." },
      { title: "Prompts are their own modules", body: "Controllers call services; services call generateRfp, parseProposal and compare. Prompt changes never touch routing code." },
      { title: "Email is the vendor interface", body: "Invitations go out over SMTP. Replies are matched to an RFP by an [RFP 12] tag in the subject; unmatched ones are stored for manual assignment rather than dropped." },
    ],
    challenges: [
      "A long-lived IMAP connection drops. The listener reconnects 5 s after ETIMEDOUT or ECONNRESET, polls every 60 s, skips overlapping fetches and remembers processed UIDs so a reconnect doesn't ingest the same email twice.",
      "Comparing vendors fairly: the compare prompt gets the RFP's requirements and every proposal's structured data together and returns a ranked decision matrix with pros and cons.",
    ],
    diagram: {
      width: 820,
      height: 380,
      nodes: [
        { id: "ui", label: "React app", sub: "Vite", x: 90, y: 180, kind: "client" },
        { id: "api", label: "Express API", sub: "RFPs · vendors", x: 270, y: 180, kind: "service" },
        { id: "llm", label: "Groq", sub: "Llama 3.3 70B", x: 500, y: 180, kind: "external" },
        { id: "pg", label: "PostgreSQL", sub: "JSONB", x: 700, y: 70, kind: "data" },
        { id: "mail", label: "Mail server", sub: "SMTP · IMAP", x: 270, y: 320, kind: "external" },
        { id: "imap", label: "IMAP listener", sub: "60 s poll", x: 500, y: 320, kind: "service" },
      ],
      edges: [
        { from: "ui", to: "api", both: true },
        { from: "api", to: "llm", label: "prompts" },
        { from: "api", to: "pg" },
        { from: "api", to: "mail", label: "invite" },
        { from: "mail", to: "imap", label: "replies" },
        { from: "imap", to: "llm", label: "parse" },
        { from: "imap", to: "pg" },
      ],
    },
  },
  {
    slug: "fintrack",
    name: "FinTrack",
    status: "Personal project",
    category: "Full-stack",
    tagline: "Personal finance tracker: income, expenses, budgets and reports",
    summary:
      "A Spring Boot REST API with stateless JWT auth and a vanilla JavaScript front end. Users log income and expenses, set monthly budgets by category, and see a dashboard and monthly reports. It runs as a Docker container on Render with Neon PostgreSQL.",
    year: "2026",
    stack: ["Java 17", "Spring Boot", "Spring Security", "JWT", "Spring Data JPA", "PostgreSQL", "JavaScript", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/Fintrack_App" }],
    highlights: ["8 REST controllers", "Stateless JWT", "Swagger UI", "Fits a 256 MB heap"],
    problem: "People who track money in spreadsheets lose sight of where it goes each month and only find out they've overspent a budget afterwards.",
    role: "Sole developer: API, security, data model, front end and deployment.",
    decisions: [
      { title: "Stateless auth", body: "A JWT filter in the Spring Security chain, no server sessions, and CORS set up for a front end served from a different origin." },
      { title: "Totals in the query", body: "Monthly income and expense totals are JPQL SUMs wrapped in COALESCE, so an empty month returns 0, not null." },
      { title: "Shared and personal categories", body: "Default categories have no owner; a user's own categories are added on top, fetched in one query." },
      { title: "H2 locally, PostgreSQL in production", body: "The same JPA code runs on both, so local setup needs no database server." },
    ],
    challenges: [
      "The JVM was OOM-killed on start on a 512 MB free instance. Capping the heap with -Xmx256m fixed it.",
      "Supabase direct connections are IPv6-only and Render is IPv4-only, and the pooler failed with a tenant error. The database moved to Neon, which connects directly over IPv4.",
      "Free instances sleep after 15 minutes, so a @Scheduled job pings the health endpoint every 10. The public root returned 403 until it was added to permitAll with a health controller.",
    ],
    diagram: {
      width: 820,
      height: 300,
      nodes: [
        { id: "ui", label: "Web app", sub: "vanilla JS", x: 90, y: 150, kind: "client" },
        { id: "sec", label: "JWT filter", sub: "Spring Security", x: 250, y: 150, kind: "service" },
        { id: "ctl", label: "Controllers", sub: "8 REST", x: 410, y: 150, kind: "service" },
        { id: "svc", label: "Services", sub: "budgets · reports", x: 570, y: 150, kind: "service" },
        { id: "db", label: "PostgreSQL", sub: "Neon", x: 730, y: 150, kind: "data" },
        { id: "ka", label: "Keep-alive", sub: "@Scheduled 10 min", x: 250, y: 260, kind: "external" },
      ],
      edges: [
        { from: "ui", to: "sec", both: true },
        { from: "sec", to: "ctl" },
        { from: "ctl", to: "svc" },
        { from: "svc", to: "db", label: "JPA" },
        { from: "ka", to: "sec", label: "GET /" },
      ],
    },
  },
  {
    slug: "taska",
    name: "Taska",
    status: "Personal project",
    category: "Systems",
    tagline: "Blockchain-backed wallet system built as event-driven microservices",
    summary:
      "Auth, wallet, blockchain and explorer services, each independent, communicating over Kafka with Redis caching and PostgreSQL via Prisma, behind nginx with a Next.js front end.",
    year: "2025",
    stack: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Kafka", "Redis", "Next.js", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/Taska" }],
    highlights: ["4 services", "Kafka events", "Prisma + Postgres", "Immutable ledger"],
    problem: "Wallet transactions need to be fast for users but tamper-evident and auditable, which a single mutable database table can't guarantee on its own.",
    role: "Designed the service boundaries and event flow; built the services, Docker setup and front end.",
    decisions: [
      { title: "One service per concern", body: "Authentication, wallet management, blockchain operations and the explorer deploy and scale independently." },
      { title: "Events between services", body: "Transactions are published to Kafka and consumed by the blockchain service, so the wallet API stays responsive." },
      { title: "Redis for hot reads", body: "Balances and recent activity are cached to keep the dashboard fast." },
    ],
    challenges: ["Keeping wallet balances consistent with blocks written asynchronously.", "One docker compose command brings up every service, Kafka, Redis and PostgreSQL."],
    diagram: {
      width: 820,
      height: 360,
      nodes: [
        { id: "fe", label: "Next.js app", x: 90, y: 180, kind: "client" },
        { id: "ng", label: "nginx", x: 260, y: 180, kind: "service" },
        { id: "auth", label: "Auth service", x: 440, y: 60, kind: "service" },
        { id: "wal", label: "Wallet service", x: 440, y: 180, kind: "service" },
        { id: "exp", label: "Explorer", x: 440, y: 300, kind: "service" },
        { id: "k", label: "Kafka", sub: "tx events", x: 620, y: 180, kind: "event" },
        { id: "bc", label: "Blockchain svc", sub: "ledger", x: 740, y: 300, kind: "service" },
        { id: "pg", label: "PostgreSQL", sub: "Prisma", x: 740, y: 60, kind: "data" },
      ],
      edges: [
        { from: "fe", to: "ng" },
        { from: "ng", to: "auth" },
        { from: "ng", to: "wal" },
        { from: "ng", to: "exp" },
        { from: "wal", to: "k" },
        { from: "k", to: "bc" },
        { from: "wal", to: "pg" },
        { from: "bc", to: "exp" },
      ],
    },
  },
  {
    slug: "graphecomx",
    name: "GraphEcomX",
    status: "Personal project",
    category: "Systems",
    tagline: "Event-driven e-commerce microservices behind a GraphQL gateway",
    summary: "User, Product and Order services, each with its own data, behind one GraphQL gateway. They communicate through Kafka events instead of calling each other.",
    year: "2024",
    stack: ["Node.js", "GraphQL", "Kafka", "MongoDB", "Docker", "Jest"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/GraphEcomX" }],
    highlights: ["3 services", "Kafka events", "One GraphQL schema", "Jest tests"],
    problem: "A monolithic store couples users, catalogue and orders, so one slow area drags down the rest and nothing scales independently.",
    role: "Designed service boundaries, the gateway schema and event contracts; built and containerised every service.",
    decisions: [
      { title: "GraphQL gateway", body: "Clients ask for exactly the shape they need in one round trip; the gateway resolves fields from the owning service." },
      { title: "Asynchronous events", body: "Order creation publishes to Kafka rather than calling other services, so one service being down doesn't block checkout." },
      { title: "Database per service", body: "Each service owns its MongoDB data. No shared tables, no hidden coupling." },
    ],
    challenges: ["Consistency across services without distributed transactions, using events and idempotent consumers.", "Reproducible local setup with docker compose."],
    diagram: {
      width: 820,
      height: 360,
      nodes: [
        { id: "c", label: "Client", x: 100, y: 180, kind: "client" },
        { id: "gw", label: "GraphQL gateway", sub: "one schema", x: 290, y: 180, kind: "service" },
        { id: "u", label: "User service", x: 500, y: 60, kind: "service" },
        { id: "p", label: "Product service", x: 500, y: 180, kind: "service" },
        { id: "o", label: "Order service", x: 500, y: 300, kind: "service" },
        { id: "k", label: "Kafka", sub: "domain events", x: 710, y: 180, kind: "event" },
      ],
      edges: [
        { from: "c", to: "gw" },
        { from: "gw", to: "u" },
        { from: "gw", to: "p" },
        { from: "gw", to: "o" },
        { from: "o", to: "k", label: "OrderCreated" },
        { from: "k", to: "p" },
        { from: "k", to: "u" },
      ],
    },
  },
  {
    slug: "divvymate",
    name: "DivvyMate",
    status: "Personal project",
    category: "Systems",
    tagline: "Expense-sharing back end with equal, exact and percentage splits",
    summary: "User, expense and balance-sheet services that split expenses three ways, publish expense events to Kafka, and generate downloadable balance sheets. Runs behind nginx on PostgreSQL and Redis.",
    year: "2024",
    stack: ["Node.js", "Express", "PostgreSQL", "Kafka", "Redis", "Nginx", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/DivvyMate" }],
    highlights: ["3 split modes", "3 services", "Kafka producer/consumer", "Balance-sheet export"],
    problem: "Groups sharing daily expenses need correct per-person balances whether a bill is split equally, by exact amounts or by percentage.",
    role: "Built the services, split validation, Kafka producer/consumer and the Docker/nginx setup.",
    decisions: [
      { title: "Validate splits at the edge", body: "Exact amounts must sum to the total and percentages to 100, rejected before anything is written." },
      { title: "Balance sheet as a consumer", body: "The balance-sheet service consumes expense events, so writes stay fast and reporting is decoupled." },
    ],
    challenges: ["Rounding: percentage splits that don't divide evenly must still sum to the exact total."],
    diagram: {
      width: 820,
      height: 320,
      nodes: [
        { id: "c", label: "Client", x: 90, y: 160, kind: "client" },
        { id: "ng", label: "nginx", x: 250, y: 160, kind: "service" },
        { id: "u", label: "User service", x: 430, y: 60, kind: "service" },
        { id: "e", label: "Expense service", sub: "3 split modes", x: 430, y: 260, kind: "service" },
        { id: "k", label: "Kafka", sub: "expense events", x: 610, y: 260, kind: "event" },
        { id: "b", label: "Balance sheet", sub: "export", x: 740, y: 160, kind: "service" },
        { id: "pg", label: "PostgreSQL", x: 610, y: 60, kind: "data" },
      ],
      edges: [
        { from: "c", to: "ng" },
        { from: "ng", to: "u" },
        { from: "ng", to: "e" },
        { from: "e", to: "k" },
        { from: "k", to: "b" },
        { from: "u", to: "pg" },
        { from: "b", to: "pg" },
      ],
    },
  },
  {
    slug: "sec-filings-rag",
    name: "SEC Filings RAG",
    status: "Personal project",
    category: "AI",
    tagline: "Ask questions about FAANG 10-K filings with retrieval-augmented generation",
    summary: "Loads the 2023 10-K PDFs of the FAANG companies, chunks and embeds them into a FAISS index with LangChain, and answers financial questions from the filings themselves in a Streamlit app.",
    year: "2025",
    stack: ["Python", "LangChain", "FAISS", "OpenAI", "Streamlit", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/SEC-ai-Agent" }],
    highlights: ["5 annual reports", "FAISS vector index", "Grounded answers", "Dockerised"],
    problem: "General LLMs don't know the latest filings and tend to make up numbers. Answers about a company's finances should come from its actual report.",
    role: "Built the ingestion pipeline, the vector index, the retrieval chain and the Streamlit UI.",
    decisions: [
      { title: "Retrieve, then generate", body: "Relevant chunks from the filings are put in the prompt, so answers are grounded in the source documents." },
      { title: "Index built once", body: "PDFs are split with a recursive text splitter and embedded into FAISS at build time; queries only search." },
    ],
    challenges: ["Chunk size vs. answer quality: financial tables break easily when split mid-row."],
    diagram: {
      width: 820,
      height: 300,
      nodes: [
        { id: "pdf", label: "10-K PDFs", sub: "FAANG 2023", x: 90, y: 80, kind: "external" },
        { id: "split", label: "Splitter", sub: "recursive", x: 270, y: 80, kind: "service" },
        { id: "faiss", label: "FAISS", sub: "embeddings", x: 450, y: 80, kind: "data" },
        { id: "ui", label: "Streamlit", sub: "question", x: 90, y: 230, kind: "client" },
        { id: "ret", label: "Retriever", x: 450, y: 230, kind: "service" },
        { id: "llm", label: "LLM", sub: "grounded answer", x: 680, y: 230, kind: "external" },
      ],
      edges: [
        { from: "pdf", to: "split" },
        { from: "split", to: "faiss" },
        { from: "ui", to: "ret" },
        { from: "faiss", to: "ret" },
        { from: "ret", to: "llm", label: "context" },
      ],
    },
  },
  {
    slug: "nexrule",
    name: "NexRule",
    status: "Personal project",
    category: "Systems",
    tagline: "A rule engine that turns rule strings into stored ASTs",
    summary: "Rules written as plain strings (age > 18, status == 'active', joined with AND / OR) are tokenized into an abstract syntax tree, stored in MongoDB, combined with other rules, and evaluated against JSON data.",
    year: "2024",
    stack: ["Node.js", "Express", "MongoDB", "Docker", "Jest"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/NexRule" }],
    highlights: ["Tokenizer + AST", "Stored ASTs", "Rule combination", "Dockerised"],
    problem: "Eligibility rules hard-coded in application logic need a deploy every time the business changes a threshold.",
    role: "Wrote the tokenizer, AST builder and evaluator, and built the REST API and its tests.",
    decisions: [
      { title: "Parse once, evaluate many", body: "Rules compile to an AST that is persisted, so evaluation is a cheap tree walk." },
      { title: "Combine at the tree level", body: "Several rules merge into one AST under AND nodes, so a combined rule is just another tree." },
    ],
    challenges: ["Keeping evaluation a pure function of (tree, data) so it's easy to test.", "Next step: a precedence-aware parser for nested parentheses."],
    diagram: {
      width: 820,
      height: 300,
      nodes: [
        { id: "r", label: "Rule string", sub: "age > 18 AND …", x: 100, y: 150, kind: "client" },
        { id: "t", label: "Tokenizer", x: 270, y: 150, kind: "service" },
        { id: "p", label: "AST builder", sub: "stack-based", x: 430, y: 150, kind: "service" },
        { id: "db", label: "MongoDB", sub: "stored ASTs", x: 430, y: 40, kind: "data" },
        { id: "e", label: "Evaluator", sub: "tree walk", x: 600, y: 150, kind: "service" },
        { id: "d", label: "JSON data", x: 600, y: 260, kind: "external" },
        { id: "o", label: "true / false", x: 740, y: 150, kind: "client" },
      ],
      edges: [
        { from: "r", to: "t" },
        { from: "t", to: "p" },
        { from: "p", to: "db" },
        { from: "p", to: "e", label: "AST" },
        { from: "d", to: "e" },
        { from: "e", to: "o" },
      ],
    },
  },
  {
    slug: "fintafsir",
    name: "FinTafsir",
    status: "Personal project",
    category: "AI",
    tagline: "Upload a bank statement PDF, get structured JSON back",
    summary:
      "A Spring Boot API that extracts text with Apache PDFBox and asks an OpenAI model for the account holder, email, and opening and closing balances as strict JSON. A small dark-themed page handles the upload.",
    year: "2025",
    stack: ["Java", "Spring Boot", "Apache PDFBox", "OkHttp", "OpenAI API", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/swayam555/FinTafsir" }],
    highlights: ["1 endpoint", "10 MB upload cap", "Raw-text fallback", "Runs without a key"],
    problem: "Every bank lays out its statements differently, so template or regex extraction breaks with each new format.",
    role: "Sole developer: API, PDF extraction, prompt, response parsing, front end and Docker setup.",
    decisions: [
      { title: "Reject early", body: "Empty files, non-PDF content types and missing .pdf extensions get 400; anything over 10 MB gets 413, all before the PDF is opened." },
      { title: "Ask for JSON, plan for prose", body: "A system message and a strict JSON template ask for fields only. Fences are stripped before parsing, and if parsing still fails the raw model output is returned instead of an error." },
      { title: "Dummy mode", body: "Without OPENAI_API_KEY the app still starts and returns demo data, so the UI can be tried without a key. Logs only ever show the key's last 4 characters." },
    ],
    challenges: [
      "Scanned PDFs have no text layer; they're rejected with a clear message instead of sending an empty prompt to the model.",
      "Next step: chunking long statements to stay inside the model's context window.",
    ],
    diagram: {
      width: 820,
      height: 280,
      nodes: [
        { id: "ui", label: "Upload page", sub: "static HTML", x: 90, y: 140, kind: "client" },
        { id: "ctl", label: "Controller", sub: "type · 10 MB", x: 250, y: 140, kind: "service" },
        { id: "pdf", label: "PDFBox", sub: "text layer", x: 410, y: 140, kind: "service" },
        { id: "svc", label: "Parser", sub: "JSON prompt", x: 570, y: 140, kind: "service" },
        { id: "llm", label: "OpenAI", sub: "chat completion", x: 730, y: 60, kind: "external" },
        { id: "out", label: "JSON result", sub: "fields + raw", x: 730, y: 220, kind: "client" },
      ],
      edges: [
        { from: "ui", to: "ctl" },
        { from: "ctl", to: "pdf" },
        { from: "pdf", to: "svc" },
        { from: "svc", to: "llm", both: true },
        { from: "svc", to: "out" },
      ],
    },
  },
];

export type IndexEntry = {
  name: string;
  category: Category;
  year: string;
  desc: string;
  stack: string[];
  href?: string;
  slug?: string; // has a case study
  note?: string;
};

// Latest year mentioned in a year string: "2024 — 2026" → 2026
export const endYear = (y: string) => Math.max(...(y.match(/\d{4}/g) ?? ["0"]).map(Number));
// Newest first. Sort is stable, so projects from the same year keep the order they're written in.
const byYearDesc = (a: { year: string }, b: { year: string }) => endYear(b.year) - endYear(a.year);

export const caseStudies = [...caseStudyList].sort(byYearDesc);

const gh = (r: string) => `https://github.com/swayam555/${r}`;

// Every meaningful project on github.com/swayam555 (empty and test repos left out).
const indexList: IndexEntry[] = [
  { name: "Marine Edge", category: "Front end", year: "2025", slug: "marine-edge", href: "https://marineedge.in", desc: "Production edtech platform: Next.js web portals and an Angular Android app on Google Play.", stack: ["Next.js", "Angular", "Capacitor"], note: "Production" },
  { name: "TorrentShare", category: "Systems", year: "2026", slug: "torrentshare", href: gh("TorrentShare"), desc: "Peer-assisted artifact distribution on a native BitTorrent engine with Kafka and Redis leases.", stack: ["Node.js", "Kafka", "Redis"] },
  { name: "JobApp", category: "AI", year: "2026", slug: "jobapp", desc: "Job scraping, spaCy matching, LLM résumé tailoring and form filling.", stack: ["Python", "Flask", "spaCy"], note: "Private" },
  { name: "Taska", category: "Systems", year: "2025", slug: "taska", href: gh("Taska"), desc: "Blockchain wallet as event-driven TypeScript microservices.", stack: ["TypeScript", "Kafka", "Prisma"] },
  { name: "GraphEcomX", category: "Systems", year: "2024", slug: "graphecomx", href: gh("GraphEcomX"), desc: "E-commerce microservices behind a GraphQL gateway with Kafka events.", stack: ["GraphQL", "Kafka", "MongoDB"] },
  { name: "DivvyMate", category: "Systems", year: "2024", slug: "divvymate", href: gh("DivvyMate"), desc: "Expense-sharing services with three split modes and balance-sheet export.", stack: ["Express", "PostgreSQL", "Kafka"] },
  { name: "SEC Filings RAG", category: "AI", year: "2025", slug: "sec-filings-rag", href: gh("SEC-ai-Agent"), desc: "RAG over FAANG 10-K filings with LangChain and FAISS.", stack: ["LangChain", "FAISS", "Streamlit"] },
  { name: "NexRule", category: "Systems", year: "2024", slug: "nexrule", href: gh("NexRule"), desc: "Rule engine that parses rule strings into stored, combinable ASTs.", stack: ["Node.js", "MongoDB"] },
  { name: "TorrentShare UI", category: "Front end", year: "2026", href: gh("torrentshare-UI"), desc: "Real-time torrent dashboard: live speeds, QR sharing, JWT auth.", stack: ["React", "TypeScript", "Vite"] },
  { name: "GoMicroHub", category: "Systems", year: "2025", href: gh("GoMicroHub"), desc: "Go microservices with gRPC between services and a GraphQL gateway.", stack: ["Go", "gRPC", "GraphQL"] },
  { name: "SkyMetrics", category: "Systems", year: "2024", href: gh("SkyMetrics"), desc: "Real-time weather monitoring with Kafka alerts and WebSocket updates.", stack: ["Node.js", "Kafka", "WebSockets"] },
  { name: "Medical Intake Agent", category: "AI", year: "2025", href: gh("medical-intake-bot"), desc: "Voice-agent back end: pre-call, in-call and post-call webhooks with NLP.", stack: ["FastAPI", "Python", "Webhooks"] },
  { name: "Logwise", category: "AI", year: "2025", href: gh("Logwise"), desc: "Offline log analyser that summarises root causes with a local LLM.", stack: ["FastAPI", "React", "Ollama"] },
  { name: "Uddesh AI", category: "AI", year: "2024", href: gh("uddesh-ai"), desc: "Career recommender: bagged decision-tree model with a React front end.", stack: ["scikit-learn", "React"] },
  { name: "DevLab", category: "DevOps", year: "2025", href: gh("DevLab"), desc: "TypeScript server with Jenkins + GitHub Actions CI/CD, Gradle and Docker.", stack: ["Jenkins", "GitHub Actions", "Docker"] },
  { name: "Rugas Order Management", category: "Full-stack", year: "2025", href: gh("RUGAS-ORM"), desc: "Customers, products and order-status workflow; fully containerised.", stack: ["React", "Redux", "PostgreSQL"] },
  { name: "FortFile", category: "Full-stack", year: "2025", href: gh("FortFile"), desc: "Secure file sharing with RBAC and tiered upload limits.", stack: ["Node.js", "MongoDB", "JWT"] },
  { name: "Property Listing", category: "Full-stack", year: "2025", href: gh("Property-Listing"), desc: "Property search with filters and favourites, CSV import and Redis caching.", stack: ["Express", "MongoDB", "Redis"] },
  { name: "Live Polling", category: "Full-stack", year: "2025", href: gh("live-polling-frontend"), desc: "Real-time polls with instant results over Socket.io.", stack: ["React", "Socket.io"] },
  { name: "EduTrack", category: "Full-stack", year: "2025", href: gh("edutrack"), desc: "Student records with Google OAuth login and search.", stack: ["React", "Express", "OAuth"] },
  { name: "PulseHTTP", category: "Systems", year: "2024", href: gh("PulseHTTP"), desc: "Auth service with JWT and role-based authorisation middleware.", stack: ["Express", "MongoDB", "JWT"] },
  { name: "SubmissioX", category: "Full-stack", year: "2024", href: gh("SubmissioX"), desc: "Assignment portal: user uploads, admin accept/reject, nginx + Docker.", stack: ["Node.js", "Docker", "Nginx"] },
  { name: "Stock Discussion", category: "Systems", year: "2024", href: gh("stock-discussion-platform"), desc: "Community API for stock posts, comments and likes.", stack: ["Express", "MongoDB"] },
  { name: "Employee Management", category: "Full-stack", year: "2024", href: gh("Intermediate-Mern-stack-machine-test-with-Web-API"), desc: "MERN CRUD app with auth, containerised client and server.", stack: ["MERN", "Docker"] },
  { name: "Web Storefront", category: "Full-stack", year: "2025", href: gh("Web-Storefront"), desc: "Server-rendered e-commerce store with auth and cart.", stack: ["Node.js", "MongoDB", "EJS"] },
  { name: "Infinite Gallery", category: "Front end", year: "2024", href: gh("asymmetric-project"), desc: "Masonry infinite-scroll gallery over the Unsplash API.", stack: ["React", "TypeScript"] },
  { name: "EMS Dashboard", category: "Front end", year: "2025", href: gh("EMS"), desc: "Employee task dashboard with role-based login views.", stack: ["React", "Vite", "Tailwind"] },
  { name: "Blood Donation System", category: "Full-stack", year: "2024", href: gh("blood-donation-system"), desc: "Donor and request management with an admin console.", stack: ["PHP", "MySQL"] },
  { name: "IMS", category: "Systems", year: "2026", slug: "ims", href: gh("IMS"), desc: "Incident management: Kafka-buffered ingestion, Redis debounce, RCA-gated lifecycle.", stack: ["FastAPI", "Kafka", "Redis"] },
  { name: "Payeazie", category: "Full-stack", year: "2026", slug: "payeazie", href: gh("payeazie"), desc: "Payment ops: idempotent intents, BullMQ charge workers, audit trail, ops dashboard.", stack: ["Fastify", "BullMQ", "React"] },
  { name: "MediSync", category: "Systems", year: "2026", slug: "medisync", href: gh("MediSync"), desc: "Spring Boot microservices with a JWT gateway, gRPC billing and Kafka events.", stack: ["Spring Boot", "gRPC", "Kafka"] },
  { name: "Repo Pilot", category: "Systems", year: "2026", slug: "repo-pilot", href: gh("repo-pilot"), desc: "Idempotent payment-event ingestion with SQL reconciliation and discrepancy checks.", stack: ["FastAPI", "SQLAlchemy", "PostgreSQL"] },
  { name: "ClaimSense", category: "AI", year: "2026", slug: "claimsense", href: gh("ClaimSense"), desc: "LLM extracts insurance claim data; a deterministic rules engine routes it.", stack: ["FastAPI", "Pydantic", "NVIDIA NIM"] },
  { name: "Procuro", category: "AI", year: "2026", slug: "procuro", href: gh("procuro"), desc: "RFP generation, IMAP proposal parsing and vendor comparison with Llama 3.3.", stack: ["Node.js", "React", "Groq"] },
  { name: "FinTrack", category: "Full-stack", year: "2026", slug: "fintrack", href: gh("Fintrack_App"), desc: "Income, expenses, budgets and reports on Spring Boot with JWT auth.", stack: ["Spring Boot", "PostgreSQL", "JWT"] },
  { name: "FinTafsir", category: "AI", year: "2025", slug: "fintafsir", href: gh("FinTafsir"), desc: "Bank statement PDF → structured JSON with PDFBox and an OpenAI model.", stack: ["Spring Boot", "PDFBox", "OpenAI"] },
];

export const projectIndex = [...indexList].sort(byYearDesc);

export const categories: Category[] = ["Systems", "Full-stack", "AI", "DevOps", "Front end"];
