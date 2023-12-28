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
    const user = await this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      new NotFoundException('User not found');
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: number, data: UpdateUserDto) {
    const user = await this.findOneById(id);
    if (user) {
      if (data.password) {
        user.password = await bcrypt.hash(data.password, 10);
      }
      if (data.email) {
        const isSameUser = await this.findOneByEmail(data.email);
        if (isSameUser && id !== isSameUser.id) {
          throw new NotAcceptableException('This email already in use');
        }

        user.email = data.email;
      }
      if (data.isAdmin || data.isAdmin === false) user.isAdmin = data.isAdmin;

      await user.save();
      return;
    }
  }

  async getCount(): Promise<number> {
    return await this.userRepository.count();
  }

  async getAll(): Promise<User[]> {
    // const options = {};
    return await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
  }

  async delete(id: number) {
    return await this.userRepository.destroy({ where: { id } });
  }
}
