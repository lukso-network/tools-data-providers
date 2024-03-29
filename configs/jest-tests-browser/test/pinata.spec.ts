import { PinataUploader } from "@lukso/data-provider-pinata";
import { jest } from "@jest/globals";

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
    expect.objectContaining({})
  );

  expect(upload.toString()).toEqual("ipfs://QmY4Z");
});

async function mockDependencies() {
  const file = new Blob([Buffer.from("123123")], { type: "image/png" });

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
