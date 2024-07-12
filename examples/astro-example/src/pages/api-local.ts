import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";
import type { APIContext } from "astro";
import "@lukso/data-provider-base/compatibility-node"

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function POST({ request }: APIContext) {
	const formData = await request.formData();
	const file = formData.get("file");

	const provider = new IPFSHttpClientUploader(
		"http://127.0.0.1:5001/api/v0/add",
	);

	const url = await provider.upload(file);
	return new Response(JSON.stringify({ Hash: url }), {
		headers: { contentType: "application/json" },
	});
}
