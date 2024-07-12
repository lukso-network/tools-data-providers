import node from "@astrojs/node";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import { config } from "dotenv";

config({ path: "../../.env.test" });

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue()],
  output: "hybrid",
  adapters: [node({ mode: "development" })],
  env: {
    TEST_PINATAAPIKEY: process.env.TEST_PINATAAPIKEY,
    TEST_PINATASECRETAPIKEY: process.env.TEST_PINATASECRETAPIKEY,
    TEST_PINATAJWTKEY: process.env.TEST_PINATAJWTKEY,
  },
  vite: {
    define: {
      "import.meta.env.TEST_PINATAAPIKEY": JSON.stringify(
        process.env.TEST_PINATAAPIKEY
      ),
      "import.meta.env.TEST_PINATASECRETAPIKEY": JSON.stringify(
        process.env.TEST_PINATASECRETAPIKEY
      ),
      "import.meta.env.TEST_PINATAJWTKEY": JSON.stringify(
        process.env.TEST_PINATAJWTKEY
      ),
    },
    build: {
      build: {
        commonjsOptions: {
          //include: [/node-domexception/, /fetch-blob/, /node_modules/],
        },
      },
    },
  },
});
