# Oak KRD

Unified multilingual digital publishing platform (news, articles, books, audio, video, translations).

## Folder map

```
Oak KRD/
├── apps/
│   ├── website/     → FRONTEND (Next.js web UI) — port 3000
│   ├── backend/     → BACKEND API (Hono) — port 4000
│   └── mobile/      → MOBILE APP (Expo — placeholder)
├── packages/
│   ├── database/    → DATABASE (Prisma + PostgreSQL client)
│   └── shared/      → Shared types / nav sections / enums
├── docker-compose.yml  → PostgreSQL on port 5433
└── package.json
```

| Need | Folder | Port |
|------|--------|------|
| Website UI | `apps/website` | 3000 |
| Backend API | `apps/backend` | 4000 |
| Mobile | `apps/mobile` | — |
| DB schema/client | `packages/database` | — |
| Postgres | Docker Compose | **5433** |

## Setup

```bash
npm install
npm run db:up
npm run db:push
npm run db:generate
npm run db:seed          # optional demo content
```

## Run

```bash
npm run dev:backend      # http://localhost:4000
npm run dev:website      # http://localhost:3000
```

Demo publisher login (after seed): `editor@rudaw-demo.local` / `Password123!`

## Stack

- Website: Next.js 15 + Tailwind CSS 4 + next-intl (`ku` / `ar` / `en`)
- Backend: Hono + Node
- Database: PostgreSQL 16 + Prisma
- Auth: NextAuth (credentials) on the website; backend reads the same session cookie

---

## Design system

Source of truth: `apps/website/src/app/globals.css` and `apps/website/src/app/layout.tsx`.

### Colors

| Token | Hex | Use |
|-------|-----|-----|
| Bone (page background) | `#FCFBF8` | Main page / paper |
| Paper | `#fffcf5` | Slightly brighter surface |
| Ink | `#1A1512` | Body text, rules, utility bar |
| FireBrick (accent) | `#B22222` | CTAs, active nav, kickers, badges |
| FireBrick dark | `#8B1A1A` | Hover on accent buttons |
| Stone | `#6B6560` | Muted / secondary text |
| Sand | `#EFEBE0` | Soft fills / skeletons |
| Rule / clay | `#CFC8BB` / `#D4CFC4` | Dividers, borders |
| Hero background | `#1A1512` | Dark featured band |

CSS variables: `--oak-bone`, `--oak-ink`, `--oak-fire`, `--oak-fire-dark`, `--oak-stone`, `--oak-sand`, `--oak-rule`, etc.  
Tailwind: `bg-oak-bone`, `text-oak-fire`, `border-oak-rule`, …

### Typography (fonts)

| Role | Font | Weights | CSS class / variable |
|------|------|---------|----------------------|
| Brand / logo | **Bodoni Moda** | 600 | `.font-brand` / `--font-bodoni` |
| Headlines | **Newsreader** | 400, 500, 600 | `.font-display` / `--font-newsreader` |
| UI / body | **Source Sans 3** | 400, 600, 700 | default body / `--font-source-sans` |

Loaded via `next/font/google` in `apps/website/src/app/layout.tsx`.

### Type sizes (approximate)

| Element | Size |
|---------|------|
| Masthead logo | `clamp(2rem, 8vw, 3.75rem)` (~32–60px) |
| Hero brand | `clamp(2rem, 7vw, 3rem)` |
| Hero / section headlines | `clamp(1.5rem, 4.5–5vw, 3rem)` |
| Section nav labels | 10–11px, bold, uppercase, wide tracking |
| Kicker / category | ~0.7rem (11px), bold, uppercase, FireBrick |
| “Hot now” badge | ~0.65rem, white on FireBrick |
| Body / article | `clamp(1rem, …, 1.125rem)`, line-height ~1.8 |
| Utility bar | ~11–12px |

### Layout & UI notes

- Max content width: **72rem** (`.oak-container`)
- Horizontal padding: 1rem → 1.5rem → 2rem by breakpoint
- Top chrome (utility bar + masthead + section nav) stays **LTR** even in Arabic/Kurdish; page content uses RTL when `ku` / `ar`
- Section nav: Home, News, Articles, Books, Audiobooks, Research, Podcasts, Video, Translations
- Sticky section nav on scroll; accent underline / FireBrick for active item
- Look: newspaper-inspired (masthead + hairline rules), bone paper + FireBrick accent

### Locales

- UI + content: **Kurdish (`ku`)**, **Arabic (`ar`)**, **English (`en`)**
- Messages: `apps/website/messages/{ku,ar,en}.json`

---

## Useful scripts

| Script | What it does |
|--------|----------------|
| `npm run dev:website` | Next.js app |
| `npm run dev:backend` | API server |
| `npm run db:up` | Start Postgres Docker |
| `npm run db:push` | Sync Prisma schema |
| `npm run db:seed` | Load demo Kurdish-style content |
| `npm run db:studio` | Prisma Studio |
