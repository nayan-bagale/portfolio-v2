"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Card wrapper with a soft glow that follows the cursor. */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={handleMove} className={cn("spotlight relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
