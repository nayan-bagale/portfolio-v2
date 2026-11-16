import type { NavItem, SocialLink } from "./types";

export const site = {
  name: "Nayan Bagale",
  firstName: "Nayan",
  lastName: "Bagale",
  role: "Software Engineer",
  location: "Pune, India",
  url: "https://www.nayanbagale.me",
  title: "Nayan Bagale | Full stack engineer",
  description:
    "Nayan Bagale is a full stack engineer in Pune building web products end to end, from interface to API to system design. Open to new roles and collaborations.",
  availability: "Open to roles",
  /** Set your email to turn the contact buttons into mailto links. */
  email: "",
  /** Placeholder. Replace with the real CV link. */
  cvUrl: "https://example.com/nayan-bagale-cv.pdf",
  footerNote: ["Software engineer in Pune, India.", "Building products from interface to infrastructure."],
} as const;

/** Placeholders. Replace with the real profile links. */
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/your-username" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username" },
  { label: "X", href: "https://x.com/your-username" },
  { label: "LeetCode", href: "https://leetcode.com/your-username" },
  { label: "CV", href: site.cvUrl },
];

export const nav: NavItem[] = [
  { label: "Experience", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/#writing" },
];

/** Where "Start a conversation" and "Get in touch" point. */
export const contactHref = site.email ? `mailto:${site.email}` : "/#contact";
