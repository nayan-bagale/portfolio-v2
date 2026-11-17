import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  /** Use "inverse" on dark surfaces such as the contact block. */
  tone?: "default" | "inverse";
  size?: "md" | "sm";
  arrow?: "up-right" | "down" | "none";
  className?: string;
};

const styles = {
  primary: {
    default: "border-accent bg-accent text-on-accent hover:border-ink hover:bg-ink hover:text-bg",
    inverse: "border-accent bg-accent text-on-accent hover:border-bg hover:bg-bg hover:text-ink",
  },
  ghost: {
    default: "border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-bg",
    inverse: "border-bg/30 text-bg hover:border-bg hover:bg-bg hover:text-ink",
  },
} as const;

const sizes = {
  md: "px-7 py-4 text-sm leading-5",
  sm: "px-[18px] py-2.5 text-[13px] leading-5",
} as const;

const arrows = {
  "up-right": { glyph: "↗", motion: "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" },
  down: { glyph: "↓", motion: "group-hover/btn:translate-y-[3px]" },
} as const;

/** Pill-shaped link button. Internal paths use next/link. */
export function Button({
  href,
  children,
  variant = "primary",
  tone = "default",
  size = "md",
  arrow = "up-right",
  className,
}: Props) {
  const classes = cn(
    "group/btn inline-flex items-center gap-3 rounded-full border font-semibold transition-colors duration-300 ease-expo",
    styles[variant][tone],
    sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {arrow !== "none" && (
        <span
          className={cn("inline-block transition-transform duration-[400ms] ease-expo", arrows[arrow].motion)}
          aria-hidden
        >
          {arrows[arrow].glyph}
        </span>
      )}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  );
}
