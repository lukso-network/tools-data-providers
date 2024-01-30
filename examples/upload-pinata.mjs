import { createReadStream } from "fs";
import { PinataProvider } from "@lukso/data-provider-pinata";
import { config } from "dotenv";
import { fileFromPath } from "formdata-node/file-from-path";

config({ path: "./.env.test" });

const provider = new PinataProvider({
  pinataApiKey: process.env.TEST_PINATAAPIKEY,
  pinataSecretApiKey: process.env.TEST_PINATASECRETAPIKEY,
  pinataJWTKey: process.env.TEST_PINATAJWTKEY,
});

// const file = await fileFromPath("./test-image.png");
const file = createReadStream("./examples/test-image.png");

const url = await provider.upload(file);

console.log(url);
