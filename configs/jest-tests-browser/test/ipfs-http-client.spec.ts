import { jest } from "@jest/globals";
import { getFile } from "@lukso/data-provider-base";
import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";

it("should pin images (mocked)", async () => {
	const { uploader, file } = await mockDependencies();

	const upload = await uploader.upload(file);

	expect(upload).toEqual({
		url: "ipfs://QmY4Z",
		hash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
	});
});

async function mockDependencies(gateway = "https://api.2eff.lukso.dev") {
	const File = await getFile();
	const file = new File(["123123"], "test-image.jpg", {
		type: "image/jpg",
	});
	// TODO: fix "is not assignable to type IDE error"
	file.arrayBuffer = async () => Buffer.from("");

	const uploader = new IPFSHttpClientUploader(gateway);

	const upload = jest
		.spyOn(uploader, "uploadFormData")
		.mockImplementation(async () => {
			return { IpfsHash: "QmY4Z", Hash: "QmY4Z" };
		});

	return {
		file,
		upload,
		uploader,
	};
}
