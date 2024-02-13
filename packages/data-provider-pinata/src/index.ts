// bump 1
import { PinataConfig } from "@pinata/sdk";

import {
  BaseFormDataUploader,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "@lukso/data-provider-base";

export const ERROR_NO_CREDENTIALS_PROVIDED =
  "No credentials provided! Please provide your pinata api key and pinata secret api key or your pinata JWT key as an argument when you start this script";

/**
 * Utility functions from pinata
 */
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
  return {
    ...createConfigForAxiosHeaders(config),
    maxContentLength: Number.MAX_SAFE_INTEGER, //this is needed to prevent axios from erroring out with large files
    maxBodyLength: Number.MAX_SAFE_INTEGER,
  };
}

/**
 * Custom data provider that directly uploads to pinata
 * It requires the pinata api key, secret key and JWT key to be set
 * According to their documentation only api and secret should work
 * or JWT token. However, in our tests only all three worked.
 */
export class PinataUploader extends BaseFormDataUploader {
  constructor(private pinataConfig: PinataConfig) {
    super();
  }

  /**
   * Extract fetch request options.
   *
   * @param _dataContent - FormData content to be sent
   * @param meta - Metadata from File or Blob object
   * @returns fetch request options
   */
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

  /**
   * Add additional pinata specific form item if piniataMetadata is provider.
   * Most of the time this is not necessary and not supported by other uploaders.
   *
   * @param dataContent - FormData content to be send
   * @param meta - Metadata from File or Blob object
   */
  async addMetadata(dataContent: FormData, meta?: FormDataPostHeaders) {
    if (meta?.pinataMetadata) {
      validateMetadata(meta);
      dataContent.append(
        "pinataMetadata",
        JSON.stringify(meta?.pinataMetadata)
      );
    }
  }

  /**
   * Return standard pinata pinning endpoint supported for all JWT and API keys.
   *
   * @returns Return the endpoint to be used for pinata
   */
  getEndpoint(): string {
    return "https://api.pinata.cloud/pinning/pinFileToIPFS";
  }

  /**
   * Decode IPFS URL from POST results.
   *
   * @param result - JSON result from upload
   * @returns ipfs URL
   */
  resolveUrl(result: any): string {
    return `ipfs://${result.IpfsHash}`;
  }
}

export default PinataUploader;
