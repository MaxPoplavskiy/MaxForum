export type GetPinataProps = {
	hash: string,
	tokenId: string
}

export type UploadBody = {
  file: Express.Multer.File
}

export type UploadToIpfsResponse = {
  hash: string
}