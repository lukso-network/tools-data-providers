import { keccak256 } from "@ethersproject/keccak256";
import { compatibility } from "./compatibility";

const NOT_IMPLEMENTED = "Not implemented";

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
	[key: string]: any;
};

/**
 * Utility function to return error details.
 *
 * @param error - extract more error information for this exception
 * @returns error details
 * @internal
 */
export const handleError = (error: any) => {
	if (error?.response?.data?.error) {
		return error.response.data.error;
	}
	if (error?.data?.error) {
		return error.data.error;
	}
	if (error?.response?.error) {
		return error.response.error;
	}
	return error;
};

/**
 * Base data provider to upload data using a FormData POST. This is a generic
 * class used by all the custom implementations.
 * @public
 */
export class BaseFormDataUploader {
	/**
	 *
	 * @param dataContent - FormData content to be sent
	 * @param data - Data to be sent (this will be added to
	 *  FormData and can be a Blob, ReadableStream, Buffer and so on)
	 * @param meta - Metadata to be added (could contain name, size, type and so on)
	 * @returns Header information to be added to the request.
	 * @internal
	 */
	// Already refactored several times, but still too complex since it needs
	// to handle both node and browser types.
	// eslint-disable-next-line sonarjs/cognitive-complexity
	private async populate(
		dataContent: FormData,
		_data: any,
		_meta?: FormDataPostHeaders,
	): Promise<{ meta: FormDataPostHeaders | undefined; hash: string }> {
		const data = await this.wrapStream(_data);
		let buffer: ArrayBuffer;
		if (data.arrayBuffer) {
			buffer = await data.arrayBuffer();
		} else {
			const arrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				console.log("starting");
				reader.onload = (ev: ProgressEvent<FileReader>) => {
					console.log(ev, ev.type);
					if (ev.type === "load") {
						resolve(reader.result as ArrayBuffer);
					}
				};
				reader.onerror = (error) => {
					console.log(error);
					reject(error);
				};
				console.log("kicking");
				reader.readAsArrayBuffer(data);
			});
			buffer = arrayBuffer;
		}
		const hash = keccak256(new Uint8Array(buffer));
		let meta = _meta;
		dataContent.append("file", data);
		if ("name" in data) {
			meta = { ...meta, name: data.name };
		}
		if ("type" in data) {
			meta = { ...meta, type: data.type };
		}
		return { meta, hash };
	}

	/**
	 * Wrap ReadStream in a Blob for node if required.
	 * @param data - data to wrap
	 * @returns
	 */
	protected async wrapStream(data: any): Promise<any> {
		return compatibility.wrapStream(data);
	}

	/**
	 * External upload function to call to send data to the endpoint.
	 *
	 * @param data - data to upload
	 * @param meta - optional metadata to send with the upload
	 * @internal
	 */
	async upload(
		data: any,
		_meta?: FormDataPostHeaders,
	): Promise<{ url: string; hash: string }> {
		let meta = _meta;
		const dataContent = new compatibility.FormData();
		const { meta: __meta, hash } = await this.populate(dataContent, data, meta);
		meta = __meta;
		await this.addMetadata(dataContent as FormData, meta);
		const options = await this.getRequestOptions(dataContent as FormData, meta);
		// This needs to be in a different files for testing with jest to work
		// property. Internal access to internal methods in a file cannot be patched.
		return {
			url: this.resolveUrl(
				await this.uploadFormData(options, dataContent as FormData),
			),
			hash,
		};
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
		meta?: FormDataPostHeaders,
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
	async uploadFormData(
		requestOptions: FormDataRequestOptions,
		dataContent: FormData,
	): Promise<any> {
		const input = {
			method: "POST",
			...requestOptions,
		} as RequestInit;
		const url = this.getEndpoint();
		input.headers = {
			...((dataContent as any).getHeaders
				? (dataContent as any).getHeaders()
				: {}),
			...input.headers,
		};
		return await compatibility.fetch(url, {
			...input,
			body: dataContent as any,
		})
			.then(async (response) => {
				const output = await response.text();
				const [info] = output.split("\n");
				if (response.status !== 200) {
					let error = info;
					try {
						error = JSON.parse(info);
					} catch {
						// Ignore
					}
					error = (error as any).error || error;
					throw new Error(
						`unknown server response while pinning File to IPFS: ${
							error || response.status
						}`,
					);
				}
				return JSON.parse(info) as Promise<any>;
			})
			.catch((error) => {
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
