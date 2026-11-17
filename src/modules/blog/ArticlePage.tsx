import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Kicker } from "@/components/ui";
import { ContactSection } from "@/components/layout";

type Props = {
  title: string;
  topic: string;
  date?: string;
  summary?: string;
  /** Article content. Wrap rich text in `.prose-article` (ArticleBody does this). */
  children: ReactNode;
};

/** Reading layout for a single blog post. */
export function ArticlePage({ title, topic, date, summary, children }: Props) {
  return (
    <>
      <article className="pt-40 pb-28">
        <Container size="narrow">
          <Link
            href="/blog"
            className="font-mono text-[11px] font-medium tracking-[0.15em] text-muted uppercase transition-colors duration-300 hover:text-accent"
          >
            ← All posts
          </Link>
          <Kicker className="mt-10">{[topic, date].filter(Boolean).join(" · ")}</Kicker>
          <h1 className="font-head text-[38px] leading-[42px] font-semibold tracking-[-0.03em] md:text-[54px] md:leading-[58px]">
            {title}
          </h1>
          {summary && <p className="mt-6 text-xl leading-8 text-muted">{summary}</p>}
          <div className="mt-12 border-t border-line pt-12">{children}</div>
        </Container>
      </article>
      <ContactSection />
    </>
  );
}
