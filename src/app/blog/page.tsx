import type { Metadata } from "next";
import { BlogIndexTemplate } from "@/components/templates";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles by Nayan Bagale on frontend, backend and building products.",
};

export default function BlogPage() {
  return <BlogIndexTemplate posts={posts} />;
}
