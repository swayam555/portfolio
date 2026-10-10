# Portfolio plan: Swayam Bajpai

## Positioning
**Full-stack software engineer with a backend focus. Ships fintech and edtech products in production.**

The proof, in order of strength:
1. Fidelity Investments (Plynk Invest): Spring Boot microservices on AWS EKS, plus the Angular account-opening rebuild.
2. Marine Edge: a production edtech platform (Next.js web + an Angular app on Google Play) that I built end to end.
3. Systems projects on github.com/swayam555: TorrentShare (formerly TorrentEdge), GraphEcomX, GoMicroHub, NexRule, DevLab.

## What the research says (patterns from 50+ engineer portfolios)
Reference sites: brittanychiang.com, antfu.me, leerob.com, arpitbhayani.me, taniarascia.com, rauno.me, paco.me, joshwcomeau.com, lelandjansen.com, and the Colorlib and SiteBuilderReport roundups.

| Pattern | What I'm taking from it |
|---|---|
| Role and proof visible within 5 seconds | Hero gives name, role and three proof points (Fidelity, Marine Edge on Play, systems work) |
| Curated work over a repo dump | 5 featured projects, each with its own case study page |
| Show engineering thinking | An "Engineering notes" section with real problems I solved: fan-out latency, HTTP 207, the 18-digit ID bug, server-authoritative progress |
| Restrained design, purposeful motion | Dark editorial look, one lime accent, scroll reveals, a cursor spotlight, animated architecture diagrams. Everything respects reduced motion |
| Contact always within reach | Sticky nav with Résumé, plus GitHub, LinkedIn and email in the hero, footer and a fixed side rail |
| No fake signals | No skill bars, invented stats or testimonials. Every number comes from the résumé or LinkedIn copy |

## Information architecture
- `/`: Hero → Experience (tabbed) → Engineering notes → Featured projects → More on GitHub → Skills → About → Contact
- `/projects/[slug]`: case study pages covering problem, architecture diagram, decisions, challenges and links
- `/resume.pdf`: the current résumé (`swayam_sde_fidelity.pdf`)
- `sitemap.xml`, `robots.txt`, a custom 404 page, Open Graph metadata

## Stack
Next.js (App Router, static export), TypeScript, Tailwind CSS v4 and Motion. All content lives in `src/data/*.ts`, so you can edit it without touching components. There's no backend and no API keys. The `out/` folder can be hosted on Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## Content rules
- Only repos under github.com/swayam555 are linked.
- Fidelity work is described at the level already public on LinkedIn: no internal URLs, code or screenshots.
- Personal projects are labelled "Personal project". Marine Edge is labelled "Production".

## Before going live, you need to
- Buy or choose a domain, then set `SITE_URL` in `src/data/site.ts`
- Check the Play Store link (`com.marineedge.app`) and the marineedge.in link
- Optionally add `public/og.png` (1200×630)

## v2 (redesign, 2026-10-10)
- Look: an "engineering dossier", not a dark dev template. Warm paper with ink and signal orange, condensed Archivo display type, IBM Plex Mono labels, graph-paper grid. Optional "Blueprint" dark theme.
- Résumé at the top: a real preview of the PDF in the hero with Download / View, plus a Résumé button in the top bar on every screen size.
- Contact: phone (call + copy), WhatsApp (link + QR code), email, LinkedIn, GitHub in the hero and the contact section.
- Content: all 9 Fidelity codebases as an interactive system map (no internal hostnames, IDs or schemas), 6 Marine Edge modules, 8 case studies, and an index of all 28 real projects on github.com/swayam555.
