import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async countVotes(postId: number): Promise<number> {
    const votes = await this.prisma.vote.findMany({
      where: { postId },
      select: { vote: true },
    });

    return votes.reduce(
      (voteCount, { vote }) => (vote ? voteCount + 1 : voteCount - 1),
      0,
    );
  }
}
