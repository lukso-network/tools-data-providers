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
