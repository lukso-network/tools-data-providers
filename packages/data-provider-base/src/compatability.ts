// @ts-expect-error - check for browser
const isNode = typeof window === "undefined";

/**
 * Return the FormData implementation in a way that works in node and browser
 *
 * @returns FormData implementation
 */
export async function getFormData(): Promise<typeof FormData> {
  // Use the appropriate FormData implementation depending on the environment
  return typeof FormData !== "undefined"
    ? FormData
    : ((await import("formdata-node").then(
        ({ FormData }) => FormData
      )) as typeof FormData);
}

/**
 * Return the fetch implementation in a way that works in node and browser
 *
 * @returns The fetch implementation
 */
export async function getFetch(): Promise<typeof fetch> {
  // Use the browser's fetch if available, otherwise use node-fetch
  return typeof fetch !== "undefined"
    ? fetch
    : ((await import("node-fetch").then(
        ({ default: fetch }) => fetch
      )) as unknown as typeof fetch);
}

/**
 * Return the blob implementation in a way that works in node and browser
 *
 * @returns The Blob implementation
 */
export async function getBlob(): Promise<typeof Blob> {
  return typeof Blob !== "undefined"
    ? Blob
    : ((await import("formdata-node").then(({ Blob }) => Blob)) as typeof Blob);
}

/**
 * Return the file implementation in a way that works in node and browser
 *
 * @returns The Blob implementation
 */
export async function getFile(): Promise<typeof File> {
  return typeof File !== "undefined"
    ? File
    : ((await import("formdata-node").then(({ File }) => File)) as typeof File);
}

/**
 * Wrap a stream so that a readstream can be detected in node without
 * loading the module in the browser.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export async function wrapStream(data: any): Promise<any> {
  if (isNode) {
    const { ReadStream } = await import("node:fs");
    if (data instanceof ReadStream) {
      if (typeof data.path !== "string") {
        const output = [];
        let chunk;
        while ((chunk = data.read(1024)) != null) {
          if (chunk === null) {
            break;
          }
          output.push(chunk);
        }
        const Blob = await getBlob();
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
      const { fileFromPath } = await import("formdata-node/file-from-path");
      return await fileFromPath(data.path);
    }
  }
  return data;
}
