import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config common project
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const version = configService.get('VERSION');
  app.setGlobalPrefix(`api/${version}`, { exclude: [''] });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  const swaggerConfig = new DocumentBuilder()
    .setBasePath(`api/${version}`)
    .setTitle('NestJS API')
    .setDescription('API documentation for NestJS app')
    .setVersion('1.0')
    .addBearerAuth() // Thêm xác thực JWT (nếu cần)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`api/${version}/docs`, app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();

  await app.listen(port);
}
bootstrap();
