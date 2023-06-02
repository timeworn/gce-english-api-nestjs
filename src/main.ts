import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seedService = app.get(SeedService);
  await seedService.start();

  const options = new DocumentBuilder()
    .setTitle('gce-english API')
    .setDescription('The gce-english Api description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
