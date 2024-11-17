import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinataSDK } from 'pinata-web3';
import type {
  GetPinataProps,
  UploadBody,
  UploadToIpfsResponse,
} from './types/pinata.types';

@Injectable()
export class PinataService {
  private readonly pinata: PinataSDK;

  private readonly pinataGateway: string;

  constructor(private readonly configService: ConfigService) {
    this.pinataGateway = this.configService.get<string>(
      'PINATA_GATEWAY_DOMAIN',
    );
    const pinataJwt = this.configService.get<string>('PINATA_API_JWT');

    this.pinata = new PinataSDK({
      pinataJwt,
      pinataGateway: this.pinataGateway,
    });
  }

  private hashToUri = (hash: string): string => {
    return `ipfs://${hash}`;
  };

  public async uploadFile({ file }: UploadBody): Promise<UploadToIpfsResponse> {
    if (!file) {
      throw new BadRequestException('File is required.');
    }
    try {
      const transformedFile = new File([file.buffer], file.originalname, {
        type: file.mimetype,
      });
      const uploadFile = await this.pinata.upload.file(transformedFile);

      const pinataAssetURI = await this.pinata.gateways.convert(
        this.hashToUri(uploadFile.IpfsHash),
        'https://ipfs.io',
      );

      const json = {
        asset: pinataAssetURI,
        createdAt: new Date().toISOString(),
      };

      const pinataJsonURI = await this.pinata.upload.json(json);

      return {
        hash: pinataJsonURI.IpfsHash,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Pinata upload error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getFile({ hash, tokenId }: GetPinataProps): Promise<any> {
    try {
      const pinataTokenRes = await this.pinata.gateways.get(hash);
      if (!pinataTokenRes.data) {
        throw new HttpException('Wrong id', HttpStatus.NOT_FOUND);
      }

      if (pinataTokenRes.data instanceof Blob) {
        throw new HttpException(
          'Invalid data format',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (typeof pinataTokenRes.data === 'string') {
        return {
          ...JSON.parse(pinataTokenRes.data),
          tokenId,
        };
      }

      return {
        tokenId,
        ...pinataTokenRes.data,
      };
    } catch {
      throw new HttpException(
        'Pinata read error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
