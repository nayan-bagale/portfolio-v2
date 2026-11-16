import { Icon } from "@/components/atoms";
import type { SkillGroup } from "@/content/types";
import { cn } from "@/lib/cn";
import { PillList } from "./PillList";

/** One skill group. `featured` fills the card with the accent colour. */
export function SkillCard({ skill, index }: { skill: SkillGroup; index: number }) {
  const featured = Boolean(skill.featured);
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[320px] flex-col rounded-3xl border p-8 transition duration-500 ease-expo hover:-translate-y-1.5 xl:p-7",
        featured ? "border-accent bg-accent text-on-accent" : "border-line bg-card hover:border-line-strong",
      )}
    >
      <span className={cn("absolute top-7 right-7 font-mono text-xs", featured ? "text-on-accent/80" : "text-muted")}>
        /{String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "mb-14 grid size-12 place-items-center rounded-[14px] border",
          featured ? "border-on-accent/30 text-on-accent" : "border-line text-accent",
        )}
      >
        <Icon name={skill.icon} className="size-5" />
      </span>
      <h3 className="mb-2 font-head text-2xl leading-[30px] font-semibold tracking-[-0.03em]">{skill.title}</h3>
      <p className={cn("text-[15px] leading-6", featured ? "text-on-accent/80" : "text-body")}>{skill.description}</p>
      <PillList items={skill.items} tone={featured ? "onAccent" : "default"} className="mt-auto pt-6" />
    </div>
  );
}
