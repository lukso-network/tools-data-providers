'use strict';

const FormData = require('cross-formdata');
const fetch = require('isomorphic-fetch');
const cloudflareWorkerJwt = require('@tsndr/cloudflare-worker-jwt');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const FormData__default = /*#__PURE__*/_interopDefaultCompat(FormData);
const fetch__default = /*#__PURE__*/_interopDefaultCompat(fetch);

const NOT_IMPLEMENTED = "Not implemented";
const handleError = (error) => {
  if (error && error.response && error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  } else if (error.data && error.data.error) {
    return error.data.error;
  } else if (error.response && error.response.error) {
    return error.response.error;
  }
  return error;
};
class BaseFormDataProvider {
  // Already refactored several times, but still too complex since it needs
  // to handle both node and browser types.
  // eslint-disable-next-line sonarjs/cognitive-complexity
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
    const dataContent = new FormData__default();
    meta = this.populate(dataContent, data, meta);
    await this.addMetadata(dataContent, meta);
    const options = await this.getRequestOptions(dataContent, meta);
    return this.resolveUrl(
      await this.uploadFormData(options, dataContent)
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveUrl(result) {
    throw new Error(NOT_IMPLEMENTED);
  }
  uploadFormData(requestOptions, dataContent) {
    const input = {
      method: "POST",
      ...requestOptions
    };
    input.headers = {
      ...input.headers
      /* ...headers */
    };
    return (globalThis.fetch || fetch__default)(this.getEndpoint(), {
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
}

class CustomHeaderFormDataProvider extends BaseFormDataProvider {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHeaders(dataContent, meta) {
    return this.headers;
  }
}

class AuthenticatedFormDataProvider extends CustomHeaderFormDataProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHeaders(dataContent, meta) {
    const jwt = await this.getToken();
    return { Authorization: `Bearer ${jwt}` };
  }
  resolveUrl(result) {
    return `ipfs://${result.IpfsHash}`;
  }
  async getToken() {
    const now = Date.now();
    return await cloudflareWorkerJwt.sign(
      { iss: "extension", iat: now / 1e3, exp: (now + 12e4) / 1e3 },
      process.env.VUE_APP_SHARED_KEY || ""
    );
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UrlConverter {
  /**
   * It will relatively append pathname or hostname to the desination URL
   *
   * For example:
   * destination=https://some.api.gateway/something/ipfs
   * url=ipfs://QmSomeHash
   * output=https://some.api.gateway/something/ipfs/QmSomeHash
   *
   * destination=https://some.api.gateway/something/ipfs
   * url=https://something.com/somewhere
   * output=https://some.api.gateway/something/ipfs/somewhere
   *
   * @param destination destination string | URL
   */
  constructor(destination) {
    __publicField(this, "destination");
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
}
class UrlResolver {
  constructor(converters) {
    __publicField(this, "converters", []);
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
  /**
   * Resolves a URL to a gateway URL.
   * Supports possible multiple converters transforming the URL
   * in sequence until no converter matches.
   *
   * @param <URL> url to resolve
   * @returns <URL> resolved url (if resolver is found, otherwise the parameter url is returned)
   */
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
}

exports.AuthenticatedFormDataProvider = AuthenticatedFormDataProvider;
exports.BaseFormDataProvider = BaseFormDataProvider;
exports.CustomHeaderFormDataProvider = CustomHeaderFormDataProvider;
exports.UrlConverter = UrlConverter;
exports.UrlResolver = UrlResolver;
exports.handleError = handleError;
