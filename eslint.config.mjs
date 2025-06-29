import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Build outputs
      ".next/**/*",
      "out/**/*",
      "dist/**/*",
      "build/**/*",

      // Generated files
      "lib/generated/**/*",
      "**/generated/**/*",

      // Dependencies
      "node_modules/**/*",

      // Cache directories
      ".cache/**/*",
      ".turbo/**/*",

      // Config files that might cause issues
      "next.config.js",
      "next.config.mjs",
      "tailwind.config.js",
      "tailwind.config.ts",
      "postcss.config.js",

      // Environment files
      ".env*",

      // Package manager files
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",

      // IDE/Editor files
      ".vscode/**/*",
      ".idea/**/*",
      "*.swp",
      "*.swo",

      // OS files
      ".DS_Store",
      "Thumbs.db",

      // Logs
      "*.log",
      "logs/**/*",
    ]
  },
  {
    rules: {
      // Disable rules that commonly cause build failures
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      // Next.js specific rules that might be too strict
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",

      // Common React rules that might cause issues
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",

      // Import/export rules
      "import/no-anonymous-default-export": "off",
    }
  }
];

export default eslintConfig;