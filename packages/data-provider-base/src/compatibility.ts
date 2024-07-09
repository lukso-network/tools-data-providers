const isNode = false;

export const compatibility = {
  getCrypto,
  getFormData,
  getFetch,
  getBlob,
  getFile,
  wrapStream,
}

function getCrypto(): typeof window.crypto {
  return window.crypto;
}

/**
 * Return the FormData implementation in a way that works in node and browser
 *
 * @returns FormData implementation
 */
function getFormData(): typeof FormData {
	// Use the appropriate FormData implementation depending on the environment
	return FormData;
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
	return Blob;
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
	return data;
}
