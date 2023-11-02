import { sign } from "@tsndr/cloudflare-worker-jwt";

import { FormDataPostHeaders } from "./formdata-base-provider";
import { CustomHeaderFormDataProvider } from "./ipfs-formdata-provider";

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
