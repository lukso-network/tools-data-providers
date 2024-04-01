import { UrlConverter, UrlResolver } from "@lukso/data-provider-urlresolver";

it("should convert ipfs url to https", () => {
	const resolver = new UrlResolver([
		["ipfs://", new UrlConverter("https://2eff.lukso.dev/ipfs/")],
		["ipfs2://", "https://2eff.lukso.dev/ipfs/"],
		["https://special.com", new UrlConverter("https://elsewhere.com/subpath")],
	]);

	// Utility to conver URLs after addURLResolver has been called.
	const url = resolver.resolveUrl(
		"ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp",
	);

	expect(url).toEqual(
		"https://2eff.lukso.dev/ipfs/QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp",
	);

	const httpsUrl = resolver.resolveUrl("https://special.com/some/path.html");

	expect(httpsUrl).toEqual("https://elsewhere.com/subpath/some/path.html");
}, 600000);
