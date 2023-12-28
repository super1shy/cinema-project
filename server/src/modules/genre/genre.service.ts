import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { GENRE_REPOSITORY } from 'src/core/constants';
import { Genre } from './genre.model';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @Inject(GENRE_REPOSITORY) private readonly genreRepository: typeof Genre,
  ) {}

  async getAll(searchTerm?: string): Promise<Genre[]> {
    // let options = {};
    // if (options) {
    //   options = {
    //     where: {
    //       $or: [
    //         { name: new RegExp(searchTerm, 'i') },
    //         { slug: new RegExp(searchTerm, 'i') },
    //         { description: new RegExp(searchTerm, 'i') },
    //       ],
    //     },
    //     order: [['createdAt', 'DESC']],
    //   };
    // }
    // return this.genreRepository.findAll(options);
    return this.genreRepository.findAll();
  }

  async bySlug(slug: string): Promise<Genre> {
    return this.genreRepository.findOne({ where: { slug } });
  }

  // async getPopular(): Promise<Genre[]> {
  //   return this.genreRepository.findAll();
  // }

  // admin area
  async byId(id: number): Promise<Genre> {
    return this.genreRepository.findByPk(id);
  }

  async create(data: CreateGenreDto): Promise<Genre> {
    return await this.genreRepository.create(data);
  }

  async update(id: number, data: CreateGenreDto) {
    return this.genreRepository.update(data, { where: { id } });
  }

  async delete(id: number) {
    return this.genreRepository.destroy({ where: { id } });
  }
}
