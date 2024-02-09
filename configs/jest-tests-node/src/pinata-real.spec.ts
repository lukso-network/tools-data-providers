import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { jest } from "@jest/globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { PinataUploader } from "@lukso/data-provider-pinata";

beforeEach(() => {
  jest.resetAllMocks();
});

it("should pin images (node, pinata)", async () => {
  const { uploader, file } = await mockDependencies();

  const upload = await uploader.upload(file);

  expect(upload.toString()).toEqual(
    "ipfs://QmPhT2FsbyQ2p2gmKBt42Voqr9izxhUn8yLPKg2NqtrGWi"
  );
});

async function mockDependencies() {
  const file = new global.Blob(
    // This is only for jest so it's no big deal.
    // eslint-disable-next-line unicorn/prefer-module
    [readFileSync(resolve(__dirname, "./test-image.png"))],
    {
      type: "image/png",
    }
  );
  // TODO: fix "is not assignable to type IDE error"
  // file.arrayBuffer = async () => {
  //   return Buffer.from('123123');
  // };

  const config = {
    pinataApiKey: process.env.TEST_PINATAAPIKEY,
    pinataSecretApiKey: process.env.TEST_PINATASECRETAPIKEY,
    pinataJWTKey: process.env.TEST_PINATAJWTKEY,
  };
  const uploader = new PinataUploader(config);
  return {
    file,
    config,
    uploader,
  };
}
