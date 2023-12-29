import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { Session } from './users/entities/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const sessionRepository = app.get(DataSource).getRepository(Session);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });

  app.use(
    session({
      secret: config.get<string>('cookie.secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000, // 1 day
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

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
