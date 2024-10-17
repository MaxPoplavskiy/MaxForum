import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await password) === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createUser(email: string, password: string) {
    return this.prisma.user.create({
      data: { email, password },
    });
  }
}
