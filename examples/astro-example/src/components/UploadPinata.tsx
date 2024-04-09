import { PinataUploader } from "@lukso/data-provider-pinata";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { urlResolver } from "./shared";

export default function UploadPinata() {
	const provider = useMemo(
		() =>
			new PinataUploader({
				pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
				pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
				pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
			}),
		[],
	);

	const fileInput = useRef<HTMLInputElement>(null);
	const [url, setUrl] = useState("");
	const [hash, setHash] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const upload = useCallback(async () => {
		const file = fileInput?.current?.files?.item(0) as File;
		const formData = new FormData();
		formData.append("file", file); // FormData keys are called fields
		const { url, hash } = await provider.upload(file);
		setUrl(url);
		setHash(hash);
		const imageUrl = urlResolver.resolveUrl(url);
		setImageUrl(imageUrl);
	}, [provider.upload]);

	return (
		<div>
			<input ref={fileInput} type="file" accept="image/*" />
			<button type="button" onClick={upload}>
				Upload
			</button>
			<div className="url">Url: {url}</div>
			<div className="hash">Hash: {hash}</div>
			<div>
				<img className="image" src={imageUrl} alt="uploaded" />
			</div>
		</div>
	);
}
