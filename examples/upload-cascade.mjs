import { createReadStream } from "node:fs";
import { CascadeUploader } from "@lukso/data-provider-cascade";
import { config } from "dotenv";

config({ path: "./.env.test" });

const provider = new CascadeUploader(
	process.env.CASCADE_API_KEY || ""
);

const file = createReadStream("./examples/test-image.png");

const result = await provider.uploadToCascade(file);

if (result) {
  console.log(result.ipfs_url);

  // Get transaction status
  const status = await provider.retrieveTxId(result.result_id);
  console.log(status); // { status: "PENDING" or "SUCCESS", tx_id: activation_transaction_id }
}

// upload folder
const results = await provider.uploadFolderToCascade("./examples");

if (results.length > 0) {
  for (const result of results) {
    if (result) {
      console.log("File Name:", result.file_name);
      console.log("IPFS Url:", result.ipfs_url);
      console.log("Result Id:", result.result_id);
    }
  }
}
