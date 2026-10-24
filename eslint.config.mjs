import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";

// eslint-config-next only registers its plugins for these files, so rules that use them must not reach others
const files = ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"];

export default defineConfig([
  globalIgnores([
    "**/.now/",
    "**/.changeset/",
    "**/dist/",
    "**/coverage/",
    "**/esm/",
    "**/public/",
    "**/tests/",
    "**/scripts/",
    "**/*.config.js",
  ]),
  // before `next`, so the warnings it sets for some of these rules win (same order as the old `extends`)
  { files, rules: jsxA11y.flatConfigs.recommended.rules },
  ...next,
  prettier,
  {
    files,
    plugins: { "unused-imports": unusedImports },
    rules: {
      "react/jsx-uses-react": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "unused-imports/no-unused-imports": "warn",
      "react/self-closing-comp": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],
    },
  },
]);
