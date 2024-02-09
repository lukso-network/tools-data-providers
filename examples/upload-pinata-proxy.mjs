import { createReadStream } from "fs";
import { AuthenticatedFormDataUploader } from "@lukso/data-provider-base";
import { config } from "dotenv";

config({ path: "./.env.test" });

const provider = new AuthenticatedFormDataUploader(
  "https://api.universalprofile.cloud/api/v0/add",
  process.env.TEST_SHARED_KEY
);

const file = createReadStream("./examples/test-image.png");

const url = await provider.upload(file);

console.log(url);
