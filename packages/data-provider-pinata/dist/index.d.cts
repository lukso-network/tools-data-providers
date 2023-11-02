import { PinataConfig } from '@pinata/sdk';
import { FormDataPostHeaders, BaseFormDataProvider, FormDataRequestOptions } from '@lukso/data-providers';

declare const ERROR_NO_CREDENTIALS_PROVIDED = "No credentials provided! Please provide your pinata api key and pinata secret api key or your pinata JWT key as an argument when you start this script";
declare function validateHostNodes(hostNodes: any): void;
declare function validateMetadata(metadata: any): void;
declare function validatePinPolicyStructure(pinPolicy: {
    regions: any[];
}): void;
declare function createConfigForAxiosHeaders(config: PinataConfig): {
    withCredentials: boolean;
    headers: {
        pinata_api_key: string;
        pinata_secret_api_key: string;
        Authorization?: undefined;
    };
} | {
    headers: {
        Authorization: string;
        pinata_api_key?: undefined;
        pinata_secret_api_key?: undefined;
    };
    withCredentials?: undefined;
};
declare function createConfigForAxiosHeadersWithFormData(config: PinataConfig): FormDataPostHeaders;
declare function validatePinataOptions(options: {
    cidVersion?: number;
    wrapWithDirectory?: boolean;
    hostNodes?: any;
    customPinPolicy?: any;
}): void;
declare class PinataFormDataProvider extends BaseFormDataProvider {
    private pinataConfig;
    constructor(pinataConfig: PinataConfig);
    getRequestOptions(_dataContent: FormData, meta?: FormDataPostHeaders): Promise<FormDataRequestOptions>;
    addMetadata(dataContent: FormData, meta?: FormDataPostHeaders): Promise<void>;
    getEndpoint(): string;
    resolveUrl(result: any): string;
}

export { ERROR_NO_CREDENTIALS_PROVIDED, PinataFormDataProvider, createConfigForAxiosHeaders, createConfigForAxiosHeadersWithFormData, validateHostNodes, validateMetadata, validatePinPolicyStructure, validatePinataOptions };
