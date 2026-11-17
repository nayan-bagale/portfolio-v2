import { Spotlight } from "@/components/motion";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { PillList } from "@/components/ui";

const linkClass =
  "border-b border-transparent font-mono text-[11px] font-medium tracking-[0.12em] text-accent uppercase transition-colors duration-300 hover:border-accent";

/** One side project. `featured` uses the dark, inverted card. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = Boolean(project.featured);
  const primaryUrl = project.live ?? project.code;
  const badgeClass = cn(
    "grid size-9 place-items-center rounded-full border text-sm transition duration-500 ease-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent",
    featured ? "border-bg/25 text-bg" : "border-line text-ink",
  );

  return (
    <Spotlight
      className={cn(
        "group flex h-full flex-col gap-3 rounded-3xl border p-7 transition duration-500 ease-expo hover:-translate-y-1.5",
        featured ? "border-ink bg-ink text-bg" : "border-line bg-card hover:border-line-strong",
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.15em] uppercase",
          featured ? "text-bg/60" : "text-muted",
        )}
      >
        <span>
          /{String(index + 1).padStart(2, "0")} · {project.category}
        </span>
        {primaryUrl ? (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={badgeClass}
            aria-label={`Open ${project.name}`}
          >
            ↗
          </a>
        ) : (
          <span className={badgeClass} aria-hidden>
            ↗
          </span>
        )}
      </div>
      <h3 className="relative mt-5 font-head text-[26px] leading-8 font-semibold tracking-[-0.03em]">{project.name}</h3>
      <p className={cn("relative text-[15px] leading-6", featured ? "text-bg/75" : "text-body")}>{project.description}</p>
      {(project.live || project.code) && (
        <div className="relative flex gap-4">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Live ↗
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Code ↗
            </a>
          )}
        </div>
      )}
      <PillList items={project.stack} tone={featured ? "inverse" : "default"} className="relative mt-auto pt-3" />
    </Spotlight>
  );
}
