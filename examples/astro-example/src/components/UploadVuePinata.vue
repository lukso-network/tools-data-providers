<template>
  <div>
    <input ref="fileInput" type="file" />
    <button @click="upload">Upload</button>
    <div className="url">{{ url }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PinataProvider } from "@lukso/data-provider-pinata";
const props = defineProps<{}>();

const url = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const provider = new PinataProvider({
  pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
  pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
  pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
});

const upload = async () => {
  const file = fileInput.value?.files?.item(0) as File;
  const formData = new FormData();
  formData.append("file", file); // FormData keys are called fields
  url.value = await provider.upload(file);
};
</script>
