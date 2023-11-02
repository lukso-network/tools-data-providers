import { PinataConfig } from "@pinata/sdk";

import isIPFS from "is-ipfs";

import {
  BaseFormDataProvider,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "@lukso/data-providers";

export const ERROR_NO_CREDENTIALS_PROVIDED =
  "No credentials provided! Please provide your pinata api key and pinata secret api key or your pinata JWT key as an argument when you start this script";

export function validateHostNodes(hostNodes: any) {
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

export function validateMetadata(metadata: any) {
  if (
    metadata.name &&
    !(typeof metadata.name === "string" || metadata.name instanceof String)
  ) {
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
      //  we want to make sure that the input is a string, a boolean, or a number, so we don't get an object passed in by accident
      if (
        !(
          typeof value === "string" ||
          typeof value === "boolean" ||
          !Number.isNaN(value as number)
        )
      ) {
        throw new TypeError(
          `Metadata keyvalue values must be strings, booleans, or numbers (typeof metadata['${key}'] = ${typeof value})`
        );
      }
      i++;
    }
  }
}

export function validatePinPolicyStructure(pinPolicy: { regions: any[] }) {
  //this function takes in a pin policy and checks the JSON structure to make sure it's valid
  if (!pinPolicy) {
    throw new TypeError("No pin policy provided");
  }

  if (!pinPolicy.regions) {
    throw new TypeError("No regions provided in pin policy");
  }
  if (pinPolicy.regions?.length > 0) {
    for (const region of pinPolicy.regions) {
      if (
        !region.id ||
        !(Object.prototype.toString.call(region.id) === "[object String]")
      ) {
        throw new TypeError("region id must be a string");
      }

      if (
        !(
          region.desiredReplicationCount || region.desiredReplicationCount === 0
        ) ||
        !Number.isInteger(region.desiredReplicationCount)
      ) {
        throw new TypeError("desiredReplicationCount must be an integer");
      }
    }
  }
}

export function createConfigForAxiosHeaders(config: PinataConfig) {
  if (
    config.pinataApiKey &&
    config.pinataApiKey.length > 0 &&
    config.pinataSecretApiKey &&
    config.pinataSecretApiKey.length > 0
  ) {
    return {
      withCredentials: true,
      headers: {
        pinata_api_key: config.pinataApiKey,
        pinata_secret_api_key: config.pinataSecretApiKey,
      },
    };
  }

  if (config.pinataJWTKey && config.pinataJWTKey.length > 0) {
    return {
      headers: {
        Authorization: `Bearer ${config.pinataJWTKey}`,
      },
    };
  }

  throw new Error(ERROR_NO_CREDENTIALS_PROVIDED);
}

export function createConfigForAxiosHeadersWithFormData(config: PinataConfig) {
  const requestOptions: FormDataPostHeaders = {
    ...createConfigForAxiosHeaders(config),
    maxContentLength: Number.POSITIVE_INFINITY, //this is needed to prevent axios from erroring out with large files
    maxBodyLength: Number.POSITIVE_INFINITY,
  };
  return requestOptions;
}

export function validatePinataOptions(options: {
  cidVersion?: number;
  wrapWithDirectory?: boolean;
  hostNodes?: any;
  customPinPolicy?: any;
}) {
  if (typeof options !== "object") {
    throw new TypeError("options must be an object");
  }

  if (
    options.cidVersion &&
    options.cidVersion != 0 &&
    options.cidVersion != 1
  ) {
    throw new Error("unsupported or invalid cidVersion");
  }
  if (
    options.wrapWithDirectory &&
    options.wrapWithDirectory !== true &&
    options.wrapWithDirectory !== false
  ) {
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

export class PinataFormDataProvider extends BaseFormDataProvider {
  constructor(private pinataConfig: PinataConfig) {
    super();
  }
  async getRequestOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _dataContent: FormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions> {
    const root = await super.getRequestOptions(_dataContent, meta);
    const { headers, ...rest } = createConfigForAxiosHeadersWithFormData(
      this.pinataConfig
    );
    return { ...root, ...rest, headers: { ...headers } };
  }
  async addMetadata(dataContent: FormData, meta?: FormDataPostHeaders) {
    if (meta?.pinataMetadata) {
      validateMetadata(meta);
      dataContent.append(
        "pinataMetadata",
        JSON.stringify(meta?.pinataMetadata)
      );
    }
  }
  getEndpoint(): string {
    return "https://api.pinata.cloud/pinning/pinFileToIPFS";
  }
  resolveUrl(result: any): string {
    return `ipfs://${result.IpfsHash}`;
  }
}
