# Component catalogue

Import from the folder barrel: `import { Button, Pill } from "@/components/ui"`.
"Client" means the file has `"use client"`.

## UI (`src/components/ui`)

| Component      | Props                                                                                   | Notes                                                         |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Accent`       | `children`                                                                              | Italic serif accent word inside a heading                     |
| `Button`       | `href`, `variant: "primary" \| "ghost"`, `tone: "default" \| "inverse"`, `size: "md" \| "sm"`, `arrow: "up-right" \| "down" \| "none"`, `className` | Always a link. `/…` → `next/link`; `http…` opens a new tab |
| `Container`    | `size: "wide" \| "narrow"`, div props                                                   | Page width and gutter                                         |
| `Icon`         | `name: IconName`, `className`                                                           | Paths in `src/lib/icons.ts` (Phosphor, 256 viewBox)           |
| `Kicker`       | `children`, `className`                                                                 | Renders `// LABEL` with the accent dot                        |
| `Logo`         | none                                                                                    | Monogram + name, links home                                   |
| `Pill`         | `tone: "default" \| "onAccent" \| "inverse"`, `children`                                | Mono uppercase tag                                            |
| `PillList`     | `items: string[]`, `tone`, `className`                                                  | Wrapping row of `Pill`                                        |
| `PulseDot`     | `className`                                                                             | Green status dot                                              |
| `SectionTitle` | `as: "h1" \| "h2"`, `className`, `children`                                             | Large heading; use `as="h1"` on non-home pages                |
| `SocialLinks`  | `links: SocialLink[]`, `className`                                                      | Pill links, open in a new tab                                 |

## Motion (`src/components/motion`) — all client

| Component    | Props                              | Notes                                                   |
| ------------ | ---------------------------------- | ------------------------------------------------------- |
| `Reveal`     | `delay` (ms), `className`          | Fade-up once on scroll. Renders a wrapping `div`        |
| `Spotlight`  | `className`                        | Card root with cursor glow; is `relative overflow-hidden` |
| `WordReveal` | `text`, `className`                | Paragraph whose words light up while scrolling          |

Because `Reveal` adds a wrapper, cards inside grids should be `h-full`.

## Layout (`src/components/layout`)

| Component        | Data source                         | Notes                                                    |
| ---------------- | ----------------------------------- | -------------------------------------------------------- |
| `SiteHeader`     | `content/site.ts` (`nav`)           | Client. In `layout.tsx`. Active link from section ids    |
| `SiteFooter`     | `content/site.ts`                   | In `layout.tsx`                                          |
| `BackToTop`      | none                                | Client. In `layout.tsx`                                  |
| `ThemeToggle`    | none                                | Client. Sets `data-theme`, saves to localStorage         |
| `ContactSection` | `content/home.ts` (`contact`)       | `id="contact"`; inverted surface with the portrait. Used by home and blog pages |

## Home module (`src/modules/home`)

Public entry: `import { HomePage } from "@/modules/home"`. Parts live in `components/`.

| Component       | Props                                              | Notes                                              |
| --------------- | -------------------------------------------------- | -------------------------------------------------- |
| `CodeCard`      | `filename`, `name`, `entries: CodeEntry[]`         | Editor-style object printout (hero)                |
| `FloatingChip`  | `icon`, `label`, `value`, `className` (position)   | Absolutely positioned; parent must be `relative`   |
| `Marquee`       | `items`, `separator`, `reverse`, `size: "lg" \| "sm"`, `className` | `aria-hidden`; pauses on hover       |
| `ProjectCard`   | `project: Project`, `index`                        | `project.featured` → inverted card                 |
| `RoleCard`      | `role: Role`, `index`                              | Shows `summary` and/or `highlights`                |
| `SectionHeader` | `kicker`, `title: ReactNode`, `aside?`             | Opens every section; already wrapped in `Reveal`   |
| `SkillCard`     | `skill: SkillGroup`, `index`                       | `skill.featured` → accent-filled card              |

Sections:

| Component           | Data source                         | Notes                                                    |
| ------------------- | ----------------------------------- | -------------------------------------------------------- |
| `Hero`              | `content/home.ts` (`hero`)          | `id="top"`                                               |
| `MarqueeBand`       | `content/home.ts` (`marquee`)       | Two opposing strips                                      |
| `TaglineSection`    | `content/home.ts` (`tagline`)       |                                                          |
| `ExperienceSection` | `content/experience.ts`             | `id="work"`                                              |
| `SkillsSection`     | `content/skills.ts`                 | `id="skills"`                                            |
| `ProjectsSection`   | `content/projects.ts`               | `id="projects"`                                          |
| `WritingSection`    | `content/posts.ts`                  | `id="writing"`; prop `limit` (default 3)                 |

Page: `HomePage` (`src/modules/home/HomePage.tsx`), route `/`, no props; defines section order.

## Blog module (`src/modules/blog`)

Public entry: `import { ArticleBody, ArticlePage, BlogIndexPage, PostRow } from "@/modules/blog"`.

| Component       | Route / use    | Props                                              | Notes                                          |
| --------------- | -------------- | -------------------------------------------------- | ---------------------------------------------- |
| `BlogIndexPage` | `/blog`        | `posts: Post[]`                                    |                                                |
| `ArticlePage`   | `/blog/[slug]` | `title`, `topic`, `date?`, `summary?`, `children`  |                                                |
| `ArticleBody`   | inside article | `blocks: PostBlock[]`                              | Renders a local post inside `.prose-article`   |
| `PostRow`       | lists          | `post: Post`                                       | Internal or external link chosen automatically |

## Helper classes from `globals.css`

`line-mask`, `line-rise`, `fade-up`, `reveal`, `tagline-word`, `spotlight`, `wordmark`,
`theme-sun` / `theme-moon`, `prose-article`. Prefer the React wrappers over using `reveal`,
`tagline-word` and `spotlight` directly.
