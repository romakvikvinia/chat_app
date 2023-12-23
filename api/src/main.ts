import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  const swConfig = new DocumentBuilder()
    .setTitle('Chat App API')
    .setDescription('The chat app API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swConfig);
  SwaggerModule.setup('', app, document);

  await app.listen(config.get<number>('port'));
}
bootstrap();
