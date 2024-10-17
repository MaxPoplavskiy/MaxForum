import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { VoteService } from '../vote/vote.service';

@Controller('posts')
export class PostController {
  constructor(
    private voteService: VoteService,
    private prisma: PrismaService,
  ) {}

  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: { author: true },
    });
    const voteCount = await this.voteService.countVotes(parseInt(postId));
    return { ...post, voteCount };
  }

  @Patch(':postId/vote')
  @UseGuards(AuthGuard('jwt'))
  async voteOnPost(@Param('postId') postId: string, @Body() body, @Req() req) {
    const { vote } = body;
    const userId = req.user.id;

    const existingVote = await this.prisma.vote.findUnique({
      where: { postId_userId: { postId: parseInt(postId), userId } },
    });

    if (existingVote) {
      if (existingVote.vote === vote) {
        await this.prisma.vote.delete({ where: { id: existingVote.id } });
      } else {
        await this.prisma.vote.update({
          where: { id: existingVote.id },
          data: { vote },
        });
      }
    } else {
      await this.prisma.vote.create({
        data: { vote, postId: parseInt(postId), userId },
      });
    }

    return { success: true };
  }
}
