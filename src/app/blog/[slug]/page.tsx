import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/molecules";
import { ArticleTemplate } from "@/components/templates";
import { getLocalPosts, getPostBySlug } from "@/content/posts";

type Props = { params: Promise<{ slug: string }> };

// Only posts that exist in src/content/posts.ts get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalPosts().map((post) => ({ slug: post.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post?.body) notFound();

  return (
    <ArticleTemplate title={post.title} topic={post.topic} date={post.date} summary={post.summary}>
      <ArticleBody blocks={post.body} />
    </ArticleTemplate>
  );
}
