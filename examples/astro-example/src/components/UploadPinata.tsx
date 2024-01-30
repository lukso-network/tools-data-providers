import React, { useCallback, useMemo, useRef, useState } from "react";
import { PinataProvider } from "@lukso/data-provider-pinata";

export default function UploadPinata() {
  const provider = useMemo(
    () =>
      new PinataProvider({
        pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
        pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
        pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
      }),
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
