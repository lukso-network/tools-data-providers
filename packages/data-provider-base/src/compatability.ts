// @ts-expect-error - check for browser
const isNode = typeof window === "undefined";

/**
 * Return the FormData implementation in a way that works in node and browser
 *
 * @returns FormData implementation
 */
export async function getFormData(): Promise<typeof FormData> {
  // Use the appropriate FormData implementation depending on the environment
  return typeof FormData !== "undefined" || "browser" in process
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
  return typeof fetch !== "undefined" || "browser" in process
    ? fetch
    : ((await import("node-fetch")) as unknown as typeof fetch);
}

/**
 * Return the blob implementation in a way that works in node and browser
 *
 * @returns The Blob implementation
 */
export async function getBlob(): Promise<typeof Blob> {
  return typeof Blob !== "undefined" || "browser" in process
    ? Blob
    : ((await import("formdata-node").then(({ Blob }) => Blob)) as typeof Blob);
}

/**
 * Wrap a stream so that a readstream can be detected in node without
 * loading the module in the browser.
 */
export async function wrapStream(data: any): Promise<any> {
  if (isNode) {
    const { ReadStream } = await import("node:fs");
    if (data instanceof ReadStream) {
      const Blob = await getBlob();
      let options: any = undefined;
      if (data instanceof ReadStream && data.path) {
        const { basename } = await import("node:path");
        options = { name: basename(data.path.toString()) };
      }
      const blob = new Blob([], {
        ...options,
        type: "application/octet-stream",
      });
      blob.stream = () => data as any;
      data = blob;
    }
  }
  return data;
}
