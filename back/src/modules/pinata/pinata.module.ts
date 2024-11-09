import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PinataController } from './pinata.controller';
import { PinataService } from './pinata.service';

@Module({
  imports: [ConfigModule],
  providers: [PinataService],
  controllers: [PinataController],
})
export class PinataModule {}
