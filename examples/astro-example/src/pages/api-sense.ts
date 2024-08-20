import { SenseUploader } from "@lukso/data-provider-sense";
import type { APIContext } from "astro";

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function POST({ request }: APIContext) {
	const formData = await request.formData();
	const file = formData.get("file");

	const provider = new SenseUploader(process.env.SENSE_API_KEY);

	const result = await provider.uploadToSense(file);
	return new Response(JSON.stringify({ Hash: result.ipfs_url }), {
		headers: { contentType: "application/json" },
	});
}
