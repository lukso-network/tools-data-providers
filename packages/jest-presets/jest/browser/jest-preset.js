const esModules = [
  "cross-blob",
  "fetch-blob",
  "is-ipfs",
  "is-ip",
  "@lukso/data-providers",
].join("|");

module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jsdom", // jest-presets/jest/browser/jest-environment-jsdom.ts",
  transform: {
    "^.+\\.(ts|tsx|js)?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
  setupAfterEnv: ["jest-presets/jest/browser/jest.setup.ts"],
  preset: "ts-jest",
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    `lukso-data-providers`,
  ],
};
