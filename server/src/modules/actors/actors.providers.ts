import { ACTORS_REPOSITORY } from 'src/core/constants';
import { Actor } from './actor.model';

export const actorsProviders = [
  {
    provide: ACTORS_REPOSITORY,
    useValue: Actor,
  },
];
