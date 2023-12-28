import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/core/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateProfile(id, data);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateProfile(id, data);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return this.usersService.getCount();
  }

  @Get()
  @Auth('admin')
  async getUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
}
