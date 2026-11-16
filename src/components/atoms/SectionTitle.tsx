import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Large section heading. Use <Accent> inside for the italic word. */
export function SectionTitle({ children, as: Tag = "h2", className }: Props) {
  return (
    <Tag
      className={cn(
        "max-w-[720px] font-head text-[38px] leading-[42px] font-semibold tracking-[-0.03em] md:text-[54px] md:leading-[56px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
