const isNode = true;
import * as crypto from "node:crypto";
import { ReadStream } from "node:fs";
import { Blob, File, FormData } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";
import fetch from "node-fetch";
import { compatibility } from "./compatibility";

Object.assign(compatibility, {
  crypto,
  FormData,
  fetch,
  Blob,
  File,
  wrapStream,
  encodeBase64,
  stringToArrayBuffer,
});

function stringToArrayBuffer(str: string): ArrayBuffer {
  const data = Buffer.from(str);
  return data.buffer;
}

function encodeBase64(data: string | Uint8Array): string {
  return Buffer.from(data).toString("base64");
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
				return new compatibility.Blob(output);
			}
			// @ts-expect-error - check for browser
			if (typeof Bun !== "undefined") {
				// @ts-expect-error - check for browser
				const file = Bun.file(data.path);
				return new compatibility.File([await file.arrayBuffer()], "file", {
					type: "application/octet-stream",
				});
			}
			
			return await fileFromPath(data.path);
		}
	}
	return data;
}
