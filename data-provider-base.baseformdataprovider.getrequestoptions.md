<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lukso/data-provider-base](./data-provider-base.md) &gt; [BaseFormDataProvider](./data-provider-base.baseformdataprovider.md) &gt; [getRequestOptions](./data-provider-base.baseformdataprovider.getrequestoptions.md)

## BaseFormDataProvider.getRequestOptions() method

Construct options for the underlying fetch call.

**Signature:**

```typescript
getRequestOptions(dataContent: FormData, meta?: FormDataPostHeaders): Promise<FormDataRequestOptions>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  dataContent | FormData | content to upload |
|  meta | [FormDataPostHeaders](./data-provider-base.formdatapostheaders.md) | _(Optional)_ optional meta data |

**Returns:**

Promise&lt;[FormDataRequestOptions](./data-provider-base.formdatarequestoptions.md)<!-- -->&gt;

return request options for fetch.
