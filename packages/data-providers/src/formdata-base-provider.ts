import { PinataPinResponse } from "@pinata/sdk";
import FormData from "cross-formdata";
import fetch from "isomorphic-fetch";

const NOT_IMPLEMENTED = "Not implemented";

/**
 * Manual asset buffer we can support for upload
 * @public
 */
export interface AssetBuffer {
  /** buffer Buffer - buffer to the data */
  buffer: Buffer;
  /** mimeType string - set mimetype for the buffer */
  mimeType: string;
}

/**
 * Type for POST headers
 * @public
 */
export type FormDataPostHeaders = Record<string, string | number | any>;
/**
 * Request options for fetch (RequestInit)
 * @public
 */
export type FormDataRequestOptions = {
  maxContentLength?: number;
  maxBodyLength?: number;
  withCredentials?: boolean;
  headers?: FormDataPostHeaders;
};

/**
 * Utility function to return error details.
 *
 * @param error - extract more error information for this exception
 * @returns error details
 * @internal
 */
export const handleError = (error: any) => {
  if (
    error &&
    error.response &&
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    return error.response.data.error;
  } else if (error.data && error.data.error) {
    return error.data.error;
  } else if (error.response && error.response.error) {
    return error.response.error;
  }
  return error;
};

/**
 * Base data provider to upload data using a FormData POST. This is a generic
 * class used by all the custom implementations.
 * @public
 */
export class BaseFormDataProvider {
  /**
   *
   * @param dataContent - FormData content to be sent
   * @param data - Data to be sent (this will be added to
   *  FormData and can be a Blob, ReadableStream, Buffer, AssetBuffer and so on)
   * @param meta - Metadata to be added (could contain name, size, type and so on)
   * @returns Option header information to be added to the request.
   * @internal
   */
  // Already refactored several times, but still too complex since it needs
  // to handle both node and browser types.
  // eslint-disable-next-line sonarjs/cognitive-complexity
  private populate(
    dataContent: FormData,
    data: any,
    meta?: FormDataPostHeaders
  ): FormDataPostHeaders | undefined {
    if (!("on" in data) && typeof data !== "string") {
      if ("size" in data && "type" in data) {
        const blob = data;
        meta = {
          "content-type": blob.type,
          ...(blob.name ? { name: blob.name } : {}),
        };
        dataContent.append("file", blob);
      } else if ("buffer" in data && "mimeType" in data) {
        const assetBuffer = data as AssetBuffer;
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

  /**
   * External upload function to call to send data to the endpoint.
   *
   * @param data - data to upload
   * @param meta - optional metadata to send with the upload
   * @internal
   */
  async upload(data: any, meta?: FormDataPostHeaders): Promise<string> {
    const dataContent = new FormData();
    meta = this.populate(dataContent, data, meta);
    await this.addMetadata(dataContent as FormData, meta);
    const options = await this.getRequestOptions(dataContent as FormData, meta);
    // This needs to be in a different files for testing with jest to work
    // property. Internal access to internal methods in a file cannot be patched.
    return this.resolveUrl(
      await this.uploadFormData(options, dataContent as FormData)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addMetadata(dataContent: FormData, meta?: FormDataPostHeaders) {}

  /**
   * Construct options for the underlying fetch call.
   *
   * @param dataContent - content to upload
   * @param meta - optional meta data
   * @returns return request options for fetch.
   * @public
   */
  async getRequestOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataContent: FormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions> {
    return {
      maxContentLength: Number.MAX_SAFE_INTEGER,
      maxBodyLength: Number.MAX_SAFE_INTEGER,
      withCredentials: true,
    };
  }

  /**
   * Return the fetch endpoint this is going to.
   * Must be overridden by a more specific implementation.
   * @public
   */
  getPostEndpoint(): string {
    throw new Error(NOT_IMPLEMENTED);
  }

  /**
   * Convert the upload JSON result to a URL.
   * In most of the current cases it will read Hash or IpfsHash and
   * return `ipfs://${hash}`.
   *
   * @param result - JSON result from the upload
   * @returns URL to the uploaded content
   * @public
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveUrl(result: any): string {
    throw new Error(NOT_IMPLEMENTED);
  }

  /**
   * Low level implementation of fetch call to send the form data
   *
   * @param requestOptions - request options to send to fetch
   * @param dataContent - the FormData to be posted
   * @returns JSON response from the gateway.
   * @internal
   */
  uploadFormData(
    requestOptions: FormDataRequestOptions,
    dataContent: FormData
  ): Promise<any> {
    const input = {
      method: "POST",
      ...requestOptions,
    } as RequestInit;
    input.headers = { ...input.headers /* ...headers */ };
    return (globalThis.fetch || fetch)(this.getEndpoint(), {
      ...input,
      body: dataContent as any,
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.text().then((text) => {
            let error = text;
            try {
              error = JSON.parse(text);
            } catch {
              // Ignore
            }
            error = (error as any).error || error;
            throw new Error(
              `unknown server response while pinning File to IPFS: ${
                error || response.status
              }`
            );
          });
        }
        return response.json() as Promise<PinataPinResponse>;
      })
      .catch(function (error) {
        throw handleError(error);
      });
  }

  /**
   * Return a token if this provider requires authentication.
   *
   * @returns token or throws an NOT_IMPLEMENTED error
   */
  async getToken(): Promise<string> {
    throw new Error(NOT_IMPLEMENTED);
  }

  /**
   * Return the endpoint to allow this be used with an old
   * ipfs-http-client implementation. If the proxy is running
   * at /api/v0/add for pinning then you can use the ipfs-http-client
   * pointed to /api/v0 and it will add /add to the end before sending
   * the FormData to the server. This allows you to create a proxy that
   * can be used with the ipfs-http-client.
   * @public
   */
  getEndpoint(): string {
    throw new Error(NOT_IMPLEMENTED);
  }
}
