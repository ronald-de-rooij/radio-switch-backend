import { Module } from '@nestjs/common';
import { StreamsModule } from './streams/streams.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    StreamsModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
