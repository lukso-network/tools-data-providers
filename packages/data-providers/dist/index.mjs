// src/formdata-base-provider.ts
import FormData from "cross-formdata";
import fetch from "isomorphic-fetch";
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
    const dataContent = new FormData();
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
    return (globalThis.fetch || fetch)(this.getEndpoint(), {
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
import { sign } from "@tsndr/cloudflare-worker-jwt";

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
    return await sign(
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
export {
  AuthenticatedFormDataProvider,
  BaseFormDataProvider,
  CustomHeaderFormDataProvider,
  UrlConverter,
  UrlResolver,
  handleError
};
