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
    rules: {
      quotes: ["error", "double"],

      semi: ["error", "always"],

      "object-curly-spacing": ["error", "always"],

      "no-unused-vars": ["warn", { args: "warn" }],
    },
  },
];

export default eslintConfig;
