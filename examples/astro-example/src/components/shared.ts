import { UrlResolver } from "@lukso/data-provider-urlresolver";

export const urlResolver = new UrlResolver([
  ["ipfs://", "https://api.universalprofile.cloud/ipfs/"],
]);
