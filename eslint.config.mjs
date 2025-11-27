import { defineConfig } from "eslint/config";

// Minimal ESLint config used for Next.js builds in CI. The previous config
// relied on packages like @eslint/compat and @eslint/eslintrc which were not
// present in the project's dependencies and caused the build to fail on Vercel.
// Keep the config small and compatible with Next.js built-in rules.
export default defineConfig({
  extends: ["next/core-web-vitals"],
  files: ["**/*.ts", "**/*.tsx"],
  rules: {
    "no-console": "warn",
  },
});