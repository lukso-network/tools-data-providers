import {
  BaseFormDataUploader,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "@lukso/data-provider-base";

/**
 * Data provider for uploading using the ipfs-http-client
 * directly. This is backward compatible with the previous ipfs implementation,
 * but ipfs-http-client has been deprecated in favor of Helia see https://github.com/ipfs/js-ipfs/issues/4336
 * @public
 */
export class IPFSHttpClientUploader extends BaseFormDataUploader {
  /**
   * Construct a provider using the ipfs-http-client
   * @param gateway - accepts a string, URL or options compatible for the create method
   * @public
   */
  constructor(
    private gateway: string,
    private options?: FormDataRequestOptions
  ) {
    super();
  }

  getEndpoint(): string {
    return this.gateway;
  }

  resolveUrl(result: any): string {
    return `ipfs://${result.Hash}`;
  }

  async getRequestOptions(
    dataContent: FormData,
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions> {
    const root = await super.getRequestOptions(dataContent, meta);
    return {
      ...this.options,
      headers: { ...meta?.headers, ...this.options?.headers },
      ...root,
    };
  }
}

export default IPFSHttpClientUploader;
