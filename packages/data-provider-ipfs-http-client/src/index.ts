// bump 1
import {
  BaseFormDataUploader,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "@lukso/data-provider-base";

/**
 * Data provider for uploading compatible with the ipfs-http-client
 * directly. This is backward compatible with the most ipfs pinning APIs,
 * but ipfs-http-client has been deprecated in favor of Helia see https://github.com/ipfs/js-ipfs/issues/4336
 * @public
 */
export class IPFSHttpClientUploader extends BaseFormDataUploader {
  /**
   * Construct a provider using the ipfs-http-client
   * @param gateway - accepts a string, URL or options compatible for the create method
   * @param options - additional options for the fetch call
   * @public
   */
  constructor(
    private gateway: string,
    private options?: FormDataRequestOptions
  ) {
    super();
  }

  /**
   * Get configured endpoint
   *
   * @returns Inject the endpoint this uploader is configued to use.
   */
  getEndpoint(): string {
    return this.gateway;
  }

  /**
   * Resolve the URL during uploading
   *
   * @param result - extract the ipfs URL from the POST result
   * @returns
   */
  resolveUrl(result: any): string {
    return `ipfs://${result.Hash}`;
  }

  /**
   * Add additional arguments needed as part of the POST fetch request.
   *
   * @param dataContent
   * @param meta
   * @returns The request options for the fetch call
   */
  async getRequestOptions(
    dataContent: FormData,
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions> {
    const root = await super.getRequestOptions(dataContent, meta);
    return {
      ...this.options,
      headers: { ...root?.headers, ...this.options?.headers },
      ...root,
    };
  }
}

export default IPFSHttpClientUploader;
