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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getHeaders(dataContent: FormData, meta?: FormDataPostHeaders) {
    const jwt = await this.getToken();
    return { Authorization: `Bearer ${jwt}` };
  }
  resolveUrl(result: any): string {
    return `ipfs://${result.IpfsHash}`;
  }
  async getToken(): Promise<string> {
    const now = Date.now();
    return await sign(
      { iss: "extension", iat: now / 1000, exp: (now + 120_000) / 1000 },
      process.env.VUE_APP_SHARED_KEY || ""
    );
  }
}
