<template>
  <div>
    <input ref="fileInput" type="file" />
    <button @click="upload">Upload</button>
    <div className="url">{{ url }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IPFSHttpClientProvider } from "@lukso/data-provider-ipfs-http-client";
const props = defineProps<{ gateway: string; options?: any }>();

const url = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const provider = new IPFSHttpClientProvider(props.gateway, props.options);

const upload = async () => {
  const file = fileInput.value?.files?.item(0) as File;
  const formData = new FormData();
  formData.append("file", file); // FormData keys are called fields
  url.value = await provider.upload(file);
};
</script>
