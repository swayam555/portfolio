// Work history. Fidelity internals (hostnames, app IDs, schemas, internal tooling names) are
// deliberately left out: each system is described by what it does and what I built.

export type System = {
  name: string;
  layer: "Mobile app" | "BFF" | "Orchestration" | "Domain service" | "Content" | "Platform";
  what: string;
  built: string[];
  stack: string[];
};

export const fidelity = {
  company: "Fidelity Investments",
  product: "Plynk Invest · FCAT",
  title: "Software Development Engineer",
  period: "Sep 2025 — Present",
  location: "Bengaluru",
  summary:
    "Plynk is Fidelity's mobile-first investing app for new investors. I work across the ground-up Angular rebuild of the app and the Java / Spring Boot microservices behind it, deployed with Terraform blue/green on AWS EKS across 4 environments and 2 regions.",
  stats: [
    { k: "9", v: "codebases I've shipped in" },
    { k: "13", v: "merged PRs in the app rebuild" },
    { k: "34", v: "versioned BFF endpoints" },
    { k: "3", v: "languages: EN · ES · FR-CA" },
  ],
  systems: [
    {
      name: "Plynk mobile app rebuild",
      layer: "Mobile app",
      what: "A ground-up Angular rebuild of the Plynk app for iOS, Android and web, in an Nx monorepo with 60+ libraries.",
      built: [
        "Brokerage & IRA account opening: 20+ lazy-loaded wizard steps, so each screen downloads only its own code",
        "SSN masking, US-only address autocomplete (3-char minimum, debounce + switchMap) and validation in 3 languages",
        "WCAG 2.2: keyboard access, screen-reader validation, iOS/Android safe areas, enforced by Playwright accessibility audits",
        "Real-time WebSocket quotes with per-symbol signals and a 10 s debounced unsubscribe when a tab is backgrounded",
        "linkedSignal() refactor that fixed a stale selection bug in the real-time-quotes modal; exhaustMap guards against double-submitted orders",
      ],
      stack: ["Angular", "Signals", "NgRx Signal Store", "Nx", "Jest", "Playwright"],
    },
    {
      name: "Accounts BFF",
      layer: "BFF",
      what: "The single back end the app calls for anything about an account: balances, positions, activity, documents, IRA and notifications.",
      built: [
        "34 versioned endpoints across 17 controllers (v1/v2/v3) that never broke a shipped app version",
        "Account-summary API that calls 7 back-office systems in parallel with CompletableFuture and returns partial data when one is down",
        "JSON rule engine that classifies raw activity codes into user-facing categories",
        "HTTP 207 partial-success batch APIs, IRA contribution limits & RMD, tax documents, beneficiaries, corporate actions",
        "SSL Kafka consumer feeding a read/unread in-app notification inbox",
      ],
      stack: ["Java", "Spring Boot", "Kafka", "Oracle", "OpenAPI"],
    },
    {
      name: "Account-opening orchestrator",
      layer: "Orchestration",
      what: "Opens brokerage and IRA accounts across several systems of record, with KYC, deduplication and audit.",
      built: [
        "Socure KYC fraud screening (red / yellow / green) before any account is created, with a document-verification path",
        "Duplicate-account prevention against double-submits and retries",
        "Compensating restrictions when a downstream step fails, so an account is never left silently inconsistent",
        "IRA confirmation PDFs generated with Apache PDFBox; documents published to an IRSA-secured SQS pipeline with a dead-letter fallback",
      ],
      stack: ["Spring Boot", "WebClient", "AWS SQS", "PDFBox", "MyBatis"],
    },
    {
      name: "Market data hub",
      layer: "Domain service",
      what: "Every price, chart, profile, logo, top holding and news item in the app goes through this service. It also enforces tradability rules.",
      built: [
        "Cache-aside layer over paid vendor APIs, cutting repeat vendor calls and page latency",
        "OAuth2 token caching that removes an auth round-trip per request",
        "3-attempt retries, a 50-connection WebClient pool and 1-second DB statement timeouts to fail fast",
      ],
      stack: ["Spring Boot", "Spring Cache", "WebClient", "MyBatis"],
    },
    {
      name: "Content retrieval service",
      layer: "Content",
      what: "An anti-corruption layer over the enterprise CMS that turns deeply nested content into clean, tier-gated DTOs for the app.",
      built: [
        "7 named in-memory caches and @Retryable (3 attempts) so CMS blips never reach the app",
        "Context mapping from business names to CMS nodes, with tier-gated content",
      ],
      stack: ["Spring Boot", "Spring Cache", "Spring Retry"],
    },
    {
      name: "Customer information service",
      layer: "Domain service",
      what: "Customer identity, pricing tiers and trials, preferences, contact updates, email OTP, price alerts and referral programs.",
      built: [
        "Worked on Kafka consumers that keep login, security and account-maintenance events in sync",
        "One contact-update endpoint that fans out to several back-office maintenance APIs",
      ],
      stack: ["Spring Boot", "Kafka", "Oracle"],
    },
    {
      name: "User identity service",
      layer: "Domain service",
      what: "The source of truth for user identity: registration, deduplication, ID-proofing workflow and trading restrictions.",
      built: ["Integrated the ID-verification outcome with automatic placement and removal of account restrictions"],
      stack: ["Spring Boot", "Oracle"],
    },
    {
      name: "Customer activity service",
      layer: "Domain service",
      what: "Gamified learning: courses, quizzes, weekly learning streaks and paper-trading competitions with leaderboards.",
      built: ["Endpoints behind the learning journeys and competition scoreboards"],
      stack: ["Spring Boot", "MyBatis", "Oracle"],
    },
    {
      name: "Admin & feature-control service",
      layer: "Platform",
      what: "Runtime app configuration, database-backed feature toggles with a full audit history, and tier-based UI gating.",
      built: ["Toggle and tier attributes that let the team change app behaviour without a release"],
      stack: ["Spring Boot", "Oracle"],
    },
  ] satisfies System[],
  delivery: [
    "Contract-first: 19 OpenAPI specs generating models",
    "Jenkins with SonarQube, CodeQL and Veracode gates",
    "Terraform blue/green on AWS EKS, 2–5 pod autoscaling",
    "Hardened non-root containers",
    "Datadog APM and Micrometer, with PII scrubbing on every log",
  ],
};

export type MeLayer = "Mobile app" | "Web portal" | "Public site" | "Cross-cutting" | "Payments" | "Real-time";

export const marineEdge = {
  company: "Marine Edge",
  product: "Merchant Navy exam prep",
  title: "Software Development Engineer",
  period: "Mar 2024 — Aug 2025",
  location: "Bengaluru",
  url: "https://marineedge.in",
  summary:
    "An edtech platform for Merchant Navy aspirants (GP Rating, IMU-CET) with 4 portals: public tools, student, tutor and admin/superadmin. In a three-person team I built the Angular Android app end to end, and the public tools, student and staff portals and checkout on the Next.js web platform.",
  stats: [
    { k: "140+", v: "web routes" },
    { k: "49", v: "mobile screens" },
    { k: "14", v: "Play Store builds" },
    { k: "2,500+", v: "mobile unit tests" },
  ],
  systems: [
    {
      name: "Android app",
      layer: "Mobile app",
      what: "The student app on Google Play, built with Angular, Ionic and Capacitor: courses, recorded and live classes, tests and payments.",
      built: [
        "49 screens and 13 NgRx stores, covered by 167 spec files (2,500+ unit tests)",
        "Onboarding, signup and OTP login flows, with auth state that no longer bleeds between users and clear messages for duplicate accounts",
        "Exam and quiz screens, and the live-class UI",
        "Fixed a native-bridge bug where 18-digit attempt IDs lost precision as JS numbers: exam saves went from 0% to 100%",
        "Fixed a 401 → login → 401 redirect loop that blanked the app on startup",
      ],
      stack: ["Angular", "Ionic", "Capacitor", "NgRx", "Jasmine", "Karma"],
    },
    {
      name: "Device features",
      layer: "Mobile app",
      what: "What makes it a real app rather than a website in a wrapper.",
      built: [
        "Offline lecture and PDF downloads on the device filesystem, with an in-app PDF renderer",
        "Push notifications and deep links into courses and classes",
        "Screenshot and recents blocking per route (privacy screen) on videos, materials, exams and live classes",
        "Splash screen, status bar and orientation handled natively through Capacitor plugins",
      ],
      stack: ["Capacitor", "Filesystem", "Push notifications", "Privacy screen"],
    },
    {
      name: "Play Store releases",
      layer: "Mobile app",
      what: "Shipping and keeping the app on Google Play.",
      built: [
        "14 builds (versionCode 14), now targeting SDK 36",
        "Separate testing and production builds pointed at the test and production sites",
        "A demo login for Play reviewers and an in-app Delete Account link, as Play policy requires",
        "Purchases moved to a web checkout handoff to meet Google Play billing policy, returning to the app on success",
      ],
      stack: ["Android", "Gradle", "Google Play Console"],
    },
    {
      name: "Student portal",
      layer: "Web portal",
      what: "The logged-in web experience: dashboard, courses, lectures, quizzes and live classes.",
      built: [
        "Student dashboard with watch-time and progress analytics, and a course switcher",
        "Quiz attempt and result pages, and YouTube-embedded lectures by subject and chapter",
        "Fixed a mandatory-course gate that blocked the profile and pages that don't need an enrolment",
        "TanStack Query data layer (hierarchical cache keys), Zustand, React Hook Form + Zod, Tailwind/shadcn",
        "Stopped retrying 4xx errors (failed requests had spun for ~7 s); AbortController timeouts; one batched call replaced N per-lecture calls",
      ],
      stack: ["Next.js", "React", "TanStack Query", "Zustand", "Zod"],
    },
    {
      name: "Staff portals",
      layer: "Web portal",
      what: "Admin, tutor, moderator and superadmin dashboards for running courses, students and staff.",
      built: [
        "Admin manager and course manager screens, with course-thumbnail uploads",
        "Moderator panel with its own dashboards for students, tutors and application info",
        "Question bank and quiz authoring, and lecture management by subject and chapter",
        "Superadmin course offers with expiry dates, and a students manager",
        "Violations dashboard where staff review exam-integrity events and ban or unban students",
      ],
      stack: ["Next.js", "React", "Tailwind", "shadcn/ui"],
    },
    {
      name: "Public tools & SEO",
      layer: "Public site",
      what: "Free self-check tools that bring aspirants to the site before they sign up.",
      built: [
        "Eligibility calculator: a 4-step wizard with cross-field rules checked on the step that owns them",
        "BMI calculator with unit-tested bands, and an Ishihara colour-blindness test",
        "Academic results carousel (AIR ranks 2023–2026) and a sponsor directory",
        "29 SVG assets converted to WebP, and images served from Oracle Cloud Object Storage through a custom Next.js image loader",
        "SEO and analytics: per-page metadata, sitemap, security headers and SEO-safe 301s",
      ],
      stack: ["Next.js", "Vitest", "SEO"],
    },
    {
      name: "Exam integrity",
      layer: "Cross-cutting",
      what: "Making mock exams hard to cheat on and paid content hard to pirate, in the browser and the app.",
      built: [
        "Fullscreen lockdown with 7 tracked violation types (screenshot, copy, print, focus loss, reload, escape, dev tools)",
        "Capture-shortcut detection that reports each violation and feeds the staff violations dashboard",
        "A soft warning first, then auto-termination after 3 strikes",
        "Content protection on lecture and material pages in the web app",
      ],
      stack: ["React", "Angular", "Capacitor"],
    },
    {
      name: "Checkout",
      layer: "Payments",
      what: "Buying a course on the web, including purchases started in the app.",
      built: [
        "Razorpay checkout flow with coupons, an order summary and a success page",
        "App-to-web checkout handoff: the student arrives already logged in and returns to the app afterwards",
        "The app's session wins over a stale web login: the handoff token is scoped to the API path and lives one hour, so it never shadows a later web login",
      ],
      stack: ["Next.js", "Razorpay Checkout", "Capacitor Browser"],
    },
    {
      name: "Live classes & media",
      layer: "Real-time",
      what: "Live lectures in the browser and the app, and uploading course media.",
      built: [
        "LiveKit (WebRTC) live room replacing Jitsi, with host controls and lecture/interview modes",
        "Live-session and scheduling pages for students, tutors and superadmins",
        "Direct-to-S3 uploads from the browser up to 2 GB (multipart above 100 MB, per-part ETags) with XHR progress bars",
        "Lecture progress saved only on ≥5% movement or at the 90% completion mark, with completion read from the server, so phone and web agree",
      ],
      stack: ["LiveKit", "WebRTC", "React", "S3"],
    },
  ] satisfies { name: string; layer: MeLayer; what: string; built: string[]; stack: string[] }[],
  delivery: [
    "Separate testing and production Android builds",
    "Google Play target SDK 36",
    "Vitest on the web, Jasmine/Karma on mobile",
  ],
  stack: ["Next.js", "React", "TanStack Query", "Angular", "Ionic", "Capacitor", "NgRx", "LiveKit", "Razorpay"],
};

export const education = {
  school: "BMS Institute of Technology and Management",
  degree: "B.E. Information Science and Engineering",
  period: "2021 — 2025",
  coursework: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "OOP"],
};

export const certifications = [
  "Architecting Solutions on AWS (Amazon Web Services)",
  "Tools of the Trade: Linux and SQL (Google)",
  "Linux Commands & Shell Scripting (IBM)",
];
