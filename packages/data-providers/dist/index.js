"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AuthenticatedFormDataProvider: () => AuthenticatedFormDataProvider,
  BaseFormDataProvider: () => BaseFormDataProvider,
  CustomHeaderFormDataProvider: () => CustomHeaderFormDataProvider,
  UrlConverter: () => UrlConverter,
  UrlResolver: () => UrlResolver,
  handleError: () => handleError
});
module.exports = __toCommonJS(src_exports);

// src/formdata-base-provider.ts
var import_cross_formdata = __toESM(require("cross-formdata"));
var import_isomorphic_fetch = __toESM(require("isomorphic-fetch"));
var NOT_IMPLEMENTED = "Not implemented";
var handleError = (error) => {
  if (error && error.response && error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  } else if (error.data && error.data.error) {
    return error.data.error;
  } else if (error.response && error.response.error) {
    return error.response.error;
  }
  return error;
};
var BaseFormDataProvider = class {
  populate(dataContent, data, meta) {
    if (!("on" in data) && typeof data !== "string") {
      if ("size" in data && "type" in data) {
        const blob = data;
        meta = {
          "content-type": blob.type,
          ...blob.name ? { name: blob.name } : {}
        };
        dataContent.append("file", blob);
      } else if ("buffer" in data && "mimeType" in data) {
        const assetBuffer = data;
        meta = { "content-type": assetBuffer.mimeType };
        dataContent.append(
          "file",
          new (global.Blob || Blob)([assetBuffer.buffer])
        );
      } else if (Buffer.isBuffer(data)) {
        dataContent.append("file", new (global.Blob || Blob)([data]));
      } else if ("on" in data && "pipe" in data) {
        dataContent.append("file", data);
      } else {
        throw new Error("Unknown upload data format");
      }
    } else {
      dataContent.append("file", data);
    }
    return meta;
  }
  async upload(data, meta) {
    const dataContent = new import_cross_formdata.default();
    meta = this.populate(dataContent, data, meta);
    await this.addMetadata(dataContent, meta);
    const options = await this.getRequestOptions(dataContent, meta);
    return this.resolveUrl(
      await this.uploadFormData(options, dataContent)
    );
  }
  async addMetadata(dataContent, meta) {
  }
  async getRequestOptions(dataContent, meta) {
    return {
      maxContentLength: Number.MAX_SAFE_INTEGER,
      maxBodyLength: Number.MAX_SAFE_INTEGER,
      withCredentials: true
    };
  }
  getPostEndpoint() {
    throw new Error(NOT_IMPLEMENTED);
  }
  resolveUrl(result) {
    throw new Error(NOT_IMPLEMENTED);
  }
  uploadFormData(requestOptions, dataContent) {
    const input = {
      method: "POST",
      ...requestOptions
    };
    input.headers = { ...input.headers };
    return (globalThis.fetch || import_isomorphic_fetch.default)(this.getEndpoint(), {
      ...input,
      body: dataContent
    }).then((response) => {
      if (response.status !== 200) {
        return response.text().then((text) => {
          let error = text;
          try {
            error = JSON.parse(text);
          } catch {
          }
          error = error.error || error;
          throw new Error(
            `unknown server response while pinning File to IPFS: ${error || response.status}`
          );
        });
      }
      return response.json();
    }).catch(function(error) {
      throw handleError(error);
    });
  }
  async getToken() {
    throw new Error(NOT_IMPLEMENTED);
  }
  getEndpoint() {
    throw new Error(NOT_IMPLEMENTED);
  }
};

// src/authenticated-formdata-provider.ts
var import_cloudflare_worker_jwt = require("@tsndr/cloudflare-worker-jwt");

// src/ipfs-formdata-provider.ts
var CustomHeaderFormDataProvider = class extends BaseFormDataProvider {
  constructor(endpoint, headers) {
    super();
    this.endpoint = endpoint;
    this.headers = headers;
  }
  async getRequestOptions(_dataContent, meta) {
    const rest = await super.getRequestOptions(_dataContent, meta);
    const headers = await this.getHeaders(_dataContent, meta);
    return { ...rest, headers: { ...headers } };
  }
  getEndpoint() {
    return this.endpoint;
  }
  async getToken() {
    return this.headers.Authorization.replace("Bearer ", "");
  }
  async getHeaders(dataContent, meta) {
    return this.headers;
  }
};

// src/authenticated-formdata-provider.ts
var AuthenticatedFormDataProvider = class extends CustomHeaderFormDataProvider {
  async getHeaders(dataContent, meta) {
    const jwt = await this.getToken();
    return { Authorization: `Bearer ${jwt}` };
  }
  resolveUrl(result) {
    return `ipfs://${result.IpfsHash}`;
  }
  async getToken() {
    const now = Date.now();
    return await (0, import_cloudflare_worker_jwt.sign)(
      { iss: "extension", iat: now / 1e3, exp: (now + 12e4) / 1e3 },
      process.env.VUE_APP_SHARED_KEY || ""
    );
  }
};

// src/url-resolver.ts
var UrlConverter = class {
  destination;
  constructor(destination) {
    this.destination = new URL(destination);
    if (this.destination.pathname.at(-1) != "/") {
      this.destination.pathname += "/";
    }
  }
  resolveUrl(url) {
    const source = new URL(url);
    const relativePath = source.pathname ? `.${source.pathname}` : `./${source.hostname}`;
    const out = new URL(relativePath, this.destination);
    out.pathname = out.pathname.replaceAll(/\/\/+/g, "/");
    return out.toString();
  }
};
var UrlResolver = class {
  converters = [];
  constructor(converters) {
    for (const item of converters) {
      const [match, _converter] = item;
      if (match == void 0) {
        throw new TypeError("Match criteria not defined");
      }
      const converter = typeof _converter === "string" ? new UrlConverter(_converter) : _converter;
      if (!(converter instanceof UrlConverter)) {
        throw new TypeError("Invalid converter");
      }
      this.converters.push({ match, converter });
    }
  }
  resolveUrl(url) {
    const current = new Set(this.converters);
    let found = true;
    while (found) {
      found = false;
      for (const entry of current) {
        const { match, converter } = entry;
        if (match instanceof RegExp ? match.test(url) : url.startsWith(match)) {
          url = converter.resolveUrl(url);
          current.delete(entry);
          found = true;
          break;
        }
      }
    }
    return url;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticatedFormDataProvider,
  BaseFormDataProvider,
  CustomHeaderFormDataProvider,
  UrlConverter,
  UrlResolver,
  handleError
});
