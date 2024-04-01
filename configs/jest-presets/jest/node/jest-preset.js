const esModules = [
  "cross-blob",
  "is-ipfs",
  "is-ip",
  "@lukso/data-provider-base",
  "@lukso/data-provider-urlresolver",
  "@lukso/data-provider-ipfs-http-client",
  "data-provider-ipfs-http-client",
  "data-providers",
  "jest-tests-node",
].join("|");

module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(ts|tsx|js)?$": [
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
    "mjs",
    "cjs",
    "json",
    "node",
  ],
  extensionsToTreatAsEsm: [".ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
  setupFilesAfterEnv: ["jest-presets/jest/node/jest-setup.js"],
  preset: "ts-jest",
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
