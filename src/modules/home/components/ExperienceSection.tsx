import { Accent, Container } from "@/components/ui";
import { RoleCard } from "./RoleCard";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion";
import { experience } from "@/content/experience";

export function ExperienceSection() {
  return (
    <section id="work" className="py-24">
      <Container>
        <SectionHeader
          kicker="Experience"
          title={
            <>
              Two years of owning features <Accent>end to end.</Accent>
            </>
          }
          aside="Web, desktop, and backend work, from design review to production."
        />
        <div className="grid gap-4">
          {experience.map((role, index) => (
            <Reveal key={`${role.company}-${role.title}`}>
              <RoleCard role={role} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
