import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PinataService } from './pinata.service';
import { UploadToIpfsResponse } from './types/pinata.types';

@ApiTags('Pinata')
@Controller('pinata')
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

  @Post('upload-to-ipfs')
  @ApiBody({
    description: 'Upload image to ipfs',
    type: String,
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadToIpfsResponse> {
    return this.pinataService.uploadFile({ file });
  }
}
