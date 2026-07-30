# Kurt Rainier Sacay — portfolio

Production portfolio site. Next.js 16 (App Router, Turbopack), TypeScript,
Tailwind CSS v4, MDX content, react-three-fiber for the decorative hero scene.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Where content lives

- `content/work/*.mdx` — case studies. Frontmatter: `title`, `slug`, `summary`,
  `role`, `stack`, `year`, optional `outcome`, `links`, `cover`.
- `content/notes/*.mdx` — blog posts. Frontmatter: `title`, `slug`, `summary`,
  `date`.
- `src/config/site.ts` — name, links, email, location, nav. All copy that
  isn't page-specific prose lives here, not hardcoded in components.
- `src/config/pricing.ts` — service starting prices (currently `TODO`
  placeholders — see below).

### Adding a case study

1. Add a new `.mdx` file to `content/work/` with the frontmatter fields above.
2. Body structure: `## Problem`, `## Approach`, `## Architecture`, `## Result`,
   `## What I'd do differently`. Use `<MediaPlaceholder label="..." />` for any
   screenshot/diagram slot that doesn't have a real asset yet.
3. It shows up automatically on `/work` and at `/work/[slug]` — no route code
   to touch. `generateStaticParams` picks it up from the filesystem.

### Adding a note

Same pattern under `content/notes/`. Don't add filler posts — an empty section
is better than thin AI-generated content for SEO and for readers.

## Known TODOs before launch

- `NEXT_PUBLIC_SITE_URL` — set in Vercel to the real production domain.
  Currently falls back to `localhost:3000`.
- `src/config/pricing.ts` — real starting prices, currently `"TODO"`.
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` — set in Vercel to enable the
  contact form's email delivery (`src/app/contact/actions.ts`). Until set,
  the form tells visitors to email directly instead.
- GitHub link in `src/config/site.ts` points to an account with no bio,
  display name, or README — populate before linking it from client-facing
  copy.
- `year` frontmatter on every case study in `content/work/` is `"TODO"` —
  replace with the real year once confirmed.
- Every case study has `<MediaPlaceholder />` slots for screenshots/diagrams
  that don't exist yet.

## Stack notes

- Server Components by default; `"use client"` only for the theme toggle,
  the contact form, and the 3D scene.
- The 3D hero scene (`src/components/hero-scene/`) lazy-loads client-side
  only (`next/dynamic`, `ssr: false`), never renders under
  `prefers-reduced-motion`, never renders below a 768px viewport, and pauses
  its render loop when off-screen or the tab is hidden.
- MDX is compiled at request time via `next-mdx-remote/rsc` from files read
  off disk (`src/lib/content.ts`) — no CMS, no database.
