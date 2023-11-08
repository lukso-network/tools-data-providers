import { PinataConfig } from "@pinata/sdk";

import {
  BaseFormDataProvider,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "@lukso/data-providers";

export const ERROR_NO_CREDENTIALS_PROVIDED =
  "No credentials provided! Please provide your pinata api key and pinata secret api key or your pinata JWT key as an argument when you start this script";

/** Utility functions from pinata */
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

/**
 * Return headers for fetch or axios.
 * @param config - return header according to pinate config
 * @returns headers for fetch or axios.
 * @internal
 */
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

/**
 * Return RequestInit for fetch or axios.
 * @param config - return header according to pinate config
 * @returns RequestInit
 * @internal
 */
export function createConfigForAxiosHeadersWithFormData(config: PinataConfig) {
  const requestOptions: FormDataPostHeaders = {
    ...createConfigForAxiosHeaders(config),
    maxContentLength: Number.POSITIVE_INFINITY, //this is needed to prevent axios from erroring out with large files
    maxBodyLength: Number.POSITIVE_INFINITY,
  };
  return requestOptions;
}

/**
 * Custom data provider that directly uploads to pinata
 * It requires the pinata api key, secret key and JWT key to be set
 * According to their documentation only api and secret should work
 * or JWT token. However, in our tests only all three worked.
 */
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
