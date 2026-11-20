import type { IconName } from "@/lib/icons";

export type NavItem = {
  label: string;
  /** Path with a hash, such as "/#work". */
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Role = {
  period: string;
  type: string;
  title: string;
  company: string;
  summary?: string;
  highlights?: string[];
  stack: string[];
};

export type SkillGroup = {
  title: string;
  description: string;
  icon: IconName;
  items: string[];
  /** Fills the card with the accent colour. */
  featured?: boolean;
};

export type Project = {
  name: string;
  category: string;
  description: string;
  stack: string[];
  live?: string;
  code?: string;
  /** Uses the dark, inverted card. */
  featured?: boolean;
};

export type PullRequest = {
  /** PR number without the hash, such as 12345. */
  number: number;
  title: string;
  href: string;
};

/** One open source project and the PRs contributed to it. */
export type OpenSourceProject = {
  name: string;
  /** Repository page, such as "https://github.com/calcom/cal.com". */
  repo: string;
  pullRequests: PullRequest[];
};

/** One block of a post written in this project. */
export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string }
  | { type: "quote"; text: string };

export type Post = {
  title: string;
  topic: string;
  /** Display date, such as "Aug 2026". */
  date?: string;
  summary: string;
  /** External article (Medium and so on). Opens in a new tab. */
  href?: string;
  /** Local article: served at /blog/<slug> and rendered from `body`. */
  slug?: string;
  body?: PostBlock[];
};
