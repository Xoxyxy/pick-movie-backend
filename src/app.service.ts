import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllMovies() {
    try {
      return await this.databaseService.movie.findMany();
    } catch (error) {
      return new NotFoundException('No movies found');
    }
  }

  async getMovieById(id: number) {
    try {
      return await this.databaseService.movie.findUnique({ where: { id } });
    } catch (error) {
      return new NotFoundException('No movie found');
    }
  }
}
