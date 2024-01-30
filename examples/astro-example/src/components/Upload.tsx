import React, { useCallback, useMemo, useRef, useState } from "react";
import { IPFSHttpClientProvider } from "@lukso/data-provider-ipfs-http-client";

export interface Props {
  gateway: string;
  options?: any;
}

export default function UploadLocal({ gateway, options }: Props) {
  const provider = useMemo(
    () => new IPFSHttpClientProvider(gateway, options),
    []
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");

  const upload = useCallback(async () => {
    const file = fileInput?.current?.files?.item(0) as File;
    const formData = new FormData();
    formData.append("file", file); // FormData keys are called fields
    const url = await provider.upload(file);
    setUrl(url);
  }, []);

  return (
    <div>
      <input ref={fileInput} type="file" />
      <button onClick={upload}>Upload</button>
      <div className="url">{url}</div>
    </div>
  );
}
