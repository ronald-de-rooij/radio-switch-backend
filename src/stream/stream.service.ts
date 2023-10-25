import { Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StreamService {
  constructor(private prisma: PrismaService) {}

  async create(createStreamDto: CreateStreamDto) {
    return this.prisma.stream.create({
      data: createStreamDto,
    });
  }

  findAll() {
    return this.prisma.stream.findMany();
  }

  findOne(id: number) {
    return this.prisma.stream.findUnique({ where: { id } });
  }
}
