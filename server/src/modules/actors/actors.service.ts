import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTORS_REPOSITORY } from 'src/core/constants';
import { Actor } from './actor.model';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @Inject(ACTORS_REPOSITORY) private readonly actorsRepository: typeof Actor,
  ) {}

  async getAll(): Promise<Actor[]> {
    return this.actorsRepository.findAll();
  }

  async getBySlug(slug: string): Promise<Actor> {
    const actor = await this.actorsRepository.findOne({ where: { slug } });
    if (!actor) {
      new NotFoundException('Actor not found');
    }

    return actor;
  }

  // admin area
  async getById(id: number): Promise<Actor> {
    const actor = await this.actorsRepository.findOne({ where: { id } });
    if (!actor) {
      new NotFoundException('Actor not found');
    }

    return actor;
  }

  async create(data: CreateActorDto): Promise<Actor> {
    return this.actorsRepository.create(data);
  }

  async update(id: number, data: CreateActorDto) {
    const isUpdated = await this.actorsRepository.update(data, {
      where: { id },
    });
    if (!isUpdated) {
      throw new NotFoundException('Actor not found');
    }
    return isUpdated;
  }

  async delete(id: number) {
    const isDeleted = await this.actorsRepository.destroy({ where: { id } });
    if (!isDeleted) {
      throw new NotFoundException('Actor not found');
    }
    return isDeleted;
  }
}
