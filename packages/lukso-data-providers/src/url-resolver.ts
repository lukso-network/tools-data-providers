export class UrlConverter {
  private destination: URL
  /**
   * It will relatively append pathname or hostname to the desination URL
   *
   * For example:
   * destination=https://some.api.gateway/something/ipfs
   * url=ipfs://QmSomeHash
   * output=https://some.api.gateway/something/ipfs/QmSomeHash
   *
   * destination=https://some.api.gateway/something/ipfs
   * url=https://something.com/somewhere
   * output=https://some.api.gateway/something/ipfs/somewhere
   *
   * @param destination destination string | URL
   */
  constructor(destination: string | URL) {
    this.destination = new URL(destination)
    if (this.destination.pathname.at(-1) != '/') {
      this.destination.pathname += '/'
    }
  }

  resolveUrl(url: string): string {
    // Parse and convert to javascript URL objects
    // this will manage / and relative paths for us.
    const source = new URL(url)
    // extract the relative path. For URLs with a pathname prepend "." to make it ./ (i.e. relative)
    // for anything that only has a hostname we prepend ./ to make it relative
    // the pathname is at least slash for https urls, but '' for ipfs for example
    const relativePath = source.pathname
      ? `.${source.pathname}` // pathname always starts with at least a slash
      : `./${source.hostname}`
    // Construct relative URL on destination using the relative pathname.
    const out = new URL(relativePath, this.destination)
    out.pathname = out.pathname.replaceAll(/\/\/+/g, '/')
    return out.toString()
  }
}

export class UrlResolver {
  private converters: Array<{
    match: string | RegExp
    converter: UrlConverter
  }> = []
  constructor(converters: Array<[string | RegExp, UrlConverter | string]>) {
    for (const item of converters) {
      const [match, _converter] = item
      if (match == undefined) {
        throw new TypeError('Match criteria not defined')
      }
      const converter =
        typeof _converter === 'string'
          ? new UrlConverter(_converter)
          : _converter
      if (!(converter instanceof UrlConverter)) {
        throw new TypeError('Invalid converter')
      }
      this.converters.push({ match, converter })
    }
  }

  /**
   * Resolves a URL to a gateway URL.
   * Supports possible multiple converters transforming the URL
   * in sequence until no converter matches.
   *
   * @param <URL> url to resolve
   * @returns <URL> resolved url (if resolver is found, otherwise the parameter url is returned)
   */
  resolveUrl(url: string): string {
    const current = new Set<{
      match: string | RegExp
      converter: UrlConverter
    }>(this.converters)
    let found = true
    while (found) {
      found = false
      for (const entry of current) {
        const { match, converter } = entry
        if (match instanceof RegExp ? match.test(url) : url.startsWith(match)) {
          url = converter.resolveUrl(url)
          // This converter matches, so don't use it again.
          current.delete(entry)
          found = true
          break
        }
      }
    }
    return url
  }
}
