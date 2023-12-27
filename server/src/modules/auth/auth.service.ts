import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(userData: AuthDto) {
    const candidate = await this.usersService.findOneByEmail(userData.email);

    if (candidate) {
      throw new BadRequestException(
        'User with this email exists in the system',
      );
    }

    const hash = await this.hashPassword(userData.password);
    const newUser = await this.usersService.create({
      ...userData,
      password: hash,
    });
    const { password, ...result } = newUser['dataValues'];
    return result;
  }

  async login(userData: AuthDto) {
    return this.validateUser(userData);
  }

  private async validateUser(userData: AuthDto) {
    const user = await this.usersService.findOneByEmail(userData.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValid = await bcrypt.compare(userData.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
