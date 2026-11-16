# AGENTS.md

Instructions for AI coding agents (Cursor, Codex/ChatGPT, Claude) working in this repository.
Claude Code reads this through `CLAUDE.md`.

## Project

Personal portfolio and blog of Nayan Bagale.
Next.js 16 (App Router) · React 19 · TypeScript 6 · Tailwind CSS 4 · pnpm.

## Commands

```bash
pnpm install
pnpm dev         # local server on :3000
pnpm build       # production build (must pass before finishing a task)
pnpm lint        # ESLint, must report nothing
pnpm typecheck   # tsc --noEmit
```

Use pnpm only. Do not add npm or yarn lockfiles.

## Read before changing code

| Task                                   | Read                          |
| -------------------------------------- | ----------------------------- |
| Where files go, import rules, SSR      | `docs/architecture.md`        |
| Colours, light/dark, type, motion      | `docs/design-system.md`       |
| Which component exists, and its props  | `docs/components.md`          |
| Editing text, adding projects or posts | `docs/content-and-blog.md`    |
| Step-by-step recipes for any UI change | `SKILLS.md`                   |

## Rules that are easy to get wrong

1. **Atomic layers import one way only:** `atoms → molecules → organisms → templates → app`.
   A layer never imports from a layer to its right. `motion/` may be imported by molecules and above.
2. **No copy in components.** All text and data live in `src/content/*.ts`, typed by `src/content/types.ts`.
3. **Never hard-code a colour.** Use token classes (`bg-card`, `text-muted`, `border-line`, `text-accent`).
   Hex values belong only in the `:root` blocks of `src/app/globals.css`.
4. **Do not use Tailwind's `dark:` variant.** Dark mode works by swapping the token values, so one
   class is correct in both themes. Every new token needs a light and a dark value (three blocks to edit).
5. **Server components by default.** Add `"use client"` only for real interactivity, and keep it in the
   smallest possible component (see `src/components/motion/` and `ThemeToggle`).
6. **Reuse before creating.** Check `docs/components.md`. A new variant is a prop on the existing
   component, not a copy of it.
7. **Do not override an atom's `display` or `max-width` through `className`.** `cn()` only joins strings and
   does not resolve Tailwind conflicts. Use the component's prop (`<Container size="narrow">`) or a wrapper element.
8. **Motion:** easing is always `ease-expo`. Never use the default `ease`/`linear` for UI transitions.
   Scroll reveals use `<Reveal>`; do not attach scroll listeners for animation.
9. **Internal links use `next/link`** (`Button` does this automatically for paths starting with `/`).
   External links get `target="_blank" rel="noopener noreferrer"`.
10. **Accessibility is required:** visible focus (global `:focus-visible` is set), `aria-label` on icon-only
    controls, `aria-hidden` on decoration, real `alt` text on images.

## Definition of done

- `pnpm lint`, `pnpm typecheck` and `pnpm build` pass.
- The change looks right at 390px, 820px and 1280px wide, in both light and dark themes.
- New text is in `src/content`, new colours are tokens, new components are exported from their layer's `index.ts`.
- Docs in `docs/` are updated if a component, token or convention changed.

## Do not

- Add a UI library, CSS-in-JS, or an animation library without being asked.
- Add fonts outside `src/lib/fonts.ts`.
- Invent facts about Nayan (jobs, numbers, links). Placeholders are marked in `src/content`; leave them
  until real values are provided.
