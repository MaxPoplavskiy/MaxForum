import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [VoteService],
  exports: [VoteService, PrismaModule]
})
export class VoteModule {}
