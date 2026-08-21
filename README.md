# Chuchin Ultimate Productions — Website

A Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion marketing site
for Chuchin Ultimate Productions Ltd.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Brand tokens (tailwind.config.ts)

| Token       | Hex       | Use                                  |
|-------------|-----------|---------------------------------------|
| `charcoal`  | `#2B2A2A` | Primary text, dark sections, wordmark |
| `orange`    | `#F4661E` | Primary accent, CTAs, links           |
| `gold`      | `#F5A623` | Secondary accent, gradients           |
| `offwhite`  | `#FAF7F2` | Primary background                    |
| `white`     | `#FFFFFF` | Card surfaces only                    |

Fonts: **Sora** (display/headings) + **Inter** (body), loaded via `next/font/google`.

## Structure

```
/app                    Route segments (one folder per page)
/components/layout      Header, Footer, Navigation
/components/sections    Page sections (Hero, FeaturedProduction, etc.)
/components/ui          Reusable primitives (Button, Card, ApertureIcon, PlaceholderMedia)
/lib/data               Typed content objects — swap for a CMS later
/public/images          Asset folders matching the brief's folder structure
```

## Content & assets

All copy is real, pulled directly from the client's brief (`lib/data/*.ts`). Media —
logo, hero video, posters, founder photo, trailers — is still a placeholder
(`PlaceholderMedia` component) until the client delivers final files. Drop assets into
the matching `/public/images/*` folder and swap the placeholder for `next/image` or a
`<video>`/embed where noted in the component.

## Signature element

`components/ui/ApertureIcon.tsx` — the brand's aperture/shutter mark, rendered as an
animated SVG with the orange→gold gradient. Reused as a hover accent, section divider,
and ambient motion in the hero and CTA bands.

## Notes for developers

- The newsletter and contact forms are client-side only right now (no backend wired up).
  Both are marked with comments at the point they need an API route or email provider.
- The contact form has a honeypot field for basic spam protection; swap in a
  reCAPTCHA/Turnstile check for production use.
- `prefers-reduced-motion` is respected globally (see `globals.css` and `ApertureIcon`).
