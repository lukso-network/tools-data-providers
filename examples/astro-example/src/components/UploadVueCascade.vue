<template>
  <div>
    <input ref="fileInput" type="file" accept="image/*" />
    <button @click="upload">Upload</button>
    <div className="url">{{ url }}</div>
    <div className="hash">{{ resultId }}</div>
    <div>
      <img className="image" :src="imageUrl" alt="uploaded image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hash } from "node:crypto";
import { CascadeUploader } from "@lukso/data-provider-cascade";
import { ref } from "vue";
import { urlResolver } from "./shared";

const url = ref("");
const resultId = ref("");
const imageUrl = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const provider = new CascadeUploader(import.meta.env.CASCADE_API_KEY);

const upload = async () => {
	const file = fileInput.value?.files?.item(0) as File;
	const formData = new FormData();
	formData.append("file", file); // FormData keys are called fields
	const info = await provider.upload(file);
	url.value = info.ipfs_url;
	resultId.value = info.result_id;
	imageUrl.value = urlResolver.resolveUrl(url.value);
};
</script>
