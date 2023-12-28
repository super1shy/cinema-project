import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.model';
import { AuthDto } from '../auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update.user.dto';

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

  async updateProfile(id: number, data: UpdateUserDto) {
    const user = await this.findOneByEmail(data.email);
    if (user && id !== user.id) {
      throw new NotAcceptableException('This email already in use');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    // if (user.isAdmin || data.isAdmin === false) {
    //   user.isAdmin = data.isAdmin;
    // }

    await this.userRepository.update(data, { where: { id } });
    return;
  }
}
