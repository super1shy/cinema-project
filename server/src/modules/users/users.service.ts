import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.model';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: AuthDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      new NotFoundException('User not found');
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      new NotFoundException('User not found');
    }
    return user;
  }
}
