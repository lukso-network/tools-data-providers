import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { urlResolver } from "./shared";

export interface Props {
	gateway: string;
	options?: any;
}

export default function UploadLocal({ gateway, options }: Props) {
	const provider = useMemo(
		() => new IPFSHttpClientUploader(gateway, options),
		[gateway, options],
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
		const destination = urlResolver.resolveUrl(url);
		setImageUrl(destination);
	}, [provider]);

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
