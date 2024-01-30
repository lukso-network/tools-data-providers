import { createReadStream } from "fs";
import { IPFSHttpClientProvider } from "@lukso/data-provider-ipfs-http-client";

const provider = new IPFSHttpClientProvider("http://127.0.0.1:5001");

const file = createReadStream("./examples/test-image.png");

const url = await provider.upload(file);

console.log(url);
