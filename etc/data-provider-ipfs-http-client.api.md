## API Report File for "@lukso/data-provider-ipfs-http-client"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { BaseFormDataUploader } from '@lukso/data-provider-base';
import { FormDataPostHeaders } from '@lukso/data-provider-base';
import { FormDataRequestOptions } from '@lukso/data-provider-base';

// @public
class IPFSHttpClientUploader extends BaseFormDataUploader {
    constructor(gateway: string, options?: FormDataRequestOptions | undefined);
    // (undocumented)
    getEndpoint(): string;
    // (undocumented)
    getRequestOptions(dataContent: FormData, meta?: FormDataPostHeaders): Promise<FormDataRequestOptions>;
    // (undocumented)
    resolveUrl(result: any): string;
}
export { IPFSHttpClientUploader }
export default IPFSHttpClientUploader;

// (No @packageDocumentation comment for this package)

```