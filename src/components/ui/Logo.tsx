import Link from "next/link";
import { site } from "@/content/site";

/** Square monogram plus name, linking home. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-head leading-4 font-semibold" aria-label={`${site.name}, home`}>
      <span className="grid size-[30px] place-items-center rounded-lg bg-accent text-[15px] text-on-accent" aria-hidden>
        {site.firstName.charAt(0)}
      </span>
      <span>
        {site.firstName}
        <br />
        <small className="font-mono text-[9px] font-medium tracking-[0.3em] text-muted uppercase">{site.lastName}</small>
      </span>
    </Link>
  );
}
