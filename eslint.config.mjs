import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Atomic layers import one way only: atoms -> molecules -> organisms -> templates -> app.
// See AGENTS.md rule 1 and docs/architecture.md.
const forbidden = (names, message) => ({
  patterns: [
    {
      group: names.flatMap((n) => [`@/components/${n}`, `@/components/${n}/*`, `**/${n}`, `**/${n}/*`]),
      message,
    },
  ],
});
const layerRule = (dir, names) => ({
  files: [`src/components/${dir}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      forbidden(names, `${dir} must not import from ${names.join(", ")} (AGENTS.md rule 1).`),
    ],
  },
});

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  layerRule("atoms", ["molecules", "organisms", "templates", "motion"]),
  layerRule("molecules", ["organisms", "templates"]),
  layerRule("organisms", ["templates"]),
  layerRule("motion", ["atoms", "molecules", "organisms", "templates"]),

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
