import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { actorsProviders } from './actors.providers';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService, ...actorsProviders],
})
export class ActorsModule {}
