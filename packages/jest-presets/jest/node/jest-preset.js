const esModules = [
  "cross-blob",
  "fetch-blob",
  "is-ipfs",
  "is-ip",
  "@lukso/data-providers",
  "lukso-data-providers",
  "ipfs-http-client",
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
  setupFilesAfterEnv: ["jest-presets/jest/node/jest-setup.js"],
  preset: "ts-jest",
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
