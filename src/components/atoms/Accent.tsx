import type { ReactNode } from "react";

/** Italic serif word in the accent colour, used inside headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal tracking-normal text-accent italic">{children}</em>;
}
