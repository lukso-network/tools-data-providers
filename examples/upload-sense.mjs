import { createReadStream } from "node:fs";
import { SenseUploader } from "@lukso/data-provider-sense";
import { config } from "dotenv";

config({ path: "./.env.test" });

const provider = new SenseUploader(
	process.env.SENSE_API_KEY || ""
);

const file = createReadStream("./examples/test-image.png");

const result = await provider.uploadToSense(file);

if (result) {
  console.log(result.ipfs_url);

  // Get transaction status
  const status = await provider.retrieveTxId(result.result_id);
  console.log(status); // { status: "PENDING" or "SUCCESS", tx_id: activation_transaction_id }
}
