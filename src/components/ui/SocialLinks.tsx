import type { SocialLink } from "@/content/types";
import { cn } from "@/lib/cn";

/** Row of small pill links to profiles. */
export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] leading-4 font-medium tracking-widest text-muted uppercase transition-colors duration-300 ease-expo hover:border-accent hover:bg-accent hover:text-on-accent"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
