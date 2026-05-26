# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start dev server with Turbopack
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # ESLint with auto-fix (TypeScript + TSX)
```

No test suite is configured. UI changes should be verified manually in the browser.

## Architecture Overview

**My LoL Skins** is a Next.js 15 (App Router) PWA for tracking League of Legends skin collections. All data persists client-side in IndexedDB via Dexie — there is no backend or authentication.

### Data flow

1. **Riot Data Dragon API** (`app/api/dataDragonAPI.ts`) — server-side fetches for champion/skin metadata. Results are module-level cached for 24 hours. Env vars control the base URL and language.
2. **Community Dragon API** — also fetched in `dataDragonAPI.ts` for skin rarity data (`kEpic`, `kLegendary`, etc.). Rarity drives auto-pricing via `utils/skinPricing.ts`.
3. **IndexedDB** (`db/IndexedDB.ts`, Dexie v4 schema) — stores the user's owned skins (`skins` table) and wishlist (`wishlist` table). The `Skin` interface is the canonical shape; schema versions must be bumped for any column changes.
4. **Dexie React Hooks** (`useLiveQuery`) — components subscribe to IndexedDB reactively; no global state manager.

### Key pages

| Route | Purpose |
|---|---|
| `/` | Champions grid (server-rendered, Data Dragon) |
| `/[championName]` | All skins for a champion; skin cards add to collection |
| `/my-skins` | User's owned skin collection from IndexedDB |
| `/wishlist` | Wishlist from IndexedDB |
| `/news` | External LoL news |
| `/about` | Static about page |

### Component conventions

- UI primitives come from **NextUI** (`@nextui-org/*`). Don't swap them for raw HTML.
- Styling is **Tailwind CSS** with `clsx` for conditional classes.
- `components/primitives.ts` holds reusable Tailwind variant helpers (via `tailwind-variants`).
- Theme is managed by `next-themes`; dark mode is the default (`defaultTheme: "dark"`).
- `app/providers.tsx` wraps the tree with `NextUIProvider` + `NextThemesProvider`.

### Skin pricing

`utils/skinPricing.ts` maps Community Dragon rarity strings (e.g. `kEpic` → 1350 RP). Skins with `kNoRarity` have no automatic price — the user sets it manually via `components/rp-price-editor.tsx`. The migration tool (`components/price-migration-tool.tsx`, `utils/migrateSkinPrices.ts`) back-fills prices into existing IndexedDB records.

### Image sources

- Splash arts: `ddragon.leagueoflegends.com` (whitelisted in `next.config.js`; images are unoptimized)
- `next.config.js` has `unoptimized: true` — do not add `next/image` optimization logic.

### Environment variables

Copy `.env.local` as the template (already committed). Required vars:

```
NEXT_PUBLIC_DATA_DRAGON_GAME_PATCH_VERSION_URL
NEXT_PUBLIC_DATA_DRAGON_BASE_URL
NEXT_PUBLIC_DATA_DRAGON_LANGUAGE
NEXT_PUBLIC_CARD_WIDTH / NEXT_PUBLIC_CARD_HEIGHT
```

Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Google Analytics 4.

### IndexedDB schema changes

Always add a new `this.version(N).stores({...})` block in `db/IndexedDB.ts`. Never modify existing version definitions — Dexie uses them for incremental migrations on existing user databases.
