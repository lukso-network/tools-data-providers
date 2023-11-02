// src/ipfs-http-client.ts
import { create } from "ipfs-http-client";
import {
  BaseFormDataProvider
} from "@lukso/data-providers";
var HttpIPFSClientUploader = class extends BaseFormDataProvider {
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
      this.ipfs = create({ url });
    } else if (gateway instanceof URL) {
      const { hostname, port, protocol } = gateway;
      this.ipfs = create({
        host: hostname,
        port: Number.parseInt(port, 10),
        protocol
      });
    } else {
      this.ipfs = create(gateway);
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
export {
  HttpIPFSClientUploader
};
