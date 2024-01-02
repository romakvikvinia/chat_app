import { ConflictException, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserType, FindUserType } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../utils/typeorm';
import { hasPassword } from '../utils/helper';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
  ) {}
  async create(input: CreateUserType) {
    if (await this.userRep.findOneBy({ email: input.email }))
      throw new ConflictException(
        `User with an email: ${input.email} already exists`,
      );
    const password = await hasPassword(input.password);
    const user = this.userRep.create({ ...input, password });
    return this.userRep.save(user);
  }

  findUser(input: FindUserType) {
    return this.userRep.findOne({ where: input, relations: ['participant'] });
  }
  saveUser(user: User) {
    return this.userRep.save(user);
  }
}
