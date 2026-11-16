# Architecture

## Stack

| Part       | Choice                                                         |
| ---------- | -------------------------------------------------------------- |
| Framework  | Next.js 16, App Router, React 19                               |
| Language   | TypeScript 6, `strict`                                         |
| Styling    | Tailwind CSS 4 (CSS-first config in `src/app/globals.css`)     |
| Fonts      | `next/font/google`, defined in `src/lib/fonts.ts`              |
| Lint       | ESLint 9 flat config with `eslint-config-next`                 |
| Packages   | pnpm                                                           |

TypeScript is held at 6 and ESLint at 9 because `typescript-eslint` and the Next ESLint plugins do not
support TypeScript 7 or ESLint 10 yet. Upgrade them together once support lands.

## Folder map

```
src/
  app/                      Routing only
    layout.tsx              <html>, fonts, metadata, SiteHeader, <main>, SiteFooter, BackToTop
    globals.css             Tokens, Tailwind theme, motion helper classes, article typography
    page.tsx                /            → HomeTemplate
    blog/page.tsx           /blog        → BlogIndexTemplate
    blog/[slug]/page.tsx    /blog/<slug> → ArticleTemplate (local posts only)
    not-found.tsx           404
    icon.svg                Favicon
  components/
    atoms/                  No project components inside them
    molecules/              Built from atoms
    organisms/              Page sections and site chrome
    templates/              Arrangement of organisms for a page
    motion/                 Client-only animation wrappers
  content/                  Typed text and data
  lib/                      cn(), fonts, icon paths
public/                     Static files (portrait)
docs/                       These documents
```

Path alias: `@/*` → `src/*`. Each component folder has an `index.ts` barrel; import from the barrel
(`@/components/atoms`), not from the file.

## Layering rule

```
atoms → molecules → organisms → templates → app
          ↑ motion (usable from molecules upward)
content and lib are usable from every layer
```

A file may import only from layers to its left. `app/` pages contain no markup beyond choosing a template
and passing data.

## Rendering model

- Every route is prerendered on the server at build time (`/`, `/blog` static; `/blog/[slug]` via
  `generateStaticParams`, with `dynamicParams = false` so unknown slugs return 404).
- Components are React Server Components unless the file starts with `"use client"`.
- Client components, and why:

  | Component                 | Reason                                         |
  | ------------------------- | ---------------------------------------------- |
  | `organisms/SiteHeader`    | scroll state, active link, mobile menu         |
  | `organisms/BackToTop`     | scroll state                                   |
  | `molecules/ThemeToggle`   | click handler, localStorage                    |
  | `motion/Reveal`           | IntersectionObserver                           |
  | `motion/WordReveal`       | IntersectionObserver                           |
  | `motion/Spotlight`        | pointer position                               |

  Server components can be passed as `children` into these, so sections stay on the server.

## Theme mechanism

1. Tokens are CSS variables on `:root` (light). Dark values apply when the system prefers dark
   (`@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`) or when
   `<html data-theme="dark">` is set.
2. `ThemeToggle` sets `document.documentElement.dataset.theme` and stores it in `localStorage["theme"]`.
3. An inline script in `layout.tsx` applies the stored theme before first paint, which avoids a flash.
   `<html>` has `suppressHydrationWarning` for this reason.
4. The same script sets `data-js="1"` on `<html>`. Scroll-reveal styles are scoped to `[data-js]`, so
   content is visible if JavaScript never runs.

## Conventions

- Named exports, one component per file, PascalCase file names.
- Props are typed inline or with a local `Props` type. Shared data shapes live in `src/content/types.ts`.
- Class names are composed with `cn()` from `@/lib/cn`. It joins strings only; it does not merge
  conflicting Tailwind classes, so variants must be chosen in code rather than overridden.
- Variants are a union prop mapped through a `const` object (`Button`, `Pill`, `Container`).
- Numbers shown as `/01` use `String(index + 1).padStart(2, "0")`.
- A literal `//` in JSX text must be written as `{"// "}` (lint rule).
