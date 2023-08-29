import { Module } from '@nestjs/common';
import { StreamsController } from './controllers/streams/streams.controller';
import { StreamsService } from './services/streams/streams.service';

@Module({
  controllers: [StreamsController],
  providers: [StreamsService],
})
export class StreamsModule {}
