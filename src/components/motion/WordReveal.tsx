"use client";

import { useEffect, useRef } from "react";

/** Paragraph whose words light up one by one as they scroll past. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-on");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    el.querySelectorAll(".tagline-word").forEach((word) => observer.observe(word));
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={index}>
          <span className="tagline-word">{word}</span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
