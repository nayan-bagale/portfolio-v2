import type { Role } from "@/content/types";
import { PillList } from "@/components/ui";

/** One job in the experience list. */
export function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <article className="grid gap-4 rounded-3xl border border-line bg-card p-6 transition duration-500 ease-expo hover:-translate-y-1 hover:border-line-strong md:grid-cols-[200px_1fr] md:gap-10 md:p-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-medium tracking-[0.15em] text-muted uppercase md:flex-col md:items-start md:gap-1.5">
        <span className="text-xs tracking-normal text-accent md:mb-1.5">/{String(index + 1).padStart(2, "0")}</span>
        <span>{role.period}</span>
        <span aria-hidden className="text-line-strong md:hidden">
          ·
        </span>
        <span>{role.type}</span>
      </div>
      <div>
        <h3 className="font-head text-[22px] leading-7 font-semibold tracking-[-0.03em] md:text-2xl md:leading-[30px]">
          {role.title}
          <span className="mt-1 block font-sans text-[15px] font-medium tracking-normal text-muted">{role.company}</span>
        </h3>
        {role.summary && <p className="mt-4 text-[15px] leading-6 text-body md:text-base md:leading-[26px]">{role.summary}</p>}
        {role.highlights && (
          <ul className="mt-4 grid list-disc gap-2.5 pl-4 text-[15px] leading-6 text-body marker:text-accent md:gap-2 md:pl-[18px] md:text-base md:leading-[26px]">
            {role.highlights.map((item) => (
              <li key={item} className="pl-1 md:pl-0">
                {item}
              </li>
            ))}
          </ul>
        )}
        <PillList items={role.stack} className="mt-5" />
      </div>
    </article>
  );
}
