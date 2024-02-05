import {
  BaseFormDataUploader,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "./formdata-base-provider";

/**
 * This is a custom data provider that uses a pre-shared token to sign a short lived
 * jwt token and send it as a bearer token to the endpoint. On the server side
 * you can then verify the token using this kind of code:
 *
 * @example
 * ```
 * try {
 *   // Otherwise let's validate the token.
 *   const { exp } = verify(token, env.JWT_SECRET);
 *   // Tokens cannot be expired or have a duration that's more than
 *   // 600 seconds into the future.
 *   if (exp < Date.now() / 1000 || exp - Date.now() / 1000 > 600) {
 *     // If the token is expired then it's no good
 *     return new Response("Unauthorized", { status: 401, headers: cors });
 *   }
 * } catch (error) {
 *   console.error(error);
 *   return new Response("Unauthorized", { status: 401, headers: cors });
 * }
 * ```
 *
 * and then forward the request to a pinata or other endpoint for the final upload.
 * @public
 */
export class AuthenticatedFormDataUploader extends BaseFormDataUploader {
  /**
   *
   * @param dataContent - FormData content to be sent (ignored in this case)
   * @param meta - Optional additional meta data (ignored in this case)
   * @returns Attaches the headers with bearer token.
   * @public
   */
  async getRequestOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataContent: FormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    meta?: FormDataPostHeaders
  ): Promise<FormDataRequestOptions> {
    const { headers, ...rest } = await super.getRequestOptions(
      dataContent,
      meta
    );
    const jwt = await this.getToken();
    return {
      ...rest,
      headers: {
        ...headers,
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      },
      maxContentLength: Number.MAX_SAFE_INTEGER,
      maxBodyLength: Number.MAX_SAFE_INTEGER,
      withCredentials: true,
    };
  }
  /**
   *
   * @param result - JSON object returned from FormData post.
   * @returns URL referring to the uploaded data
   * @internal
   */
  resolveUrl(result: any): string {
    return `ipfs://${result.IpfsHash}`;
  }

  /**
   * Exposed function in case this classes it used with an older ipfs-http-client
   * implementation directly.
   * @returns A signed JWT token
   * @public
   */
  async getToken(): Promise<string> {
    if (!process.env.VUE_APP_SHARED_KEY) {
      return "";
    }
    const { sign } = await import("@tsndr/cloudflare-worker-jwt").catch(
      () => import("jsonwebtoken")
    );
    const now = Date.now();
    return await sign(
      { iss: "extension", iat: now / 1000, exp: (now + 120_000) / 1000 },
      process.env.VUE_APP_SHARED_KEY || ""
    );
  }
}
