/** Copy for the home page sections that are not lists of records. */

export type HeadlineSegment = { text: string; accent?: boolean };

export type CodeEntry = {
  key: string;
  value: string | boolean | string[];
  /** Print an array one item per line. */
  multiline?: boolean;
};

export const hero = {
  eyebrow: "Software engineer · India",
  /** One inner array per line of the headline. */
  headline: [
    [{ text: "I build products" }],
    [{ text: "end to end," }],
    [{ text: "from " }, { text: "UI", accent: true }, { text: " to " }, { text: "APIs", accent: true }],
    [{ text: "and systems." }],
  ] as HeadlineSegment[][],
  intro:
    "I am Nayan, a full stack engineer with 2+ years of experience building scalable, fast, and reliable web applications that are easy to use and maintain with modern web technologies.",
  primaryCta: "Book a call",
  secondaryCta: { label: "See my work", href: "/#projects" },
  codeCard: {
    filename: "nayan.ts",
    name: "nayan",
    entries: [
      { key: "role", value: "Software Engineer" },
      { key: "company", value: "CentraLogic" },
      { key: "frontend", value: ["React", "Next.js", "TypeScript"] },
      { key: "backend", value: ["Node.js", "Express.js", "GraphQL"] },
      { key: "data", value: ["PostgreSQL", "MySQL", "MongoDB"] },
      { key: "focus", value: ["system design", "APIs and auth", "performance"], multiline: true },
      { key: "openToWork", value: true },
    ] as CodeEntry[],
  },
  chips: {
    current: { label: "Currently at", value: "CentraLogic" },
    openSource: { label: "Open source", value: "Cal.com contributor" },
  },
};

export const marquee = {
  tech: ["React", "Node.js", "TypeScript", "Java", "Next.js", "GraphQL", "PostgreSQL", "AWS", "System design"],
  companies: ["CentraLogic", "CloudOptimo", "Edifition", "Cal.com", "Open source"],
};

export const tagline = {
  kicker: "What I care about",
  text: "I build products that feel fast to users, stay solid on the server, and remain simple to change as they grow.",
};

export const contact = {
  kicker: "Ready when you are",
  title: { before: "Let's build something ", accent: "exceptional." },
  text: "I would love to hear about your projects and how I could help. Want to collaborate, or just say hi? Reach out.",
  primaryCta: "Book a call",
  cvCta: "Download CV",
  photo: { src: "/nayan.jpg", alt: "Portrait of Nayan Bagale" },
};
