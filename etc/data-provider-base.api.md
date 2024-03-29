## API Report File for "@lukso/data-provider-base"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
// @public
export interface AssetBuffer {
  buffer: Buffer;
  mimeType: string;
}

// @public
export class AuthenticatedFormDataUploader extends BaseFormDataUploader {
  // (undocumented)
  getRequestOptions(
    dataContent: FormData,
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions>;
  getToken(): Promise<string>;
  // @internal (undocumented)
  resolveUrl(result: any): string;
}

// @public
export class BaseFormDataUploader {
  // (undocumented)
  addMetadata(dataContent: FormData, meta?: FormDataPostHeaders): Promise<void>;
  getEndpoint(): string;
  getPostEndpoint(): string;
  getRequestOptions(
    dataContent: FormData,
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions>;
  getToken(): Promise<string>;
  resolveUrl(result: any): string;
  // @internal
  upload(data: any, meta?: FormDataPostHeaders): Promise<string>;
  // @internal
  uploadFormData(
    requestOptions: FormDataRequestOptions,
    dataContent: FormData
  ): Promise<any>;
  // (undocumented)
  protected wrapStream(data: any): Promise<any>;
}

// @public
export type FormDataPostHeaders = Record<string, string | number | any>;

// @public
export type FormDataRequestOptions = {
  maxContentLength?: number;
  maxBodyLength?: number;
  withCredentials?: boolean;
  headers?: FormDataPostHeaders;
  [key: string]: any;
};

// Warning: (ae-internal-missing-underscore) The name "handleError" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const handleError: (error: any) => any;

// (No @packageDocumentation comment for this package)
```
