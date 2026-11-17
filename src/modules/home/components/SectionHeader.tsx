import type { ReactNode } from "react";
import { Kicker, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion";

type Props = {
  kicker: string;
  title: ReactNode;
  /** Short note shown on the right on wide screens. */
  aside?: string;
};

/** Kicker, heading and optional side note that open every section. */
export function SectionHeader({ kicker, title, aside }: Props) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <Reveal>
          <SectionTitle>{title}</SectionTitle>
        </Reveal>
      </div>
      {aside && (
        <Reveal>
          <p className="max-w-[300px] text-sm leading-[22px] text-muted">{aside}</p>
        </Reveal>
      )}
    </div>
  );
}
