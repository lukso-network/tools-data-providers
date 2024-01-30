## What's inside?

Data providers for IPFS connectivity

## How to get started

In order to get started with uploading data to IPFS you will need credentials to a pinning service.
Currently the pinning service supported by this library is either a local IPFS node or pinata and infura will follow soon after.
To install the pinata provider you can use please install `@lukso/data-provider-pinata` or `@lukso/data-provider-ipfs-http-client`

For a local IPFS node running as a .mjs file.

```js
import { createReadStream } from "fs"
import { IPFSHttpClientProvider } from "@lukso/data-provider-ipfs-http-client"

const provider = new IPFSHttpClientProvider("http://127.0.0.1:5001")

const file = createReadStream('./test-image.png')

const url = await provider.upload(file)

console.log(url);
```

> NOTE with the current version of the IPFS desktop the file will not show in the UI but can be found inside of the gateway for the local node. Also if your upnp on your router is correctly setup then the file will be available on IPFS proper as long as your local node is running.

There are various ways to supply the file content. When using a browser File or Blob objects are much more likely and are compatible with the upload function. Although in theory it's possible to upload folders, this library does not currently have the facility to support folder and multi file pinning as it's not required.



## Documentation

[API Docs](https://lukso-network.github.io/tools-data-providers/)

## Status

- ![main](https://github.com/lukso-network/tools-data-providers/actions/workflows/release.yml/badge.svg)
- ![docs](https://github.com/lukso-network/tools-data-providers/actions/workflows/pages/pages-build-deployment/badge.svg)

### Apps and Packages

- `docs`: A placeholder documentation site powered by [Next.js](https://nextjs.org/)
- `@lukso/data-providers`: Base data providers using formdata and url mapping libraries.
- `@lukso/data-provider-http-client`: Custom data provider using ipfs-http-client
- `@lukso/data-provider-pinata`: Custom data provider using `@pinata/sdk`
- `@lukso/tsconfig`: shared `tsconfig.json`s used throughout the monorepo
- `eslint-config`: ESLint preset
- `jest-presets`: Jest presets
- `jest-tests-node`: Jest tests running in node
- `jest-tests-browser`: Jest tests running in jsdom

### Useful commands

- `pnpm run build` - Build all packages and the docs site
- `pnpm run lint` - Lint all packages
- `pnpm run changeset` - Generate a changeset
- `pnpm run clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Versioning and Publishing packages

Package publishing has been configured using [Changesets](https://github.com/changesets/changesets). Please review their [documentation](https://github.com/changesets/changesets#documentation) to familiarize yourself with the workflow.

This example comes with automated npm releases setup in a [GitHub Action](https://github.com/changesets/action). To get this working, you will need to create an `NPM_TOKEN` and `GITHUB_TOKEN` in your repository settings. You should also install the [Changesets bot](https://github.com/apps/changeset-bot) on your GitHub repository as well.

For more information about this automation, refer to the official [changesets documentation](https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md)

### GitHub Package Registry

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package-using-publishconfig-in-the-packagejson-file)
