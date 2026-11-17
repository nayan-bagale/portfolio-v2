import { Accent, Container, Kicker, SectionTitle } from "@/components/ui";
import { PostRow } from "./components";
import { ContactSection } from "@/components/layout";
import type { Post } from "@/content/types";

/** List of all articles. */
export function BlogIndexPage({ posts }: { posts: Post[] }) {
  return (
    <>
      <section className="pt-40 pb-28">
        <Container>
          <Kicker>Blog</Kicker>
          <SectionTitle as="h1">
            Notes from what <Accent>I build.</Accent>
          </SectionTitle>
          <p className="mt-6 max-w-[560px] text-lg leading-[30px] text-body">
            Short, practical write-ups on frontend, backend and the things I learn while shipping.
          </p>
          <div className="mt-14 border-t border-line">
            {posts.map((post) => (
              <PostRow key={post.title} post={post} />
            ))}
          </div>
        </Container>
      </section>
      <ContactSection />
    </>
  );
}
