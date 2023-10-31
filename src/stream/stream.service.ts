import { Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StreamService {
  constructor(private prisma: PrismaService) {}

  async create(createStreamDto: CreateStreamDto, image: Express.Multer.File) {
    // Extract relevant information from createStreamDto and image
    const { name, description, url, category } = createStreamDto;
    console.log(22, image);
    const imageUrl = `/uploads/${image.filename}`;

    console.log(123, imageUrl);

    const createdStream = this.prisma.stream.create({
      data: {
        name,
        description,
        url,
        imageUrl,
        category,
      },
    });

    return createdStream;
  }

  findAll() {
    return this.prisma.stream.findMany();
  }

  findOne(id: number) {
    return this.prisma.stream.findUnique({ where: { id } });
  }
}
