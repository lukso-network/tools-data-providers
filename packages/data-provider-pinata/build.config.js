// build.config.ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  declaration: "compatible", // generate .d.ts files
  externals: [
    "cross-fetch",
    "form-data",
    "is-ipfs",
    "is-ip",
    "@lukso/data-providers",
  ],
  rollup: {
    emitCJS: true,
  },
});
