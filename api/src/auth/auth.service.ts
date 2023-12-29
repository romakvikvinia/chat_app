import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IAuthService } from './auth';
import { ValidateUserType } from 'src/utils/types';
import { Services } from '../utils/constants';
import { IUserService } from '../users/user';
import { compareHash } from '../utils/helper';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    console.log(updateAuthDto);
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async validateUser({ email, password }: ValidateUserType) {
    const user = await this.userService.findUser({ email });
    if (!user) throw new UnauthorizedException(`Invalid Credentials`);

    return compareHash(password, user.password);
  }
}
