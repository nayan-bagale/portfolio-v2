import { Accent, Container, Kicker, SectionTitle } from "@/components/atoms";
import { PostRow } from "@/components/molecules";
import { ContactSection } from "@/components/organisms";
import type { Post } from "@/content/types";

/** List of all articles. */
export function BlogIndexTemplate({ posts }: { posts: Post[] }) {
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
