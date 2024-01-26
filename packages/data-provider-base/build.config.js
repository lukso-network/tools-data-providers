// build.config.ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  declaration: "compatible", // generate .d.ts files
  externals: ["isomorphic-fetch", "cross-blob", "form-data", "is-ipfs", "is-ip"],
  rollup: {
    emitCJS: true,
  },
});
