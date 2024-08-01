import { SenseUploader } from "@lukso/data-provider-sense";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { urlResolver } from "./shared";

export default function UploadPinata() {
	const provider = useMemo(
		() =>
			new SenseUploader(import.meta.env.SENSE_API_KEY),
		[],
	);

	const fileInput = useRef<HTMLInputElement>(null);
	const [url, setUrl] = useState("");
	const [resultId, setResultId] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const upload = useCallback(async () => {
		const file = fileInput?.current?.files?.item(0) as File;
		const { ipfs_url: url, result_id } = await provider.uploadToSense(file);
		setUrl(url);
		setResultId(result_id);
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
			<div className="hash">Result Id: {resultId}</div>
			<div>
				<img className="image" src={imageUrl} alt="uploaded" />
			</div>
		</div>
	);
}
