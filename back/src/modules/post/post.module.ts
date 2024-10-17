import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [VoteModule],
  controllers: [PostController],
  providers: [],
})
export class PostModule {}
