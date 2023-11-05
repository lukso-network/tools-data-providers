import {
  BaseFormDataProvider,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "./formdata-base-provider";

/**
 * This is a custom data provider that allows you to pass custom headers
 * as part of the form POST request to the endpoint.
 * One example of this is used when you secure a pinata or infura endpoint
 * with your own private proxy accepting a bearer token for example.
 * @public
 */
export class CustomHeaderFormDataProvider extends BaseFormDataProvider {
  constructor(private endpoint: string, private headers: FormDataPostHeaders) {
    super();
  }

  async getRequestOptions(
    _dataContent: FormData,
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions> {
    const rest = await super.getRequestOptions(_dataContent, meta);
    const headers = await this.getHeaders(_dataContent, meta);
    return { ...rest, headers: { ...headers } };
  }

  getEndpoint(): string {
    return this.endpoint;
  }

  async getToken(): Promise<string> {
    return this.headers.Authorization.replace("Bearer ", "");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHeaders(dataContent: FormData, meta?: FormDataPostHeaders) {
    return this.headers;
  }
}
