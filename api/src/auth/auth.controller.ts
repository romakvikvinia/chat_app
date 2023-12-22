import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from 'src/users/user';

@ApiTags('Auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
    @Inject(Services.USERS) private readonly usersService: IUserService,
  ) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateAuthDto) {
    console.log(createUserDto);
    this.usersService.create(createUserDto);
  }

  @Post('/signin')
  signIn() {}

  @Get('/status')
  status() {}

  @Post('/logout')
  logout() {}
}
