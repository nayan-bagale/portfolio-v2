# portfolio-v2

Personal site of Nayan Bagale. Next.js (App Router), React, TypeScript and Tailwind CSS v4.
Pages are rendered on the server and prerendered at build time; only small interactive parts ship JavaScript.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint
pnpm typecheck
```

## Structure

```
src/
  app/                    Routes. Pages only pick data and a template.
    layout.tsx            Fonts, metadata, header, footer
    globals.css           Design tokens + Tailwind theme + motion helpers
    page.tsx              Home
    blog/page.tsx         Blog index
    blog/[slug]/page.tsx  Article page for posts written in this project
  components/             Shared across modules
    ui/                   Button, Pill, Kicker, Accent, Icon, PillList, SocialLinks ...
    layout/               SiteHeader, SiteFooter, BackToTop, ThemeToggle, ContactSection
    motion/               Client-side animation wrappers: Reveal, Spotlight, WordReveal
  modules/                One folder per feature or page
    home/                 HomePage, Hero, sections and cards
    blog/                 BlogIndexPage, ArticlePage, PostRow, ArticleBody
  content/                All text and data, typed. Edit here, not in components.
  lib/                    cn(), fonts, icon paths
```

Import direction is one way: app → modules → components → lib.

## Common changes

| I want to...                | Edit                                            |
| --------------------------- | ----------------------------------------------- |
| Change colours              | `:root` tokens in `src/app/globals.css`         |
| Change fonts                | `src/lib/fonts.ts`                              |
| Set email, CV, social links | `src/content/site.ts`                           |
| Edit hero, tagline, contact | `src/content/home.ts`                           |
| Add a job / skill / project | `experience.ts`, `skills.ts`, `projects.ts`     |
| Add an article              | `src/content/posts.ts`                          |
| Reorder home sections       | `src/modules/home/HomePage.tsx`                 |

## Docs for people and AI agents

| File                                   | For                                                        |
| -------------------------------------- | ---------------------------------------------------------- |
| `AGENTS.md`                            | Rules for coding agents (Cursor, Codex/ChatGPT, Claude)    |
| `CLAUDE.md`                            | Claude Code entry point; imports `AGENTS.md`               |
| `SKILLS.md`                            | Step-by-step recipes for UI work                           |
| `docs/architecture.md`                 | Folders, layering, server/client split, theme mechanism    |
| `docs/design-system.md`                | Tokens for light and dark, type, spacing, motion           |
| `docs/components.md`                   | Every component and its props                              |
| `docs/content-and-blog.md`             | Editing content, adding projects and posts                 |

## Blog

`src/content/posts.ts` holds every article, newest first.

- **External article** (Medium, etc.): set `href`. It opens in a new tab.
- **Article written here**: set `slug` and `body`. It is served at `/blog/<slug>`
  using `ArticlePage`, with typography from the `.prose-article` class.

`ArticlePage` accepts any children, so the `body` blocks can later be swapped
for MDX without touching the layout.

## Still placeholders

Search for `example.com` and `your-username` in `src/content` and replace them.
`site.email` is empty, so the contact buttons scroll to the contact section until it is set.
