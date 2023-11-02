"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  HttpIPFSClientUploader: () => HttpIPFSClientUploader
});
module.exports = __toCommonJS(src_exports);

// src/ipfs-http-client.ts
var import_ipfs_http_client = require("ipfs-http-client");
var import_data_providers = require("@lukso/data-providers");
var HttpIPFSClientUploader = class extends import_data_providers.BaseFormDataProvider {
  ipfs;
  constructor(gateway) {
    super();
    if (typeof gateway === "string") {
      const isPortProvided = gateway.split(":").length > 2;
      let url;
      if (gateway.endsWith("/")) {
        url = isPortProvided ? gateway : `${gateway.slice(0, -1)}:${5001}`;
      } else {
        url = isPortProvided ? gateway : `${gateway}:${5001}`;
      }
      this.ipfs = (0, import_ipfs_http_client.create)({ url });
    } else if (gateway instanceof URL) {
      const { hostname, port, protocol } = gateway;
      this.ipfs = (0, import_ipfs_http_client.create)({
        host: hostname,
        port: Number.parseInt(port, 10),
        protocol
      });
    } else {
      this.ipfs = (0, import_ipfs_http_client.create)(gateway);
    }
  }
  async upload(data, meta) {
    const { cid } = await this.ipfs.add(data, {
      pin: true
    }) || {};
    if (!cid) {
      throw new Error("IPFS upload failed");
    }
    return `ipfs://${cid.toString()}`;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpIPFSClientUploader
});
