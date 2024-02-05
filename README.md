## What's inside?

Data providers for IPFS connectivity

## How to get started

### Resolving URLs

To resolve IPFS and other URLs, there is a UrlResolver utility which is part of this library. The default usage
of the URL resolver will just replace the string on the left with the string on the right.
For example `ipfs://<CID>` will become `https://api.universalprofile.cloud/ipfs/<CID>`. The default url replacer
does not take care of replacing or deleting slashes to enable more flexibility.

> NOTE: As of 2/5/2024 it's still required to use the lukso proxy in order to see files from both infura and pinata. The infura IPFS support is still broken as per ticket Request #1115524. Any other proxy would need to load both from infura and pinata and possibly other IPFS gateways to reliably gain access to all data stored within IPFS.

```mjs
import { UrlResolver } from "@lukso/data-provider-urlresolver";

export const urlResolver = new UrlResolver([
  ["ipfs://", "https://api.universalprofile.cloud/ipfs/"],
]);
```

For example if you wanted to put the CID into a query instead of part of the URL, you could do

```mjs
export const urlResolver = new UrlResolver([
  ["ipfs://", "https://some.proxy?cid="],
]);
```

This would then convert `ipfs://<CID>` to `https://some.proxy?cid=<CID>`

### Pinning files

In order to get started with uploading data to IPFS you will need credentials to a pinning service.
Currently the pinning service supported by this library is either a local IPFS node, pinata, or infura.
Most providers are compatible with a configured version of `@lukso/data-provider-ipfs-http-client`, the pinata provider `@lukso/data-provider-pinata` allows you to configure it with the same JSON as needed for `@pinata/sdk` but otherwise also uses the standard formdata upload.

For a local IPFS node running as a .mjs file.

```mjs
import { createReadStream } from "fs";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";

const provider = new IPFSHttpClientUploader("http://127.0.0.1:5001/api/v0/add");

const file = createReadStream("./test-image.png");

const url = await provider.upload(file);

console.log(url);
```

> NOTE: with the current version of the IPFS desktop the file will not show in the UI but can be found inside of the gateway for the local node. Also if your upnp on your router is correctly setup then the file will be available on IPFS proper as long as your local node is running. To run a local node just download the IPFS Desktop app (to allow upload from the browser locally you will need to adjust the `Access-Control-Allow-Origin` header as commented later)

There are various ways to supply the file content. When using a browser File or Blob objects are much more likely and are compatible with the upload function. Although in theory it's possible to upload folders, this library does not currently have the facility to support folder and multi file pinning as it's not required or planned.

## Local IPFS

```mjs
const provider = new IPFSHttpClientUploader("http://127.0.0.1:5001/api/v0/add");
```

### Pinata

```mjs
const provider = new PinataUploader({
  pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
  pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
});
```

or

```mjs
const provider = new PinataUploader({
  pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
});
```

### Infura

```mjs
// import.meta.env.VAR is the new way of importing environment within vite and astro and
// equivalent to the old process.env.VAR
//
const provider = new IPFSHttpClientUploader(import.meta.env.INFURA_GATEWAY, {
  headers: {
    authorization: `Basic ${Buffer.from(
      `${import.meta.env.INFURA_API_KEY_NAME}:${import.meta.env.INFURA_API_KEY}`
    ).toString("base64")}`,
  },
});
```

### API

You can post the data to any API which accepts formData with a file field called "file".
Some providers like pinata can supply additional fields with other custom information but it's not required
for standard pinning which is the main use case of this library.

```mjs
const provider = new IPFSHttpClientUploader(POST_URL, {
  headers: {
    ...HEADERS,
  },
});
```

## Example React View with local upload

> NOTE: The drawback of this kind of approach is that the IPFS configuration (authentication keys and so on are accessible within the frontend) but it can also be compatible with a backend API (which can internally support session cookies or another way to limit access) by just providing an api endpoint for the gateway.

```tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";
import { urlResolver } from "./shared";

export interface Props {
  gateway: string;
  options?: any;
}

export default function UploadLocal({ gateway, options }: Props) {
  const provider = useMemo(
    () => new IPFSHttpClientUploader(gateway, options),
    []
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const upload = useCallback(async () => {
    const file = fileInput?.current?.files?.item(0) as File;
    const formData = new FormData();
    formData.append("file", file); // FormData keys are called fields
    const url = await provider.upload(file);
    setUrl(url);
    const destination = urlResolver.resolveUrl(url);
    setImageUrl(destination);
  }, []);

  return (
    <div>
      <input ref={fileInput} type="file" accept="image/*" />
      <button onClick={upload}>Upload</button>
      <div className="url">{url}</div>
      <div>
        <img className="image" src={imageUrl} alt="uploaded image" />
      </div>
    </div>
  );
}
```

This is how you would use this component within a page to talk to a local IPFS pinning service

```tsx
<Upload client:only="react" gateway="http://127.0.0.1:5001/api/v0/add" />
```

This is how you would use this component within a page to talk to infura. (the client:only="react" is a feature of astro)

```tsx
<Upload
  client:only="react"
  gateway={import.meta.env.TEST_INFURA_GATEWAY}
  options={{
    headers: {
      authorization: `Basic ${Buffer.from(
        `${import.meta.env.TEST_INFURA_API_KEY_NAME}:${
          import.meta.env.TEST_INFURA_API_KEY
        }`
      ).toString("base64")}`,
    },
  }}
/>
```

This is how you could use the same view to post to an API endpoint.

```tsx
<Upload client:only="react" gateway="/api-infura" />
```

This would connect to this kind of endpoint

```ts
import type { APIContext } from "astro";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";

export async function POST({ request }: APIContext) {
  const formData = await request.formData();
  const file = formData.get("file");

  const provider = new IPFSHttpClientUploader(
    import.meta.env.TEST_INFURA_GATEWAY,
    {
      headers: {
        authorization: `Basic ${Buffer.from(
          `${import.meta.env.TEST_INFURA_API_KEY_NAME}:${
            import.meta.env.TEST_INFURA_API_KEY
          }`
        ).toString("base64")}`,
      },
    }
  );

  const url = await provider.upload(file);
  return new Response(JSON.stringify({ Hash: url }), {
    headers: { contentType: "application/json" },
  });
}
```

So essentially the remote request is compatible with the incoming formData's File item. The INPUT's event browser File element or the formData File item can be sent.
The node version of the API also supports createReadStream results (i.e. ReadStream) to be passed into upload.

## Documentation

[API Docs](https://lukso-network.github.io/tools-data-providers/)

## Status

- ![main](https://github.com/lukso-network/tools-data-providers/actions/workflows/release.yml/badge.svg)
- ![docs](https://github.com/lukso-network/tools-data-providers/actions/workflows/pages/pages-build-deployment/badge.svg)

### Apps and Packages

- `docs`: A placeholder documentation site powered by [Next.js](https://nextjs.org/)
- `@lukso/data-provider-base`: Base data providers using formdata and url mapping libraries.
- `@lukso/data-provider-ipfs-http-client`: Custom data provider compatible ipfs-http-client (`POST /api/v0/add` only)
- `@lukso/data-provider-pinata`: Custom data provider compatible with pinata.
- `@lukso/data-provider-urlresolver`: URL resolvers to map ipfs://, ar:// and so on to https:// urls.

### Useful commands

- `pnpm build` - Build all packages and the docs site
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)
- `pnpm demo` - Launch a small astro demo with sample vue and react views to pin data into ipfs.

> NOTE: To run the demo you need to setup `.env.test` by copying `.env.test.example` and filling it in. Then you need to install the IPFS desktop app and configure it to allow \* or http://localhost:4321 as the easiest would be to use the ipfs command line, or you can skip using the local upload options in the demo. Pinata and Infura only need the credentials inside of `.env.test`. The local IPFS node is an example how one would use something like [helia](https://github.com/ipfs/helia).

```json
"HTTPHeaders": {
  "Access-Control-Allow-Credentials": [
    "true"
  ],
  "Access-Control-Allow-Methods": [
    "PUT",
    "GET",
    "POST"
  ],
  "Access-Control-Allow-Origin": [
    "*"
  ]
}
```
