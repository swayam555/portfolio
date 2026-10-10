# Swayam Bajpai: Portfolio

Next.js (static export), TypeScript, Tailwind CSS v4 and Motion. There's no backend and there are no secrets. See `PLAN.md` for the research and design reasoning.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run lint && npm run typecheck
```

## Edit content
Everything lives in `src/data/`:
- `site.ts`: name, email, links, **SITE_URL** (set this to your domain)
- `experience.ts`: Fidelity (9-system map), Marine Edge modules, education, certifications
- `notes.ts`: the four "Field notes" engineering stories
- `projects.ts`: 16 case studies (with diagram nodes) and the full 36-project index
- `skills.ts`: the periodic table of the stack

Themes: "Paper" (default) and "Blueprint", toggled in the top bar and remembered per visitor.
The WhatsApp QR code is generated at build time from `site.whatsapp`.

To update the résumé, replace `public/Swayam_Bajpai_Resume.pdf`.

## Deploy
- **Vercel** (easiest): import the repo, framework "Next.js", and click deploy. Then add a custom domain.
- **Netlify / Cloudflare Pages**: build command `npm run build`, output directory `out`.
- **GitHub Pages**: push `out/` to a `gh-pages` branch. If you serve from a sub-path, add `basePath` in `next.config.ts`.
