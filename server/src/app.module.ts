import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GenreModule } from './modules/genre/genre.module';
import { ActorsModule } from './modules/actors/actors.module';

@Module({
  imports: [
    // Setting the ConfigModule.forRoot({ isGlobal: true }) to isGlobal: true will make the .env properties available throughout the application
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    GenreModule,
    ActorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
