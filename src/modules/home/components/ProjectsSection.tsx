import { Accent, Container } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion";
import { projects } from "@/content/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionHeader
          kicker="Side projects"
          title={
            <>
              Things I&apos;m <Accent>proud</Accent> of building.
            </>
          }
          aside="Building is my favorite way to understand a concept. Each project was a step forward."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={(index % 2) * 100}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
