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
import { GenreService } from './genre.service';
import { Auth } from 'src/core/decorators/auth.decorator';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @HttpCode(200)
  @Auth()
  async getGenres() {
    return await this.genreService.getAll();
  }

  @Get('by-slug/:slug')
  @HttpCode(200)
  @Auth()
  async getGenreBySlug(@Param('slug') slug: string) {
    return await this.genreService.bySlug(slug);
  }

  @Get(':id')
  @HttpCode(200)
  @Auth('admin')
  async getGenreById(@Param('id') id: number) {
    return await this.genreService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth('admin')
  @Post()
  @HttpCode(200)
  async createGenre(@Body() data: CreateGenreDto) {
    return await this.genreService.create(data);
  }

  @UsePipes(new ValidationPipe())
  @Auth('admin')
  @Put(':id')
  @HttpCode(200)
  async updateGenre(@Param('id') id: number, @Body() data: CreateGenreDto) {
    return await this.genreService.update(id, data);
  }

  @Auth('admin')
  @Delete(':id')
  async deleteGenre(@Param('id') id: number) {
    return await this.genreService.delete(id);
  }
}
