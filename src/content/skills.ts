import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Component systems, state management, and interfaces that are fast and accessible.",
    icon: "code",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Carbon", "GraphQL", "Electron"],
  },
  {
    title: "Backend",
    description: "REST and GraphQL APIs, data models, and authentication behind the product.",
    icon: "database",
    items: ["Node.js", "Express.js", "Go", "Java", "PostgreSQL", "MySQL", "MongoDB", "Drizzle ORM", "Keycloak"],
  },
  {
    title: "System design",
    description: "How the pieces fit: API boundaries, data, auth, real time features, and deployment.",
    icon: "tree",
    items: ["API design", "Data modeling", "Auth and RBAC", "Real time", "Cloud deployment", "CI/CD"],
    featured: true,
  },
  {
    title: "Cloud and DevOps",
    description: "Where products run, and how changes get there safely.",
    icon: "export",
    items: ["AWS EC2", "AWS S3", "Azure", "Firebase", "Jenkins", "GitHub Actions", "WebRTC", "Socket.IO"],
  },
];
