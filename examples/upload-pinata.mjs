import { createReadStream } from "fs";
import { PinataUploader } from "@lukso/data-provider-pinata";
import { config } from "dotenv";

config({ path: "./.env.test" });

const provider = new PinataUploader({
  pinataApiKey: process.env.TEST_PINATAAPIKEY,
  pinataSecretApiKey: process.env.TEST_PINATASECRETAPIKEY,
  pinataJWTKey: process.env.TEST_PINATAJWTKEY,
});

const file = createReadStream("./examples/test-image.png");

const url = await provider.upload(file);

console.log(url);
