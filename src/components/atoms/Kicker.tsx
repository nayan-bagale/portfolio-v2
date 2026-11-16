import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase mono label above a heading: "// EXPERIENCE". */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-6 flex items-center gap-2.5 font-mono text-[11px] leading-4 font-medium tracking-[0.3em] text-muted uppercase",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {"// "}
      {children}
    </p>
  );
}
