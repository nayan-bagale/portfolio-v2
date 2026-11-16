import { Fragment } from "react";
import { cn } from "@/lib/cn";

type Props = {
  items: string[];
  separator?: string;
  reverse?: boolean;
  /** "lg" for the main strip, "sm" for the quieter mono strip. */
  size?: "lg" | "sm";
  className?: string;
};

/** Endless horizontal strip. Pauses on hover. Hidden from screen readers. */
export function Marquee({ items, separator = "✦", reverse = false, size = "lg", className }: Props) {
  return (
    <div className={cn("group overflow-hidden border-line", className)} aria-hidden>
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className={cn(
              "flex items-center gap-7 pr-7 whitespace-nowrap",
              size === "lg"
                ? "font-head text-[28px] leading-8 font-medium tracking-[-0.02em]"
                : "font-mono text-base font-medium tracking-[0.2em] text-muted uppercase",
            )}
          >
            {items.map((item) => (
              <Fragment key={item}>
                {item}
                <i className="text-lg text-accent not-italic">{separator}</i>
              </Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
