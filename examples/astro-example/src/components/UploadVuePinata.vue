<template>
  <div>
    <input ref="fileInput" type="file" accept="image/*" />
    <button @click="upload">Upload</button>
    <div className="url">{{ url }}</div>
    <div className="hash">{{ hash }}</div>
    <div>
      <img className="image" :src="imageUrl" alt="uploaded image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PinataUploader } from "@lukso/data-provider-pinata";
import { ref } from "vue";
import { urlResolver } from "./shared";
import { Hash } from "node:crypto";

const url = ref("");
const hash = ref("");
const imageUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const provider = new PinataUploader({
  pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
  pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
  pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
});

const upload = async () => {
  const file = fileInput.value?.files?.item(0) as File;
  const formData = new FormData();
  formData.append("file", file); // FormData keys are called fields
  const info = await provider.upload(file);
  url.value = info.url;
  hash.value = info.hash;
  imageUrl.value = urlResolver.resolveUrl(url.value);
};
</script>
