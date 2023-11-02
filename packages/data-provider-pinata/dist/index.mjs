import isIPFS from 'is-ipfs';
import { BaseFormDataProvider } from '@lukso/data-providers';

const ERROR_NO_CREDENTIALS_PROVIDED = "No credentials provided! Please provide your pinata api key and pinata secret api key or your pinata JWT key as an argument when you start this script";
function validateHostNodes(hostNodes) {
  if (!Array.isArray(hostNodes)) {
    throw new TypeError("host_nodes value must be an array");
  }
  for (const node of hostNodes) {
    if (!isIPFS.peerMultiaddr(node)) {
      throw new Error(
        `host_node array entry: ${node} is not a valid peer multiaddr`
      );
    }
  }
}
function validateMetadata(metadata) {
  if (metadata.name && !(typeof metadata.name === "string" || metadata.name instanceof String)) {
    throw new Error("metadata name must be of type string");
  }
  if (metadata.keyvalues) {
    if (!(typeof metadata.keyvalues === "object")) {
      throw new TypeError("metatadata keyvalues must be an object");
    }
    let i = 0;
    for (const [key, value] of Object.entries(metadata.keyvalues)) {
      if (i > 9) {
        throw new Error(
          "No more than 10 keyvalues can be provided for metadata entries"
        );
      }
      if (!(typeof value === "string" || typeof value === "boolean" || !Number.isNaN(value))) {
        throw new TypeError(
          `Metadata keyvalue values must be strings, booleans, or numbers (typeof metadata['${key}'] = ${typeof value})`
        );
      }
      i++;
    }
  }
}
function validatePinPolicyStructure(pinPolicy) {
  if (!pinPolicy) {
    throw new TypeError("No pin policy provided");
  }
  if (!pinPolicy.regions) {
    throw new TypeError("No regions provided in pin policy");
  }
  if (pinPolicy.regions?.length > 0) {
    for (const region of pinPolicy.regions) {
      if (!region.id || !(Object.prototype.toString.call(region.id) === "[object String]")) {
        throw new TypeError("region id must be a string");
      }
      if (!(region.desiredReplicationCount || region.desiredReplicationCount === 0) || !Number.isInteger(region.desiredReplicationCount)) {
        throw new TypeError("desiredReplicationCount must be an integer");
      }
    }
  }
}
function createConfigForAxiosHeaders(config) {
  if (config.pinataApiKey && config.pinataApiKey.length > 0 && config.pinataSecretApiKey && config.pinataSecretApiKey.length > 0) {
    return {
      withCredentials: true,
      headers: {
        pinata_api_key: config.pinataApiKey,
        pinata_secret_api_key: config.pinataSecretApiKey
      }
    };
  }
  if (config.pinataJWTKey && config.pinataJWTKey.length > 0) {
    return {
      headers: {
        Authorization: `Bearer ${config.pinataJWTKey}`
      }
    };
  }
  throw new Error(ERROR_NO_CREDENTIALS_PROVIDED);
}
function createConfigForAxiosHeadersWithFormData(config) {
  const requestOptions = {
    ...createConfigForAxiosHeaders(config),
    maxContentLength: Number.POSITIVE_INFINITY,
    //this is needed to prevent axios from erroring out with large files
    maxBodyLength: Number.POSITIVE_INFINITY
  };
  return requestOptions;
}
function validatePinataOptions(options) {
  if (typeof options !== "object") {
    throw new TypeError("options must be an object");
  }
  if (options.cidVersion && options.cidVersion != 0 && options.cidVersion != 1) {
    throw new Error("unsupported or invalid cidVersion");
  }
  if (options.wrapWithDirectory && options.wrapWithDirectory !== true && options.wrapWithDirectory !== false) {
    throw new Error(
      "wrapWithDirectory must be a boolean value of true or false"
    );
  }
  if (options.hostNodes) {
    validateHostNodes(options.hostNodes);
  }
  if (options.customPinPolicy) {
    validatePinPolicyStructure(options.customPinPolicy);
  }
}
class PinataFormDataProvider extends BaseFormDataProvider {
  constructor(pinataConfig) {
    super();
    this.pinataConfig = pinataConfig;
  }
  async getRequestOptions(_dataContent, meta) {
    const root = await super.getRequestOptions(_dataContent, meta);
    const { headers, ...rest } = createConfigForAxiosHeadersWithFormData(
      this.pinataConfig
    );
    return { ...root, ...rest, headers: { ...headers } };
  }
  async addMetadata(dataContent, meta) {
    if (meta?.pinataMetadata) {
      validateMetadata(meta);
      dataContent.append(
        "pinataMetadata",
        JSON.stringify(meta?.pinataMetadata)
      );
    }
  }
  getEndpoint() {
    return "https://api.pinata.cloud/pinning/pinFileToIPFS";
  }
  resolveUrl(result) {
    return `ipfs://${result.IpfsHash}`;
  }
}

export { ERROR_NO_CREDENTIALS_PROVIDED, PinataFormDataProvider, createConfigForAxiosHeaders, createConfigForAxiosHeadersWithFormData, validateHostNodes, validateMetadata, validatePinPolicyStructure, validatePinataOptions };
