import { IsString } from 'class-validator';

export class CreateActorDto {
  name?: string;
  photo?: string;
  slug?: string;
}
