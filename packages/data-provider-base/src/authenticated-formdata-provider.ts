import {
  BaseFormDataUploader,
  FormDataPostHeaders,
  FormDataRequestOptions,
} from "./formdata-base-provider";

/** local implementation of HS256 sign */
async function sign(data: any, key: string) {
  return crypto.subtle
    .importKey(
      "jwk", //can be "jwk" or "raw"
      {
        //this is an example jwk key, "raw" would be an ArrayBuffer
        kty: "oct",
        k: key,
        alg: "HS256",
        ext: true,
      },
      {
        //this is the algorithm options
        name: "HMAC",
        hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        //length: 256, //optional, if you want your key length to differ from the hash function's block length
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["sign", "verify"] //can be any combination of "sign" and "verify"
    )
    .then((key) => {
      const jsonString = JSON.stringify(data);
      const encodedData = new TextEncoder().encode(jsonString);
      return crypto.subtle.sign(
        {
          name: "HMAC",
        },
        key, //from generateKey or importKey above
        encodedData //ArrayBuffer of data you want to sign
      );
    })
    .then((token) => {
      const u8 = new Uint8Array(token);
      return btoa(
        String.fromCharCode.apply(undefined, u8 as unknown as number[])
      );
    });
}

/** local implementation of createToken to create a signd JWT token */
async function createToken(payload: any, key: string): Promise<string> {
  const header = { typ: "JWT", alg: "HS256" };

  const segments = [
    encodeURIComponent(btoa(JSON.stringify(header))),
    encodeURIComponent(btoa(JSON.stringify(payload))),
  ];

  const footer = await sign(segments.join("."), key);

  segments.push(footer);

  return segments.join(".");
}

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
   * Create a new instance of the authenticated form data uploader.
   *
   * @param gateway - The gateway to be used for the upload
   * @param sharedKey - The shared key to be used for the JWT token
   */
  constructor(private gateway: string, private sharedKey: string) {
    super();
  }

  /**
   * Return the request options used for the fetch call.
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
   * Extract the IPFS URL from the upload result.
   *
   * @param result - JSON object returned from FormData post.
   * @returns URL referring to the uploaded data
   * @internal
   */
  resolveUrl(result: any): string {
    return `ipfs://${result.IpfsHash}`;
  }

  /**
   * Return the endpoint to be used for the upload.
   */
  getEndpoint(): string {
    return this.gateway;
  }

  /**
   * Exposed function in case this classes it used with an older ipfs-http-client
   * implementation directly.
   * @returns A signed JWT token
   * @public
   */
  async getToken(): Promise<string> {
    if (!this.sharedKey) {
      return "";
    }
    const now = Date.now();
    return await createToken(
      { iss: "extension", iat: now / 1000, exp: (now + 120_000) / 1000 },
      this.sharedKey || ""
    );
  }
}
