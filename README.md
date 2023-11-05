# Turborepo Design System starter with Changesets

This is an official React design system starter powered by Turborepo. Versioning and package publishing is handled by [Changesets](https://github.com/changesets/changesets) and fully automated with GitHub Actions.

## What's inside?

This Turborepo includes the following:

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
