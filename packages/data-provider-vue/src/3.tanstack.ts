import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import {
	QueryClient,
	VueQueryPlugin,
	dehydrate,
	hydrate,
} from "@tanstack/vue-query";

// import { defaultQueryFn } from '@/utils/queryFunctions'

import type {
	DehydratedState,
	VueQueryPluginOptions,
} from "@tanstack/vue-query";
import type { NuxtApp } from "nuxt/app";

export default defineNuxtPlugin((nuxt: NuxtApp) => {
	const vueQueryState = useState<DehydratedState | null>("vue-query");
	const {
		public: { BUILD_VERSION: buster = "debug" },
	} = useRuntimeConfig();
	// Modify your Vue Query global settings here
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 60 * 24,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false,
				gcTime: 1000 * 60 * 60 * 24,
				// queryFn: defaultQueryFn,
			},
		},
	});

	const options: VueQueryPluginOptions = {
		queryClient,
		clientPersister: (queryClient) =>
			persistQueryClient({
				queryClient,
				persister: createAsyncStoragePersister({ storage: localStorage }),
				buster: buster as string,
			}),
	};

	nuxt.vueApp.use(VueQueryPlugin, options);

	if (process.server) {
		nuxt.hooks.hook("app:rendered", () => {
			vueQueryState.value = dehydrate(queryClient);
		});
	}

	if (process.client) {
		nuxt.hooks.hook("app:created", () => {
			hydrate(queryClient, vueQueryState.value);
		});
	}
});
