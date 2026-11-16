import { Pill, type PillTone } from "@/components/atoms";
import { cn } from "@/lib/cn";

/** Wrapping row of pills, for a tech stack. */
export function PillList({ items, tone, className }: { items: string[]; tone?: PillTone; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <Pill key={item} tone={tone}>
          {item}
        </Pill>
      ))}
    </div>
  );
}
