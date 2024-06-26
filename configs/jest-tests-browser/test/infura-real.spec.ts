import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { jest } from "@jest/globals";
import Blob from "cross-blob";

const __dirname = dirname(fileURLToPath(import.meta.url));

import IPFSHttpClientUploader from "@lukso/data-provider-ipfs-http-client";

beforeEach(() => {
	jest.resetAllMocks();
});

it("should pin images (web, infura)", async () => {
	const { uploader, file } = await mockDependencies();

	const upload = await uploader.upload(file);

	expect(upload).toEqual({
		url: "ipfs://QmPhT2FsbyQ2p2gmKBt42Voqr9izxhUn8yLPKg2NqtrGWi",
		hash: "0x3666bb759bd6ffaa030e698433721c8c089e319fa11440613a33bcd9f656298a",
	});
}, 20000);

async function mockDependencies() {
	const file = new Blob(
		// This is only for jest so it's no big deal.
		// eslint-disable-next-line unicorn/prefer-module
		[readFileSync(resolve(__dirname, "./test-image.png"))],
		{
			type: "image/png",
		},
	);
	// TODO: fix "is not assignable to type IDE error"
	// file.arrayBuffer = async () => {
	//   return Buffer.from('123123');
	// };

	const config = {
		headers: {
			authorization: `Basic ${Buffer.from(
				`${process.env.TEST_INFURA_API_KEY_NAME}:${process.env.TEST_INFURA_API_KEY}`,
			).toString("base64")}`,
		},
	};
	const uploader = new IPFSHttpClientUploader(
		process.env.TEST_INFURA_GATEWAY || "",
		config,
	);
	return {
		file,
		config,
		uploader,
	};
}
