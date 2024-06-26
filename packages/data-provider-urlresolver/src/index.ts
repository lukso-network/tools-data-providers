// bump 2

/**
 * It will relatively append pathname or hostname to the desination URL
 *
 * @example
 * ```
 * destination=https://some.api.gateway/something/ipfs
 * url=ipfs://QmSomeHash
 * output=https://some.api.gateway/something/ipfs/QmSomeHash
 *
 * destination=https://some.api.gateway/something/ipfs
 * url=https://something.com/somewhere
 * output=https://some.api.gateway/something/ipfs/somewhere
 * ```
 *
 * @param destination - destination string | URL
 * @param match - optionally pass in what RegExp or string to replace in the URL
 * NOTE: Under normal circumstances the match will be passed in from the converter
 *   as configured in the UrlResolver. For example when the match is ipfs://
 *   we will replace ipfs:// with the destination URL string.
 * @public
 */
export class UrlConverter {
	protected destination: string;
	protected match?: RegExp | string;

	constructor(destination: string | URL, match?: RegExp | string) {
		this.destination =
			destination instanceof URL ? destination.toString() : destination;
		this.match = match;
	}

	resolveUrl(_match: RegExp | string, url: string): string {
		const match = this.match || _match;
		return url.replaceAll(match, this.destination.toString());
	}
}

/**
 * UrlResolver resolved URLs to gateway URLs.
 *
 * @example
 * ```
 * const resolver = new UrlResolver([
 *  ["ipfs://", "https://some.api.gateway/something/ipfs"],
 *  ["ar://", "https://some.api.gateway/something/ar"],
 *  [/^ipfs:\/\/Qm/, new UrlConverter("https://some2.api.gateway/something/ipfs")]
 * ])
 *
 * resolver.resolveUrl("ipfs://QmSomeHash") // https://some.api.gateway/something/ipfs/QmSomeHash
 * ```
 * @public
 */
export class UrlResolver {
	private converters: Array<{
		match: string | RegExp;
		converter: UrlConverter;
	}> = [];
	constructor(converters: Array<[string | RegExp, UrlConverter | string]>) {
		for (const item of converters) {
			const [match, _converter] = item;
			if (match == null) {
				throw new TypeError("Match criteria not defined");
			}
			const converter =
				typeof _converter === "string"
					? new UrlConverter(_converter)
					: _converter;
			if (!(converter instanceof UrlConverter)) {
				throw new TypeError("Invalid converter");
			}
			this.converters.push({ match, converter });
		}
	}

	/**
	 * Resolves a URL to a gateway URL.
	 * Supports possible multiple converters transforming the URL
	 * in sequence until no converter matches.
	 *
	 * @param url - url to resolve
	 * @returns resolved url (if resolver is found, otherwise the parameter url is returned)
	 */
	resolveUrl(_url: string): string {
		const current = new Set<{
			match: string | RegExp;
			converter: UrlConverter;
		}>(this.converters);
		let found = true;
		let url = _url;
		while (found) {
			found = false;
			for (const entry of current) {
				const { match, converter } = entry;
				if (match instanceof RegExp ? match.test(url) : url.startsWith(match)) {
					url = converter.resolveUrl(match, url);
					// This converter matches, so don't use it again.
					current.delete(entry);
					found = true;
					break;
				}
			}
		}
		return url;
	}
}

export default UrlResolver;
