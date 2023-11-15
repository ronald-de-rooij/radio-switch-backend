import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';
import { AdminGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from '../multer.config';

@Controller('streams')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @Get('/')
  findAll() {
    return this.streamService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.streamService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @Body() createStreamDto: CreateStreamDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.streamService.create(createStreamDto, image);
  }
}
