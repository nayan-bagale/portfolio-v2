import type { PostBlock } from "@/content/types";

/** Renders the blocks of a locally written post inside `.prose-article`. */
export function ArticleBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="prose-article">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h2 key={index}>{block.text}</h2>;
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={index}>
                <code>{block.code}</code>
              </pre>
            );
          case "quote":
            return <blockquote key={index}>{block.text}</blockquote>;
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}
