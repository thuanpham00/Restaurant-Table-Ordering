import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const tanstackPlugin = require("@tanstack/eslint-plugin-query");
const tanstackRecommended =
  tanstackPlugin && tanstackPlugin.configs && tanstackPlugin.configs.recommended
    ? tanstackPlugin.configs.recommended
    : {};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  tanstackRecommended,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
