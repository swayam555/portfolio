// Short engineering stories from real work. Each one is a problem, a fix and an outcome.
export type Note = {
  id: string;
  where: string;
  title: string;
  problem: string;
  fix: string;
  outcome: string;
  visual: "fanout" | "partial" | "precision" | "progress";
};

export const notes: Note[] = [
  {
    id: "fan-out",
    where: "Fidelity · Spring Boot",
    title: "Latency of the slowest call, not the sum of seven",
    problem:
      "The account dashboard needed data from 7 back-office systems: balances, positions, performance, IRA, crypto and more. Calling them one after another adds every latency together.",
    fix:
      "Fan out with CompletableFuture on a bounded executor, give each call its own timeout, and merge results as they arrive. A failed system becomes a missing section instead of an error page.",
    outcome: "Dashboard latency is bounded by the slowest dependency, and one system going down no longer takes the dashboard with it.",
    visual: "fanout",
  },
  {
    id: "http-207",
    where: "Fidelity · Accounts BFF",
    title: "HTTP 207 for batches that half-succeed",
    problem:
      "Batch requests across accounts failed as a whole if a single item failed, which forced clients to retry work that had already succeeded.",
    fix:
      "Batch endpoints return 207 Multi-Status with a per-item status and error. The client retries only what failed. Versioned contracts (v1/v2/v3) keep older app builds working.",
    outcome: "No more all-or-nothing batches, and no breaking changes for app versions already in users' hands.",
    visual: "partial",
  },
  {
    id: "precision",
    where: "Marine Edge · Mobile",
    title: "0 of 49 exam IDs survived the native bridge",
    problem:
      "Exam answers silently failed to save on the mobile app. Every attempt ID coming back from the backend pointed at the wrong record.",
    fix:
      "Traced it to 18-digit IDs passing through a JavaScript number, which loses precision past 2⁵³. I kept IDs as strings end to end across the bridge and the API layer.",
    outcome: "Exam answer saves went from 0% to 100%.",
    visual: "precision",
  },
  {
    id: "progress",
    where: "Marine Edge · Mobile",
    title: "Lecture progress without flooding the API",
    problem:
      "The lecture player reported progress constantly, and the app decided on its own when a lecture was complete, so phone and web could disagree.",
    fix:
      "The Android player now saves only when progress moves 5% or more, or when it crosses 90%. Completion comes from the server's response instead of a local comparison, so every device shows the same state.",
    outcome: "Far fewer progress writes, and the same completion state on phone and web.",
    visual: "progress",
  },
];
