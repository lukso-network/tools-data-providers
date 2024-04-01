import { createReadStream } from "node:fs";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";
import { config } from "dotenv";

config({ path: "./.env.test" });

const options = {
	headers: {
		authorization: `Basic ${Buffer.from(
			`${process.env.TEST_INFURA_API_KEY_NAME}:${process.env.TEST_INFURA_API_KEY}`,
		).toString("base64")}`,
	},
};
const provider = new IPFSHttpClientUploader(
	process.env.TEST_INFURA_GATEWAY || "",
	options,
);

const file = createReadStream("./examples/test-image.png");

const url = await provider.upload(file);

console.log(url);
