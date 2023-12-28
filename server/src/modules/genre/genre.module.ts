import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { genresProviders } from './genre.providers';

@Module({
  controllers: [GenreController],
  providers: [GenreService, ...genresProviders],
})
export class GenreModule {}
