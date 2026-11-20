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
  cvUrl: "https://drive.google.com/file/d/1OrDa_mCZ-MFe_3-4Ym_PEAgod_k8GzI5/view?usp=sharing",
  footerNote: ["Software engineer in India.", "Building products from interface to infrastructure."],
  headerCta: "Book a call",
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/nayan-bagale" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nayan-bagale" },
  { label: "X", href: "https://x.com/nayan_bagale" },
  { label: "LeetCode", href: "https://leetcode.com/u/nayan-bagale/" },
  { label: "CV", href: site.cvUrl },
];

export const nav: NavItem[] = [
  { label: "Experience", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Open Source", href: "/#open-source" },
  { label: "Writing", href: "/#writing" },
];

/** The /book page, where the hero "Book a call" button leads. Cal.com link: cal.com/<username>/<eventSlug>. */
export const booking = {
  href: "/book",
  username: "nayan-bagale-1cuj1h",
  eventSlug: "testing",
  /** Without it the booker calls this site's own /atoms/... routes and gets 404. */
  apiUrl: "https://api.cal.com/v2",
  metaTitle: "Book a call",
  metaDescription: "Pick a time to talk with Nayan Bagale about a role, a project or a collaboration.",
  kicker: "Book a call",
  title: { before: "Pick a time that ", accent: "works for you." },
  intro: "Choose a slot below and the invite lands in your calendar.",
};

/** Where the header and contact section "Book a call" buttons point. */
export const contactHref = booking.href;
