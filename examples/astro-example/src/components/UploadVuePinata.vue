<template>
  <div>
    <input ref="fileInput" type="file" accept="image/*" />
    <button @click="upload">Upload</button>
    <div className="url">{{ url }}</div>
    <div>
      <img className="image" :src="imageUrl" alt="uploaded image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PinataUploader } from "@lukso/data-provider-pinata";
import { urlResolver } from "./shared";
const props = defineProps<{}>();

const url = ref("");
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
  url.value = await provider.upload(file);
  imageUrl.value = urlResolver.resolveUrl(url.value);
};
</script>
