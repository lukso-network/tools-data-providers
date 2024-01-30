import type { APIContext } from "astro";
import { PinataProvider } from "@lukso/data-provider-pinata";

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function POST({ request }: APIContext) {
  const formData = await request.formData();
  const file = formData.get("file");

  const provider = new PinataProvider({
    pinataApiKey: process.env.TEST_PINATAAPIKEY,
    pinataSecretApiKey: process.env.TEST_PINATASECRETAPIKEY,
    pinataJWTKey: process.env.TEST_PINATAJWTKEY,
  });

  const url = await provider.upload(file);
  return new Response(JSON.stringify({ Hash: url }), {
    headers: { contentType: "application/json" },
  });
}
