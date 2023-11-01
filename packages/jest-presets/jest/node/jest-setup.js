const crypto = require("node:crypto");
const { TextEncoder, TextDecoder } = require("util");
const ResizeObserver = require("resize-observer-polyfill");

debugger;

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

// eslint-disable-next-line unicorn/prefer-module
Object.defineProperty(globalThis, "ArrayBuffer", {
  value: ArrayBuffer,
});
// eslint-disable-next-line unicorn/prefer-module
Object.defineProperty(globalThis, "TextDecoder", {
  value: TextDecoder,
});
// eslint-disable-next-line unicorn/prefer-module
Object.defineProperty(globalThis, "ResizeObserver", {
  value: ResizeObserver,
});
console.log(globalThis, globalThis.self);
