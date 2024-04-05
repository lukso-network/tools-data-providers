const crypto = require("node:crypto");
const { TextEncoder, TextDecoder } = require("node:util");
const ResizeObserver = require("resize-observer-polyfill");
const { config } = require("dotenv");
config({ path: "../../.env.test" });

Object.defineProperty(globalThis, "crypto", {
  value: crypto,
});
Object.defineProperty(globalThis, "Uint32Array", {
  value: Uint32Array,
});
Object.defineProperty(globalThis, "Uint8Array", {
  value: Uint8Array,
});
Object.defineProperty(globalThis, "ArrayBuffer", {
  value: ArrayBuffer,
});

Object.defineProperty(globalThis, "ArrayBuffer", {
  value: ArrayBuffer,
});
Object.defineProperty(globalThis, "TextDecoder", {
  value: TextDecoder,
});
Object.defineProperty(globalThis, "TextEncoder", {
  value: TextEncoder,
});
Object.defineProperty(globalThis, "ResizeObserver", {
  value: ResizeObserver,
});
