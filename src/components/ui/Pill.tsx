import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type PillTone = "default" | "onAccent" | "inverse";

const tones: Record<PillTone, string> = {
  default: "border-line bg-bg text-muted",
  onAccent: "border-on-accent/35 text-on-accent",
  inverse: "border-bg/20 text-bg/70",
};

/** Small uppercase mono tag for technologies and labels. */
export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: PillTone }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[10.5px] leading-4 font-medium tracking-[0.06em] uppercase",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
