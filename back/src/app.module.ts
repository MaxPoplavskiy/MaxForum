import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PinataModule } from './modules/pinata/pinata.module';

@Module({
  imports: [ConfigModule.forRoot(), PinataModule],
})
export class AppModule {}
