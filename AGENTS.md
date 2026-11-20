# AGENTS.md

Instructions for AI coding agents (Cursor, Codex/ChatGPT, Claude) working in this repository.
Claude Code reads this through `CLAUDE.md`.

**Read `GUARDRAILS.md` first.** Its rules come from the owner, are non-negotiable and override everything else
(no GitHub commands, no deleting, no leaving this folder, no creating files before approval).

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
pnpm check       # lint + typecheck + build, run this before finishing
```

Use pnpm only. Do not add npm or yarn lockfiles.

## Automated checks (guardrails)

These run for every agent and every human, whatever the model or editor.

| Where                           | What it does                                                                |
| ------------------------------- | --------------------------------------------------------------------------- |
| `GUARDRAILS.md`                 | The owner's safety rules for every agent                                    |
| `.agents/guardrails/*.sh`       | Hook scripts: block or ask before risky commands and file access            |
| `.claude/settings.json`         | Claude Code: guard hooks, deny rules, sandbox, lint after each edit         |
| `.cursor/hooks.json`            | Cursor: the same guard scripts for shell and file reads                     |
| `.cursor/rules/project.mdc`     | Cursor: points to `GUARDRAILS.md` and this file                             |
| `eslint.config.mjs`             | Blocks wrong layer imports, `dark:` classes and hex colours (rules 1, 3, 4) |
| `lefthook.yml`                  | pre-commit: guardrail files, lint, typecheck. pre-push: owner only + check  |

If a check or hook blocks you, fix the code or ask the owner. Do not disable a rule, skip a hook (`--no-verify`)
or rephrase a command to get past it.
The only allowed exception is `themeColor` in `src/app/layout.tsx`, which cannot read CSS tokens.

## Read before changing code

| Task                                   | Read                          |
| -------------------------------------- | ----------------------------- |
| Where files go, import rules, SSR      | `docs/architecture.md`        |
| Colours, light/dark, type, motion      | `docs/design-system.md`       |
| Which component exists, and its props  | `docs/components.md`          |
| Editing text, adding projects or posts | `docs/content-and-blog.md`    |
| Step-by-step recipes for any UI change | `SKILLS.md`                   |

## Rules that are easy to get wrong

1. **Folders import one way only:** `app → modules → components → lib`.
   `components/` (`ui`, `layout`, `motion`) never imports from `modules/`, and `ui` never imports `layout`.
   A module imports another module only through its `index.ts`.
2. **No copy in components.** All text and data live in `src/content/*.ts`, typed by `src/content/types.ts`.
3. **Never hard-code a colour.** Use token classes (`bg-card`, `text-muted`, `border-line`, `text-accent`).
   Hex values belong only in the `:root` blocks of `src/app/globals.css`.
4. **Do not use Tailwind's `dark:` variant.** Dark mode works by swapping the token values, so one
   class is correct in both themes. Every new token needs a light and a dark value (three blocks to edit).
5. **Server components by default.** Add `"use client"` only for real interactivity, and keep it in the
   smallest possible component (see `src/components/motion/` and `ThemeToggle`).
6. **Reuse before creating.** Check `docs/components.md`. A new variant is a prop on the existing
   component, not a copy of it.
7. **Do not override a ui component's `display` or `max-width` through `className`.** `cn()` only joins strings and
   does not resolve Tailwind conflicts. Use the component's prop (`<Container size="narrow">`) or a wrapper element.
8. **Motion:** easing is always `ease-expo`. Never use the default `ease`/`linear` for UI transitions.
   Scroll reveals use `<Reveal>`; do not attach scroll listeners for animation.
   One owner-approved exception: the nav underline in `SiteHeader` is tied to the scroll position (passive listener, rAF).
   Owner-approved: CSS scroll timelines (`animation-timeline`, such as the `.oss-*` open source timeline) use
   `linear`, because their progress follows the scroll position and is not a timed transition.
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
