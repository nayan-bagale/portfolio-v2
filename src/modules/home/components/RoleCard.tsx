import type { Role } from "@/content/types";
import { PillList } from "@/components/ui";

/** One job in the experience list. */
export function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <article className="grid gap-5 rounded-3xl border border-line bg-card p-8 transition duration-500 ease-expo hover:-translate-y-1 hover:border-line-strong md:grid-cols-[200px_1fr] md:gap-10 md:p-10">
      <div className="flex flex-col gap-1.5 font-mono text-[11px] font-medium tracking-[0.15em] text-muted uppercase">
        <span className="mb-1.5 text-xs tracking-normal text-accent">/{String(index + 1).padStart(2, "0")}</span>
        <span>{role.period}</span>
        <span>{role.type}</span>
      </div>
      <div>
        <h3 className="font-head text-2xl leading-[30px] font-semibold tracking-[-0.03em]">
          {role.title}
          <span className="mt-1 block font-sans text-[15px] font-medium tracking-normal text-muted">{role.company}</span>
        </h3>
        {role.summary && <p className="mt-4 text-body">{role.summary}</p>}
        {role.highlights && (
          <ul className="mt-4 grid list-disc gap-2 pl-[18px] text-body marker:text-accent">
            {role.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <PillList items={role.stack} className="mt-5" />
      </div>
    </article>
  );
}
