import type { Post } from "./types";

/**
 * Newest first.
 * - External article: set `href`.
 * - Article written here: set `slug` and `body`; it is served at /blog/<slug>.
 */
export const posts: Post[] = [
  {
    title: "BEM CSS Naming Convention: A Step-by-Step Beginner's Guide",
    topic: "CSS",
    date: "Aug 2026",
    summary:
      "How the Block, Element, Modifier convention prevents class name collisions and deep nesting, walked through by converting a card component to BEM, with tips and common mistakes.",
    href: "https://nayanbagale.medium.com/bem-css-naming-convention-a-step-by-step-beginners-guide-42aa834b2cc2",
  },
  {
    title: "Factory Functions in JavaScript",
    topic: "JavaScript",
    summary:
      "Why many JavaScript developers like factory functions: they create objects without classes or the new keyword, which keeps code simpler and faster.",
    // Placeholder. Replace with the real article link.
    href: "https://example.com/blog/factory-functions-in-javascript",
  },
];

/** Posts written in this project (they have a slug and a body). */
export function getLocalPosts(): Post[] {
  return posts.filter((post) => post.slug && post.body);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getLocalPosts().find((post) => post.slug === slug);
}

/** Link target for a post: its own page, or the external article. */
export function getPostHref(post: Post): string {
  return post.slug && post.body ? `/blog/${post.slug}` : (post.href ?? "/blog");
}
