<template>
  <div>
    <input ref="fileInput" type="file" accept="image/*" />
    <button @click="upload">Upload</button>
    <div className="url">Url: {{ url }}</div>
    <div className="hash">Hash: {{ hash }}</div>
    <div>
      <img className="image" :src="imageUrl" alt="uploaded image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hash } from "node:crypto";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";
import { ref } from "vue";
import { urlResolver } from "./shared";
const props = defineProps<{ gateway: string; options?: any }>();

const url = ref("");
const hash = ref("");
const imageUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const provider = new IPFSHttpClientUploader(props.gateway, props.options);

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
