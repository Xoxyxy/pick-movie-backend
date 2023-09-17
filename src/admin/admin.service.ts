import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { MovieDto } from '../dto/movie.dto';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getMovies() {
    try {
      return await this.databaseService.movie.findMany();
    } catch (error) {
      return new NotFoundException('No movies found');
    }
  }

  async createMovie(dto: MovieDto) {
    return await this.databaseService.movie.create({
      data: dto,
    });
  }

  async updateMovie(id: number, dto: MovieDto) {
    return await this.databaseService.movie.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteMovie(id: number) {
    return await this.databaseService.movie.delete({
      where: {
        id,
      },
    });
  }
}
