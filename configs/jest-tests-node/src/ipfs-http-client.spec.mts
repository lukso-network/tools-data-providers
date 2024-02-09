import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";

it("should pin images (node, mocked)", async () => {
  const { upload, uploader, file } = await mockDependencies();

  const uploaded = await uploader.upload(file);

  expect(uploaded).toHaveBeenCalledWith(file, { pin: true });
  expect(upload.toString()).toEqual("ipfs://QmY4Z");
});

async function mockDependencies(gateway = "https://api.2eff.lukso.dev") {
  const file = new File(["123123"], "test-image.jpg", {
    type: "image/jpg",
  });
  // TODO: fix "is not assignable to type IDE error"
  file.arrayBuffer = async function () {
    return Buffer.from("");
  };

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
