import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from 'src/users/user';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/session.guard';

@ApiTags('Auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
    @Inject(Services.USERS) private readonly usersService: IUserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  signUp(@Body() createUserDto: CreateAuthDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Body() loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto);
  }

  @Get('/status')
  status() {}

  @Post('/logout')
  logout() {}
}
