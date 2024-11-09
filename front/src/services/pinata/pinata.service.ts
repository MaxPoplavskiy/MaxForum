import axios from "axios";
import { HTTPService } from "../http.service";
import { ReadIpfsHash } from "./types/read-ipfs-hash.type";
import { UploadToIpfs } from "./types/upload-to-ipfs.type";

const { VITE_IPFS_GATEWAY } = import.meta.env;

export class PinataService extends HTTPService {
  private module = "pinata";

  public uploadImage(file: File): Promise<UploadToIpfs> {
    const formData = new FormData();
    formData.append("file", file);

    return this.post(`${this.module}/upload-to-ipfs`, formData);
  }

  public async hashToImageLink(hash: string) {
    const { data } = await axios.get(`${VITE_IPFS_GATEWAY}/${hash}`);

    return (data as ReadIpfsHash).asset;
  }
}

export const pinataService = new PinataService();
