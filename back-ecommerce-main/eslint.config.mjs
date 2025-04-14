import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { "vars": "all", "args": "none" }], // Ignore unused args specifically
      "no-console": "off",
      "no-undef": "off",
    },
  },
  {
    ...pluginJs.configs.recommended, // Inherit recommended rules and apply overrides
    rules: {
      ...pluginJs.configs.recommended.rules,
      "no-unused-vars": ["warn", { "vars": "all", "args": "none" }],
    },
  },
];
