const isNode = true;
import * as crypto from "node:crypto";
import { ReadStream } from "node:fs";
import { Blob, File, FormData } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";
import fetch from "node-fetch";
import { compatibility } from "./compatibility";

Object.assign(compatibility, {
  getCrypto,
  getFormData,
  getFetch,
  getBlob,
  getFile,
  wrapStream,
});

function getCrypto(): typeof crypto {
  return crypto;
}

/**
 * Return the FormData implementation in a way that works in node and browser
 *
 * @returns FormData implementation
 */
function getFormData(): typeof FormData {
	// Use the appropriate FormData implementation depending on the environment
	return FormData
}

/**
 * Return the fetch implementation in a way that works in node and browser
 *
 * @returns The fetch implementation
 */
function getFetch(): typeof fetch {
	// Use the browser's fetch if available, otherwise use node-fetch
	return fetch
}

/**
 * Return the blob implementation in a way that works in node and browser
 *
 * @returns The Blob implementation
 */
function getBlob(): typeof Blob {
	return Blob
}

/**
 * Return the file implementation in a way that works in node and browser
 *
 * @returns The Blob implementation
 */
function getFile(): typeof File {
	return File
}

/**
 * Wrap a stream so that a readstream can be detected in node without
 * loading the module in the browser.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
async function wrapStream(data: any): Promise<any> {
	if (isNode) {
		if (data instanceof ReadStream) {
			if (typeof data.path !== "string") {
				const output: any[] = [];
				let chunk: any;
				do {
					chunk = data.read(1024);
					if (chunk === null) {
						break;
					}
					output.push(chunk);
				} while (chunk);
				const Blob = getBlob();
				return new Blob(output);
			}
			// @ts-expect-error - check for browser
			if (typeof Bun !== "undefined") {
				// @ts-expect-error - check for browser
				const file = Bun.file(data.path);
				const File = await getFile();
				return new File([await file.arrayBuffer()], "file", {
					type: "application/octet-stream",
				});
			}
			
			return await fileFromPath(data.path);
		}
	}
	return data;
}
