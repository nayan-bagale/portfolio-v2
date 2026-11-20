---
name: portfolio-ui
description: Build or change UI in this portfolio (Next.js + Tailwind v4, ui, layout and module components). Use when adding or editing a component, a home page section, a page or route, a blog post, or any colours, typography, spacing or animation, so the result matches the existing design system in light and dark mode.
---

# Portfolio UI

Follow these recipes so new work matches the existing system. Background references:
`docs/architecture.md`, `docs/design-system.md`, `docs/components.md`, `docs/content-and-blog.md`.

## Before writing anything

1. Find the closest existing component in `docs/components.md`. Extend it with a prop if it nearly fits.
2. Decide where it lives: small and reusable anywhere → `components/ui`; site chrome or shared by several
   modules → `components/layout`; used by one page or feature → `modules/<name>/components`.
3. Put every user-visible string in `src/content/`. Add or extend a type in `src/content/types.ts`.

## Style checklist (applies to every recipe)

- Colours: token classes only. Surfaces `bg-bg` / `bg-card`; text `text-ink` / `text-body` / `text-muted`;
  borders `border-line`, hover `border-line-strong`; highlight `text-accent` or `bg-accent text-on-accent`.
- Never write `dark:`. Never write a hex value in a component.
- Inverted block (dark in light mode, light in dark mode): `bg-ink text-bg`, secondary text `text-bg/70`,
  borders `border-bg/25`, buttons with `tone="inverse"`, pills with `tone="inverse"`.
- Type: headings `font-head font-semibold tracking-[-0.03em]`; body is the default; labels and tags
  `font-mono uppercase` with wide tracking; the accent word in a heading is `<Accent>`.
- Shape: cards `rounded-3xl border`, buttons and pills `rounded-full`.
- Motion: `transition duration-500 ease-expo` on cards, `duration-300 ease-expo` on colour changes.
  Hover lift is `hover:-translate-y-1` or `-translate-y-1.5`.
- Layout: wrap section content in `<Container>`. Home content sections use `py-24`. Grids use `gap-4`.

## Recipe: new component

1. Create `<Name>.tsx` in the folder chosen above (`src/components/ui`, `src/components/layout` or
   `src/modules/<name>/components`) with a named export and a one-line doc comment.
2. Type the props. Variants are a union prop mapped through a `const` object of class strings
   (see `Button.tsx`, `Pill.tsx`). Accept `className` only for spacing and positioning.
3. Export it from that folder's `index.ts`.
4. Add a row to `docs/components.md`.

## Recipe: new home page section

1. Add its data to `src/content/` (new file for a list of records, or `home.ts` for one-off copy).
2. Create `src/modules/home/components/<Name>Section.tsx`:

   ```tsx
   export function ExampleSection() {
     return (
       <section id="example" className="py-24">
         <Container>
           <SectionHeader kicker="Example" title={<>Plain words <Accent>accent words.</Accent></>} />
           <div className="grid gap-4 md:grid-cols-2">
             {items.map((item, index) => (
               <Reveal key={item.name} delay={(index % 2) * 100}>
                 <ExampleCard item={item} index={index} />
               </Reveal>
             ))}
           </div>
         </Container>
       </section>
     );
   }
   ```

3. Export it from `modules/home/components/index.ts` and place it in `modules/home/HomePage.tsx`.
4. To show it in the header, add `{ label, href: "/#example" }` to `nav` in `src/content/site.ts`.
   The header highlights it automatically from the section `id`.

## Recipe: new page

1. Create `src/modules/<name>/` with a `<Name>Page.tsx` that arranges sections, a `components/` folder and
   an `index.ts`. Start the first section with `pt-40` so content clears the fixed header.
2. Create `src/app/<route>/page.tsx` that exports `metadata` and returns the page component. Keep it thin.
3. Header, footer and fonts come from `src/app/layout.tsx`; do not repeat them.

## Recipe: new blog post

- External article: add an object with `href` to `posts` in `src/content/posts.ts` (newest first).
- Article hosted here: add `slug` and `body` (array of `PostBlock`). It is served at `/blog/<slug>` through
  `ArticlePage` and styled by `.prose-article`. A new block type needs a case in
  `modules/blog/components/ArticleBody.tsx`, a member in `PostBlock`, and a rule in `.prose-article` if it needs styling.

## Recipe: new colour token

Edit `src/app/globals.css` in four places: the light `:root`, the dark `@media` block, the
`:root[data-theme="dark"]` block, and `@theme inline` (`--color-<name>: var(--<name>)`).
Then document it in `docs/design-system.md`.

## Recipe: interactive behaviour

Keep the section a server component and extract only the interactive part into a small
`"use client"` component (pattern: `motion/Spotlight.tsx`, `layout/ThemeToggle.tsx`).
Do not call `setState` synchronously inside `useEffect`; set it from an event or observer callback.

## Finish

Run `pnpm lint && pnpm typecheck && pnpm build`. Check 390px, 820px and 1280px in light and dark.
