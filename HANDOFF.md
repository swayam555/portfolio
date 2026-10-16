# Portfolio handoff: Swayam Bajpai

This document is for the next person working on this site. It covers what the site is, everything changed so far, and how to add projects, jobs or skills without touching the design.

---

## 1. Summary

A one-page portfolio with a case-study page for each featured project. It's a **fully static site**: no backend, no database and no API keys. `npm run build` produces an `out/` folder you can host anywhere.

| | |
|---|---|
| Framework | Next.js 16 (App Router), `output: "export"` (static HTML) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with CSS-variable themes in `src/app/globals.css` |
| Animation | Motion (`motion/react`), with all motion respecting "reduce motion" |
| Fonts | Archivo (condensed display), IBM Plex Mono (labels), Instrument Serif italic (accents) |
| Extra | `qrcode` renders the WhatsApp QR at build time |
| Content | **All text lives in `src/data/*.ts`.** Components only read from there. |

**Note:** this Next.js version has breaking changes compared with older ones. Read `AGENTS.md` and the docs in `node_modules/next/dist/docs/` before changing framework-level code.

### Run it

```bash
cd ~/Desktop/projects/"portfolio website "   # the folder name ends with a space
npm install
npm run dev          # http://localhost:3000, with hot reload
npm run build        # static site → out/
npm start            # serves out/ at http://localhost:3000
npm run lint && npm run typecheck
```

If a `next dev` server was started **before** big file changes and pages return 500, stop it (Ctrl+C) and start it again.

### Deploy

Upload `out/` to Vercel, Netlify, Cloudflare Pages or GitHub Pages. With Vercel or Netlify you can instead connect the repo and use build command `npm run build` and output directory `out`.
**Before going live:** set `SITE_URL` in `src/data/site.ts` to the real domain. It's used for canonical URLs, the sitemap and Open Graph tags.

---

## 2. What's on the page (top to bottom)

| # | Section | Component | Data |
|---|---|---|---|
| — | Top bar: name, live IST clock, nav, Paper/Blueprint theme switch, **Résumé** button (on every screen size), mobile menu | `TopBar.tsx` | `site.ts` → `nav` |
| — | **Hero**: animated name, role, **résumé preview card** (Download / View), contact rows (phone, WhatsApp, email, LinkedIn, GitHub), cursor crosshair | `Hero.tsx`, `ResumeCard.tsx`, `ContactRows.tsx` | `site.ts` |
| — | Scrolling ticker | `Ticker.tsx` | inline |
| 01 | **Work**: Fidelity (stats + interactive map of 9 systems), Marine Edge (6 modules), education, certifications | `Experience.tsx` | `experience.ts` |
| 02 | **Field notes**: 4 engineering stories with animated visuals | `Notes.tsx`, `NoteVisual.tsx` | `notes.ts` |
| 03 | **Work index**: case-study cards, then the full project table **grouped by year, newest first**, with category filters and a hover preview | `WorkIndex.tsx`, `ArchitectureDiagram.tsx` | `projects.ts` |
| 04 | **Toolbox**: "periodic table" of 40 skills, each with where it was used | `Toolbox.tsx` | `skills.ts` |
| 05 | **Contact**: big phone number, WhatsApp QR code, contact rows | `Contact.tsx` | `site.ts` |
| — | Footer | `Footer.tsx` | `site.ts` |

Case-study pages live at `/projects/<slug>/` (`src/app/projects/[slug]/page.tsx`). Each page has these sections:
1. Header table, title, tagline and links
2. Highlights
3. §1 Problem
4. §2 Role
5. §3 Architecture (animated diagram)
6. §4 Decisions
7. §5 Challenges
8. §6 Image (optional)
9. §7 Stack
10. A "Next case study" link

`sitemap.ts` lists every case study automatically.

---

## 3. Change log

### v1: first build
- Dark editorial design with a lime accent, 5 featured projects, and a sitemap, robots file, 404 page and Open Graph tags.
- Fixed a hydration error under reduced motion, a favicon 404, and the résumé download filename.

### v2: redesign (the user said v1 was "very generic")
- **New look:** an "engineering dossier" with warm paper, black ink, signal orange, condensed uppercase headings and a graph-paper grid. There's an optional dark navy **Blueprint** theme. The choice is saved and applied before first paint, so the page doesn't flash.
- **Résumé at the top:** a real preview of page 1 of the PDF (`public/resume-preview.jpg`) sits in the hero with Download and View buttons, plus a Résumé button in the top bar.
- **Phone and WhatsApp:** +91 87077 05446 appears with Call, Copy, a WhatsApp link and a scannable QR code (the QR was checked by decoding a screenshot of it).
- **Full work history:** all 9 Fidelity codebases as an interactive system map (click, arrow keys, or a swipe strip on mobile), the 6 Marine Edge modules, education and certifications.
- **Every project:** 8 case studies (16 since v2.2) with architecture diagrams, plus an index of 36 projects from github.com/swayam555.
- **Skills:** a periodic table with 40 skills in 6 groups. Hovering a group dims the others.

### v2.1: projects sorted by year
- Case-study cards and the project table are now **sorted newest year first**. The table has a large year heading (2026, 2025, 2024) with a project count above each group, and filters keep the grouping.
- A project's year is read as the **latest** year in its `year` text, so `"2024 — 2026"` sorts as 2026. Projects from the same year stay in the order they're written in the data file.
- Marine Edge's index year was changed from 2024 to 2025 to match its case study (`2024 — 2025`).
- Files changed: `src/data/projects.ts` (added `endYear` and `byYearDesc`, sorted exports) and `src/components/WorkIndex.tsx` (year header rows).

### v2.2: eight new case studies
- Added case studies for **IMS, Payeazie, MediSync, Repo Pilot, ClaimSense, Procuro, FinTrack and FinTafsir**, written from each repo's code rather than its README. Case studies went from 8 to 16. Each one has a problem, role, decisions, challenges and an architecture diagram.
- The matching index rows now carry a `slug` (so they show the "Case study" badge) and have shorter descriptions.
- `repo-pilot` and `solutions` on GitHub hold the same code, so they share one entry, "Repo Pilot", which links to `repo-pilot`.
- FinTafsir's year changed from 2026 to 2025: its README's system-design image is dated April 2025.
- MediSync's billing service returns a placeholder account. Its case study says so under "Next step".
- The ticker computes the project and case-study counts from `projects.ts` (it had said "28 projects on GitHub") and now lists gRPC.
- Skill cells now mention IMS, Payeazie and MediSync where they're used. The grid stays at 40 cells, so gRPC isn't a separate cell: an extra cell would leave an empty row on wide screens.
- Files changed: `src/data/projects.ts`, `src/data/skills.ts`, `src/components/Ticker.tsx`, `src/app/layout.tsx` (keywords), `README.md`.

### v2.3: TorrentEdge renamed to TorrentShare
- The case study, index row and skill cells now say TorrentShare. The page moved from `/projects/torrentedge/` to `/projects/torrentshare/` (the site isn't deployed yet, so nothing links to the old URL), and the GitHub link points to `swayam555/TorrentShare`.
- The case study now covers the native BitTorrent engine (bencode, tracker, Kademlia DHT, peer wire protocol), checkpoint/resume, the move from MongoDB to PostgreSQL, and the 462 Jest tests.
- The Grafana screenshot was cropped to remove the old "TorrentEdge" breadcrumb (`public/projects/torrentshare-grafana.png`).

### v2.4: Toolbox redesign
- **Problem:** clicking or tapping a cell covered it with a solid black panel, so the cell seemed to disappear (worst on the black "Back end" cells). The group colours were also uneven: big orange and black blocks next to three near-identical beiges.
- **Cells:** every cell now has the same card background and ink text. The group shows as a coloured bar on top plus the 2-letter code. Hues are tokens `--g-*` in `globals.css`, one set per theme, and both sets pass the data-viz palette validator for adjacent groups. The light-theme hues under 3:1 contrast are always paired with a text label.
- **Readout:** clicking a cell selects it and shows its symbol, group and "Used in" in a panel above the grid. Cells are real buttons with `aria-pressed`.
- **Group buttons:** a click pins the highlight, hover previews it, and dimmed groups drop to 35% opacity without greyscale.
- **No black flashes:** only a cell's contents fade in on scroll; its background stays solid, so the ink grid no longer shows through as black squares.

### v2.5: Marine Edge system map
- **Map:** Marine Edge now has the same interactive system map as Fidelity: 9 areas (Android app, student portal, staff portals, public tools & SEO, exam integrity, payments & checkout, live classes, media & progress, Go API), each with what it is, what was built and a stack. It replaces the 6 static module cards.
- **One component:** `SystemMap` in `Experience.tsx` takes `id`, `label`, `systems` and `delivery`. Both companies use it, and the data lives in `experience.ts`.
- **Sources:** new points come from Swayam's own commits in the Marine Edge frontend, backend and mobile repos. That codebase is a team project (venzene and piyush-ranjan also commit), so the summary and the case-study role now say "three-person team".
- **Updated figures:** Play Store builds 13 → 14 (versionCode 14), and the mobile unit-test count is 2,500+ across 167 spec files.
- **Keyboard:** arrow keys now move focus along with the selection in both maps.

### v2.6: Marine Edge is front end and Android only
- **Rule:** Swayam asked that Marine Edge show no backend work. Only web front-end and Android points appear: no Go, PostgreSQL, server middleware, webhooks, Redis or hosting claims. Keep it that way.
- **Map:** the 9 areas are now Android app, Device features, Play Store releases, Student portal, Staff portals, Public tools & SEO, Exam integrity, Checkout, and Live classes & media.
- **Case study:** the decisions "Payments verified twice", "Server-authoritative progress" and "Less infrastructure" were replaced with front-end ones. Go and PostgreSQL left the stack, and the category is now "Front end". The architecture diagram still shows the Go API as context.
- **Field note 4** is now about the Android player's save throttling, with an animation that matches it. Skill cells: Go no longer cites Marine Edge, and Oracle Cloud says "Marine Edge image storage".

### v2.7: five Spring Boot case studies (current)
- **New case studies:** Veil (AI data firewall), Foyer (fair virtual waiting room), FraudShield (UPI fraud and mule detection), GigPay (earned-wage payouts on a double-entry ledger) and SwiftKart (10-minute delivery). Each has an index row and a case-study page, and they appear first in the 2026 group.
- **Sources:** every figure comes from that project's README and docs/TESTING.md in `~/Desktop/projects/<name>`. Repos are at `github.com/swayam555/<name>` in lowercase.
- **Skills:** Java, Spring Boot, Angular, React, PostgreSQL, Redis, Kafka, Kubernetes, JUnit and Playwright now cite these projects.
- **Grid:** with 21 case studies the 4-column grid had empty cells showing its ink background. `Featured` in `WorkIndex.tsx` now adds blank cells to complete the last row at 2 and 4 columns.

### Test status (v2.1)
181/181 automated browser checks pass on the production build, with no console or network errors. The checks cover:
- Every route and asset
- Résumé download
- Copy buttons
- Theme persistence
- The system map and its keyboard control
- Filter counts
- Year ordering
- The mobile menu
- No horizontal overflow at 390 px, 768 px and desktop widths
- Tap targets of at least 24 px
- Reduced motion
- The skip link

All 30 external links returned 200. Lint and typecheck are clean.

---

## 4. How to add a project

Projects live in **`src/data/projects.ts`**. There are two levels:

- **Index entry** (required): one row in the "Everything I've built" table.
- **Case study** (optional): a card plus a full page at `/projects/<slug>/`. Use this for the strongest projects only.

**Order doesn't matter.** Both lists are sorted by year automatically, so you can add new entries anywhere in the array.

### 4a. Add a row to the index

Add an object to `indexList`:

```ts
{
  name: "My Project",
  category: "Systems",            // "Systems" | "Full-stack" | "AI" | "DevOps" | "Front end"
  year: "2026",                   // decides which year group it appears in
  href: gh("my-repo"),            // gh() → https://github.com/swayam555/<repo>; or any full URL
  desc: "One line: what it does and the interesting part.",
  stack: ["Go", "Kafka", "Redis"], // 2–3 items read best
  // note: "Team project",        // optional small badge (e.g. "Production", "Private", "Team project")
},
```

- No `href`: the row isn't clickable. Use this for a private repo, together with `note: "Private"`.
- New category: add it to the `Category` type **and** to the `categories` array at the bottom of the file. The filter button and count appear automatically.

### 4b. Turn it into a case study

1. Add an object to `caseStudyList` with the `CaseStudy` type. Copy an existing one, such as `nexrule`, which is the shortest:

```ts
{
  slug: "my-project",                 // URL: /projects/my-project/
  name: "My Project",
  status: "Personal project",         // "Production" | "Personal project" | "Private repo"
  category: "Systems",
  tagline: "Short line under the title",
  summary: "2–3 sentences for the top of the page.",
  year: "2025 — 2026",                // ranges are fine; sorts by the last year
  stack: ["Go", "Kafka", "Redis"],
  links: [{ label: "GitHub", href: "https://github.com/swayam555/my-repo" }], // [] if private
  highlights: ["4 services", "p99 < 50 ms"],   // short stat chips, real numbers only
  problem: "What problem this solves and for whom.",
  role: "What *you* built. If it was a team project, name the collaborators here.",
  decisions: [{ title: "Decision", body: "Why, and what the trade-off was." }],
  challenges: ["A hard bug or constraint, and how it was solved."],
  diagram: { /* see 4c */ },
  // image: { src: "/projects/my-project.png", alt: "…", caption: "…" },  // optional, file goes in public/projects/
},
```

2. In the `indexList` entry for the same project, add **`slug: "my-project"`**. The row then shows a "Case study" badge and links to the page instead of GitHub.

That's all. The card, page, "next case study" link and sitemap entry are generated from this data.

### 4c. The architecture diagram

The diagram is an SVG drawn from data on an 820-unit-wide canvas (pick any height, typically 300–400).

```ts
diagram: {
  width: 820,
  height: 320,
  nodes: [
    // x/y = the node's centre. Keep x between ~90 and ~730 and y between ~40 and height-40.
    { id: "ui",  label: "React UI",  sub: "Vite",       x: 100, y: 160, kind: "client" },
    { id: "api", label: "API",       sub: "Express",    x: 330, y: 160, kind: "service" },
    { id: "db",  label: "PostgreSQL",                   x: 560, y: 80,  kind: "data" },
    { id: "q",   label: "Kafka",     sub: "events",     x: 560, y: 240, kind: "event" },
    { id: "ext", label: "Stripe",                       x: 740, y: 160, kind: "external" },
  ],
  edges: [
    { from: "ui", to: "api" },
    { from: "api", to: "db" },
    { from: "api", to: "q", label: "publish" },  // optional label
    { from: "api", to: "ext", both: true },      // both: arrows at both ends
  ],
},
```

`kind` sets the colour and style: `client`, `service`, `data`, `event` or `external`. The same data also draws the small preview on the case-study card.

### 4d. Check it

```bash
npm run typecheck   # catches missing or misspelled fields
npm run dev         # check the card, the table row in the right year, and /projects/<slug>/
npm run build       # must succeed before deploying
```

Also check the page at phone width (390 px) for long names that might overflow.

---

## 5. Other common edits

| Change | Where |
|---|---|
| Phone, email, WhatsApp, links, domain | `src/data/site.ts` |
| **Replace the résumé** | Overwrite `public/Swayam_Bajpai_Resume.pdf`, regenerate the preview with `pdftoppm -jpeg -r 110 -f 1 -l 1 -singlefile public/Swayam_Bajpai_Resume.pdf public/resume-preview`, and update `resumeUpdated` in `site.ts` |
| New job or role | `src/data/experience.ts`. To give a new company its own block, copy the Marine Edge pattern (`marineEdge` object + its render block in `Experience.tsx`) |
| Fidelity systems | `fidelity.systems` in `experience.ts`. Each has `name`, `layer`, `what`, `built[]`, `stack[]` |
| Skills | `src/data/skills.ts`: `{ sym: "Rs", name: "Rust", group: "Language", used: "Where it was used" }`. `sym` is 2 characters. Groups are fixed in `groups` |
| Field notes | `src/data/notes.ts`. `visual` must be one of the 4 existing animations, or add a new one in `NoteVisual.tsx` |
| Nav items | `nav` in `site.ts`, matching a section `id` |
| Colours / themes | Tokens at the top of `src/app/globals.css` (`:root` = Paper, `[data-theme="blueprint"]` = Blueprint). Components only use the tokens (`bg-bg`, `text-ink`, `text-accent`, …) |

---

## 6. Content rules (please keep these)

1. **Fidelity is confidential.** The source notes (`job applier/fidelity repo.odt`) are marked Confidential. Describe systems only by what they do and what was built. Never include internal hostnames, app IDs, database or schema names, internal tool names, code or screenshots.
2. **Only list work Swayam actually built.** For team projects, credit the collaborators: add a `note: "Team project"` badge, and on a case study say in `role` who else worked on it and which parts were Swayam's. Interviewers ask detailed questions about portfolio projects and often open the commit history.
3. **No invented numbers.** Stats and highlights must come from real work (résumé, repos, PRs). There are no skill bars and no fake testimonials.
4. Personal projects are labelled "Personal project". Marine Edge is "Production". Private repos have no link and show "walkthrough on request".
5. Only link repos under `github.com/swayam555` (plus marineedge.in). The Marine Edge Play Store link is commented out until the listing is public.

---

## 7. Technical gotchas

- **The `.display` class beats Tailwind utilities** (it's unlayered on purpose to keep heading line-heights). To undo its uppercase on one element, use an inline `style={{ textTransform: "none" }}`; `normal-case` won't work.
- **Hydration:** don't call `setState` synchronously inside `useEffect`. The lint rule `react-hooks/set-state-in-effect` enforces this. Set state from timers, callbacks or `useSyncExternalStore` instead (see the theme hook and the clock in `TopBar.tsx`).
- **Mobile overflow:** wide text inside grid or flex children needs `min-w-0`. Very large type should use `clamp()`.
- **Static export:** no server features (API routes, `cookies()`, runtime `next/image` optimisation). New dynamic routes need `generateStaticParams`.
- `npm audit` flags `braces`, a build-time dependency. It doesn't ship to visitors.
