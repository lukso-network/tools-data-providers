const esModules = [
  "is-ip",
  "jest-tests-browser",
  "@lukso/data-provider-base",
  "@lukso/data-provider-ipfs-http-client",
  "@lukso/data-provider-urlresolver",
  "data-provider-ipfs-http-client",
  "jest-tests-browser",
].join("|");

module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/*.spec.mts", "**/*.spec.ts"],
  testEnvironment: "@happy-dom/jest-environment", // jest-presets/jest/browser/jest-environment-jsdom.ts",
  transform: {
    "^.+\\.(ts|tsx|js|mjs)?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "mjs",
    "cjs",
  ],
  extensionsToTreatAsEsm: [".ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
  setupFilesAfterEnv: ["jest-presets/jest/browser/jest-setup.js"],
  preset: "ts-jest",
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    "lukso-data-providers",
  ],
  silent: false,
  verbose: true,
};
