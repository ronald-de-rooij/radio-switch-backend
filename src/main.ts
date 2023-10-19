import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('RadioSwitch')
    .setDescription(
      "Experience seamless radio streaming with our innovative platform. Easily switch between different radio stations to suit your mood and taste. Take control of your listening schedule by defining specific radio streams for each hour of the day. Whether you're looking for energetic morning tunes, relaxing afternoon melodies, or upbeat evening rhythms, our platform ensures you enjoy the perfect radio station every hour, keeping your day melodiously accompanied.",
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // INFO Add global validation pipe to endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // INFO Stripping out elements that are not defined in DTO
    }),
  );
  await app.listen(4000);
}
bootstrap();
