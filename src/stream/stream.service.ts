import { Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StreamService {
  constructor(private prisma: PrismaService) {}

  async create(createStreamDto: CreateStreamDto, image: Express.Multer.File) {
    const { name, description, streamUrl, category } = createStreamDto;
    const imageUrl = `/uploads/${image.filename}`;

    const createdStream = this.prisma.stream.create({
      data: {
        name,
        description,
        streamUrl,
        imageUrl,
        category,
      },
    });

    return createdStream;
  }

  findAll() {
    return this.prisma.stream.findMany();
  }

  findOne(id: string) {
    return this.prisma.stream.findUnique({ where: { id } });
  }
}
