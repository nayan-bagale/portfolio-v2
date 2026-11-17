import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Folders import one way only: app -> modules -> components -> lib.
// See AGENTS.md rule 1 and docs/architecture.md.
const rule = (files, groups) => ({
  files,
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: groups.map(({ group, message }) => ({ group, message })),
      },
    ],
  },
});

const noModules = {
  group: ["@/modules", "@/modules/*"],
  message: "components must not import from modules (AGENTS.md rule 1).",
};
const noLayout = {
  group: ["@/components/layout", "@/components/layout/*"],
  message: "ui and motion must not import from layout (AGENTS.md rule 1).",
};
const noUi = {
  group: ["@/components/ui", "@/components/ui/*"],
  message: "motion must not import from ui (AGENTS.md rule 1).",
};
const noMotion = {
  group: ["@/components/motion", "@/components/motion/*"],
  message: "ui must not import from motion (AGENTS.md rule 1).",
};
const noModuleInternals = (other) => ({
  group: [`@/modules/${other}/*`],
  message: `Import another module only through its index.ts: "@/modules/${other}".`,
});


export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

    rule(["src/components/ui/**/*.{ts,tsx}"], [noModules, noLayout, noMotion]),
  rule(["src/components/layout/**/*.{ts,tsx}"], [noModules]),
  rule(["src/components/motion/**/*.{ts,tsx}"], [noModules, noLayout, noUi]),
  rule(["src/modules/home/**/*.{ts,tsx}"], [noModuleInternals("blog")]),
  rule(["src/modules/blog/**/*.{ts,tsx}"], [noModuleInternals("home")]),


  // AGENTS.md rules 3 and 4: no hard-coded colours, no Tailwind dark: variant.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/(^|[\\s\"'`:])dark:/]",
          message: "Do not use the dark: variant. Use token classes (AGENTS.md rule 4).",
        },
        {
          selector: "TemplateElement[value.raw=/(^|[\\s\"'`:])dark:/]",
          message: "Do not use the dark: variant. Use token classes (AGENTS.md rule 4).",
        },
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}(?![\\w-])/]",
          message: "Do not hard-code colours. Use token classes (AGENTS.md rule 3).",
        },
        {
          selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}(?![\\w-])/]",
          message: "Do not hard-code colours. Use token classes (AGENTS.md rule 3).",
        },
      ],
    },
  },
]);
