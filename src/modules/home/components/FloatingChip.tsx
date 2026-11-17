import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
  /** Position classes, such as "-top-7 -right-3". */
  className?: string;
};

/** Small floating card that hovers over a corner of a visual. */
export function FloatingChip({ icon, label, value, className }: Props) {
  return (
    <div
      className={cn(
        "absolute flex animate-float items-center gap-2.5 rounded-2xl border border-line bg-bg px-4 py-3 text-[13px] leading-[18px] shadow-[0_16px_32px_-16px_rgb(28_25_23/0.25)]",
        className,
      )}
    >
      {icon}
      <span>
        {label}
        <br />
        <b className="font-head font-semibold">{value}</b>
      </span>
    </div>
  );
}
