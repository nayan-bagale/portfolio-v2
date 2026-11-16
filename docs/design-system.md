# Design system

Warm, editorial, engineering-flavoured. Parchment and ink with one rust accent. All values live in
`src/app/globals.css`; components only reference tokens.

## Colour tokens

| Token (CSS var)   | Tailwind name   | Light       | Dark        | Use                                            |
| ----------------- | --------------- | ----------- | ----------- | ---------------------------------------------- |
| `--bg`            | `bg`            | `#FAF7F2`   | `#0F0E0B`   | Page background                                |
| `--card`          | `card`          | `#F5F2EB`   | `#191714`   | Cards, strips, raised surfaces                 |
| `--line`          | `line`          | `#E7E5E4`   | `#2B2824`   | Hairline borders, dividers                     |
| `--line-strong`   | `line-strong`   | `#D6D3D1`   | `#44403C`   | Hover borders, ghost button border             |
| `--text`          | `ink`           | `#1C1917`   | `#F5F2EB`   | Headings, primary text                         |
| `--body`          | `body`          | `#44403C`   | `#D6D3D1`   | Paragraphs, list text                          |
| `--muted`         | `muted`         | `#78716C`   | `#A8A29E`   | Labels, meta, captions                         |
| `--accent`        | `accent`        | `#C2410C`   | `#FD6B36`   | Rust highlight: links, kicker dot, primary CTA |
| `--on-accent`     | `on-accent`     | `#FFF7ED`   | `#1C1917`   | Text on an accent surface                      |
| `--accent-soft`   | `accent-soft`   | accent 12%  | accent 14%  | Glows (hero, card spotlight)                   |
| `--moss`          | `moss`          | `#15803D`   | `#79DB8D`   | Status dot, code strings                       |
| `--header-blur`   | (use `var()`)   | bg 85%      | bg 80%      | Frosted header and back-to-top                 |

Use them as Tailwind utilities: `bg-card`, `text-muted`, `border-line`, `text-accent`, `bg-ink`.
Opacity modifiers work: `text-bg/70`, `border-on-accent/30`.

## Light and dark: how to style for both

One class serves both themes because the token value changes, not the class.

| Situation                         | Classes                                                                  |
| --------------------------------- | ------------------------------------------------------------------------ |
| Default surface                   | `bg-bg text-ink`                                                         |
| Card                              | `border border-line bg-card`, hover `hover:border-line-strong`           |
| Paragraph on a card               | `text-body`                                                              |
| Label / meta                      | `text-muted`                                                             |
| Accent-filled surface             | `border-accent bg-accent text-on-accent`, secondary `text-on-accent/80`  |
| Inverted surface (contact block)  | `bg-ink text-bg`, secondary `text-bg/70`, border `border-bg/25`          |
| Controls on inverted surface      | `<Button tone="inverse">`, `<Pill tone="inverse">`                       |
| Controls on accent surface        | `<Pill tone="onAccent">`                                                 |

Rules:

- Do not use `dark:` utilities, `prefers-color-scheme` in components, or hex values in components.
- An inverted surface is dark in light mode and light in dark mode. That is intended; always pair
  `bg-ink` with `text-bg`.
- Accent text on `bg-bg`/`bg-card` and `on-accent` text on `bg-accent` are the tested contrast pairs.
  Do not put `text-muted` on `bg-accent` or `bg-ink`.
- Shadows use a fixed warm black (`rgb(28 25 23 / 0.25)`); they are subtle in dark mode by design.

### Adding a token

Add the variable in the light `:root`, the dark `@media` block, and `:root[data-theme="dark"]`, then map it
in `@theme inline` as `--color-<name>: var(--<name>);`.

## Typography

| Role             | Font               | Tailwind      | Typical classes                                                        |
| ---------------- | ------------------ | ------------- | ---------------------------------------------------------------------- |
| Headings         | Space Grotesk      | `font-head`   | `font-semibold tracking-[-0.03em]`                                     |
| Body             | Inter              | `font-sans`   | default; `text-base leading-[26px]`                                    |
| Accent word      | Instrument Serif   | `font-serif`  | via `<Accent>`: italic, `text-accent`                                  |
| Labels and code  | JetBrains Mono     | `font-mono`   | `text-[11px] font-medium uppercase tracking-[0.15em]` to `[0.3em]`     |

Scale in use:

| Element              | Mobile        | `md` and up                         |
| -------------------- | ------------- | ----------------------------------- |
| Hero `h1`            | 46 / 46       | 72 (`md`), 84 (`lg`), leading 0.98  |
| Section title `h2`   | 38 / 42       | 54 / 56                             |
| Tagline              | 32 / 38       | 50 / 54                             |
| Card title `h3`      | 24 / 30       | same (project 26 / 32, post 28 / 34)|
| Lead paragraph       | 18 / 30       | same                                |
| Body                 | 16 / 26       | same                                |
| Card paragraph       | 15 / 24       | same                                |
| Kicker / meta        | 11 / 16 mono  | same                                |
| Pill                 | 10.5 / 16 mono| same                                |

Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty` (set globally). Each heading has at
most one `<Accent>` phrase, placed at the end where possible.

## Shape, spacing, layout

- Radius: cards `rounded-3xl` (24px); contact block `rounded-[32px]`; icon tile `rounded-[14px]`;
  buttons, pills, chips of the nav `rounded-full`; floating chip `rounded-2xl`.
- Borders are 1px `border-line`. Depth comes from the `bg` → `card` tone shift, not heavy shadows.
- Page gutter and max width: `<Container>` (`max-w-[1200px] px-6`; `size="narrow"` = 760px for reading).
- Section rhythm: `py-28`. Section header to content: `mb-14`. Card grids: `gap-4`. Card padding: `p-7`–`p-10`.
- First section of a page: `pt-36`/`pt-40` to clear the fixed header.

Breakpoints:

| Name           | Width   | What changes                                               |
| -------------- | ------- | ---------------------------------------------------------- |
| `md`           | 768px   | Desktop nav appears, grids become 2 columns, larger type   |
| `min-[900px]`  | 900px   | Contact block becomes two columns                          |
| `min-[961px]`  | 961px   | "Open to roles" status appears in the header               |
| `lg`           | 1024px  | Hero becomes two columns                                   |
| `xl`           | 1280px  | Skills grid becomes 4 columns                              |

Keep card grids at 2 columns until there is room for cards at least ~270px wide.

## Motion

- Easing: `ease-expo` = `cubic-bezier(0.22, 1, 0.36, 1)` for everything.
- Durations: colour 300ms; small transforms 400ms; card lift 500ms; reveals 900ms.
- Tailwind v4 note: `translate`, `rotate` and `scale` are separate CSS properties. Use `transition`
  (covers them) or list them (`transition-[opacity,translate]`); `transition-transform` alone also works
  for these but not for colour.

| Effect                         | How                                                                   |
| ------------------------------ | --------------------------------------------------------------------- |
| Section/card fades up on scroll| wrap in `<Reveal delay={ms}>`; stagger siblings by 100ms              |
| Page-load fade                 | class `fade-up` + `style={{ "--delay": "550ms" }}`                    |
| Headline line rise             | `line-mask` > `line-rise` with `--i` index (see `Hero`)               |
| Words light up on scroll       | `<WordReveal text=… />`                                               |
| Cursor glow on a card          | `<Spotlight>` as the card root                                        |
| Card hover                     | `transition duration-500 ease-expo hover:-translate-y-1.5`            |
| Arrow badge hover              | `group-hover:rotate-45` + accent fill                                 |
| Marquee                        | `<Marquee>`; `animate-marquee` / `animate-marquee-reverse`            |
| Floating chip                  | `animate-float`                                                       |
| Status dot                     | `<PulseDot>` (`animate-pulse-dot`)                                    |

`prefers-reduced-motion` is handled globally in `globals.css`: animations are cut to an instant and
reveals keep only the fade. New animations must degrade the same way.

## Voice and copy

Plain, first person, specific. Sentence case for headings and buttons. No exclamation marks.
Buttons are verb + object ("Start a conversation", "See my work"). Section kickers are one or two words.
