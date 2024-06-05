<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lukso/data-provider-base](./data-provider-base.md) &gt; [BaseFormDataUploader](./data-provider-base.baseformdatauploader.md) &gt; [getEndpoint](./data-provider-base.baseformdatauploader.getendpoint.md)

## BaseFormDataUploader.getEndpoint() method

Return the endpoint to allow this be used with an old ipfs-http-client implementation. If the proxy is running at /api/v0/add for pinning then you can use the ipfs-http-client pointed to /api/v0 and it will add /add to the end before sending the FormData to the server. This allows you to create a proxy that can be used with the ipfs-http-client.

**Signature:**

```typescript
getEndpoint(): string;
```
**Returns:**

string
