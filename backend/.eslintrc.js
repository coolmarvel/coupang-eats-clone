module.exports = {
  env: { browser: true, es2021: true },
  extends: ["plugin:import/recomended", "plugin:import/typescript", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        pathGroups: [{ pattern: "@/**", group: "internal", position: "after" }],
        newlineBetween: "always",
      },
    ],
  },
  settings: {
    "import/resolver": { typescript: true, node: true },
  },
};
