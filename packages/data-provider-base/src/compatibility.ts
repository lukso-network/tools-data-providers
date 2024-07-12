const isNode = false;

export const compatibility = {
  crypto,
  FormData,
  fetch: typeof fetch === "undefined" ? async () => {
    throw new Error("Fetch not supported");
  } : fetch,
  Blob,
  File,
  wrapStream,
  encodeBase64,
  stringToArrayBuffer,
}

function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new window.TextEncoder();
  const arrayBuffer = encoder.encode(str);
  return arrayBuffer.buffer;
}

function encodeBase64(data: string): string {
  return btoa(data);
}

/**
 * Wrap a stream so that a readstream can be detected in node without
 * loading the module in the browser.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
async function wrapStream(data: any): Promise<any> {
	return data;
}
