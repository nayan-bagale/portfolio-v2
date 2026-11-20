import type { OpenSourceProject } from "./types";

export const openSource: OpenSourceProject[] = [
  {
    name: "cal.com",
    repo: "https://github.com/calcom/cal.diy",
    pullRequests: [
      {
        number: 19103,
        title: "Fix issues with scheduling timezone change without end time",
        href: "https://github.com/calcom/cal.diy/pull/19103",
      },
      {
        number: 19342,
        title: "Replace toaster with sonner",
        href: "https://github.com/calcom/cal.diy/pull/19342",
      },
    ],
  },
];
