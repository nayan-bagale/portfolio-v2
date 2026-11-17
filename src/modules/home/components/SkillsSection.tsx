import { Accent, Container } from "@/components/ui";
import { SectionHeader } from "./SectionHeader";
import { SkillCard } from "./SkillCard";
import { Reveal } from "@/components/motion";
import { skills } from "@/content/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="py-28">
      <Container>
        <SectionHeader
          kicker="Skills"
          title={
            <>
              Frontend, backend, and the <Accent>system in between.</Accent>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <Reveal key={skill.title} delay={(index % 4) * 100}>
              <SkillCard skill={skill} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
