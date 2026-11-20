import type { CSSProperties } from "react";
import { Accent, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { openSource } from "@/content/open-source";
import type { OpenSourceProject } from "@/content/types";
import { SectionHeader } from "./SectionHeader";

/** One open source project with its PRs on a timeline whose line fills while scrolling. */
function OpenSourceCard({ project, index }: { project: OpenSourceProject; index: number }) {
  const repoLabel = project.repo.replace(/^https?:\/\/(www\.)?github\.com\//, "");

  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
        <h3 className="font-head text-[28px] leading-9 font-semibold tracking-[-0.03em] md:text-[32px] md:leading-10">
          <span className="mr-3 font-mono text-sm font-normal tracking-normal text-accent">
            /{String(index + 1).padStart(2, "0")}
          </span>
          {project.name}
        </h3>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-transparent font-mono text-[11px] font-medium tracking-[0.12em] text-muted uppercase transition-colors duration-300 ease-expo hover:border-accent hover:text-accent"
        >
          {repoLabel} ↗
        </a>
      </div>

      <ol className="oss-track relative mt-10 grid gap-10 pl-12 md:mt-12 md:gap-12 md:pl-14">
        <span aria-hidden className="absolute top-4 bottom-4 left-2 w-1 rounded-full bg-line" />
        <span aria-hidden className="oss-fill absolute top-4 bottom-4 left-2 w-1 rounded-full bg-accent" />
        {project.pullRequests.map((pr, prIndex, list) => (
          <li key={pr.number} className="relative text-lg leading-8 md:text-xl">
            <span
              aria-hidden
              className="oss-dot absolute top-1.5 -left-12 size-5 rounded-full border-[3px] border-accent bg-accent md:-left-14"
              style={{ "--r": list.length > 1 ? prIndex / (list.length - 1) : 0 } as CSSProperties}
            />
            <a
              href={pr.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pull request #${pr.number}: ${pr.title}`}
              className="mr-4 border-b border-accent/40 font-mono text-base font-medium md:text-lg text-accent transition-colors duration-300 ease-expo hover:border-accent"
            >
              #{pr.number}
            </a>
            <span className="font-medium text-ink">{pr.title}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function OpenSourceSection() {
  return (
    <section id="open-source" className="py-24">
      <Container>
        <SectionHeader
          kicker="Open source"
          title={
            <>
              Giving back to the tools <Accent>I use.</Accent>
            </>
          }
        />
        <div className="grid gap-4">
          {openSource.map((project, index) => (
            <Reveal key={project.name}>
              <OpenSourceCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
