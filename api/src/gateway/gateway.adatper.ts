import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Session } from '../users/entities/session.entity';
import { plainToInstance } from 'class-transformer';
import { User } from '../utils/typeorm';

export class WebsocketAdapter extends IoAdapter {
  private readonly app: INestApplication;
  constructor(app: INestApplication) {
    super(app);
    this.app = app;
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log('adapter');
      const { cookie: clientCookie } = socket.handshake.headers;

      if (!clientCookie) {
        console.log('user not authorized');
        return next(new Error(`Unauthorized`));
      }

      const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);

      if (!CHAT_APP_SESSION_ID) {
        console.log('CHAT_APP_SESSION_ID does not exists');
        return next(new Error(`Unauthorized`));
      }

      const signedCookie = cookieParser.signedCookie(
        CHAT_APP_SESSION_ID,
        process.env.COOKIE_SECRET,
      );

      if (!signedCookie) {
        console.log('signedCookie does not exists');
        return next(new Error(`Unauthorized`));
      }

      const sessionRepository = this.app.get(DataSource).getRepository(Session);

      const sessionDB = await sessionRepository.findOne({
        where: { id: signedCookie },
      });

      const userDB = plainToInstance(
        User,
        JSON.parse(sessionDB.json).passport.user,
      );

      socket.user = userDB;
      next();
    });
    return server;
  }
}
