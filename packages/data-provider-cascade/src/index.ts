import {
	BaseFormDataUploader,
	type FormDataPostHeaders,
	type FormDataRequestOptions,
} from "@lukso/data-provider-base";

export class CascadeUploader extends BaseFormDataUploader {
	constructor(private apiKey: string) {
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
		meta?: FormDataPostHeaders,
	): Promise<FormDataRequestOptions> {
		const root = await super.getRequestOptions(_dataContent, meta);
		return { 
			...root, 
			headers: {
				...root.headers,
				"Api-key": this.apiKey,
			}
		 };
	}

	/**
	 * Return standard cascade protocol endpoint supported for all JWT and API keys.
	 *
	 * @returns Return the endpoint to be used for cascade
	 */
	getEndpoint(): string {
		return "https://gateway-api.pastel.network/api/v1/cascade?make_publicly_accessible=true";
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

export default CascadeUploader;
