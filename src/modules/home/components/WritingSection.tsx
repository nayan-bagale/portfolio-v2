import { Accent, Button, Container } from "@/components/ui";
import { PostRow } from "@/modules/blog";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion";
import { posts } from "@/content/posts";

/** Latest articles on the home page, with a link to the full blog. */
export function WritingSection({ limit = 3 }: { limit?: number }) {
  return (
    <section id="writing" className="py-28">
      <Container>
        <SectionHeader
          kicker="Writing"
          title={
            <>
              Notes from what <Accent>I build.</Accent>
            </>
          }
        />
        <div className="border-t border-line">
          {posts.slice(0, limit).map((post) => (
            <Reveal key={post.title}>
              <PostRow post={post} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button href="/blog" variant="ghost">
            All posts
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
