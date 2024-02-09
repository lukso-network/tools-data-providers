import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { jest } from "@jest/globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Blob from "cross-blob";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { AuthenticatedFormDataUploader } from "@lukso/data-provider-base";

beforeEach(() => {
  jest.resetAllMocks();
});

it("should pin images (web, pinata, proxy)", async () => {
  const { uploader, file } = await mockDependencies();

  const upload = await uploader.upload(file);

  expect(upload.toString()).toEqual(
    "ipfs://QmPhT2FsbyQ2p2gmKBt42Voqr9izxhUn8yLPKg2NqtrGWi"
  );
});

async function mockDependencies() {
  const file = new Blob(
    // This is only for jest so it's no big deal.
    // eslint-disable-next-line unicorn/prefer-module
    [readFileSync(resolve(__dirname, "./test-image.png"))],
    {
      type: "image/png",
    }
  );

  const uploader = new AuthenticatedFormDataUploader(
    "https://api.universalprofile.cloud/api/v0/add",
    process.env.TEST_SHARED_KEY || ""
  );
  return {
    file,
    uploader,
  };
}
