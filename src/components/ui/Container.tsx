import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentProps<"div"> & {
  /** "wide" for page sections, "narrow" for long-form reading. */
  size?: "wide" | "narrow";
};

const sizes = {
  wide: "max-w-[1200px]",
  narrow: "max-w-[760px]",
} as const;

/** Centres content and applies the page gutter. */
export function Container({ size = "wide", className, ...props }: Props) {
  return <div className={cn("mx-auto w-full px-6", sizes[size], className)} {...props} />;
}
