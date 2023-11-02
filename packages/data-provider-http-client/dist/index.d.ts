import { Options } from 'ipfs-http-client';
import { BaseFormDataProvider, FormDataPostHeaders } from '@lukso/data-providers';

declare class HttpIPFSClientUploader extends BaseFormDataProvider {
    private ipfs;
    constructor(gateway: string | URL | Options);
    upload(data: any, meta?: FormDataPostHeaders): Promise<string>;
}

export { HttpIPFSClientUploader };
