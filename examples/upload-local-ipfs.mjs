import { createReadStream } from "fs";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";

const provider = new IPFSHttpClientUploader("http://127.0.0.1:5001/api/v0/add");

const file = createReadStream("./examples/test-image.png");

const url = await provider.upload(file);

console.log(url);
