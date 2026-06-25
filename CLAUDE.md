# Arzon Built — Project Context

This file is loaded automatically into every Claude Code session in this repo.
All agents in `.claude/agents/` inherit this context — they speak and design as
if they were on staff at Arzon Built.

---

## The Company

**Arzon Built** is a premium home-renovation studio. We work as a curated
subcontractor network — every trade is hand-picked, work is permitted and
inspected, and we deliver results that look more like editorial home features
than typical contractor work.

**Positioning:** *"We don't patch. We rebuild."* — Renovations engineered for
decades, not seasons. Surgical demolition, real materials, hand-detailed
finishes.

**Audience:** Homeowners with aging or distressed homes, neighborhood values
$400k–$1.2M, who have been burned once by a low-bid contractor and now want
quality over quote.

---

## Voice & Tone

- **Cinematic, not promotional.** Apple product-page rhythm. Editorial cadence.
- **Confident, never boastful.** State the work, let it stand.
- **Concrete over abstract.** "Marine-grade primer" beats "premium materials."
  "Stripped to bare wood" beats "thorough preparation."
- **Short sentences with contrast.** *"Same address. A presence it never had."*
- **No corporate filler.** No "solutions," "leverage," "synergize," "world-class."
- **Bilingual when speaking to the team:** the user (the owner) writes in
  Spanish; site copy is in English.

**Banned words on the site:** *amazing, world-class, leverage, solutions,
seamless, robust, cutting-edge, best-in-class, your dream home awaits.*

---

## Visual Identity

| Token        | Value       | Usage                                       |
|--------------|-------------|---------------------------------------------|
| `bg`         | `#09090b`   | Site background — near-black                |
| `surface`    | `#111114`   | Card backgrounds                            |
| `card`       | `#16161a`   | Elevated surfaces                           |
| `lime`       | `#E3EF26`   | Brand accent — sparingly, for CTAs & rules  |
| `lime/dark`  | `#b8c21a`   | Hover states                                |
| `amber`      | `#f59e0b`   | "Problem" / damage callouts only            |
| `muted`      | `#6b7280`   | Body text on dark                           |
| `subtle`     | `#9ca3af`   | Captions, eyebrows                          |

**Typography:** `Playfair Display` (display serif) for titles, `Inter` for body
and UI. Eyebrows: 10px, `tracking-[.4em]`, uppercase, `text-white/40`.

**Layout:** Generous whitespace. Centered narrative blocks. Section eyebrows
("01 / Process") instead of nav-style headers. Imagery is full-bleed; copy
breathes around it.

**Anti-patterns:** Drop shadows on text. Stock-photo people pointing at
laptops. Gradient buttons. Rounded blue card grids.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS with the custom palette above
- **Motion:** GSAP + ScrollTrigger (scroll-driven canvas in `TransformationSection`)
- **Smooth scroll:** Lenis (`SmoothScrollProvider`)
- **Three.js:** R3F particle field in hero (`ParticleField`)
- **Fonts:** Geist (next/font) — being phased out in favor of Playfair + Inter
- **Deployment target:** Vercel

---

## Site Structure (`app/components/sections/`)

| Section                    | Role                                                |
|----------------------------|-----------------------------------------------------|
| `HeroSection`              | First impression, particle field, primary CTA       |
| `TransformationSection`    | Scroll-driven 91-frame canvas, before → after story |
| `ServicesSection`          | What we do — kitchen, bath, exterior, full reno     |
| `PortfolioSection`         | Before/after case studies                           |
| `AboutSection`             | The studio + subcontractor model                    |
| `ContactSection`           | Free estimate request                               |
| `Footer`                   | Licenses, address, quiet links                      |

---

## When You're Asked to Write Copy

1. Read the section it's for. Match the cadence already there.
2. Title: 2–6 words, often with an em-dash or period for rhythm.
3. Body: ≤ 12 words, cinematic, declarative.
4. Hotspots/labels: 1–3 words label + optional 2–4 word detail.
5. CTAs: action verb first. "Get a real estimate" — not "Click here for free quote!"

## When You're Asked to Build UI

1. Centered text blocks for narrative sections (`text-center mx-auto max-w-2xl`).
2. Lime is an accent, not a fill. Use it for one CTA per viewport, the section
   rule (`section-rule`), and the active-state tabular-nums counter.
3. Maintain `clamp(2rem, 4.5vw, 3.75rem)` style fluid typography on display titles.
4. Animations: ease in `power2.out`, ease out `power2.in`. Durations 0.4–0.8s
   for UI; the scroll canvas uses its own scrub config.

## When You're Asked About Marketing / Sales

- Lead capture is the goal of every page — *Free estimate* is the one CTA.
- Premium remodel close cycle is 3–6 weeks; we sell trust, not urgency.
- Instagram and curb-appeal portfolio shots drive most warm leads.
- Reviews are gold — quote them sparingly, never with five-star clipart.

---

## Files an Agent Should Always Skim First

- `app/page.tsx` — section assembly order
- `app/layout.tsx` — fonts, providers, metadata
- `tailwind.config.ts` — the design tokens above
- `app/components/sections/TransformationSection.tsx` — the scroll canvas (most complex piece)
