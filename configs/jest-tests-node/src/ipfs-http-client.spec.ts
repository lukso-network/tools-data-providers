import { IPFSHttpClientUploader } from "@lukso/data-provider-ipfs-http-client";
import { jest } from "@jest/globals";
import Blob from "cross-blob";

it("should pin images (node, mocked)", async () => {
  const { upload, uploader, file } = await mockDependencies();

  const uploaded = await uploader.upload(file);

  expect(upload).toHaveBeenCalledWith(
    expect.objectContaining({ headers: expect.objectContaining({}) }),
    expect.anything()
  );
  expect(uploaded.toString()).toEqual("ipfs://QmY4Z");
});

async function mockDependencies(gateway = "https://api.2eff.lukso.dev") {
  const file = new Blob(["123123"], {
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
