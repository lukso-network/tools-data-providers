import {
	BaseFormDataUploader,
	getFetch,
	getFormData,
	type FormDataPostHeaders,
	type FormDataRequestOptions,
} from "@lukso/data-provider-base";
import fs from 'fs';
import path from 'path';

export interface CascadeUploadedResult {
  request_id: string;
  request_status: string;
  results: [
    {
      result_status: string;
      file_name: string;
      file_type: string;
      file_id: string;
      created_at: Date;
      last_updated_at: Date;
      retry_num: number;
      registration_ticket_txid: string;
      activation_ticket_txid: string;
      original_file_ipfs_link: string;
      stored_file_ipfs_link: string;
      stored_file_aws_link: string;
      stored_file_other_links: object;
      make_publicly_accessible: boolean;
      offer_ticket_txid: string;
      offer_ticket_intended_rcpt_pastel_id: string;
      error: string;
      result_id: string;
    }
  ]
}

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
				"api_key": this.apiKey,
			}
		 };
	}

	getGatewayUrl(): string {
		return "https://gateway-api.pastel.network/api/v1/";
	}

	/**
	 * Return standard cascade protocol endpoint supported for all JWT and API keys.
	 *
	 * @returns Return the endpoint to be used for cascade
	 */
	getEndpoint(): string {
		return `${this.getGatewayUrl()}cascade?make_publicly_accessible=true`;
	}

	/**
	 * Uploads file to Cascade Protocol and return result id and ipfs link.
	 *
	 * @param data - data to upload
	 * @param meta - optional metadata to send with the upload
	 * @returns result id and ipfs URL of uploaded file
	 * @internal
	 */
	async uploadToCascade(
		data: any,
		_meta?: FormDataPostHeaders,
	): Promise<any> {
		let meta = _meta;
		const FormData = await getFormData();
		const dataContent = new FormData();
		dataContent.append("files", await this.wrapStream(data));
		const options = await this.getRequestOptions(dataContent as FormData, meta);
		const result: CascadeUploadedResult = await this.uploadFormData(options, dataContent as FormData);
		if (result.results.length > 0) {
			return {
				result_id: result.results[0].result_id,
				ipfs_url: result.results[0].original_file_ipfs_link
			};
		}
		return null;
	}

	/**
	 * Uploads images of folder to Cascade Protocol and return result ids and ipfs links.
	 *
	 * @param folder - folder to upload
	 * @param meta - optional metadata to send with the upload
	 * @returns array of file name, result id and ipfs URL of uploaded images of folder
	 * @internal
	 */
	async uploadFolderToCascade(
		folder: string,
		_meta?: FormDataPostHeaders,
	): Promise<any> {
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
		const files = fs.readdirSync(folder);
		const imageFiles = files.filter(file => 
			imageExtensions.includes(path.extname(file).toLowerCase())
		);
		
		const results = [];
		for (const imageFile of imageFiles) {
			const result = await this.uploadToCascade(fs.createReadStream(path.join(folder, imageFile)), _meta)
			results.push({
				file_name: imageFile,
				...(result ?? {})
			});
		}
		return results;
	}

	/**
	 * Check status of cascade activation transaction at Pastel Network
	 *
	 * @param result_id - result id of target file
	 * @returns transaction status and activiation ticket id
	 * @internal
	 */
	async retrieveTxId(result_id: string): Promise<any> {
		const fetch = await getFetch();
		try {
			const result: any = await (await fetch(`${this.getGatewayUrl()}cascade/gateway_results/${result_id}`, {
				headers: {
					'api_key': this.apiKey,
				}
			})).json();
			return {
				status: result.result_status,
				tx_id: result.activation_ticket_txid
			};
		}
		catch (e) {
			return null;
		}
	}
}

export default CascadeUploader;
