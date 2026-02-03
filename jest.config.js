const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Chemin vers l'application Next.js
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Gérer les imports avec @/
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  // Transformer les modules ESM
  transformIgnorePatterns: [
    "/node_modules/(?!(remark|remark-parse|remark-html|unified|bail|is-plain-obj|trough|vfile|unist-util-stringify-position|mdast-util-from-markdown|mdast-util-to-string|micromark|decode-named-character-reference|character-entities|mdast-util-to-hast|unist-util-visit|unist-util-is|hast-util-to-html|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|html-void-elements|ccount|stringify-entities|character-entities-html4|character-entities-legacy)/)",
  ],
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
