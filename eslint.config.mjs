import { FlatCompat } from "@eslint/eslintrc";

// shortcut: FlatCompat bridges eslint-config-next 15 (legacy format only), drop it once on a flat-native eslint-config-next (16+)
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  {
    ignores: [
      "**/.next/",
      "**/.now/",
      "**/.changeset/",
      "**/dist/",
      "**/build/",
      "**/coverage/",
      "**/esm/",
      "**/public/",
      "**/tests/",
      "**/scripts/",
      "**/*.config.js",
    ],
  },
  ...compat.config({
    env: {
      browser: false,
      es2021: true,
      node: true,
    },
    extends: [
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "next",
    ],
    plugins: ["react", "unused-imports", "import", "@typescript-eslint", "jsx-a11y"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-console": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "prettier/prettier": "off",
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],
      "react/self-closing-comp": "warn",
    },
  }),
];
