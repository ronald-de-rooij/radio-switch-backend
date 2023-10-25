import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';
import { AdminGuard } from 'src/auth/guard';

@Controller('streams')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @Get('/')
  findAll() {
    return this.streamService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.streamService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createStreamDto: CreateStreamDto) {
    console.log('hoi');
    return this.streamService.create(createStreamDto);
  }
}
