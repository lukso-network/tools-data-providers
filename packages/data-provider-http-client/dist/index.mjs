import { create } from 'ipfs-http-client';
import { BaseFormDataProvider } from '@lukso/data-providers';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HttpIPFSClientUploader extends BaseFormDataProvider {
  constructor(gateway) {
    super();
    __publicField(this, "ipfs");
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async upload(data, meta) {
    const { cid } = await this.ipfs.add(data, {
      pin: true
    }) || {};
    if (!cid) {
      throw new Error("IPFS upload failed");
    }
    return `ipfs://${cid.toString()}`;
  }
}

export { HttpIPFSClientUploader };
