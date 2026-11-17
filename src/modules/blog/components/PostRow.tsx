import Link from "next/link";
import { getPostHref } from "@/content/posts";
import type { Post } from "@/content/types";

const rowClass =
  "group grid gap-3 border-b border-line py-7 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-8";

/** One article in a list. Local posts link to /blog/<slug>, others open externally. */
export function PostRow({ post }: { post: Post }) {
  const href = getPostHref(post);
  const meta = [post.topic, post.date].filter(Boolean).join(" · ");
  const content = (
    <>
      <span className="font-mono text-[11px] font-medium tracking-[0.15em] text-muted uppercase">{meta}</span>
      <div>
        <h3 className="font-head text-[28px] leading-[34px] font-semibold tracking-[-0.03em] transition-colors duration-300 ease-expo group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 max-w-[640px] text-body">{post.summary}</p>
      </div>
      <span className="font-mono text-[11px] font-medium tracking-[0.15em] text-accent uppercase">Read ↗</span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={rowClass}>
      {content}
    </a>
  );
}
