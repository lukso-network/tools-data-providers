import { sign } from "@tsndr/cloudflare-worker-jwt";

import { FormDataPostHeaders } from "./formdata-base-provider";
import { CustomHeaderFormDataProvider } from "./ipfs-formdata-provider";

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
export class AuthenticatedFormDataProvider extends CustomHeaderFormDataProvider {
  /**
   *
   * @param dataContent - FormData content to be sent (ignored in this case)
   * @param meta - Optional additional meta data (ignored in this case)
   * @returns The headers to attach to the FormData POST (in this case containing bearer token)
   * @public
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHeaders(dataContent: FormData, meta?: FormDataPostHeaders) {
    const jwt = await this.getToken();
    return { Authorization: `Bearer ${jwt}` };
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
    const now = Date.now();
    return await sign(
      { iss: "extension", iat: now / 1000, exp: (now + 120_000) / 1000 },
      process.env.VUE_APP_SHARED_KEY || ""
    );
  }
}
