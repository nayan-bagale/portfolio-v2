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
    page.tsx                /            → HomePage
    blog/page.tsx           /blog        → BlogIndexPage
    blog/[slug]/page.tsx    /blog/<slug> → ArticlePage (local posts only)
    not-found.tsx           404
    icon.svg                Favicon
  components/               Shared, reusable across modules
    ui/                     Small building blocks (Button, Pill, Icon, Container ...)
    layout/                 Site chrome and shared sections (header, footer, ContactSection)
    motion/                 Client-only animation wrappers
  modules/                  One folder per feature or page
    home/                   HomePage.tsx, components/ (Hero, sections, cards), index.ts
    blog/                   BlogIndexPage.tsx, ArticlePage.tsx, components/, index.ts
  content/                  Typed text and data
  lib/                      cn(), fonts, icon paths
  lib/                      cn(), fonts, icon paths
public/                     Static files (portrait)
docs/                       These documents
```

Path alias: `@/*` → `src/*`. Each component folder has an `index.ts` barrel; import from the barrel
(`@/components/ui`, `@/modules/blog`), not from the file.

## Import rule

| Folder        | May import                                                      |
| ------------- | --------------------------------------------------------------- |
| `app`         | `modules`, `components`, `content`, `lib`                       |
| `modules`     | `components`, `content`, `lib`, and another module's `index.ts` only |
| `components`  | `lib`, `content` (never `modules`)                              |
| `lib`         | nothing from the project                                        |

Inside `components`: `ui` is the base, `layout` and `motion` may use `ui`; `ui` never imports `layout`.
Inside a module, files import their own folder with relative paths. `app/` pages contain no markup beyond
choosing a page component and passing data.

## Rendering model

- Every route is prerendered on the server at build time (`/`, `/blog` static; `/blog/[slug]` via
  `generateStaticParams`, with `dynamicParams = false` so unknown slugs return 404).
- Components are React Server Components unless the file starts with `"use client"`.
- Client components, and why:

  | Component                 | Reason                                         |
  | ------------------------- | ---------------------------------------------- |
  | `layout/SiteHeader`       | scroll state, active link, mobile menu         |
  | `layout/BackToTop`        | scroll state                                   |
  | `layout/ThemeToggle`      | click handler, localStorage                    |
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
