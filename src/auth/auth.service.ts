import { Injectable } from '@nestjs/common';
// import { User, Stream } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup() {
    return { message: 'I have signed up' };
  }

  signin() {
    return { message: 'I have signed in' };
  }
}
