# Content and blog

All text and data are in `src/content`. Components never contain copy. Types are in `types.ts`
(and `home.ts` for hero-specific shapes).

| File            | Exports                                   | Edits you make here                                   |
| --------------- | ----------------------------------------- | ----------------------------------------------------- |
| `site.ts`       | `site`, `socials`, `nav`, `contactHref`   | Name, SEO title/description, email, CV, profile links, header links |
| `home.ts`       | `hero`, `marquee`, `tagline`, `contact`   | Headline, intro, code card, marquee words, tagline, contact block |
| `experience.ts` | `experience: Role[]`                      | Jobs, newest first                                    |
| `skills.ts`     | `skills: SkillGroup[]`                    | Skill cards (`featured: true` fills one with accent)  |
| `projects.ts`   | `projects: Project[]`                     | Side projects (`featured: true` inverts one)          |
| `posts.ts`      | `posts: Post[]` + helpers                 | Articles, newest first                                |

## Placeholders to replace

- `site.email` is `""`. While empty, contact buttons go to `/#contact`. Set it and they become `mailto:`.
- `site.cvUrl`, every item in `socials`, `live`/`code` in `projects.ts`, and the Factory Functions `href`
  in `posts.ts` use `example.com` or `your-username`. Search for those strings.

## Hero headline

`hero.headline` is an array of lines; each line is an array of segments. `accent: true` renders the
segment in the italic serif accent:

```ts
headline: [
  [{ text: "I build products" }],
  [{ text: "from " }, { text: "UI", accent: true }, { text: " to " }, { text: "APIs", accent: true }],
]
```

Keep each line short enough to fit the hero column at 84px (about 16 characters).

## Adding a project

```ts
{
  name: "Project name",
  category: "Web app",
  description: "One or two sentences on what it does.",
  stack: ["Next.js", "PostgreSQL"],
  live: "https://…",   // optional
  code: "https://…",   // optional
}
```

The grid is two columns; keep an even number of projects.

## Blog

Routes: `/blog` (all posts) and `/blog/<slug>` (posts written in this project).
The home page shows the first three posts.

External article:

```ts
{ title: "…", topic: "CSS", date: "Aug 2026", summary: "…", href: "https://medium.com/…" }
```

Article hosted on this site:

```ts
{
  title: "…",
  topic: "React",
  date: "Dec 2026",
  summary: "Shown in lists and as the standfirst.",
  slug: "my-post",
  body: [
    { type: "paragraph", text: "…" },
    { type: "heading", text: "…" },
    { type: "list", items: ["…", "…"] },
    { type: "code", code: "const a = 1;" },
    { type: "quote", text: "…" },
  ],
}
```

- The page is generated at build time and gets its `<title>` and description from the post.
- Typography comes from `.prose-article` in `globals.css` (works in light and dark through tokens).
- New block type: add it to `PostBlock`, handle it in `molecules/ArticleBody.tsx`, style it under
  `.prose-article` if needed.
- Moving to MDX later: `ArticleTemplate` takes any `children`, so render MDX inside
  `<div className="prose-article">` and keep the template unchanged.

## SEO

Global metadata is in `src/app/layout.tsx` and reads from `site`. Each page exports its own `metadata`
(title becomes `"<title> | Nayan Bagale"`). There is no Open Graph image yet; add
`src/app/opengraph-image.(png|tsx)` when one is ready.
