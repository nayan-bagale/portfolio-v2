import {
  ContactSection,
  ExperienceSection,
  Hero,
  MarqueeBand,
  ProjectsSection,
  SkillsSection,
  TaglineSection,
  WritingSection,
} from "@/components/organisms";

/** Section order of the home page. */
export function HomeTemplate() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <TaglineSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
