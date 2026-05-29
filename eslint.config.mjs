import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  // Ignore les fichiers générés (build Next.js) afin que la lint reflète uniquement
  // le code source.
  { ignores: [".next/**"] },
];

export default eslintConfig;
