const esModules = [
  "cross-blob",
  "fetch-blob",
  "is-ipfs",
  "is-ip",
  "@lukso/data-providers",
  `lukso-data-providers`,
].join("|");

module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(ts|tsx|js)?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
  setupAfterEnv: ["jest-presets/jest/node/jest.setup.ts"],
  preset: "ts-jest",
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
