import React, { useCallback, useMemo, useRef, useState } from "react";
import { PinataUploader } from "@lukso/data-provider-pinata";
import { urlResolver } from "./shared";

export default function UploadPinata() {
  const provider = useMemo(
    () =>
      new PinataUploader({
        pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
        pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
        pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
      }),
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
    const imageUrl = urlResolver.resolveUrl(url);
    setImageUrl(imageUrl);
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
