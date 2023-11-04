import FormData$1 from 'cross-formdata';

interface AssetBuffer {
    buffer: Buffer;
    mimeType: string;
}
type FormDataPostHeaders = Record<string, string | number | any>;
type FormDataRequestOptions = {
    maxContentLength?: number;
    maxBodyLength?: number;
    withCredentials?: boolean;
    headers?: FormDataPostHeaders;
};
declare const handleError: (error: any) => any;
declare class BaseFormDataProvider {
    private populate;
    upload(data: any, meta?: FormDataPostHeaders): Promise<string>;
    addMetadata(dataContent: FormData$1, meta?: FormDataPostHeaders): Promise<void>;
    getRequestOptions(dataContent: FormData$1, meta?: FormDataPostHeaders): Promise<FormDataRequestOptions>;
    getPostEndpoint(): string;
    resolveUrl(result: any): string;
    uploadFormData(requestOptions: FormDataRequestOptions, dataContent: FormData$1): Promise<any>;
    getToken(): Promise<string>;
    getEndpoint(): string;
}

declare class CustomHeaderFormDataProvider extends BaseFormDataProvider {
    private endpoint;
    private headers;
    constructor(endpoint: string, headers: FormDataPostHeaders);
    getRequestOptions(_dataContent: FormData, meta?: FormDataPostHeaders): Promise<FormDataRequestOptions>;
    getEndpoint(): string;
    getToken(): Promise<string>;
    getHeaders(dataContent: FormData, meta?: FormDataPostHeaders): Promise<FormDataPostHeaders>;
}

declare class AuthenticatedFormDataProvider extends CustomHeaderFormDataProvider {
    getHeaders(dataContent: FormData, meta?: FormDataPostHeaders): Promise<{
        Authorization: string;
    }>;
    resolveUrl(result: any): string;
    getToken(): Promise<string>;
}

declare class UrlConverter {
    private destination;
    /**
     * It will relatively append pathname or hostname to the desination URL
     *
     * For example:
     * destination=https://some.api.gateway/something/ipfs
     * url=ipfs://QmSomeHash
     * output=https://some.api.gateway/something/ipfs/QmSomeHash
     *
     * destination=https://some.api.gateway/something/ipfs
     * url=https://something.com/somewhere
     * output=https://some.api.gateway/something/ipfs/somewhere
     *
     * @param destination destination string | URL
     */
    constructor(destination: string | URL);
    resolveUrl(url: string): string;
}
declare class UrlResolver {
    private converters;
    constructor(converters: Array<[string | RegExp, UrlConverter | string]>);
    /**
     * Resolves a URL to a gateway URL.
     * Supports possible multiple converters transforming the URL
     * in sequence until no converter matches.
     *
     * @param <URL> url to resolve
     * @returns <URL> resolved url (if resolver is found, otherwise the parameter url is returned)
     */
    resolveUrl(url: string): string;
}

export { type AssetBuffer, AuthenticatedFormDataProvider, BaseFormDataProvider, CustomHeaderFormDataProvider, type FormDataPostHeaders, type FormDataRequestOptions, UrlConverter, UrlResolver, handleError };
