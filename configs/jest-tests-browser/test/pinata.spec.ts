import { jest } from "@jest/globals";
import { compatibility } from "@lukso/data-provider-base";
import { PinataUploader } from "@lukso/data-provider-pinata";

beforeEach(() => {
	jest.resetAllMocks();
});

it("should pin images (web, pinata, mocked)", async () => {
	const { uploadFormData, uploader, file } = await mockDependencies();

	const upload = await uploader.upload(file);

	expect(uploadFormData).toHaveBeenCalledWith(
		expect.objectContaining({
			headers: expect.objectContaining({}),
		}),
		expect.objectContaining({}),
	);

	expect(upload).toEqual({
		url: "ipfs://QmY4Z",
		hash: "0x43244635c14605fdbe23fa89b5cf12bd14a14bfb9420f66788dd6914a31d8c7b",
	});
}, 20000);

async function mockDependencies() {
	const file = new Blob([compatibility.stringToArrayBuffer("123123")], { type: "image/png" });

	const config = {
		pinataApiKey: "sample-api-key",
		pinataSecretApiKey: "some-secret-key",
	};
	const uploader = new PinataUploader(config);
	const uploadFormData = jest.spyOn(uploader, "uploadFormData");
	(uploadFormData as jest.Mock).mockImplementation(async () => {
		return { IpfsHash: "QmY4Z" };
	});
	return {
		file,
		config,
		uploadFormData,
		uploader,
	};
}
