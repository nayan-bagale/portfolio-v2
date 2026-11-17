import { ContactSection } from "@/components/layout";
import {
  ExperienceSection,
  Hero,
  MarqueeBand,
  ProjectsSection,
  SkillsSection,
  TaglineSection,
  WritingSection,
} from "./components";

/** Section order of the home page. */
export function HomePage() {
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
