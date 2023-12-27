import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  // to make it accessible to the rest of the application that needs it
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
