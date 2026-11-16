# Component catalogue

Import from the layer barrel: `import { Button, Pill } from "@/components/atoms"`.
"Client" means the file has `"use client"`.

## Atoms (`src/components/atoms`)

| Component      | Props                                                                                   | Notes                                                         |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Accent`       | `children`                                                                              | Italic serif accent word inside a heading                     |
| `Button`       | `href`, `variant: "primary" \| "ghost"`, `tone: "default" \| "inverse"`, `size: "md" \| "sm"`, `arrow: "up-right" \| "down" \| "none"`, `className` | Always a link. `/…` → `next/link`; `http…` opens a new tab |
| `Container`    | `size: "wide" \| "narrow"`, div props                                                   | Page width and gutter                                         |
| `Icon`         | `name: IconName`, `className`                                                           | Paths in `src/lib/icons.ts` (Phosphor, 256 viewBox)           |
| `Kicker`       | `children`, `className`                                                                 | Renders `// LABEL` with the accent dot                        |
| `Logo`         | none                                                                                    | Monogram + name, links home                                   |
| `Pill`         | `tone: "default" \| "onAccent" \| "inverse"`, `children`                                | Mono uppercase tag                                            |
| `PulseDot`     | `className`                                                                             | Green status dot                                              |
| `SectionTitle` | `as: "h1" \| "h2"`, `className`, `children`                                             | Large heading; use `as="h1"` on non-home pages                |

## Motion (`src/components/motion`) — all client

| Component    | Props                              | Notes                                                   |
| ------------ | ---------------------------------- | ------------------------------------------------------- |
| `Reveal`     | `delay` (ms), `className`          | Fade-up once on scroll. Renders a wrapping `div`        |
| `Spotlight`  | `className`                        | Card root with cursor glow; is `relative overflow-hidden` |
| `WordReveal` | `text`, `className`                | Paragraph whose words light up while scrolling          |

Because `Reveal` adds a wrapper, cards inside grids should be `h-full`.

## Molecules (`src/components/molecules`)

| Component       | Props                                              | Notes                                              |
| --------------- | -------------------------------------------------- | -------------------------------------------------- |
| `ArticleBody`   | `blocks: PostBlock[]`                              | Renders a local post inside `.prose-article`       |
| `CodeCard`      | `filename`, `name`, `entries: CodeEntry[]`         | Editor-style object printout (hero)                |
| `FloatingChip`  | `icon`, `label`, `value`, `className` (position)   | Absolutely positioned; parent must be `relative`   |
| `Marquee`       | `items`, `separator`, `reverse`, `size: "lg" \| "sm"`, `className` | `aria-hidden`; pauses on hover       |
| `PillList`      | `items: string[]`, `tone`, `className`             | Wrapping row of `Pill`                             |
| `PostRow`       | `post: Post`                                       | Internal or external link chosen automatically     |
| `ProjectCard`   | `project: Project`, `index`                        | `project.featured` → inverted card                 |
| `RoleCard`      | `role: Role`, `index`                              | Shows `summary` and/or `highlights`                |
| `SectionHeader` | `kicker`, `title: ReactNode`, `aside?`             | Opens every section; already wrapped in `Reveal`   |
| `SkillCard`     | `skill: SkillGroup`, `index`                       | `skill.featured` → accent-filled card              |
| `SocialLinks`   | `links: SocialLink[]`, `className`                 | Pill links, open in a new tab                      |
| `ThemeToggle`   | none (client)                                      | Sets `data-theme`, saves to localStorage           |

## Organisms (`src/components/organisms`)

| Component           | Data source                         | Notes                                                    |
| ------------------- | ----------------------------------- | -------------------------------------------------------- |
| `SiteHeader`        | `content/site.ts` (`nav`)           | Client. In `layout.tsx`. Active link from section ids    |
| `SiteFooter`        | `content/site.ts`                   | In `layout.tsx`                                          |
| `BackToTop`         | —                                   | Client. In `layout.tsx`                                  |
| `Hero`              | `content/home.ts` (`hero`)          | `id="top"`                                               |
| `MarqueeBand`       | `content/home.ts` (`marquee`)       | Two opposing strips                                      |
| `TaglineSection`    | `content/home.ts` (`tagline`)       |                                                          |
| `ExperienceSection` | `content/experience.ts`             | `id="work"`                                              |
| `SkillsSection`     | `content/skills.ts`                 | `id="skills"`                                            |
| `ProjectsSection`   | `content/projects.ts`               | `id="projects"`                                          |
| `WritingSection`    | `content/posts.ts`                  | `id="writing"`; prop `limit` (default 3)                 |
| `ContactSection`    | `content/home.ts` (`contact`)       | `id="contact"`; inverted surface with the portrait       |

## Templates (`src/components/templates`)

| Template            | Route           | Props                                                  |
| ------------------- | --------------- | ------------------------------------------------------ |
| `HomeTemplate`      | `/`             | none; defines section order                            |
| `BlogIndexTemplate` | `/blog`         | `posts: Post[]`                                        |
| `ArticleTemplate`   | `/blog/[slug]`  | `title`, `topic`, `date?`, `summary?`, `children`      |

## Helper classes from `globals.css`

`line-mask`, `line-rise`, `fade-up`, `reveal`, `tagline-word`, `spotlight`, `wordmark`,
`theme-sun` / `theme-moon`, `prose-article`. Prefer the React wrappers over using `reveal`,
`tagline-word` and `spotlight` directly.
