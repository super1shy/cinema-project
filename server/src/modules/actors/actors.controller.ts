import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Auth } from 'src/core/decorators/auth.decorator';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  @Auth()
  async getAll() {
    return this.actorsService.getAll();
  }

  @Get('by-slug/:slug')
  @Auth()
  async getActorBySlug(@Param('slug') slug: string) {
    return this.actorsService.getBySlug(slug);
  }

  // admin

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create(@Body() data: CreateActorDto) {
    return this.actorsService.create(data);
  }

  @Get(':id')
  @Auth('admin')
  async get(@Param('id') id: number) {
    return this.actorsService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: number, @Body() data: CreateActorDto) {
    return this.actorsService.update(id, data);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: number) {
    return this.actorsService.delete(id);
  }
}
