import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

    const tokens = await this.generateTokens(newUser.id);
    // const { password, ...result } = newUser['dataValues'];
    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    };
  }

  async login(userData: AuthDto) {
    const user = await this.validateUser(userData);
    const tokens = await this.generateTokens(user.id);
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException('Please sign in!');
    }

    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid token or expired');
    }

    const user = await this.usersService.findOneById(result.id);
    const tokens = await this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
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

    return user;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateTokens(userId) {
    const data = { id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }

  returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
