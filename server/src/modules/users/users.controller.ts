import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/core/decorators/auth.decorator';
import { User } from './decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('id') id: number) {
    return this.usersService.findOneById(id);
  }
}
