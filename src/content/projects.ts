import type { Project } from "./types";

/** `live` and `code` are placeholders. Replace them with the real links. */
export const projects: Project[] = [
  {
    name: "Skydock",
    category: "Web app",
    description:
      "A macOS inspired web app that brings a desktop experience to the browser, with draggable apps, a nested file system, and smooth animations. Files live in AWS S3 and the app runs on EC2.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "AWS S3", "AWS EC2"],
    live: "https://skydock.example.com",
    code: "https://github.com/your-username/skydock",
    featured: true,
  },
  {
    name: "Nex Ed",
    category: "Education",
    description:
      "A virtual classroom platform with real time communication, automated attendance tracking, and analytics. It supports live video classes and resource sharing.",
    stack: ["Next.js", "PostgreSQL", "WebRTC", "Socket.IO"],
    live: "https://nex-ed.example.com",
    code: "https://github.com/your-username/nex-ed",
  },
  {
    name: "ModernUI",
    category: "UI library",
    description:
      "A UI component library built with Next.js, Tailwind CSS, Framer Motion, and TypeScript. Developers copy and paste animated, professional components straight into their projects.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    live: "https://modernui.example.com",
    code: "https://github.com/your-username/modernui",
  },
  {
    name: "ToDo List",
    category: "Productivity",
    description:
      "A simple to do app where users add tasks, mark them complete, and delete them, with user authentication.",
    stack: ["jQuery", "Node.js", "MongoDB"],
    live: "https://todo.example.com",
    code: "https://github.com/your-username/todo-list",
  },
];
