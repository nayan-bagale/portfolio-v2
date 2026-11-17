import { cn } from "@/lib/cn";

/** Green "live" status dot. */
export function PulseDot({ className }: { className?: string }) {
  return <span className={cn("size-2 shrink-0 animate-pulse-dot rounded-full bg-moss", className)} aria-hidden />;
}
