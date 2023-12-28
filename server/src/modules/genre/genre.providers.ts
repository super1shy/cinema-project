import { GENRE_REPOSITORY } from 'src/core/constants';
import { Genre } from './genre.model';

export const genresProviders = [
  {
    provide: GENRE_REPOSITORY,
    useValue: Genre,
  },
];
